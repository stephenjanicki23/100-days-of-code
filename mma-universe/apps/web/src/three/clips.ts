/**
 * The clip library — the art pipeline, in numbers.
 *
 * `@mma/sim`'s clip registry names the clips a renderer must be able to play; this file is
 * the renderer's side of that contract. Every clip is a duration plus a handful of keyframes
 * over the pose vocabulary, which is why the whole thing is a few hundred lines of data
 * rather than a few hundred megabytes of FBX.
 *
 * Three properties are load-bearing:
 *
 *   - **Coverage is enforced, not assumed.** `apps/web/test/animation.test.ts` asserts that
 *     every name in the simulation's `requiredClips()` resolves here, so adding a technique
 *     to the engine fails the build until the clip exists.
 *   - **Unknown clips never throw.** `resolveClip` falls back to the idle, matching the
 *     mapper's own contract that a shipped renderer may be older than the simulation.
 *   - **Variants are derived, not authored.** The directive carries a variant index chosen
 *     from the event's sequence number; realising it as a fixed perturbation keeps repeated
 *     jabs from looking identical while keeping a replay byte-identical.
 */

import type { HitReaction, FightPositionWire } from '../types.ts';
import type { Ease } from './blend.ts';
import type { Pose } from './poses.ts';
import * as P from './poses.ts';

export interface Keyframe {
  /** Normalised time within the clip, 0 to 1. */
  readonly t: number;
  readonly pose: Pose;
  /** The curve of the segment *arriving* at this keyframe. Defaults to smoothstep. */
  readonly ease?: Ease;
}

export interface Clip {
  /** Seconds at playback speed 1. */
  readonly duration: number;
  /** Ascending in `t`, starting at 0 and ending at 1. */
  readonly keys: readonly Keyframe[];
  /** Normalised time the blow lands, which is when the defender's reaction fires. */
  readonly impactAt: number;
  /** How many authored variants the simulation's registry believes exist. */
  readonly variants: number;
}

function clip(duration: number, impactAt: number, keys: readonly Keyframe[]): Clip {
  return { duration, impactAt, keys, variants: 1 };
}

function k(t: number, pose: Pose, ease?: Ease): Keyframe {
  return ease ? { t, pose, ease } : { t, pose };
}

/**
 * The shape almost every strike shares.
 *
 * The first pass was settle, load, fire, *hold*, recover — and that hold was a freeze-frame at
 * full extension on the end of every punch, which is most of what made the whole thing read as
 * a puppet. A thrown limb does four things instead: it winds up slowly, fires ballistically,
 * carries slightly past the target, and is then caught and brought back. The overshoot is
 * small — eight percent past the impact pose — but it is the difference between mass being
 * thrown and an arm reaching a set point.
 */
function strike(load: Pose, impact: Pose, duration: number, from: Pose = P.STANCE): Clip {
  return clip(duration, 0.45, [
    k(0, from),
    k(0.2, load, 'anticipate'),
    k(0.45, impact, 'snap'),
    k(0.53, P.mix(load, impact, 1.08), 'linear'),
    k(0.74, P.mix(from, impact, 0.22), 'settle'),
    k(1, from, 'settle'),
  ]);
}

/**
 * A grappling sequence: a slower arc through an intermediate position into a hold.
 *
 * Grappling is not ballistic — it is a level change that gathers speed, a drive that arrives
 * hard, and then weight settling into position — so the curves differ from a strike's.
 */
function grapple(duration: number, stages: readonly Pose[], from: Pose = P.STANCE): Clip {
  const keys: Keyframe[] = [k(0, from)];
  const curves: Ease[] = ['anticipate', 'snap', 'settle'];
  stages.forEach((pose, index) => {
    keys.push(k((index + 1) / stages.length, pose, curves[Math.min(index, curves.length - 1)]));
  });
  return clip(duration, 0.72, keys);
}

/* ------------------------------------------------------------------- strikes */

