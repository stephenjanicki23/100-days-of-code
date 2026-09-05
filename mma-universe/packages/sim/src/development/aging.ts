/**
 * Age and development curves (brief §12).
 *
 * Different attributes age differently, and that difference is what produces interesting
 * late-career fighters: a 37-year-old loses a step but reads the fight better than they ever
 * have. Rather than one global age modifier, each attribute belongs to an aging class with
 * its own growth taper and its own decline onset.
 *
 *   physical — grows fast, peaks in the mid-twenties, declines from around thirty
 *   skill    — grows for as long as the fighter trains, erodes only very late
 *   mental   — keeps growing well into a fighter's late thirties, and barely declines
 */

import type { AgingClass } from '../domain/attributes.ts';
import { clamp, lerp } from '../core/math.ts';

export interface AgingProfile {
  /** Development is fastest in a fighter's earliest years; this is where that peak sits. */
  readonly youthPeakAge: number;
  /** Growth multiplier at (and below) the youth peak. */
  readonly youthBoost: number;
  /** Growth is at the baseline rate up to this age. */
  readonly growthFullUntil: number;
  /** Growth tapers to `growthFloor` by this age. */
  readonly growthZeroAt: number;
  /** Growth never falls below this fraction — even a veteran can still learn. */
  readonly growthFloor: number;
  /** Age at which attributes of this class start to erode. */
  readonly declineOnset: number;
  /** Rating points lost per year at ten years past the decline onset. */
  readonly declineAtTenYears: number;
}

export const AGING_PROFILES: Record<AgingClass, AgingProfile> = {
  physical: { youthPeakAge: 20, youthBoost: 1.45, growthFullUntil: 24, growthZeroAt: 32, growthFloor: 0.08, declineOnset: 29, declineAtTenYears: 4.2 },
  skill: { youthPeakAge: 21, youthBoost: 1.4, growthFullUntil: 29, growthZeroAt: 41, growthFloor: 0.25, declineOnset: 38, declineAtTenYears: 2 },
  mental: { youthPeakAge: 22, youthBoost: 1.15, growthFullUntil: 33, growthZeroAt: 45, growthFloor: 0.35, declineOnset: 43, declineAtTenYears: 1.2 },
};

/** Growth multiplier for a fighter of this age, peaking in their earliest professional years. */
export function growthFactor(agingClass: AgingClass, age: number): number {
  const profile = AGING_PROFILES[agingClass];
  if (age <= profile.youthPeakAge) return profile.youthBoost;
  if (age <= profile.growthFullUntil) {
    const t = (age - profile.youthPeakAge) / (profile.growthFullUntil - profile.youthPeakAge);
    return lerp(profile.youthBoost, 1, t);
  }
  if (age >= profile.growthZeroAt) return profile.growthFloor;
  const t = (age - profile.growthFullUntil) / (profile.growthZeroAt - profile.growthFullUntil);
  return lerp(1, profile.growthFloor, t);
}

/**
 * Rating points lost per year at this age, before individual factors. Decline accelerates:
 * the drop from 34 to 35 is smaller than the drop from 39 to 40.
 */
export function declineRatePerYear(agingClass: AgingClass, age: number): number {
  const profile = AGING_PROFILES[agingClass];
  const yearsPast = age - profile.declineOnset;
  if (yearsPast <= 0) return 0;
  // Quadratic ramp normalised so ten years past onset gives `declineAtTenYears`.
  return profile.declineAtTenYears * (yearsPast / 10) ** 1.6;
}

/**
 * Individual modifier on decline. Fighters with high recovery and low accumulated damage
 * age well; a fighter with 40 hard fights on the clock does not.
 */
export function declineModifier(recovery: number, wearAndTear: number, durability: number): number {
  const resilience = (recovery * 0.5 + durability * 0.25 + (100 - wearAndTear) * 0.25) / 100;
  return clamp(1.55 - resilience * 1.1, 0.5, 1.6);
}

/** Convenience: the weekly figure the training system actually applies. */
export function declineRatePerWeek(agingClass: AgingClass, age: number): number {
  return declineRatePerYear(agingClass, age) / 52;
}
