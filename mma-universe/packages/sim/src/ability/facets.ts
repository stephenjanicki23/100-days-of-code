/**
 * Facets — the intermediate layer between raw attributes and Current Ability.
 *
 * A plain weighted mean over every attribute would badly misjudge fighters, because the
 * attribute list contains mutually exclusive specialisms: an elite boxer has no reason to
 * rate highly in taekwondo, and averaging the two punishes them for a skill nobody expects
 * them to have. Facets fix that by taking a *best-of* within each family of named martial
 * arts, then combining with the general capabilities that always matter.
 *
 * Facets are reused well beyond ability scoring — the fight engine resolves exchanges by
 * comparing the relevant offensive facet against the matching defensive one, and the UI
 * shows them as a fighter's shape at a glance.
 */

import {
  type AttributeSet,
  type AttributeKey,
  styleSkillsInGroup,
  topValues,
} from '../domain/attributes.ts';
import { clamp, weightedMean } from '../core/math.ts';

export const FACET_KEYS = [
  'strikingOffense',
  'strikingDefense',
  'wrestlingOffense',
  'wrestlingDefense',
  'clinch',
  'groundOffense',
  'groundDefense',
  'physical',
  'mental',
] as const;

export type FacetKey = (typeof FACET_KEYS)[number];
export type FacetSet = Record<FacetKey, number>;

export const FACET_LABELS: Record<FacetKey, string> = {
  strikingOffense: 'Striking Offence',
  strikingDefense: 'Striking Defence',
  wrestlingOffense: 'Wrestling Offence',
  wrestlingDefense: 'Wrestling Defence',
  clinch: 'Clinch',
  groundOffense: 'Ground Offence',
  groundDefense: 'Ground Defence',
  physical: 'Physical',
  mental: 'Mental',
};

const STRIKING_STYLES = styleSkillsInGroup('striking');
const WRESTLING_STYLES = styleSkillsInGroup('wrestling');
const GRAPPLING_STYLES = styleSkillsInGroup('grappling');

/** Best and second-best within a family, so a specialist is judged on their specialism. */
function bestTwo(attributes: AttributeSet, keys: readonly AttributeKey[]): [number, number] {
  const [first = 0, second = 0] = topValues(attributes, keys, 2);
  return [first, second];
}

export function computeFacets(a: AttributeSet): FacetSet {
  const [bestStrike, secondStrike] = bestTwo(a, STRIKING_STYLES);
  const [bestWrestle] = bestTwo(a, WRESTLING_STYLES);
  const [bestGrapple, secondGrapple] = bestTwo(a, GRAPPLING_STYLES);

  return {
    strikingOffense: weightedMean([
      [bestStrike, 0.4],
      [secondStrike, 0.15],
      [a.strikingAccuracy, 0.2],
      [a.strikingPower, 0.25],
    ]),
    strikingDefense: weightedMean([
      [a.strikingDefense, 0.55],
      [a.footwork, 0.3],
      [a.speed, 0.15],
    ]),
    wrestlingOffense: weightedMean([
      [bestWrestle, 0.3],
      [a.takedownAbility, 0.35],
      [a.chainWrestling, 0.2],
      [a.strength, 0.15],
    ]),
    wrestlingDefense: weightedMean([
      [a.takedownDefense, 0.6],
      [a.balance, 0.25],
      [a.scrambling, 0.15],
    ]),
    clinch: weightedMean([
      [a.clinchWrestling, 0.45],
      [a.cageWork, 0.3],
      [a.grecoRomanWrestling, 0.25],
    ]),
    groundOffense: weightedMean([
      [bestGrapple, 0.24],
      [secondGrapple, 0.08],
      [a.submissionAbility, 0.24],
      [a.topControl, 0.24],
      [a.groundStriking, 0.2],
    ]),
    groundDefense: weightedMean([
      [a.submissionDefense, 0.4],
      [a.guardGame, 0.3],
      [a.scrambling, 0.3],
    ]),
    physical: weightedMean([
      [a.cardio, 0.2],
      [a.durability, 0.18],
      [a.speed, 0.14],
      [a.explosiveness, 0.13],
      [a.strength, 0.12],
      [a.agility, 0.09],
      [a.recovery, 0.08],
      [a.balance, 0.06],
    ]),
    // Aggression and confidence are deliberately absent: more is not simply better, so they
    // belong in behaviour weighting rather than in a measure of ability.
    mental: weightedMean([
      [a.fightIQ, 0.3],
      [a.composure, 0.2],
      [a.decisionMaking, 0.2],
      [a.adaptability, 0.15],
      [a.pressureManagement, 0.15],
    ]),
  };
}

/** How much each facet contributes to overall fighting ability. Sums to 1. */
export const FACET_ABILITY_WEIGHTS: Record<FacetKey, number> = {
  strikingOffense: 0.16,
  strikingDefense: 0.11,
  wrestlingOffense: 0.12,
  wrestlingDefense: 0.11,
  clinch: 0.06,
  groundOffense: 0.11,
  groundDefense: 0.1,
  physical: 0.13,
  mental: 0.1,
};

/** Weighted facet score on the same 0-100 scale as the attributes themselves. */
export function facetScore(facets: FacetSet): number {
  return clamp(
    weightedMean(FACET_KEYS.map((key) => [facets[key], FACET_ABILITY_WEIGHTS[key]] as const)),
    0,
    100,
  );
}
