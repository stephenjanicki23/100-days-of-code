import { describe, expect, it } from 'vitest';
import {
  ATTRIBUTE_KEYS,
  abilityTier,
  buildAttributes,
  computeCurrentAbility,
  computeFacets,
  deriveStyle,
  fitAttributesToAbility,
  headroom,
  uniformAttributes,
  type AttributeKey,
} from '@mma/sim';

describe('ability model', () => {
  it('is monotonic: better attributes never mean lower ability', () => {
    let previous = -1;
    for (let level = 5; level <= 95; level += 5) {
      const ability = computeCurrentAbility(uniformAttributes(level));
      expect(ability).toBeGreaterThanOrEqual(previous);
      previous = ability;
    }
  });

  it('increases strictly across the range fighters actually occupy', () => {
    let previous = 0;
    for (let level = 20; level <= 85; level += 5) {
      const ability = computeCurrentAbility(uniformAttributes(level));
      expect(ability).toBeGreaterThan(previous);
      previous = ability;
    }
  });

  it('saturates at both ends of the scale by design', () => {
    // The attribute→ability mapping is anchored to a weighted facet score of 12 and 86.
    // Beyond those anchors the scale deliberately flattens: nothing a fighter can be
    // generated or trained into reaches them, and the alternative — an unbounded scale —
    // would make 0-200 meaningless.
    expect(computeCurrentAbility(uniformAttributes(8))).toBe(computeCurrentAbility(uniformAttributes(5)));
    expect(computeCurrentAbility(uniformAttributes(95))).toBe(200);
  });

  it('keeps ability inside the 0-200 scale at both extremes', () => {
    expect(computeCurrentAbility(uniformAttributes(1))).toBeGreaterThanOrEqual(1);
    expect(computeCurrentAbility(uniformAttributes(100))).toBeLessThanOrEqual(200);
  });

  it('does not punish a specialist for lacking unrelated martial arts', () => {
    // The reason facets take a best-of within each family: an elite boxer with no taekwondo
    // must not be rated below a mediocre generalist.
    const generalist = uniformAttributes(58);
    const specialist = buildAttributes((key) => {
      if (key === 'boxing') return 92;
      if (key === 'strikingAccuracy' || key === 'strikingDefense' || key === 'footwork') return 84;
      if (key === 'taekwondo' || key === 'sanda' || key === 'karate') return 12;
      return 58;
    });
    expect(computeCurrentAbility(specialist)).toBeGreaterThan(computeCurrentAbility(generalist));
  });

  it('fits attributes to a target ability across the whole range', () => {
    for (const target of [45, 80, 110, 140, 175, 195]) {
      const { attributes, achievedAbility } = fitAttributesToAbility(target, { boxing: 18, taekwondo: -20 });
      expect(Math.abs(achievedAbility - target)).toBeLessThan(1.5);
      expect(computeCurrentAbility(attributes)).toBeCloseTo(achievedAbility, 5);
      for (const key of ATTRIBUTE_KEYS) {
        expect(attributes[key]).toBeGreaterThanOrEqual(1);
        expect(attributes[key]).toBeLessThanOrEqual(100);
      }
    }
  });

  it('shrinks headroom toward zero as a fighter approaches their potential', () => {
    expect(headroom(60, 180)).toBeGreaterThan(headroom(120, 180));
    expect(headroom(120, 180)).toBeGreaterThan(headroom(175, 180));
    expect(headroom(180, 180)).toBe(0);
    // A fighter who has passed their ceiling gains nothing, and must not go negative.
    expect(headroom(190, 180)).toBe(0);
  });

  it('tiers ability into ordered, non-overlapping bands', () => {
    expect(abilityTier(180).key).toBe('elite');
    expect(abilityTier(120).key).toBe('fringe');
    expect(abilityTier(30).key).toBe('amateur');
  });
});

describe('emergent style', () => {
  it('derives the style implied by a fighter\'s attribute shape', () => {
    const wrestler = buildAttributes((key: AttributeKey) => {
      if (['freestyleWrestling', 'chainWrestling', 'takedownAbility', 'folkstyleWrestling'].includes(key)) return 88;
      if (['cardio', 'topControl'].includes(key)) return 76;
      if (['taekwondo', 'karate', 'strikingPower'].includes(key)) return 28;
      return 52;
    });
    const style = deriveStyle(wrestler);
    expect(['chain_wrestler', 'wrestle_boxer', 'ground_and_pound_wrestler']).toContain(style.primary.key);
    expect(style.strength.facet).toBe('wrestlingOffense');
  });

  it('changes the derived style when the underlying attributes change', () => {
    // Style is a projection, not a label — this is what lets a fighter's identity drift over
    // a career without anything reassigning them.
    const base = buildAttributes(() => 55);
    const striker = { ...base, boxing: 90, strikingPower: 85, aggression: 82, strikingDefense: 30 };
    const grappler = { ...base, brazilianJiuJitsu: 92, submissionAbility: 88, guardGame: 85 };
    expect(deriveStyle(striker).primary.key).not.toBe(deriveStyle(grappler).primary.key);
  });

  it('always reports a distinct primary and secondary style', () => {
    const style = deriveStyle(uniformAttributes(60));
    expect(style.primary.key).not.toBe(style.secondary.key);
    expect(style.ranking.length).toBeGreaterThan(2);
  });

  it('computes facets on the same 0-100 scale as attributes', () => {
    const facets = computeFacets(uniformAttributes(70));
    for (const value of Object.values(facets)) {
      expect(value).toBeGreaterThan(60);
      expect(value).toBeLessThan(80);
    }
  });
});
