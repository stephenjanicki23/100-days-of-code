/**
 * Division rankings (brief §24).
 *
 * Rankings are explicitly *not* a win/loss table. A fighter's standing is a points total
 * blended from demonstrated ability, the quality of what they have beaten, recent form,
 * activity and dominance — which is why a 12-0 regional fighter does not out-rank a 19-5
 * contender who has beaten three ranked opponents.
 *
 * At genesis there is no fight history to draw on, so seeding leans on ability and record.
 * From Phase 4 onward `applyFightResult` moves fighters incrementally as results come in,
 * rather than recomputing the table from scratch — which is what keeps rankings O(1) per
 * fight instead of O(roster) per day.
 */

import { clamp } from '../core/math.ts';
import type { SimDate } from '../core/time.ts';
import { daysBetween } from '../core/time.ts';
import { RANKED_POSITIONS } from '../domain/divisions.ts';
import { currentAbility, type Fighter } from '../domain/fighter.ts';
import type { Promotion, RankingEntry } from '../domain/promotion.ts';

/** Points contributed by a fighter's own demonstrated level and career results. */
export function rankingPoints(fighter: Fighter, onDate: SimDate): number {
  const ability = currentAbility(fighter);
  const { wins, losses, winStreak, lossStreak, koWins, submissionWins } = fighter.record;

  // Inactivity costs standing — a fighter who has not competed in two years slides.
  const daysIdle = fighter.career.lastFightDate ? daysBetween(fighter.career.lastFightDate, onDate) : 720;
  const activityPenalty = clamp((daysIdle - 270) / 30, 0, 22);

  // Finishes count for more than decisions: dominance is part of the criteria.
  const finishBonus = Math.min(koWins + submissionWins, 12) * 1.1;

  // Win rate, independent of volume. Ability dominates this formula by design — a ranking
  // that ignored demonstrated level would put padded records above real contenders — but
  // without a win-rate term a very talented fighter could top a division on a losing record,
  // which no ranking body would ever publish.
  const contested = wins + losses;
  const winRateTerm = contested >= 3 ? (wins / contested - 0.5) * 70 : 0;

  return clamp(
    ability * 1.05 +
      // Accumulated wins matter, but with a firm ceiling: a long, padded record must not
      // out-rank a demonstrably better fighter. This is the core of §24's "do not simply
      // use win/loss record".
      Math.min(wins, 18) * 0.75 -
      losses * 0.9 +
      // A streak is evidence, not a substitute for level, so its contribution is capped.
      Math.min(winStreak, 6) * 2.8 -
      lossStreak * 5.2 +
      finishBonus +
      winRateTerm +
      fighter.career.momentum * 0.14 +
      fighter.career.reputation * 0.16 +
      fighter.career.popularity * 0.06 +
      fighter.career.titleDefenses * 6 -
      activityPenalty,
    0,
    400,
  );
}

/**
 * Builds the ranking table for one division from scratch. Used at genesis and as the
 * periodic reconciliation pass; per-fight movement is handled incrementally elsewhere.
 */
/**
 * Builds the ranking table for one division.
 *
 * `championId` matters more than it looks. A championship is a *fact*, not a computed
 * position: a challenger who beats the champion is the champion, even if the deposed
 * titleholder still scores higher on every ranking criterion. Passing the champion in pins
 * rank 0 and ranks everyone else beneath them. Omitting it — as genesis does, when no title
 * has ever been contested — falls back to ranking by points alone.
 */
export function buildDivisionRankings(
  promotion: Promotion,
  divisionKey: string,
  fighters: readonly Fighter[],
  onDate: SimDate,
  previous: readonly RankingEntry[] = [],
  championId?: string,
): RankingEntry[] {
  const previousRankById = new Map(previous.map((entry) => [entry.fighterId, entry.rank]));

  const scored = fighters
    .filter((f) => f.divisionKey === divisionKey && f.promotionId === promotion.id && f.status !== 'retired')
    .map((fighter) => ({ fighter, points: rankingPoints(fighter, onDate) }))
    .sort((a, b) => b.points - a.points || a.fighter.id.localeCompare(b.fighter.id));

  const champion = championId ? scored.find((entry) => entry.fighter.id === championId) : undefined;
  const eligible = champion
    ? [champion, ...scored.filter((entry) => entry.fighter.id !== championId)]
    : scored;
  // With no champion the division has a number one contender, not a titleholder, so ranks
  // start at 1 and the rank-0 slot stays empty. Filling it by points made a vacant division
  // look occupied — and the matchmaker, reading rank 0 as the champion, then excluded the
  // division's best fighter from the bout meant to fill the belt.
  const firstRank = champion ? 0 : 1;

  const limit = Math.min(eligible.length, promotion.ranksPerDivision + 1);
  const entries: RankingEntry[] = [];
  for (let i = 0; i < limit; i++) {
    const { fighter, points } = eligible[i]!;
    entries.push({
      promotionId: promotion.id,
      divisionKey,
      fighterId: fighter.id,
      rank: firstRank + i, // 0 is the champion; 1..N are the ranked contenders.
      points: Math.round(points * 10) / 10,
      previousRank: previousRankById.get(fighter.id),
      updatedDate: onDate,
    });
  }
  return entries;
}

/** Rebuilds every division of every promotion that maintains rankings. */
/**
 * Rebuilds every division of every promotion that maintains rankings.
 *
 * `championFor` is the authority on who holds each belt. It is supplied rather than inferred
 * so the title records stay the single source of truth — a champion keeps the belt through a
 * periodic recompute and loses it only in the cage.
 */
export function buildAllRankings(
  promotions: readonly Promotion[],
  fighters: readonly Fighter[],
  onDate: SimDate,
  previous: readonly RankingEntry[] = [],
  championFor?: (promotionId: string, divisionKey: string) => string | undefined,
): RankingEntry[] {
  const rankings: RankingEntry[] = [];
  for (const promotion of promotions) {
    if (promotion.ranksPerDivision <= 0) continue;
    for (const divisionKey of promotion.divisionKeys) {
      const previousForDivision = previous.filter(
        (r) => r.promotionId === promotion.id && r.divisionKey === divisionKey,
      );
      // A sitting champion keeps the belt through a periodic recompute; they only lose it in
      // the cage. An active champion who has retired or moved division vacates it.
      // Once title records exist they are the only authority: `championFor` returning
      // undefined means the belt really is vacant, and must not be back-filled from the
      // previous table. The fallback exists solely for genesis, before any title is created.
      const sitting = championFor
        ? championFor(promotion.id, divisionKey)
        : previousForDivision.find((entry) => entry.rank === 0)?.fighterId;
      const stillActive = fighters.some(
        (f) => f.id === sitting && f.status !== 'retired' && f.divisionKey === divisionKey,
      );
      rankings.push(
        ...buildDivisionRankings(
          promotion,
          divisionKey,
          fighters,
          onDate,
          previousForDivision,
          stillActive ? sitting : undefined,
        ),
      );
    }
  }
  return rankings;
}

export { RANKED_POSITIONS };