const STRIKES: Record<string, Clip> = {
  strike_jab: strike(P.STANCE, P.JAB, 0.4),
  strike_cross: strike(P.LOADED, P.CROSS, 0.5),
  strike_hook_left: strike(P.STANCE, P.HOOK_L, 0.52),
  strike_hook_right: strike(P.LOADED, P.HOOK_R, 0.54),
  strike_uppercut: strike(P.LOADED, P.UPPERCUT, 0.5),
  strike_overhand: strike(P.LOADED, P.OVERHAND, 0.62),
  strike_elbow: strike(P.CLINCH, P.ELBOW, 0.48, P.CLINCH),
  strike_knee: strike(P.CLINCH, P.KNEE, 0.54, P.CLINCH),

  strike_superman: clip(0.72, 0.52, [
    k(0, P.STANCE),
    k(0.22, P.CROUCH, 'anticipate'),
    k(0.52, P.SUPERMAN, 'snap'),
    k(0.6, P.mix(P.CROUCH, P.SUPERMAN, 1.06), 'linear'),
    k(1, P.STANCE, 'settle'),
  ]),
  strike_backfist: clip(0.62, 0.58, [
    k(0, P.STANCE),
    k(0.34, P.SPIN_CHAMBER, 'anticipate'),
    k(0.58, P.BACKFIST, 'snap'),
    k(0.66, P.mix(P.SPIN_CHAMBER, P.BACKFIST, 1.07), 'linear'),
    k(1, P.STANCE, 'settle'),
  ]),
  strike_flying_knee: clip(0.82, 0.48, [
    k(0, P.STANCE),
    k(0.2, P.CROUCH, 'anticipate'),
    k(0.48, P.FLYING_KNEE, 'snap'),
    k(0.58, P.mix(P.CROUCH, P.FLYING_KNEE, 1.05), 'linear'),
    k(0.86, P.CROUCH, 'settle'),
    k(1, P.STANCE, 'settle'),
  ]),

  kick_low: strike(P.LOADED, P.KICK_LOW, 0.52),
  kick_body: strike(P.LOADED, P.KICK_BODY, 0.62),
  kick_head: strike(P.LOADED, P.KICK_HEAD, 0.72),
  kick_front: strike(P.STANCE, P.KICK_FRONT, 0.52),
  kick_side: strike(P.LOADED, P.KICK_SIDE, 0.62),
  // Spins carry more keyframes than anything else, because the hips travel further than a
  // single interpolation step may cover: euler lerp takes the short way round, so a half turn
  // per keyframe is the ceiling.
  kick_spinning_back: clip(0.88, 0.64, [
    k(0, P.STANCE),
    k(0.24, P.spinTo(P.SPIN_CHAMBER, 1.1), 'anticipate'),
    k(0.46, P.SPIN_CHAMBER, 'linear'),
    k(0.64, P.SPIN_BACK_KICK, 'snap'),
    k(0.72, P.mix(P.SPIN_CHAMBER, P.SPIN_BACK_KICK, 1.06), 'linear'),
    k(1, P.SPIN_RECOVER, 'settle'),
  ]),
  kick_wheel: clip(0.96, 0.68, [
    k(0, P.STANCE),
    k(0.2, P.spinTo(P.SPIN_CHAMBER, 1.1), 'anticipate'),
    k(0.38, P.SPIN_CHAMBER, 'linear'),
    k(0.54, P.spinTo(P.WHEEL_KICK, P.WHEEL_KICK_YAW - 2.1), 'linear'),
    k(0.68, P.WHEEL_KICK, 'snap'),
    k(0.77, P.spinTo(P.WHEEL_KICK, P.WHEEL_KICK_YAW + 0.22), 'linear'),
    k(1, P.SPIN_RECOVER, 'settle'),
  ]),

  ground_punch: strike(P.MOUNT_TOP, P.GROUND_STRIKE_DOWN, 0.4, P.MOUNT_TOP),
  ground_elbow: strike(P.GROUND_STRIKE_UP, P.GROUND_STRIKE_DOWN, 0.46, P.MOUNT_TOP),
  ground_hammerfist: strike(P.GROUND_STRIKE_UP, P.GROUND_STRIKE_DOWN, 0.42, P.MOUNT_TOP),
};

/* ----------------------------------------------------------------- takedowns */

