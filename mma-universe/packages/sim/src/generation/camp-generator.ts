/**
 * Camp and coach generation (brief §7, §8, §36).
 *
 * Camps are generated as coherent institutions: reputation drives facilities, facilities and
 * reputation together drive the size of the specialisation bonus a camp can offer, and the
 * coaching staff is built to match the specialisations rather than assigned at random. A
 * world of fifty identically-shaped gyms with different names would fail §37's "identical
 * training camps" test immediately.
 */

import { Rng } from '../core/rng.ts';
import { clamp, remap, round } from '../core/math.ts';
import type { SimDate } from '../core/time.ts';
import { yearOf } from '../core/time.ts';
import { DISCIPLINES, discipline, type DisciplineDefinition } from '../domain/disciplines.ts';
import type { Camp, CampSpecialisation, Coach, CoachRole } from '../domain/camp.ts';
import { NATIONALITIES, CAMP_PREFIXES, CAMP_MIDDLES, CAMP_SUFFIXES, type NationalityProfile } from './names.ts';

export interface CampGenerationOptions {
  readonly id: string;
  readonly date: SimDate;
  /** 0-100 target standing; the universe generator supplies a realistic spread. */
  readonly reputation: number;
  readonly coachIdFactory: () => string;
  /** Names already taken, so the world has no two gyms with the same name. */
  readonly takenNames?: ReadonlySet<string>;
}

export interface GeneratedCamp {
  readonly camp: Camp;
  readonly coaches: Coach[];
}

/**
 * True when a candidate name repeats a word or its stem — "Black Combat Combat Sports",
 * "Sundown Athletic Athletics". Comparing the first five characters catches the
 * singular/plural and adjective/noun pairs that a plain equality check misses.
 */
function repeatsAWord(name: string): boolean {
  const stems = name.toLowerCase().split(' ').map((word) => word.slice(0, 5));
  return new Set(stems).size !== stems.length;
}

function campName(rng: Rng, taken: ReadonlySet<string>): string {
  for (let attempt = 0; attempt < 60; attempt++) {
    const prefix = rng.pick(CAMP_PREFIXES);
    const name = rng.bool(0.55)
      ? `${prefix} ${rng.pick(CAMP_MIDDLES)} ${rng.pick(CAMP_SUFFIXES)}`
      : `${prefix} ${rng.pick(CAMP_SUFFIXES)}`;
    if (!taken.has(name) && !repeatsAWord(name)) return name;
  }
  // Exhausting the combination space is only possible in a very large universe; a numeric
  // suffix is preferable to failing generation outright.
  return `${rng.pick(CAMP_PREFIXES)} ${rng.pick(CAMP_SUFFIXES)} ${rng.int(2, 9)}`;
}

/**
 * Picks specialisations that make sense together. A wrestling room that also happens to be
 * the world's best Muay Thai gym is possible but should be rare, so secondary picks are
 * weighted toward the same family as the primary.
 */
function pickSpecialisations(rng: Rng, reputation: number): CampSpecialisation[] {
  const primaryDefinition = rng.pickWeighted(DISCIPLINES.map((d) => [d, d.prevalence] as const));
  const specialisations: CampSpecialisation[] = [];

  // A camp's headline bonus scales with its standing: an elite room develops a specialism
  // meaningfully faster, a struggling one barely at all.
  const primaryBonus = remap(reputation, 20, 95, 0.035, 0.12) + rng.float(-0.012, 0.012);
  specialisations.push({
    disciplineKey: primaryDefinition.key,
    tier: 1,
    multiplier: round(1 + clamp(primaryBonus, 0.02, 0.14), 3),
  });

  // Secondary specialisms lean toward the primary's own family — a wrestling room adds
  // cage wrestling far more often than it adds taekwondo — and toward common disciplines.
  const relatedWeight = (d: DisciplineDefinition) =>
    d.key === primaryDefinition.key
      ? 0
      : d.prevalence * (d.family === primaryDefinition.family ? 3 : d.family === 'physical' || d.family === 'mental' ? 2 : 1);

  const secondaryDefinition = rng.pickWeighted(DISCIPLINES.map((d) => [d, relatedWeight(d)] as const));
  specialisations.push({
    disciplineKey: secondaryDefinition.key,
    tier: 2,
    multiplier: round(1 + clamp(primaryBonus * rng.float(0.4, 0.65), 0.01, 0.08), 3),
  });

  // Only well-established camps support a third specialism.
  if (reputation > 62 && rng.bool(0.45)) {
    const tertiary = rng.pickWeighted(
      DISCIPLINES.filter((d) => !specialisations.some((s) => s.disciplineKey === d.key)).map((d) => [d, relatedWeight(d)] as const),
    );
    specialisations.push({
      disciplineKey: tertiary.key,
      tier: 3,
      multiplier: round(1 + clamp(primaryBonus * rng.float(0.2, 0.4), 0.01, 0.05), 3),
    });
  }

  return specialisations;
}

const ROLE_DISCIPLINE_FAMILY: Record<Exclude<CoachRole, 'head'>, string[]> = {
  striking: ['boxing', 'muay_thai', 'kickboxing', 'dutch_kickboxing', 'karate', 'taekwondo', 'sanda'],
  wrestling: ['freestyle_wrestling', 'folkstyle_wrestling', 'greco_roman', 'cage_wrestling', 'takedown_defense'],
  grappling: ['bjj', 'submission_grappling', 'judo', 'sambo', 'ground_and_pound', 'positional_escapes'],
  strength: ['strength_conditioning', 'conditioning', 'speed_agility'],
  sports_science: ['sports_science', 'conditioning'],
  medical: ['sports_science'],
};

