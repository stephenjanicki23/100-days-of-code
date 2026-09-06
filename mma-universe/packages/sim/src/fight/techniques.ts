/**
 * The technique catalogue (Sprint 8).
 *
 * Each technique is a set of trade-offs rather than a name: a head kick is high damage, low
 * accuracy, expensive, and leaves you open; a jab is cheap, accurate and does almost nothing.
 * Fighters choose between them from their game plan and their attributes, so a technique
 * table this shape is what makes a kickboxer's fight look different from a boxer's.
 */

import type { StrikeTarget, StrikeTechnique, SubmissionTechnique, TakedownTechnique } from './events.ts';
import type { AttributeKey } from '../domain/attributes.ts';
import type { FightPosition } from './events.ts';

/** Where in a stand-up exchange a technique lives. */
export type Range = 'long' | 'mid' | 'close';

export interface StrikeDefinition {
  readonly key: StrikeTechnique;
  readonly label: string;
  readonly target: StrikeTarget;
  readonly ranges: readonly Range[];
  /** Relative damage on a clean landing. */
  readonly power: number;
  /** Relative ease of landing; a jab lands far more often than a spinning kick. */
  readonly accuracy: number;
  /** Stamina intensity. */
  readonly cost: number;
  /** Extra knockdown potential beyond raw damage — the "one-shot" techniques. */
  readonly concussive: number;
  /** Attributes that make a fighter good at this specific technique. */
  readonly skills: readonly AttributeKey[];
  /** Chance of opening a cut when it lands. */
  readonly cutChance: number;
  /** True if the technique is significant by the standard scoring definition. */
  readonly significant: boolean;
  /**
   * How often this technique is thrown in a real fight, as a share of all strikes.
   *
   * The single most important number in this file, and the one that was missing. Selection
   * used to divide a target's weight by the number of techniques aimed at that target, so a
   * jab and a spinning wheel kick started from exactly the same share and only skill
   * separated them. Measured over two hundred fights that produced 6.4% jabs against 20.6%
   * spinning and flying attacks — the inverse of a real fight, where the jab is a third of
   * everything thrown and the spinning stuff is close to noise.
   */
  readonly frequency: number;
  /** Seconds the strike itself occupies. */
  readonly time: number;
  /** Seconds of vulnerability after it, before the fighter can act again. */
  readonly recovery: number;
  /** Conditions that must hold before this is even a candidate. */
  readonly gate?: StrikeGate;
}

/**
 * Conditions gating a technique (brief §3).
 *
 * Spinning attacks, superman punches and flying knees are not ordinary options a fighter
 * weighs against a jab; they are opportunistic and they are never a lead-off. Rather than
 * hoping a small weight keeps them rare, they are made unavailable unless the moment is right.
 */
export interface StrikeGate {
  /** Minimum flashiness, from creativity and the showman side of a fighter's temperament. */
  readonly flash?: number;
  /** Never thrown as the first strike of an exchange. */
  readonly neverLeads?: boolean;
  /** Requires the opponent to be backing up or resetting. */
  readonly opponentRetreating?: boolean;
  /** Requires the opponent to be hurt. */
  readonly opponentHurt?: boolean;
  /** Requires the thrower to be above this share of their stamina. */
  readonly minStamina?: number;
  /** Only from the clinch. */
  readonly clinchOnly?: boolean;
}

/**
 * Frequencies are shares of all strikes thrown and sum to roughly 1 across the standing set.
 * Accuracy is re-scaled so head strikes land near a third of attempts and body and leg strikes
 * between a half and two thirds, which is what the sport actually reports; the old table had
 * every strike landing far too often for the head and not often enough for legs.
 *
 * Times are the strike itself; recovery is the window afterwards where the thrower cannot act
 * and the opponent's counters land more easily. A jab costs a quarter second and almost no
 * recovery; an overhand commits a fighter for nearly a second in total.
 */
