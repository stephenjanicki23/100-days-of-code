/**
 * A fighter *inside* a fight (Sprint 7).
 *
 * The `Fighter` domain object is a career record — it must not be mutated by a bout that may
 * be being simulated speculatively, replayed, or run in parallel. So the engine projects each
 * fighter into a `Combatant`: their static qualities resolved once, plus the volatile state
 * that only exists between the opening horn and the finish.
 *
 * The important idea is `effective()`. A fighter's ratings are what they can do *fresh and
 * undamaged*. What matters in round three is what is left: stamina, accumulated damage,
 * a wrecked lead leg. Every resolution reads effective values, never raw ones.
 */

import { clamp, remap } from '../core/math.ts';
import type { AttributeKey, AttributeSet } from '../domain/attributes.ts';
import { computeFacets, type FacetKey, type FacetSet } from '../ability/facets.ts';
import { deriveStyle, type StyleTendencies } from '../domain/archetypes.ts';
import { currentAbility, type Fighter } from '../domain/fighter.ts';
import { createDamageState, damagePenalties, type DamageState } from './damage.ts';
import { createStamina, effectiveOutput, type Stamina } from './stamina.ts';
import { planFromTendencies, type GamePlan } from './plan.ts';

export interface Combatant {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  /** Reach advantage matters at range; height in the clinch. */
  readonly reachIn: number;
  readonly heightIn: number;
  readonly stance: string;
  readonly attributes: AttributeSet;
  readonly baseFacets: FacetSet;
  readonly tendencies: StyleTendencies;
  readonly ability: number;
  readonly styleLabel: string;

  stamina: Stamina;
  damage: DamageState;
  /** -100..100, swings with success and reverses on a knockdown. */
  momentum: number;
  /** Seconds spent in a dominant position; the single biggest input to judging a round. */
  controlTime: number;
  /** Rounds of accumulated statistics, indexed from 0. */
  stats: RoundStats[];
  /** The plan the corner sent them out with, mutated between rounds (Sprint 9). */
  plan: GamePlan;
  /** Non-zero while stunned; counts down in seconds of fight time. */
  stunnedFor: number;
  knockdowns: number;
  /** True once the fighter is finished. */
  finished: boolean;
}

export interface RoundStats {
  significantStrikesLanded: number;
  significantStrikesAttempted: number;
  totalStrikesLanded: number;
  totalStrikesAttempted: number;
  headStrikes: number;
  bodyStrikes: number;
  legStrikes: number;
  takedownsLanded: number;
  takedownsAttempted: number;
  submissionAttempts: number;
  knockdowns: number;
  controlTime: number;
  damageDealt: number;
}

export function emptyRoundStats(): RoundStats {
  return {
    significantStrikesLanded: 0,
    significantStrikesAttempted: 0,
    totalStrikesLanded: 0,
    totalStrikesAttempted: 0,
    headStrikes: 0,
    bodyStrikes: 0,
    legStrikes: 0,
    takedownsLanded: 0,
    takedownsAttempted: 0,
    submissionAttempts: 0,
    knockdowns: 0,
    controlTime: 0,
    damageDealt: 0,
  };
}

/** Surname only — how a commentator refers to a fighter mid-exchange. */
function shortNameOf(fighter: Fighter): string {
  return fighter.lastName;
}

/**
 * Projects a career fighter into a combatant. The plan defaults to their natural tendencies;
 * the engine replaces it with a scouted game plan once both combatants exist, since a plan is
 * built against a specific opponent.
 */
export function createCombatant(fighter: Fighter, plan?: GamePlan): Combatant {
  const style = deriveStyle(fighter.attributes);
  return {
    id: fighter.id,
    name: fighter.nickname
      ? `${fighter.firstName} "${fighter.nickname}" ${fighter.lastName}`
      : `${fighter.firstName} ${fighter.lastName}`,
    shortName: shortNameOf(fighter),
    reachIn: fighter.reachIn,
    heightIn: fighter.heightIn,
    stance: fighter.stance,
    attributes: { ...fighter.attributes },
    baseFacets: computeFacets(fighter.attributes),
    tendencies: style.tendencies,
    ability: currentAbility(fighter),
    styleLabel: style.primary.label,
    stamina: createStamina(fighter),
    damage: createDamageState(),
    momentum: 0,
    controlTime: 0,
    stats: [emptyRoundStats()],
    plan: plan ?? planFromTendencies(style.tendencies),
    stunnedFor: 0,
    knockdowns: 0,
    finished: false,
  };
}

/**
 * A facet as it stands right now — after fatigue, damage and being stunned.
 *
 * This single function is why a fight has a shape: a fighter who empties the tank in round
 * one is a measurably different opponent in round three, without any special-case code
 * anywhere in the engine.
 */
export function effective(combatant: Combatant, facet: FacetKey): number {
  const base = combatant.baseFacets[facet];
  const output = effectiveOutput(combatant.stamina);
  const penalties = damagePenalties(combatant.damage);

  let value = base * output;

  switch (facet) {
    case 'strikingOffense':
      value *= penalties.strikingPower * penalties.armFunction;
      break;
    case 'strikingDefense':
      // Being hurt is what gets fighters finished: defence collapses faster than offence.
      value *= penalties.reaction * (combatant.stunnedFor > 0 ? 0.45 : 1);
      break;
    case 'wrestlingOffense':
    case 'wrestlingDefense':
      value *= penalties.legFunction;
      break;
    case 'clinch':
      value *= penalties.legFunction * penalties.armFunction;
      break;
    case 'groundOffense':
    case 'groundDefense':
      value *= penalties.armFunction;
      break;
    case 'physical':
      value *= penalties.legFunction * penalties.cardio;
      break;
    case 'mental':
      value *= penalties.reaction * (combatant.stunnedFor > 0 ? 0.6 : 1);
      break;
  }

  // Momentum is a real effect in a fight, but a small one — a fighter on a roll is sharper,
  // not superhuman.
  value *= 1 + clamp(combatant.momentum, -100, 100) / 900;

  return clamp(value, 1, 100);
}

/** An attribute adjusted the same way, for the handful of checks that need one directly. */
export function effectiveAttribute(combatant: Combatant, key: AttributeKey): number {
  const output = effectiveOutput(combatant.stamina);
  return clamp(combatant.attributes[key] * output, 1, 100);
}

export function currentRound(combatant: Combatant): RoundStats {
  return combatant.stats[combatant.stats.length - 1]!;
}

export function beginRound(combatant: Combatant): void {
  combatant.stats.push(emptyRoundStats());
}

/** Reach advantage in inches, from the perspective of `combatant`. */
export function reachAdvantage(combatant: Combatant, opponent: Combatant): number {
  return combatant.reachIn - opponent.reachIn;
}

/** Converts a reach edge into a small accuracy modifier at range. */
export function reachModifier(advantage: number): number {
  return remap(clamp(advantage, -8, 8), -8, 8, 0.93, 1.07);
}
