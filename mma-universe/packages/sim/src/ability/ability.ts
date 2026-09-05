/**
 * Current Ability and Potential Ability (brief §4).
 *
 * Both live on a hidden 0-200 scale. The important design decision is that **Current
 * Ability is derived, never stored independently**: it is a projection of the visible
 * attributes through the facet layer. In designs that store both, the two inevitably drift
 * apart — a fighter's rating says one thing and their attributes another. Here that is
 * impossible by construction.
 *
 * Potential Ability *is* stored, because it is not observable from the attributes: it is the
 * ceiling a fighter might reach, and the whole point of the development system is that
 * reaching it is not guaranteed (§4).
 */

import { type AttributeSet } from '../domain/attributes.ts';
import { clamp, remap } from '../core/math.ts';
import { computeFacets, facetScore, type FacetSet } from './facets.ts';

export const MAX_ABILITY = 200;

/**
 * Endpoints of the attribute→ability mapping. A weighted facet score of 12 maps to ability
 * 0 and 86 maps to 200; nobody realistically reaches either end. These constants are what
 * make an elite champion land around 175-190 and a regional journeyman around 90-110 — the
 * distribution test in `test/generation.test.ts` pins that behaviour.
 */
const SCORE_AT_ZERO_ABILITY = 12;
const SCORE_AT_MAX_ABILITY = 86;

export function abilityFromFacets(facets: FacetSet): number {
  return clamp(
    remap(facetScore(facets), SCORE_AT_ZERO_ABILITY, SCORE_AT_MAX_ABILITY, 0, MAX_ABILITY),
    1,
    MAX_ABILITY,
  );
}

/** The canonical projection: visible attributes → hidden Current Ability. */
export function computeCurrentAbility(attributes: AttributeSet): number {
  return abilityFromFacets(computeFacets(attributes));
}

/**
 * The fraction of a fighter's ceiling that has been realised. Development uses
 * `1 - fulfilment` as headroom, so growth slows asymptotically as a fighter closes on their
 * potential rather than stopping at a hard wall.
 */
export function fulfilment(currentAbility: number, potentialAbility: number): number {
  if (potentialAbility <= 0) return 1;
  return clamp(currentAbility / potentialAbility, 0, 1);
}

/**
 * Remaining growth headroom in [0, 1]. Squashed with a soft knee so that the last stretch
 * towards potential is slow but never entirely closed — a fighter at 95% of potential still
 * inches forward, which is what produces convincing late-prime peaks.
 */
export function headroom(currentAbility: number, potentialAbility: number): number {
  const remaining = 1 - fulfilment(currentAbility, potentialAbility);
  return clamp(remaining ** 0.55, 0, 1);
}

/** Broad talent tiers, used for generation targets, scouting language and UI grouping. */
export const ABILITY_TIERS = [
  { key: 'elite', label: 'Elite', min: 165 },
  { key: 'contender', label: 'Contender', min: 148 },
  { key: 'ranked', label: 'Ranked', min: 132 },
  { key: 'fringe', label: 'Fringe Contender', min: 117 },
  { key: 'gatekeeper', label: 'Gatekeeper', min: 101 },
  { key: 'journeyman', label: 'Journeyman', min: 84 },
  { key: 'regional', label: 'Regional', min: 60 },
  { key: 'amateur', label: 'Amateur', min: 0 },
] as const;

export type AbilityTierKey = (typeof ABILITY_TIERS)[number]['key'];

export function abilityTier(ability: number): (typeof ABILITY_TIERS)[number] {
  for (const tier of ABILITY_TIERS) {
    if (ability >= tier.min) return tier;
  }
  return ABILITY_TIERS[ABILITY_TIERS.length - 1]!;
}