const TAKEDOWNS: Record<string, Clip> = {
  td_double_leg: grapple(1.0, [P.SHOT, P.DRIVE, P.MOUNT_TOP]),
  td_single_leg: grapple(1.05, [P.SHOT, P.LIFT, P.MOUNT_TOP]),
  td_body_lock: grapple(1.0, [P.CLINCH, P.LIFT, P.MOUNT_TOP], P.CLINCH),
  td_trip: grapple(0.9, [P.CLINCH, P.DRIVE, P.MOUNT_TOP], P.CLINCH),
  td_throw: grapple(1.05, [P.CLINCH, P.LIFT, P.SLAM, P.MOUNT_TOP], P.CLINCH),
  td_suplex: clip(1.35, 0.66, [
    k(0, P.CLINCH),
    k(0.24, P.LIFT),
    k(0.46, P.ARCH),
    k(0.66, P.SLAM),
    k(0.84, P.SCRAMBLE_UP),
    k(1, P.MOUNT_TOP),
  ]),
  td_ankle_pick: grapple(0.92, [P.SHOT, P.SLAM, P.MOUNT_TOP]),
  td_cage_drag: grapple(1.0, [P.CLINCH, P.DRIVE, P.MOUNT_TOP], P.CLINCH),
};

/* --------------------------------------------------------------- submissions */

/** A choke or arm attack: take the position, lock it, squeeze. */
function chokeClip(duration = 1.2): Clip {
  return clip(duration, 0.75, [
    k(0, P.MOUNT_TOP),
    k(0.34, P.SUB_APPLY),
    k(0.75, P.SUB_APPLY),
    k(1, P.SUB_APPLY),
  ]);
}

/** A leg attack: isolate the limb and fall back with it. */
function legLockClip(duration = 1.25): Clip {
  return clip(duration, 0.72, [
    k(0, P.MOUNT_TOP),
    k(0.32, P.SCRAMBLE_UP),
    k(0.72, P.SUB_LEG),
    k(1, P.SUB_LEG),
  ]);
}

const SUBMISSIONS: Record<string, Clip> = {
  sub_rnc: chokeClip(1.3),
  sub_guillotine: chokeClip(1.15),
  sub_triangle: clip(1.25, 0.74, [
    k(0, P.GUARD_BOTTOM),
    k(0.36, P.SUB_CAUGHT),
    k(0.74, P.SUB_CAUGHT),
    k(1, P.SUB_CAUGHT),
  ]),
  sub_armbar: clip(1.3, 0.74, [
    k(0, P.MOUNT_TOP),
    k(0.34, P.SUB_APPLY),
    k(0.74, P.SUB_LEG),
    k(1, P.SUB_LEG),
  ]),
  sub_kimura: chokeClip(1.2),
  sub_americana: chokeClip(1.15),
  sub_darce: chokeClip(1.2),
  sub_anaconda: chokeClip(1.2),
  sub_arm_triangle: chokeClip(1.25),
  sub_neck_crank: chokeClip(1.1),
  sub_heel_hook: legLockClip(1.25),
  sub_kneebar: legLockClip(1.3),
};

/* ---------------------------------------------------------- non-technique beats */

