/**
 * The movement profile, checked against the roster it actually describes.
 *
 * Every trait here except `reach` comes from attributes through one shared normalisation, and
 * that normalisation was written for a 0-to-200 attribute scale the generator does not
 * produce. Against the real range — roughly 1 to 98, centred near 47 — it clamped the median
 * fighter to zero on mobility, guard, engine and deception, so most of the roster never
 * circled, never raised their hands, never tired and never feinted. Like the reaction
 * thresholds before it, nothing errored: there was simply an absence.
 *
 * So these tests do not assert particular numbers. They assert that the projection still
 * spreads a real population across its declared range, and that the styles separate the way a
 * viewer would expect them to — which is the thing that silently stopped being true.
 */

import { describe, expect, it } from 'vitest';
import { fighterStyle, generateUniverse, movementProfile } from '../src/index.ts';
import type { MovementProfile } from '../src/index.ts';

const universe = generateUniverse({ seed: 'movement-calibration' });
const roster = universe.state.fighters.filter((fighter) => fighter.status === 'active');
const profiles = roster.map((fighter) => movementProfile(fighter, 'calibration'));

/** Traits the whole population is projected onto, so all of them have to spread. */
const TRAITS = ['pressure', 'mobility', 'recovery', 'engine', 'guard', 'deception', 'reach'] as const;

function column(trait: (typeof TRAITS)[number]): number[] {
  return profiles.map((profile) => profile[trait]).sort((a, b) => a - b);
}

function percentile(sorted: readonly number[], fraction: number): number {
  return sorted[Math.floor(fraction * (sorted.length - 1))]!;
}

function meanFor(style: string, trait: keyof MovementProfile): number {
  const matching = roster
    .map((fighter, index) => [fighter, profiles[index]!] as const)
    .filter(([fighter]) => fighterStyle(fighter).primary.label === style)
    .map(([, profile]) => profile[trait] as number);
  expect(matching.length, `no ${style} on the roster`).toBeGreaterThan(8);
  return matching.reduce((total, value) => total + value, 0) / matching.length;
}

describe('the movement profile describes the roster it was given', () => {
  it('has a big enough roster to say anything about', () => {
    expect(roster.length).toBeGreaterThan(200);
  });

  for (const trait of TRAITS) {
    it(`spreads ${trait} across the population rather than piling it on a bound`, () => {
      const sorted = column(trait);
      // The typical fighter is somewhere in the middle of the range, not sitting on an end.
      expect(percentile(sorted, 0.5)).toBeGreaterThan(0.25);
      expect(percentile(sorted, 0.5)).toBeLessThan(0.75);
      // And the population is wide: the top of the roster is clearly separated from the bottom.
      expect(percentile(sorted, 0.95) - percentile(sorted, 0.05)).toBeGreaterThan(0.3);
    });
  }

  it('keeps every trait inside the zero-to-one range it promises', () => {
    for (const trait of TRAITS) {
      const sorted = column(trait);
      expect(sorted[0]!).toBeGreaterThanOrEqual(0);
      expect(sorted[sorted.length - 1]!).toBeLessThanOrEqual(1);
    }
  });
});

describe('styles separate the way a viewer would expect', () => {
  it('sends a brawler forward and holds a karate fighter back', () => {
    // The scenario the cage-control layer exists to draw: one man wants the middle, the other
    // wants the outside, and the gap between them has to be big enough to move the fight.
    expect(meanFor('Brawler', 'pressure') - meanFor('Karate Counter Fighter', 'pressure'))
      .toBeGreaterThan(0.25);
  });

  it('puts the karate fighter at the end of his range and the brawler in the pocket', () => {
    expect(meanFor('Karate Counter Fighter', 'reach') - meanFor('Brawler', 'reach'))
      .toBeGreaterThan(0.4);
  });

  it('gives the out-fighter the feet to get off the fence', () => {
    expect(meanFor('Out-Fighter', 'mobility')).toBeGreaterThan(meanFor('Clinch Specialist', 'mobility'));
  });

  it('still separates pressure fighters from grapplers', () => {
    expect(meanFor('Pressure Boxer', 'pressure'))
      .toBeGreaterThan(meanFor('BJJ Submission Specialist', 'pressure'));
  });
});
