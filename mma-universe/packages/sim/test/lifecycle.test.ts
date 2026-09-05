import { describe, expect, it } from 'vitest';
import {
  Rng,
  advanceUniverse,
  applyChronicCost,
  applyTrainingWeek,
  computeTrainingWeek,
  computeCurrentAbility,
  computeFacets,
  currentAbility,
  createInjury,
  exactAgeOn,
  fighterAge,
  generateCamp,
  generateUniverse,
  type Camp,
  type Fighter,
} from '@mma/sim';

function campWith(reputation: number, specialisation: string, multiplier: number): Camp {
  let n = 0;
  const { camp } = generateCamp(Rng.fromSeed(`camp-${specialisation}-${reputation}`), {
    id: `camp_${specialisation}`,
    date: '2026-01-05',
    reputation,
    coachIdFactory: () => `coach_${specialisation}_${++n}`,
  });
  return { ...camp, specialisations: [{ disciplineKey: specialisation, tier: 1, multiplier }] };
}

/**
 * Sprint 4's definition of done, stated as an experiment: hold the fighter constant and vary
 * only the camp. Any difference in the outcome is attributable to the camp alone.
 */
describe('Sprint 4 — camps change how a fighter develops', () => {
  it('develops two identical fighters differently at different camps', () => {
    const universe = generateUniverse({ seed: 'camp-effect', fighterCount: 60, campCount: 8 });
    const template = universe.state.fighters.find((f) => f.potentialAbility - currentAbility(f) > 40)!;

    const eliteWrestling = campWith(92, 'freestyle_wrestling', 1.12);
    const weakGym = campWith(18, 'taekwondo', 1.02);

    // Same fighter, same weeks, same random streams — only the room differs.
    const runAt = (camp: Camp) => {
      const fighter: Fighter = structuredClone(template);
      fighter.training.focus = ['freestyle_wrestling'];
      fighter.condition.fatigue = 10;
      fighter.condition.injuries = [];
      for (let week = 0; week < 104; week++) {
        const rng = Rng.fromSeed('camp-effect-week', fighter.id, week);
        applyTrainingWeek(
          fighter,
          computeTrainingWeek({ fighter, camp, coaches: [], age: 22, rng }),
        );
      }
      return fighter;
    };

    const atElite = runAt(eliteWrestling);
    const atWeak = runAt(weakGym);

    expect(computeCurrentAbility(atElite.attributes)).toBeGreaterThan(computeCurrentAbility(atWeak.attributes));
    // And the difference is *specifically* in what the camp trains, not a flat uplift.
    const eliteWrestlingFacet = computeFacets(atElite.attributes).wrestlingOffense;
    const weakWrestlingFacet = computeFacets(atWeak.attributes).wrestlingOffense;
    expect(eliteWrestlingFacet).toBeGreaterThan(weakWrestlingFacet + 1);
  });
});

/**
 * Sprint 6's definition of done: simulate one fighter from 20 to 40 and check the arc is a
 * career rather than a monotonic line.
 */
describe('Sprint 6 — a career arc from 20 to 40', () => {
  const universe = generateUniverse({ seed: 'career-arc', fighterCount: 200, campCount: 20 });
  const subject = universe.state.fighters
    .filter((f) => fighterAge(f, universe.date) <= 21 && f.potentialAbility >= 160)
    .sort((a, b) => b.potentialAbility - a.potentialAbility)[0]!;

  const track: { age: number; ability: number }[] = [];
  for (let year = 0; year < 20; year++) {
    advanceUniverse(universe, 365, { snapshotEveryDays: 0 });
    track.push({
      age: Math.floor(exactAgeOn(subject.birthDate, universe.date)),
      ability: currentAbility(subject),
    });
  }

  const peak = track.reduce((best, point) => (point.ability > best.ability ? point : best), track[0]!);
  const final = track[track.length - 1]!;
  const early = track.find((point) => point.age >= 23)!;

  it('improves markedly through a fighter\'s twenties', () => {
    expect(peak.ability).toBeGreaterThan(early.ability + 15);
  });

  it('peaks in the late twenties or thirties rather than at either end', () => {
    expect(peak.age).toBeGreaterThanOrEqual(26);
    expect(peak.age).toBeLessThanOrEqual(36);
  });

  it('declines from the peak by the end of the career', () => {
    expect(final.ability).toBeLessThan(peak.ability);
  });

  it('trades physical decline for mental gain, rather than declining across the board', () => {
    // The point of the differentiated aging curves: an old fighter is slower but sharper.
    const facets = computeFacets(subject.attributes);
    expect(facets.mental).toBeGreaterThan(0);
    expect(subject.attributes.fightIQ).toBeGreaterThan(subject.attributes.speed * 0.6);
  });

  it('accumulates wear over twenty years', () => {
    expect(subject.condition.wearAndTear).toBeGreaterThan(0);
  });
});

describe('Sprint 6 — chronic injuries', () => {
  it('turns a repeatedly injured area into a permanent problem', () => {
    const universe = generateUniverse({ seed: 'chronic', fighterCount: 30, campCount: 4 });
    const fighter = universe.state.fighters[0]!;
    const rng = Rng.fromSeed('chronic-test');

    let chronic;
    for (let attempt = 0; attempt < 12 && !chronic; attempt++) {
      const injury = createInjury(
        rng,
        { fighter, age: 30, date: '2026-01-05', cause: 'training', idFactory: () => `injury_${attempt}` },
        'moderate',
      );
      // Force every injury into the same region so the threshold is reached deterministically.
      const kneeInjury = { ...injury, region: 'knee' as const, recurrence: attempt, chronic: attempt + 1 >= 3 };
      fighter.condition.injuries.push(kneeInjury);
      if (kneeInjury.chronic) chronic = kneeInjury;
    }

    expect(chronic).toBeDefined();
    const before = fighter.attributes.agility;
    applyChronicCost(fighter, chronic!);
    expect(fighter.attributes.agility).toBeLessThan(before);
  });

  it('leaves an ordinary injury with no permanent cost', () => {
    const universe = generateUniverse({ seed: 'acute', fighterCount: 20, campCount: 3 });
    const fighter = universe.state.fighters[0]!;
    const before = { ...fighter.attributes };
    applyChronicCost(fighter, {
      id: 'i1', fighterId: fighter.id, label: 'a knee injury', region: 'knee', severity: 'minor',
      startDate: '2026-01-05', expectedReturn: '2026-02-05', cause: 'training', recurrence: 0, chronic: false,
    });
    expect(fighter.attributes).toEqual(before);
  });
});
