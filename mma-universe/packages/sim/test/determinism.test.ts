import { describe, expect, it } from 'vitest';
import { advanceUniverse, currentAbility, generateUniverse, type Universe } from '@mma/sim';

/** A compact fingerprint of everything a replay must reproduce. */
function fingerprint(universe: Universe): string {
  const fighters = universe.state.fighters
    .map((fighter) =>
      [
        fighter.id,
        fighter.firstName,
        fighter.lastName,
        fighter.divisionKey,
        fighter.campId ?? '-',
        fighter.promotionId ?? '-',
        fighter.status,
        currentAbility(fighter).toFixed(6),
        fighter.potentialAbility.toFixed(3),
        fighter.condition.fatigue.toFixed(6),
        fighter.condition.injuries.length,
        fighter.record.wins,
      ].join(':'),
    )
    .join('|');
  const camps = universe.state.camps
    .map((camp) => `${camp.id}:${camp.name}:${camp.reputation.toFixed(6)}:${camp.status}`)
    .join('|');
  const rankings = universe.state.rankings
    .map((entry) => `${entry.divisionKey}:${entry.rank}:${entry.fighterId}:${entry.points.toFixed(3)}`)
    .join('|');
  return `${universe.date}#${fighters}#${camps}#${rankings}`;
}

describe('deterministic simulation (brief §31)', () => {
  it('generates an identical universe from an identical seed', () => {
    const config = { seed: '8347291', fighterCount: 140, campCount: 16 };
    expect(fingerprint(generateUniverse(config))).toBe(fingerprint(generateUniverse(config)));
  });

  it('generates a different universe from a different seed', () => {
    const a = generateUniverse({ seed: 'seed-a', fighterCount: 140, campCount: 16 });
    const b = generateUniverse({ seed: 'seed-b', fighterCount: 140, campCount: 16 });
    expect(fingerprint(a)).not.toBe(fingerprint(b));
  });

  it('reproduces a simulated year exactly', () => {
    const config = { seed: 'replay-me', fighterCount: 120, campCount: 14 };
    const first = generateUniverse(config);
    const second = generateUniverse(config);
    advanceUniverse(first, 365, { snapshotEveryDays: 0 });
    advanceUniverse(second, 365, { snapshotEveryDays: 0 });
    expect(fingerprint(first)).toBe(fingerprint(second));
  });

  it('reaches the same state whether advanced in one step or many', () => {
    // Systems are addressed by date and entity rather than by call order, so the size of the
    // step the user takes must not change the world they get.
    const config = { seed: 'step-size', fighterCount: 110, campCount: 12 };
    const oneStep = generateUniverse(config);
    const manySteps = generateUniverse(config);

    advanceUniverse(oneStep, 180, { snapshotEveryDays: 0 });
    for (let i = 0; i < 180; i++) advanceUniverse(manySteps, 1, { snapshotEveryDays: 0 });

    expect(fingerprint(manySteps)).toBe(fingerprint(oneStep));
  });

  it('records the same domain events in the same order', () => {
    const config = { seed: 'events-match', fighterCount: 120, campCount: 12 };
    const a = generateUniverse(config);
    const b = generateUniverse(config);
    advanceUniverse(a, 200, { snapshotEveryDays: 0 });
    advanceUniverse(b, 200, { snapshotEveryDays: 0 });
    expect(a.state.events.map((event) => `${event.date}:${event.type}:${event.subjectId}`)).toEqual(
      b.state.events.map((event) => `${event.date}:${event.type}:${event.subjectId}`),
    );
  });
});
