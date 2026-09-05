/**
 * The fight event contract (brief §15, §17, §18).
 *
 * This is the public boundary between the fight engine and everything that consumes a
 * fight: the play-by-play feed, the statistics panels, the 3D renderer, and — via §18 — an
 * external live data feed parsed into the same shape.
 *
 * Two rules govern this file, and they are what make the rest of the system possible.
 *
 *   1. **Events describe what happened, never how to draw it.** No camera angle, no
 *      animation name, no timing curve ever appears here. The renderer decides presentation
 *      (see `viz/animation-map.ts`); the engine decides truth.
 *   2. **The contract is versioned and additive.** `schemaVersion` is carried on every
 *      event, and consumers are required to tolerate unknown event types (the animation
 *      mapper resolves them to a documented fallback). A game engine cannot be redeployed
 *      in lockstep with a simulation, so the contract must not require it.
 *
 * The engine that produces these events is Phase 3. Fixing the contract first is deliberate:
 * the Fight Center, the WebSocket feed and the 3D layer can all be built against it, and the
 * engine can be written without renegotiating its interface.
 */

export const FIGHT_EVENT_SCHEMA_VERSION = 1;

/* ----------------------------------------------------------------- positions */

/** The fight's positional state machine (brief §13). */
export const FIGHT_POSITIONS = [
  'STANDING',
  'CLINCH',
  'CAGE_CLINCH',
  'TAKEDOWN_ATTEMPT',
  'GROUND_TOP',
  'GROUND_BOTTOM',
  'GUARD',
  'HALF_GUARD',
  'SIDE_CONTROL',
  'MOUNT',
  'BACK_CONTROL',
  'SCRAMBLE',
  'SUBMISSION_ATTEMPT',
  'STUNNED',
  'RECOVERY',
] as const;
export type FightPosition = (typeof FIGHT_POSITIONS)[number];

/* -------------------------------------------------------------- event types */

export const FIGHT_EVENT_TYPES = [
  'FIGHT_START',
  'ROUND_START',
  'ROUND_END',
  'STRIKE',
  'SIGNIFICANT_STRIKE',
  'TAKEDOWN_ATTEMPT',
  'TAKEDOWN',
  'SPRAWL',
  'CLINCH_ENGAGE',
  'CLINCH_BREAK',
  'POSITION_CHANGE',
  'SCRAMBLE',
  'SUBMISSION_ATTEMPT',
  'SUBMISSION_ESCAPE',
  'KNOCKDOWN',
  'STUN',
  'CUT',
  'DAMAGE_UPDATE',
  'STAMINA_UPDATE',
  'CORNER_INSTRUCTION',
  'REFEREE_ACTION',
  'DOCTOR_CHECK',
  'POINT_DEDUCTION',
  'FIGHT_END',
  'DECISION',
] as const;
export type FightEventType = (typeof FIGHT_EVENT_TYPES)[number];

/* --------------------------------------------------------------- techniques */

export const STRIKE_TECHNIQUES = [
  'JAB', 'CROSS', 'RIGHT_CROSS', 'LEFT_HOOK', 'RIGHT_HOOK', 'UPPERCUT', 'OVERHAND',
  'SUPERMAN_PUNCH', 'BACKFIST', 'ELBOW', 'KNEE', 'FLYING_KNEE',
  'LOW_KICK', 'BODY_KICK', 'HEAD_KICK', 'FRONT_KICK', 'SIDE_KICK', 'SPINNING_BACK_KICK',
  'WHEEL_KICK', 'GROUND_PUNCH', 'GROUND_ELBOW', 'HAMMERFIST',
] as const;
export type StrikeTechnique = (typeof STRIKE_TECHNIQUES)[number];

export const TAKEDOWN_TECHNIQUES = [
  'DOUBLE_LEG', 'SINGLE_LEG', 'BODY_LOCK', 'TRIP', 'THROW', 'SUPLEX', 'ANKLE_PICK', 'CAGE_DRAG',
] as const;
export type TakedownTechnique = (typeof TAKEDOWN_TECHNIQUES)[number];

