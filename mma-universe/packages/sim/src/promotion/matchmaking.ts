/**
 * The matchmaking engine (Sprint 13).
 *
 * This is a decision engine, not a pairing generator. A matchmaker is trying to do several
 * things at once that partly conflict: build toward a title fight, reward fighters who are
 * winning, sell tickets, avoid rematches nobody wants, and not put a prospect in with a
 * killer too early. So every candidate pairing is *scored* on those axes and the best
 * bouts are taken.
 *
 * The scoring is deliberately legible — each term is a named function of the two fighters —
 * because the failure mode of a matchmaker is not crashing, it is quietly producing cards
 * that make no sense, and that can only be diagnosed if you can see why a bout scored well.
 */

import { clamp, remap } from '../core/math.ts';
import { Rng } from '../core/rng.ts';
import { addDays, daysBetween, type SimDate } from '../core/time.ts';
import { currentAbility, isAvailable, type Fighter } from '../domain/fighter.ts';
import type { Promotion, RankingEntry } from '../domain/promotion.ts';
import type { Universe } from '../universe/universe.ts';

export interface BoutProposal {
  readonly divisionKey: string;
  readonly a: Fighter;
  readonly b: Fighter;
  /** Higher is a better fight for the promotion to make. */
  readonly score: number;
  /** Whether the belt is on the line. */
  readonly isTitleFight: boolean;
  readonly titleType?: 'undisputed' | 'interim' | 'vacant' | 'unification';
  /** Why the matchmaker made it — surfaces in the news engine and in debugging. */
  readonly rationale: string;
}

export interface MatchmakingContext {
  readonly universe: Universe;
  readonly promotion: Promotion;
  readonly date: SimDate;
  /** Days ahead the card is being built for; fighters must be free by then. */
  readonly leadTimeDays: number;
  /**
   * How many belts may be on the line. A card carries one title fight, occasionally two —
   * a promotion that ran twelve championship bouts a night would devalue all of them, and
   * every belt would change hands every few months.
   */
  readonly maxTitleFights?: number;
}

/**
 * Minimum rest between bouts. A busy fighter competes three or four times a year, not
 * thirteen: at a 56-day floor the matchmaker booked its favourites at literally the maximum
 * possible rate, and top contenders piled up fifteen fights in two seasons.
 */
const MINIMUM_TURNAROUND_DAYS = 105;

/** How long a champion is left alone between defences. */
const TITLE_DEFENCE_INTERVAL_DAYS = 200;

/**
 * Whether a fighter can be booked for a card on this date: signed, healthy by fight night,
 * rested, and not already booked.
 */
export function isBookable(
  fighter: Fighter,
  context: MatchmakingContext,
  alreadyBooked: ReadonlySet<string>,
): boolean {
  if (fighter.status === 'retired' || fighter.promotionId !== context.promotion.id) return false;
  if (alreadyBooked.has(fighter.id)) return false;

  const fightDate = addDays(context.date, context.leadTimeDays);
  // An injury that clears before the card is fine — camps are eight weeks long for a reason.
  const openInjury = fighter.condition.injuries.find((injury) => !injury.endDate);
  if (openInjury && openInjury.expectedReturn > fightDate) return false;
  if (!openInjury && !isAvailable(fighter, context.date) && fighter.status === 'injured') return false;

  if (fighter.career.lastFightDate) {
    if (daysBetween(fighter.career.lastFightDate, fightDate) < MINIMUM_TURNAROUND_DAYS) return false;
  }

  // A fighter already on an upcoming card is not available for another one. `lastFightDate`
  // cannot catch this, because the fight they are booked for has not happened yet.
  const alreadyScheduled = context.universe.state.fights.some(
    (fight) =>
      fight.status === 'scheduled' &&
      (fight.fighterAId === fighter.id || fight.fighterBId === fighter.id),
  );
  if (alreadyScheduled) return false;

  const contract = context.universe.contractFor(fighter.id);
  return Boolean(contract && contract.fightsRemaining > 0);
}

/* ------------------------------------------------------------------- scoring */

/** Rank distance, where undefined means unranked and therefore distant. */
function rankOf(rankings: readonly RankingEntry[], fighterId: string): number | undefined {
  return rankings.find((entry) => entry.fighterId === fighterId)?.rank;
}

