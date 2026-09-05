/** The fighter entity (brief §3, §4). */

import type { SimDate } from '../core/time.ts';
import { exactAgeOn } from '../core/time.ts';
import type { AttributeSet } from './attributes.ts';
import type { Personality } from './personality.ts';
import type { Sex } from './divisions.ts';
import type { Injury } from './health.ts';
import { computeCurrentAbility } from '../ability/ability.ts';
import { deriveStyle, type FighterStyle } from './archetypes.ts';
import { computeFacets, type FacetSet } from '../ability/facets.ts';

export type Stance = 'orthodox' | 'southpaw' | 'switch';
export type FighterStatus = 'active' | 'injured' | 'inactive' | 'retired';

/** Where a fighter sits in the ecosystem. Derived from ability, age and record. */
export type CareerStage = 'prospect' | 'riser' | 'contender' | 'champion' | 'gatekeeper' | 'journeyman' | 'veteran' | 'declining';

export interface FighterRecord {
  wins: number;
  losses: number;
  draws: number;
  noContests: number;
  koWins: number;
  submissionWins: number;
  decisionWins: number;
  koLosses: number;
  submissionLosses: number;
  decisionLosses: number;
  winStreak: number;
  lossStreak: number;
}

export interface FighterCareer {
  debutDate: SimDate;
  /** Amateur and regional bouts before turning professional; feeds experience. */
  amateurFights: number;
  careerEarnings: number;
  /** 0-100. Drives pay, matchmaking priority and card placement. */
  popularity: number;
  /** 0-100. Standing within the sport, distinct from public fame. */
  reputation: number;
  /** -100..100. Short-term career trajectory; decays toward zero without results. */
  momentum: number;
  lastFightDate?: SimDate;
  titleReigns: number;
  titleDefenses: number;
}

export interface FighterCondition {
  /** 0-100 accumulated training and fight fatigue; high values suppress development. */
  fatigue: number;
  /** 0-100 competitive sharpness; decays during long lay-offs. */
  sharpness: number;
  /** 0-100 ease of making the division limit. Low values mean brutal cuts. */
  weightManagement: number;
  /** Long-term accumulated damage; permanently erodes durability and recovery. */
  wearAndTear: number;
  injuries: Injury[];
}

export const TRAINING_INTENSITIES = ['recovery', 'light', 'moderate', 'hard', 'extreme'] as const;
export type TrainingIntensity = (typeof TRAINING_INTENSITIES)[number];

export interface FighterTraining {
  intensity: TrainingIntensity;
  /** Disciplines the fighter is currently prioritising, most important first. */
  focus: string[];
}

/** What a fighter remembers about a previous opponent (brief §22). */
export interface FighterMemory {
  opponentId: string;
  meetings: number;
  wins: number;
  losses: number;
  lastResult: 'win' | 'loss' | 'draw' | 'nc';
  lastMethod?: string;
  /** -1..1 psychological effect carried into a rematch. */
  psychologicalEdge: number;
  lastDate: SimDate;
}

export interface Fighter {
  readonly id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  readonly sex: Sex;
  readonly birthDate: SimDate;
  nationality: string;
  homeRegion: string;
  heightIn: number;
  reachIn: number;
  stance: Stance;
  divisionKey: string;
  campId?: string;
  promotionId?: string;

  attributes: AttributeSet;
  readonly personality: Personality;
  /** Hidden 0-200 ceiling. Current Ability is derived from `attributes`, never stored. */
  potentialAbility: number;
  /** The archetype used to shape generation. Display style is always re-derived. */
  readonly seedArchetype: string;

  record: FighterRecord;
  career: FighterCareer;
  condition: FighterCondition;
  training: FighterTraining;
  memories: FighterMemory[];
  status: FighterStatus;
  retirementDate?: SimDate;
}

export function fullName(fighter: Fighter): string {
  return `${fighter.firstName} ${fighter.lastName}`;
}

export function displayName(fighter: Fighter): string {
  return fighter.nickname
    ? `${fighter.firstName} "${fighter.nickname}" ${fighter.lastName}`
    : fullName(fighter);
}

export function fighterAge(fighter: Fighter, onDate: SimDate): number {
  return Math.floor(exactAgeOn(fighter.birthDate, onDate));
}

export function currentAbility(fighter: Fighter): number {
  return computeCurrentAbility(fighter.attributes);
}

export function fighterFacets(fighter: Fighter): FacetSet {
  return computeFacets(fighter.attributes);
}

export function fighterStyle(fighter: Fighter): FighterStyle {
  return deriveStyle(fighter.attributes);
}

export function totalFights(fighter: Fighter): number {
  const { wins, losses, draws, noContests } = fighter.record;
  return wins + losses + draws + noContests;
}

export function recordString(fighter: Fighter): string {
  const { wins, losses, draws, noContests } = fighter.record;
  const base = `${wins}-${losses}-${draws}`;
  return noContests > 0 ? `${base} (${noContests} NC)` : base;
}

export function isAvailable(fighter: Fighter, onDate: SimDate): boolean {
  if (fighter.status !== 'active') return false;
  return !fighter.condition.injuries.some((i) => i.endDate === undefined && i.expectedReturn > onDate);
}

/**
 * Classifies where a fighter sits in the ecosystem. Deliberately blends ability, age and
 * form: a 34-year-old at 140 ability with three straight losses is a gatekeeper, while a
 * 23-year-old at the same ability with a rising record is a prospect.
 */
export function careerStage(fighter: Fighter, ability: number, age: number, isChampion = false): CareerStage {
  if (isChampion) return 'champion';
  const fights = totalFights(fighter);
  if (age <= 25 && fights <= 14) return ability >= 130 ? 'riser' : 'prospect';
  if (age >= 35) return ability >= 150 ? 'veteran' : 'declining';
  if (ability >= 158) return 'contender';
  if (ability >= 128) return fighter.record.lossStreak >= 2 ? 'gatekeeper' : 'contender';
  if (ability >= 105) return 'gatekeeper';
  return 'journeyman';
}
