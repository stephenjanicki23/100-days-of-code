/**
 * The visible attribute system (brief §5).
 *
 * Every attribute is a 0-100 rating. Attributes are the *only* stored representation of a
 * fighter's skill: Current Ability is projected from them (see `ability/ability.ts`), and
 * fighting style is projected from them (see `domain/archetypes.ts`). Nothing is stored
 * twice, so nothing can drift out of sync.
 *
 * Note on the overlap between mental attributes and personality traits — the brief lists
 * confidence, composure, adaptability and aggression in both places. They are deliberately
 * kept separate here:
 *
 *   - a *mental attribute* is a visible, trainable, in-fight capability;
 *   - a *personality trait* (see `domain/personality.ts`) is a hidden, near-fixed
 *     disposition that governs career behaviour and modulates how mental attributes drift.
 */

export const ATTRIBUTE_GROUPS = ['striking', 'wrestling', 'grappling', 'physical', 'mental'] as const;
export type AttributeGroup = (typeof ATTRIBUTE_GROUPS)[number];

/**
 * How an attribute responds to age (brief §12). Physical attributes peak early and decline;
 * technical skill plateaus and erodes only very late; mental attributes keep improving with
 * accumulated experience, which is what makes a compelling late-career veteran.
 */
export type AgingClass = 'physical' | 'skill' | 'mental';

export interface AttributeDefinition {
  readonly key: AttributeKey;
  readonly label: string;
  readonly group: AttributeGroup;
  readonly agingClass: AgingClass;
  /** True for a named martial art, as opposed to a general capability. Styles pick a best-of among these. */
  readonly isStyleSkill: boolean;
}

export const ATTRIBUTE_DEFINITIONS = [
  // --- Striking -------------------------------------------------------------------
  { key: 'boxing', label: 'Boxing', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'muayThai', label: 'Muay Thai', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'kickboxing', label: 'Kickboxing', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'dutchKickboxing', label: 'Dutch Kickboxing', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'karate', label: 'Karate', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'taekwondo', label: 'Taekwondo', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'sanda', label: 'Sanda', group: 'striking', agingClass: 'skill', isStyleSkill: true },
  { key: 'strikingDefense', label: 'Striking Defence', group: 'striking', agingClass: 'skill', isStyleSkill: false },
  { key: 'footwork', label: 'Footwork', group: 'striking', agingClass: 'physical', isStyleSkill: false },
  { key: 'strikingPower', label: 'Striking Power', group: 'striking', agingClass: 'physical', isStyleSkill: false },
  { key: 'strikingAccuracy', label: 'Striking Accuracy', group: 'striking', agingClass: 'skill', isStyleSkill: false },

  // --- Wrestling ------------------------------------------------------------------
  { key: 'freestyleWrestling', label: 'Freestyle Wrestling', group: 'wrestling', agingClass: 'skill', isStyleSkill: true },
  { key: 'folkstyleWrestling', label: 'Folkstyle Wrestling', group: 'wrestling', agingClass: 'skill', isStyleSkill: true },
  { key: 'grecoRomanWrestling', label: 'Greco-Roman Wrestling', group: 'wrestling', agingClass: 'skill', isStyleSkill: true },
  { key: 'takedownAbility', label: 'Takedown Ability', group: 'wrestling', agingClass: 'skill', isStyleSkill: false },
  { key: 'takedownDefense', label: 'Takedown Defence', group: 'wrestling', agingClass: 'skill', isStyleSkill: false },
  { key: 'chainWrestling', label: 'Chain Wrestling', group: 'wrestling', agingClass: 'skill', isStyleSkill: false },
  { key: 'clinchWrestling', label: 'Clinch Wrestling', group: 'wrestling', agingClass: 'skill', isStyleSkill: false },
  { key: 'cageWork', label: 'Cage Work', group: 'wrestling', agingClass: 'skill', isStyleSkill: false },

  // --- Grappling ------------------------------------------------------------------
  { key: 'brazilianJiuJitsu', label: 'Brazilian Jiu-Jitsu', group: 'grappling', agingClass: 'skill', isStyleSkill: true },
  { key: 'submissionGrappling', label: 'Submission Grappling', group: 'grappling', agingClass: 'skill', isStyleSkill: true },
  { key: 'judo', label: 'Judo', group: 'grappling', agingClass: 'skill', isStyleSkill: true },
  { key: 'sambo', label: 'Sambo', group: 'grappling', agingClass: 'skill', isStyleSkill: true },
  { key: 'guardGame', label: 'Guard Game', group: 'grappling', agingClass: 'skill', isStyleSkill: false },
  { key: 'topControl', label: 'Top Control', group: 'grappling', agingClass: 'skill', isStyleSkill: false },
  { key: 'submissionAbility', label: 'Submission Ability', group: 'grappling', agingClass: 'skill', isStyleSkill: false },
  { key: 'submissionDefense', label: 'Submission Defence', group: 'grappling', agingClass: 'skill', isStyleSkill: false },
  { key: 'scrambling', label: 'Scrambling', group: 'grappling', agingClass: 'physical', isStyleSkill: false },
  { key: 'groundStriking', label: 'Ground Striking', group: 'grappling', agingClass: 'skill', isStyleSkill: false },

  // --- Physical -------------------------------------------------------------------
  { key: 'strength', label: 'Strength', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'explosiveness', label: 'Explosiveness', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'speed', label: 'Speed', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'agility', label: 'Agility', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'cardio', label: 'Cardio', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'durability', label: 'Durability', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'recovery', label: 'Recovery', group: 'physical', agingClass: 'physical', isStyleSkill: false },
  { key: 'balance', label: 'Balance', group: 'physical', agingClass: 'physical', isStyleSkill: false },

  // --- Mental ---------------------------------------------------------------------
  { key: 'fightIQ', label: 'Fight IQ', group: 'mental', agingClass: 'mental', isStyleSkill: false },
  { key: 'composure', label: 'Composure', group: 'mental', agingClass: 'mental', isStyleSkill: false },
  { key: 'adaptability', label: 'Adaptability', group: 'mental', agingClass: 'mental', isStyleSkill: false },
  { key: 'confidence', label: 'Confidence', group: 'mental', agingClass: 'mental', isStyleSkill: false },
  { key: 'aggression', label: 'Aggression', group: 'mental', agingClass: 'mental', isStyleSkill: false },
  { key: 'decisionMaking', label: 'Decision Making', group: 'mental', agingClass: 'mental', isStyleSkill: false },
  { key: 'pressureManagement', label: 'Pressure Management', group: 'mental', agingClass: 'mental', isStyleSkill: false },
] as const satisfies readonly { key: string; label: string; group: AttributeGroup; agingClass: AgingClass; isStyleSkill: boolean }[];

