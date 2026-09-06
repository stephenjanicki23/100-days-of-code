/**
 * The 3D visualisation abstraction (brief §16, §17).
 *
 * The brief's central constraint is explicit: do **not** generate a new animation per event.
 * So this layer is a *lookup*, not a generator. A `FightEvent` (what happened) resolves
 * through a static registry into an `AnimationDirective` (which prebuilt clip to play, what
 * state that implies, where the camera should be, what reaction the opponent shows).
 *
 *     FightEvent ──▶ AnimationMapper ──▶ AnimationDirective ──▶ engine-native playback
 *      (what)          (registry)          (clip + state + camera)
 *
 * Three properties matter for the engine-side work:
 *
 *   - **Deterministic variants.** Repeated jabs must not look identical, but a replay must
 *     look the same every time, so the variant index is derived from the event's sequence
 *     number rather than from a random draw in the renderer.
 *   - **Total.** Every event resolves to something. An unrecognised event type falls back to
 *     a documented idle/transition clip rather than throwing, so the renderer can be older
 *     than the engine feeding it.
 *   - **Pure data.** This module lives in `@mma/sim` and has no engine dependency, so the
 *     mapping is testable in a unit test and can be exported to Unreal or Unity as JSON.
 */

import type { FightEvent, FightPosition } from '../fight/events.ts';
import { isStrikeEvent } from '../fight/events.ts';

/** Where the camera should be for this beat. The renderer owns the actual framing. */
export type CameraHint =
  | 'WIDE'
  | 'BROADCAST'
  | 'CLOSE'
  | 'IMPACT'
  | 'GROUND_OVERHEAD'
  | 'CAGE_SIDE'
  | 'REPLAY'
  | 'CORNER';

/** The reaction played on the receiving fighter. */
/**
 * How the fighter on the receiving end reacts.
 *
 * `BODY_FOLD` and `LEG_BUCKLE` were added once it became clear that every landed strike was
 * producing the same head snap regardless of where it hit: a hook to the liver and a low kick
 * to the thigh are not the same event to watch. Consumers tolerate unknown values by contract,
 * so an older renderer simply falls back rather than breaking.
 */
export type HitReaction =
  | 'NONE'
  | 'LIGHT'
  | 'HEAVY'
  | 'STAGGER'
  | 'DROP'
  | 'BLOCK'
  | 'SLIP'
  | 'SPRAWL_DEFEND'
  | 'BODY_FOLD'
  | 'LEG_BUCKLE';

export interface AnimationDirective {
  /** Prebuilt clip identifier the engine has authored. Never generated at runtime. */
  readonly clip: string;
  /** Which of the clip's authored variants to play; stable for a given event. */
  readonly variant: number;
  /** The locomotion/position state the fighters should be in once this beat resolves. */
  readonly targetState: FightPosition;
  readonly camera: CameraHint;
  readonly reaction: HitReaction;
  /** Playback rate; heavier or more decisive beats read better slightly slowed. */
  readonly speed: number;
  /** Whether the renderer should queue a replay after this beat. */
  readonly triggersReplay: boolean;
  /** Which fighter plays `clip`; the other plays `reaction`. */
  readonly actorId?: string;
  readonly reactorId?: string;
}

interface ClipEntry {
  readonly clip: string;
  readonly variants: number;
  readonly camera?: CameraHint;
  readonly speed?: number;
}

/**
 * The clip registry. Keys are the technique or event name; the values are the authored
 * clips and how many variants of each exist. This table is the contract with the art
 * pipeline — adding a technique means adding a row here and an animation asset, and nothing
 * else in the simulation changes.
 */
