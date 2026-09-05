import { describe, expect, it } from 'vitest';
import {
  BASE_MONTHLY_GAIN,
  BASE_WEEKLY_GAIN,
  Rng,
  applyCampSpecialisation,
  campQualityFactor,
  coachingFactor,
  computeFatigue,
  computeTrainingWeek,
  conditionFactor,
  currentAbility,
  declineRatePerYear,
  discipline,
  generateCamp,
  generateFighter,
  growthFactor,
  personalityFactor,
  type Camp,
  type Fighter,
} from '@mma/sim';

function makeCamp(overrides: Partial<Camp> = {}): Camp {
  const { camp } = generateCamp(Rng.fromSeed('test-camp'), {
    id: 'camp_00001',
    date: '2026-01-05',
    reputation: 70,
    coachIdFactory: (() => {
      let n = 0;
      return () => `coach_${++n}`;
    })(),
  });
  return { ...camp, ...overrides };
}

function makeFighter(overrides: Partial<Fighter> = {}): Fighter {
  const fighter = generateFighter(Rng.fromSeed('test-fighter'), {
    id: 'fighter_00001',
    date: '2026-01-05',
    divisionKey: 'm_lightweight',
  });
  return { ...fighter, ...overrides };
}

describe('camp specialisation bonuses (brief §8)', () => {
  it('applies the brief\'s worked example exactly: 0.40 base × 1.10 wrestling = 0.44', () => {
    const camp = makeCamp({
      specialisations: [{ disciplineKey: 'freestyle_wrestling', tier: 1, multiplier: 1.1 }],
    });
    // `freestyleWrestling` is the discipline's headline attribute, so it receives the full
    // multiplier rather than a fraction of it.
    const gain = applyCampSpecialisation(BASE_MONTHLY_GAIN, camp, 'freestyleWrestling');
    expect(gain).toBeCloseTo(0.44, 10);
  });

  it('leaves attributes the discipline does not train untouched', () => {
    const camp = makeCamp({
      specialisations: [{ disciplineKey: 'freestyle_wrestling', tier: 1, multiplier: 1.1 }],
    });
    expect(applyCampSpecialisation(BASE_MONTHLY_GAIN, camp, 'boxing')).toBe(BASE_MONTHLY_GAIN);
    expect(applyCampSpecialisation(BASE_MONTHLY_GAIN, camp, 'brazilianJiuJitsu')).toBe(BASE_MONTHLY_GAIN);
  });

  it('gives a discipline\'s peripheral attributes a proportionally smaller share', () => {
    const camp = makeCamp({
      specialisations: [{ disciplineKey: 'freestyle_wrestling', tier: 1, multiplier: 1.1 }],
    });
    const headline = applyCampSpecialisation(1, camp, 'freestyleWrestling');
    const peripheral = applyCampSpecialisation(1, camp, 'scrambling');
    expect(headline).toBeGreaterThan(peripheral);
    expect(peripheral).toBeGreaterThan(1);
    // Scrambling is weighted 0.35 against freestyle wrestling's 1.0, so it takes 35% of the bonus.
    expect(peripheral).toBeCloseTo(1 + 0.1 * 0.35, 6);
  });

  it('is multiplicative, never a flat award', () => {
    const camp = makeCamp({ specialisations: [{ disciplineKey: 'bjj', tier: 1, multiplier: 1.12 }] });
    const small = applyCampSpecialisation(0.1, camp, 'brazilianJiuJitsu');
    const large = applyCampSpecialisation(1.0, camp, 'brazilianJiuJitsu');
    // A flat bonus would add the same amount to both; a multiplier scales with the base.
    expect(large / small).toBeCloseTo(10, 6);
  });

  it('compounds stacked specialisations that train the same attribute', () => {
    const camp = makeCamp({
      specialisations: [
        { disciplineKey: 'bjj', tier: 1, multiplier: 1.1 },
        { disciplineKey: 'submission_grappling', tier: 2, multiplier: 1.05 },
      ],
    });
    const stacked = applyCampSpecialisation(1, camp, 'submissionAbility');
    const single = applyCampSpecialisation(1, camp, 'guardGame');
    expect(stacked).toBeGreaterThan(single);
    expect(discipline('bjj').attributeWeights.submissionAbility).toBeGreaterThan(0);
  });
});

