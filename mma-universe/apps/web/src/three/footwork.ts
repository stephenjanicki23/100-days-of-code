/**
 * Where the feet are.
 *
 * The fighters used to translate across the canvas while their legs were posed by whatever
 * clip was playing, which is foot sliding: the body moves, the feet come along for the ride,
 * and nothing about the motion is driven from the floor. It is the loudest remaining tell that
 * a figure is being animated rather than walking.
 *
 * A foot here stays where it was put until the leg can no longer comfortably reach it, and
 * then takes a step. Movement is therefore a *consequence* of the feet rather than something
 * happening to them, and the fighters shuffle and reset their stance the way people standing
 * in front of each other actually do — including when the engagement is not moving at all,
 * because standing perfectly still is itself unnatural.
 *
 * ## Why this is planned rather than simulated
 *
 * Foot planting is hysteretic: whether a foot steps now depends on where it was put earlier.
 * That is state, and `sampleFrame` is a pure function of `(timeline, t)` — a property worth
 * keeping, because it is what makes scrubbing identical to playback and a replay identical to
 * the original. So the whole gait is planned once, when the timeline is built, into a list of
 * steps with times attached. Sampling is then a lookup, and stays pure.
 */

import { ease } from './blend.ts';

export type Ground = readonly [number, number];

export interface PathSample {
  readonly time: number;
  readonly x: number;
  readonly z: number;
  readonly yaw: number;
}

export interface FootStep {
  readonly foot: 0 | 1;
  readonly lift: number;
  readonly plant: number;
  readonly from: Ground;
  readonly to: Ground;
}

export interface FootPlan {
  readonly steps: readonly FootStep[];
  readonly start: readonly [Ground, Ground];
}

/** Height of the ankle when the foot is flat on the canvas. */
export const ANKLE_HEIGHT = 0.055;
/** How far a foot may drift from where the stance wants it before it must step. */
const STEP_TRIGGER = 0.16;
/** How long a step takes from lift to plant. */
const STEP_TIME = 0.24;
/** Peak height of the foot mid-step. */
const STEP_LIFT = 0.055;
/** A foot cannot step again immediately; weight has to come back onto it first. */
const STEP_COOLDOWN = 0.28;
/** Even with the body still, a fighter resets their feet every few seconds. */
const IDLE_ADJUST = 2.6;

/**
 * Stance offsets in the fighter's own space: bladed, lead foot forward and slightly across.
 * Index 0 is the lead (left) foot, 1 the rear.
 */
export const STANCE_OFFSET: readonly Ground[] = [
  [0.115, 0.155],
  [-0.105, -0.185],
];

function rotate(offset: Ground, yaw: number): Ground {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return [offset[0] * c + offset[1] * s, -offset[0] * s + offset[1] * c];
}

function wanted(sample: PathSample, foot: 0 | 1, lean = 0): Ground {
  const base = STANCE_OFFSET[foot]!;
  const offset = rotate([base[0], base[1] + lean], sample.yaw);
  return [sample.x + offset[0], sample.z + offset[1]];
}

function distance(a: Ground, b: Ground): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

/**
 * Plans a gait along a path.
 *
 * Only one foot leaves the floor at a time — the other is holding the fighter up — and a foot
 * that has just landed waits before moving again. Those two rules are most of what separates
 * walking from skating.
 */
export interface GaitOptions {
  /** Per-fighter offset so the two of them do not reset their stances in unison. */
  readonly phase?: number;
  /** 0 to 1. A mobile fighter steps sooner and resets more often. */
  readonly mobility?: number;
  /** 0 to 1. Pressure carries the stance forward over the lead foot. */
  readonly pressure?: number;
}

export function planFootwork(path: readonly PathSample[], options: GaitOptions = {}): FootPlan {
  const phase = options.phase ?? 0;
  const mobility = Math.max(0, Math.min(1, options.mobility ?? 0.5));
  const pressure = Math.max(0, Math.min(1, options.pressure ?? 0.5));
  // A light-footed fighter tolerates less drift before resetting, and resets more often when
  // nothing is happening; a flat-footed one plants and stays.
  const trigger = STEP_TRIGGER * (1.35 - mobility * 0.7);
  const idleAdjust = IDLE_ADJUST * (1.5 - mobility * 0.9);
  const lean = (pressure - 0.5) * 0.06;
  const first = path[0];
  if (!first) return { steps: [], start: [[0, 0], [0, 0]] };

  const start: [Ground, Ground] = [wanted(first, 0, lean), wanted(first, 1, lean)];
  const current: [Ground, Ground] = [start[0], start[1]];
  const lastStepEnd: [number, number] = [first.time - idleAdjust * phase, first.time - idleAdjust * (1 - phase)];
  const steps: FootStep[] = [];
  let busyUntil = -Infinity;

  for (let index = 1; index < path.length; index++) {
    const sample = path[index]!;
    if (sample.time < busyUntil) continue;

    for (const foot of [0, 1] as const) {
      const target = wanted(sample, foot, lean);
      const drift = distance(current[foot], target);
      const idle = sample.time - lastStepEnd[foot] > idleAdjust;
      // A step is worth taking if the stance has pulled the foot out of place, or simply
      // because it has been planted long enough that a real fighter would have reset it.
      if (drift < trigger && !(idle && drift > 0.02)) continue;
      if (sample.time - lastStepEnd[foot] < STEP_COOLDOWN) continue;

      // Land where the stance will want the foot when the step finishes, not where it wants
      // it now — otherwise every step lands behind the body and the fighter never catches up.
      const arrival = path.find((entry) => entry.time >= sample.time + STEP_TIME) ?? sample;
      const to = wanted(arrival, foot, lean);
      steps.push({ foot, lift: sample.time, plant: sample.time + STEP_TIME, from: current[foot]!, to });
      current[foot] = to;
      lastStepEnd[foot] = sample.time + STEP_TIME;
      // Blocked until this foot is actually down. Releasing early put both feet in the
      // air at once, which is a jump, not a step.
      busyUntil = sample.time + STEP_TIME;
      break;
    }
  }

  return { steps, start };
}

export interface FootState {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  /** 0 while planted, rising to 1 at the top of a step; drives the toe-off and heel-strike. */
  readonly swing: number;
}

/** Where a foot is at a given moment. A lookup, so scrubbing and playing agree exactly. */
export function footAt(plan: FootPlan, foot: 0 | 1, time: number): FootState {
  let position = plan.start[foot]!;
  for (const step of plan.steps) {
    if (step.foot !== foot) continue;
    if (time >= step.plant) {
      position = step.to;
      continue;
    }
    if (time >= step.lift) {
      const u = (time - step.lift) / Math.max(step.plant - step.lift, 1e-4);
      const eased = ease(u);
      return {
        x: step.from[0] + (step.to[0] - step.from[0]) * eased,
        z: step.from[1] + (step.to[1] - step.from[1]) * eased,
        y: ANKLE_HEIGHT + Math.sin(Math.PI * u) * STEP_LIFT,
        swing: Math.sin(Math.PI * u),
      };
    }
    break;
  }
  return { x: position[0], y: ANKLE_HEIGHT, z: position[1], swing: 0 };
}
