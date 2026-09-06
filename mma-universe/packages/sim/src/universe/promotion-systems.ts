/**
 * The systems that make a promotion run itself (Sprints 11-16).
 *
 * This is the module that closes the loop the whole project is built around:
 *
 *     rankings → matchmaking → cards → fights → results → rankings
 *                                        ↓
 *                              news, storylines, contracts
 *
 * Everything here is driven by the calendar rather than by the player. Left alone, a
 * promotion books its own shows, makes its own matches, pays its own fighters, and reacts to
 * its own results — which is the difference between a simulation and a database with a
 * button on it.
 */

import { clamp, remap, round } from '../core/math.ts';
import { Rng } from '../core/rng.ts';
import { addDays, daysBetween, type SimDate } from '../core/time.ts';
import { currentAbility, displayName, type Fighter } from '../domain/fighter.ts';
import { division } from '../domain/divisions.ts';
import type { Contract, Promotion } from '../domain/promotion.ts';
import type { Fight } from '../domain/fight.ts';
import type { PromotionEvent } from '../domain/event.ts';
import { simulateFight, type FightResult } from '../fight/engine.ts';
import { applyFightResult } from './fight-application.ts';
import { bookEvent, awardBonuses, isEventDue, settleEvent } from '../promotion/scheduling.ts';
import { isTitleEligible, makeMatches, type MatchmakingContext } from '../promotion/matchmaking.ts';
import { buildAllRankings } from '../promotion/rankings.ts';
import { assessTitle, promoteInterim, rankingChampionId, vacateTitle } from '../promotion/titles.ts';
import { generateNews } from '../world/news.ts';
import { updateStorylines } from '../world/storylines.ts';
import type { Universe } from './universe.ts';

export interface PromotionTickReport {
  eventsBooked: number;
  eventsHeld: number;
  fightsSimulated: number;
  /** Bouts saved by a short-notice replacement, and bouts that fell off the card anyway. */
  replacements: number;
  fightsCancelled: number;
  titleFights: number;
  titleChanges: number;
  interimTitles: number;
  contractsSigned: number;
  contractsReleased: number;
  articlesPublished: number;
  storylinesStarted: number;
  revenue: number;
}

export function emptyPromotionReport(): PromotionTickReport {
  return {
    eventsBooked: 0,
    eventsHeld: 0,
    fightsSimulated: 0,
    replacements: 0,
    fightsCancelled: 0,
    titleFights: 0,
    titleChanges: 0,
    interimTitles: 0,
    contractsSigned: 0,
    contractsReleased: 0,
    articlesPublished: 0,
    storylinesStarted: 0,
    revenue: 0,
  };
}

/* ------------------------------------------------------------------- booking */

/** Books any show that is due. Runs daily, but only fires on a promotion's cadence. */
export function bookDueEvents(universe: Universe, date: SimDate, report: PromotionTickReport): void {
  for (const promotion of universe.state.promotions) {
    const lastBooked = universe.state.cards
      .filter((card) => card.promotionId === promotion.id)
      .map((card) => card.date)
      .sort()
      .pop();

    // Cadence is measured against the *last card's date*, so a promotion keeps a steady
    // rhythm rather than booking a burst of shows the moment its roster frees up.
    if (!isEventDue(promotion, lastBooked ? addDays(lastBooked, -56) : undefined, date)) continue;

    const number = universe.state.cards.filter((card) => card.promotionId === promotion.id).length + 1;
    const booked = bookEvent(universe, promotion, date, universe.state.venues, number);
    if (!booked) continue;

    universe.state.cards.push(booked.event);
    universe.state.fights.push(...booked.fights);
    report.eventsBooked++;

    const headline = booked.fights[0];
    universe.record({
      type: 'EVENT_ANNOUNCED',
      date,
      subjectId: booked.event.id,
      summary: headline
        ? `${booked.event.name} is announced for ${booked.event.date}, headlined by ${displayName(universe.requireFighter(headline.fighterAId))} against ${displayName(universe.requireFighter(headline.fighterBId))}.`
        : `${booked.event.name} is announced for ${booked.event.date}.`,
      payload: { eventId: booked.event.id, fights: booked.fights.length },
    });
  }
}

/* -------------------------------------------------------------- fight night */

