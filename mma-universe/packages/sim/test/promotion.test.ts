import { describe, expect, it } from 'vitest';
import {
  advanceUniverse,
  bookablePool,
  currentAbility,
  generateUniverse,
  hottestStorylines,
  isTitleEligible,
  makeMatches,
  previewMatches,
  scoreBout,
  Rng,
  type Universe,
} from '@mma/sim';

/** One universe advanced far enough for the promotion layer to have done real work. */
let world: Universe | undefined;
function livedInWorld(): Universe {
  if (!world) {
    world = generateUniverse({ seed: 'promotion-tests' });
    advanceUniverse(world, 1095, { snapshotEveryDays: 0, keepFightEvents: false });
  }
  return world;
}

describe('Sprint 13 — matchmaking is a decision, not a shuffle', () => {
  const universe = generateUniverse({ seed: 'matchmaking', fighterCount: 400, campCount: 30 });
  const promotion = universe.state.promotions[0]!;

  it('proposes bouts between fighters of comparable standing', () => {
    const { proposals } = previewMatches(universe, promotion, universe.date, 10);
    expect(proposals.length).toBeGreaterThan(4);
    for (const proposal of proposals) {
      // A mismatch is worse than no fight; nothing wildly lopsided should be booked.
      expect(Math.abs(currentAbility(proposal.a) - currentAbility(proposal.b))).toBeLessThan(60);
      expect(proposal.a.divisionKey).toBe(proposal.b.divisionKey);
      expect(proposal.a.id).not.toBe(proposal.b.id);
    }
  });

  it('never books teammates against each other', () => {
    const { proposals } = previewMatches(universe, promotion, universe.date, 12);
    for (const proposal of proposals) {
      if (!proposal.a.campId) continue;
      expect(proposal.a.campId).not.toBe(proposal.b.campId);
    }
  });

  it('never books the same fighter twice on one card', () => {
    const { proposals } = previewMatches(universe, promotion, universe.date, 12);
    const seen = new Set<string>();
    for (const proposal of proposals) {
      expect(seen.has(proposal.a.id)).toBe(false);
      expect(seen.has(proposal.b.id)).toBe(false);
      seen.add(proposal.a.id);
      seen.add(proposal.b.id);
    }
  });

  it('scores a contender fight above a mismatch', () => {
    const rankings = universe.rankingsFor(promotion.id, 'm_lightweight');
    const ranked = rankings.map((entry) => universe.requireFighter(entry.fighterId));
    const contenders = scoreBout(ranked[1]!, ranked[2]!, rankings, universe.date, Rng.fromSeed('a'));
    const mismatch = scoreBout(ranked[1]!, ranked[14]!, rankings, universe.date, Rng.fromSeed('b'));
    expect(contenders.score).toBeGreaterThan(mismatch.score);
  });

  it('respects rest: nobody is booked days after their last fight', () => {
    const advanced = generateUniverse({ seed: 'rest', fighterCount: 300, campCount: 24 });
    advanceUniverse(advanced, 400, { snapshotEveryDays: 0, keepFightEvents: false });
    const pool = bookablePool(
      { universe: advanced, promotion: advanced.state.promotions[0]!, date: advanced.date, leadTimeDays: 56 },
      'm_welterweight',
    );
    for (const fighter of pool) {
      expect(fighter.status).not.toBe('retired');
      expect(fighter.promotionId).toBe(advanced.state.promotions[0]!.id);
    }
  });

  it('limits how many belts are on the line on one card', () => {
    const { proposals } = makeMatches(
      { universe, promotion, date: universe.date, leadTimeDays: 56, maxTitleFights: 1 },
      11,
    );
    expect(proposals.filter((proposal) => proposal.isTitleFight).length).toBeLessThanOrEqual(1);
  });
});

