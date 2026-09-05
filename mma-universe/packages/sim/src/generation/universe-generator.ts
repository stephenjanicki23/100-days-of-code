/**
 * Initial universe generation (brief §36).
 *
 * Generating a believable world is not the same as generating a lot of entities. Three
 * things are done deliberately here:
 *
 *  - Fighters are distributed across divisions by *population weight*, so lightweight and
 *    welterweight are deep and women's featherweight is thin, as in the real sport.
 *  - Camps are assigned by mutual fit — strong fighters gravitate to strong rooms, subject
 *    to capacity — rather than uniformly at random, which is what produces the reputation
 *    gradient the development system then feeds on.
 *  - Promotion rosters are stratified by ability, so the major promotion holds the best
 *    fighters and the regional circuit holds everyone else, with some noise so the world
 *    contains both undiscovered talent and fighters signed above their level.
 */

import { Rng } from '../core/rng.ts';
import type { SimDate } from '../core/time.ts';
import { addDays, yearOf } from '../core/time.ts';
import { clamp, remap, round } from '../core/math.ts';
import { DIVISIONS } from '../domain/divisions.ts';
import { currentAbility, type Fighter } from '../domain/fighter.ts';
import type { Camp, Coach } from '../domain/camp.ts';
import type { Contract, Promotion } from '../domain/promotion.ts';
import { Universe, type UniverseState } from '../universe/universe.ts';
import { buildAllRankings } from '../promotion/rankings.ts';
import { generateFighter } from './fighter-generator.ts';
import { generateCamp } from './camp-generator.ts';

export interface UniverseGenerationConfig {
  readonly seed: string;
  readonly startDate?: SimDate;
  readonly fighterCount?: number;
  readonly campCount?: number;
}

const DEFAULTS = {
  startDate: '2026-01-05' as SimDate,
  fighterCount: 560,
  campCount: 54,
};

interface PromotionBlueprint {
  name: string;
  shortName: string;
  tier: Promotion['tier'];
  country: string;
  prestige: number;
  /** Fraction of the signed population this promotion carries. */
  rosterShare: number;
  ranksPerDivision: number;
  divisionKeys?: string[];
}

/**
 * A major promotion, two regionals and three smaller circuits (§36). Every name here is
 * invented for this project.
 */
const PROMOTION_BLUEPRINTS: readonly PromotionBlueprint[] = [
  { name: 'Apex Fighting Championship', shortName: 'AFC', tier: 'global', country: 'USA', prestige: 96, rosterShare: 0.4, ranksPerDivision: 15 },
  { name: 'Continental Fight League', shortName: 'CFL', tier: 'regional', country: 'NLD', prestige: 68, rosterShare: 0.18, ranksPerDivision: 10 },
  { name: 'Pacific Combat Alliance', shortName: 'PCA', tier: 'regional', country: 'JPN', prestige: 64, rosterShare: 0.16, ranksPerDivision: 10 },
  { name: 'Frontier Cage Series', shortName: 'FCS', tier: 'developmental', country: 'BRA', prestige: 42, rosterShare: 0.1, ranksPerDivision: 5 },
  { name: 'Northern Lights FC', shortName: 'NLF', tier: 'developmental', country: 'CAN', prestige: 38, rosterShare: 0.09, ranksPerDivision: 5 },
  { name: 'Sunbelt Fight Nights', shortName: 'SFN', tier: 'developmental', country: 'MEX', prestige: 34, rosterShare: 0.07, ranksPerDivision: 5 },
];

/** Allocates the fighter population across divisions in proportion to their depth. */
function allocateDivisions(total: number): Map<string, number> {
  const totalWeight = DIVISIONS.reduce((sum, d) => sum + d.populationWeight, 0);
  const allocation = new Map<string, number>();
  let assigned = 0;
  for (const definition of DIVISIONS) {
    const count = Math.floor((definition.populationWeight / totalWeight) * total);
    allocation.set(definition.key, count);
    assigned += count;
  }
  // Hand the rounding remainder to the deepest divisions, where an extra body is invisible.
  const byDepth = [...DIVISIONS].sort((a, b) => b.populationWeight - a.populationWeight);
  let index = 0;
  while (assigned < total) {
    const definition = byDepth[index % byDepth.length]!;
    allocation.set(definition.key, (allocation.get(definition.key) ?? 0) + 1);
    assigned++;
    index++;
  }
  return allocation;
}