export interface HeldEvent {
  readonly card: PromotionEvent;
  readonly results: { fight: Fight; result: FightResult }[];
}

/**
 * Runs every card scheduled for today: simulates each bout from the prelims up, applies the
 * results, settles the gate and pays the fighters.
 */
export function holdDueEvents(
  universe: Universe,
  date: SimDate,
  report: PromotionTickReport,
  collectResults = true,
): HeldEvent[] {
  const held: HeldEvent[] = [];

  for (const card of universe.state.cards) {
    if (card.status !== 'scheduled' || card.date !== date) continue;

    const promotion = universe.promotion(card.promotionId);
    if (!promotion) continue;
    const fights = universe.fightsOnCard(card.id);
    // Bouts run bottom-of-the-card first, exactly as a real show does.
    const running = [...fights].reverse();
    const results: { fight: Fight; result: FightResult }[] = [];

    for (const fight of running) {
      let a = universe.fighter(fight.fighterAId);
      let b = universe.fighter(fight.fighterBId);

      // Withdrawals are common — eight weeks of camp is long enough to get hurt in. A real
      // promotion looks for a short-notice replacement before it scraps a bout, which is
      // also what keeps a card the size it was announced at.
      for (const side of ['a', 'b'] as const) {
        const current = side === 'a' ? a : b;
        const opponent = side === 'a' ? b : a;
        if (current && current.status !== 'retired' && !hasOpenInjury(current, date)) continue;

        const replacement = findReplacement(universe, fight, opponent, date);
        if (!replacement) continue;

        if (side === 'a') {
          (fight as { fighterAId: string }).fighterAId = replacement.id;
          a = replacement;
        } else {
          (fight as { fighterBId: string }).fighterBId = replacement.id;
          b = replacement;
        }
        report.replacements++;
        universe.record({
          type: 'SHORT_NOTICE_REPLACEMENT',
          date,
          subjectId: replacement.id,
          secondaryId: current?.id,
          summary: `${current ? displayName(current) : 'A fighter'} is out of ${card.name}; ${displayName(replacement)} steps in on short notice.`,
        });
      }

      if (!a || !b || a.status === 'retired' || b.status === 'retired' || hasOpenInjury(a, date) || hasOpenInjury(b, date)) {
        fight.status = 'cancelled';
        report.fightsCancelled++;
        universe.record({
          type: 'FIGHT_CANCELLED',
          date,
          subjectId: fight.id,
          summary: `${a ? displayName(a) : 'A fighter'} against ${b ? displayName(b) : 'an opponent'} is off ${card.name}.`,
        });
        continue;
      }

      const result = simulateFight(
        a,
        b,
        { fightId: fight.id, rounds: fight.scheduledRounds, isTitleFight: fight.isTitleFight },
        universe.rngFor('fight', fight.id),
      );
      const titleHolderBefore = universe.title(promotion.id, fight.divisionKey)?.championId;
      applyFightResult(universe, fight, result, { date });
      // The engine's event stream is the only record of *how* a fight went. The simulation
      // cannot write it — it has no database — so it is handed back for the caller to
      // persist. A very long advance can opt out rather than hold a million events in memory.
      if (collectResults) results.push({ fight, result });
      report.fightsSimulated++;
      if (fight.isTitleFight) {
        report.titleFights++;
        if (universe.title(promotion.id, fight.divisionKey)?.championId !== titleHolderBefore) report.titleChanges++;
      }

      // The bout comes off the contract either way.
      const useContract = (fighterId: string) => {
        const contract = universe.contractFor(fighterId);
        if (contract) contract.fightsRemaining = Math.max(0, contract.fightsRemaining - 1);
      };
      useContract(a.id);
      useContract(b.id);
    }

    const rng = universe.rngFor('event-settlement', card.id);
    const economics = settleEvent(universe, promotion, card, fights, universe.venue(card.venueId ?? ''), rng);
    card.status = 'completed';
    card.attendance = economics.attendance;
    card.ppvBuys = economics.ppvBuys;
    card.revenue = economics.revenue;
    report.eventsHeld++;
    report.revenue += economics.revenue;

    for (const [fighterId, purse] of Object.entries(economics.purses)) {
      const fighter = universe.fighter(fighterId);
      if (fighter) fighter.career.careerEarnings += purse;
    }

    const bonuses = awardBonuses(fights, card.tier, rng.derive('bonuses'));
    for (const fighterId of bonuses.performanceOfTheNight) {
      const fighter = universe.fighter(fighterId);
      if (!fighter) continue;
      fighter.career.careerEarnings += bonuses.amount;
      fighter.career.popularity = clamp(fighter.career.popularity + 2.5, 1, 100);
      universe.record({
        type: 'BONUS_AWARDED',
        date,
        subjectId: fighter.id,
        summary: `${displayName(fighter)} takes home a $${bonuses.amount.toLocaleString()} performance bonus from ${card.name}.`,
      });
    }

    universe.record({
      type: 'EVENT_COMPLETED',
      date,
      subjectId: card.id,
      summary: `${card.name} drew ${economics.attendance.toLocaleString()} at ${universe.venue(card.venueId ?? '')?.name ?? 'the arena'}${economics.ppvBuys > 0 ? ` and ${economics.ppvBuys.toLocaleString()} pay-per-view buys` : ''}.`,
      payload: { eventId: card.id, revenue: economics.revenue },
    });

    held.push({ card, results });
  }

  return held;
}