const CLIP_REGISTRY: Readonly<Record<string, ClipEntry>> = {
  // Strikes
  JAB: { clip: 'strike_jab', variants: 3 },
  CROSS: { clip: 'strike_cross', variants: 2 },
  RIGHT_CROSS: { clip: 'strike_cross', variants: 2 },
  LEFT_HOOK: { clip: 'strike_hook_left', variants: 2 },
  RIGHT_HOOK: { clip: 'strike_hook_right', variants: 2 },
  UPPERCUT: { clip: 'strike_uppercut', variants: 2 },
  OVERHAND: { clip: 'strike_overhand', variants: 2, speed: 0.95 },
  SUPERMAN_PUNCH: { clip: 'strike_superman', variants: 1, camera: 'IMPACT' },
  BACKFIST: { clip: 'strike_backfist', variants: 1, camera: 'IMPACT' },
  ELBOW: { clip: 'strike_elbow', variants: 2, camera: 'CLOSE' },
  KNEE: { clip: 'strike_knee', variants: 2, camera: 'CLOSE' },
  FLYING_KNEE: { clip: 'strike_flying_knee', variants: 1, camera: 'IMPACT', speed: 0.9 },
  LOW_KICK: { clip: 'kick_low', variants: 3 },
  BODY_KICK: { clip: 'kick_body', variants: 2 },
  HEAD_KICK: { clip: 'kick_head', variants: 2, camera: 'IMPACT', speed: 0.92 },
  FRONT_KICK: { clip: 'kick_front', variants: 2 },
  SIDE_KICK: { clip: 'kick_side', variants: 1 },
  SPINNING_BACK_KICK: { clip: 'kick_spinning_back', variants: 1, camera: 'IMPACT', speed: 0.9 },
  WHEEL_KICK: { clip: 'kick_wheel', variants: 1, camera: 'IMPACT', speed: 0.9 },
  GROUND_PUNCH: { clip: 'ground_punch', variants: 3, camera: 'GROUND_OVERHEAD' },
  GROUND_ELBOW: { clip: 'ground_elbow', variants: 2, camera: 'GROUND_OVERHEAD' },
  HAMMERFIST: { clip: 'ground_hammerfist', variants: 2, camera: 'GROUND_OVERHEAD' },

  // Takedowns
  DOUBLE_LEG: { clip: 'td_double_leg', variants: 2, camera: 'CAGE_SIDE' },
  SINGLE_LEG: { clip: 'td_single_leg', variants: 2, camera: 'CAGE_SIDE' },
  BODY_LOCK: { clip: 'td_body_lock', variants: 1, camera: 'CAGE_SIDE' },
  TRIP: { clip: 'td_trip', variants: 2 },
  THROW: { clip: 'td_throw', variants: 2, camera: 'IMPACT', speed: 0.95 },
  SUPLEX: { clip: 'td_suplex', variants: 1, camera: 'IMPACT', speed: 0.9 },
  ANKLE_PICK: { clip: 'td_ankle_pick', variants: 1 },
  CAGE_DRAG: { clip: 'td_cage_drag', variants: 1, camera: 'CAGE_SIDE' },

  // Submissions
  REAR_NAKED_CHOKE: { clip: 'sub_rnc', variants: 1, camera: 'CLOSE' },
  GUILLOTINE: { clip: 'sub_guillotine', variants: 1, camera: 'CLOSE' },
  TRIANGLE: { clip: 'sub_triangle', variants: 1, camera: 'GROUND_OVERHEAD' },
  ARMBAR: { clip: 'sub_armbar', variants: 2, camera: 'GROUND_OVERHEAD' },
  KIMURA: { clip: 'sub_kimura', variants: 1, camera: 'CLOSE' },
  AMERICANA: { clip: 'sub_americana', variants: 1, camera: 'CLOSE' },
  D_ARCE: { clip: 'sub_darce', variants: 1, camera: 'CLOSE' },
  ANACONDA: { clip: 'sub_anaconda', variants: 1, camera: 'CLOSE' },
  HEEL_HOOK: { clip: 'sub_heel_hook', variants: 1, camera: 'GROUND_OVERHEAD' },
  KNEEBAR: { clip: 'sub_kneebar', variants: 1, camera: 'GROUND_OVERHEAD' },
  ARM_TRIANGLE: { clip: 'sub_arm_triangle', variants: 1, camera: 'GROUND_OVERHEAD' },
  NECK_CRANK: { clip: 'sub_neck_crank', variants: 1, camera: 'CLOSE' },

  // Non-technique beats
  SPRAWL: { clip: 'def_sprawl', variants: 2, camera: 'CAGE_SIDE' },
  CLINCH_ENGAGE: { clip: 'clinch_enter', variants: 2, camera: 'CAGE_SIDE' },
  CLINCH_BREAK: { clip: 'clinch_break', variants: 2 },
  SCRAMBLE: { clip: 'scramble', variants: 3, camera: 'GROUND_OVERHEAD' },
  KNOCKDOWN: { clip: 'knockdown', variants: 2, camera: 'IMPACT', speed: 0.85 },
  STUN: { clip: 'stun_wobble', variants: 2, camera: 'CLOSE' },
  CUT: { clip: 'reaction_cut', variants: 1, camera: 'CLOSE' },
  FIGHT_START: { clip: 'intro_touch_gloves', variants: 1, camera: 'WIDE' },
  ROUND_START: { clip: 'stance_idle', variants: 2, camera: 'WIDE' },
  ROUND_END: { clip: 'round_end_return', variants: 1, camera: 'CORNER' },
  CORNER_INSTRUCTION: { clip: 'corner_seated', variants: 2, camera: 'CORNER' },
  REFEREE_ACTION: { clip: 'ref_intervene', variants: 2, camera: 'BROADCAST' },
  DOCTOR_CHECK: { clip: 'doctor_check', variants: 1, camera: 'CLOSE' },
  FIGHT_END: { clip: 'fight_end_celebrate', variants: 3, camera: 'WIDE' },
  DECISION: { clip: 'decision_announce', variants: 1, camera: 'WIDE' },
};

