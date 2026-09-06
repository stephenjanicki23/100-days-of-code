/**
 * Procedural fighter generation (brief §3, §36, §37).
 *
 * The hard requirement is believability: "do NOT make everyone equally talented" (§36) and
 * "avoid obvious game-like behaviour" (§37). Three things do most of the work here.
 *
 * 1. Talent is drawn from a long-tailed *mixture* of populations, not one bell curve, so the
 *    world contains a handful of genuine generational talents and a long tail of limited
 *    regional fighters.
 * 2. How much of that talent a fighter has *realised* depends on their age and their
 *    personality, so two fighters with identical potential can be a champion and a
 *    journeyman — which is the entire premise of §4.
 * 3. Records are produced by simulating a plausible fight *sequence* rather than by picking
 *    a win total, so streaks, finish rates and momentum are mutually consistent.
 */

import { Rng } from '../core/rng.ts';
import { addDays, type SimDate, ageOn } from '../core/time.ts';
import { clamp, lerp, round } from '../core/math.ts';
import { ATTRIBUTE_KEYS, type AttributeKey } from '../domain/attributes.ts';
import { buildPersonality, type Personality } from '../domain/personality.ts';
import { division, type DivisionDefinition } from '../domain/divisions.ts';
import { ARCHETYPES, archetype, type ArchetypeDefinition } from '../domain/archetypes.ts';
import { DISCIPLINES, disciplineEmphasis } from '../domain/disciplines.ts';
import { fitAttributesToAbility, type AttributeOffsets } from '../ability/fitting.ts';
import { computeCurrentAbility } from '../ability/ability.ts';
import {
  type Fighter,
  type FighterRecord,
  type Stance,
} from '../domain/fighter.ts';
import { NATIONALITIES, NICKNAMES, type NationalityProfile } from './names.ts';

export interface FighterGenerationOptions {
  readonly id: string;
  readonly date: SimDate;
  readonly divisionKey: string;
  readonly campId?: string;
  readonly promotionId?: string;
  /** Forces a talent band, used to guarantee the world has champions and prospects. */
  readonly talentFloor?: number;
  readonly talentCeiling?: number;
  /** Forces an age band, used when seeding a specific career stage. */
  readonly ageRange?: readonly [number, number];
  /**
   * Full names already in use. A world with two Loïc Marchands produces headlines like
   * "Marchand beats Marchand", and a reader cannot tell the fighters apart.
   */
  readonly takenNames?: ReadonlySet<string>;
  /**
   * Minimum fraction of potential this fighter has realised. Champions are not merely
   * talented — they are talented people who arrived. Used when seeding the top of a
   * division so the world opens with credible titleholders.
   */
  readonly realisationFloor?: number;
}

/* ------------------------------------------------------------------ talent */

/**
 * A mixture of five talent populations. A single normal distribution produces a world where
 * everybody is roughly average and nobody is special; the mixture produces the shape a real
 * roster has — a very thin elite, a broad middle, and a long tail.
 */
function drawPotential(rng: Rng): number {
  const roll = rng.next();
  if (roll < 0.02) return rng.clampedNormal(190, 6, 176, 200); // generational
  if (roll < 0.1) return rng.clampedNormal(174, 7, 158, 192); // elite
  if (roll < 0.32) return rng.clampedNormal(154, 9, 132, 176); // legitimate contender ceiling
  if (roll < 0.66) return rng.clampedNormal(130, 10, 108, 155); // solid professional
  return rng.clampedNormal(104, 13, 60, 132); // regional
}

/** Age curve for how much of a ceiling a fighter has realised, peaking in the early thirties. */
const REALISATION_CURVE: readonly (readonly [number, number])[] = [
  [18, 0.32],
  [21, 0.5],
  [24, 0.68],
  [27, 0.83],
  [30, 0.92],
  [33, 0.93],
  [36, 0.86],
  [39, 0.77],
  [43, 0.64],
];

