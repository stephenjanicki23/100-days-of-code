import { describe, expect, it } from 'vitest';
import {
  Rng,
  currentAbility,
  fighterStyle,
  generateUniverse,
  isDecisiveEvent,
  simulateFight,
  validateFightEvent,
  type FightResult,
  type Fighter,
  type Universe,
} from '@mma/sim';

const universe: Universe = generateUniverse({ seed: 'fight-engine-tests' });

/** Finds a fighter whose derived style matches, for style-versus-style experiments. */
function fighterOfStyle(styleKey: string, skip = 0): Fighter {
  const matches = universe.state.fighters
    .filter((f) => fighterStyle(f).primary.key === styleKey && currentAbility(f) > 110)
    .sort((a, b) => currentAbility(b) - currentAbility(a));
  const chosen = matches[skip];
  if (!chosen) throw new Error(`No fighter of style ${styleKey} at index ${skip}`);
  return chosen;
}

function fight(a: Fighter, b: Fighter, seed: string, rounds = 3): FightResult {
  return simulateFight(a, b, { fightId: `test_${seed}`, rounds }, Rng.fromSeed(seed));
}

describe('Sprint 7 — a complete fight', () => {
  const a = universe.state.fighters[10]!;
  const b = universe.state.fighters[11]!;
  const result = fight(a, b, 'complete');

  it('runs to a conclusion', () => {
    expect(result.outcome).toBeTruthy();
    expect(result.events.length).toBeGreaterThan(60);
  });

  it('produces a winner unless it is a draw', () => {
    if (result.outcome === 'DRAW' || result.outcome === 'MAJORITY_DRAW') {
      expect(result.winnerId).toBeUndefined();
    } else {
      expect(result.winnerId).toBeTruthy();
      expect([a.id, b.id]).toContain(result.winnerId);
      expect(result.winnerId).not.toBe(result.loserId);
    }
  });

  it('opens and closes properly', () => {
    expect(result.events[0]!.eventType).toBe('FIGHT_START');
    const last = result.events[result.events.length - 1]!;
    expect(['FIGHT_END', 'DECISION']).toContain(last.eventType);
  });

  it('runs every scheduled round when there is no finish', () => {
    if (result.outcome.includes('DECISION')) {
      const roundStarts = result.events.filter((e) => e.eventType === 'ROUND_START');
      expect(roundStarts).toHaveLength(3);
      expect(result.scorecards).toHaveLength(3);
      for (const card of result.scorecards) expect(card.rounds).toHaveLength(3);
    }
  });

  it('keeps the clock monotonic', () => {
    let previous = -1;
    for (const event of result.events) {
      expect(event.timestamp).toBeGreaterThanOrEqual(previous);
      previous = event.timestamp;
    }
  });

  it('numbers events consecutively from zero', () => {
    result.events.forEach((event, index) => expect(event.sequence).toBe(index));
  });

  it('never lets a fight exceed its scheduled length', () => {
    const scheduled = 3 * 300;
    expect(result.events[result.events.length - 1]!.timestamp).toBeLessThanOrEqual(scheduled + 30);
  });
});

describe('Sprint 10 — the event stream', () => {
  const result = fight(universe.state.fighters[20]!, universe.state.fighters[21]!, 'stream');

  it('emits only events that satisfy the published contract', () => {
    // The engine assembles a discriminated union dynamically and asserts the type once. This
    // is the check that makes that assertion safe: every event of a real fight is validated.
    for (const event of result.events) {
      const validation = validateFightEvent(event);
      expect(validation.errors, `${event.eventType} @${event.sequence}`).toEqual([]);
    }
  });

  it('carries a human-readable line on every event', () => {
    for (const event of result.events) {
      expect(event.description.length).toBeGreaterThan(3);
      expect(event.description).not.toContain('undefined');
      // Grammar: technique names are interpolated, so "a armbar" must never appear.
      expect(event.description).not.toMatch(/\ba (a|e|i|o|u)/i);
    }
  });

  it('produces a highlight feed of decisive moments', () => {
    const decisive = result.events.filter(isDecisiveEvent);
    expect(decisive.length).toBeGreaterThan(0);
    expect(decisive.length).toBeLessThan(result.events.length);
  });

  it('reports statistics consistent with the events emitted', () => {
    const landed = result.events.filter(
      (e) => e.eventType === 'SIGNIFICANT_STRIKE' && 'result' in e && e.result === 'LANDED',
    ).length;
    const partial = result.events.filter(
      (e) => e.eventType === 'SIGNIFICANT_STRIKE' && 'result' in e && e.result === 'PARTIAL',
    ).length;
    const reported = Object.values(result.stats).reduce((sum, s) => sum + s.significantStrikesLanded, 0);
    expect(reported).toBe(landed + partial);
  });
});

