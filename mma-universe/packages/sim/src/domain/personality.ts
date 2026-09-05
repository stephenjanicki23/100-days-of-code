/**
 * Hidden personality traits (brief §3).
 *
 * Personality is never shown as a number in the UI — it is inferred by the player from
 * behaviour. It drives career decisions (camp moves, contract demands, training focus),
 * modulates how much of a training week a fighter actually converts into development, and
 * shapes how they respond to defeat.
 *
 * Traits are on a 1-100 scale and are near-fixed: they drift only slowly, and only in
 * response to significant career events.
 */

export const PERSONALITY_TRAITS = [
  { key: 'discipline', label: 'Discipline', description: 'Adherence to camp, diet and weight-cut demands.' },
  { key: 'confidence', label: 'Confidence', description: 'Baseline self-belief, distinct from in-fight composure.' },
  { key: 'ego', label: 'Ego', description: 'Resistance to correction; drives friction with coaches and rivals.' },
  { key: 'aggression', label: 'Aggression', description: 'Disposition toward forcing exchanges rather than managing them.' },
  { key: 'workEthic', label: 'Work Ethic', description: 'How much of the available training load is genuinely absorbed.' },
  { key: 'loyalty', label: 'Loyalty', description: 'Attachment to a camp, coach and team.' },
  { key: 'adaptability', label: 'Adaptability', description: 'Willingness to change a game plan or a habit.' },
  { key: 'coachability', label: 'Coachability', description: 'How much value is extracted from good coaching.' },
  { key: 'riskTolerance', label: 'Risk Tolerance', description: 'Appetite for dangerous fights and dangerous exchanges.' },
  { key: 'composure', label: 'Composure', description: 'Baseline temperament under career pressure.' },
  { key: 'ambition', label: 'Ambition', description: 'Drive toward titles, bigger camps and bigger fights.' },
] as const;

export type PersonalityTraitKey = (typeof PERSONALITY_TRAITS)[number]['key'];
export type Personality = Record<PersonalityTraitKey, number>;

export const PERSONALITY_KEYS: readonly PersonalityTraitKey[] = PERSONALITY_TRAITS.map((t) => t.key);

export function buildPersonality(factory: (key: PersonalityTraitKey) => number): Personality {
  const personality = {} as Personality;
  for (const trait of PERSONALITY_TRAITS) personality[trait.key] = factory(trait.key);
  return personality;
}

/**
 * A short, human-readable read on a fighter, of the kind a scout would give. Only traits far
 * from average are mentioned — an unremarkable personality should produce an unremarkable
 * report rather than eleven hedged sentences.
 */
export function describePersonality(personality: Personality): string[] {
  const notes: string[] = [];
  const say = (condition: boolean, text: string) => {
    if (condition) notes.push(text);
  };

  say(personality.workEthic >= 80, 'Relentless worker; first in and last out of the gym.');
  say(personality.workEthic <= 30, 'Struggles to commit to a full camp.');
  say(personality.discipline <= 30, 'Persistent problems with weight and lifestyle.');
  say(personality.discipline >= 82, 'Utterly professional in preparation.');
  say(personality.ego >= 80, 'Believes they have little left to learn.');
  say(personality.coachability >= 80, 'Absorbs coaching instantly.');
  say(personality.coachability <= 30, 'Resistant to correction in the corner.');
  say(personality.loyalty >= 82, 'Deeply attached to their team.');
  say(personality.loyalty <= 28, 'Will move for the right opportunity.');
  say(personality.ambition >= 85, 'Openly chasing a title.');
  say(personality.riskTolerance >= 82, 'Takes fights nobody else wants.');
  say(personality.riskTolerance <= 25, 'Careful about who they share a cage with.');
  return notes;
}
