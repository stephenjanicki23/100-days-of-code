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

/**
 * The signed difference between two angles, wrapped into (-pi, pi].
 *
 * Exported because it is also the only correct way to *measure* rotation: two euler angles a
 * full turn apart describe the same orientation, so their numeric difference says nothing
 * about how far anything moved. Tests that assert on motion use this rather than subtraction.
 */
export function angularDelta(from: number, to: number): number {
  let delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta <= -Math.PI) delta += Math.PI * 2;
  return delta;
}

/**
 * Blends by the shortest rotation on every axis.
 *
 * Within a clip the author chose the path — a wheel kick deliberately travels past 2*pi — so
 * ordinary `blendPose` interpolates the numbers as written. Across a beat boundary there is no
 * intended path at all, and interpolating the numbers unwinds a whole turn in a sixth of a
 * second: the fighter finishes a spinning kick and then visibly spins back. Here the two
 * angles are treated as orientations, which is what they are.
 */
export function blendPoseShortest(a: ResolvedPose, b: ResolvedPose, alpha: number): ResolvedPose {
  if (alpha <= 0) return a;
  const joints = {} as Record<Joint, Vec3>;
  for (const joint of JOINT_NAMES) {
    const from = a.joints[joint];
    const to = b.joints[joint];
    joints[joint] = [
      from[0] + angularDelta(from[0], to[0]) * alpha,
      from[1] + angularDelta(from[1], to[1]) * alpha,
      from[2] + angularDelta(from[2], to[2]) * alpha,
    ];
  }
  return { joints, offset: lerp3(a.offset, b.offset, alpha) };
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

/**
 * Easing curves, one per kind of motion.
 *
 * A single curve for everything is most of what makes an animation read as robotic: a jab
 * and a stagger accelerate identically, so nothing has weight. These four describe the four
 * things a body actually does — wind up, fire, absorb, settle — and a keyframe names the one
 * that carries it.
 */
export type Ease = 'linear' | 'smooth' | 'anticipate' | 'snap' | 'settle';

const CURVES: Record<Ease, (t: number) => number> = {
  /** No shaping. For a hold, or a segment whose keyframes already carry the timing. */
  linear: (t) => t,
  /** Smoothstep: the neutral default, corners taken off both ends. */
  smooth: (t) => t * t * (3 - 2 * t),
  /** Slow to leave, gathering speed — a wind-up, a level change, a hip loading. */
  anticipate: (t) => t * t * (2 - t * 0.35),
  /**
   * Explosive, then decelerating hard into the target — a limb thrown and then caught by
   * its own joints. Skewing a smoothstep early keeps the peak inside what an arm can do
   * (about 30 rad/s) instead of the infinite jerk an easeOut leaves at the start.
   */
  snap: (t) => Math.pow(t * t * (3 - 2 * t), 0.6),
  /** Quick to move, long to arrive — recovering to guard, a body coming to rest. */
  settle: (t) => 1 - Math.pow(1 - t, 2.2),
};

export function applyEase(kind: Ease, x: number): number {
  const t = x <= 0 ? 0 : x >= 1 ? 1 : x;
  return (CURVES[kind] ?? CURVES.smooth)(t);
}

/** Smoothstep, kept as the default for callers that do not care which curve they get. */
export function ease(x: number): number {
  return applyEase('smooth', x);
}

/**
 * Pushes a pose past its target.
 *
 * A punch that stops dead at full extension looks like a robot arm reaching a set point. A
 * little overshoot past the impact pose, then a recoil back, is what reads as mass being
 * thrown and then caught.
 */
export function extrapolate(from: ResolvedPose, to: ResolvedPose, factor: number): ResolvedPose {
  return blendPose(from, to, factor);
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
      // A keyframe's ease describes the segment arriving at it, so the curve belongs to the
      // motion that ends there rather than to the one that leaves.
      const alpha = span <= 0 ? 1 : applyEase(next.ease ?? 'smooth', (u - previous.t) / span);
      return blendPose(resolvePose(previous.pose), resolvePose(next.pose), alpha);
    }
  }
  return resolvePose(last.pose);
}

/**
 * Samples a clip with each region running slightly behind the hips.
 *
 * Motion travels through a body rather than arriving everywhere at once: the hips turn first
 * and the hand lands last. Sampling each region a few frames earlier in the clip produces that
 * chain for free, out of animation that was authored without it — and it costs one extra
 * lookup per region rather than a rewrite of every clip.
 */
export function sampleClipChained(
  clip: Clip,
  u: number,
  duration: number,
  lag: Readonly<Record<string, number>>,
  regionOf: Readonly<Record<Joint, string>>,
): ResolvedPose {
  const cache = new Map<number, ResolvedPose>();
  const at = (offset: number): ResolvedPose => {
    let pose = cache.get(offset);
    if (!pose) {
      pose = sampleClip(clip, u - offset / Math.max(duration, 1e-4));
      cache.set(offset, pose);
    }
    return pose;
  };

  const joints = {} as Record<Joint, Vec3>;
  for (const joint of JOINT_NAMES) {
    joints[joint] = at(lag[regionOf[joint]] ?? 0).joints[joint];
  }
  // The hips carry the body, so the displacement is theirs and does not lag.
  return { joints, offset: at(0).offset };
}