export function generateCoach(
  rng: Rng,
  options: { id: string; campId?: string; role: CoachRole; disciplineKey: string; quality: number; date: SimDate },
): Coach {
  const origin = rng.pickWeighted(NATIONALITIES.map((n) => [n, n.weight] as const));
  const ability = round(clamp(rng.clampedNormal(options.quality, 9, 20, 99), 20, 99), 1);
  return {
    id: options.id,
    firstName: rng.pick(origin.maleFirst.concat(origin.femaleFirst)),
    lastName: rng.pick(origin.last),
    campId: options.campId,
    role: options.role,
    disciplineKey: options.disciplineKey,
    ability,
    // Technical depth and the ability to get it across are genuinely different skills, so
    // man-management is only loosely correlated with ability.
    manManagement: round(clamp(rng.clampedNormal(ability * 0.55 + 24, 15, 15, 99), 15, 99), 1),
    reputation: round(clamp(ability * 0.7 + rng.normal(10, 12), 5, 99), 1),
    birthYear: yearOf(options.date) - rng.int(31, 64),
    loyalty: Math.round(rng.clampedNormal(58, 20, 5, 98)),
    joinedDate: options.date,
  };
}

export function generateCamp(seedRng: Rng, options: CampGenerationOptions): GeneratedCamp {
  const rng = seedRng.derive(options.id);
  const origin: NationalityProfile = rng.pickWeighted(NATIONALITIES.map((n) => [n, n.weight] as const));
  const reputation = round(clamp(options.reputation, 5, 99), 1);

  const specialisations = pickSpecialisations(rng, reputation);
  const primaryDiscipline = discipline(specialisations[0]!.disciplineKey);

  // Facilities follow reputation, but not rigidly: some well-funded gyms are mediocre rooms
  // and some legendary rooms are held together with tape.
  const facilityBase = remap(reputation, 5, 99, 22, 92);
  const facilities = {
    training: round(clamp(rng.clampedNormal(facilityBase, 9, 10, 99), 10, 99), 1),
    medical: round(clamp(rng.clampedNormal(facilityBase - 6, 12, 5, 99), 5, 99), 1),
    sportsScience: round(clamp(rng.clampedNormal(facilityBase - 10, 14, 5, 99), 5, 99), 1),
    recovery: round(clamp(rng.clampedNormal(facilityBase - 8, 12, 5, 99), 5, 99), 1),
  };

  const culture = {
    discipline: round(clamp(rng.clampedNormal(facilityBase * 0.5 + 30, 14, 10, 99), 10, 99), 1),
    intensity: round(rng.clampedNormal(58, 17, 12, 99), 1),
    cohesion: round(rng.clampedNormal(60, 16, 10, 99), 1),
  };

  const coaches: Coach[] = [];
  const headCoach = generateCoach(rng, {
    id: options.coachIdFactory(),
    campId: options.id,
    role: 'head',
    disciplineKey: primaryDiscipline.key,
    quality: remap(reputation, 5, 99, 38, 92),
    date: options.date,
  });
  coaches.push(headCoach);

  // Staff size scales with standing: a top camp carries specialists, a small gym has one
  // coach doing everything.
  const staffCount = Math.round(clamp(remap(reputation, 10, 99, 1, 6) + rng.float(-0.6, 0.9), 1, 7));
  const roles: Exclude<CoachRole, 'head'>[] = ['striking', 'wrestling', 'grappling', 'strength', 'sports_science', 'medical'];
  for (let i = 0; i < staffCount; i++) {
    const role = roles[i % roles.length]!;
    // Where a camp has a matching specialisation, its assistant in that area is stronger.
    const specialisationForRole = specialisations.find((s) => ROLE_DISCIPLINE_FAMILY[role].includes(s.disciplineKey));
    const disciplineKey = specialisationForRole?.disciplineKey ?? rng.pick(ROLE_DISCIPLINE_FAMILY[role]);
    coaches.push(
      generateCoach(rng, {
        id: options.coachIdFactory(),
        campId: options.id,
        role,
        disciplineKey,
        quality: remap(reputation, 5, 99, 30, 84) + (specialisationForRole ? 8 : 0),
        date: options.date,
      }),
    );
  }

  const camp: Camp = {
    id: options.id,
    name: campName(rng, options.takenNames ?? new Set()),
    city: rng.pick(origin.regions),
    country: origin.code,
    region: rng.pick(origin.regions),
    foundedYear: yearOf(options.date) - rng.int(2, 34),
    reputation,
    peakReputation: reputation,
    // Capacity is sized so the world's total roster space only modestly exceeds its fighter
    // population; oversized camps would leave elite rooms conspicuously empty.
    capacity: Math.round(clamp(remap(reputation, 10, 99, 8, 24) + rng.float(-2, 4), 5, 30)),
    facilities,
    culture,
    specialisations,
    headCoachId: headCoach.id,
    coachIds: coaches.map((c) => c.id),
    history: { titlesWon: 0, rankedFighterPeak: 0, fightersDeveloped: 0 },
    status: 'active',
  };

  return { camp, coaches };
}