const BEATS: Record<string, Clip> = {
  def_sprawl: clip(0.7, 0.4, [k(0, P.STANCE), k(0.24, P.CROUCH), k(0.5, P.SPRAWL), k(0.72, P.SPRAWL), k(1, P.STANCE)]),
  clinch_enter: clip(0.7, 0.6, [k(0, P.STANCE), k(0.4, P.CROUCH), k(1, P.CLINCH)]),
  clinch_break: clip(0.6, 0.35, [k(0, P.CLINCH), k(0.4, P.CLINCH_BREAK), k(1, P.STANCE)]),
  scramble: clip(0.9, 0.5, [
    k(0, P.GUARD_BOTTOM),
    k(0.3, P.SCRAMBLE_UP),
    k(0.62, P.TURTLE),
    k(1, P.SCRAMBLE_UP),
  ]),
  knockdown: clip(1.15, 0.28, [
    k(0, P.STANCE),
    k(0.14, P.HIT_HEAVY, 'snap'),
    k(0.42, P.STAGGER, 'settle'),
    k(0.72, P.DOWNED, 'anticipate'),
    k(1, P.DOWNED, 'settle'),
  ]),
  stun_wobble: clip(1.0, 0.36, [
    k(0, P.STANCE),
    k(0.26, P.HIT_HEAVY, 'snap'),
    k(0.62, P.WOBBLE, 'settle'),
    k(1, P.WOBBLE, 'smooth'),
  ]),
  reaction_cut: clip(0.9, 0.35, [k(0, P.STANCE), k(0.3, P.HIT_LIGHT), k(0.6, P.CUT_CHECK), k(1, P.STANCE)]),

  stance_idle: clip(2.2, 0.5, [
    k(0, P.STANCE),
    k(0.25, P.LOADED),
    k(0.5, P.STANCE),
    k(0.75, P.WALK_IDLE),
    k(1, P.STANCE),
  ]),
  intro_touch_gloves: clip(1.3, 0.55, [
    k(0, P.WALK_IDLE),
    k(0.5, P.TOUCH_GLOVES),
    k(0.7, P.TOUCH_GLOVES),
    k(1, P.STANCE),
  ]),
  round_end_return: clip(1.4, 0.5, [k(0, P.STANCE), k(0.4, P.WALK_IDLE), k(1, P.WALK_IDLE)]),
  corner_seated: clip(2.0, 0.5, [k(0, P.CORNER_SEATED), k(0.5, P.CORNER_SEATED), k(1, P.CORNER_SEATED)]),
  ref_intervene: clip(1.0, 0.4, [k(0, P.STANCE), k(0.4, P.CLINCH_BREAK), k(1, P.WALK_IDLE)]),
  doctor_check: clip(1.6, 0.5, [k(0, P.WALK_IDLE), k(0.4, P.CUT_CHECK), k(0.8, P.CUT_CHECK), k(1, P.WALK_IDLE)]),
  fight_end_celebrate: clip(2.0, 0.35, [
    k(0, P.STANCE),
    k(0.3, P.ARMS_RAISED),
    k(0.6, P.ARMS_RAISED),
    k(0.8, P.WALK_IDLE),
    k(1, P.ARMS_RAISED),
  ]),
  decision_announce: clip(2.0, 0.5, [
    k(0, P.WALK_IDLE),
    k(0.35, P.WALK_IDLE),
    k(0.6, P.ARMS_RAISED),
    k(1, P.ARMS_RAISED),
  ]),
};

export const CLIPS: Readonly<Record<string, Clip>> = {
  ...STRIKES,
  ...TAKEDOWNS,
  ...SUBMISSIONS,
  ...BEATS,
};

/** The documented fallback, matching the mapper's own `FALLBACK_DIRECTIVE`. */
export const IDLE_CLIP = CLIPS.stance_idle as Clip;

/* ------------------------------------------------------------------ reactions */

/**
 * What the fighter on the receiving end does. Reactions are short, blend over whatever the
 * defender was already doing, and are timed to the actor clip's `impactAt` rather than to
 * the start of the beat.
 */
export const REACTIONS: Readonly<Record<HitReaction, Clip>> = {
  NONE: clip(0.3, 0, [k(0, P.STANCE), k(1, P.STANCE)]),
  LIGHT: clip(0.42, 0, [
    k(0, P.STANCE),
    k(0.22, P.HIT_LIGHT, 'snap'),
    k(1, P.STANCE, 'settle'),
  ]),
  HEAVY: clip(0.72, 0, [
    k(0, P.STANCE),
    k(0.18, P.mix(P.STANCE, P.HIT_HEAVY, 1.12), 'snap'),
    k(0.42, P.HIT_HEAVY, 'linear'),
    k(0.68, P.WOBBLE, 'settle'),
    k(1, P.STANCE, 'settle'),
  ]),
  STAGGER: clip(1.1, 0, [
    k(0, P.STANCE),
    k(0.15, P.mix(P.STANCE, P.HIT_HEAVY, 1.15), 'snap'),
    k(0.42, P.STAGGER, 'settle'),
    k(0.76, P.WOBBLE, 'smooth'),
    k(1, P.WOBBLE, 'settle'),
  ]),
  DROP: clip(1.25, 0, [
    k(0, P.STANCE),
    k(0.13, P.mix(P.STANCE, P.HIT_HEAVY, 1.18), 'snap'),
    k(0.4, P.STAGGER, 'settle'),
    k(0.72, P.DOWNED, 'anticipate'),
    k(1, P.DOWNED, 'settle'),
  ]),
  BLOCK: clip(0.44, 0, [
    k(0, P.STANCE),
    k(0.2, P.BLOCK_HIGH, 'snap'),
    k(0.5, P.BLOCK_HIGH, 'linear'),
    k(1, P.STANCE, 'settle'),
  ]),
  SLIP: clip(0.5, 0, [
    k(0, P.STANCE),
    k(0.26, P.SLIP, 'snap'),
    k(1, P.STANCE, 'settle'),
  ]),
  SPRAWL_DEFEND: clip(0.8, 0, [
    k(0, P.STANCE),
    k(0.22, P.CROUCH, 'anticipate'),
    k(0.5, P.SPRAWL, 'snap'),
    k(1, P.STANCE, 'settle'),
  ]),
};