/**
 * The documented fallback. Every unknown event resolves here rather than failing, which is
 * what lets a shipped renderer keep working against a newer simulation.
 */
export const FALLBACK_DIRECTIVE: AnimationDirective = {
  clip: 'stance_idle',
  variant: 0,
  targetState: 'STANDING',
  camera: 'BROADCAST',
  reaction: 'NONE',
  speed: 1,
  triggersReplay: false,
};

/** Position implied by an event, used when the event does not state one explicitly. */
function resolveTargetState(event: FightEvent): FightPosition {
  if (event.eventType === 'POSITION_CHANGE') return event.toPosition;
  if (event.eventType === 'TAKEDOWN') return 'GROUND_TOP';
  if (event.eventType === 'SPRAWL') return 'STANDING';
  if (event.eventType === 'CLINCH_ENGAGE') return 'CLINCH';
  if (event.eventType === 'CLINCH_BREAK') return 'STANDING';
  if (event.eventType === 'KNOCKDOWN') return 'STUNNED';
  if (event.eventType === 'SUBMISSION_ATTEMPT') return 'SUBMISSION_ATTEMPT';
  return event.position;
}

/**
 * Damage thresholds for reactions, calibrated to the scale the engine actually emits.
 *
 * These were originally 3 and 8, which look like sensible numbers and are not: a landed strike
 * carries roughly 0.4 to 2.5 damage, so *every cleanly landed strike returned `NONE`* and the
 * fighters visibly took nothing all fight. It went unnoticed because there is no error — just
 * an absence — and because `PARTIAL` results kept producing `LIGHT`, so reactions never
 * disappeared entirely.
 *
 * `reaction-calibration.test.ts` now asserts the spread against a real fight, so the day the
 * engine's damage scale moves, this fails loudly instead of quietly going numb again.
 */
/*
 * Recalibrated against the tick-loop engine. These thresholds have now been wrong twice for
 * the same reason: they are read off a damage distribution that the engine is free to change
 * underneath them, and nothing errors when they drift — the fighters simply stop reacting.
 * `reaction-calibration.test.ts` measures the live distribution rather than trusting these,
 * which is what caught the drift this time.
 *
 * Measured over 7,362 landed strikes: p50 0.60, p75 1.00, p90 1.30, p97 1.50, max 2.50.
 */
const LIGHT_DAMAGE = 0.45;
const HEAVY_DAMAGE = 1.5;
const FOLD_DAMAGE = 1.25;
const BUCKLE_DAMAGE = 1.0;