export const STRIKES: readonly StrikeDefinition[] = [
  // -- punches: about three quarters of everything thrown ------------------------------------
  { key: 'JAB', label: 'jab', target: 'HEAD', ranges: ['long', 'mid'], power: 2.2, accuracy: 1.34, cost: 0.42, concussive: 0.16, skills: ['boxing', 'strikingAccuracy'], cutChance: 0.008, significant: false, frequency: 0.30, time: 0.25, recovery: 0.12 },
  { key: 'CROSS', label: 'straight right', target: 'HEAD', ranges: ['mid', 'long'], power: 6, accuracy: 1.02, cost: 0.9, concussive: 1, skills: ['boxing', 'strikingPower'], cutChance: 0.012, significant: true, frequency: 0.20, time: 0.35, recovery: 0.22 },
  { key: 'LEFT_HOOK', label: 'left hook', target: 'HEAD', ranges: ['close', 'mid'], power: 6.8, accuracy: 0.9, cost: 1, concussive: 1.25, skills: ['boxing', 'strikingPower'], cutChance: 0.015, significant: true, frequency: 0.055, time: 0.4, recovery: 0.3 },
  { key: 'RIGHT_HOOK', label: 'right hook', target: 'HEAD', ranges: ['close', 'mid'], power: 6.6, accuracy: 0.88, cost: 1, concussive: 1.2, skills: ['boxing', 'strikingPower'], cutChance: 0.015, significant: true, frequency: 0.065, time: 0.4, recovery: 0.3 },
  { key: 'UPPERCUT', label: 'uppercut', target: 'HEAD', ranges: ['close'], power: 7, accuracy: 0.84, cost: 1.05, concussive: 1.35, skills: ['boxing', 'strikingPower'], cutChance: 0.012, significant: true, frequency: 0.07, time: 0.4, recovery: 0.32 },
  { key: 'OVERHAND', label: 'overhand right', target: 'HEAD', ranges: ['mid'], power: 7.8, accuracy: 0.7, cost: 1.25, concussive: 1.5, skills: ['boxing', 'strikingPower'], cutChance: 0.018, significant: true, frequency: 0.062, time: 0.45, recovery: 0.42 },

  // -- kicks ---------------------------------------------------------------------------------
  { key: 'LOW_KICK', label: 'low kick to the lead leg', target: 'LEG', ranges: ['long', 'mid'], power: 5.2, accuracy: 1.62, cost: 0.8, concussive: 0, skills: ['muayThai', 'kickboxing'], cutChance: 0, significant: true, frequency: 0.12, time: 0.6, recovery: 0.34 },
  { key: 'BODY_KICK', label: 'kick to the body', target: 'BODY', ranges: ['long', 'mid'], power: 6.4, accuracy: 1.32, cost: 1.15, concussive: 0.2, skills: ['muayThai', 'kickboxing'], cutChance: 0, significant: true, frequency: 0.065, time: 0.62, recovery: 0.44 },
  { key: 'HEAD_KICK', label: 'head kick', target: 'HEAD', ranges: ['long', 'mid'], power: 9.2, accuracy: 0.5, cost: 1.6, concussive: 2.1, skills: ['kickboxing', 'taekwondo', 'karate'], cutChance: 0.02, significant: true, frequency: 0.02, time: 0.68, recovery: 0.62 },
  { key: 'FRONT_KICK', label: 'front kick to the body', target: 'BODY', ranges: ['long'], power: 4.6, accuracy: 1.45, cost: 0.75, concussive: 0.15, skills: ['karate', 'taekwondo'], cutChance: 0, significant: true, frequency: 0.018, time: 0.55, recovery: 0.3 },
  { key: 'SIDE_KICK', label: 'side kick to the knee', target: 'LEG', ranges: ['long'], power: 4.4, accuracy: 1.38, cost: 0.75, concussive: 0, skills: ['karate', 'taekwondo'], cutChance: 0, significant: true, frequency: 0.012, time: 0.58, recovery: 0.32 },

  // -- knees and elbows: clinch only, or against someone already hurt ------------------------
  { key: 'ELBOW', label: 'elbow', target: 'HEAD', ranges: ['close'], power: 6.2, accuracy: 0.95, cost: 0.85, concussive: 0.9, skills: ['muayThai'], cutChance: 0.045, significant: true, frequency: 0.02, time: 0.32, recovery: 0.2, gate: { clinchOnly: true } },
  { key: 'KNEE', label: 'knee to the body', target: 'BODY', ranges: ['close'], power: 6.5, accuracy: 1.2, cost: 1.1, concussive: 0.5, skills: ['muayThai', 'clinchWrestling'], cutChance: 0.012, significant: true, frequency: 0.02, time: 0.45, recovery: 0.28, gate: { clinchOnly: true } },

  // -- the flashy set: about one per cent between them, and never a lead-off -----------------
  { key: 'SPINNING_BACK_KICK', label: 'spinning back kick to the body', target: 'BODY', ranges: ['long', 'mid'], power: 8.6, accuracy: 0.55, cost: 1.8, concussive: 1.1, skills: ['taekwondo', 'sanda'], cutChance: 0.02, significant: true, frequency: 0.016, time: 0.8, recovery: 0.75, gate: { flash: 0.62, neverLeads: true, opponentRetreating: true, minStamina: 0.62 } },
  { key: 'WHEEL_KICK', label: 'spinning wheel kick', target: 'HEAD', ranges: ['long', 'mid'], power: 10, accuracy: 0.32, cost: 2.1, concussive: 2.4, skills: ['taekwondo', 'karate'], cutChance: 0.012, significant: true, frequency: 0.009, time: 0.85, recovery: 0.9, gate: { flash: 0.72, neverLeads: true, opponentRetreating: true, minStamina: 0.68 } },
  { key: 'BACKFIST', label: 'spinning backfist', target: 'HEAD', ranges: ['mid'], power: 7.6, accuracy: 0.46, cost: 1.4, concussive: 1.5, skills: ['sanda', 'karate'], cutChance: 0.02, significant: true, frequency: 0.011, time: 0.55, recovery: 0.55, gate: { flash: 0.6, neverLeads: true, opponentRetreating: true, minStamina: 0.6 } },
  { key: 'SUPERMAN_PUNCH', label: 'superman punch', target: 'HEAD', ranges: ['mid'], power: 7.4, accuracy: 0.6, cost: 1.5, concussive: 1.4, skills: ['karate', 'explosiveness'], cutChance: 0.018, significant: true, frequency: 0.006, time: 0.5, recovery: 0.55, gate: { flash: 0.66, neverLeads: true, opponentRetreating: true, minStamina: 0.66 } },
  { key: 'FLYING_KNEE', label: 'flying knee', target: 'HEAD', ranges: ['mid'], power: 9.5, accuracy: 0.36, cost: 2, concussive: 2.2, skills: ['muayThai', 'explosiveness'], cutChance: 0.015, significant: true, frequency: 0.004, time: 0.7, recovery: 0.8, gate: { flash: 0.7, neverLeads: true, opponentHurt: true, minStamina: 0.66 } },

  // -- ground strikes: selected from their own pool, so frequencies are relative to it -------
  { key: 'GROUND_PUNCH', label: 'punches from the top', target: 'HEAD', ranges: ['close'], power: 4.4, accuracy: 1.25, cost: 0.62, concussive: 0.7, skills: ['groundStriking'], cutChance: 0.018, significant: true, frequency: 0.55, time: 0.35, recovery: 0.15 },
  { key: 'GROUND_ELBOW', label: 'elbows on the ground', target: 'HEAD', ranges: ['close'], power: 6, accuracy: 1.05, cost: 0.8, concussive: 0.9, skills: ['groundStriking'], cutChance: 0.05, significant: true, frequency: 0.2, time: 0.4, recovery: 0.2 },
  { key: 'HAMMERFIST', label: 'hammerfists', target: 'HEAD', ranges: ['close'], power: 3.4, accuracy: 1.4, cost: 0.5, concussive: 0.5, skills: ['groundStriking'], cutChance: 0.02, significant: false, frequency: 0.25, time: 0.3, recovery: 0.12 },
];

