/**
 * Disciplines — the join between camps and attributes (brief §5, §8).
 *
 * A discipline declares *which attributes it develops and with what weight*. This one
 * indirection is what makes camp specialisation meaningful without special-casing:
 *
 *     camp specialisation → discipline → weighted attribute set → growth multiplier
 *
 * So "Black Mountain Combat: +10% wrestling development" resolves automatically to a growth
 * multiplier on takedowns, chain wrestling and the wrestling styles — and on nothing else.
 * Adding a discipline never requires touching the training system.
 */

import { ATTRIBUTE_KEYS, type AttributeKey } from './attributes.ts';

export type DisciplineFamily = 'striking' | 'wrestling' | 'grappling' | 'physical' | 'mental' | 'integration';

export interface DisciplineDefinition {
  readonly key: string;
  readonly label: string;
  readonly family: DisciplineFamily;
  /**
   * How commonly MMA camps build their identity around this discipline. Wrestling and
   * boxing rooms are everywhere; a gym whose headline specialism is taekwondo is a
   * curiosity. Used to weight camp specialisation selection.
   */
  readonly prevalence: number;
  /** Relative emphasis this discipline places on each attribute it trains. */
  readonly attributeWeights: Readonly<Partial<Record<AttributeKey, number>>>;
}

/** MMA integration touches everything a little, and fight IQ a lot (brief §8, Apex Combat Academy). */
function mmaIntegrationWeights(): Partial<Record<AttributeKey, number>> {
  const weights: Partial<Record<AttributeKey, number>> = {};
  for (const key of ATTRIBUTE_KEYS) weights[key] = 0.25;
  weights.fightIQ = 1;
  weights.adaptability = 0.8;
  weights.decisionMaking = 0.7;
  return weights;
}

export const DISCIPLINES: readonly DisciplineDefinition[] = [
  // --- Striking -------------------------------------------------------------------
  { key: 'boxing', label: 'Boxing', family: 'striking', prevalence: 10, attributeWeights: { boxing: 1, strikingAccuracy: 0.6, strikingDefense: 0.5, footwork: 0.45, strikingPower: 0.35 } },
  { key: 'muay_thai', label: 'Muay Thai', family: 'striking', prevalence: 9, attributeWeights: { muayThai: 1, strikingPower: 0.5, clinchWrestling: 0.35, strikingDefense: 0.3, kickboxing: 0.25 } },
  { key: 'kickboxing', label: 'Kickboxing', family: 'striking', prevalence: 6, attributeWeights: { kickboxing: 1, footwork: 0.45, strikingAccuracy: 0.4, muayThai: 0.2 } },
  { key: 'dutch_kickboxing', label: 'Dutch Kickboxing', family: 'striking', prevalence: 4, attributeWeights: { dutchKickboxing: 1, kickboxing: 0.5, strikingPower: 0.55, boxing: 0.35, cardio: 0.25 } },
  { key: 'karate', label: 'Karate', family: 'striking', prevalence: 2, attributeWeights: { karate: 1, footwork: 0.6, speed: 0.35, strikingAccuracy: 0.35 } },
  { key: 'taekwondo', label: 'Taekwondo', family: 'striking', prevalence: 1.2, attributeWeights: { taekwondo: 1, agility: 0.45, speed: 0.4, footwork: 0.3 } },
  { key: 'sanda', label: 'Sanda', family: 'striking', prevalence: 1.5, attributeWeights: { sanda: 1, clinchWrestling: 0.4, takedownAbility: 0.3, strikingPower: 0.3 } },

  // --- Wrestling ------------------------------------------------------------------
  { key: 'freestyle_wrestling', label: 'Freestyle Wrestling', family: 'wrestling', prevalence: 9, attributeWeights: { freestyleWrestling: 1, takedownAbility: 0.7, chainWrestling: 0.5, scrambling: 0.35 } },
  { key: 'folkstyle_wrestling', label: 'Folkstyle Wrestling', family: 'wrestling', prevalence: 7, attributeWeights: { folkstyleWrestling: 1, topControl: 0.6, chainWrestling: 0.55, takedownAbility: 0.5 } },
  { key: 'greco_roman', label: 'Greco-Roman Wrestling', family: 'wrestling', prevalence: 4, attributeWeights: { grecoRomanWrestling: 1, clinchWrestling: 0.7, strength: 0.4, balance: 0.3 } },
  { key: 'cage_wrestling', label: 'Cage Wrestling', family: 'wrestling', prevalence: 7, attributeWeights: { cageWork: 1, clinchWrestling: 0.6, takedownAbility: 0.45, takedownDefense: 0.4 } },
  { key: 'takedown_defense', label: 'Takedown Defence', family: 'wrestling', prevalence: 4, attributeWeights: { takedownDefense: 1, balance: 0.5, scrambling: 0.4 } },

  // --- Grappling ------------------------------------------------------------------
  { key: 'bjj', label: 'Brazilian Jiu-Jitsu', family: 'grappling', prevalence: 10, attributeWeights: { brazilianJiuJitsu: 1, guardGame: 0.65, submissionAbility: 0.6, submissionDefense: 0.45 } },
  { key: 'submission_grappling', label: 'Submission Grappling', family: 'grappling', prevalence: 6, attributeWeights: { submissionGrappling: 1, submissionAbility: 0.7, scrambling: 0.5, topControl: 0.3 } },
  { key: 'judo', label: 'Judo', family: 'grappling', prevalence: 4, attributeWeights: { judo: 1, clinchWrestling: 0.5, balance: 0.4, takedownAbility: 0.4 } },
  { key: 'sambo', label: 'Sambo', family: 'grappling', prevalence: 3, attributeWeights: { sambo: 1, submissionAbility: 0.5, takedownAbility: 0.45, topControl: 0.35 } },
  { key: 'ground_and_pound', label: 'Ground and Pound', family: 'grappling', prevalence: 4, attributeWeights: { groundStriking: 1, topControl: 0.75, strikingPower: 0.3 } },
  { key: 'positional_escapes', label: 'Positional Escapes', family: 'grappling', prevalence: 3, attributeWeights: { scrambling: 1, guardGame: 0.6, submissionDefense: 0.55 } },

  // --- Physical -------------------------------------------------------------------
  { key: 'strength_conditioning', label: 'Strength & Conditioning', family: 'physical', prevalence: 7, attributeWeights: { strength: 1, explosiveness: 0.8, strikingPower: 0.3, durability: 0.25 } },
  { key: 'conditioning', label: 'Conditioning', family: 'physical', prevalence: 6, attributeWeights: { cardio: 1, recovery: 0.55, durability: 0.35 } },
  { key: 'speed_agility', label: 'Speed & Agility', family: 'physical', prevalence: 3, attributeWeights: { speed: 1, agility: 0.8, footwork: 0.4, balance: 0.3 } },
  { key: 'sports_science', label: 'Sports Science', family: 'physical', prevalence: 4, attributeWeights: { recovery: 1, cardio: 0.5, durability: 0.5, balance: 0.2 } },

  // --- Mental ---------------------------------------------------------------------
  { key: 'film_study', label: 'Film Study', family: 'mental', prevalence: 4, attributeWeights: { fightIQ: 1, decisionMaking: 0.7, adaptability: 0.55 } },
  { key: 'mental_performance', label: 'Mental Performance', family: 'mental', prevalence: 3, attributeWeights: { composure: 1, pressureManagement: 0.8, confidence: 0.6 } },

  // --- Integration ----------------------------------------------------------------
  { key: 'mma_integration', label: 'MMA Integration', family: 'integration', prevalence: 9, attributeWeights: mmaIntegrationWeights() },
];

