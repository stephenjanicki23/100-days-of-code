/**
 * Injuries and recovery (brief §11, §20).
 *
 * Injury is the main brake on development, and the main reason a high-potential fighter can
 * fail to arrive. Risk rises with training intensity, age, accumulated fatigue and wear, and
 * falls with durability and the quality of a camp's medical and sports-science support —
 * which is one of the clearest ways a good camp pays for itself.
 */

import { Rng } from '../core/rng.ts';
import { clamp, clampAttribute, remap } from '../core/math.ts';
import { addDays, type SimDate } from '../core/time.ts';
import type { Camp } from '../domain/camp.ts';
import type { Fighter } from '../domain/fighter.ts';
import {
  CHRONIC_ATTRIBUTE_COSTS,
  CHRONIC_THRESHOLD,
  INJURY_SEVERITIES,
  SEVERITY_BASE_DAYS,
  type BodyRegion,
  type Injury,
  type InjurySeverity,
} from '../domain/health.ts';

/** Base weekly probability that a fighter picks up *something* in training. */
const BASE_WEEKLY_INJURY_RISK = 0.011;

/**
 * Injury labels carry their own article so generated prose reads correctly: news copy
 * interpolates the label directly, and "a broken nose" and "thumb ligament damage" need
 * different treatment that a template cannot supply.
 */
const REGION_LABELS: Record<BodyRegion, readonly string[]> = {
  head: ['concussion symptoms', 'a head knock'],
  face: ['a facial cut', 'a broken nose', 'orbital swelling'],
  body: ['a rib injury', 'a torn oblique', 'bruised ribs'],
  lead_leg: ['a lead-leg strain', 'a calf tear', 'an ankle sprain'],
  rear_leg: ['a hamstring strain', 'a quad tear', 'a foot injury'],
  lead_arm: ['an elbow strain', 'a wrist injury', 'a biceps tear'],
  rear_arm: ['a shoulder strain', 'a triceps tear', 'a forearm injury'],
  back: ['a lower-back injury', 'a disc problem', 'a back spasm'],
  knee: ['an MCL sprain', 'an ACL tear', 'meniscus damage'],
  shoulder: ['a rotator-cuff tear', 'a shoulder dislocation', 'an AC joint injury'],
  hand: ['a broken hand', 'thumb ligament damage', 'a knuckle injury'],
};

const REGION_WEIGHTS: readonly (readonly [BodyRegion, number])[] = [
  ['knee', 14], ['hand', 13], ['shoulder', 11], ['back', 10], ['lead_leg', 10],
  ['rear_leg', 8], ['lead_arm', 8], ['rear_arm', 7], ['body', 7], ['face', 6], ['head', 6],
];

/**
 * Weekly injury probability for one fighter, expressed as a set of independent multipliers
 * on the base rate so each contribution stays legible.
 */
export function weeklyInjuryRisk(
  fighter: Fighter,
  camp: Camp | undefined,
  age: number,
  intensityRisk: number,
): number {
  const durability = remap(fighter.attributes.durability, 1, 100, 1.5, 0.6);
  const fatigue = remap(fighter.condition.fatigue, 0, 100, 0.75, 2.1);
  const wear = remap(fighter.condition.wearAndTear, 0, 100, 0.85, 1.7);
  const ageFactor = age <= 28 ? 1 : 1 + (age - 28) * 0.055;
  const campCare = camp
    ? remap(camp.facilities.medical * 0.55 + camp.facilities.sportsScience * 0.45, 5, 99, 1.25, 0.68)
    : 1.3;
  const cultureRisk = camp ? remap(camp.culture.intensity, 10, 99, 0.85, 1.28) : 1;

  return clamp(
    BASE_WEEKLY_INJURY_RISK * intensityRisk * durability * fatigue * wear * ageFactor * campCare * cultureRisk,
    0,
    0.3,
  );
}