export const SUBMISSION_TECHNIQUES = [
  'REAR_NAKED_CHOKE', 'GUILLOTINE', 'TRIANGLE', 'ARMBAR', 'KIMURA', 'AMERICANA',
  'D_ARCE', 'ANACONDA', 'HEEL_HOOK', 'KNEEBAR', 'ARM_TRIANGLE', 'NECK_CRANK',
] as const;
export type SubmissionTechnique = (typeof SUBMISSION_TECHNIQUES)[number];

export type Technique = StrikeTechnique | TakedownTechnique | SubmissionTechnique;

export const STRIKE_TARGETS = ['HEAD', 'BODY', 'LEG', 'ARM'] as const;
export type StrikeTarget = (typeof STRIKE_TARGETS)[number];

export const ACTION_RESULTS = ['LANDED', 'BLOCKED', 'PARTIAL', 'MISSED', 'SLIPPED', 'DEFENDED', 'COMPLETED', 'REVERSED'] as const;
export type ActionResult = (typeof ACTION_RESULTS)[number];

/* --------------------------------------------------------------- outcomes */

/** Every finish the ruleset supports (brief §19). */
export const FIGHT_OUTCOMES = [
  'KO', 'TKO', 'SUBMISSION', 'UNANIMOUS_DECISION', 'SPLIT_DECISION', 'MAJORITY_DECISION',
  'DRAW', 'MAJORITY_DRAW', 'TECHNICAL_DECISION', 'TECHNICAL_DRAW', 'DOCTOR_STOPPAGE',
  'INJURY', 'DISQUALIFICATION', 'NO_CONTEST', 'RETIREMENT',
] as const;
export type FightOutcome = (typeof FIGHT_OUTCOMES)[number];

/* ------------------------------------------------------------------ events */

/** Fields carried by every event, whatever its type. */
export interface FightEventBase {
  readonly schemaVersion: number;
  readonly fightId: string;
  /** Monotonic index within the fight; the ordering key for replay. */
  readonly sequence: number;
  readonly round: number;
  /** Seconds elapsed in the fight overall — the timeline the 3D layer scrubs on. */
  readonly timestamp: number;
  /** Display clock within the round, `MM:SS` counting down. */
  readonly roundTime: string;
  /** Seconds remaining in the round. */
  readonly timeRemaining: number;
  readonly position: FightPosition;
  /** Human-readable line for the play-by-play feed. */
  readonly description: string;
}

export interface StrikeEvent extends FightEventBase {
  readonly eventType: 'STRIKE' | 'SIGNIFICANT_STRIKE';
  readonly attacker: string;
  readonly defender: string;
  readonly technique: StrikeTechnique;
  readonly target: StrikeTarget;
  readonly result: ActionResult;
  readonly damage: number;
  readonly staminaCost: number;
}

export interface GrapplingEvent extends FightEventBase {
  readonly eventType: 'TAKEDOWN_ATTEMPT' | 'TAKEDOWN' | 'SPRAWL' | 'CLINCH_ENGAGE' | 'CLINCH_BREAK' | 'SCRAMBLE';
  readonly attacker: string;
  readonly defender: string;
  readonly technique?: TakedownTechnique;
  readonly result: ActionResult;
  readonly staminaCost: number;
}

export interface SubmissionEvent extends FightEventBase {
  readonly eventType: 'SUBMISSION_ATTEMPT' | 'SUBMISSION_ESCAPE';
  readonly attacker: string;
  readonly defender: string;
  readonly technique: SubmissionTechnique;
  readonly result: ActionResult;
  /** 0-1 how close the hold was to finishing; drives commentary and camera urgency. */
  readonly tightness: number;
  readonly staminaCost: number;
}

export interface PositionEvent extends FightEventBase {
  readonly eventType: 'POSITION_CHANGE';
  readonly attacker: string;
  readonly defender: string;
  readonly fromPosition: FightPosition;
  readonly toPosition: FightPosition;
}

export interface ImpactEvent extends FightEventBase {
  readonly eventType: 'KNOCKDOWN' | 'STUN' | 'CUT';
  readonly attacker: string;
  readonly defender: string;
  readonly technique?: StrikeTechnique;
  readonly target?: StrikeTarget;
  readonly severity: number;
}

/**
 * Per-region damage as carried on the wire. Named separately from the engine's internal
 * `DamageState` because this is the published shape consumers depend on, and the two must be
 * free to diverge.
 */
