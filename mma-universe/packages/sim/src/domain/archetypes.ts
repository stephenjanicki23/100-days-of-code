/**
 * Fighting archetypes (brief §6).
 *
 * An archetype is a *shape*, not a label: a profile of attribute offsets plus the
 * behavioural tendencies the fight engine reads. Generation uses an archetype to shape a
 * fighter's attribute distribution, but the style shown in the UI is always re-derived from
 * the current attributes by `deriveStyle`.
 *
 * That inversion is the point. A wrestle-boxer whose takedowns erode through their thirties
 * *becomes* a pressure boxer on their own, with nothing in the simulation reassigning them,
 * and a fighter who spends two years at a Muay Thai camp drifts toward that style because
 * their attributes actually changed.
 */

import { ATTRIBUTE_KEYS, type AttributeKey, type AttributeSet } from './attributes.ts';
import { mean, stdDev } from '../core/math.ts';
import { computeFacets, FACET_KEYS, FACET_LABELS, type FacetKey } from '../ability/facets.ts';
import { attributeDefinition } from './attributes.ts';

/** Behavioural dials the fight engine reads. All in [0, 1]; 0.5 is neutral. */
export interface StyleTendencies {
  /** Forward pressure versus ceding ground. */
  readonly pressure: number;
  /** Preferred range: 0 = inside, 1 = long. */
  readonly range: number;
  /** Volume of strikes attempted per exchange window. */
  readonly strikeVolume: number;
  /** How readily takedowns are sought. */
  readonly takedownRate: number;
  /** How readily the clinch is sought. */
  readonly clinchRate: number;
  /** Willingness to hunt submissions rather than hold position. */
  readonly submissionSeeking: number;
  /** Preference for waiting on the opponent's commitment. */
  readonly counterRate: number;
  /** On top, preference for control over damage. */
  readonly groundControl: number;
  /** Overall output pace, which interacts with the stamina system. */
  readonly pace: number;
}

export interface ArchetypeDefinition {
  readonly key: string;
  readonly label: string;
  readonly description: string;
  /** Attribute deviations from the fighter's base level, in rating points. */
  readonly offsets: Readonly<Partial<Record<AttributeKey, number>>>;
  readonly tendencies: StyleTendencies;
}

const NEUTRAL: StyleTendencies = {
  pressure: 0.5,
  range: 0.5,
  strikeVolume: 0.5,
  takedownRate: 0.5,
  clinchRate: 0.5,
  submissionSeeking: 0.5,
  counterRate: 0.5,
  groundControl: 0.5,
  pace: 0.5,
};

const t = (overrides: Partial<StyleTendencies>): StyleTendencies => ({ ...NEUTRAL, ...overrides });