const STRIKE_BY_KEY = new Map(STRIKES.map((strike) => [strike.key, strike]));

export function strike(key: StrikeTechnique): StrikeDefinition {
  const found = STRIKE_BY_KEY.get(key);
  if (!found) throw new RangeError(`Unknown strike: ${key}`);
  return found;
}

/** Strikes thrown from the feet at a given range. */
export function standingStrikes(range: Range): readonly StrikeDefinition[] {
  return STRIKES.filter((definition) => definition.ranges.includes(range) && !isGroundStrike(definition.key));
}

export function isGroundStrike(key: StrikeTechnique): boolean {
  return key === 'GROUND_PUNCH' || key === 'GROUND_ELBOW' || key === 'HAMMERFIST';
}

export const GROUND_STRIKES: readonly StrikeDefinition[] = STRIKES.filter((s) => isGroundStrike(s.key));

/** Strikes available inside the clinch: the short weapons, plus what fits in a phone booth. */
export const CLINCH_STRIKES: readonly StrikeDefinition[] = STRIKES.filter(
  (s) => s.key === 'KNEE' || s.key === 'ELBOW' || s.key === 'UPPERCUT' || s.key === 'LEFT_HOOK',
);

/** Standing strikes with the clinch-only weapons removed. */
export function openStrikes(range: Range): readonly StrikeDefinition[] {
  return standingStrikes(range).filter((definition) => !definition.gate?.clinchOnly);
}