/**
 * Camps are spread across the reputation range with a long tail: a handful of famous
 * super-camps, a solid middle, and many small regional gyms.
 *
 * The curve is chosen so the *median* camp sits around 40 reputation, because that is where
 * the median fighter's demand sits (see `assignCamps`). An earlier curve clustered camps in
 * the seventies, which left ordinary fighters with no well-matched room and pushed the
 * overflow into elite gyms — inverting the talent gradient the whole development system
 * depends on. `test/generation.test.ts` pins the gradient.
 */
function campReputationFor(rng: Rng, index: number, total: number): number {
  const percentile = index / Math.max(1, total - 1);
  const base = 20 + 75 * (1 - percentile) ** 1.8;
  return round(clamp(base + rng.normal(0, 5), 8, 97), 1);
}

/**
 * The standard a camp holds prospective fighters to.
 *
 * This is what makes camp assignment two-sided rather than a preference ranking: an elite
 * room does not take a regional journeyman just because it has mat space. Without an
 * acceptance floor, the sheer number of ordinary fighters overwhelms the small elite and the
 * best gyms end up with the *lowest* average roster — inverting the talent gradient the
 * development system is built on.
 */
export function acceptanceFloor(reputation: number): number {
  // The curve is convex on purpose. Selectivity should bite hard only near the top: an
  // ordinary gym takes almost anyone who walks in, while a world-renowned camp turns away
  // everyone short of a contender. A linear floor made mid-table camps unreasonably picky,
  // which left debutants and declining veterans with nowhere at all to train.
  const t = clamp((reputation - 3) / 94, 0, 1);
  return 20 + 148 * t ** 1.9;
}

/**
 * Assigns fighters to camps by mutual fit.
 *
 * Fighters are placed best-first and prefer the strongest room that will have them, tempered
 * by nationality, available space and a deliberate amount of noise — an undiscovered
 * prospect at a small gym is one of the more interesting things a universe can contain.
 */
function assignCamps(rng: Rng, fighters: readonly Fighter[], camps: readonly Camp[]): void {
  const remainingCapacity = new Map(camps.map((c) => [c.id, c.capacity]));
  const byAbility = [...fighters].sort((a, b) => currentAbility(b) - currentAbility(a));
  const lowestStandard = [...camps].sort((a, b) => a.reputation - b.reputation);

  for (const fighter of byAbility) {
    const ability = currentAbility(fighter);
    const choiceRng = rng.derive('camp-assignment', fighter.id);

    const accepting = camps.filter((camp) => ability >= acceptanceFloor(camp.reputation));
    const withRoom = accepting.filter((camp) => (remainingCapacity.get(camp.id) ?? 0) > 0);

    // A camp's standard is never waived to fill it. An elite room that cannot find enough
    // fighters of its calibre stays half-empty — which is exactly what selectivity means, and
    // what keeps the talent gradient pointing the right way.
    const camp =
      withRoom.length > 0
        ? choiceRng.pickWeighted(
            withRoom.map((candidate) => {
              // Among rooms that will have them, fighters lean toward the strongest.
              const ambition = (candidate.reputation / 100) ** 1.6;
              const nationalityBonus = candidate.country === fighter.nationality ? 2.2 : 1;
              const space = (remainingCapacity.get(candidate.id) ?? 0) / Math.max(1, candidate.capacity);
              return [candidate, Math.max(0.02, ambition) * nationalityBonus * (0.4 + space)] as const;
            }),
          )
        : // Nowhere suitable has space, so the least crowded gym that would still take them
          // squeezes one more onto the mats. Spreading the overflow matters: sending every
          // unplaced fighter to a single "least selective" camp produced a gym holding
          // eighty-eight fighters against a capacity of seven, whose top five then read as
          // an elite roster and inflated its reputation to the top of the world.
          ([...accepting].sort(
            (a, b) =>
              (a.capacity - (remainingCapacity.get(a.id) ?? 0)) / a.capacity -
                (b.capacity - (remainingCapacity.get(b.id) ?? 0)) / b.capacity ||
              a.reputation - b.reputation,
          )[0] ?? lowestStandard[0]);
    if (!camp) continue;

    fighter.campId = camp.id;
    remainingCapacity.set(camp.id, (remainingCapacity.get(camp.id) ?? 1) - 1);
  }
}

