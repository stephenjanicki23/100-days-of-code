/**
 * The training and development system (brief §11, §8).
 *
 * This is the multiplicative pipeline described in ARCHITECTURE.md §6.2. Every influence on
 * a fighter's development is a *rate multiplier*, never a flat attribute award — which is
 * what the brief explicitly demands of camp bonuses (§8) and what keeps development
 * long-term and compounding rather than instantly overpowering.
 *
 *     gain = BASE × age × headroom × intensity × campQuality × specialisation
 *          × coaching × personality × condition × focus × noise
 *
 * The brief's worked example — a base gain of 0.40 through a camp with a 1.10 wrestling
 * bonus producing 0.44 — is literally this pipeline's camp step, and is pinned by a test.
 */

import { Rng } from '../core/rng.ts';
import { clamp, clampAttribute, remap } from '../core/math.ts';
import {
  ATTRIBUTE_DEFINITIONS,
  attributeDefinition,
  type AttributeKey,
  type AttributeSet,
} from '../domain/attributes.ts';
import { disciplineEmphasis } from '../domain/disciplines.ts';
import type { Camp, Coach } from '../domain/camp.ts';
import { campTrainingQuality } from '../domain/camp.ts';
import type { Fighter, TrainingIntensity } from '../domain/fighter.ts';
import { currentAbility } from '../domain/fighter.ts';
import { headroom } from '../ability/ability.ts';
import { SEVERITY_TRAINING_PENALTY } from '../domain/health.ts';
import { declineModifier, declineRatePerWeek, growthFactor } from './aging.ts';

/**
 * The base development rate every other factor scales, in rating points per month — the
 * 0.40 figure the brief works its camp-bonus example from (§8).
 *
 * It is a *monthly* rate because that is the only reading that calibrates: at 0.40 per week
 * a twenty-three-year-old prospect gains something like forty points of Current Ability in
 * two years, which is not a career, it is a video game. Per month, the same prospect gains
 * roughly fifteen to twenty — a real developmental arc.
 *
 * The training tick runs weekly, so the pipeline uses the derived weekly figure; the camp
 * multiplier is applied to the base rate exactly as the brief describes, and
 * `test/development.test.ts` pins the 0.40 × 1.10 = 0.44 example against it.
 */
export const BASE_MONTHLY_GAIN = 0.4;

/** Average weeks in a month; the tick is weekly, the base rate is monthly. */
export const WEEKS_PER_MONTH = 52 / 12;

export const BASE_WEEKLY_GAIN = BASE_MONTHLY_GAIN / WEEKS_PER_MONTH;

export const INTENSITY_FACTORS: Record<TrainingIntensity, number> = {
  recovery: 0.15,
  light: 0.55,
  moderate: 1,
  hard: 1.35,
  extreme: 1.65,
};

/** Weekly fatigue change before recovery ability and camp facilities are applied. */
export const INTENSITY_FATIGUE: Record<TrainingIntensity, number> = {
  recovery: -16,
  light: -6,
  moderate: 1,
  hard: 4,
  extreme: 8,
};

/** Relative injury exposure per week of training at each intensity. */
export const INTENSITY_INJURY_RISK: Record<TrainingIntensity, number> = {
  recovery: 0.2,
  light: 0.5,
  moderate: 1,
  hard: 1.75,
  extreme: 2.7,
};

/* ------------------------------------------------------------------ multipliers */

/**
 * The camp specialisation step of the pipeline, isolated so it can be reasoned about and
 * tested on its own. A camp with a 1.10 wrestling bonus multiplies growth on exactly the
 * attributes wrestling develops, in proportion to how central each is to that discipline.
 */
