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
}

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