/** Severity is skewed heavily toward minor problems; a career-threatening tear is rare. */
function rollSeverity(rng: Rng, age: number, wearAndTear: number): InjurySeverity {
  // Older, more worn fighters break worse when they break.
  const severityShift = clamp((age - 29) * 0.012 + wearAndTear * 0.0022, 0, 0.28);
  return rng.pickWeighted([
    ['knock' as const, 0.4 - severityShift * 0.9],
    ['minor' as const, 0.32],
    ['moderate' as const, 0.18 + severityShift * 0.4],
    ['serious' as const, 0.08 + severityShift * 0.4],
    ['severe' as const, 0.02 + severityShift * 0.1],
  ]);
}

export interface InjuryContext {
  readonly fighter: Fighter;
  readonly camp?: Camp;
  readonly age: number;
  readonly date: SimDate;
  readonly cause: Injury['cause'];
  readonly idFactory: () => string;
}

/** Creates an injury of the given severity, with a lay-off shaped by recovery and medical care. */
export function createInjury(rng: Rng, context: InjuryContext, severity: InjurySeverity): Injury {
  const region = rng.pickWeighted(REGION_WEIGHTS);
  const [minDays, maxDays] = SEVERITY_BASE_DAYS[severity];
  const baseDays = rng.int(minDays, maxDays);

  // Good recovery and good medical support genuinely shorten a lay-off.
  const recoverySpeed = remap(
    context.fighter.attributes.recovery * 0.6 + (context.camp?.facilities.medical ?? 30) * 0.4,
    1,
    99,
    1.35,
    0.72,
  );

  // A repeat of an existing problem heals more slowly.
  const previous = context.fighter.condition.injuries.filter((i) => i.region === region).length;
  const recurrencePenalty = 1 + previous * 0.12;

  const days = Math.max(2, Math.round(baseDays * recoverySpeed * recurrencePenalty));

  // Enough damage to one area and the problem stops going away (Sprint 6).
  const chronic = previous + 1 >= CHRONIC_THRESHOLD && severity !== 'knock';

  return {
    id: context.idFactory(),
    fighterId: context.fighter.id,
    label: rng.pick(REGION_LABELS[region]),
    region,
    severity,
    startDate: context.date,
    expectedReturn: addDays(context.date, days),
    cause: context.cause,
    recurrence: previous,
    chronic,
  };
}

/**
 * Applies the permanent cost of a chronic problem. Called once, when the injury is created:
 * a fighter with a chronic knee is measurably slower for the rest of their career, which is
 * what stops injuries from being a pause button.
 */
export function applyChronicCost(fighter: Fighter, injury: Injury): void {
  if (!injury.chronic) return;
  for (const attribute of CHRONIC_ATTRIBUTE_COSTS[injury.region]) {
    const key = attribute as keyof typeof fighter.attributes;
    if (fighter.attributes[key] === undefined) continue;
    fighter.attributes[key] = clampAttribute(fighter.attributes[key] - 1.5);
  }
}

/** Rolls for a training injury during one week. Returns undefined for the usual case. */
export function rollTrainingInjury(rng: Rng, context: InjuryContext, intensityRisk: number): Injury | undefined {
  const risk = weeklyInjuryRisk(context.fighter, context.camp, context.age, intensityRisk);
  if (!rng.bool(risk)) return undefined;
  return createInjury(rng, context, rollSeverity(rng, context.age, context.fighter.condition.wearAndTear));
}

/**
 * Closes any injuries whose expected return date has passed. Returns the injuries that
 * healed, so the caller can emit news and restore the fighter's status.
 */
export function healDueInjuries(fighter: Fighter, date: SimDate): Injury[] {
  const healed: Injury[] = [];
  for (const injury of fighter.condition.injuries) {
    if (injury.endDate) continue;
    if (injury.expectedReturn <= date) {
      injury.endDate = date;
      healed.push(injury);
    }
  }
  return healed;
}

export function openInjuries(fighter: Fighter): Injury[] {
  return fighter.condition.injuries.filter((i) => !i.endDate);
}

/** The lasting cost of an injury, added to a fighter's permanent wear. */
export const SEVERITY_WEAR_COST: Record<InjurySeverity, number> = {
  knock: 0.2,
  minor: 0.6,
  moderate: 1.8,
  serious: 4.5,
  severe: 9,
};

export { INJURY_SEVERITIES };