/** Signs fighters to promotions, best first, with enough noise to misplace a few. */
function assignPromotions(
  rng: Rng,
  fighters: readonly Fighter[],
  promotions: readonly Promotion[],
  date: SimDate,
  nextContractId: () => string,
): Contract[] {
  const contracts: Contract[] = [];
  const ordered = [...promotions].sort((a, b) => b.prestige - a.prestige);

  // Scouting is imperfect: rank fighters by ability plus noise, so a few very good fighters
  // are still on the regional circuit and a few limited ones got a big contract.
  const ranked = [...fighters]
    .map((fighter) => ({
      fighter,
      score: currentAbility(fighter) + rng.derive('scouting', fighter.id).normal(0, 16) + fighter.career.popularity * 0.25,
    }))
    .sort((a, b) => b.score - a.score);

  const byDivision = new Map<string, typeof ranked>();
  for (const entry of ranked) {
    const list = byDivision.get(entry.fighter.divisionKey);
    if (list) list.push(entry);
    else byDivision.set(entry.fighter.divisionKey, [entry]);
  }

  for (const [divisionKey, entries] of byDivision) {
    let cursor = 0;
    for (const promotion of ordered) {
      if (!promotion.divisionKeys.includes(divisionKey)) continue;
      const take = Math.round(entries.length * promotion.rosterShare);
      for (let i = 0; i < take && cursor < entries.length; i++, cursor++) {
        const { fighter } = entries[cursor]!;
        fighter.promotionId = promotion.id;
        const contractRng = rng.derive('contract', fighter.id);
        // Purses scale steeply with promotion prestige and fighter fame.
        const baseShow = Math.round(
          remap(promotion.prestige, 30, 96, 4_000, 42_000) * (1 + fighter.career.popularity / 120) * contractRng.float(0.85, 1.25),
        );
        contracts.push({
          id: nextContractId(),
          fighterId: fighter.id,
          promotionId: promotion.id,
          signedDate: addDays(date, -contractRng.int(30, 900)),
          fightsTotal: contractRng.pickWeighted([[3, 0.2], [4, 0.45], [6, 0.25], [8, 0.1]]),
          fightsRemaining: 0, // filled below
          expiresDate: addDays(date, contractRng.int(180, 1_100)),
          baseShow,
          winBonus: baseShow,
          ppvPoints: promotion.tier === 'global' && fighter.career.popularity > 78 ? contractRng.float(0.2, 1.2) : 0,
          status: 'active',
        });
        const contract = contracts[contracts.length - 1]!;
        contract.fightsRemaining = contractRng.int(1, contract.fightsTotal);
      }
    }
  }

  return contracts;
}