/**
 * Finds someone to step in. A short-notice replacement is drawn from the same division, is
 * healthy, is not already booked, and is close enough in level to make a fight of it — but
 * they take the bout without a full camp, which the fight engine sees as their actual
 * condition on the night.
 */
function findReplacement(
  universe: Universe,
  fight: Fight,
  opponent: Fighter | undefined,
  date: SimDate,
): Fighter | undefined {
  if (!opponent) return undefined;
  const target = currentAbility(opponent);

  // A titleholder does not take a fight on two weeks' notice. Replacements were the last
  // route by which a champion could end up in an ordinary bout, and a champion who took
  // several of them could accumulate a losing record without the belt ever being at stake.
  const titleholders = new Set(
    universe.state.titles
      .flatMap((title) => [title.championId, title.interimChampionId])
      .filter((id): id is string => Boolean(id)),
  );

  const candidates = universe.state.fighters.filter((fighter) => {
    if (fighter.divisionKey !== fight.divisionKey) return false;
    if (titleholders.has(fighter.id)) return false;
    // Stepping into a championship bout on short notice still requires being a credible
    // challenger. Without this a one-and-seven fighter took a title fight and won it.
    if (fight.isTitleFight && !isTitleEligible(fighter)) return false;
    if (fighter.status !== 'active' || hasOpenInjury(fighter, date)) return false;
    if (fighter.id === opponent.id || fighter.campId === opponent.campId) return false;
    if (fighter.promotionId !== opponent.promotionId) return false;
    // Not already fighting tonight or booked on a future card.
    if (universe.state.fights.some((other) =>
      other.id !== fight.id &&
      (other.status === 'scheduled' || other.fightDate === date) &&
      (other.fighterAId === fighter.id || other.fighterBId === fighter.id))) return false;
    if (fighter.career.lastFightDate && daysBetween(fighter.career.lastFightDate, date) < 60) return false;
    return Math.abs(currentAbility(fighter) - target) < 40;
  });

  if (candidates.length === 0) return undefined;
  // The closest match in level takes the fight.
  return candidates.sort(
    (x, y) => Math.abs(currentAbility(x) - target) - Math.abs(currentAbility(y) - target),
  )[0];
}

function hasOpenInjury(fighter: Fighter, date: SimDate): boolean {
  return fighter.condition.injuries.some((injury) => !injury.endDate && injury.expectedReturn > date);
}

/* ---------------------------------------------------------------- contracts */

/**
 * Contract management (Sprint 11): re-sign the fighters worth keeping, release the ones who
 * are not, and pick up free agents worth a look.
 */