/**
 * The core term: a good fight is between fighters of comparable standing. Adjacent ranks
 * score highest, a large gap scores poorly, and an *upward* step for the lower-ranked fighter
 * is worth more than a downward one — that is what a contender fight is.
 */
function proximityScore(rankA: number | undefined, rankB: number | undefined): number {
  if (rankA === undefined && rankB === undefined) return 22; // Two unranked fighters: a fine prelim.
  if (rankA === undefined || rankB === undefined) {
    const ranked = rankA ?? rankB!;
    // A ranked fighter against an unranked one is worth making only near the bottom.
    return ranked >= 10 ? 26 : Math.max(0, 18 - ranked * 2);
  }
  const gap = Math.abs(rankA - rankB);
  return clamp(60 - gap * 7, 4, 60);
}

/** Fighters on a run deserve a step up; fighters on a slide get a lifeline, not a contender. */
function formScore(fighter: Fighter): number {
  return clamp(fighter.record.winStreak * 4.5 - fighter.record.lossStreak * 3.5 + fighter.career.momentum * 0.08, -14, 22);
}

/** Fame sells the show, and the promotion knows it. */
function drawScore(a: Fighter, b: Fighter): number {
  return clamp((a.career.popularity + b.career.popularity) * 0.12, 0, 24);
}

/**
 * Rematch value. An immediate rematch of a one-sided decision is a bad fight; a rematch of a
 * split decision or a fight that ended in controversy is one people want to see. Three
 * meetings is usually one too many.
 */
function rematchScore(a: Fighter, b: Fighter, date: SimDate): number {
  const memory = a.memories.find((entry) => entry.opponentId === b.id);
  if (!memory) return 0;

  const daysSince = daysBetween(memory.lastDate, date);
  if (memory.meetings >= 3) return -55;
  // A trilogy fight needs a genuine reason; a quick rematch of a clear result does not.
  if (daysSince < 300) return -32;

  const wasClose = memory.lastMethod?.includes('SPLIT') || memory.lastMethod?.includes('MAJORITY') || memory.lastMethod?.includes('DRAW');
  return wasClose ? 26 : 6;
}

/**
 * Whether a fighter is a credible challenger.
 *
 * No promotion puts a fighter with a losing record in a championship bout, however the
 * ranking maths happens to have shaken out. Without this, a thin division that had just been
 * restocked could crown a two-and-six champion.
 */
export function isTitleEligible(fighter: Fighter): boolean {
  const { wins, losses, winStreak } = fighter.record;
  if (wins < 3) return false;
  if (wins >= losses) return true;
  // A run of form earns a shot, but it cannot rehabilitate a badly losing record. Allowing a
  // three-fight streak on its own put five-and-ten fighters into championship bouts.
  return winStreak >= 3 && wins + 2 >= losses;
}

/** Two fighters from the same camp do not fight each other. */
function teammateVeto(a: Fighter, b: Fighter): boolean {
  return Boolean(a.campId) && a.campId === b.campId;
}

/** A big enough gap in level is a mismatch nobody wants to watch or sanction. */
function mismatchPenalty(a: Fighter, b: Fighter): number {
  const gap = Math.abs(currentAbility(a) - currentAbility(b));
  return gap > 35 ? -(gap - 35) * 1.6 : 0;
}

/** Fighters who want the fight take it; risk-averse ones duck the dangerous opponent. */
function willingness(fighter: Fighter, opponent: Fighter): number {
  const risk = clamp((currentAbility(opponent) - currentAbility(fighter)) / 30, -1.5, 1.5);
  const appetite = (fighter.personality.riskTolerance * 0.6 + fighter.personality.ambition * 0.4) / 100;
  return clamp(10 * (appetite - risk * 0.35), -18, 12);
}

/**
 * A fighter who has been out a while is a more attractive booking than one who fought two
 * months ago. Without this the matchmaker rebooks the same names at the minimum legal
 * turnaround and the rest of the roster never fights.
 */
function restScore(fighter: Fighter, date: SimDate): number {
  if (!fighter.career.lastFightDate) return 6;
  const days = daysBetween(fighter.career.lastFightDate, date);
  return clamp(remap(days, 105, 400, -8, 10), -8, 10);
}

