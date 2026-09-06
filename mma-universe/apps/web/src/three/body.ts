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
      const ox = Math.cos(angle) * section.rx;
      const oy = flat ? Math.sin(angle) * section.rz : 0;
      const oz = flat ? 0 : Math.sin(angle) * section.rz;
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

/** An ellipsoid rigged to one bone — the head, and the gloves. */
export function blob(
  bone: Joint,
  at: number,
  radii: readonly [number, number, number],
  offset: readonly [number, number, number] = [0, 0, 0],
  segments = 16,
  rings = 12,
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
      positions.push(
        centre[0] + offset[0] + Math.sin(phi) * Math.cos(theta) * radii[0],
        centre[1] + offset[1] + Math.cos(phi) * radii[1],
        centre[2] + offset[2] + Math.sin(phi) * Math.sin(theta) * radii[2],
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
  { bone: `shoulder${side}`, at: 0.1, rx: 0.07, rz: 0.068, weights: { [`shoulder${side}`]: 1 } },
  { bone: `shoulder${side}`, at: 1, rx: 0.062, rz: 0.06, weights: { [`shoulder${side}`]: 0.5, [`arm${side}`]: 0.5 } },
  { bone: `arm${side}`, at: 0.3, rx: 0.057, rz: 0.055, weights: { [`arm${side}`]: 1 } },
  { bone: `arm${side}`, at: 0.75, rx: 0.046, rz: 0.045 },
  { bone: `arm${side}`, at: 1, rx: 0.043, rz: 0.043, weights: { [`arm${side}`]: 0.5, [`forearm${side}`]: 0.5 } },
  { bone: `forearm${side}`, at: 0.22, rx: 0.05, rz: 0.048, weights: { [`forearm${side}`]: 1 } },
  { bone: `forearm${side}`, at: 0.75, rx: 0.037, rz: 0.035 },
  { bone: `forearm${side}`, at: 1, rx: 0.034, rz: 0.033, weights: { [`forearm${side}`]: 0.5, [`hand${side}`]: 0.5 } },
];

const leg = (side: 'L' | 'R'): Section[] => [
  { bone: `thigh${side}`, at: 0, rx: 0.1, rz: 0.098, weights: { [`thigh${side}`]: 0.6, hips: 0.4 } },
  { bone: `thigh${side}`, at: 0.3, rx: 0.09, rz: 0.089, weights: { [`thigh${side}`]: 1 } },
  { bone: `thigh${side}`, at: 0.85, rx: 0.063, rz: 0.062 },
  { bone: `thigh${side}`, at: 1, rx: 0.058, rz: 0.058, weights: { [`thigh${side}`]: 0.5, [`shin${side}`]: 0.5 } },
  { bone: `shin${side}`, at: 0.22, rx: 0.07, rz: 0.072, weights: { [`shin${side}`]: 1 } },
  { bone: `shin${side}`, at: 0.7, rx: 0.043, rz: 0.044 },
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
  { bone: 'hips', at: 0, rx: 0.112, rz: 0.086, weights: { hips: 1 } },
  { bone: 'hips', at: 0.55, rx: 0.122, rz: 0.092 },
  { bone: 'hips', at: 1, rx: 0.118, rz: 0.088, weights: { hips: 0.55, spine: 0.45 } },
  { bone: 'spine', at: 0.35, rx: 0.113, rz: 0.083, weights: { spine: 1 } },
  { bone: 'spine', at: 0.75, rx: 0.138, rz: 0.096 },
  { bone: 'spine', at: 1, rx: 0.152, rz: 0.104, weights: { spine: 0.5, chest: 0.5 } },
  { bone: 'chest', at: 0.5, rx: 0.163, rz: 0.11, weights: { chest: 1 } },
  { bone: 'chest', at: 0.88, rx: 0.15, rz: 0.101 },
  { bone: 'chest', at: 1.05, rx: 0.115, rz: 0.09, weights: { chest: 0.75, neck: 0.25 } },
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

/** Skin: everything the eye reads as the athlete. */
export function buildSkin(): MeshData {
  return merge([
    tube(TORSO),
    tube(NECK, 12),
    // A head is an egg, not a ball: taller than wide, and deeper than it is broad.
    blob('head', 0, [0.093, 0.115, 0.104], [0, 0.105, 0.004], 18, 14),
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
    blob('handL', 0.45, [0.062, 0.075, 0.066], [0, 0, 0.008], 14, 10),
    blob('handR', 0.45, [0.062, 0.075, 0.066], [0, 0, 0.008], 14, 10),
  ]);
}
