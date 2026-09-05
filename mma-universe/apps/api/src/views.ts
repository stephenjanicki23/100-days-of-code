/**
 * Read-model projections.
 *
 * The API never returns domain objects directly. Fighters carry hidden state — potential
 * ability, personality, the raw attribute map — and a transport shape that leaks them is a
 * transport shape that cannot later be scoped per user (a manager should see their own
 * fighters' internals, not everyone's). Projecting explicitly also keeps the wire format
 * stable while the domain model keeps moving.
 */

import {
  abilityTier,
  computeFacets,
  currentAbility,
  displayAttribute,
  displayName,
  division,
  fighterAge,
  fighterStyle,
  recordString,
  totalFights,
  ATTRIBUTE_DEFINITIONS,
  campTrainingQuality,
  discipline,
  type Camp,
  type Coach,
  type Fighter,
  type SimDate,
  type Universe,
} from '@mma/sim';

export interface FighterSummary {
  id: string;
  name: string;
  nickname?: string;
  record: string;
  divisionKey: string;
  divisionName: string;
  age: number;
  nationality: string;
  campId?: string;
  campName?: string;
  promotionId?: string;
  currentAbility: number;
  tier: string;
  primaryStyle: string;
  status: string;
  popularity: number;
  rank?: number;
}

export function fighterSummary(universe: Universe, fighter: Fighter): FighterSummary {
  const ability = currentAbility(fighter);
  const camp = fighter.campId ? universe.camp(fighter.campId) : undefined;
  const ranking = universe.state.rankings.find(
    (entry) => entry.fighterId === fighter.id && entry.promotionId === fighter.promotionId,
  );
  return {
    id: fighter.id,
    name: displayName(fighter),
    nickname: fighter.nickname,
    record: recordString(fighter),
    divisionKey: fighter.divisionKey,
    divisionName: division(fighter.divisionKey).name,
    age: fighterAge(fighter, universe.date),
    nationality: fighter.nationality,
    campId: fighter.campId,
    campName: camp?.name,
    promotionId: fighter.promotionId,
    currentAbility: Math.round(ability),
    tier: abilityTier(ability).label,
    primaryStyle: fighterStyle(fighter).primary.label,
    status: fighter.status,
    popularity: Math.round(fighter.career.popularity),
    rank: ranking?.rank,
  };
}

/**
 * The full profile.
 *
 * `potentialAbility` is included because this build has a single omniscient viewer — but it
 * is grouped under `scouting` rather than mixed into the fighter's public data, so hiding it
 * behind a permission check later is a one-line change rather than a reshaping of the
 * response.
 */
export function fighterProfile(universe: Universe, fighter: Fighter) {
  const ability = currentAbility(fighter);
  const style = fighterStyle(fighter);
  const facets = computeFacets(fighter.attributes);
  const camp = fighter.campId ? universe.camp(fighter.campId) : undefined;
  const promotion = fighter.promotionId ? universe.promotion(fighter.promotionId) : undefined;
  const contract = universe.contractFor(fighter.id);

  return {
    ...fighterSummary(universe, fighter),
    firstName: fighter.firstName,
    lastName: fighter.lastName,
    sex: fighter.sex,
    birthDate: fighter.birthDate,
    homeRegion: fighter.homeRegion,
    heightIn: fighter.heightIn,
    reachIn: fighter.reachIn,
    stance: fighter.stance,
    weightLimitLbs: division(fighter.divisionKey).weightLimitLbs,
    totalFights: totalFights(fighter),
    recordDetail: fighter.record,
    career: fighter.career,
    condition: {
      fatigue: Math.round(fighter.condition.fatigue),
      sharpness: Math.round(fighter.condition.sharpness),
      weightManagement: Math.round(fighter.condition.weightManagement),
      wearAndTear: Math.round(fighter.condition.wearAndTear),
      injuries: fighter.condition.injuries
        .filter((injury) => !injury.endDate)
        .map((injury) => ({
          label: injury.label,
          severity: injury.severity,
          region: injury.region,
          expectedReturn: injury.expectedReturn,
        })),
    },
    training: {
      intensity: fighter.training.intensity,
      focus: fighter.training.focus.map((key) => discipline(key).label),
    },
    style: {
      primary: style.primary.label,
      secondary: style.secondary.label,
      description: style.primary.description,
      strength: style.strength,
      weakness: style.weakness,
      signature: style.signatureSkill,
      tendencies: style.tendencies,
    },
    facets: Object.fromEntries(Object.entries(facets).map(([key, value]) => [key, Math.round(value)])),
    attributes: ATTRIBUTE_DEFINITIONS.map((definition) => ({
      key: definition.key,
      label: definition.label,
      group: definition.group,
      value: displayAttribute(fighter.attributes[definition.key]),
    })),
    scouting: {
      currentAbility: Math.round(ability),
      potentialAbility: Math.round(fighter.potentialAbility),
      fulfilment: Number((ability / fighter.potentialAbility).toFixed(3)),
      seedArchetype: fighter.seedArchetype,
    },
    camp: camp ? { id: camp.id, name: camp.name, reputation: Math.round(camp.reputation) } : undefined,
    promotion: promotion ? { id: promotion.id, name: promotion.name, shortName: promotion.shortName } : undefined,
    contract: contract
      ? {
          fightsRemaining: contract.fightsRemaining,
          fightsTotal: contract.fightsTotal,
          expiresDate: contract.expiresDate,
          baseShow: contract.baseShow,
          winBonus: contract.winBonus,
        }
      : undefined,
  };
}