/** How the defender reacts, derived from the event's own result and severity. */
function resolveReaction(event: FightEvent): HitReaction {
  if (event.eventType === 'KNOCKDOWN') return 'DROP';
  if (event.eventType === 'STUN') return 'STAGGER';
  if (event.eventType === 'SPRAWL') return 'SPRAWL_DEFEND';
  if (isStrikeEvent(event)) {
    switch (event.result) {
      case 'LANDED':
        // Where it landed matters as much as how hard. A body shot folds the torso and a leg
        // kick buckles the stance; neither looks anything like a head snapping back.
        if (event.target === 'BODY') return event.damage >= FOLD_DAMAGE ? 'BODY_FOLD' : 'LIGHT';
        if (event.target === 'LEG') return event.damage >= BUCKLE_DAMAGE ? 'LEG_BUCKLE' : 'LIGHT';
        return event.damage >= HEAVY_DAMAGE ? 'HEAVY' : event.damage >= LIGHT_DAMAGE ? 'LIGHT' : 'NONE';
      case 'PARTIAL':
        return 'LIGHT';
      case 'BLOCKED':
        return 'BLOCK';
      case 'SLIPPED':
      case 'MISSED':
        return 'SLIP';
      default:
        return 'NONE';
    }
  }
  return 'NONE';
}

/**
 * Selects a clip variant from the event's own identity rather than at random.
 *
 * A renderer that rolled dice would show a different fight on every replay of the same
 * event stream; deriving from `sequence` keeps repeated techniques visually varied *and*
 * byte-identical across replays, which matters as much for the 3D layer as it does for the
 * simulation itself.
 */
function selectVariant(event: FightEvent, variants: number): number {
  if (variants <= 1) return 0;
  const mixed = (event.sequence * 2654435761) >>> 0;
  return mixed % variants;
}

function registryKeyFor(event: FightEvent): string | undefined {
  if ('technique' in event && typeof event.technique === 'string' && CLIP_REGISTRY[event.technique]) {
    return event.technique;
  }
  if (CLIP_REGISTRY[event.eventType]) return event.eventType;
  // A takedown attempt with no named technique still has a sensible default entry.
  if (event.eventType === 'TAKEDOWN_ATTEMPT' || event.eventType === 'TAKEDOWN') return 'DOUBLE_LEG';
  return undefined;
}

/** Maps one event onto the prebuilt animation the renderer should play. Never throws. */
export function mapEventToAnimation(event: FightEvent): AnimationDirective {
  const key = registryKeyFor(event);
  const entry = key ? CLIP_REGISTRY[key] : undefined;
  if (!entry) {
    return { ...FALLBACK_DIRECTIVE, targetState: resolveTargetState(event) };
  }

  const decisive =
    event.eventType === 'KNOCKDOWN' ||
    event.eventType === 'FIGHT_END' ||
    (isStrikeEvent(event) &&
      event.eventType === 'SIGNIFICANT_STRIKE' &&
      event.result === 'LANDED' &&
      // Same miscalibration as the reaction thresholds: this read `>= 9` against a scale that
      // tops out near 2.5, so the impact camera and the replay trigger never once fired.
      event.damage >= HEAVY_DAMAGE);

  const actorId = 'attacker' in event ? event.attacker : 'fighterId' in event ? event.fighterId : undefined;
  const reactorId = 'defender' in event ? event.defender : undefined;

  return {
    clip: entry.clip,
    variant: selectVariant(event, entry.variants),
    targetState: resolveTargetState(event),
    camera: decisive ? 'IMPACT' : entry.camera ?? 'BROADCAST',
    reaction: resolveReaction(event),
    speed: entry.speed ?? 1,
    triggersReplay: decisive,
    actorId,
    reactorId,
  };
}

/** Maps a whole stream, for offline export to the 3D engine. */
export function mapFightToAnimation(events: readonly FightEvent[]): AnimationDirective[] {
  return events.map(mapEventToAnimation);
}

/** Every clip the art pipeline must author, for asset-completeness checks. */
export function requiredClips(): string[] {
  return [...new Set(Object.values(CLIP_REGISTRY).map((entry) => entry.clip))].sort();
}

/** The registry as plain data, for export to Unreal/Unity as JSON. */
export function animationRegistry(): Readonly<Record<string, ClipEntry>> {
  return CLIP_REGISTRY;
}