function realisationAtAge(age: number): number {
  const first = REALISATION_CURVE[0]!;
  const last = REALISATION_CURVE[REALISATION_CURVE.length - 1]!;
  if (age <= first[0]) return first[1];
  if (age >= last[0]) return last[1];
  for (let i = 1; i < REALISATION_CURVE.length; i++) {
    const [prevAge, prevValue] = REALISATION_CURVE[i - 1]!;
    const [nextAge, nextValue] = REALISATION_CURVE[i]!;
    if (age <= nextAge) return lerp(prevValue, nextValue, (age - prevAge) / (nextAge - prevAge));
  }
  return last[1];
}

/**
 * How well a fighter's personality converts potential into ability. This is what makes two
 * identical prospects diverge: the diligent one arrives, the talented waster does not.
 */
function personalityRealisationFactor(personality: Personality, rng: Rng): number {
  const professional = (personality.workEthic * 0.4 + personality.discipline * 0.35 + personality.coachability * 0.25) / 100;
  // Even a model professional gets injured and badly coached sometimes, and even a waster
  // occasionally lands somewhere that fixes them — hence the noise term.
  return clamp(0.78 + professional * 0.3 + rng.normal(0, 0.05), 0.6, 1.08);
}

/* ------------------------------------------------- shape (archetype + origin) */

/**
 * How naturally an archetype grows out of a discipline, computed from data rather than
 * hand-maintained: the overlap between the archetype's positive attribute offsets and the
 * attributes that discipline trains.
 */
function archetypeAffinity(definition: ArchetypeDefinition, disciplineKey: string): number {
  let overlap = 0;
  for (const [key, offset] of Object.entries(definition.offsets) as [AttributeKey, number][]) {
    if (offset <= 0) continue;
    overlap += offset * disciplineEmphasis(disciplineKey, key);
  }
  return overlap;
}

/** Picks an archetype, weighted toward the disciplines the fighter's country produces. */
function pickArchetype(rng: Rng, origin: NationalityProfile): ArchetypeDefinition {
  const entries = ARCHETYPES.map((definition) => {
    let affinity = 0;
    for (const disciplineKey of origin.disciplineBias) {
      affinity = Math.max(affinity, archetypeAffinity(definition, disciplineKey));
    }
    // The floor keeps every archetype reachable everywhere — national trends are tendencies,
    // not rules, and a Dutch jiu-jitsu specialist should be possible, just uncommon.
    return [definition, 1 + affinity * 0.22] as const;
  });
  return rng.pickWeighted(entries);
}

/** Archetype offsets plus per-fighter variation, so no two fighters of a style are identical. */
function buildOffsets(rng: Rng, definition: ArchetypeDefinition, origin: NationalityProfile): AttributeOffsets {
  const offsets: Partial<Record<AttributeKey, number>> = {};
  for (const key of ATTRIBUTE_KEYS) {
    const archetypeOffset = definition.offsets[key] ?? 0;
    // Individual variation is deliberately large relative to the archetype offsets: it is what
    // stops a style from becoming a stat block.
    offsets[key] = archetypeOffset + rng.normal(0, 8.5);
  }
  // A national background leaves a mark on the specific arts a fighter came up through.
  for (const disciplineKey of origin.disciplineBias) {
    for (const key of ATTRIBUTE_KEYS) {
      const emphasis = disciplineEmphasis(disciplineKey, key);
      if (emphasis > 0) offsets[key] = (offsets[key] ?? 0) + emphasis * rng.float(1.5, 6);
    }
  }
  return offsets;
}

/* ---------------------------------------------------------------- personality */