export function generateUniverse(config: UniverseGenerationConfig): Universe {
  const startDate = config.startDate ?? DEFAULTS.startDate;
  const fighterCount = config.fighterCount ?? DEFAULTS.fighterCount;
  const campCount = config.campCount ?? DEFAULTS.campCount;

  const state: UniverseState = {
    seed: config.seed,
    startDate,
    currentDate: startDate,
    promotions: [],
    camps: [],
    coaches: [],
    fighters: [],
    contracts: [],
    rankings: [],
    events: [],
    targetPopulation: fighterCount,
    idCounters: {},
  };
  const universe = new Universe(state);

  // --- promotions ------------------------------------------------------------------
  const promotionRng = universe.rngFor('genesis', 'promotions');
  for (const blueprint of PROMOTION_BLUEPRINTS) {
    const id = universe.nextId('promotion');
    const promotion: Promotion = {
      id,
      name: blueprint.name,
      shortName: blueprint.shortName,
      tier: blueprint.tier,
      country: blueprint.country,
      foundedYear: yearOf(startDate) - promotionRng.int(4, 32),
      prestige: blueprint.prestige,
      // Smaller promotions do not run every division; the thinnest ones are dropped first.
      divisionKeys: DIVISIONS.filter(
        (d) => blueprint.tier === 'global' || d.populationWeight >= (blueprint.tier === 'regional' ? 0.3 : 0.4),
      ).map((d) => d.key),
      ranksPerDivision: blueprint.ranksPerDivision,
      rosterShare: blueprint.rosterShare,
    };
    state.promotions.push(promotion);
  }

  // --- camps -----------------------------------------------------------------------
  const campRng = universe.rngFor('genesis', 'camps');
  const takenNames = new Set<string>();
  for (let i = 0; i < campCount; i++) {
    const id = universe.nextId('camp');
    const { camp, coaches } = generateCamp(campRng, {
      id,
      date: startDate,
      reputation: campReputationFor(campRng.derive('reputation', i), i, campCount),
      coachIdFactory: () => universe.nextId('coach'),
      takenNames,
    });
    takenNames.add(camp.name);
    state.camps.push(camp);
    state.coaches.push(...(coaches as Coach[]));
  }

  // --- fighters --------------------------------------------------------------------
  const fighterRng = universe.rngFor('genesis', 'fighters');
  const allocation = allocateDivisions(fighterCount);
  for (const [divisionKey, count] of allocation) {
    for (let i = 0; i < count; i++) {
      const id = universe.nextId('fighter');
      state.fighters.push(generateFighter(fighterRng, { id, date: startDate, divisionKey }));
    }
  }

  // A world with no champions and no prospects is a flat world. Guarantee a thin layer of
  // exceptional talent per division rather than trusting the tail of the distribution.
  const eliteRng = universe.rngFor('genesis', 'elite');
  for (const definition of DIVISIONS) {
    const eliteCount = definition.populationWeight >= 1 ? 3 : definition.populationWeight >= 0.5 ? 2 : 1;
    for (let i = 0; i < eliteCount; i++) {
      const id = universe.nextId('fighter');
      state.fighters.push(
        generateFighter(eliteRng, {
          id,
          date: startDate,
          divisionKey: definition.key,
          talentFloor: 184,
          ageRange: [26, 34],
          realisationFloor: 0.9,
        }),
      );
    }
    // …and a couple of genuine prospects with a ceiling they have not reached yet.
    for (let i = 0; i < 2; i++) {
      const id = universe.nextId('fighter');
      state.fighters.push(
        generateFighter(eliteRng, {
          id,
          date: startDate,
          divisionKey: definition.key,
          talentFloor: 172,
          ageRange: [19, 23],
          realisationFloor: 0.45,
        }),
      );
    }
  }

  universe.reindex();

  // --- assignment ------------------------------------------------------------------
  assignCamps(universe.rngFor('genesis', 'camp-assignment'), state.fighters, state.camps);
  state.contracts = assignPromotions(
    universe.rngFor('genesis', 'promotion-assignment'),
    state.fighters,
    state.promotions,
    startDate,
    () => universe.nextId('contract'),
  );

  // --- rankings --------------------------------------------------------------------
  state.rankings = buildAllRankings(state.promotions, state.fighters, startDate);

  // Champions carry a reign into the world's opening day, so the sport has a history.
  const championRng = universe.rngFor('genesis', 'champions');
  for (const entry of state.rankings) {
    if (entry.rank !== 0) continue;
    const champion = universe.fighter(entry.fighterId);
    if (!champion) continue;
    champion.career.titleReigns = 1;
    champion.career.titleDefenses = championRng.derive(champion.id).pickWeighted([[0, 0.34], [1, 0.3], [2, 0.2], [3, 0.11], [4, 0.05]]);
  }

  // Recruitment tracks the roster that actually exists, including the guaranteed elite and
  // prospect injections, so retirements start being replaced immediately.
  state.targetPopulation = state.fighters.length;

  universe.reindex();
  universe.record({
    type: 'UNIVERSE_CREATED',
    date: startDate,
    summary: `Universe seeded with ${state.fighters.length} fighters across ${state.camps.length} camps and ${state.promotions.length} promotions.`,
    payload: { seed: config.seed, fighters: state.fighters.length, camps: state.camps.length },
  });

  return universe;
}
