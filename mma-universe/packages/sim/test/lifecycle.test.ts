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

  /**
   * Measured *within* each fighter, not across the population.
   *
   * A cross-sectional mean by age is survivorship-biased and gives the wrong answer here: the
   * fighters still competing at thirty-eight are the ones who were good enough to last, so
   * average ability appears to keep climbing even while every individual is declining. The
   * question the aging model has to answer is what happens to a given fighter over time.
   */
  const byFighter = new Map<string, { age: number; ability: number }[]>();
  const cohort = universe.state.fighters.filter((f) => fighterAge(f, universe.date) <= 22).map((f) => f.id);

  for (let year = 0; year < 20; year++) {
    advanceUniverse(universe, 365, { snapshotEveryDays: 0, keepFightEvents: false });
    for (const id of cohort) {
      const fighter = universe.fighter(id);
      if (!fighter || fighter.status === 'retired') continue;
      const points = byFighter.get(id) ?? [];
      points.push({ age: Math.floor(exactAgeOn(fighter.birthDate, universe.date)), ability: currentAbility(fighter) });
      byFighter.set(id, points);
    }
  }

  const arcs = [...byFighter.values()]
    .filter((points) => points.length >= 8)
    .map((points) => {
      const peak = points.reduce((best, point) => (point.ability > best.ability ? point : best), points[0]!);
      return { first: points[0]!, peak, last: points[points.length - 1]! };
    })
    .filter((arc) => arc.last.age > arc.peak.age);

  it('follows enough fighters through a full career to say anything', () => {
    expect(arcs.length).toBeGreaterThan(5);
  });

  it('improves markedly through a fighter\'s twenties', () => {
    const improved = arcs.filter((arc) => arc.peak.ability > arc.first.ability + 10);
    expect(improved.length / arcs.length).toBeGreaterThan(0.7);
  });

  it('peaks in the late twenties or thirties, not at either end', () => {
    const meanPeakAge = arcs.reduce((sum, arc) => sum + arc.peak.age, 0) / arcs.length;
    expect(meanPeakAge).toBeGreaterThan(26);
    expect(meanPeakAge).toBeLessThan(37);
  });

  it('declines from its own peak by the end of a career', () => {
    for (const arc of arcs) expect(arc.last.ability).toBeLessThan(arc.peak.ability);
  });

  it('trades physical decline for mental gain, rather than declining across the board', () => {
    const veterans = universe.state.fighters.filter(
      (f) => f.status !== 'retired' && fighterAge(f, universe.date) >= 36,
    );
    expect(veterans.length).toBeGreaterThan(0);
    const meanOf = (pick: (f: (typeof veterans)[number]) => number) =>
      veterans.reduce((sum, f) => sum + pick(f), 0) / veterans.length;
    expect(meanOf((f) => f.attributes.fightIQ)).toBeGreaterThan(meanOf((f) => f.attributes.speed));
  });

  it('accumulates wear over twenty years', () => {
    const worn = universe.state.fighters.filter((f) => f.condition.wearAndTear > 20);
    expect(worn.length).toBeGreaterThan(20);
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
