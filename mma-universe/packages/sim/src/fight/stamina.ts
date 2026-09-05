/**
 * The stamina system (Sprint 7, brief §21).
 *
 * Two pools, because one cannot reproduce what actually happens in a fight. `burst` is what a
 * fighter can spend right now — it drains in an exchange and comes back in the seconds after
 * it. `cardio` is the tank: it drains slowly, recovers barely at all inside a fight, and its
 * level caps how much burst can be restored.
 *
 * That interaction is the whole point. A fighter with a huge gas tank can keep having
 * exchanges; a fighter without one has a great first round and then has to survive. A single
 * stamina number gives you neither.
 */

import { clamp, remap } from '../core/math.ts';
import type { Fighter } from '../domain/fighter.ts';

export interface Stamina {
  /** 0-100, immediately available output. */
  burst: number;
  /** 0-100, the long-term tank. */
  cardio: number;
  /** How fast burst returns between exchanges, from the recovery attribute. */
  readonly recoveryRate: number;
  /** How slowly the tank drains, from the cardio attribute. */
  readonly enduranceRate: number;
}

export function createStamina(fighter: Fighter): Stamina {
  const { cardio, recovery } = fighter.attributes;
  // Fighters do not start a fight perfectly fresh: a hard weight cut and a long camp cost
  // something before the horn.
  const cutCost = remap(fighter.condition.weightManagement, 1, 100, 12, 0);
  const campCost = remap(fighter.condition.fatigue, 0, 100, 0, 10);

  return {
    burst: clamp(100 - cutCost * 0.4 - campCost * 0.3, 55, 100),
    cardio: clamp(100 - cutCost - campCost, 45, 100),
    recoveryRate: remap(recovery, 1, 100, 0.55, 2.1),
    enduranceRate: remap(cardio, 1, 100, 1.7, 0.5),
  };
}

/**
 * The multiplier every effective rating is scaled by.
 *
 * Deliberately non-linear: the first third of a tank costs a fighter almost nothing, and the
 * last third costs them the fight. A linear curve makes tired fighters merely slightly worse,
 * which is not how any of this looks.
 */
export function effectiveOutput(stamina: Stamina): number {
  const burstTerm = remap(stamina.burst, 0, 100, 0.62, 1);
  const cardioTerm = remap(stamina.cardio, 0, 100, 0.5, 1);
  // Geometric mean, weighted toward the tank — a fighter can be momentarily fresh and still
  // be exhausted.
  return clamp(burstTerm ** 0.45 * cardioTerm ** 0.55, 0.35, 1);
}

/** Spends stamina on an action. `intensity` is roughly "how much of themselves they put into it". */
export function spend(stamina: Stamina, intensity: number): void {
  stamina.burst = clamp(stamina.burst - intensity * 1.35, 0, 100);
  stamina.cardio = clamp(stamina.cardio - intensity * 0.14 * stamina.enduranceRate, 0, 100);
}

/**
 * Recovers over `seconds` of fight time. Burst returns quickly but only up to what the tank
 * can support, which is what produces a fighter who looks recovered and then falls apart the
 * moment they have to move.
 */
export function recover(stamina: Stamina, seconds: number, resting: boolean): void {
  const rate = stamina.recoveryRate * (resting ? 2.4 : 1);
  const ceiling = clamp(stamina.cardio + 8, 0, 100);
  stamina.burst = clamp(Math.min(stamina.burst + rate * seconds, ceiling), 0, 100);
  // The tank itself comes back a little between rounds, and essentially not at all during one.
  stamina.cardio = clamp(stamina.cardio + (resting ? 0.55 : 0.012) * seconds, 0, 100);
}

/** Between-rounds recovery: sixty seconds on the stool. */
export function recoverBetweenRounds(stamina: Stamina): void {
  recover(stamina, 60, true);
}

/** A readable label for the UI and for commentary. */
export function staminaLabel(stamina: Stamina): string {
  const output = effectiveOutput(stamina);
  if (output > 0.92) return 'fresh';
  if (output > 0.82) return 'working';
  if (output > 0.7) return 'breathing hard';
  if (output > 0.58) return 'tiring badly';
  return 'exhausted';
}
