/**
 * Procedural body geometry.
 *
 * The fighters were built from separate capsules and boxes, which is why they read as made of
 * sausages: rigid pieces that interpenetrate at every joint and never deform. This module
 * generates a *skinned* body instead — one continuous surface per part, with each vertex
 * weighted to the bones it sits between, so a bending elbow bends the skin.
 *
 * It emits plain arrays and imports nothing from three.js, for the same reason the rest of
 * the choreography does not: the mesh can then be checked in a unit test, which matters here
 * because a mis-weighted vertex is invisible in code and catastrophic on screen.
 *
 * The bind pose is the skeleton's own rest pose — every joint rotation zero — which makes
 * generation simple: every bone is axis-aligned, so a cross-section is a plain ellipse in a
 * plane, and world positions are cumulative offsets.
 */

import type { Joint } from './rig.ts';
import { JOINT_ORDER, SKELETON } from './rig.ts';

/**
 * A bulge or groove at one angle around a cross-section.
 *
 * Plain ellipses are why the first skinned pass read as smooth and characterless: a real
 * torso is not an ellipse, it is a pair of pecs over a ribcage with lats flaring at the sides
 * and a groove down the spine. Modulating the radius by angle sculpts that into the mesh
 * rather than painting it on, so it survives every camera angle and catches the light.
 */
export interface Lobe {
  /** Angle around the section. `FRONT` is the chest, `BACK` the spine, and the sides between. */
  readonly at: number;
  /** Angular half-width. Narrow reads as a defined edge, wide as a soft mass. */
  readonly spread: number;
  /** Fractional radius change at the centre of the lobe. Negative carves rather than bulges. */
  readonly amount: number;
}

/** The fighter faces +Z and their left arm is at +X, which fixes the compass for every lobe. */
export const FRONT = Math.PI / 2;
export const BACK = -Math.PI / 2;
export const LEFT = 0;
export const RIGHT = Math.PI;

/** Which way is outboard for a given arm or leg. */
const outward = (side: 'L' | 'R'): number => (side === 'L' ? LEFT : RIGHT);
const inward = (side: 'L' | 'R'): number => (side === 'L' ? RIGHT : LEFT);

function angleGap(a: number, b: number): number {
  let delta = (a - b) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta <= -Math.PI) delta += Math.PI * 2;
  return delta;
}

/** Combined radius multiplier from every lobe on a section, at one angle around it. */
export function radiusAt(lobes: readonly Lobe[] | undefined, angle: number): number {
  if (!lobes) return 1;
  let scale = 1;
  for (const lobe of lobes) {
    const gap = angleGap(angle, lobe.at);
    scale += lobe.amount * Math.exp(-(gap * gap) / (2 * lobe.spread * lobe.spread));
  }
  return scale;
}

/* ----------------------------------------------------------------- musculature */

const PECS: Lobe[] = [
  { at: FRONT + 0.5, spread: 0.33, amount: 0.075 },
  { at: FRONT - 0.5, spread: 0.33, amount: 0.075 },
  { at: FRONT, spread: 0.09, amount: -0.04 },
];
const ABS: Lobe[] = [
  { at: FRONT + 0.34, spread: 0.24, amount: 0.05 },
  { at: FRONT - 0.34, spread: 0.24, amount: 0.05 },
  { at: FRONT, spread: 0.11, amount: -0.045 },
];
const LATS: Lobe[] = [
  { at: LEFT, spread: 0.42, amount: 0.07 },
  { at: RIGHT, spread: 0.42, amount: 0.07 },
];
const SPINE_GROOVE: Lobe = { at: BACK, spread: 0.13, amount: -0.055 };
const TRAPS: Lobe[] = [
  { at: BACK + 0.58, spread: 0.32, amount: 0.06 },
  { at: BACK - 0.58, spread: 0.32, amount: 0.06 },
];
const GLUTES: Lobe[] = [{ at: BACK, spread: 0.6, amount: 0.07 }];

const deltoid = (side: 'L' | 'R'): Lobe[] => [
  { at: outward(side), spread: 0.6, amount: 0.09 },
  { at: BACK, spread: 0.4, amount: 0.05 },
];
const upperArm = (side: 'L' | 'R'): Lobe[] => [
  { at: FRONT, spread: 0.48, amount: 0.09 },
  { at: BACK, spread: 0.52, amount: 0.08 },
  { at: inward(side), spread: 0.22, amount: -0.04 },
];
const forearmBelly = (side: 'L' | 'R'): Lobe[] => [
  { at: outward(side), spread: 0.52, amount: 0.07 },
  { at: BACK, spread: 0.45, amount: 0.05 },
];
const quads = (side: 'L' | 'R'): Lobe[] => [
  { at: FRONT, spread: 0.48, amount: 0.08 },
  { at: outward(side), spread: 0.44, amount: 0.05 },
  { at: BACK, spread: 0.48, amount: 0.06 },
];
const calf = (side: 'L' | 'R'): Lobe[] => [
  { at: BACK, spread: 0.42, amount: 0.12 },
  { at: inward(side), spread: 0.3, amount: 0.05 },
];