describe('development multipliers', () => {
  it('rates a better camp higher than no camp at all', () => {
    const elite = makeCamp({ facilities: { training: 95, medical: 90, sportsScience: 92, recovery: 90 }, culture: { discipline: 90, intensity: 70, cohesion: 88 } });
    const poor = makeCamp({ facilities: { training: 20, medical: 15, sportsScience: 12, recovery: 18 }, culture: { discipline: 25, intensity: 60, cohesion: 30 } });
    expect(campQualityFactor(elite)).toBeGreaterThan(campQualityFactor(poor));
    expect(campQualityFactor(poor)).toBeGreaterThan(campQualityFactor(undefined) * 0.9);
  });

  it('counts only the best-matched coach for an attribute', () => {
    const strong = { id: 'c1', firstName: 'A', lastName: 'B', role: 'striking' as const, disciplineKey: 'boxing', ability: 95, manManagement: 90, reputation: 80, birthYear: 1980, loyalty: 70 };
    const weak = { ...strong, id: 'c2', ability: 30, manManagement: 30 };
    const one = coachingFactor([strong], 'boxing', 70);
    const many = coachingFactor([strong, weak, { ...weak, id: 'c3' }], 'boxing', 70);
    // Six coaches must not develop a jab six times faster than one.
    expect(many).toBeCloseTo(one, 10);
    expect(one).toBeGreaterThan(1);
  });

  it('lets a coachable fighter extract more from the same coaching', () => {
    const coach = { id: 'c1', firstName: 'A', lastName: 'B', role: 'striking' as const, disciplineKey: 'boxing', ability: 92, manManagement: 88, reputation: 80, birthYear: 1980, loyalty: 70 };
    expect(coachingFactor([coach], 'boxing', 95)).toBeGreaterThan(coachingFactor([coach], 'boxing', 15));
  });

  it('penalises a professional less than a waster', () => {
    const professional = makeFighter();
    professional.personality.workEthic = 92;
    professional.personality.discipline = 90;
    professional.personality.coachability = 88;
    professional.personality.ego = 30;

    const waster = makeFighter();
    waster.personality.workEthic = 20;
    waster.personality.discipline = 18;
    waster.personality.coachability = 30;
    waster.personality.ego = 85;

    expect(personalityFactor(professional)).toBeGreaterThan(personalityFactor(waster) * 1.4);
  });

  it('suppresses development when fatigued or injured', () => {
    const fresh = makeFighter();
    fresh.condition.fatigue = 5;
    fresh.condition.injuries = [];

    const spent = makeFighter();
    spent.condition.fatigue = 90;
    spent.condition.injuries = [];

    const hurt = makeFighter();
    hurt.condition.fatigue = 5;
    hurt.condition.injuries = [
      { id: 'injury_1', fighterId: hurt.id, label: 'a knee injury', region: 'knee', severity: 'serious', startDate: '2026-01-05', expectedReturn: '2026-04-05', cause: 'training', recurrence: 0 },
    ];

    expect(conditionFactor(fresh)).toBeGreaterThan(conditionFactor(spent));
    expect(conditionFactor(fresh)).toBeGreaterThan(conditionFactor(hurt) * 3);
  });
});