export type AttributeKey = (typeof ATTRIBUTE_DEFINITIONS)[number]['key'];

export type AttributeSet = Record<AttributeKey, number>;

export const ATTRIBUTE_KEYS: readonly AttributeKey[] = ATTRIBUTE_DEFINITIONS.map((d) => d.key);

const DEFINITION_BY_KEY = new Map<AttributeKey, AttributeDefinition>(
  ATTRIBUTE_DEFINITIONS.map((d) => [d.key, d as AttributeDefinition]),
);

export function attributeDefinition(key: AttributeKey): AttributeDefinition {
  const definition = DEFINITION_BY_KEY.get(key);
  if (!definition) throw new RangeError(`Unknown attribute: ${key}`);
  return definition;
}

export function attributesInGroup(group: AttributeGroup): readonly AttributeKey[] {
  return ATTRIBUTE_DEFINITIONS.filter((d) => d.group === group).map((d) => d.key);
}

export function styleSkillsInGroup(group: AttributeGroup): readonly AttributeKey[] {
  return ATTRIBUTE_DEFINITIONS.filter((d) => d.group === group && d.isStyleSkill).map((d) => d.key);
}

/** Builds a complete attribute set from a factory, guaranteeing no key is missing. */
export function buildAttributes(factory: (key: AttributeKey, definition: AttributeDefinition) => number): AttributeSet {
  const set = {} as AttributeSet;
  for (const definition of ATTRIBUTE_DEFINITIONS) {
    set[definition.key] = factory(definition.key, definition as AttributeDefinition);
  }
  return set;
}

export function uniformAttributes(value: number): AttributeSet {
  return buildAttributes(() => value);
}

/** Highest `n` values among the given keys, descending. Missing keys contribute nothing. */
export function topValues(attributes: AttributeSet, keys: readonly AttributeKey[], n: number): number[] {
  return keys
    .map((key) => attributes[key])
    .sort((a, b) => b - a)
    .slice(0, n);
}