/** How much the promotion wants this specific bout on this specific card. */
export function scoreBout(
  a: Fighter,
  b: Fighter,
  rankings: readonly RankingEntry[],
  date: SimDate,
  rng: Rng,
): { score: number; rationale: string } {
  const rankA = rankOf(rankings, a.id);
  const rankB = rankOf(rankings, b.id);

  const proximity = proximityScore(rankA, rankB);
  const form = formScore(a) + formScore(b);
  const draw = drawScore(a, b);
  const rematch = rematchScore(a, b, date);
  const mismatch = mismatchPenalty(a, b);
  const appetite = willingness(a, b) + willingness(b, a);
  const freshness = restScore(a, date) + restScore(b, date);
  // Matchmaking is not deterministic in reality either — two comparable fights, one gets made.
  const noise = rng.float(-6, 6);

  const score = proximity + form + draw + rematch + mismatch + appetite + freshness + noise;

  let rationale = 'a competitive matchup';
  if (rankA !== undefined && rankB !== undefined && Math.min(rankA, rankB) <= 3) {
    rationale = 'a title eliminator';
  } else if (rematch > 15) {
    rationale = 'a rematch the fans wanted';
  } else if (a.record.winStreak >= 3 || b.record.winStreak >= 3) {
    rationale = 'a step up for a fighter on a run';
  } else if (draw > 16) {
    rationale = 'a fight that sells';
  }

  return { score, rationale };
}

/* --------------------------------------------------------------- the engine */

export interface MatchmakingResult {
  readonly proposals: BoutProposal[];
  /** Divisions where a title fight is due but could not be made, and why. */
  readonly notes: string[];
}

/**
 * Builds the best set of bouts available to a promotion right now.
 *
 * Works division by division: the title fight is considered first (because it anchors a
 * card), then the remaining bookable fighters are paired greedily by score. Greedy pairing
 * is the right trade-off here — an optimal matching over the whole roster is both expensive
 * and less realistic, since a real matchmaker also books the obvious fight first.
 */
