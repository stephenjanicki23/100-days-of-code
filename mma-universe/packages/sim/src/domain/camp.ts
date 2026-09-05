/**
 * Camps and coaches (brief §7-§10).
 *
 * A camp is an *ecosystem*, not a bonus table. Its reputation is earned by its fighters'
 * results, its specialisations are grounded in disciplines (and therefore in specific
 * attributes), and its facilities and coaching staff determine how much of a training week
 * actually converts into development.
 */

import type { SimDate } from '../core/time.ts';

export type CoachRole = 'head' | 'striking' | 'wrestling' | 'grappling' | 'strength' | 'sports_science' | 'medical';

export interface Coach {
  readonly id: string;
  firstName: string;
  lastName: string;
  campId?: string;
  role: CoachRole;
  /** The discipline this coach actually teaches; ties their bonus to specific attributes. */
  disciplineKey: string;
  /** 0-100 technical quality. */
  ability: number;
  /** 0-100 ability to get the most out of a fighter regardless of technical depth. */
  manManagement: number;
  /** 0-100 standing in the sport; drives poaching by bigger camps. */
  reputation: number;
  readonly birthYear: number;
  /** 0-100 attachment to the current camp. */
  loyalty: number;
  joinedDate?: SimDate;
}

export function coachName(coach: Coach): string {
  return `${coach.firstName} ${coach.lastName}`;
}

/** A camp's specialisation in one discipline (brief §8). */
export interface CampSpecialisation {
  readonly disciplineKey: string;
  /** 1 = primary, 2 = secondary, 3 = tertiary. Drives how large the bonus can be. */
  tier: 1 | 2 | 3;
  /**
   * Development multiplier applied to the attributes this discipline trains, e.g. 1.10 for
   * "+10% wrestling development". Never a flat attribute bonus (brief §8).
   */
  multiplier: number;
}

export interface CampFacilities {
  /** 0-100 quality of the mats, cage, and equipment. */
  training: number;
  medical: number;
  sportsScience: number;
  recovery: number;
}

export interface CampCulture {
  /** 0-100. High-discipline camps convert more of a training week. */
  discipline: number;
  /** 0-100. Hard rooms build fighters faster but injure them more. */
  intensity: number;
  /** 0-100. Low cohesion drives departures. */
  cohesion: number;
}

export type CampStatus = 'active' | 'declining' | 'closed';

export interface Camp {
  readonly id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  readonly foundedYear: number;
  /** 0-100, a slow-moving EMA over its fighters' results. Gates recruitment quality. */
  reputation: number;
  /** Highest reputation ever reached; a fallen camp still trades on its history. */
  peakReputation: number;
  /** Roster capacity; larger camps hold more fighters but dilute coaching attention. */
  capacity: number;
  facilities: CampFacilities;
  culture: CampCulture;
  specialisations: CampSpecialisation[];
  headCoachId?: string;
  coachIds: string[];
  /** Aggregate history, used by the news engine and camp rankings. */
  history: {
    titlesWon: number;
    rankedFighterPeak: number;
    fightersDeveloped: number;
  };
  status: CampStatus;
  closedDate?: SimDate;
}

/**
 * Overall training quality, 0-100. Combines facilities with the culture that decides whether
 * those facilities are used well — a pristine gym with no discipline develops nobody.
 */
export function campTrainingQuality(camp: Camp): number {
  return (
    camp.facilities.training * 0.4 +
    camp.facilities.sportsScience * 0.15 +
    camp.facilities.recovery * 0.15 +
    camp.culture.discipline * 0.18 +
    camp.culture.cohesion * 0.12
  );
}

/** The specialisation multiplier a camp offers for one discipline, or 1 if it has none. */
export function specialisationFor(camp: Camp, disciplineKey: string): number {
  return camp.specialisations.find((s) => s.disciplineKey === disciplineKey)?.multiplier ?? 1;
}

export function primarySpecialisation(camp: Camp): CampSpecialisation | undefined {
  return camp.specialisations.find((s) => s.tier === 1) ?? camp.specialisations[0];
}
