/**
 * The life layer — what a fighter does when they are doing nothing.
 *
 * The single largest cause of a puppet look is that a keyframed figure is *perfectly still*
 * between keyframes. Real fighters never stop moving: they breathe, they bounce, they shift
 * weight foot to foot, their guard floats, their head drifts. None of that is in the event
 * stream, and none of it should be — it is not something that *happened*, so the engine has
 * no business emitting it. It belongs here, in the renderer, as presentation.
 *
 * Everything below is a pure function of absolute time, which matters for two reasons:
 * scrubbing to a moment gives the same frame as playing to it, and a replay is identical.
 * There is no noise source and no accumulated state.
 *
 * Frequencies are deliberately incommensurate — 1.63, 0.41, 0.87, 0.29 Hz and so on — so the
 * combined motion never visibly repeats. Amplitudes are small enough that the layer reads as
 * life rather than as animation; `life.test.ts` holds them to that.
 */

import type { Joint, Vec3 } from './rig.ts';
import type { ResolvedPose } from './blend.ts';

export interface LifeOptions {
  /** Absolute time in the timeline, in seconds. */
  readonly time: number;
  /** Per-fighter offset, so the two of them are never in lockstep. */
  readonly phase: number;
  /** How much of the layer applies: full at rest, damped mid-technique. */
  readonly intensity: number;
  /** 0 in the first round, approaching 1 late — slows the bounce and drops the guard. */
  readonly fatigue: number;
  /** On the canvas the bounce and weight shift make no sense; breathing still does. */
  readonly grounded: boolean;
  /** How high this fighter carries their hands, 0 to 1. Not everyone fights the same. */
  readonly guard?: number;
  /** Liveliness of the stance: a mobile fighter is never quite still. */
  readonly verve?: number;
  /**
   * Momentary loss of composure after being hurt, 0 to 1, decaying over seconds.
   *
   * This is what turns a knockdown from a clip into a *condition*. A fighter who has just been
   * badly hurt does not play a stagger animation and then resume as if nothing happened; their
   * hands stay down, their base widens and they wobble for a while afterwards. The brief calls
   * for NORMAL -> STUNNED -> STAGGER -> RECOVERING; a value that decays passes through all of
   * those without needing discrete states to switch between.
   */
  readonly stagger?: number;
  /**
   * A feint in progress, 0 to 1.
   *
   * Worth being explicit about: the simulation never emitted this. It is the renderer showing
   * intent rather than an action — a shoulder and a level change that go nowhere. It is kept
   * deliberately small, it only fires when the fighter is otherwise idle, and it is derived
   * from time and the fighter's own phase rather than rolled, so a replay is identical. It is
   * the one place the renderer adds something the fight did not contain.
   */
  readonly feint?: number;
}

/** Ceiling on any single joint offset this layer may add, in radians. */
export const MAX_JOINT_OFFSET = 0.06;
/** Ceiling on the hip displacement this layer may add, in metres. */
export const MAX_HIP_OFFSET = 0.03;

function clamp(value: number, limit: number): number {
  return value > limit ? limit : value < -limit ? -limit : value;
}

function add(
  joints: Record<Joint, Vec3>,
  joint: Joint,
  x: number,
  y: number,
  z: number,
): void {
  const base = joints[joint];
  joints[joint] = [
    base[0] + clamp(x, MAX_JOINT_OFFSET),
    base[1] + clamp(y, MAX_JOINT_OFFSET),
    base[2] + clamp(z, MAX_JOINT_OFFSET),
  ];
}

/**
 * Adds the idle layer on top of a sampled pose.
 *
 * The order matters: this runs *after* clip sampling, so a strike keeps its authored shape and
 * merely carries a little residual motion, rather than having the idle fight the action.
 */