function generatePersonality(rng: Rng): Personality {
  // A "professionalism" latent variable correlates the traits that plainly travel together;
  // drawing all eleven independently produces incoherent people.
  const professionalism = rng.clampedNormal(52, 17, 5, 95);
  const draw = (base: number, correlation: number, spread: number) =>
    Math.round(clamp(lerp(rng.clampedNormal(base, spread, 1, 100), professionalism, correlation), 1, 100));

  return buildPersonality((key) => {
    switch (key) {
      case 'workEthic': return draw(55, 0.6, 18);
      case 'discipline': return draw(54, 0.55, 18);
      case 'coachability': return draw(55, 0.4, 19);
      case 'ambition': return draw(58, 0.25, 19);
      case 'loyalty': return draw(55, 0.15, 21);
      case 'composure': return draw(53, 0.2, 18);
      case 'adaptability': return draw(52, 0.25, 18);
      case 'confidence': return draw(58, 0.1, 18);
      // Ego pulls against professionalism rather than with it.
      case 'ego': return Math.round(clamp(rng.clampedNormal(52, 19, 1, 100) - (professionalism - 52) * 0.25, 1, 100));
      case 'aggression': return Math.round(rng.clampedNormal(55, 19, 1, 100));
      case 'riskTolerance': return Math.round(rng.clampedNormal(53, 19, 1, 100));
      default: return Math.round(rng.clampedNormal(52, 18, 1, 100));
    }
  });
}

/* -------------------------------------------------------------------- record */

interface GeneratedHistory {
  record: FighterRecord;
  proFights: number;
  momentum: number;
}

/**
 * Builds a record by simulating the *sequence* of a career rather than sampling a win total.
 * The sequence is what makes streaks, finish splits and momentum agree with one another —
 * a fighter cannot end up 18-2 with a five-fight losing streak.
 */
function generateHistory(
  rng: Rng,
  currentAbility: number,
  proFights: number,
  style: ArchetypeDefinition,
): GeneratedHistory {
  const record: FighterRecord = {
    wins: 0, losses: 0, draws: 0, noContests: 0,
    koWins: 0, submissionWins: 0, decisionWins: 0,
    koLosses: 0, submissionLosses: 0, decisionLosses: 0,
    winStreak: 0, lossStreak: 0,
  };

  // Matchmaking pairs like with like, so even an elite fighter faces difficult opposition;
  // win rate therefore compresses well short of certainty.
  const baseWinRate = clamp(0.34 + 0.52 * ((currentAbility - 60) / 140) ** 1.1, 0.25, 0.88);
  const winRate = clamp(baseWinRate + rng.normal(0, 0.05), 0.2, 0.92);

  // A fighter's own finishing profile follows from their style.
  const koLean = clamp(0.2 + style.tendencies.strikeVolume * 0.3 + (style.offsets.strikingPower ?? 0) / 90, 0.08, 0.62);
  const subLean = clamp(0.06 + style.tendencies.submissionSeeking * 0.45, 0.04, 0.5);

  const sequence: ('win' | 'loss' | 'draw' | 'nc')[] = [];
  for (let i = 0; i < proFights; i++) {
    const roll = rng.next();
    if (roll < 0.018) {
      record.draws++;
      sequence.push('draw');
    } else if (roll < 0.028) {
      record.noContests++;
      sequence.push('nc');
    } else if (rng.bool(winRate)) {
      record.wins++;
      sequence.push('win');
      const method = rng.next();
      if (method < koLean) record.koWins++;
      else if (method < koLean + subLean) record.submissionWins++;
      else record.decisionWins++;
    } else {
      record.losses++;
      sequence.push('loss');
      const method = rng.next();
      // Fighters are finished in the ways their style is vulnerable to — a defensive
      // technician mostly loses decisions, a brawler mostly gets knocked out.
      const koVulnerability = clamp(0.32 - (style.offsets.strikingDefense ?? 0) / 120 + (style.offsets.aggression ?? 0) / 140, 0.08, 0.6);
      const subVulnerability = clamp(0.14 - (style.offsets.submissionDefense ?? 0) / 110 + (style.offsets.guardGame ?? 0) / -260, 0.03, 0.35);
      if (method < koVulnerability) record.koLosses++;
      else if (method < koVulnerability + subVulnerability) record.submissionLosses++;
      else record.decisionLosses++;
    }
  }

  for (let i = sequence.length - 1; i >= 0; i--) {
    if (sequence[i] === 'win') record.winStreak++;
    else break;
  }
  for (let i = sequence.length - 1; i >= 0; i--) {
    if (sequence[i] === 'loss') record.lossStreak++;
    else break;
  }

  const recent = sequence.slice(-5);
  const momentum = clamp(
    recent.reduce((total, result) => total + (result === 'win' ? 22 : result === 'loss' ? -24 : -2), 0),
    -100,
    100,
  );

  return { record, proFights, momentum };
}