/** One cross-section of a limb or the torso, in the bind pose. */
export interface Section {
  /** Which bone this section rides on. */
  readonly bone: Joint;
  /** How far along that bone, 0 at its joint origin to 1 at its far end. */
  readonly at: number;
  /** Half-width across the body. */
  readonly rx: number;
  /** Half-depth front to back. */
  readonly rz: number;
  /**
   * Bone influences, summing to 1. Sections at a joint blend between the two bones either
   * side of it, which is what lets the skin fold rather than shear.
   */
  readonly weights?: Readonly<Partial<Record<Joint, number>>>;
  /** Muscles. Absent means a plain ellipse, which is right for a wrist or an ankle. */
  readonly lobes?: readonly Lobe[];
}

export interface MeshData {
  readonly positions: number[];
  readonly uvs: number[];
  readonly skinIndices: number[];
  readonly skinWeights: number[];
  readonly indices: number[];
}

const BONE_INDEX = new Map<Joint, number>(JOINT_ORDER.map((joint, index) => [joint, index]));

/** World position of a bone's joint origin in the bind pose, where all rotations are zero. */
export function restOrigin(joint: Joint): [number, number, number] {
  let [x, y, z] = [0, 0, 0];
  let cursor: Joint | null = joint;
  while (cursor) {
    const bone: (typeof SKELETON)[Joint] = SKELETON[cursor];
    x += bone.offset[0];
    y += bone.offset[1];
    z += bone.offset[2];
    cursor = bone.parent;
  }
  return [x, y, z];
}

/** Unit vector a bone extends along, in the bind pose. */
function axisOf(joint: Joint): [number, number, number] {
  switch (SKELETON[joint].axis) {
    case 'UP':
      return [0, 1, 0];
    case 'DOWN':
      return [0, -1, 0];
    default:
      return [0, 0, 1];
  }
}

/** World position of a point a fraction of the way along a bone. */
export function pointOn(joint: Joint, at: number): [number, number, number] {
  const origin = restOrigin(joint);
  const axis = axisOf(joint);
  const length = SKELETON[joint].length * at;
  return [origin[0] + axis[0] * length, origin[1] + axis[1] * length, origin[2] + axis[2] * length];
}

function weightsFor(section: Section): [Joint, number][] {
  const declared = section.weights;
  if (!declared) return [[section.bone, 1]];
  const entries = Object.entries(declared) as [Joint, number][];
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  return total > 0 ? entries.map(([joint, weight]) => [joint, weight / total]) : [[section.bone, 1]];
}

/**
 * Lofts a tube through a series of cross-sections.
 *
 * Rings lie perpendicular to the bone they ride on, which in the bind pose means the XZ plane
 * for the spine and limbs and the XY plane for the feet. Ends are capped so the surface is
 * closed; an open tube shows its own inside the moment the camera moves.
 */
export function tube(sections: readonly Section[], radialSegments = 14, capStart = true, capEnd = true): MeshData {
  const positions: number[] = [];
  const uvs: number[] = [];
  const skinIndices: number[] = [];
  const skinWeights: number[] = [];
  const indices: number[] = [];

  const pushVertex = (
    x: number,
    y: number,
    z: number,
    u: number,
    v: number,
    weights: [Joint, number][],
  ): number => {
    const index = positions.length / 3;
    positions.push(x, y, z);
    uvs.push(u, v);
    const a = weights[0];
    const b = weights[1];
    skinIndices.push(BONE_INDEX.get(a?.[0] ?? 'hips') ?? 0, BONE_INDEX.get(b?.[0] ?? 'hips') ?? 0, 0, 0);
    skinWeights.push(a?.[1] ?? 1, b?.[1] ?? 0, 0, 0);
    return index;
  };

  const rings: number[][] = [];
  sections.forEach((section, ringIndex) => {
    const centre = pointOn(section.bone, section.at);
    const weights = weightsFor(section);
    const flat = SKELETON[section.bone].axis === 'FORWARD';
    const v = ringIndex / Math.max(sections.length - 1, 1);
    const ring: number[] = [];
    for (let s = 0; s < radialSegments; s++) {
      const angle = (s / radialSegments) * Math.PI * 2;
      const swell = radiusAt(section.lobes, angle);
      const ox = Math.cos(angle) * section.rx * swell;
      const oy = flat ? Math.sin(angle) * section.rz * swell : 0;
      const oz = flat ? 0 : Math.sin(angle) * section.rz * swell;
      ring.push(
        pushVertex(centre[0] + ox, centre[1] + oy, centre[2] + oz, s / radialSegments, v, weights),
      );
    }
    rings.push(ring);
  });

  for (let r = 0; r < rings.length - 1; r++) {
    const lower = rings[r]!;
    const upper = rings[r + 1]!;
    for (let s = 0; s < radialSegments; s++) {
      const next = (s + 1) % radialSegments;
      indices.push(lower[s]!, upper[s]!, lower[next]!);
      indices.push(lower[next]!, upper[s]!, upper[next]!);
    }
  }

  const cap = (section: Section, ring: number[], flip: boolean) => {
    const centre = pointOn(section.bone, section.at);
    const hub = pushVertex(centre[0], centre[1], centre[2], 0.5, flip ? 0 : 1, weightsFor(section));
    for (let s = 0; s < radialSegments; s++) {
      const next = (s + 1) % radialSegments;
      if (flip) indices.push(hub, ring[next]!, ring[s]!);
      else indices.push(hub, ring[s]!, ring[next]!);
    }
  };

  const first = sections[0];
  const last = sections[sections.length - 1];
  if (capStart && first && rings[0]) cap(first, rings[0], true);
  if (capEnd && last && rings[rings.length - 1]) cap(last, rings[rings.length - 1]!, false);

  return { positions, uvs, skinIndices, skinWeights, indices };
}