describe('aging (brief §12)', () => {
  it('develops the young fastest and never stops the old entirely', () => {
    expect(growthFactor('physical', 20)).toBeGreaterThan(growthFactor('physical', 27));
    expect(growthFactor('physical', 27)).toBeGreaterThan(growthFactor('physical', 36));
    expect(growthFactor('skill', 38)).toBeGreaterThan(0);
  });

  it('ages physical attributes fastest and mental attributes slowest', () => {
    expect(declineRatePerYear('physical', 36)).toBeGreaterThan(declineRatePerYear('skill', 36));
    expect(declineRatePerYear('skill', 36)).toBeGreaterThanOrEqual(declineRatePerYear('mental', 36));
    expect(declineRatePerYear('mental', 36)).toBe(0);
  });

  it('leaves fighters in their prime undecayed', () => {
    expect(declineRatePerYear('physical', 26)).toBe(0);
    expect(declineRatePerYear('skill', 30)).toBe(0);
  });

  it('accelerates decline with age rather than applying it linearly', () => {
    const early = declineRatePerYear('physical', 33) - declineRatePerYear('physical', 32);
    const late = declineRatePerYear('physical', 40) - declineRatePerYear('physical', 39);
    expect(late).toBeGreaterThan(early);
  });

  it('lets mental attributes keep improving into a fighter\'s late thirties', () => {
    // The point of the brief's §12: an ageing fighter loses a step but reads the fight better.
    const veteran = makeFighter({ birthDate: '1989-01-05' });
    veteran.condition.fatigue = 10;
    veteran.condition.injuries = [];
    const result = computeTrainingWeek({
      fighter: veteran,
      camp: makeCamp(),
      coaches: [],
      age: 37,
      rng: Rng.fromSeed('veteran-week'),
    });
    expect(result.deltas.fightIQ ?? 0).toBeGreaterThan(0);
    expect(result.deltas.speed ?? 0).toBeLessThan(0);
  });
});

describe('the training week', () => {
  it('derives the weekly rate from the brief\'s monthly base', () => {
    expect(BASE_WEEKLY_GAIN).toBeCloseTo(BASE_MONTHLY_GAIN / (52 / 12), 10);
  });

  it('is pure — it reports changes without applying them', () => {
    const fighter = makeFighter();
    const before = { ...fighter.attributes };
    computeTrainingWeek({ fighter, camp: makeCamp(), coaches: [], age: 24, rng: Rng.fromSeed('purity') });
    expect(fighter.attributes).toEqual(before);
  });

  it('develops a prospect faster than a fighter already at their ceiling', () => {
    const prospect = makeFighter({ potentialAbility: 190 });
    prospect.condition.fatigue = 10;
    const arrived = makeFighter({ potentialAbility: currentAbility(makeFighter()) });
    arrived.condition.fatigue = 10;

    const prospectWeek = computeTrainingWeek({ fighter: prospect, camp: makeCamp(), coaches: [], age: 22, rng: Rng.fromSeed('w') });
    const arrivedWeek = computeTrainingWeek({ fighter: arrived, camp: makeCamp(), coaches: [], age: 22, rng: Rng.fromSeed('w') });

    expect(prospectWeek.abilityAfter - prospectWeek.abilityBefore).toBeGreaterThan(
      arrivedWeek.abilityAfter - arrivedWeek.abilityBefore,
    );
  });

  it('accumulates fatigue with hard training and clears it with rest', () => {
    const fighter = makeFighter();
    fighter.condition.fatigue = 40;
    fighter.training.intensity = 'extreme';
    const worked = computeFatigue(fighter, makeCamp());
    fighter.training.intensity = 'recovery';
    const rested = computeFatigue(fighter, makeCamp());
    expect(worked).toBeGreaterThan(40);
    expect(rested).toBeLessThan(40);
  });

  it('keeps fatigue inside 0-100 under any load', () => {
    const fighter = makeFighter();
    for (const intensity of ['recovery', 'light', 'moderate', 'hard', 'extreme'] as const) {
      fighter.training.intensity = intensity;
      for (const start of [0, 50, 100]) {
        fighter.condition.fatigue = start;
        const next = computeFatigue(fighter, makeCamp());
        expect(next).toBeGreaterThanOrEqual(0);
        expect(next).toBeLessThanOrEqual(100);
      }
    }
  });
});
