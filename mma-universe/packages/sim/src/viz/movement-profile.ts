/**
 * How a particular fighter moves (brief §8, §17).
 *
 * The event contract says what happened and never how to draw it, which is what lets one
 * stream feed a text feed, a statistics panel and two renderers. But "every fighter moves
 * identically" is its own kind of wrong, and fixing it needs the renderer to know something
 * about *who* is fighting, not just what they did.
 *
 * This is that, kept honest in two ways. It is a separate block from the event stream rather
 * than a field smuggled onto events — a profile is a property of a person, not of a moment.
 * And it is a *projection*, not an attribute dump: the renderer is told how much someone
 * presses forward, not what their aggression rating is. The simulation's attribute model stays
 * private, exactly as Current Ability does, and the renderer cannot start making fight
 * decisions with data it was handed for animation.
 */

import type { AttributeSet } from '../domain/attributes.ts';
import type { Fighter } from '../domain/fighter.ts';
import { deriveStyle } from '../domain/archetypes.ts';

export interface MovementProfile {
  readonly fighterId: string;
  /** Forward pressure: how much distance they close, and how little they pause. */
  readonly pressure: number;
  /** Lateral movement, angle changes, and how smoothly the stance resets. */
  readonly mobility: number;
  /** How quickly they gather themselves after committing to something. */
  readonly recovery: number;
  /** How well the movement holds up late in a fight. */
  readonly engine: number;
  /** How high and how tight the hands sit. */
  readonly guard: number;
  /** How often they sell something they are not actually throwing. */
  readonly deception: number;
  /**
   * Where they want the fight to happen: 0 is inside the pocket, 1 is at the end of a long
   * guard. This is the difference between a brawler who plants in the middle and dares you to
   * trade, and a karate fighter who lives on the outside and will not be pinned to the fence.
   *
   * Taken from the style the simulation already derives, rather than invented for the
   * renderer: the fight engine consumes the same tendency when it decides what to throw.
   */
  readonly reach: number;
  /**
   * How hard they push the fight forward, blending the temperament in their attributes with
   * the habits of their style. A pressure boxer and a counter striker with identical
   * aggression ratings should still walk each other down very differently.
   */
  /**
   * A per-fighter, per-fight phase offset, so no two fighters move on the same clock and the
   * same fighter does not move identically in every fight. Derived, never rolled: the same
   * fight replays the same way (brief §17).
   */
  readonly phase: number;
}

/** Attributes run to 200; this maps the useful middle of that range onto 0 to 1. */
function norm(value: number): number {
  return Math.max(0, Math.min(1, (value - 50) / 110));
}

function mix(attributes: AttributeSet, parts: readonly [keyof AttributeSet, number][]): number {
  let total = 0;
  let weight = 0;
  for (const [key, share] of parts) {
    total += norm(attributes[key]) * share;
    weight += share;
  }
  return weight > 0 ? total / weight : 0.5;
}

/** A small, stable hash — the same string always gives the same phase. */
function phaseOf(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) / 4294967296) * Math.PI * 2;
}

/**
 * Projects a fighter into the handful of numbers a renderer can actually use.
 *
 * `fightId` enters only the phase, so a fighter's character is constant across their career
 * while their exact footwork rhythm differs from night to night.
 */
export function movementProfile(fighter: Fighter, fightId: string): MovementProfile {
  const a = fighter.attributes;
  const style = deriveStyle(fighter.attributes).tendencies;
  const temperament = mix(a, [
    ['aggression', 0.6],
    ['pressureManagement', 0.2],
    ['explosiveness', 0.2],
  ]);
  return {
    fighterId: fighter.id,
    // Half who they are, half how they fight. A counter striker's style pulls them back off
    // the gas however aggressive their temperament reads on paper.
    pressure: Math.max(0, Math.min(1, temperament * 0.5 + style.pressure * 0.5 - style.counterRate * 0.15)),
    reach: Math.max(0, Math.min(1, style.range)),
    mobility: mix(a, [
      ['footwork', 0.6],
      ['agility', 0.25],
      ['speed', 0.15],
    ]),
    recovery: mix(a, [
      ['balance', 0.5],
      ['composure', 0.3],
      ['recovery', 0.2],
    ]),
    engine: mix(a, [['cardio', 1]]),
    guard: mix(a, [
      ['strikingDefense', 0.6],
      ['composure', 0.4],
    ]),
    deception: mix(a, [
      ['fightIQ', 0.5],
      ['decisionMaking', 0.3],
      ['adaptability', 0.2],
    ]),
    phase: phaseOf(`${fighter.id}:${fightId}`),
  };
}