export function addLife(pose: ResolvedPose, options: LifeOptions): ResolvedPose {
  const { time, phase, fatigue, grounded } = options;
  const guardTrait = options.guard ?? 0.5;
  const verve = options.verve ?? 0.5;
  const stagger = Math.max(0, Math.min(1, options.stagger ?? 0));
  const feint = Math.max(0, Math.min(1, options.feint ?? 0));
  const strength = Math.max(0, Math.min(1, options.intensity));
  if (strength <= 0.001) return pose;

  const t = time + phase;

  // Breathing quickens and deepens as the fight wears on — the one part of the layer that
  // still applies flat on the canvas.
  const breathRate = 0.38 + fatigue * 0.42;
  const breath = Math.sin(t * Math.PI * 2 * breathRate);
  const breathDepth = (0.010 + fatigue * 0.017) * strength;

  // Weight shifting foot to foot, and the small bounce a fighter carries in their stance.
  // Both slow and shrink with fatigue; neither survives going to the ground.
  // A mobile fighter carries more life in the stance; a flat-footed one carries less.
  const stanceScale = grounded ? 0 : strength * (1 - fatigue * 0.45) * (0.65 + verve * 0.7);
  const bounce = Math.sin(t * Math.PI * 2 * (1.63 - fatigue * 0.5 + verve * 0.25));
  const shift = Math.sin(t * Math.PI * 2 * 0.41 + 1.2);
  const drift = Math.sin(t * Math.PI * 2 * 0.29 + 2.6);

  // The guard floats rather than hanging in space, each arm on its own clock.
  const guardL = Math.sin(t * Math.PI * 2 * 0.87 + 0.4);
  const guardR = Math.sin(t * Math.PI * 2 * 0.73 + 2.1);
  const guardScale = strength * (grounded ? 0.3 : 1);

  // Fatigue drops the hands and lifts the chin — the tell every commentator reaches for. Being
  // hurt does the same thing faster, and a fighter who carries a low guard starts there.
  const droop = (fatigue + stagger * 0.8 + (1 - guardTrait) * 0.35) * strength * (grounded ? 0.2 : 1);
  // Hurt fighters sway on a slower, larger arc than a stance bounce.
  const wobble = stagger === 0 ? 0 : Math.sin(t * Math.PI * 2 * 0.55) * stagger * strength;

  const joints = { ...pose.joints } as Record<Joint, Vec3>;

  add(
    joints,
    'spine',
    breath * breathDepth + drift * 0.012 * stanceScale + feint * 0.05,
    shift * 0.02 * stanceScale + wobble * 0.05,
    shift * 0.014 * stanceScale + wobble * 0.06,
  );
  add(joints, 'chest', breath * breathDepth * 0.8, drift * 0.016 * stanceScale, -shift * 0.01 * stanceScale);
  add(joints, 'neck', -breath * breathDepth * 0.5 + droop * 0.05, drift * 0.02 * strength, 0);
  add(joints, 'head', drift * 0.02 * strength, guardL * 0.026 * strength, shift * 0.012 * strength);

  // A feint is a shoulder and a hint of a level change that go nowhere.
  add(joints, 'armL', guardL * 0.03 * guardScale + droop * 0.055 - feint * 0.06, guardR * 0.012 * guardScale, -guardL * 0.016 * guardScale);
  add(joints, 'forearmL', guardR * 0.034 * guardScale + droop * 0.05, 0, guardL * 0.012 * guardScale);
  add(joints, 'armR', guardR * 0.028 * guardScale + droop * 0.055, guardL * 0.012 * guardScale, guardR * 0.016 * guardScale);
  add(joints, 'forearmR', guardL * 0.031 * guardScale + droop * 0.05, 0, -guardR * 0.012 * guardScale);

  add(joints, 'thighL', -bounce * 0.022 * stanceScale, 0, shift * 0.014 * stanceScale);
  add(joints, 'shinL', bounce * 0.026 * stanceScale, 0, 0);
  add(joints, 'thighR', bounce * 0.022 * stanceScale, 0, -shift * 0.014 * stanceScale);
  add(joints, 'shinR', -bounce * 0.024 * stanceScale, 0, 0);

  const hipDrop = clamp(
    (-Math.abs(bounce) * 0.014 + breath * 0.004) * stanceScale - feint * 0.012 - stagger * 0.02,
    MAX_HIP_OFFSET,
  );
  const hipSway = clamp(shift * 0.018 * stanceScale + wobble * 0.02, MAX_HIP_OFFSET);

  return {
    joints,
    offset: [pose.offset[0] + hipSway, pose.offset[1] + hipDrop, pose.offset[2]],
  };
}

/**
 * How tired a fighter should look, from the round alone.
 *
 * A cheap proxy, but it comes free from data the event already carries, and it means a
 * five-round fight visibly decays: the bounce slows, the guard sags, the breathing deepens.
 */
export function fatigueForRound(round: number, engine = 0.5): number {
  // A fighter with an engine is barely into their work by round three; one without is not.
  const wear = (round - 1) / 4.5;
  return Math.max(0, Math.min(1, wear * (1.45 - engine * 0.9)));
}

/**
 * When a fighter is feinting, as a deterministic function of time.
 *
 * A short pulse on a cycle whose length falls as the fighter gets craftier, offset by their
 * own phase so the two of them never feint together. No random source: the same fight feints
 * at the same moments every replay.
 */
export function feintAt(deception: number, phase: number, time: number): number {
  const interval = 7.5 - Math.max(0, Math.min(1, deception)) * 3.6;
  const offset = (phase / (Math.PI * 2)) * interval;
  const position = ((time + offset) % interval) / interval;
  const window = 0.16;
  return position < window ? Math.sin((position / window) * Math.PI) : 0;
}

/** How hurt a fighter still looks, given when they were last badly caught. */
export function staggerAt(hits: readonly { at: number; magnitude: number }[], time: number): number {
  let worst = 0;
  for (const hit of hits) {
    if (hit.at > time) break;
    const since = time - hit.at;
    // Composure comes back over a few seconds rather than on the next beat.
    const decay = Math.exp(-since / 3.2);
    worst = Math.max(worst, hit.magnitude * decay);
  }
  return Math.min(1, worst);
}