/* ----------------------------------------------------------------- generator */

function pickStance(rng: Rng): Stance {
  return rng.pickWeighted([
    ['orthodox' as const, 0.77],
    ['southpaw' as const, 0.19],
    ['switch' as const, 0.04],
  ]);
}

function pickPhysique(rng: Rng, def: DivisionDefinition): { heightIn: number; reachIn: number } {
  const [minHeight, maxHeight] = def.heightRangeIn;
  const heightIn = round(rng.clampedNormal((minHeight + maxHeight) / 2, (maxHeight - minHeight) / 4.2, minHeight - 1, maxHeight + 1), 1);
  const reachIn = round(heightIn + def.reachBiasIn + rng.normal(0, 1.9), 1);
  return { heightIn, reachIn };
}

/** Training focus follows from the fighter's style: the disciplines that build their game. */
function pickTrainingFocus(definition: ArchetypeDefinition, rng: Rng): string[] {
  const ranked = DISCIPLINES.map((d) => [d.key, archetypeAffinity(definition, d.key)] as const)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key]) => key);
  // Most fighters drill their strengths; a self-aware minority work on holes instead.
  if (rng.bool(0.25)) {
    const weakest = DISCIPLINES.map((d) => [d.key, archetypeAffinity(definition, d.key)] as const)
      .sort((a, b) => a[1] - b[1])[0]?.[0];
    if (weakest) return [ranked[0]!, weakest].filter(Boolean);
  }
  return ranked.slice(0, 2);
}

