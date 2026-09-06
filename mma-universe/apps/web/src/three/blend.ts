/**
 * Pose sampling and blending.
 *
 * Poses are sparse by design, so the first job here is resolving one into a complete set of
 * joint rotations; everything downstream can then assume nineteen joints exist. Interpolation
 * is linear on euler angles rather than spherical on quaternions, which is a real
 * simplification and an acceptable one: no authored keyframe pair in `clips.ts` is more than
 * about 170 degrees apart on any single axis, which is where euler lerp starts to swing the
 * wrong way round.
 *
 * No three.js here. That keeps every frame of choreography reproducible in a unit test.
 */

import type { Joint, Vec3 } from './rig.ts';
import { JOINT_NAMES } from './rig.ts';
import type { Pose } from './poses.ts';
import type { Clip } from './clips.ts';

export interface ResolvedPose {
  readonly joints: Readonly<Record<Joint, Vec3>>;
  readonly offset: Vec3;
}

const ZERO: Vec3 = [0, 0, 0];

/** Fills in every joint a sparse pose leaves out. */
export function resolvePose(pose: Pose): ResolvedPose {
  const joints = {} as Record<Joint, Vec3>;
  for (const joint of JOINT_NAMES) {
    joints[joint] = pose.joints[joint] ?? ZERO;
  }
  return { joints, offset: pose.offset ?? ZERO };
}

function lerp3(a: Vec3, b: Vec3, alpha: number): Vec3 {
  return [
    a[0] + (b[0] - a[0]) * alpha,
    a[1] + (b[1] - a[1]) * alpha,
    a[2] + (b[2] - a[2]) * alpha,
  ];
}

export function blendPose(a: ResolvedPose, b: ResolvedPose, alpha: number): ResolvedPose {
  if (alpha <= 0) return a;
  if (alpha >= 1) return b;
  const joints = {} as Record<Joint, Vec3>;
  for (const joint of JOINT_NAMES) {
    joints[joint] = lerp3(a.joints[joint], b.joints[joint], alpha);
  }
  return { joints, offset: lerp3(a.offset, b.offset, alpha) };
}

/** Smoothstep. Keyframe times carry the intent; this only takes the corners off. */
export function ease(x: number): number {
  const t = x <= 0 ? 0 : x >= 1 ? 1 : x;
  return t * t * (3 - 2 * t);
}

/**
 * Samples a clip at normalised time `u`, clamped. Keyframes are assumed ascending, which
 * the clip-shape test enforces rather than this hot path re-checking every frame.
 */
export function sampleClip(clip: Clip, u: number): ResolvedPose {
  const keys = clip.keys;
  const first = keys[0];
  const last = keys[keys.length - 1];
  if (!first || !last) throw new Error('clip has no keyframes');
  if (u <= first.t) return resolvePose(first.pose);
  if (u >= last.t) return resolvePose(last.pose);

  for (let i = 1; i < keys.length; i++) {
    const next = keys[i];
    const previous = keys[i - 1];
    if (!next || !previous) continue;
    if (u <= next.t) {
      const span = next.t - previous.t;
      const alpha = span <= 0 ? 1 : ease((u - previous.t) / span);
      return blendPose(resolvePose(previous.pose), resolvePose(next.pose), alpha);
    }
  }
  return resolvePose(last.pose);
}