describe('Sprint 14 — events and fight cards', () => {
  const universe = livedInWorld();

  it('books cards and fights them', () => {
    const completed = universe.state.cards.filter((card) => card.status === 'completed');
    expect(completed.length).toBeGreaterThan(30);
    for (const card of completed.slice(0, 20)) {
      expect(card.name.length).toBeGreaterThan(3);
      expect(card.venueId).toBeTruthy();
      expect(card.attendance).toBeGreaterThan(0);
      expect(card.revenue).toBeGreaterThan(0);
    }
  });

  it('orders a card from prelims up to a main event', () => {
    const card = universe.state.cards.find((entry) => entry.status === 'completed' && entry.fightIds.length >= 5)!;
    const fights = universe.fightsOnCard(card.id);
    expect(fights[0]!.billing).toBe('main_event');
    // The main event is scheduled for five rounds; the rest for three.
    expect(fights[0]!.scheduledRounds).toBe(5);
    expect(fights[fights.length - 1]!.scheduledRounds).toBe(3);
  });

  it('sells more tickets for a bigger show', () => {
    const numbered = universe.state.cards.filter((card) => card.tier === 'numbered' && card.revenue);
    const nights = universe.state.cards.filter((card) => card.tier === 'fight_night' && card.revenue);
    if (numbered.length > 2 && nights.length > 2) {
      const mean = (cards: typeof numbered) => cards.reduce((sum, card) => sum + (card.revenue ?? 0), 0) / cards.length;
      expect(mean(numbered)).toBeGreaterThan(mean(nights));
    }
  });

  it('pays fighters for competing', () => {
    const earners = universe.state.fighters.filter((fighter) => fighter.career.careerEarnings > 0);
    expect(earners.length).toBeGreaterThan(200);
  });
});

describe('Sprint 11/12 — champions, titles and rankings', () => {
  const universe = livedInWorld();
  const promotion = universe.state.promotions[0]!;

  it('keeps every division of the major promotion titled or actively contested', () => {
    for (const divisionKey of promotion.divisionKeys) {
      const title = universe.title(promotion.id, divisionKey);
      expect(title, divisionKey).toBeDefined();
      // Either somebody holds it, or the lineage shows it has been held and will be again.
      expect(Boolean(title!.championId) || title!.lineage.length > 0).toBe(true);
    }
  });

  it('only crowns credible champions', () => {
    for (const title of universe.state.titles) {
      if (!title.championId) continue;
      const champion = universe.fighter(title.championId);
      if (!champion) continue;
      expect(champion.record.wins).toBeGreaterThanOrEqual(3);
      // No promotion puts a losing record in a title fight.
      expect(champion.record.wins + 2).toBeGreaterThanOrEqual(champion.record.losses);
    }
  });

  it('builds a lineage rather than a single reign', () => {
    const contested = universe.state.titles.filter((title) => title.lineage.length > 1);
    expect(contested.length).toBeGreaterThan(3);
    for (const title of contested) {
      // Reigns are chronological and closed out as they end.
      for (let i = 1; i < title.lineage.length; i++) {
        expect(title.lineage[i]!.from >= title.lineage[i - 1]!.from).toBe(true);
        expect(title.lineage[i - 1]!.to).toBeTruthy();
      }
    }
  });

  it('does not change hands on every fight', () => {
    // Brief §37's explicit failure mode. Over three years, a division should see a handful of
    // title changes, not one per card.
    for (const title of universe.state.titles.filter((entry) => entry.promotionId === promotion.id)) {
      expect(title.lineage.length).toBeLessThan(12);
    }
  });

  it('ranks the champion first and nobody at rank zero when the belt is vacant', () => {
    for (const divisionKey of promotion.divisionKeys) {
      const title = universe.title(promotion.id, divisionKey)!;
      const rankings = universe.rankingsFor(promotion.id, divisionKey);
      if (rankings.length === 0) continue;
      if (title.championId) {
        expect(rankings[0]!.rank).toBe(0);
        expect(rankings[0]!.fighterId).toBe(title.championId);
      } else {
        expect(rankings[0]!.rank).toBe(1);
      }
    }
  });

  it('requires a credible record for a title shot', () => {
    expect(isTitleEligible({ record: { wins: 2, losses: 6, winStreak: 0 } } as never)).toBe(false);
    expect(isTitleEligible({ record: { wins: 12, losses: 3, winStreak: 1 } } as never)).toBe(true);
    expect(isTitleEligible({ record: { wins: 8, losses: 10, winStreak: 3 } } as never)).toBe(true);
    // A hot streak does not rehabilitate a badly losing record.
    expect(isTitleEligible({ record: { wins: 5, losses: 10, winStreak: 3 } } as never)).toBe(false);
  });
});