export const ARCHETYPES: readonly ArchetypeDefinition[] = [
  {
    key: 'pressure_boxer',
    label: 'Pressure Boxer',
    description: 'Walks opponents down behind heavy hands and a suffocating pace.',
    offsets: { boxing: 22, strikingPower: 12, cardio: 11, aggression: 14, footwork: 5, pressureManagement: 6, taekwondo: -18, karate: -12, guardGame: -8 },
    tendencies: t({ pressure: 0.88, range: 0.25, strikeVolume: 0.78, takedownRate: 0.22, counterRate: 0.2, pace: 0.8 }),
  },
  {
    key: 'counter_striker',
    label: 'Counter Striker',
    description: 'Invites the lead and punishes it.',
    offsets: { strikingDefense: 18, footwork: 14, strikingAccuracy: 15, boxing: 10, composure: 12, fightIQ: 8, aggression: -12 },
    tendencies: t({ pressure: 0.22, range: 0.68, counterRate: 0.9, strikeVolume: 0.42, takedownRate: 0.2, pace: 0.42 }),
  },
  {
    key: 'muay_thai_destroyer',
    label: 'Muay Thai Destroyer',
    description: 'Elbows, knees and low kicks from a punishing clinch.',
    offsets: { muayThai: 24, strikingPower: 14, clinchWrestling: 12, kickboxing: 8, durability: 6, brazilianJiuJitsu: -10, guardGame: -8 },
    tendencies: t({ pressure: 0.68, range: 0.35, clinchRate: 0.78, strikeVolume: 0.6, takedownRate: 0.2, pace: 0.6 }),
  },
  {
    key: 'out_fighter',
    label: 'Out-Fighter',
    description: 'Fights at the end of their range and refuses to be cornered.',
    offsets: { footwork: 18, speed: 14, kickboxing: 12, strikingDefense: 11, strikingAccuracy: 8, strikingPower: -8, aggression: -8 },
    tendencies: t({ pressure: 0.2, range: 0.9, strikeVolume: 0.55, counterRate: 0.6, clinchRate: 0.2, pace: 0.5 }),
  },
  {
    key: 'wrestle_boxer',
    label: 'Wrestle-Boxer',
    description: 'Threatens the takedown to land the right hand, and the right hand to land the takedown.',
    offsets: { boxing: 16, freestyleWrestling: 16, takedownAbility: 14, chainWrestling: 8, topControl: 8, fightIQ: 6, taekwondo: -15, guardGame: -6 },
    tendencies: t({ pressure: 0.68, range: 0.4, takedownRate: 0.62, strikeVolume: 0.55, groundControl: 0.6, pace: 0.6 }),
  },
  {
    key: 'chain_wrestler',
    label: 'Chain Wrestler',
    description: 'Relentless entries; if the first shot fails the second is already coming.',
    offsets: { chainWrestling: 22, freestyleWrestling: 18, takedownAbility: 18, folkstyleWrestling: 14, cardio: 11, strikingPower: -10, taekwondo: -12 },
    tendencies: t({ pressure: 0.75, range: 0.3, takedownRate: 0.9, strikeVolume: 0.32, groundControl: 0.7, clinchRate: 0.65, pace: 0.72 }),
  },
  {
    key: 'bjj_specialist',
    label: 'BJJ Submission Specialist',
    description: 'Happy anywhere the fight goes down, and hunting the finish from everywhere.',
    offsets: { brazilianJiuJitsu: 24, submissionAbility: 20, guardGame: 18, submissionGrappling: 12, scrambling: 8, strikingDefense: -8, takedownDefense: -8 },
    tendencies: t({ pressure: 0.42, submissionSeeking: 0.92, groundControl: 0.3, takedownRate: 0.55, strikeVolume: 0.35, pace: 0.48 }),
  },
  {
    key: 'ground_and_pound_wrestler',
    label: 'Ground-and-Pound Wrestler',
    description: 'Takes you down and makes the round miserable.',
    offsets: { folkstyleWrestling: 18, topControl: 20, groundStriking: 20, takedownAbility: 14, strength: 10, footwork: -8, taekwondo: -12 },
    tendencies: t({ pressure: 0.7, takedownRate: 0.82, groundControl: 0.85, submissionSeeking: 0.25, strikeVolume: 0.45, pace: 0.6 }),
  },
  {
    key: 'clinch_specialist',
    label: 'Clinch Specialist',
    description: 'Lives on the fence, where the fight becomes a wrestling match.',
    offsets: { clinchWrestling: 22, cageWork: 18, grecoRomanWrestling: 18, muayThai: 8, strength: 10, footwork: -10, kickboxing: -8 },
    tendencies: t({ pressure: 0.78, range: 0.15, clinchRate: 0.92, takedownRate: 0.55, strikeVolume: 0.4, pace: 0.62 }),
  },
  {
    key: 'kicker',
    label: 'Kicker',
    description: 'Long, varied kicks that dismantle a lead leg over three rounds.',
    offsets: { kickboxing: 18, taekwondo: 14, karate: 10, agility: 12, footwork: 10, boxing: -10, clinchWrestling: -10 },
    tendencies: t({ pressure: 0.4, range: 0.82, strikeVolume: 0.6, takedownRate: 0.18, clinchRate: 0.2, pace: 0.55 }),
  },
  {
    key: 'karate_counter_fighter',
    label: 'Karate Counter Fighter',
    description: 'Explodes in and out of range from a bladed stance.',
    offsets: { karate: 24, footwork: 18, speed: 14, explosiveness: 12, strikingAccuracy: 10, clinchWrestling: -12, grecoRomanWrestling: -10 },
    tendencies: t({ pressure: 0.3, range: 0.88, counterRate: 0.82, strikeVolume: 0.4, clinchRate: 0.15, pace: 0.45 }),
  },
  {
    key: 'sambo_grappler',
    label: 'Sambo Grappler',
    description: 'Trips, throws and leg locks from a wrestling base.',
    offsets: { sambo: 24, judo: 14, submissionAbility: 14, takedownAbility: 12, scrambling: 10, topControl: 8, taekwondo: -12 },
    tendencies: t({ pressure: 0.6, takedownRate: 0.75, submissionSeeking: 0.7, clinchRate: 0.6, groundControl: 0.6, pace: 0.58 }),
  },
  {
    key: 'complete_mma',
    label: 'Complete MMA Fighter',
    description: 'No holes, no obvious lead — wins wherever the fight ends up.',
    offsets: { fightIQ: 14, adaptability: 12, decisionMaking: 10, boxing: 6, freestyleWrestling: 6, brazilianJiuJitsu: 6, cardio: 6, takedownDefense: 6, submissionDefense: 6 },
    tendencies: t({ pressure: 0.55, takedownRate: 0.5, strikeVolume: 0.55, pace: 0.58 }),
  },
  {
    key: 'brawler',
    label: 'Brawler',
    description: 'Trades in the pocket and dares you to trade back.',
    offsets: { strikingPower: 22, aggression: 20, durability: 12, boxing: 8, strikingDefense: -16, fightIQ: -10, composure: -10 },
    tendencies: t({ pressure: 0.85, range: 0.18, strikeVolume: 0.85, counterRate: 0.15, takedownRate: 0.2, pace: 0.88 }),
  },
  {
    key: 'defensive_technician',
    label: 'Defensive Technician',
    description: 'Extremely hard to hit, extremely hard to take down, and content to win on points.',
    offsets: { strikingDefense: 20, takedownDefense: 18, submissionDefense: 14, composure: 14, fightIQ: 12, aggression: -16, strikingPower: -8 },
    tendencies: t({ pressure: 0.3, range: 0.7, counterRate: 0.72, strikeVolume: 0.42, takedownRate: 0.25, pace: 0.42 }),
  },
];