export function generateFighter(seedRng: Rng, options: FighterGenerationOptions): Fighter {
  const rng = seedRng.derive(options.id);
  const divisionDef = division(options.divisionKey);

  const origin = rng.pickWeighted(NATIONALITIES.map((n) => [n, n.weight] as const));
  const sex = divisionDef.sex;
  const firstNames = sex === 'male' ? origin.maleFirst : origin.femaleFirst;

  const [minAge, maxAge] = options.ageRange ?? [19, 40];
  // Ages cluster in the mid-to-late twenties; the tails are thin but real.
  const age = Math.round(clamp(rng.clampedNormal(28.5, 4.6, minAge, maxAge), minAge, maxAge));
  const birthDate = addDays(options.date, -Math.round(age * 365.2425 + rng.int(0, 364)));

  const personality = generatePersonality(rng);

  let potentialAbility = drawPotential(rng);
  if (options.talentFloor !== undefined) potentialAbility = Math.max(potentialAbility, options.talentFloor);
  if (options.talentCeiling !== undefined) potentialAbility = Math.min(potentialAbility, options.talentCeiling);
  potentialAbility = round(clamp(potentialAbility, 40, 200), 1);

  const realisation = clamp(
    Math.max(
      realisationAtAge(age) * personalityRealisationFactor(personality, rng),
      options.realisationFloor ?? 0,
    ),
    0.22,
    0.99,
  );
  const targetAbility = clamp(potentialAbility * realisation, 25, potentialAbility);

  const styleDefinition = pickArchetype(rng, origin);
  const offsets = buildOffsets(rng, styleDefinition, origin);
  const { attributes } = fitAttributesToAbility(targetAbility, offsets);
  const ability = computeCurrentAbility(attributes);

  // Debut no later than a fighter's mid-twenties, and always at least a year before the
  // present: a twenty-six-year-old contender with no professional fights is not credible.
  const debutAge = rng.int(19, clamp(age - 1, 19, 24));
  const yearsPro = Math.max(0, age - debutAge);
  // Better fighters fight less often: longer camps, harder opposition, more lay-offs.
  const fightsPerYear = clamp(rng.float(1.5, 2.7) - (ability - 110) / 260, 0.9, 2.8);
  const proFights = Math.max(0, Math.round(yearsPro * fightsPerYear));
  const { record, momentum } = generateHistory(rng, ability, proFights, styleDefinition);

  const { heightIn, reachIn } = pickPhysique(rng, divisionDef);

  // Fame is correlated with ability and results but has its own heavy tail: some fighters
  // are far more famous than they are good, and a few elite fighters draw nobody.
  const starQuality = rng.clampedNormal(0, 14, -30, 45);
  const popularity = round(
    clamp(
      (ability - 60) * 0.4 + record.winStreak * 2.4 + record.wins * 0.35 + starQuality,
      1,
      100,
    ),
    1,
  );
  const reputation = round(clamp((ability - 55) * 0.52 + record.wins * 0.45 + rng.normal(0, 6), 1, 100), 1);

  const lastFightOffset = proFights === 0 ? undefined : rng.int(20, 430);
  const daysSinceLastFight = lastFightOffset ?? 999;

  // Draw a name that nobody else in the world already has.
  let firstName = rng.pick(firstNames);
  let lastName = rng.pick(origin.last);
  if (options.takenNames) {
    for (let attempt = 0; attempt < 50 && options.takenNames.has(`${firstName} ${lastName}`); attempt++) {
      firstName = rng.pick(firstNames);
      lastName = rng.pick(origin.last);
    }
  }

  const fighter: Fighter = {
    id: options.id,
    firstName,
    lastName,
    nickname: rng.bool(0.42) ? rng.pick(NICKNAMES) : undefined,
    sex,
    birthDate,
    nationality: origin.code,
    homeRegion: rng.pick(origin.regions),
    heightIn,
    reachIn,
    stance: pickStance(rng),
    divisionKey: options.divisionKey,
    campId: options.campId,
    promotionId: options.promotionId,

    attributes,
    personality,
    potentialAbility,
    seedArchetype: styleDefinition.key,

    record,
    career: {
      debutDate: addDays(birthDate, Math.round(debutAge * 365.2425)),
      amateurFights: rng.int(0, 14),
      careerEarnings: Math.round(record.wins * rng.float(14_000, 46_000) + proFights * rng.float(8_000, 26_000)),
      popularity,
      reputation,
      momentum: Math.round(momentum),
      lastFightDate: lastFightOffset === undefined ? undefined : addDays(options.date, -lastFightOffset),
      titleReigns: 0,
      titleDefenses: 0,
    },
    condition: {
      fatigue: round(rng.float(4, 34), 1),
      // Sharpness erodes with time out of the cage — a two-year lay-off shows.
      sharpness: round(clamp(92 - daysSinceLastFight / 9 + rng.normal(0, 6), 20, 100), 1),
      weightManagement: round(rng.clampedNormal(64, 16, 15, 98), 1),
      wearAndTear: round(clamp(proFights * rng.float(0.5, 1.6) + Math.max(0, age - 30) * rng.float(0.6, 1.9), 0, 100), 1),
      injuries: [],
    },
    training: {
      intensity: rng.pickWeighted([
        ['recovery' as const, 0.05],
        ['light' as const, 0.12],
        ['moderate' as const, 0.42],
        ['hard' as const, 0.33],
        ['extreme' as const, 0.08],
      ]),
      focus: pickTrainingFocus(styleDefinition, rng),
    },
    memories: [],
    status: 'active',
  };

  return fighter;
}

/** Convenience for tests and tooling: the archetype a fighter was seeded from. */
export function seedArchetypeOf(fighter: Fighter): ArchetypeDefinition {
  return archetype(fighter.seedArchetype);
}

/** Age helper that does not require importing the time module at call sites. */
export function ageOfFighter(fighter: Fighter, onDate: SimDate): number {
  return ageOn(fighter.birthDate, onDate);
}