export interface DamageSnapshot {
  readonly head: number;
  readonly face: number;
  readonly body: number;
  readonly leadLeg: number;
  readonly rearLeg: number;
  readonly leadArm: number;
  readonly rearArm: number;
  readonly cuts: number;
}

export interface DamageUpdateEvent extends FightEventBase {
  readonly eventType: 'DAMAGE_UPDATE';
  readonly fighterId: string;
  readonly damage: DamageSnapshot;
}

export interface StaminaUpdateEvent extends FightEventBase {
  readonly eventType: 'STAMINA_UPDATE';
  readonly fighterId: string;
  /** 0-100 immediately available output. */
  readonly burst: number;
  /** 0-100 long-term gas tank. */
  readonly cardio: number;
}

export interface CornerEvent extends FightEventBase {
  readonly eventType: 'CORNER_INSTRUCTION';
  readonly fighterId: string;
  /** Machine-readable adjustment the engine applies (brief §14). */
  readonly instruction: string;
  readonly coachId?: string;
}

export interface RefereeEvent extends FightEventBase {
  readonly eventType: 'REFEREE_ACTION' | 'DOCTOR_CHECK' | 'POINT_DEDUCTION';
  readonly fighterId?: string;
  readonly action: string;
}

export interface RoundEvent extends FightEventBase {
  readonly eventType: 'FIGHT_START' | 'ROUND_START' | 'ROUND_END';
}

export interface FightEndEvent extends FightEventBase {
  readonly eventType: 'FIGHT_END';
  readonly outcome: FightOutcome;
  readonly winnerId?: string;
  readonly loserId?: string;
  readonly finishRound?: number;
  readonly finishTime?: string;
  readonly technique?: Technique;
}

export interface JudgeScorecard {
  readonly judgeId: string;
  readonly judgeName: string;
  readonly rounds: readonly { round: number; a: number; b: number }[];
  readonly totalA: number;
  readonly totalB: number;
}

export interface DecisionEvent extends FightEventBase {
  readonly eventType: 'DECISION';
  readonly outcome: FightOutcome;
  readonly winnerId?: string;
  readonly scorecards: readonly JudgeScorecard[];
}

export type FightEvent =
  | StrikeEvent
  | GrapplingEvent
  | SubmissionEvent
  | PositionEvent
  | ImpactEvent
  | DamageUpdateEvent
  | StaminaUpdateEvent
  | CornerEvent
  | RefereeEvent
  | RoundEvent
  | FightEndEvent
  | DecisionEvent;

/* ------------------------------------------------------------------ helpers */

/** Formats a countdown clock as `MM:SS`. */
export function formatRoundClock(secondsRemaining: number): string {
  const clamped = Math.max(0, Math.floor(secondsRemaining));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function isStrikeEvent(event: FightEvent): event is StrikeEvent {
  return event.eventType === 'STRIKE' || event.eventType === 'SIGNIFICANT_STRIKE';
}

export function isGrapplingEvent(event: FightEvent): event is GrapplingEvent {
  return (
    event.eventType === 'TAKEDOWN_ATTEMPT' ||
    event.eventType === 'TAKEDOWN' ||
    event.eventType === 'SPRAWL' ||
    event.eventType === 'CLINCH_ENGAGE' ||
    event.eventType === 'CLINCH_BREAK' ||
    event.eventType === 'SCRAMBLE'
  );
}

export function isSubmissionEvent(event: FightEvent): event is SubmissionEvent {
  return event.eventType === 'SUBMISSION_ATTEMPT' || event.eventType === 'SUBMISSION_ESCAPE';
}

/** Events that changed the fight, for a condensed highlight feed. */
export function isDecisiveEvent(event: FightEvent): boolean {
  if (event.eventType === 'KNOCKDOWN' || event.eventType === 'FIGHT_END') return true;
  if (event.eventType === 'TAKEDOWN' || event.eventType === 'CUT') return true;
  if (isSubmissionEvent(event)) return event.result !== 'DEFENDED';
  if (isStrikeEvent(event)) return event.eventType === 'SIGNIFICANT_STRIKE' && event.result === 'LANDED';
  return false;
}