/**
 * An ellipsoid rigged to one bone — the head, the gloves, the hair.
 *
 * `shape` modulates the radius by direction, which is what turns an egg into a skull: a brow
 * over the eyes, a jaw that narrows, a fuller occiput. It is also how the hair works — the
 * shell shrinks inside the head below the hairline, so the hairline is a smooth function
 * rather than a cut edge.
 */
export function blob(
  bone: Joint,
  at: number,
  radii: readonly [number, number, number],
  offset: readonly [number, number, number] = [0, 0, 0],
  segments = 16,
  rings = 12,
  shape?: (nx: number, ny: number, nz: number) => number,
): MeshData {
  const positions: number[] = [];
  const uvs: number[] = [];
  const skinIndices: number[] = [];
  const skinWeights: number[] = [];
  const indices: number[] = [];
  const centre = pointOn(bone, at);
  const index = BONE_INDEX.get(bone) ?? 0;

  for (let r = 0; r <= rings; r++) {
    const phi = (r / rings) * Math.PI;
    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.sin(theta);
      const scale = shape ? shape(nx, ny, nz) : 1;
      positions.push(
        centre[0] + offset[0] + nx * radii[0] * scale,
        centre[1] + offset[1] + ny * radii[1] * scale,
        centre[2] + offset[2] + nz * radii[2] * scale,
      );
      uvs.push(s / segments, r / rings);
      skinIndices.push(index, 0, 0, 0);
      skinWeights.push(1, 0, 0, 0);
    }
  }
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < segments; s++) {
      const a = r * (segments + 1) + s;
      const b = a + segments + 1;
      // Wound to match `tube`, so that every closed surface on the body encloses a positive
      // volume. It did not: blobs came out inside out, which is invisible in the vertices and
      // total on screen — the gloves, the hair, the beard, the eyes and the skull were all
      // rendering as their own far sides.
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  return { positions, uvs, skinIndices, skinWeights, indices };
}

/** Concatenates parts into one mesh, offsetting indices as it goes. */
export function merge(parts: readonly MeshData[]): MeshData {
  const out: MeshData = { positions: [], uvs: [], skinIndices: [], skinWeights: [], indices: [] };
  for (const part of parts) {
    const base = out.positions.length / 3;
    out.positions.push(...part.positions);
    out.uvs.push(...part.uvs);
    out.skinIndices.push(...part.skinIndices);
    out.skinWeights.push(...part.skinWeights);
    for (const index of part.indices) out.indices.push(index + base);
  }
  return out;
}

/* ------------------------------------------------------------------ the body */

const arm = (side: 'L' | 'R'): Section[] => [
  { bone: `shoulder${side}`, at: 0.1, rx: 0.07, rz: 0.068, weights: { [`shoulder${side}`]: 1 }, lobes: deltoid(side) },
  { bone: `shoulder${side}`, at: 1, rx: 0.062, rz: 0.06, weights: { [`shoulder${side}`]: 0.5, [`arm${side}`]: 0.5 }, lobes: deltoid(side) },
  { bone: `arm${side}`, at: 0.3, rx: 0.057, rz: 0.055, weights: { [`arm${side}`]: 1 }, lobes: upperArm(side) },
  { bone: `arm${side}`, at: 0.75, rx: 0.046, rz: 0.045, lobes: upperArm(side).map((l) => ({ ...l, amount: l.amount * 0.4 })) },
  { bone: `arm${side}`, at: 1, rx: 0.043, rz: 0.043, weights: { [`arm${side}`]: 0.5, [`forearm${side}`]: 0.5 } },
  { bone: `forearm${side}`, at: 0.22, rx: 0.05, rz: 0.048, weights: { [`forearm${side}`]: 1 }, lobes: forearmBelly(side) },
  { bone: `forearm${side}`, at: 0.75, rx: 0.037, rz: 0.035 },
  { bone: `forearm${side}`, at: 1, rx: 0.034, rz: 0.033, weights: { [`forearm${side}`]: 0.5, [`hand${side}`]: 0.5 } },
];