export function makeMatches(context: MatchmakingContext, wanted: number): MatchmakingResult {
  const { universe, promotion, date } = context;
  const rng = universe.rngFor('matchmaking', promotion.id, date);
  const booked = new Set<string>();
  const proposals: BoutProposal[] = [];
  const notes: string[] = [];
  const titleAllowance = context.maxTitleFights ?? 1;

  const poolFor = (divisionKey: string) =>
    universe.state.fighters.filter(
      (fighter) => fighter.divisionKey === divisionKey && isBookable(fighter, context, booked),
    );

  /* --- pass one: championships ------------------------------------------
   * Title situations are gathered across every division first and then ranked, rather than
   * being taken in whatever order the divisions happen to be visited. Deciding per division
   * meant a belt left vacant could be passed over indefinitely while a champion elsewhere
   * took the card's only title slot for a routine defence.
   */
  const titleCandidates: BoutProposal[] = [];

  for (const divisionKey of promotion.divisionKeys) {
    const rankings = universe.rankingsFor(promotion.id, divisionKey);
    const pool = poolFor(divisionKey);
    if (pool.length < 2) continue;

    const title = universe.title(promotion.id, divisionKey);
    const champion = title?.championId ? pool.find((f) => f.id === title.championId) : undefined;
    const interimChampion = title?.interimChampionId ? pool.find((f) => f.id === title.interimChampionId) : undefined;

    const contenders = (exclude: readonly string[]) =>
      rankings
        // Rank 0 only exists when there is a champion; a vacant division starts at 1.
        .filter((entry) => entry.rank >= 1)
        .map((entry) => pool.find((f) => f.id === entry.fighterId))
        .filter((f): f is Fighter => Boolean(f) && !exclude.includes(f!.id) && isTitleEligible(f!));

    const propose = (a: Fighter, b: Fighter, titleType: NonNullable<BoutProposal['titleType']>, priority: number) => {
      if (teammateVeto(a, b)) return;
      // Both sides, every time. Checking only the challenger let a defence or a unification
      // carry a fighter whose record had long since stopped justifying a belt.
      if (!isTitleEligible(a) || !isTitleEligible(b)) return;
      const { score } = scoreBout(a, b, rankings, date, rng.derive(titleType, divisionKey));
      titleCandidates.push({
        divisionKey,
        a,
        b,
        score: score + priority,
        isTitleFight: true,
        titleType,
        rationale:
          titleType === 'interim'
            ? 'for the interim title'
            : titleType === 'unification'
              ? 'to unify the belts'
              : titleType === 'vacant'
                ? 'for the vacant title'
                : 'a title defence',
      });
    };

    if (champion && interimChampion) {
      // Two champions is unstable; resolving it is the most valuable fight available.
      propose(champion, interimChampion, 'unification', 140);
    } else if (champion) {
      const dueToDefend =
        !champion.career.lastFightDate ||
        daysBetween(champion.career.lastFightDate, date) >= TITLE_DEFENCE_INTERVAL_DAYS;
      const challenger = contenders([champion.id])[0];
      if (dueToDefend && challenger) propose(champion, challenger, 'undisputed', 90);
      else if (dueToDefend) notes.push(`No available contender for the ${divisionKey} title.`);
    } else if (!title?.championId) {
      // A vacant belt is the most urgent thing a division has: fill it.
      const available = contenders([]);
      const first = available[0];
      const second = available.find((f) => f !== first);
      if (first && second) propose(first, second, 'vacant', 150);
      else notes.push(`Cannot fill the vacant ${divisionKey} title.`);
    } else if (title.championId && !champion && !title.interimChampionId) {
      // The champion exists but is unavailable; an interim belt keeps the division moving.
      const idle = title.since ? daysBetween(title.since, date) : 0;
      const available = contenders([title.championId]);
      const first = available[0];
      const second = available.find((f) => f !== first);
      if (first && second && idle > 240) propose(first, second, 'interim', 75);
    }
  }

  titleCandidates.sort((x, y) => y.score - x.score);
  for (const candidate of titleCandidates) {
    if (proposals.filter((p) => p.isTitleFight).length >= titleAllowance) break;
    if (booked.has(candidate.a.id) || booked.has(candidate.b.id)) continue;
    proposals.push(candidate);
    booked.add(candidate.a.id);
    booked.add(candidate.b.id);
  }

  /* --- pass two: the rest of the card ------------------------------------ */
  // Every titleholder, not just this promotion's: a champion does not take an ordinary bout
  // anywhere, and scoping this per promotion let a champion fight non-title elsewhere.
  const champions = new Set(
    universe.state.titles
      .flatMap((title) => [title.championId, title.interimChampionId])
      .filter((id): id is string => Boolean(id)),
  );

  for (const divisionKey of rng.shuffle([...promotion.divisionKeys])) {
    const rankings = universe.rankingsFor(promotion.id, divisionKey);
    // A champion does not take a non-title fight. Letting them meant a titleholder was
    // regularly booked into an ordinary bout, became unavailable for a defence, and was
    // eventually stripped for inactivity the matchmaker had itself caused.
    const remaining = poolFor(divisionKey).filter((fighter) => !champions.has(fighter.id));
    if (remaining.length < 2) continue;

    const candidates: BoutProposal[] = [];
    for (let i = 0; i < remaining.length; i++) {
      for (let j = i + 1; j < remaining.length; j++) {
        const a = remaining[i]!;
        const b = remaining[j]!;
        if (teammateVeto(a, b)) continue;
        const { score, rationale } = scoreBout(a, b, rankings, date, rng.derive('bout', a.id, b.id));
        candidates.push({ divisionKey, a, b, score, isTitleFight: false, rationale });
      }
    }

    candidates.sort((x, y) => y.score - x.score);
    for (const candidate of candidates) {
      if (proposals.length >= wanted * 2) break;
      if (booked.has(candidate.a.id) || booked.has(candidate.b.id)) continue;
      // A bout nobody wants to see is worse than a shorter card.
      if (candidate.score < 18) continue;
      proposals.push(candidate);
      booked.add(candidate.a.id);
      booked.add(candidate.b.id);
    }
  }

  // Championships headline; everything else is ordered by how good a fight it is.
  proposals.sort((x, y) => Number(y.isTitleFight) - Number(x.isTitleFight) || y.score - x.score);
  return { proposals: proposals.slice(0, wanted), notes };
}

/** Exposed for tests and tooling: how large a candidate pool a division currently has. */
export function bookablePool(context: MatchmakingContext, divisionKey: string): Fighter[] {
  return context.universe.state.fighters.filter(
    (fighter) => fighter.divisionKey === divisionKey && isBookable(fighter, context, new Set()),
  );
}