/* ------------------------------------------------------------------ takedowns */

export interface TakedownDefinition {
  readonly key: TakedownTechnique;
  readonly label: string;
  /** Base likelihood relative to other entries. */
  readonly ease: number;
  readonly cost: number;
  /** Where it can be attempted from. */
  readonly from: readonly FightPosition[];
  readonly skills: readonly AttributeKey[];
  /** Position it lands in when it works. */
  readonly lands: 'GUARD' | 'HALF_GUARD' | 'SIDE_CONTROL';
}

export const TAKEDOWNS: readonly TakedownDefinition[] = [
  { key: 'DOUBLE_LEG', label: 'double-leg', ease: 1, cost: 2.1, from: ['STANDING'], skills: ['freestyleWrestling', 'takedownAbility'], lands: 'GUARD' },
  { key: 'SINGLE_LEG', label: 'single-leg', ease: 0.95, cost: 1.9, from: ['STANDING', 'CLINCH'], skills: ['freestyleWrestling', 'chainWrestling'], lands: 'GUARD' },
  { key: 'BODY_LOCK', label: 'body-lock takedown', ease: 0.85, cost: 1.7, from: ['CLINCH', 'CAGE_CLINCH'], skills: ['grecoRomanWrestling', 'clinchWrestling'], lands: 'HALF_GUARD' },
  { key: 'TRIP', label: 'trip', ease: 0.9, cost: 1.3, from: ['CLINCH', 'CAGE_CLINCH'], skills: ['judo', 'clinchWrestling'], lands: 'HALF_GUARD' },
  { key: 'THROW', label: 'throw', ease: 0.62, cost: 2.2, from: ['CLINCH'], skills: ['judo', 'sambo'], lands: 'SIDE_CONTROL' },
  { key: 'SUPLEX', label: 'suplex', ease: 0.45, cost: 2.6, from: ['CLINCH', 'CAGE_CLINCH'], skills: ['grecoRomanWrestling', 'strength'], lands: 'SIDE_CONTROL' },
  { key: 'ANKLE_PICK', label: 'ankle pick', ease: 0.72, cost: 1.2, from: ['STANDING', 'CLINCH'], skills: ['folkstyleWrestling', 'chainWrestling'], lands: 'GUARD' },
  { key: 'CAGE_DRAG', label: 'drag along the fence', ease: 0.88, cost: 1.5, from: ['CAGE_CLINCH'], skills: ['cageWork', 'clinchWrestling'], lands: 'HALF_GUARD' },
];

/* --------------------------------------------------------------- submissions */

export interface SubmissionDefinition {
  readonly key: SubmissionTechnique;
  readonly label: string;
  /** Positions it can be attacked from, and how well each suits it. */
  readonly from: Partial<Record<FightPosition, number>>;
  /** True when the *bottom* fighter attacks it. */
  readonly fromBottom: boolean;
  readonly ease: number;
  readonly cost: number;
  readonly skills: readonly AttributeKey[];
}

