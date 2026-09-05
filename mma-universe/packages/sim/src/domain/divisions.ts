/**
 * Weight divisions (brief §2).
 *
 * Divisions are data, not code branches: adding a new one — a men's cruiserweight, an
 * amateur ladder, a kickboxing division for a future ruleset — means appending a row here,
 * and every system that iterates divisions picks it up. Nothing keys off a hard-coded list.
 */

export type Sex = 'male' | 'female';

export interface DivisionDefinition {
  readonly key: string;
  readonly name: string;
  readonly sex: Sex;
  /** Contracted weight limit in pounds; the championship-bout limit for a title fight. */
  readonly weightLimitLbs: number;
  /** Display order within its sex, lightest first. */
  readonly order: number;
  /** Typical height range in inches, used to generate believable physiques. */
  readonly heightRangeIn: readonly [number, number];
  /** Reach relative to height, in inches, before individual variation. */
  readonly reachBiasIn: number;
  /** Relative share of the fighter population. Middle divisions are the deepest, as in the real sport. */
  readonly populationWeight: number;
}

export const DIVISIONS: readonly DivisionDefinition[] = [
  { key: 'm_flyweight', name: 'Flyweight', sex: 'male', weightLimitLbs: 125, order: 1, heightRangeIn: [62, 67], reachBiasIn: 0.5, populationWeight: 0.6 },
  { key: 'm_bantamweight', name: 'Bantamweight', sex: 'male', weightLimitLbs: 135, order: 2, heightRangeIn: [63, 69], reachBiasIn: 0.7, populationWeight: 0.9 },
  { key: 'm_featherweight', name: 'Featherweight', sex: 'male', weightLimitLbs: 145, order: 3, heightRangeIn: [64, 70], reachBiasIn: 0.9, populationWeight: 1.1 },
  { key: 'm_lightweight', name: 'Lightweight', sex: 'male', weightLimitLbs: 155, order: 4, heightRangeIn: [66, 72], reachBiasIn: 1.0, populationWeight: 1.5 },
  { key: 'm_welterweight', name: 'Welterweight', sex: 'male', weightLimitLbs: 170, order: 5, heightRangeIn: [68, 74], reachBiasIn: 1.2, populationWeight: 1.4 },
  { key: 'm_middleweight', name: 'Middleweight', sex: 'male', weightLimitLbs: 185, order: 6, heightRangeIn: [70, 76], reachBiasIn: 1.3, populationWeight: 1.1 },
  { key: 'm_light_heavyweight', name: 'Light Heavyweight', sex: 'male', weightLimitLbs: 205, order: 7, heightRangeIn: [72, 78], reachBiasIn: 1.4, populationWeight: 0.8 },
  { key: 'm_heavyweight', name: 'Heavyweight', sex: 'male', weightLimitLbs: 265, order: 8, heightRangeIn: [73, 80], reachBiasIn: 1.5, populationWeight: 0.7 },
  { key: 'w_strawweight', name: "Women's Strawweight", sex: 'female', weightLimitLbs: 115, order: 1, heightRangeIn: [60, 66], reachBiasIn: 0.3, populationWeight: 0.45 },
  { key: 'w_flyweight', name: "Women's Flyweight", sex: 'female', weightLimitLbs: 125, order: 2, heightRangeIn: [62, 68], reachBiasIn: 0.4, populationWeight: 0.4 },
  { key: 'w_bantamweight', name: "Women's Bantamweight", sex: 'female', weightLimitLbs: 135, order: 3, heightRangeIn: [63, 70], reachBiasIn: 0.5, populationWeight: 0.3 },
  { key: 'w_featherweight', name: "Women's Featherweight", sex: 'female', weightLimitLbs: 145, order: 4, heightRangeIn: [64, 71], reachBiasIn: 0.6, populationWeight: 0.15 },
];

const BY_KEY = new Map(DIVISIONS.map((d) => [d.key, d]));

export function division(key: string): DivisionDefinition {
  const found = BY_KEY.get(key);
  if (!found) throw new RangeError(`Unknown division: ${key}`);
  return found;
}

export function divisionsForSex(sex: Sex): readonly DivisionDefinition[] {
  return DIVISIONS.filter((d) => d.sex === sex).sort((a, b) => a.order - b.order);
}

/** The division directly above, used for weight-class moves later in a career. */
export function divisionAbove(key: string): DivisionDefinition | undefined {
  const current = division(key);
  return divisionsForSex(current.sex).find((d) => d.order === current.order + 1);
}

export function divisionBelow(key: string): DivisionDefinition | undefined {
  const current = division(key);
  return divisionsForSex(current.sex).find((d) => d.order === current.order - 1);
}

/** Number of ranked (non-champion) positions a division maintains — see brief §24. */
export const RANKED_POSITIONS = 15;
