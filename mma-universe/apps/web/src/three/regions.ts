/**
 * Body regions, and how strongly a clip claims each of them.
 *
 * The root cause of the robotic look was that a clip returned a whole-body pose: nineteen
 * joints, all owned by one animation. A fighter throwing a jab therefore had the legs the jab
 * clip specified, and could not simultaneously be circling, shifting weight or stepping. Every
 * action was total, so every action read as a discrete state the body snapped into and out of.
 *
 * The fix is to stop treating a clip as a pose and start treating it as a *claim* over parts
 * of the body. A jab has an overwhelming claim on the lead arm, a strong one on the spine —
 * because a punch is thrown from the hips — and a weak one on the legs. Whatever it does not
 * claim is left to the locomotion layer underneath.
 *
 * Those claims are derived rather than authored. Hand-annotating 56 clips across 6 regions
 * would be 336 numbers to keep in sync with every future edit; measuring how far each clip
 * actually moves each region from a neutral stance gets the same answer and cannot drift.
 */

import type { Joint } from './rig.ts';
import { JOINT_NAMES } from './rig.ts';
import type { Clip } from './clips.ts';
import { CLIPS, REACTIONS } from './clips.ts';
import { STANCE } from './poses.ts';
import { resolvePose } from './blend.ts';

export const REGIONS = ['LEGS', 'HIPS', 'SPINE', 'ARM_L', 'ARM_R', 'HEAD'] as const;
export type Region = (typeof REGIONS)[number];

/** Which region owns each joint. Every joint belongs to exactly one. */
export const JOINT_REGION: Readonly<Record<Joint, Region>> = {
  hips: 'HIPS',
  spine: 'SPINE',
  chest: 'SPINE',
  neck: 'HEAD',
  head: 'HEAD',
  shoulderL: 'ARM_L',
  armL: 'ARM_L',
  forearmL: 'ARM_L',
  handL: 'ARM_L',
  shoulderR: 'ARM_R',
  armR: 'ARM_R',
  forearmR: 'ARM_R',
  handR: 'ARM_R',
  thighL: 'LEGS',
  shinL: 'LEGS',
  footL: 'LEGS',
  thighR: 'LEGS',
  shinR: 'LEGS',
  footR: 'LEGS',
};

export type RegionMask = Readonly<Record<Region, number>>;

/** Everything, for beats that genuinely take over the body — a knockdown, a submission. */
export const FULL_MASK: RegionMask = { LEGS: 1, HIPS: 1, SPINE: 1, ARM_L: 1, ARM_R: 1, HEAD: 1 };

/**
 * How far a clip swings a region, in radians, at its furthest from a neutral stance.
 *
 * Measured across every keyframe rather than at the extreme alone: a clip that passes through
 * a region on its way somewhere else still has a claim on it while it does.
 */
function reachOf(clip: Clip): Record<Region, number> {
  const neutral = resolvePose(STANCE);
  const reach: Record<Region, number> = { LEGS: 0, HIPS: 0, SPINE: 0, ARM_L: 0, ARM_R: 0, HEAD: 0 };
  for (const key of clip.keys) {
    const pose = resolvePose(key.pose);
    for (const joint of JOINT_NAMES) {
      let delta = 0;
      for (let axis = 0; axis < 3; axis++) {
        delta += Math.abs(pose.joints[joint][axis]! - neutral.joints[joint][axis]!);
      }
      const region = JOINT_REGION[joint];
      reach[region] = Math.max(reach[region], delta);
    }
  }
  return reach;
}

/**
 * The radians of swing at which a clip is considered to have taken a region over completely.
 *
 * Below it the claim scales, so a strike's hip rotation reads as weight transfer contributed
 * *on top of* the footwork rather than as the strike seizing the legs.
 */
const FULL_CLAIM = 1.5;

function maskFrom(clip: Clip): RegionMask {
  const reach = reachOf(clip);
  const mask = {} as Record<Region, number>;
  for (const region of REGIONS) {
    mask[region] = Math.min(1, reach[region] / FULL_CLAIM);
  }
  return mask;
}

const CACHE = new Map<Clip, RegionMask>();

/** The regions a clip claims, and how strongly. Computed once per clip, then remembered. */
export function claimOf(clip: Clip): RegionMask {
  let mask = CACHE.get(clip);
  if (!mask) {
    mask = maskFrom(clip);
    CACHE.set(clip, mask);
  }
  return mask;
}

/**
 * A knockdown, a submission or a takedown is not a claim over part of the body — it is the
 * whole body going somewhere. These clips bypass the layering entirely.
 */
const TOTAL_CLIPS = new Set([
  'knockdown',
  'td_double_leg',
  'td_single_leg',
  'td_body_lock',
  'td_trip',
  'td_throw',
  'td_suplex',
  'td_ankle_pick',
  'td_cage_drag',
  'scramble',
  'def_sprawl',
  'round_end_return',
  'corner_seated',
  'doctor_check',
  'fight_end_celebrate',
  'decision_announce',
  'intro_touch_gloves',
]);

export function isTotal(clipName: string): boolean {
  return TOTAL_CLIPS.has(clipName) || clipName.startsWith('sub_');
}

/** Precomputes every mask, so the first frame of a fight is not the slowest. */
export function warmMasks(): void {
  for (const clip of Object.values(CLIPS)) claimOf(clip);
  for (const clip of Object.values(REACTIONS)) claimOf(clip);
}

/**
 * How far each region lags the hips, in seconds.
 *
 * A punch is a chain: the hips turn, the torso follows, the shoulder follows that, and the arm
 * arrives last. Animating every joint off the same clock makes the whole body move as one
 * rigid piece, which is a large part of why keyframed figures read as mechanical even when the
 * poses themselves are good.
 *
 * The lag is small — a few frames — and deliberately asymmetric between the arms, because the
 * limb doing the work leads and the guard hand trails it.
 */
export const REGION_LAG: Readonly<Record<Region, number>> = {
  HIPS: 0,
  LEGS: 0.006,
  SPINE: 0.022,
  ARM_L: 0.048,
  ARM_R: 0.048,
  HEAD: 0.034,
};

/** The longest lag any region carries, for callers that need to bound their sampling. */
export const MAX_LAG = Math.max(...Object.values(REGION_LAG));
