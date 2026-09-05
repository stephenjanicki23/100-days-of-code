import { describe, expect, it } from 'vitest';
import {
  DIVISIONS,
  abilityTier,
  currentAbility,
  deriveStyle,
  division,
  fighterAge,
  generateUniverse,
  totalFights,
  type Universe,
} from '@mma/sim';

let universe: Universe;
function world(): Universe {
  universe ??= generateUniverse({ seed: 'distribution-check' });
  return universe;
}

describe('initial universe (brief §36)', () => {
  it('meets the brief\'s minimum scale', () => {
    const state = world().state;
    expect(state.fighters.length).toBeGreaterThanOrEqual(500);
    expect(state.camps.length).toBeGreaterThanOrEqual(50);
    expect(DIVISIONS.length).toBeGreaterThanOrEqual(10);
  });

  it('creates one major promotion, two regionals and several smaller circuits', () => {
    const promotions = world().state.promotions;
    expect(promotions.filter((p) => p.tier === 'global')).toHaveLength(1);
    expect(promotions.filter((p) => p.tier === 'regional')).toHaveLength(2);
    expect(promotions.filter((p) => p.tier === 'developmental').length).toBeGreaterThanOrEqual(3);
  });

  it('crowns a champion in every division the major promotion runs', () => {
    const state = world().state;
    const promotion = state.promotions[0]!;
    for (const divisionKey of promotion.divisionKeys) {
      const champion = state.rankings.find(
        (entry) => entry.promotionId === promotion.id && entry.divisionKey === divisionKey && entry.rank === 0,
      );
      expect(champion, `no champion for ${divisionKey}`).toBeDefined();
    }
  });

  it('gives every fighter a camp and a plausible physique', () => {
    for (const fighter of world().state.fighters) {
      expect(fighter.campId).toBeDefined();
      const definition = division(fighter.divisionKey);
      expect(fighter.heightIn).toBeGreaterThan(definition.heightRangeIn[0] - 3);
      expect(fighter.heightIn).toBeLessThan(definition.heightRangeIn[1] + 3);
      expect(fighter.reachIn).toBeGreaterThan(fighter.heightIn - 8);
      expect(fighter.reachIn).toBeLessThan(fighter.heightIn + 10);
    }
  });
});

describe('talent distribution (brief §36, §37)', () => {
  it('is not flat — most fighters are ordinary and a few are exceptional', () => {
    const abilities = world().state.fighters.map(currentAbility).sort((a, b) => a - b);
    const median = abilities[Math.floor(abilities.length / 2)]!;
    const p95 = abilities[Math.floor(abilities.length * 0.95)]!;
    const p05 = abilities[Math.floor(abilities.length * 0.05)]!;
    expect(p95 - median).toBeGreaterThan(25);
    expect(median - p05).toBeGreaterThan(20);
  });

  it('produces every career tier the brief asks for', () => {
    const tiers = new Set(world().state.fighters.map((fighter) => abilityTier(currentAbility(fighter)).key));
    for (const expected of ['elite', 'contender', 'ranked', 'gatekeeper', 'journeyman', 'regional']) {
      expect(tiers, `missing tier ${expected}`).toContain(expected);
    }
  });

  it('keeps current ability at or below potential for every fighter', () => {
    for (const fighter of world().state.fighters) {
      expect(currentAbility(fighter)).toBeLessThanOrEqual(fighter.potentialAbility + 1);
    }
  });

  it('holds unrealised potential — prospects who have not arrived yet', () => {
    const prospects = world().state.fighters.filter(
      (fighter) => fighter.potentialAbility - currentAbility(fighter) > 40 && fighterAge(fighter, world().date) <= 24,
    );
    expect(prospects.length).toBeGreaterThan(10);
  });

  it('ages the roster plausibly', () => {
    const ages = world().state.fighters.map((fighter) => fighterAge(fighter, world().date));
    const mean = ages.reduce((sum, age) => sum + age, 0) / ages.length;
    expect(mean).toBeGreaterThan(25);
    expect(mean).toBeLessThan(32);
    expect(Math.min(...ages)).toBeGreaterThanOrEqual(18);
    expect(Math.max(...ages)).toBeLessThanOrEqual(45);
  });

  it('gives fighters records consistent with the length of their careers', () => {
    for (const fighter of world().state.fighters) {
      const age = fighterAge(fighter, world().date);
      const yearsPro = Math.max(0, age - 18);
      // Nobody should carry more fights than a plausible career could contain.
      expect(totalFights(fighter)).toBeLessThanOrEqual(yearsPro * 4 + 2);
    }
  });

  it('does not leave ranked fighters without professional experience', () => {
    const state = world().state;
    const promotion = state.promotions[0]!;
    for (const entry of state.rankings.filter((r) => r.promotionId === promotion.id && r.rank <= 5)) {
      expect(totalFights(state.fighters.find((f) => f.id === entry.fighterId)!)).toBeGreaterThan(2);
    }
  });
});

describe('style and camp variety (brief §37)', () => {
  it('produces a spread of fighting styles rather than one dominant archetype', () => {
    const counts = new Map<string, number>();
    for (const fighter of world().state.fighters) {
      const key = deriveStyle(fighter.attributes).primary.key;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    expect(counts.size).toBeGreaterThanOrEqual(12);
    const largest = Math.max(...counts.values());
    expect(largest / world().state.fighters.length).toBeLessThan(0.2);
  });

  it('does not produce identical training camps', () => {
    const camps = world().state.camps;
    const specialisations = new Set(camps.map((camp) => camp.specialisations[0]?.disciplineKey));
    expect(specialisations.size).toBeGreaterThan(6);

    const reputations = camps.map((camp) => camp.reputation);
    expect(Math.max(...reputations) - Math.min(...reputations)).toBeGreaterThan(45);
  });

  it('gives every camp a head coach whose discipline matches its specialism', () => {
    const world_ = world();
    for (const camp of world_.state.camps) {
      const head = camp.headCoachId ? world_.coach(camp.headCoachId) : undefined;
      expect(head, `${camp.name} has no head coach`).toBeDefined();
      expect(head!.disciplineKey).toBe(camp.specialisations[0]!.disciplineKey);
    }
  });

  it('places stronger fighters at stronger camps on average', () => {
    const world_ = world();
    const ranked = [...world_.state.camps].sort((a, b) => b.reputation - a.reputation);
    const bestOf = (camps: typeof ranked) =>
      camps
        .flatMap((camp) => world_.campFighters(camp.id).map(currentAbility))
        .reduce((sum, ability, _, all) => sum + ability / all.length, 0);
    expect(bestOf(ranked.slice(0, 10))).toBeGreaterThan(bestOf(ranked.slice(-10)));
  });

  it('names every camp uniquely', () => {
    const names = world().state.camps.map((camp) => camp.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('generation determinism', () => {
  it('produces identical fighters from the same seed', () => {
    const a = generateUniverse({ seed: 'x', fighterCount: 40, campCount: 6 });
    const b = generateUniverse({ seed: 'x', fighterCount: 40, campCount: 6 });
    expect(a.state.fighters.map((f) => f.attributes)).toEqual(b.state.fighters.map((f) => f.attributes));
    expect(a.state.camps.map((c) => c.name)).toEqual(b.state.camps.map((c) => c.name));
  });
});