export function campSummary(universe: Universe, camp: Camp) {
  const roster = universe.campFighters(camp.id).filter((fighter) => fighter.status !== 'retired');
  const abilities = roster.map(currentAbility).sort((a, b) => b - a);
  return {
    id: camp.id,
    name: camp.name,
    city: camp.city,
    country: camp.country,
    region: camp.region,
    foundedYear: camp.foundedYear,
    reputation: Math.round(camp.reputation),
    peakReputation: Math.round(camp.peakReputation),
    status: camp.status,
    capacity: camp.capacity,
    rosterSize: roster.length,
    bestFighterAbility: Math.round(abilities[0] ?? 0),
    trainingQuality: Math.round(campTrainingQuality(camp)),
    specialisations: camp.specialisations.map((specialisation) => ({
      discipline: discipline(specialisation.disciplineKey).label,
      disciplineKey: specialisation.disciplineKey,
      tier: specialisation.tier,
      multiplier: specialisation.multiplier,
      bonusPercent: Math.round((specialisation.multiplier - 1) * 1000) / 10,
    })),
  };
}

export function campProfile(universe: Universe, camp: Camp) {
  const coaches = universe.campCoaches(camp.id);
  const roster = universe.campFighters(camp.id).filter((fighter) => fighter.status !== 'retired');
  return {
    ...campSummary(universe, camp),
    facilities: camp.facilities,
    culture: camp.culture,
    history: camp.history,
    headCoachId: camp.headCoachId,
    coaches: coaches.map((coach: Coach) => ({
      id: coach.id,
      name: `${coach.firstName} ${coach.lastName}`,
      role: coach.role,
      discipline: discipline(coach.disciplineKey).label,
      ability: Math.round(coach.ability),
      manManagement: Math.round(coach.manManagement),
      reputation: Math.round(coach.reputation),
    })),
    roster: roster
      .sort((a, b) => currentAbility(b) - currentAbility(a))
      .map((fighter) => fighterSummary(universe, fighter)),
  };
}

export function rankingView(universe: Universe, promotionId: string, divisionKey: string) {
  const definition = division(divisionKey);
  return {
    divisionKey,
    divisionName: definition.name,
    weightLimitLbs: definition.weightLimitLbs,
    sex: definition.sex,
    promotionId,
    updated: universe.date as SimDate,
    entries: universe.rankingsFor(promotionId, divisionKey).map((entry) => {
      const fighter = universe.requireFighter(entry.fighterId);
      return {
        rank: entry.rank,
        previousRank: entry.previousRank,
        points: entry.points,
        movement:
          entry.previousRank === undefined ? 0 : entry.previousRank - entry.rank,
        fighter: fighterSummary(universe, fighter),
      };
    }),
  };
}