export const SUBMISSIONS: readonly SubmissionDefinition[] = [
  { key: 'REAR_NAKED_CHOKE', label: 'rear-naked choke', from: { BACK_CONTROL: 1 }, fromBottom: false, ease: 1, cost: 1.6, skills: ['brazilianJiuJitsu', 'submissionAbility'] },
  { key: 'ARM_TRIANGLE', label: 'arm-triangle', from: { MOUNT: 0.8, SIDE_CONTROL: 0.9 }, fromBottom: false, ease: 0.8, cost: 1.8, skills: ['brazilianJiuJitsu', 'submissionAbility'] },
  { key: 'ARMBAR', label: 'armbar', from: { MOUNT: 1, SIDE_CONTROL: 0.7, GUARD: 0.85, BACK_CONTROL: 0.5 }, fromBottom: true, ease: 0.85, cost: 1.5, skills: ['brazilianJiuJitsu', 'submissionAbility'] },
  { key: 'TRIANGLE', label: 'triangle choke', from: { GUARD: 1, MOUNT: 0.3 }, fromBottom: true, ease: 0.8, cost: 1.7, skills: ['brazilianJiuJitsu', 'guardGame'] },
  { key: 'GUILLOTINE', label: 'guillotine', from: { GUARD: 0.9, STANDING: 0.5, HALF_GUARD: 0.5, CLINCH: 0.6 }, fromBottom: true, ease: 0.85, cost: 1.4, skills: ['submissionGrappling', 'submissionAbility'] },
  { key: 'KIMURA', label: 'kimura', from: { HALF_GUARD: 0.9, SIDE_CONTROL: 0.85, GUARD: 0.7 }, fromBottom: true, ease: 0.75, cost: 1.5, skills: ['submissionGrappling', 'judo'] },
  { key: 'AMERICANA', label: 'americana', from: { SIDE_CONTROL: 0.9, MOUNT: 0.7 }, fromBottom: false, ease: 0.7, cost: 1.3, skills: ['brazilianJiuJitsu'] },
  { key: 'D_ARCE', label: "d'arce choke", from: { HALF_GUARD: 0.9, SIDE_CONTROL: 0.7 }, fromBottom: false, ease: 0.68, cost: 1.7, skills: ['submissionGrappling'] },
  { key: 'ANACONDA', label: 'anaconda choke', from: { HALF_GUARD: 0.7, SIDE_CONTROL: 0.7 }, fromBottom: false, ease: 0.62, cost: 1.7, skills: ['submissionGrappling'] },
  { key: 'HEEL_HOOK', label: 'heel hook', from: { GUARD: 0.8, HALF_GUARD: 0.6, SCRAMBLE: 0.5 }, fromBottom: true, ease: 0.6, cost: 1.6, skills: ['sambo', 'submissionGrappling'] },
  { key: 'KNEEBAR', label: 'kneebar', from: { GUARD: 0.7, HALF_GUARD: 0.5 }, fromBottom: true, ease: 0.55, cost: 1.5, skills: ['sambo', 'submissionAbility'] },
  { key: 'NECK_CRANK', label: 'neck crank', from: { SIDE_CONTROL: 0.6, BACK_CONTROL: 0.7 }, fromBottom: false, ease: 0.5, cost: 1.5, skills: ['submissionGrappling', 'strength'] },
];

/* ----------------------------------------------------------- ground positions */

export interface GroundPositionDefinition {
  readonly key: FightPosition;
  readonly label: string;
  /** How dominant the top fighter is, 0-1. Feeds control time and judging. */
  readonly dominance: number;
  /** Multiplier on the top fighter's ground striking. */
  readonly strikeAccess: number;
  /** How hard it is for the bottom fighter to escape or reverse. */
  readonly escapeDifficulty: number;
  /** Positions the top fighter can advance to. */
  readonly advancesTo: readonly FightPosition[];
}

export const GROUND_POSITIONS: readonly GroundPositionDefinition[] = [
  { key: 'GUARD', label: 'in the guard', dominance: 0.35, strikeAccess: 0.45, escapeDifficulty: 0.35, advancesTo: ['HALF_GUARD'] },
  { key: 'HALF_GUARD', label: 'in half guard', dominance: 0.55, strikeAccess: 0.7, escapeDifficulty: 0.5, advancesTo: ['SIDE_CONTROL'] },
  { key: 'SIDE_CONTROL', label: 'in side control', dominance: 0.75, strikeAccess: 0.85, escapeDifficulty: 0.68, advancesTo: ['MOUNT', 'BACK_CONTROL'] },
  { key: 'MOUNT', label: 'in mount', dominance: 0.92, strikeAccess: 1.15, escapeDifficulty: 0.82, advancesTo: ['BACK_CONTROL'] },
  { key: 'BACK_CONTROL', label: 'on the back', dominance: 1, strikeAccess: 0.8, escapeDifficulty: 0.88, advancesTo: [] },
];

const GROUND_BY_KEY = new Map(GROUND_POSITIONS.map((definition) => [definition.key, definition]));

export function groundPosition(key: FightPosition): GroundPositionDefinition | undefined {
  return GROUND_BY_KEY.get(key);
}

export function isGroundPosition(key: FightPosition): boolean {
  return GROUND_BY_KEY.has(key);
}