const leg = (side: 'L' | 'R'): Section[] => [
  { bone: `thigh${side}`, at: 0, rx: 0.1, rz: 0.098, weights: { [`thigh${side}`]: 0.6, hips: 0.4 }, lobes: quads(side) },
  { bone: `thigh${side}`, at: 0.3, rx: 0.09, rz: 0.089, weights: { [`thigh${side}`]: 1 }, lobes: quads(side) },
  { bone: `thigh${side}`, at: 0.85, rx: 0.063, rz: 0.062, lobes: quads(side).map((l) => ({ ...l, amount: l.amount * 0.3 })) },
  { bone: `thigh${side}`, at: 1, rx: 0.058, rz: 0.058, weights: { [`thigh${side}`]: 0.5, [`shin${side}`]: 0.5 } },
  { bone: `shin${side}`, at: 0.22, rx: 0.07, rz: 0.072, weights: { [`shin${side}`]: 1 }, lobes: calf(side) },
  { bone: `shin${side}`, at: 0.7, rx: 0.043, rz: 0.044, lobes: calf(side).map((l) => ({ ...l, amount: l.amount * 0.3 })) },
  { bone: `shin${side}`, at: 1, rx: 0.038, rz: 0.04, weights: { [`shin${side}`]: 0.5, [`foot${side}`]: 0.5 } },
];

/**
 * The torso, lofted from the hips to the shoulder line.
 *
 * Three stacked boxes is what a torso looked like before; a run of elliptical cross-sections
 * with a waist and a chest is what makes a body read as a body. Sections are wider than they
 * are deep, because people are.
 */
const TORSO: Section[] = [
  { bone: 'hips', at: 0, rx: 0.112, rz: 0.086, weights: { hips: 1 }, lobes: GLUTES },
  { bone: 'hips', at: 0.55, rx: 0.122, rz: 0.092, lobes: [...GLUTES, SPINE_GROOVE] },
  { bone: 'hips', at: 1, rx: 0.118, rz: 0.088, weights: { hips: 0.55, spine: 0.45 }, lobes: [...ABS, SPINE_GROOVE] },
  { bone: 'spine', at: 0.35, rx: 0.113, rz: 0.083, weights: { spine: 1 }, lobes: [...ABS, SPINE_GROOVE] },
  { bone: 'spine', at: 0.75, rx: 0.138, rz: 0.096, lobes: [...LATS, SPINE_GROOVE, { at: FRONT, spread: 0.5, amount: 0.03 }] },
  { bone: 'spine', at: 1, rx: 0.152, rz: 0.104, weights: { spine: 0.5, chest: 0.5 }, lobes: [...PECS, ...LATS, SPINE_GROOVE] },
  { bone: 'chest', at: 0.5, rx: 0.163, rz: 0.11, weights: { chest: 1 }, lobes: [...PECS, ...LATS, SPINE_GROOVE] },
  { bone: 'chest', at: 0.88, rx: 0.15, rz: 0.101, lobes: [...TRAPS, { at: FRONT, spread: 0.6, amount: 0.03 }] },
  { bone: 'chest', at: 1.05, rx: 0.115, rz: 0.09, weights: { chest: 0.75, neck: 0.25 }, lobes: TRAPS },
];

const NECK: Section[] = [
  { bone: 'neck', at: -0.4, rx: 0.062, rz: 0.06, weights: { chest: 0.4, neck: 0.6 } },
  { bone: 'neck', at: 0.6, rx: 0.055, rz: 0.054, weights: { neck: 1 } },
];

/**
 * Trunks.
 *
 * The previous build was a waistband plus one loose tube per leg, on the reasoning that
 * overlapping closed surfaces of the same material read as one garment. They do — but only
 * where they actually overlap, and these did not: rendered on their own, with the fighter
 * hidden, the shorts had two holes punched through the top of the front where the bottom edge
 * of the band and the top edges of the leg tubes passed each other without meeting. On the
 * fighter that is bare hip showing through the trunks, which is exactly what it looked like.
 *
 * The holes were the visible half of it. The whole garment was also inside out, and had been
 * since it was written: `tube` winds its triangles in the order the sections are given, and
 * these ran from the waistband down while every other tube on the body runs bottom to top.
 * Backwards winding means the front faces are culled, so the trunks were rendering as their
 * own far side with the fighter's hip showing through the middle — which is what "the trunks
 * only cover part of them" actually was. Four separate attempts to find a gap in the geometry
 * came back clean, because there was never a gap.
 *
 * Rebuilt so the hole cannot exist rather than so it happens not to: everything from waist to
 * crotch is a single closed surface, the legs start well up inside it, and the sections run
 * bottom to top like everything else. `winds every tube the same way round` in the tests holds
 * the last of those, since it is invisible in the geometry and only shows on screen.
 *
 * Then cut down twice more from looking at them on a fighter. The skirt was eighteen
 * centimetres of half-width hanging to below the crotch, which is a kilt: wider than the legs
 * beneath it, so it read as a bell with the thighs lost inside. It now stops at the crotch at
 * roughly hip width and the legs carry everything below. And the legs were pinned almost
 * entirely to the hips at the top, so a stepping fighter left one hanging behind as a loose
 * flap; the weights now hand over to the thigh across three sections instead of one.
 */