export function manageContracts(universe: Universe, date: SimDate, month: number, report: PromotionTickReport): void {
  const rng = universe.rngFor('contracts', month);

  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired' || !fighter.promotionId) continue;
    const contract = universe.contractFor(fighter.id);
    if (contract) continue; // Still under contract.

    const promotion = universe.promotion(fighter.promotionId);
    if (!promotion) continue;

    const ability = currentAbility(fighter);
    // Losing badly gets you cut; the bar is higher at a bigger promotion.
    const bar = remap(promotion.prestige, 30, 99, 78, 132);
    const cut = fighter.record.lossStreak >= 3 || (fighter.record.lossStreak >= 2 && ability < bar);

    if (cut) {
      fighter.promotionId = undefined;
      report.contractsReleased++;
      universe.record({
        type: 'CONTRACT_RELEASED',
        date,
        subjectId: fighter.id,
        secondaryId: promotion.id,
        summary: `${displayName(fighter)} has been released by ${promotion.name} after ${fighter.record.lossStreak} straight defeats.`,
      });
      continue;
    }

    // Otherwise they are re-signed, on terms that follow what they have become.
    universe.state.contracts.push(newContract(universe, fighter, promotion, date, rng.derive('resign', fighter.id)));
    report.contractsSigned++;
  }

  // --- free agency ---------------------------------------------------------
  //
  // Recruitment is *relative*, exactly as it is at genesis: promotions sign the best
  // available fighters until their divisions are full, best promotion first. An earlier
  // version used an absolute ability bar, which contradicted the way rosters were built and
  // was quietly fatal — the major promotion could not clear its own threshold, released more
  // fighters than it signed, and had bled from 242 fighters to 16 within a simulated decade.
  const byPrestige = [...universe.state.promotions].sort((a, b) => b.prestige - a.prestige);

  for (const promotion of byPrestige) {
    const target = rosterTargetPerDivision(promotion);
    for (const divisionKey of promotion.divisionKeys) {
      const current = universe.state.fighters.filter(
        (fighter) => fighter.promotionId === promotion.id && fighter.divisionKey === divisionKey && fighter.status !== 'retired',
      ).length;
      let openings = target - current;
      if (openings <= 0) continue;

      const available = universe.state.fighters
        .filter(
          (fighter) =>
            fighter.status !== 'retired' && !fighter.promotionId && fighter.divisionKey === divisionKey,
        )
        .sort((a, b) => currentAbility(b) - currentAbility(a));

      for (const fighter of available) {
        if (openings <= 0) break;
        fighter.promotionId = promotion.id;
        universe.state.contracts.push(
          newContract(universe, fighter, promotion, date, rng.derive('sign', fighter.id)),
        );
        report.contractsSigned++;
        openings--;
        universe.record({
          type: 'CONTRACT_SIGNED',
          date,
          subjectId: fighter.id,
          secondaryId: promotion.id,
          summary: `${displayName(fighter)} has signed with ${promotion.name}.`,
        });
      }
    }
  }
}

/**
 * How many fighters a promotion carries per division. The major promotion runs deep
 * divisions; a developmental circuit runs thin ones.
 */
function rosterTargetPerDivision(promotion: Promotion): number {
  switch (promotion.tier) {
    case 'global':
      return 20;
    case 'regional':
      return 12;
    default:
      return 8;
  }
}

function newContract(universe: Universe, fighter: Fighter, promotion: Promotion, date: SimDate, rng: Rng): Contract {
  // Pay follows fame and standing, and rises steeply at the top of a major promotion.
  const baseShow = Math.round(
    remap(promotion.prestige, 30, 99, 5_000, 48_000) *
      (1 + fighter.career.popularity / 90) *
      (1 + fighter.career.titleReigns * 0.4) *
      rng.float(0.88, 1.2),
  );
  const fights = rng.pickWeighted([[3, 0.2], [4, 0.45], [6, 0.25], [8, 0.1]]);

  return {
    id: universe.nextId('contract'),
    fighterId: fighter.id,
    promotionId: promotion.id,
    signedDate: date,
    fightsTotal: fights,
    fightsRemaining: fights,
    expiresDate: addDays(date, 365 * 3),
    baseShow,
    winBonus: baseShow,
    ppvPoints: promotion.tier === 'global' && fighter.career.popularity > 78 ? round(rng.float(0.2, 1.2), 2) : 0,
    status: 'active',
  };
}

/* ------------------------------------------------------------------- titles */

/**
 * Keeps the title picture honest: makes an interim belt when a champion cannot defend,
 * strips a champion who never returns, and promotes an interim holder when the belt vacates.
 */
