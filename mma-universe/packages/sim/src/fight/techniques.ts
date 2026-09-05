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
}

export const STRIKES: readonly StrikeDefinition[] = [
  { key: 'JAB', label: 'jab', target: 'HEAD', ranges: ['long', 'mid'], power: 2.2, accuracy: 1.5, cost: 0.5, concussive: 0.2, skills: ['boxing', 'strikingAccuracy'], cutChance: 0.01, significant: false },
  { key: 'CROSS', label: 'straight right', target: 'HEAD', ranges: ['mid', 'long'], power: 6, accuracy: 1, cost: 1, concussive: 1, skills: ['boxing', 'strikingPower'], cutChance: 0.012, significant: true },
  { key: 'LEFT_HOOK', label: 'left hook', target: 'HEAD', ranges: ['close', 'mid'], power: 6.8, accuracy: 0.88, cost: 1.1, concussive: 1.25, skills: ['boxing', 'strikingPower'], cutChance: 0.015, significant: true },
  { key: 'RIGHT_HOOK', label: 'right hook', target: 'HEAD', ranges: ['close', 'mid'], power: 6.6, accuracy: 0.86, cost: 1.1, concussive: 1.2, skills: ['boxing', 'strikingPower'], cutChance: 0.015, significant: true },
  { key: 'UPPERCUT', label: 'uppercut', target: 'HEAD', ranges: ['close'], power: 7, accuracy: 0.8, cost: 1.15, concussive: 1.35, skills: ['boxing', 'strikingPower'], cutChance: 0.012, significant: true },
  { key: 'OVERHAND', label: 'overhand right', target: 'HEAD', ranges: ['mid'], power: 7.8, accuracy: 0.68, cost: 1.35, concussive: 1.5, skills: ['boxing', 'strikingPower'], cutChance: 0.018, significant: true },
  { key: 'ELBOW', label: 'elbow', target: 'HEAD', ranges: ['close'], power: 6.2, accuracy: 0.9, cost: 0.9, concussive: 0.9, skills: ['muayThai'], cutChance: 0.02, significant: true },
  { key: 'KNEE', label: 'knee to the body', target: 'BODY', ranges: ['close'], power: 6.5, accuracy: 0.95, cost: 1.2, concussive: 0.5, skills: ['muayThai', 'clinchWrestling'], cutChance: 0.02, significant: true },
  { key: 'FLYING_KNEE', label: 'flying knee', target: 'HEAD', ranges: ['mid'], power: 9.5, accuracy: 0.34, cost: 2.1, concussive: 2.2, skills: ['muayThai', 'explosiveness'], cutChance: 0.015, significant: true },
  { key: 'LOW_KICK', label: 'low kick to the lead leg', target: 'LEG', ranges: ['long', 'mid'], power: 5.2, accuracy: 1.15, cost: 0.85, concussive: 0, skills: ['muayThai', 'kickboxing'], cutChance: 0, significant: true },
  { key: 'BODY_KICK', label: 'kick to the body', target: 'BODY', ranges: ['long', 'mid'], power: 6.4, accuracy: 0.92, cost: 1.25, concussive: 0.2, skills: ['muayThai', 'kickboxing'], cutChance: 0, significant: true },
  { key: 'HEAD_KICK', label: 'head kick', target: 'HEAD', ranges: ['long', 'mid'], power: 9.2, accuracy: 0.5, cost: 1.7, concussive: 2.1, skills: ['kickboxing', 'taekwondo', 'karate'], cutChance: 0.02, significant: true },
  { key: 'FRONT_KICK', label: 'front kick to the body', target: 'BODY', ranges: ['long'], power: 4.6, accuracy: 1.05, cost: 0.8, concussive: 0.15, skills: ['karate', 'taekwondo'], cutChance: 0, significant: true },
  { key: 'SIDE_KICK', label: 'side kick to the knee', target: 'LEG', ranges: ['long'], power: 4.4, accuracy: 0.95, cost: 0.8, concussive: 0, skills: ['karate', 'taekwondo'], cutChance: 0, significant: true },
  { key: 'SPINNING_BACK_KICK', label: 'spinning back kick to the body', target: 'BODY', ranges: ['long', 'mid'], power: 8.6, accuracy: 0.42, cost: 1.9, concussive: 1.1, skills: ['taekwondo', 'sanda'], cutChance: 0.02, significant: true },
  { key: 'WHEEL_KICK', label: 'spinning wheel kick', target: 'HEAD', ranges: ['long', 'mid'], power: 10, accuracy: 0.3, cost: 2.2, concussive: 2.4, skills: ['taekwondo', 'karate'], cutChance: 0.012, significant: true },
  { key: 'SUPERMAN_PUNCH', label: 'superman punch', target: 'HEAD', ranges: ['mid'], power: 7.4, accuracy: 0.55, cost: 1.6, concussive: 1.4, skills: ['karate', 'explosiveness'], cutChance: 0.018, significant: true },
  { key: 'BACKFIST', label: 'spinning backfist', target: 'HEAD', ranges: ['mid'], power: 7.6, accuracy: 0.4, cost: 1.5, concussive: 1.5, skills: ['sanda', 'karate'], cutChance: 0.02, significant: true },
  // Ground strikes
  { key: 'GROUND_PUNCH', label: 'punches from the top', target: 'HEAD', ranges: ['close'], power: 4.4, accuracy: 1.25, cost: 0.7, concussive: 0.7, skills: ['groundStriking'], cutChance: 0.018, significant: true },
  { key: 'GROUND_ELBOW', label: 'elbows on the ground', target: 'HEAD', ranges: ['close'], power: 6, accuracy: 1.05, cost: 0.85, concussive: 0.9, skills: ['groundStriking'], cutChance: 0.012, significant: true },
  { key: 'HAMMERFIST', label: 'hammerfists', target: 'HEAD', ranges: ['close'], power: 3.4, accuracy: 1.4, cost: 0.55, concussive: 0.5, skills: ['groundStriking'], cutChance: 0.02, significant: false },
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

/** Strikes available inside the clinch. */
export const CLINCH_STRIKES: readonly StrikeDefinition[] = STRIKES.filter((s) =>
  s.key === 'KNEE' || s.key === 'ELBOW' || s.key === 'UPPERCUT' || s.key === 'LEFT_HOOK',
);

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