export function applyCampSpecialisation(gain: number, camp: Camp | undefined, attribute: AttributeKey): number {
  if (!camp) return gain;
  let multiplier = 1;
  for (const specialisation of camp.specialisations) {
    const emphasis = disciplineEmphasis(specialisation.disciplineKey, attribute);
    if (emphasis <= 0) continue;
    // A discipline's peripheral attributes get a proportionally smaller share of the bonus.
    multiplier *= 1 + (specialisation.multiplier - 1) * emphasis;
  }
  return gain * multiplier;
}

/** Facilities and culture together: a good room, used well. */
export function campQualityFactor(camp: Camp | undefined): number {
  if (!camp) return 0.72; // Training alone, without a gym behind you.
  return remap(campTrainingQuality(camp), 20, 95, 0.78, 1.22);
}

/**
 * Coaching. Only the best-matched coach for an attribute counts — a camp with six coaches
 * does not develop a jab six times faster — and a fighter's coachability decides how much
 * of that coaching lands.
 */
export function coachingFactor(coaches: readonly Coach[], attribute: AttributeKey, coachability: number): number {
  let best = 0;
  for (const coach of coaches) {
    const emphasis = disciplineEmphasis(coach.disciplineKey, attribute);
    if (emphasis <= 0) continue;
    const quality = coach.ability * 0.7 + coach.manManagement * 0.3;
    best = Math.max(best, emphasis * remap(quality, 20, 99, -0.1, 0.24));
  }
  const receptiveness = remap(coachability, 1, 100, 0.55, 1.15);
  return clamp(1 + best * receptiveness, 0.8, 1.3);
}

/** Work ethic, discipline and coachability decide how much of a week is actually absorbed. */
export function personalityFactor(fighter: Fighter): number {
  const p = fighter.personality;
  const professional = (p.workEthic * 0.45 + p.discipline * 0.3 + p.coachability * 0.25) / 100;
  // A large ego blunts coaching regardless of how hard its owner works.
  const egoDrag = remap(p.ego, 1, 100, 1.04, 0.9);
  return clamp(remap(professional, 0.1, 1, 0.68, 1.28) * egoDrag, 0.55, 1.35);
}

/** Fatigue and injury both suppress what a fighter can get out of a week. */
export function conditionFactor(fighter: Fighter): number {
  const fatiguePenalty = remap(fighter.condition.fatigue, 0, 100, 1.05, 0.5);
  let injuryPenalty = 1;
  for (const injury of fighter.condition.injuries) {
    if (injury.endDate) continue;
    injuryPenalty = Math.min(injuryPenalty, SEVERITY_TRAINING_PENALTY[injury.severity]);
  }
  return clamp(fatiguePenalty * injuryPenalty, 0.03, 1.1);
}

/** A fighter's own focus: what they choose to drill improves faster, at the cost of the rest. */
export function focusFactor(focus: readonly string[], attribute: AttributeKey): number {
  let emphasis = 0;
  for (const disciplineKey of focus) {
    emphasis = Math.max(emphasis, disciplineEmphasis(disciplineKey, attribute));
  }
  return 0.88 + emphasis * 0.42;
}

/* ------------------------------------------------------------------ the week */

export interface TrainingWeekInput {
  readonly fighter: Fighter;
  readonly camp?: Camp;
  readonly coaches: readonly Coach[];
  readonly age: number;
  readonly rng: Rng;
}

export interface TrainingWeekResult {
  readonly fighterId: string;
  readonly deltas: Partial<Record<AttributeKey, number>>;
  readonly abilityBefore: number;
  readonly abilityAfter: number;
  readonly fatigueBefore: number;
  readonly fatigueAfter: number;
}

/**
 * Computes one week of development. Pure: it returns the changes rather than applying them,
 * so it can be tested in isolation and so the tick runner stays in control of mutation
 * order (and therefore of transactional persistence).
 */
