/**
 * Game plans, in-fight adaptation and corner instructions (Sprint 9, brief §14).
 *
 * This is what separates a fight simulation from a dice-off. Fighters do not execute their
 * archetype blindly: they arrive with a plan built from scouting the opponent, they change it
 * when it is not working or when their body stops cooperating, and their corner tells them
 * what to fix between rounds.
 *
 * Every adjustment here is a change to a *behaviour weight*, never a change to an attribute.
 * A corner cannot make a fighter better — only make them fight differently.
 */

import { clamp } from '../core/math.ts';
import type { Combatant } from './combatant.ts';
import { normaliseTargeting, planFromTendencies, type GamePlan } from './plan.ts';
import { effective } from './combatant.ts';
import { effectiveOutput } from './stamina.ts';
import { Rng } from '../core/rng.ts';

/**
 * Builds a fighter's plan by scouting the opponent (Sprint 9).
 *
 * A camp game-plans against a specific person: they attack the hole, and they avoid the
 * strength. The magnitude of every adjustment scales with the fighter's own Fight IQ, so a
 * cerebral fighter exploits a weakness that a brawler walks straight past.
 */
export function buildGamePlan(self: Combatant, opponent: Combatant, rng: Rng): GamePlan {
  const plan = planFromTendencies(self.tendencies);
  // How well this fighter and their camp read an opponent.
  const iq = clamp(self.attributes.fightIQ / 100, 0.15, 1);
  const adapt = iq * 0.55;

  const theirTakedownDefence = opponent.baseFacets.wrestlingDefense;
  const theirStrikingDefence = opponent.baseFacets.strikingDefense;
  const theirGroundDefence = opponent.baseFacets.groundDefense;
  const theirGroundOffence = opponent.baseFacets.groundOffense;

  const myWrestling = self.baseFacets.wrestlingOffense;
  const myStriking = self.baseFacets.strikingOffense;

  // Take it down if they cannot stop it and we can do it.
  if (theirTakedownDefence < myWrestling - 8) {
    plan.takedownRate = clamp(plan.takedownRate + adapt * 0.5, 0, 1);
    plan.notes.push('They have no answer for the takedown — put them on their back.');
  }
  // Keep it standing if their ground game is the danger.
  if (theirGroundOffence > self.baseFacets.groundDefense + 10) {
    plan.takedownRate = clamp(plan.takedownRate - adapt * 0.55, 0, 1);
    plan.acceptBottom = clamp(plan.acceptBottom - adapt * 0.6, 0, 1);
    plan.notes.push('Do not go to the floor with them. Keep this standing.');
  }
  // Stand and bang if they cannot defend and we can hit.
  if (theirStrikingDefence < myStriking - 10) {
    plan.strikeVolume = clamp(plan.strikeVolume + adapt * 0.35, 0, 1);
    plan.pressure = clamp(plan.pressure + adapt * 0.25, 0, 1);
    plan.notes.push('They are there to be hit. Let your hands go.');
  }
  // Hunt the finish on the mat if they cannot defend it.
  if (theirGroundDefence < self.baseFacets.groundOffense - 10) {
    plan.submissionSeeking = clamp(plan.submissionSeeking + adapt * 0.4, 0, 1);
  }
  // Attack the legs of a fighter who lives on movement.
  if (opponent.tendencies.range > 0.65 || opponent.attributes.footwork > 75) {
    plan.targetLegs = clamp(plan.targetLegs + adapt * 0.35, 0, 0.6);
    plan.notes.push('Take their legs away — chop that lead leg every time they circle.');
  }
  // Attack the body of a fighter with a suspect gas tank.
  if (opponent.attributes.cardio < 62) {
    plan.targetBody = clamp(plan.targetBody + adapt * 0.3, 0, 0.55);
    plan.notes.push('Go to the body early. They will fold in the third.');
  }

  normaliseTargeting(plan);
  // No two camps produce quite the same plan.
  plan.pace = clamp(plan.pace + rng.float(-0.06, 0.06), 0.05, 1);
  return plan;
}

/**
 * Continuous in-fight adaptation, applied every few exchanges (Sprint 9).
 *
 * Three things drive it, and each produces behaviour you can see: a damaged body part stops
 * being used, a losing approach gets abandoned, and a tired fighter stops spending.
 */
