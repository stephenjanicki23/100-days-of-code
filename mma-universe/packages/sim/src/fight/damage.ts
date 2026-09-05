/**
 * The damage model (Sprint 7, brief §20).
 *
 * Damage is tracked by region because different damage does different things, and those
 * differences are what make fights tell a story. A chopped lead leg is not "20 hit points" —
 * it is a fighter who stops circling, stops kicking, and gets taken down.
 *
 * Every value is 0-100 accumulated damage to that area.
 */

import { clamp, remap } from '../core/math.ts';

export interface DamageState {
  head: number;
  face: number;
  body: number;
  leadLeg: number;
  rearLeg: number;
  leadArm: number;
  rearArm: number;
  /** Number of open cuts; each one bleeds into the doctor's decision. */
  cuts: number;
  /** Accumulated concussive load, distinct from surface head damage. Drives the KO check. */
  concussive: number;
}

export function createDamageState(): DamageState {
  return { head: 0, face: 0, body: 0, leadLeg: 0, rearLeg: 0, leadArm: 0, rearArm: 0, cuts: 0, concussive: 0 };
}

export interface DamagePenalties {
  /** Multiplier on striking power — hurt hands and shoulders. */
  strikingPower: number;
  /** Multiplier on anything requiring the arms: grappling, defence, framing. */
  armFunction: number;
  /** Multiplier on movement, kicking and wrestling — the lead-leg effect. */
  legFunction: number;
  /** Multiplier on the gas tank — body work takes the wind out of a fighter. */
  cardio: number;
  /** Multiplier on reaction and defensive ability — accumulated head trauma. */
  reaction: number;
}

export function damagePenalties(damage: DamageState): DamagePenalties {
  const legDamage = Math.max(damage.leadLeg, damage.rearLeg * 0.6);
  const armDamage = Math.max(damage.leadArm, damage.rearArm);
  return {
    strikingPower: remap(damage.rearArm, 0, 100, 1, 0.72),
    armFunction: remap(armDamage, 0, 100, 1, 0.7),
    legFunction: remap(legDamage, 0, 100, 1, 0.6),
    cardio: remap(damage.body, 0, 100, 1, 0.68),
    reaction: remap(damage.concussive, 0, 100, 1, 0.6),
  };
}

export type DamageTarget = 'HEAD' | 'BODY' | 'LEG' | 'ARM';

/** Applies a strike's damage to the right places. */
export function applyStrikeDamage(
  damage: DamageState,
  target: DamageTarget,
  amount: number,
  isLeadSide: boolean,
): void {
  switch (target) {
    case 'HEAD':
      damage.head = clamp(damage.head + amount, 0, 100);
      damage.face = clamp(damage.face + amount * 0.8, 0, 100);
      // Only part of a head strike's damage is concussive; a cut face is not a concussion.
      damage.concussive = clamp(damage.concussive + amount * 0.75, 0, 100);
      break;
    case 'BODY':
      damage.body = clamp(damage.body + amount, 0, 100);
      break;
    case 'LEG':
      if (isLeadSide) damage.leadLeg = clamp(damage.leadLeg + amount, 0, 100);
      else damage.rearLeg = clamp(damage.rearLeg + amount, 0, 100);
      break;
    case 'ARM':
      if (isLeadSide) damage.leadArm = clamp(damage.leadArm + amount, 0, 100);
      else damage.rearArm = clamp(damage.rearArm + amount, 0, 100);
      break;
  }
}

/** Between rounds a fighter recovers a little — but concussive damage does not clear. */
export function recoverDamageBetweenRounds(damage: DamageState): void {
  damage.head = clamp(damage.head * 0.9, 0, 100);
  damage.body = clamp(damage.body * 0.88, 0, 100);
  damage.leadLeg = clamp(damage.leadLeg * 0.96, 0, 100);
  damage.rearLeg = clamp(damage.rearLeg * 0.96, 0, 100);
  damage.leadArm = clamp(damage.leadArm * 0.93, 0, 100);
  damage.rearArm = clamp(damage.rearArm * 0.93, 0, 100);
  // Face swelling and cuts get worse, not better.
  damage.face = clamp(damage.face * 1.02, 0, 100);
  damage.concussive = clamp(damage.concussive * 0.985, 0, 100);
}

/** Total accumulated damage, for judging and for the UI's damage bar. */
export function totalDamage(damage: DamageState): number {
  return clamp(
    damage.head * 0.3 + damage.body * 0.2 + damage.leadLeg * 0.15 + damage.rearLeg * 0.08 +
      damage.leadArm * 0.07 + damage.rearArm * 0.07 + damage.concussive * 0.13,
    0,
    100,
  );
}

/** Whether a doctor would be taking a serious look at this. */
export function needsDoctor(damage: DamageState): boolean {
  return damage.cuts >= 3 || (damage.cuts >= 1 && damage.face > 78);
}

/** A short description of the worst visible damage, for commentary. */
export function damageDescription(damage: DamageState): string | undefined {
  const worst: [string, number][] = [
    ['badly marked up', damage.face],
    ['hurt to the body', damage.body],
    ['limping on the lead leg', damage.leadLeg],
  ];
  const [label, value] = worst.sort((a, b) => b[1] - a[1])[0]!;
  return value > 45 ? label : undefined;
}