const SHORTS_SKIRT: Section[] = [
  { bone: 'hips', at: -0.42, rx: 0.152, rz: 0.124, weights: { hips: 1 } },
  { bone: 'hips', at: -0.12, rx: 0.156, rz: 0.127, weights: { hips: 1 } },
  { bone: 'hips', at: 0.3, rx: 0.153, rz: 0.124, weights: { hips: 1 } },
  { bone: 'hips', at: 0.72, rx: 0.145, rz: 0.116, weights: { hips: 0.9, spine: 0.1 } },
  { bone: 'hips', at: 1.08, rx: 0.134, rz: 0.106, weights: { hips: 0.55, spine: 0.45 } },
  { bone: 'hips', at: 1.34, rx: 0.126, rz: 0.099, weights: { hips: 0.25, spine: 0.75 } },
];

/**
 * How long the trunks are, from vale tudo shorts to Muay Thai.
 *
 * A card where every fighter wears identical shorts is its own tell — kit is most of how you
 * tell two men apart at range. 0 is cut high on the thigh, 1 comes down toward the knee.
 */
export function shortsLeg(side: 'L' | 'R', length: number): Section[] {
  const hem = 0.3 + Math.max(0, Math.min(1, length)) * 0.48;
  const bone: Joint = `thigh${side}`;
  return [
    // Started up inside the skirt, so a leg begins where the skirt is still solid and cannot
    // leave a seam whatever the two of them do as the fighter moves — but not so far up that
    // the trunks have geometry level with the ribs, which is where they started.
    { bone, at: -0.30, rx: 0.116, rz: 0.108, weights: { hips: 0.86, [bone]: 0.14 } },
    { bone, at: -0.12, rx: 0.124, rz: 0.116, weights: { hips: 0.5, [bone]: 0.5 } },
    { bone, at: 0.06, rx: 0.126, rz: 0.12, weights: { hips: 0.15, [bone]: 0.85 } },
    { bone, at: hem * 0.55, rx: 0.122, rz: 0.117, weights: { [bone]: 1 } },
    // The hem stands off the thigh, because cloth does.
    { bone, at: hem, rx: 0.113, rz: 0.109 },
    { bone, at: hem + 0.035, rx: 0.101, rz: 0.097 },
  ];
}

const foot = (side: 'L' | 'R'): Section[] => [
  { bone: `foot${side}`, at: -0.15, rx: 0.042, rz: 0.05, weights: { [`foot${side}`]: 1 } },
  { bone: `foot${side}`, at: 0.5, rx: 0.048, rz: 0.045 },
  { bone: `foot${side}`, at: 0.92, rx: 0.04, rz: 0.032 },
];

const HEAD_AT = 0;
export const HEAD_RADII = [0.093, 0.115, 0.104] as const;
const HEAD_OFFSET = [0, 0.105, 0.004] as const;

/** A smooth bump: 1 at `centre`, falling to nothing over `width`. */
function gauss(value: number, centre: number, width: number): number {
  const t = (value - centre) / width;
  return Math.exp(-t * t);
}

/**
 * Skull and face shaping.
 *
 * The first pass here was four conservative terms — a brow, a jaw, an occiput, cheekbones —
 * on the reasoning that at broadcast distance the silhouette does all the work and a badly
 * suggested face is worse than none. Both halves of that were wrong. The silhouette is not
 * doing the work: a head with no nose, no mouth and no ears reads as a mannequin at any
 * distance, and it survived a path tracer looking exactly as plastic as it does here. And the
 * face that was actually shipping was not "none" — it was two black spheres standing proud of
 * an egg, which is worse than a rough nose by a distance.
 *
 * So this sculpts a face. Every term is a smooth bump in direction space, which means the
 * whole thing stays a pure function of a direction, differentiable everywhere, with no seams
 * to hide and nothing to unwrap. `front` weights a term toward the face; squaring it keeps the
 * nose and mouth from smearing round to the ears.
 */
