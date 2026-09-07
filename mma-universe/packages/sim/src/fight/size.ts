/**
 * Size, and why it beats skill.
 *
 * Current Ability is normalised *within* a division — a flyweight champion and a heavyweight
 * champion are both around 190, because each is measured against his own weight class. That
 * is correct for ranking and matchmaking and catastrophic for a fight, because the engine
 * resolved every contest on ability alone and never once looked at how big anyone was.
 *
 * Measured before this module existed: a women's strawweight champion beat a mid-tier male
 * heavyweight in 98 of 100 fights, and a flyweight champion beat a heavyweight in 99. The
 * fighters were not wrong; the engine simply had no term for a hundred and forty pounds.
 *
 * Everything here keys off the ratio of fighting weights, so two fighters in the same division
 * produce a ratio of exactly one and nothing changes for the overwhelming majority of bouts.
 * The modifiers only wake up for a cross-division fight, which is what they are for.
 */

import { division } from '../domain/divisions.ts';
import type { Fighter } from '../domain/fighter.ts';

/**
 * What a fighter weighs on fight night, in pounds.
 *
 * The division limit rather than anything per-fighter: it is the number the fight is actually
 * contracted at, and it keeps every fighter in a division identical so that same-division
 * bouts are provably unaffected by any of this.
 */
export function fightingWeight(fighter: Fighter): number {
  return division(fighter.divisionKey).weightLimitLbs;
}

/**
 * How much harder the heavier fighter hits, as a multiplier on damage.
 *
 * Punching force scales close to linearly with mass at the same technique, and the damage a
 * body absorbs scales inversely with its own mass, so the two compound. A heavyweight hitting
 * a flyweight lands about 1.9x; the flyweight hitting back lands about 0.5x. That four-to-one
 * swing is roughly the difference the sport's own weight classes exist to prevent.
 */
export function powerRatio(attackerWeight: number, defenderWeight: number): number {
  return (attackerWeight / defenderWeight) ** 0.92;
}

/**
 * How much more easily the heavier fighter puts the lighter one down.
 *
 * Steeper than damage, because a knockdown is about whether the head is accelerated past what
 * the neck can hold rather than about cumulative punishment, and mass decides that more
 * sharply than it decides anything else.
 */
export function knockdownRatio(attackerWeight: number, defenderWeight: number): number {
  return (attackerWeight / defenderWeight) ** 1.35;
}

/**
 * Ability points added to a grappling contest for being the bigger fighter.
 *
 * Grappling is where size is least forgiving — a skilled small man can strike with a big one
 * at range for a while and cannot be underneath him at all. Expressed in ability points so it
 * enters `contest` on the same scale as everything else: a two-to-one weight advantage is
 * worth about seventy points, which is the gap between a journeyman and a champion.
 */
export function grapplingEdge(attackerWeight: number, defenderWeight: number): number {
  return Math.log2(attackerWeight / defenderWeight) * 132;
}

/**
 * Ability points added to a striking contest for being the bigger fighter.
 *
 * Not because a heavier fighter is more accurate — he is not. This corrects the fact that the
 * ratings themselves are not comparable across divisions. A flyweight champion's striking
 * defence of 190 means "elite among flyweights", and against a heavyweight it was being read
 * as "elite in absolute terms", so the bigger man landed four per cent of what he threw and
 * lost a decision to a man he outweighs by a hundred and forty pounds.
 *
 * Smaller than the grappling edge, because range and footwork genuinely do let a smaller
 * fighter avoid a bigger one for a while — which is not true at all once they are tied up.
 */
export function strikingEdge(attackerWeight: number, defenderWeight: number): number {
  return Math.log2(attackerWeight / defenderWeight) * 112;
}

/**
 * Extra stamina drain on the smaller fighter, as a multiplier.
 *
 * Carrying, framing against and being leaned on by someone much heavier is exhausting in a
 * way that no attribute captures. Only ever a penalty on the smaller man; the bigger one is
 * unaffected.
 */
export function burdenRatio(ownWeight: number, opponentWeight: number): number {
  return opponentWeight <= ownWeight ? 1 : (opponentWeight / ownWeight) ** 0.55;
}