/* -------------------------------------------------------------------- stances */

/**
 * The resting pose a fighter holds in a given position when nothing else is driving them.
 * Ground positions are asymmetric, so the pose depends on which side of the beat the
 * fighter is on: the actor is on top, the reactor underneath.
 */
export function restPose(position: FightPositionWire, role: 'ACTOR' | 'REACTOR'): Pose {
  const bottom = role === 'REACTOR';
  switch (position) {
    case 'STANDING':
      return P.STANCE;
    case 'CLINCH':
    case 'CAGE_CLINCH':
      return P.CLINCH;
    case 'TAKEDOWN_ATTEMPT':
      return bottom ? P.SPRAWL : P.SHOT;
    case 'GROUND_TOP':
    case 'SIDE_CONTROL':
    case 'MOUNT':
      return bottom ? P.SUPINE : P.MOUNT_TOP;
    case 'GROUND_BOTTOM':
      return bottom ? P.MOUNT_TOP : P.GUARD_BOTTOM;
    case 'GUARD':
    case 'HALF_GUARD':
      return bottom ? P.GUARD_BOTTOM : P.MOUNT_TOP;
    case 'BACK_CONTROL':
      return bottom ? P.TURTLE : P.SUB_APPLY;
    case 'SCRAMBLE':
      return P.SCRAMBLE_UP;
    case 'SUBMISSION_ATTEMPT':
      return bottom ? P.SUB_CAUGHT : P.SUB_APPLY;
    case 'STUNNED':
      return P.WOBBLE;
    case 'RECOVERY':
      return P.CROUCH;
    default:
      return P.STANCE;
  }
}

/** True when the position puts fighters on the canvas, which the camera and spacing use. */
export function isGrounded(position: FightPositionWire): boolean {
  switch (position) {
    case 'GROUND_TOP':
    case 'GROUND_BOTTOM':
    case 'GUARD':
    case 'HALF_GUARD':
    case 'SIDE_CONTROL':
    case 'MOUNT':
    case 'BACK_CONTROL':
    case 'SCRAMBLE':
    case 'SUBMISSION_ATTEMPT':
      return true;
    default:
      return false;
  }
}

/* -------------------------------------------------------------------- variants */

/**
 * Realises the variant index the mapper chose.
 *
 * Authoring three separate jabs would triple the data for a difference nobody could name, so
 * a variant is instead a fixed perturbation of the authored clip: slightly different timing
 * and a small lean. The table is indexed, never random, so the same event stream produces
 * the same motion on every replay — the whole point of the mapper deriving `variant` from
 * the event's sequence number rather than rolling for it.
 */
const VARIANT_TIMING = [1, 0.93, 1.08, 0.97] as const;
const VARIANT_LEAN = [0, 0.06, -0.05, 0.03] as const;

export function applyVariant(source: Clip, variant: number): Clip {
  if (variant <= 0) return source;
  const index = variant % VARIANT_TIMING.length;
  const timing = VARIANT_TIMING[index] ?? 1;
  const lean = VARIANT_LEAN[index] ?? 0;
  if (timing === 1 && lean === 0) return source;
  return {
    ...source,
    duration: source.duration * timing,
    keys: source.keys.map(({ t, pose }) => ({
      t,
      pose: {
        joints: {
          ...pose.joints,
          spine: leanBy(pose.joints.spine, lean),
        },
        offset: pose.offset,
      },
    })),
  };
}

function leanBy(
  rotation: readonly [number, number, number] | undefined,
  lean: number,
): readonly [number, number, number] {
  const base = rotation ?? ([0, 0, 0] as const);
  return [base[0], base[1] + lean, base[2]];
}

/** Never throws: an unknown clip name resolves to the idle, as the contract requires. */
export function resolveClip(name: string, variant = 0): Clip {
  return applyVariant(CLIPS[name] ?? IDLE_CLIP, variant);
}