const BY_KEY = new Map(DISCIPLINES.map((d) => [d.key, d]));

export function discipline(key: string): DisciplineDefinition {
  const found = BY_KEY.get(key);
  if (!found) throw new RangeError(`Unknown discipline: ${key}`);
  return found;
}

export function disciplinesInFamily(family: DisciplineFamily): readonly DisciplineDefinition[] {
  return DISCIPLINES.filter((d) => d.family === family);
}

/**
 * Emphasis lookup, precomputed once at module load.
 *
 * `disciplineEmphasis` is called on the simulation's hottest path — every attribute, of
 * every fighter, every training week, for each of the camp's specialisations, its coaches
 * and the fighter's own focus. Recomputing the normalising peak on each call dominated the
 * tick; a flat table makes it a single property read.
 */
const EMPHASIS_TABLE: ReadonlyMap<string, Readonly<Partial<Record<AttributeKey, number>>>> = new Map(
  DISCIPLINES.map((definition) => {
    let peak = 0;
    for (const value of Object.values(definition.attributeWeights)) if (value > peak) peak = value;
    const normalised: Partial<Record<AttributeKey, number>> = {};
    for (const [key, weight] of Object.entries(definition.attributeWeights) as [AttributeKey, number][]) {
      normalised[key] = peak === 0 ? 0 : weight / peak;
    }
    return [definition.key, normalised] as const;
  }),
);

/**
 * How strongly a discipline develops one attribute, normalised to [0, 1] against that
 * discipline's own strongest attribute. Returns 0 for attributes it does not train, which
 * is what makes a specialisation bonus apply narrowly rather than across the board.
 */
export function disciplineEmphasis(disciplineKey: string, attribute: AttributeKey): number {
  return EMPHASIS_TABLE.get(disciplineKey)?.[attribute] ?? 0;
}