export function computeTrainingWeek(input: TrainingWeekInput): TrainingWeekResult {
  const { fighter, camp, coaches, age, rng } = input;

  const abilityBefore = currentAbility(fighter);
  const room = headroom(abilityBefore, fighter.potentialAbility);

  const intensity = INTENSITY_FACTORS[fighter.training.intensity];
  const campQuality = campQualityFactor(camp);
  const personality = personalityFactor(fighter);
  const condition = conditionFactor(fighter);
  const decline = declineModifier(
    fighter.attributes.recovery,
    fighter.condition.wearAndTear,
    fighter.attributes.durability,
  );

  const deltas: Partial<Record<AttributeKey, number>> = {};

  // Draws come sequentially from this fighter-week's own stream rather than from a stream
  // derived per attribute. That is materially faster over a simulated year, and it is still
  // safe: `ATTRIBUTE_DEFINITIONS` has a fixed iteration order, and the stream itself is
  // addressed by fighter and week, so no other entity's work can perturb it.
  for (const definition of ATTRIBUTE_DEFINITIONS) {
    const key = definition.key as AttributeKey;

    // --- growth ---------------------------------------------------------------
    let gain = BASE_WEEKLY_GAIN;
    gain *= growthFactor(definition.agingClass, age);
    gain *= room;
    gain *= intensity;
    gain *= campQuality;
    gain = applyCampSpecialisation(gain, camp, key);
    gain *= coachingFactor(coaches, key, fighter.personality.coachability);
    gain *= personality;
    gain *= condition;
    gain *= focusFactor(fighter.training.focus, key);
    gain *= rng.clampedNormal(1, 0.28, 0.3, 1.9);

    // --- decline --------------------------------------------------------------
    const loss = declineRatePerWeek(definition.agingClass, age) * decline;

    const delta = gain - loss;
    if (Math.abs(delta) > 1e-9) deltas[key] = delta;
  }

  const projected: AttributeSet = { ...fighter.attributes };
  for (const [key, delta] of Object.entries(deltas) as [AttributeKey, number][]) {
    projected[key] = clampAttribute(projected[key] + delta);
  }

  const fatigueBefore = fighter.condition.fatigue;
  const fatigueAfter = computeFatigue(fighter, camp);

  return {
    fighterId: fighter.id,
    deltas,
    abilityBefore,
    abilityAfter: currentAbility({ ...fighter, attributes: projected } as Fighter),
    fatigueBefore,
    fatigueAfter,
  };
}

/**
 * Fatigue accumulates with training load and drains with recovery ability and facilities.
 * A fighter in a well-resourced camp can sustain a harder week than one who cannot.
 */
export function computeFatigue(fighter: Fighter, camp: Camp | undefined): number {
  const load = INTENSITY_FATIGUE[fighter.training.intensity];
  const recoveryPower =
    (fighter.attributes.recovery * 0.6 + (camp?.facilities.recovery ?? 35) * 0.25 + (camp?.facilities.sportsScience ?? 30) * 0.15) / 100;

  // Load builds up at a rate blunted by recovery; rest weeks clear fatigue faster for
  // fighters who recover well.
  const change = load >= 0 ? load * (1.35 - recoveryPower * 0.75) : load * (0.7 + recoveryPower * 0.7);
  return clamp(fighter.condition.fatigue + change, 0, 100);
}

/** Applies a computed week to the fighter. Kept separate so computation stays pure. */
export function applyTrainingWeek(fighter: Fighter, result: TrainingWeekResult): void {
  for (const [key, delta] of Object.entries(result.deltas) as [AttributeKey, number][]) {
    fighter.attributes[key] = clampAttribute(fighter.attributes[key] + delta);
  }
  fighter.condition.fatigue = result.fatigueAfter;
}

/** The largest movers of a training block, for the development timeline in the UI. */
export function notableChanges(
  deltas: Partial<Record<AttributeKey, number>>,
  limit = 3,
): { attribute: AttributeKey; label: string; delta: number }[] {
  return (Object.entries(deltas) as [AttributeKey, number][])
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, limit)
    .map(([attribute, delta]) => ({ attribute, label: attributeDefinition(attribute).label, delta }));
}
