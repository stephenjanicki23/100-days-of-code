/**
 * The game-plan type and its neutral starting point.
 *
 * Split out from `tactics.ts` purely to keep the module graph acyclic: `combatant.ts` needs
 * to construct a default plan, and `tactics.ts` needs `combatant.ts` at runtime to read
 * effective ratings. Putting the shared type in its own leaf module means neither has to
 * import the other at runtime.
 */

import type { StyleTendencies } from '../domain/archetypes.ts';

/**
 * `StyleTendencies` is readonly because an archetype is a fixed description. A game plan is
 * the opposite: it exists to be changed, mid-round and between rounds.
 */
export type MutableTendencies = { -readonly [K in keyof StyleTendencies]: StyleTendencies[K] };

export interface GamePlan extends MutableTendencies {
  /** Deliberate targeting biases; the three sum to 1. */
  targetHead: number;
  targetBody: number;
  targetLegs: number;
  /** How willing the fighter is to be on their back. Low means fight to get up. */
  acceptBottom: number;
  /** Willingness to expend energy now rather than bank it. Falls as a fighter tires. */
  urgency: number;
  /** What the corner has told them, most recent last. */
  notes: string[];
}

export function planFromTendencies(tendencies: StyleTendencies): GamePlan {
  return {
    ...tendencies,
    // Roughly the split a real significant-strike breakdown shows; game plans move it.
    targetHead: 0.68,
    targetBody: 0.2,
    targetLegs: 0.12,
    acceptBottom: 0.4,
    urgency: 0.55,
    notes: [],
  };
}

/** Re-normalises the three targeting weights back to a distribution. */
export function normaliseTargeting(plan: GamePlan): void {
  const total = plan.targetHead + plan.targetBody + plan.targetLegs;
  if (total <= 0) {
    plan.targetHead = 1;
    plan.targetBody = 0;
    plan.targetLegs = 0;
    return;
  }
  plan.targetHead /= total;
  plan.targetBody /= total;
  plan.targetLegs /= total;
}