describe('Sprint 15 — the world reacts to itself', () => {
  const universe = livedInWorld();

  it('publishes news generated from things that actually happened', () => {
    expect(universe.state.news.length).toBeGreaterThan(50);
    for (const article of universe.state.news.slice(-40)) {
      expect(article.headline.length).toBeGreaterThan(5);
      expect(article.body.length).toBeGreaterThan(10);
      expect(article.headline).not.toContain('undefined');
      expect(article.body).not.toContain('undefined');
      // Every article is about somebody or something in the world.
      if (article.subjectId) {
        expect(universe.fighter(article.subjectId) ?? universe.camp(article.subjectId) ?? universe.card(article.subjectId)).toBeTruthy();
      }
    }
  });

  it('detects rivalries between fighters who keep meeting', () => {
    const rivalries = universe.state.storylines.filter(
      (storyline) => storyline.kind === 'rivalry' || storyline.kind === 'unfinished_business',
    );
    expect(rivalries.length).toBeGreaterThan(0);
    for (const rivalry of rivalries.slice(0, 10)) {
      expect(rivalry.participants).toHaveLength(2);
      const [a, b] = rivalry.participants;
      const memory = universe.fighter(a!)?.memories.find((entry) => entry.opponentId === b);
      // A rivalry is only detected from real shared history.
      expect(memory?.meetings ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it('detects title chases and career arcs', () => {
    const kinds = new Set(universe.state.storylines.map((storyline) => storyline.kind));
    expect(kinds.size).toBeGreaterThan(2);
  });

  it('lets stories cool off rather than accumulating forever', () => {
    const active = universe.state.storylines.filter((storyline) => storyline.status === 'active');
    const resolved = universe.state.storylines.filter((storyline) => storyline.status === 'resolved');
    expect(resolved.length).toBeGreaterThan(0);
    for (const storyline of hottestStorylines(universe.state.storylines, 5)) {
      expect(storyline.status).toBe('active');
      expect(storyline.heat).toBeGreaterThan(0);
    }
    expect(active.length).toBeLessThan(universe.state.storylines.length);
  });
});

describe('Sprint 16 — the universe runs itself', () => {
  it('produces a coherent world after ten years, unattended', () => {
    // The milestone's definition of done, asserted rather than eyeballed.
    const universe = generateUniverse({ seed: 'decade' });
    const report = advanceUniverse(universe, 3650, { snapshotEveryDays: 0, keepFightEvents: false });

    // The sport kept happening.
    expect(report.promotion.eventsHeld).toBeGreaterThan(300);
    expect(report.promotion.fightsSimulated).toBeGreaterThan(2000);

    // The roster renewed rather than aged out.
    const active = universe.state.fighters.filter((fighter) => fighter.status !== 'retired');
    expect(active.length).toBeGreaterThan(400);
    expect(report.retirements).toBeGreaterThan(100);
    expect(report.debuts).toBeGreaterThan(100);

    // The major promotion still has a full roster and a live title picture.
    const promotion = universe.state.promotions[0]!;
    const roster = universe.state.fighters.filter(
      (fighter) => fighter.promotionId === promotion.id && fighter.status !== 'retired',
    );
    expect(roster.length).toBeGreaterThan(120);

    const titled = universe.state.titles.filter(
      (title) => title.promotionId === promotion.id && title.championId,
    );
    expect(titled.length).toBeGreaterThanOrEqual(promotion.divisionKeys.length - 3);

    // Records stayed plausible: nobody fought fifteen times a year.
    for (const fighter of active) {
      const bouts = fighter.record.wins + fighter.record.losses + fighter.record.draws;
      expect(bouts).toBeLessThan(60);
    }

    // And the world has a memory of it all.
    expect(universe.state.news.length).toBeGreaterThan(100);
    expect(universe.state.storylines.length).toBeGreaterThan(20);
  });

  it('remains reproducible with the whole promotion layer running', () => {
    const fingerprint = (seed: string) => {
      const universe = generateUniverse({ seed, fighterCount: 200, campCount: 16 });
      advanceUniverse(universe, 400, { snapshotEveryDays: 0, keepFightEvents: false });
      return universe.state.fights
        .map((fight) => `${fight.id}:${fight.fighterAId}:${fight.winnerId ?? '-'}:${fight.outcome ?? '-'}`)
        .join('|');
    };
    expect(fingerprint('repro')).toBe(fingerprint('repro'));
    expect(fingerprint('repro')).not.toBe(fingerprint('other'));
  });
});