export function skullShape(nx: number, ny: number, nz: number): number {
  const front = Math.max(0, nz);
  const face = front * front;
  const side = Math.abs(nx);

  // The cranium.
  const occiput = 0.045 * Math.max(0, -nz) * gauss(ny, -0.05, 0.45);
  const crown = -0.03 * Math.max(0, ny - 0.7);
  const temple = -0.035 * front * gauss(side, 0.78, 0.2) * gauss(ny, 0.32, 0.2);

  // The brow, and the sockets under it. Deeper than before, because the eyes have to sit
  // inside them rather than on them.
  const brow = 0.062 * front * gauss(ny, 0.2, 0.15) * gauss(nx, 0, 0.55);
  const socket = -0.038 * front * gauss(side, 0.33, 0.19) * gauss(ny, 0.04, 0.15);

  // The nose: a bridge from between the brows, a ball at the end of it, and the wings of the
  // nostrils either side. This is the single feature that stops a head reading as an egg.
  const bridge = 0.105 * face * gauss(nx, 0, 0.13) * gauss(ny, 0.0, 0.24);
  const tip = 0.165 * face * front * gauss(nx, 0, 0.16) * gauss(ny, -0.17, 0.10);
  const nostril = 0.055 * face * front * gauss(side, 0.14, 0.06) * gauss(ny, -0.23, 0.06);

  // The mouth: lips that come forward, a line between them that does not, and the dish of the
  // philtrum above.
  const philtrum = -0.022 * face * gauss(nx, 0, 0.055) * gauss(ny, -0.31, 0.055);
  const lips = 0.05 * face * gauss(nx, 0, 0.28) * gauss(ny, -0.41, 0.085);
  const mouthLine = -0.04 * face * gauss(nx, 0, 0.32) * gauss(ny, -0.41, 0.028);

  // The lower face.
  const cheek = 0.04 * front * gauss(side, 0.5, 0.2) * gauss(ny, -0.1, 0.18);
  const chin = 0.052 * front * gauss(nx, 0, 0.24) * gauss(ny, -0.7, 0.15);
  const jaw = -0.085 * front * Math.max(0, -ny - 0.35) * (0.5 + side);

  return (
    1 + occiput + crown + temple + brow + socket + bridge + tip + nostril +
    philtrum + lips + mouthLine + cheek + chin + jaw
  );
}

/**
 * An ear.
 *
 * The first attempt scooped a concha out of the outward face, which at this size did not read
 * as an ear at all: it cut the little ellipsoid into a crescent that stood off the head like a
 * handle. At two centimetres tall the only thing that reads is the outline, so this only
 * softens the top and leaves the rest alone.
 */
function earShape(_nx: number, ny: number, _nz: number): number {
  return 1 - 0.18 * Math.max(0, ny - 0.45);
}

/**
 * Hair, as a cap with no hidden half.
 *
 * Two earlier attempts modelled it as a full shell that tucked inside the skull below the
 * hairline, so the hairline was a smooth function rather than a cut edge. Both rendered as a
 * dark mask over the face, and the arithmetic said they should not — the tucked radius was
 * provably inside the skin at every direction I could sample. Rather than keep chasing that
 * indirection, this generates only the geometry that is meant to be seen: a cap over the
 * crown, inflated clear of the skull, ending in a rim that ducks under the skin.
 *
 * There is no hidden hemisphere, so there is nothing that can surface in the wrong place.
 * That is worth more here than the smoother hairline the shell would have given.
 */
export const HAIR_LIFT = 1.085;

/**
 * Generates a cap over the top of the skull.
 *
 * `sweep` is how far down the sides it comes, and `tilt` drops the back lower than the front
 * so the line sits above the brow but covers the nape.
 */
function hairCap(sweep: number, tilt: number, segments = 24, rings = 12): MeshData {
  const positions: number[] = [];
  const uvs: number[] = [];
  const skinIndices: number[] = [];
  const skinWeights: number[] = [];
  const indices: number[] = [];
  const centre = pointOn('head', HEAD_AT);
  const bone = BONE_INDEX.get('head') ?? 0;

  const push = (nx: number, ny: number, nz: number, lift: number, u: number, v: number): number => {
    const index = positions.length / 3;
    const scale = skullShape(nx, ny, nz) * lift;
    positions.push(
      centre[0] + HEAD_OFFSET[0] + nx * HEAD_RADII[0] * scale,
      centre[1] + HEAD_OFFSET[1] + ny * HEAD_RADII[1] * scale,
      centre[2] + HEAD_OFFSET[2] + nz * HEAD_RADII[2] * scale,
    );
    uvs.push(u, v);
    skinIndices.push(bone, 0, 0, 0);
    skinWeights.push(1, 0, 0, 0);
    return index;
  };

  for (let r = 0; r <= rings; r++) {
    const t = r / rings;
    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      // The rim reaches further down the back of the head than the front.
      const reach = sweep * (1 - tilt * Math.max(0, sin));
      const phi = t * reach;
      const nx = Math.sin(phi) * cos;
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * sin;
      // The last ring ducks inside the skin so the cut edge is never a visible lip.
      const lift = r === rings ? 0.965 : HAIR_LIFT;
      push(nx, ny, nz, lift, s / segments, t);
    }
  }

  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < segments; s++) {
      const a = r * (segments + 1) + s;
      const b = a + segments + 1;
      indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  return { positions, uvs, skinIndices, skinWeights, indices };
}

