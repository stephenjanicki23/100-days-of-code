/**
 * Reaction thresholds, checked against what the engine actually emits.
 *
 * The mapper decides how hard a strike looked from its damage value. That only works if the
 * thresholds match the scale the fight engine produces — and for a long time they did not: they
 * were set at 3 and 8 against a scale that tops out around 2.5, so every cleanly landed strike
 * mapped to `NONE` and the fighters took nothing all fight. Nothing errored; there was simply
 * an absence.
 *
 * These tests are the guard against that happening again, in either direction.
 */

import { describe, expect, it } from 'vitest';
import {
  Rng,
  generateUniverse,
  mapEventToAnimation,
  simulateFight,
  type FightEvent,
} from '../src/index.ts';

const universe = generateUniverse({ seed: 'reaction-calibration' });

/** A few fights, so the spread is not a quirk of one pairing. */
function sample(): FightEvent[] {
  const events: FightEvent[] = [];
  for (let index = 0; index < 6; index++) {
    const a = universe.state.fighters[10 + index * 2]!;
    const b = universe.state.fighters[11 + index * 2]!;
    const seed = `calibration_${index}`;
    events.push(...simulateFight(a, b, { fightId: seed, rounds: 3 }, Rng.fromSeed(seed)).events);
  }
  return events;
}

const events = sample();
const landed = events.filter(
  (event) =>
    (event.eventType === 'SIGNIFICANT_STRIKE' || event.eventType === 'STRIKE') &&
    'result' in event &&
    event.result === 'LANDED',
);

function share(target: string, reaction: string): number {
  const hits = landed.filter((event) => 'target' in event && event.target === target);
  if (hits.length === 0) return 0;
  return hits.filter((event) => mapEventToAnimation(event).reaction === reaction).length / hits.length;
}

describe('reaction thresholds match the engine damage scale', () => {
  it('produces landed strikes to every region worth reacting to', () => {
    for (const target of ['HEAD', 'BODY', 'LEG']) {
      const hits = landed.filter((event) => 'target' in event && event.target === target);
      expect(hits.length, `no landed strikes to the ${target}`).toBeGreaterThan(5);
    }
  });

  it('does not leave cleanly landed strikes with no reaction at all', () => {
    const nothing = landed.filter((event) => mapEventToAnimation(event).reaction === 'NONE').length;
    // A glancing shot may register as nothing; most of them must not.
    expect(nothing / landed.length, 'landed strikes producing no reaction').toBeLessThan(0.4);
  });

  it('keeps the heaviest head reactions rare rather than constant', () => {
    const heavy = share('HEAD', 'HEAVY');
    expect(heavy, 'HEAVY head reactions').toBeGreaterThan(0.02);
    expect(heavy, 'HEAVY head reactions').toBeLessThan(0.35);
  });

  it('reacts to the body and the legs in their own way', () => {
    expect(share('BODY', 'BODY_FOLD'), 'body folds').toBeGreaterThan(0.05);
    expect(share('LEG', 'LEG_BUCKLE'), 'leg buckles').toBeGreaterThan(0.05);
    // And never confuses the two.
    expect(share('HEAD', 'BODY_FOLD')).toBe(0);
    expect(share('HEAD', 'LEG_BUCKLE')).toBe(0);
  });

  it('cuts to the impact camera sometimes, but not constantly', () => {
    // This carried the same broken threshold as the reactions, so the impact camera and the
    // replay trigger had never once fired on a real fight.
    const decisive = landed.filter((event) => mapEventToAnimation(event).camera === 'IMPACT').length;
    expect(decisive, 'impact cuts').toBeGreaterThan(0);
    expect(decisive / landed.length, 'share of landed strikes cutting to impact').toBeLessThan(0.3);
  });

  it('still blocks, slips and sprawls where the event says so', () => {
    const kinds = new Set(events.map((event) => mapEventToAnimation(event).reaction));
    for (const expected of ['BLOCK', 'SLIP', 'NONE']) {
      expect(kinds.has(expected as never), expected).toBe(true);
    }
  });
});