export function adaptInFight(self: Combatant, opponent: Combatant): void {
  const plan = self.plan;

  // A wrecked lead leg means the kicks stop and the movement goes.
  if (self.damage.leadLeg > 35) {
    plan.targetLegs = clamp(plan.targetLegs - 0.25, 0, 1);
    plan.range = clamp(plan.range - 0.15, 0, 1);
    normaliseTargeting(plan);
  }
  // Hurt hands mean fewer punches and more wrestling.
  if (self.damage.rearArm > 40 || self.damage.leadArm > 40) {
    plan.strikeVolume = clamp(plan.strikeVolume - 0.15, 0, 1);
    plan.takedownRate = clamp(plan.takedownRate + 0.1, 0, 1);
  }
  // Losing the striking badly? Change the fight.
  const strikingGap = effective(self, 'strikingOffense') - effective(opponent, 'strikingDefense');
  if (strikingGap < -12 && self.baseFacets.wrestlingOffense > 55) {
    plan.takedownRate = clamp(plan.takedownRate + 0.12, 0, 1);
    plan.clinchRate = clamp(plan.clinchRate + 0.08, 0, 1);
  }
  // Being out-wrestled? Get up, get out, and keep it long.
  if (opponent.controlTime > self.controlTime + 90) {
    plan.acceptBottom = clamp(plan.acceptBottom - 0.15, 0, 1);
    plan.range = clamp(plan.range + 0.12, 0, 1);
  }
  // Empty tank: stop spending.
  const output = effectiveOutput(self.stamina);
  plan.urgency = clamp(output - 0.2 + (self.momentum > 20 ? 0.15 : 0), 0.1, 1);
  if (output < 0.72) {
    plan.pace = clamp(plan.pace - 0.1, 0.1, 1);
    plan.pressure = clamp(plan.pressure - 0.08, 0, 1);
  }
  // Hurt and desperate, or hurt and surviving, depending on temperament.
  if (self.stunnedFor > 0) {
    const brave = self.attributes.composure > 70 ? 0 : 0.2;
    plan.pressure = clamp(plan.pressure - 0.3 + brave, 0, 1);
    plan.strikeVolume = clamp(plan.strikeVolume - 0.25 + brave, 0, 1);
  }
}

export interface CornerAdvice {
  /** Machine-readable adjustment, carried on the CORNER_INSTRUCTION event. */
  readonly instruction: string;
  /** What the coach actually says. */
  readonly line: string;
}

/**
 * What the corner tells a fighter between rounds, derived from what actually happened
 * (brief §14). Each instruction modifies the plan; none of them changes an attribute.
 */
export function cornerInstructions(
  self: Combatant,
  opponent: Combatant,
  round: number,
  behindOnScore: boolean,
  rng: Rng,
): CornerAdvice[] {
  const advice: CornerAdvice[] = [];
  const plan = self.plan;
  const stats = self.stats[round - 1];
  const theirStats = opponent.stats[round - 1];

  if (!stats || !theirStats) return advice;

  const push = (instruction: string, line: string) => advice.push({ instruction, line });

  // The opponent's legs are there.
  if (opponent.damage.leadLeg > 25 && plan.targetLegs < 0.4) {
    plan.targetLegs = clamp(plan.targetLegs + 0.2, 0, 0.6);
    normaliseTargeting(plan);
    push('ATTACK_LEAD_LEG', 'That leg is done — keep chopping it.');
  }

  // Head-hunting and missing.
  const accuracy = stats.significantStrikesAttempted > 0
    ? stats.significantStrikesLanded / stats.significantStrikesAttempted
    : 1;
  if (accuracy < 0.32 && stats.significantStrikesAttempted > 8) {
    plan.strikeVolume = clamp(plan.strikeVolume - 0.12, 0, 1);
    push('BEHIND_THE_JAB', 'You are swinging for the fences. Go back to the jab.');
  }

  // Their takedowns are landing.
  if (theirStats.takedownsLanded >= 2) {
    plan.acceptBottom = clamp(plan.acceptBottom - 0.2, 0, 1);
    plan.range = clamp(plan.range + 0.1, 0, 1);
    push('STOP_THE_TAKEDOWN', 'Get off the cage and make them carry your weight.');
  }

  // Ours are landing.
  if (stats.takedownsLanded >= 2 && stats.takedownsAttempted <= stats.takedownsLanded + 1) {
    plan.takedownRate = clamp(plan.takedownRate + 0.12, 0, 1);
    push('KEEP_WRESTLING', 'They cannot stop your takedowns. Go back to it.');
  }

  // Nothing to the body all round.
  if (stats.bodyStrikes === 0 && stats.significantStrikesLanded > 4) {
    plan.targetBody = clamp(plan.targetBody + 0.15, 0, 0.5);
    normaliseTargeting(plan);
    push('ATTACK_THE_BODY', 'Everything is upstairs. Get to the body.');
  }

  // Behind and running out of rounds.
  if (behindOnScore && round >= 2) {
    plan.pressure = clamp(plan.pressure + 0.18, 0, 1);
    plan.urgency = clamp(plan.urgency + 0.2, 0, 1);
    push('NEED_A_FINISH', 'You need this round. Go and take it.');
  }

  // Gassing.
  if (effectiveOutput(self.stamina) < 0.7) {
    plan.pace = clamp(plan.pace - 0.12, 0.1, 1);
    push('MANAGE_PACE', 'Breathe. Pick your moments — do not chase them.');
  }

  // A coach does not deliver six instructions in sixty seconds.
  return rng.shuffle(advice).slice(0, 2);
}