/** A cropped fade and a fuller cut, so the two fighters are not the same man. */
export const HAIR_STYLES = [
  { sweep: 1.08, tilt: 0.3 },
  { sweep: 1.28, tilt: 0.22 },
] as const;

export function buildHair(style = 0): MeshData {
  const cut = HAIR_STYLES[style % HAIR_STYLES.length] ?? HAIR_STYLES[0];
  return hairCap(cut.sweep, cut.tilt);
}

/** A beard: the same cap construction, rotated to sit under the jaw. */
export function buildBeard(): MeshData {
  const data = hairCap(0.62, -0.85, 20, 8);
  // Flip it under the chin and push it forward onto the jaw.
  const out = { ...data, positions: [...data.positions] };
  const centreY = pointOn('head', HEAD_AT)[1] + HEAD_OFFSET[1];
  for (let v = 0; v < out.positions.length / 3; v++) {
    out.positions[v * 3 + 1] = centreY - (out.positions[v * 3 + 1]! - centreY);
  }
  return out;
}

/** Eyes and a nose. Small, dark, and enough to stop the head reading as blank. */
export function buildFace(): MeshData {
  return merge([
    blob('head', HEAD_AT, EYE_RADII, [EYE_AT[0], EYE_AT[1], EYE_AT[2]], 12, 9),
    blob('head', HEAD_AT, EYE_RADII, [-EYE_AT[0], EYE_AT[1], EYE_AT[2]], 12, 9),
  ]);
}

/**
 * Where the eyes sit, and how big they are.
 *
 * They used to be 18mm spheres at z 0.093 on a skull whose front is at 0.108 — so they stood
 * proud of the face and read as googly eyes stuck on an egg. Smaller, and set back far enough
 * that the socket holds them; `keeps the eyes inside the head` in the tests measures it rather
 * than trusting this comment.
 */
export const EYE_RADII = [0.0112, 0.0100, 0.0105] as const;
export const EYE_AT = [0.0310, 0.1085, 0.0870] as const;

/** An ear, flattened against the side of the head. */
function ear(side: 'L' | 'R'): MeshData {
  const x = side === 'L' ? 1 : -1;
  return blob('head', HEAD_AT, [0.009, 0.021, 0.014], [x * 0.081, 0.098, -0.016], 10, 8, earShape);
}

/* ------------------------------------------------------------------ occlusion */

/** A ball standing in for a piece of the body, for the purpose of blocking light. */
export interface Occluder {
  readonly at: readonly [number, number, number];
  readonly radius: number;
}

/**
 * The body, approximated as a few dozen balls.
 *
 * These are derived from the very sections the skin is lofted through, so the stand-in cannot
 * drift away from the thing it stands in for: change a shoulder and its occluder changes with
 * it. The head is added by hand because it is a blob rather than a tube.
 */
export function occluders(): Occluder[] {
  const out: Occluder[] = [];
  const add = (sections: readonly Section[]) => {
    for (const section of sections) {
      out.push({ at: pointOn(section.bone, section.at), radius: (section.rx + section.rz) / 2 });
    }
  };
  add(TORSO);
  add(NECK);
  for (const side of ['L', 'R'] as const) {
    add(arm(side));
    add(leg(side));
    add(foot(side));
  }
  const head = pointOn('head', HEAD_AT);
  out.push({
    at: [head[0] + HEAD_OFFSET[0], head[1] + HEAD_OFFSET[1], head[2] + HEAD_OFFSET[2]],
    radius: (HEAD_RADII[0] + HEAD_RADII[2]) / 2,
  });
  return out;
}

/**
 * How strongly occlusion darkens, and how dark it is allowed to get.
 *
 * The first pass ran at 1.35 against a floor of 0.34 and looked worse than no occlusion at
 * all: with only a few dozen stand-ins the field is smooth and broad, so a strong setting does
 * not carve creases, it paints whole limbs black wherever they happen to face the torso.
 * Turned down until it does what it is for — seating the arms into the shoulders and the neck
 * into the traps — and stops pretending to detail it does not have.
 */
const OCCLUSION_STRENGTH = 0.5;
const OCCLUSION_FLOOR = 0.62;