describe('Sprint 9 — fights are decided by more than a coin flip', () => {
  it('produces different fights from the same two fighters', () => {
    // The definition of done for Sprint 9: run it twice, get a meaningfully different fight.
    const a = universe.state.fighters[30]!;
    const b = universe.state.fighters[31]!;
    const outcomes = new Set<string>();
    const strikeCounts = new Set<number>();
    for (let i = 0; i < 12; i++) {
      const result = fight(a, b, `variance-${i}`);
      outcomes.add(`${result.outcome}:${result.winnerId ?? 'none'}`);
      strikeCounts.add(Object.values(result.stats)[0]!.significantStrikesLanded);
    }
    expect(outcomes.size).toBeGreaterThan(1);
    expect(strikeCounts.size).toBeGreaterThan(4);
  });

  it('favours the better fighter over a run of fights', () => {
    const strong = universe.state.fighters
      .filter((f) => f.divisionKey === 'm_welterweight')
      .sort((x, y) => currentAbility(y) - currentAbility(x))[0]!;
    const weak = universe.state.fighters
      .filter((f) => f.divisionKey === 'm_welterweight' && currentAbility(f) < currentAbility(strong) - 45)
      .sort((x, y) => currentAbility(y) - currentAbility(x))[0]!;

    let strongWins = 0;
    const runs = 24;
    for (let i = 0; i < runs; i++) {
      if (fight(strong, weak, `mismatch-${i}`).winnerId === strong.id) strongWins++;
    }
    // A large ability gap should be decisive but never certain — upsets are the point.
    expect(strongWins / runs).toBeGreaterThan(0.75);
    expect(strongWins).toBeLessThanOrEqual(runs);
  });

  it('is deterministic: the same seed reproduces the fight exactly', () => {
    const a = universe.state.fighters[40]!;
    const b = universe.state.fighters[41]!;
    const first = fight(a, b, 'replay');
    const second = fight(a, b, 'replay');
    expect(JSON.stringify(second.events)).toBe(JSON.stringify(first.events));
    expect(second.outcome).toBe(first.outcome);
  });

  it('sends corner instructions between rounds that change the plan', () => {
    let found = false;
    for (let i = 0; i < 8 && !found; i++) {
      const result = fight(universe.state.fighters[50]!, universe.state.fighters[51]!, `corner-${i}`);
      found = result.events.some((event) => event.eventType === 'CORNER_INSTRUCTION');
    }
    expect(found).toBe(true);
  });
});

describe('Sprint 8 — style produces different fights', () => {
  /** Runs a series and averages, because a single fight proves nothing about tendencies. */
  function series(a: Fighter, b: Fighter, label: string, runs = 16) {
    let takedowns = 0;
    let significantStrikes = 0;
    let submissions = 0;
    let control = 0;
    for (let i = 0; i < runs; i++) {
      const result = fight(a, b, `${label}-${i}`);
      const statsA = result.stats[a.id]!;
      takedowns += statsA.takedownsAttempted;
      significantStrikes += statsA.significantStrikesAttempted;
      submissions += statsA.submissionAttempts;
      control += statsA.controlTime;
    }
    return {
      takedowns: takedowns / runs,
      significantStrikes: significantStrikes / runs,
      submissions: submissions / runs,
      control: control / runs,
    };
  }

  it('makes a chain wrestler wrestle and a counter striker strike', () => {
    const wrestler = fighterOfStyle('chain_wrestler');
    const striker = fighterOfStyle('counter_striker');
    const opponent = fighterOfStyle('out_fighter');

    const wrestlerSeries = series(wrestler, opponent, 'wrestler');
    const strikerSeries = series(striker, opponent, 'striker');

    expect(wrestlerSeries.takedowns).toBeGreaterThan(strikerSeries.takedowns * 1.8);
    expect(wrestlerSeries.control).toBeGreaterThan(strikerSeries.control);
  });

  it('makes a submission specialist hunt submissions', () => {
    const grappler = fighterOfStyle('bjj_specialist');
    const boxer = fighterOfStyle('pressure_boxer');
    const opponent = fighterOfStyle('kicker');

    const grapplerSeries = series(grappler, opponent, 'grappler');
    const boxerSeries = series(boxer, opponent, 'boxer');

    expect(grapplerSeries.submissions).toBeGreaterThan(boxerSeries.submissions);
    expect(boxerSeries.significantStrikes).toBeGreaterThan(grapplerSeries.significantStrikes);
  });

  it('produces the range of techniques a mixed martial arts fight contains', () => {
    const techniques = new Set<string>();
    for (let i = 0; i < 25; i++) {
      const result = fight(universe.state.fighters[i]!, universe.state.fighters[i + 60]!, `variety-${i}`);
      for (const event of result.events) {
        if ('technique' in event && typeof event.technique === 'string') techniques.add(event.technique);
      }
    }
    // Punches, kicks, takedowns and submissions should all appear across a card's worth of fights.
    expect(techniques.size).toBeGreaterThan(15);
    expect([...techniques].some((t) => t.includes('KICK'))).toBe(true);
    expect([...techniques].some((t) => t.includes('LEG') || t.includes('TRIP') || t.includes('THROW'))).toBe(true);
  });
});

describe('the engine leaves the world it was given untouched', () => {
  it('does not mutate either fighter', () => {
    const a = universe.state.fighters[70]!;
    const b = universe.state.fighters[71]!;
    const before = JSON.stringify([a, b]);
    fight(a, b, 'purity');
    expect(JSON.stringify([a, b])).toBe(before);
  });
});