export function manageTitles(universe: Universe, date: SimDate, report: PromotionTickReport): void {
  for (const title of universe.state.titles) {
    const promotion = universe.promotion(title.promotionId);
    if (!promotion) continue;

    const champion = title.championId ? universe.fighter(title.championId) : undefined;
    const interim = title.interimChampionId ? universe.fighter(title.interimChampionId) : undefined;

    // A belt belongs to the promotion that sanctions it. A champion who leaves — released,
    // or signed elsewhere — vacates it. Without this a fighter kept a title while fighting
    // non-title bouts on another circuit, and could pile up losses without ever putting it
    // on the line.
    if (champion && champion.promotionId !== title.promotionId) {
      vacateTitle(title, date);
      universe.record({
        type: 'TITLE_VACATED',
        date,
        subjectId: champion.id,
        summary: `${displayName(champion)} has vacated the ${division(title.divisionKey).name} title on leaving ${promotion.name}.`,
      });
      continue;
    }
    if (interim && interim.promotionId !== title.promotionId) title.interimChampionId = undefined;

    const situation = assessTitle(title, champion, interim, date);

    if (situation.shouldStrip && champion) {
      vacateTitle(title, date);
      universe.record({
        type: 'TITLE_VACATED',
        date,
        subjectId: champion.id,
        summary: `${displayName(champion)} has been stripped of the ${division(title.divisionKey).name} title — ${situation.reason}.`,
      });
      const promoted = promoteInterim(title, date);
      if (promoted) {
        const newChampion = universe.fighter(promoted);
        if (newChampion) {
          newChampion.career.titleReigns++;
          universe.record({
            type: 'TITLE_CHANGE',
            date,
            subjectId: newChampion.id,
            summary: `${displayName(newChampion)} is elevated to undisputed ${division(title.divisionKey).name} champion.`,
          });
        }
      }
      continue;
    }

    if (situation.needsInterim && !title.interimChampionId) {
      // The matchmaker will book the bout itself on the next suitable card; this only records
      // that the division has entered an interim situation, so the news engine can report it
      // and it is reported once rather than every month.
      const alreadyOrdered = universe.state.events.some(
        (event) =>
          event.type === 'INTERIM_TITLE_ORDERED' &&
          event.payload?.divisionKey === title.divisionKey &&
          daysBetween(event.date, date) < 200,
      );
      if (!alreadyOrdered) {
        universe.record({
          type: 'INTERIM_TITLE_ORDERED',
          date,
          subjectId: champion?.id,
          summary: `With ${champion ? displayName(champion) : 'the champion'} unavailable, an interim ${division(title.divisionKey).name} title will be contested.`,
          payload: { divisionKey: title.divisionKey },
        });
        report.interimTitles++;
      }
    }
  }
}

/* -------------------------------------------------------------- world upkeep */

/** Publishes news and refreshes storylines from what the world just did. */
export function updateWorld(universe: Universe, date: SimDate, report: PromotionTickReport): void {
  const recent = universe.state.events.filter((event) => daysBetween(event.date, date) <= 31);
  const articles = generateNews(universe, recent, date, () => universe.nextId('article'), 10);
  universe.state.news.push(...articles);
  report.articlesPublished += articles.length;
  // The feed is a rolling window, not an archive; the database keeps the history.
  if (universe.state.news.length > 400) universe.state.news.splice(0, universe.state.news.length - 400);

  const { created } = updateStorylines(universe, universe.state.storylines, date, () => universe.nextId('storyline'));
  report.storylinesStarted += created.length;
}

/** Reconciles every ranking table, with the title records as the authority on the belts. */
export function reconcileRankings(universe: Universe, date: SimDate): void {
  universe.state.rankings = buildAllRankings(
    universe.state.promotions,
    universe.state.fighters,
    date,
    universe.state.rankings,
    (promotionId, divisionKey) => rankingChampionId(universe.title(promotionId, divisionKey)),
  );
}

/** Exposed for tooling: what the matchmaker would make right now, without booking it. */
export function previewMatches(universe: Universe, promotion: Promotion, date: SimDate, count: number) {
  const context: MatchmakingContext = { universe, promotion, date, leadTimeDays: 56 };
  return makeMatches(context, count);
}