/**
 * How much of the sky a point on the skin can actually see, in the bind pose.
 *
 * This is the single biggest reason the fighters read as moulded plastic. Real bodies are dark
 * in the armpit, under the pectoral, in the groin, behind the knee and where the neck meets the
 * shoulders — not because those places are in shadow from any particular lamp, but because
 * there is a body in the way of most of the sky. Without it every crease is lit exactly like
 * open skin and the whole figure flattens into one moulded piece, which no amount of lighting
 * or renderer fixes: a path tracer produced the same doll.
 *
 * The estimate is the standard analytic one for a sphere, summed over the stand-ins above: a
 * ball of radius r at distance l subtends r²/l² of the hemisphere, weighted by how squarely it
 * sits in front of the surface. A ball behind the surface contributes nothing, which is what
 * makes a limb stop occluding itself without any special case.
 *
 * Baked in the bind pose and left there. A closing elbow really should darken its own crease
 * and this will not do that — but the alternative is recomputing occlusion for two fighters
 * every frame, and a static crease is enormously closer to right than no crease at all.
 */
export function occlusionAt(
  point: readonly [number, number, number],
  normal: readonly [number, number, number],
  balls: readonly Occluder[],
): number {
  let total = 0;
  for (const ball of balls) {
    const dx = ball.at[0] - point[0];
    const dy = ball.at[1] - point[1];
    const dz = ball.at[2] - point[2];
    const distance = Math.hypot(dx, dy, dz);
    if (distance < 1e-6) continue;
    const facing = (normal[0] * dx + normal[1] * dy + normal[2] * dz) / distance;
    if (facing <= 0) continue;
    // Never let a ball the point is sitting on top of blow up the estimate.
    const reach = Math.max(distance, ball.radius * 1.05);
    total += (facing * ball.radius * ball.radius) / (reach * reach);
  }
  return OCCLUSION_FLOOR + (1 - OCCLUSION_FLOOR) * Math.exp(-total * OCCLUSION_STRENGTH);
}

/**
 * Skin tone across the body.
 *
 * One flat colour head to toe is the other half of the plastic look. Real skin is not one
 * colour: hands and feet and face carry more blood than the trunk, and the parts that live
 * under the lights are a shade lighter than the parts that do not.
 */
export function toneAt(point: readonly [number, number, number]): [number, number, number] {
  const height = point[1];
  // Warmer toward the extremities, measured as distance from the body's mid-line.
  const reach = Math.hypot(point[0], point[2]) * 2.2 + Math.max(0, 1.35 - height) * 0.25;
  const warm = Math.min(0.16, reach * 0.16);
  // And a shade lighter on the surfaces that face the lights.
  const lift = Math.min(0.06, Math.max(0, height - 1.0) * 0.05);
  return [1 + warm * 0.55 + lift, 1 - warm * 0.16 + lift, 1 - warm * 0.42 + lift];
}

/** Skin: everything the eye reads as the athlete. */
export function buildSkin(): MeshData {
  return merge([
    tube(TORSO),
    tube(NECK, 12),
    // A nose and a mouth are a few millimetres across on a head this size; at 22 segments they
    // were being averaged away by the very grid meant to carry them.
    blob('head', HEAD_AT, HEAD_RADII, HEAD_OFFSET, 48, 40, skullShape),
    ear('L'),
    ear('R'),
    tube(arm('L'), 12),
    tube(arm('R'), 12),
    tube(leg('L'), 14),
    tube(leg('R'), 14),
    tube(foot('L'), 10),
    tube(foot('R'), 10),
  ]);
}

export function buildShorts(length = 0.5): MeshData {
  return merge([
    tube(SHORTS_SKIRT, 18),
    tube(shortsLeg('L', length), 16),
    tube(shortsLeg('R', length), 16),
  ]);
}

export function buildGloves(): MeshData {
  return merge([
    blob('handL', 0.45, [0.055, 0.067, 0.059], [0, 0, 0.006], 14, 10),
    blob('handR', 0.45, [0.055, 0.067, 0.059], [0, 0, 0.006], 14, 10),
  ]);
}

/**
 * Six times the signed volume enclosed by a mesh.
 *
 * Winding is the one property of a generated mesh that is completely invisible in the numbers
 * and total on screen: an inside-out tube has every vertex in exactly the right place, and
 * renders as its own far side with whatever is inside it showing through. The trunks were
 * built backwards from the day they were written, and four separate probes for a gap in the
 * geometry came back clean because there was no gap.
 *
 * The divergence theorem settles it in one number. A closed surface wound outward encloses a
 * positive volume; wound inward, the same surface encloses a negative one.
 */
export function signedVolume(mesh: MeshData): number {
  const { positions: p, indices } = mesh;
  let total = 0;
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i]! * 3;
    const b = indices[i + 1]! * 3;
    const c = indices[i + 2]! * 3;
    total +=
      p[a]! * (p[b + 1]! * p[c + 2]! - p[b + 2]! * p[c + 1]!) -
      p[a + 1]! * (p[b]! * p[c + 2]! - p[b + 2]! * p[c]!) +
      p[a + 2]! * (p[b]! * p[c + 1]! - p[b + 1]! * p[c]!);
  }
  return total;
}