const BY_KEY = new Map(ARCHETYPES.map((a) => [a.key, a]));

export function archetype(key: string): ArchetypeDefinition {
  const found = BY_KEY.get(key);
  if (!found) throw new RangeError(`Unknown archetype: ${key}`);
  return found;
}

export interface StyleFit {
  readonly archetype: ArchetypeDefinition;
  /** Dot product of the fighter's attribute shape with the archetype's, roughly in [-1, 1]. */
  readonly fit: number;
}

export interface FighterStyle {
  readonly primary: ArchetypeDefinition;
  readonly secondary: ArchetypeDefinition;
  /** Best facet, e.g. "Wrestling Offence". */
  readonly strength: { readonly facet: FacetKey; readonly label: string; readonly rating: number };
  /** Weakest facet — the hole an opponent's camp will game-plan for. */
  readonly weakness: { readonly facet: FacetKey; readonly label: string; readonly rating: number };
  /** The single highest-rated attribute, the fighter's calling card. */
  readonly signatureSkill: { readonly attribute: AttributeKey; readonly label: string; readonly rating: number };
  readonly ranking: readonly StyleFit[];
  /** Blended tendencies (primary 70% / secondary 30%) that the fight engine consumes. */
  readonly tendencies: StyleTendencies;
}

/**
 * Scores a fighter's attribute *shape* against every archetype.
 *
 * Attributes are first converted to z-scores within the fighter's own profile, so the
 * comparison is about relative emphasis rather than overall quality — otherwise every elite
 * fighter would match every archetype and every prospect would match none.
 */
export function rankStyles(attributes: AttributeSet): StyleFit[] {
  const values = ATTRIBUTE_KEYS.map((key) => attributes[key]);
  const average = mean(values);
  const spread = stdDev(values) || 1;

  const z = {} as Record<AttributeKey, number>;
  for (const key of ATTRIBUTE_KEYS) z[key] = (attributes[key] - average) / spread;

  return ARCHETYPES.map((definition) => {
    let dot = 0;
    let norm = 0;
    for (const [key, offset] of Object.entries(definition.offsets) as [AttributeKey, number][]) {
      dot += offset * z[key];
      norm += offset * offset;
    }
    return { archetype: definition, fit: norm === 0 ? 0 : dot / Math.sqrt(norm) };
  }).sort((a, b) => b.fit - a.fit);
}

function blendTendencies(primary: StyleTendencies, secondary: StyleTendencies, weight = 0.3): StyleTendencies {
  const blended = {} as Record<keyof StyleTendencies, number>;
  for (const key of Object.keys(primary) as (keyof StyleTendencies)[]) {
    blended[key] = primary[key] * (1 - weight) + secondary[key] * weight;
  }
  return blended as unknown as StyleTendencies;
}

/** The public projection: current attributes → the style a fighter currently *is*. */
export function deriveStyle(attributes: AttributeSet): FighterStyle {
  const ranking = rankStyles(attributes);
  const primary = ranking[0]!.archetype;
  const secondary = ranking[1]!.archetype;

  const facets = computeFacets(attributes);
  const sortedFacets = [...FACET_KEYS].sort((a, b) => facets[b] - facets[a]);
  const best = sortedFacets[0]!;
  const worst = sortedFacets[sortedFacets.length - 1]!;

  let signature: AttributeKey = ATTRIBUTE_KEYS[0]!;
  for (const key of ATTRIBUTE_KEYS) if (attributes[key] > attributes[signature]) signature = key;

  return {
    primary,
    secondary,
    strength: { facet: best, label: FACET_LABELS[best], rating: Math.round(facets[best]) },
    weakness: { facet: worst, label: FACET_LABELS[worst], rating: Math.round(facets[worst]) },
    signatureSkill: {
      attribute: signature,
      label: attributeDefinition(signature).label,
      rating: Math.round(attributes[signature]),
    },
    ranking,
    tendencies: blendTendencies(primary.tendencies, secondary.tendencies),
  };
}
