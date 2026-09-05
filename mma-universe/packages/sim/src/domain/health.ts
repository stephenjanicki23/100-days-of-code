/** Injuries and physical condition (brief §11, §20). */

import type { SimDate } from '../core/time.ts';

export type BodyRegion = 'head' | 'face' | 'body' | 'lead_leg' | 'rear_leg' | 'lead_arm' | 'rear_arm' | 'back' | 'knee' | 'shoulder' | 'hand';

export const INJURY_SEVERITIES = ['knock', 'minor', 'moderate', 'serious', 'severe'] as const;
export type InjurySeverity = (typeof INJURY_SEVERITIES)[number];

/** Typical lay-off in days per severity, before individual recovery rates are applied. */
export const SEVERITY_BASE_DAYS: Record<InjurySeverity, [number, number]> = {
  knock: [3, 9],
  minor: [10, 24],
  moderate: [25, 60],
  serious: [61, 150],
  severe: [151, 420],
};

export interface Injury {
  readonly id: string;
  readonly fighterId: string;
  readonly label: string;
  readonly region: BodyRegion;
  readonly severity: InjurySeverity;
  readonly startDate: SimDate;
  readonly expectedReturn: SimDate;
  /** Set when the fighter is cleared; an open injury has no end date. */
  endDate?: SimDate;
  /** Cause, for the news engine and for tracking chronic problems. */
  readonly cause: 'training' | 'fight' | 'weight_cut' | 'wear';
  /** A repeat of an existing problem heals slower and recurs more easily. */
  readonly recurrence: number;
  /**
   * A problem that never fully goes away (Sprint 6). Chronic injuries permanently depress the
   * attributes the affected area governs and make future injuries there far more likely — the
   * mechanism behind a fighter who is "never the same after that knee".
   */
  readonly chronic: boolean;
}

/** Attributes a lasting problem in each region permanently depresses. */
export const CHRONIC_ATTRIBUTE_COSTS: Record<BodyRegion, readonly string[]> = {
  head: ['durability', 'composure', 'recovery'],
  face: ['durability'],
  body: ['cardio', 'durability'],
  lead_leg: ['footwork', 'speed', 'agility'],
  rear_leg: ['explosiveness', 'speed', 'strikingPower'],
  lead_arm: ['strikingAccuracy', 'strikingDefense'],
  rear_arm: ['strikingPower', 'submissionAbility'],
  back: ['strength', 'scrambling', 'agility'],
  knee: ['agility', 'footwork', 'takedownAbility'],
  shoulder: ['strength', 'submissionDefense', 'topControl'],
  hand: ['strikingPower', 'strikingAccuracy'],
};

/** How many times a region must be hurt before the problem becomes permanent. */
export const CHRONIC_THRESHOLD = 3;

export function isInjuryOpen(injury: Injury): boolean {
  return injury.endDate === undefined;
}

/** A rough "how badly does this hamper training" factor in [0, 1]. */
export const SEVERITY_TRAINING_PENALTY: Record<InjurySeverity, number> = {
  knock: 0.9,
  minor: 0.7,
  moderate: 0.4,
  serious: 0.18,
  severe: 0.05,
};
