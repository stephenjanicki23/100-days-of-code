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
      indices.push(a, b, a + 1, a + 1, b, b + 1);
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
 * Built as a waistband plus one loose tube per leg, and the leg tubes deliberately start
 * *above* the hip joint so they overlap both the band and each other. The first attempt was a
 * pelvis skirt with separate thigh tubes butted against it, which left a visible junction the
 * legs tore open the moment the fighter moved. Overlapping closed surfaces of the same
 * material read as one garment; abutting ones never do.
 */
const SHORTS_BAND: Section[] = [
  { bone: 'hips', at: 1.2, rx: 0.134, rz: 0.104, weights: { hips: 0.3, spine: 0.7 } },
  { bone: 'hips', at: 0.8, rx: 0.152, rz: 0.119, weights: { hips: 0.75, spine: 0.25 } },
  { bone: 'hips', at: 0.35, rx: 0.162, rz: 0.128, weights: { hips: 1 } },
];

const shortsLeg = (side: 'L' | 'R'): Section[] => [
  { bone: `thigh${side}`, at: -0.34, rx: 0.142, rz: 0.126, weights: { hips: 0.9, [`thigh${side}`]: 0.1 } },
  { bone: `thigh${side}`, at: -0.1, rx: 0.15, rz: 0.138, weights: { hips: 0.62, [`thigh${side}`]: 0.38 } },
  { bone: `thigh${side}`, at: 0.16, rx: 0.147, rz: 0.14, weights: { hips: 0.25, [`thigh${side}`]: 0.75 } },
  { bone: `thigh${side}`, at: 0.45, rx: 0.135, rz: 0.131, weights: { [`thigh${side}`]: 1 } },
  { bone: `thigh${side}`, at: 0.6, rx: 0.116, rz: 0.113 },
  { bone: `thigh${side}`, at: 0.64, rx: 0.101, rz: 0.099 },
];

const foot = (side: 'L' | 'R'): Section[] => [
  { bone: `foot${side}`, at: -0.15, rx: 0.042, rz: 0.05, weights: { [`foot${side}`]: 1 } },
  { bone: `foot${side}`, at: 0.5, rx: 0.048, rz: 0.045 },
  { bone: `foot${side}`, at: 0.92, rx: 0.04, rz: 0.032 },
];

const HEAD_AT = 0;
export const HEAD_RADII = [0.093, 0.115, 0.104] as const;
const HEAD_OFFSET = [0, 0.105, 0.004] as const;

/**
 * Skull shaping.
 *
 * A plain ellipsoid reads as an egg from every angle. Four smooth terms fix most of that: a
 * brow over the eyes, a jaw that narrows toward the chin, a fuller occiput, and cheekbones.
 * Deliberately conservative — a badly suggested face is worse than none, and at broadcast
 * distance the silhouette is doing nearly all the work.
 */
export function skullShape(nx: number, ny: number, nz: number): number {
  const front = Math.max(0, nz);
  const brow = 0.055 * front * Math.exp(-Math.pow((ny - 0.18) / 0.2, 2));
  const jaw = -0.09 * front * Math.max(0, -ny - 0.35) * (0.5 + Math.abs(nx));
  const occiput = 0.045 * Math.max(0, -nz) * Math.exp(-Math.pow((ny + 0.05) / 0.45, 2));
  const cheek = 0.03 * front * Math.abs(nx) * Math.exp(-Math.pow((ny + 0.08) / 0.22, 2));
  const crown = -0.03 * Math.max(0, ny - 0.7);
  // Shallow sockets, so the eyes have somewhere to sit. Without them the eyeballs are simply
  // inside the head and never render.
  const socket =
    -0.055 *
    front *
    Math.exp(-Math.pow((Math.abs(nx) - 0.33) / 0.16, 2)) *
    Math.exp(-Math.pow((ny - 0.06) / 0.13, 2));
  return 1 + brow + jaw + occiput + cheek + crown + socket;
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
      indices.push(a, b, a + 1, a + 1, b, b + 1);
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
    blob('head', HEAD_AT, [0.018, 0.014, 0.015], [0.032, 0.111, 0.093], 10, 8),
    blob('head', HEAD_AT, [0.018, 0.014, 0.015], [-0.032, 0.111, 0.093], 10, 8),
  ]);
}

export function buildNose(): MeshData {
  return blob('head', HEAD_AT, [0.018, 0.03, 0.024], [0, 0.088, 0.098], 10, 8);
}

/** Skin: everything the eye reads as the athlete. */
export function buildSkin(): MeshData {
  return merge([
    tube(TORSO),
    tube(NECK, 12),
    blob('head', HEAD_AT, HEAD_RADII, HEAD_OFFSET, 22, 18, skullShape),
    buildNose(),
    tube(arm('L'), 12),
    tube(arm('R'), 12),
    tube(leg('L'), 14),
    tube(leg('R'), 14),
    tube(foot('L'), 10),
    tube(foot('R'), 10),
  ]);
}

export function buildShorts(): MeshData {
  return merge([tube(SHORTS_BAND, 16), tube(shortsLeg('L'), 14), tube(shortsLeg('R'), 14)]);
}

export function buildGloves(): MeshData {
  return merge([
    blob('handL', 0.45, [0.055, 0.067, 0.059], [0, 0, 0.006], 14, 10),
    blob('handR', 0.45, [0.055, 0.067, 0.059], [0, 0, 0.006], 14, 10),
  ]);
}
