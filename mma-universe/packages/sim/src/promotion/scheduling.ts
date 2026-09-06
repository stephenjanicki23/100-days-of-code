/**
 * Event scheduling, card assembly and event economics (Sprints 11 and 14).
 *
 * A promotion runs on a cadence: the major organisation puts on a show roughly every other
 * weekend, regionals monthly, the small circuits less often. When a show is due, the
 * matchmaker is asked for bouts, they are sorted onto the card by importance, and on the
 * night the fights are simulated and the gate is counted.
 *
 * The economics matter beyond flavour — purses and pay-per-view revenue are what make a
 * popular fighter worth more than a merely good one, which is what makes popularity worth
 * modelling at all.
 */

import { clamp, remap, round } from '../core/math.ts';
import { Rng } from '../core/rng.ts';
import { addDays, daysBetween, type SimDate } from '../core/time.ts';
import type { Fight } from '../domain/fight.ts';
import { CARD_POSITIONS, CARD_SIZE, type EventTier, type PromotionEvent, type Venue } from '../domain/event.ts';
import type { Promotion } from '../domain/promotion.ts';
import { currentAbility, type Fighter } from '../domain/fighter.ts';
import { makeMatches, type BoutProposal, type MatchmakingContext } from './matchmaking.ts';
import type { Universe } from '../universe/universe.ts';

/** How often each tier of promotion puts on a show, in days. */
export const EVENT_CADENCE: Record<Promotion['tier'], number> = {
  global: 16,
  regional: 32,
  developmental: 45,
};

/** How far ahead a card is announced. Long enough for a real camp. */
export const BOOKING_LEAD_DAYS = 56;

function tierFor(promotion: Promotion, rng: Rng): EventTier {
  if (promotion.tier !== 'global') return 'regional';
  // The major promotion alternates its big numbered shows with smaller fight nights.
  return rng.bool(0.38) ? 'numbered' : 'fight_night';
}

function eventName(promotion: Promotion, tier: EventTier, number: number, headline?: string): string {
  if (tier === 'numbered') return `${promotion.shortName} ${number}`;
  if (headline) return `${promotion.shortName} Fight Night: ${headline}`;
  return `${promotion.shortName} Fight Night ${number}`;
}

export interface ScheduledEvent {
  readonly event: PromotionEvent;
  readonly fights: Fight[];
}

/**
 * Books the next show for a promotion: asks the matchmaker for bouts, assembles them onto
 * the card in order of importance, and returns the event with its fights.
 *
 * Returns undefined when the matchmaker cannot find enough fights worth making — a promotion
 * with an injured, exhausted roster should postpone, not run a card of nonsense.
 */
export function bookEvent(
  universe: Universe,
  promotion: Promotion,
  date: SimDate,
  venues: readonly Venue[],
  eventNumber: number,
): ScheduledEvent | undefined {
  const rng = universe.rngFor('booking', promotion.id, date);
  const tier = tierFor(promotion, rng);
  const targetSize = CARD_SIZE[tier];

  const context: MatchmakingContext = {
    universe,
    promotion,
    date,
    leadTimeDays: BOOKING_LEAD_DAYS,
    // Numbered shows are built around championships; a fight night rarely carries one.
    maxTitleFights: tier === 'numbered' ? 2 : 1,
  };
  const { proposals } = makeMatches(context, targetSize);
  // A card needs a top half worth selling; below that the show does not happen.
  if (proposals.length < 4) return undefined;

  const eventDate = addDays(date, BOOKING_LEAD_DAYS);
  const eventId = universe.nextId('event');

  // Bigger shows go to bigger buildings, and a promotion's own prestige gates its access.
  const affordable = venues.filter((venue) => venue.prestige <= promotion.prestige + 12);
  const venue = affordable.length > 0
    ? rng.pickWeighted(
        affordable.map((candidate) => [candidate, tier === 'numbered' ? candidate.prestige ** 1.5 : 1 / (1 + Math.abs(candidate.prestige - 45))] as const),
      )
    : venues[0];

  const fights: Fight[] = [];
  let boutOrder = 0;
  let index = 0;

  // The card is filled from the top: the best fight headlines.
  for (const position of CARD_POSITIONS) {
    for (let slot = 0; slot < position.slots && index < proposals.length; slot++) {
      const proposal = proposals[index++]!;
      fights.push({
        id: universe.nextId('fight'),
        eventId,
        divisionKey: proposal.divisionKey,
        fighterAId: proposal.a.id,
        fighterBId: proposal.b.id,
        boutOrder: boutOrder++,
        billing: position.billing,
        isTitleFight: proposal.isTitleFight,
        titleType: proposal.titleType,
        // Championship bouts and main events are five rounds.
        scheduledRounds: proposal.isTitleFight || position.billing === 'main_event' ? 5 : 3,
        status: 'scheduled',
        fightDate: eventDate,
      });
    }
  }

  const headline = fights[0]
    ? `${universe.requireFighter(fights[0].fighterAId).lastName} vs ${universe.requireFighter(fights[0].fighterBId).lastName}`
    : undefined;

  const event: PromotionEvent = {
    id: eventId,
    promotionId: promotion.id,
    name: eventName(promotion, tier, eventNumber, headline),
    date: eventDate,
    venueId: venue?.id,
    tier,
    status: 'scheduled',
    // Bout order runs prelims first on the night, so the card is stored top-down and reversed
    // for display; the ids here are in card order (main event first).
    fightIds: fights.map((fight) => fight.id),
  };

  return { event, fights };
}

/* ---------------------------------------------------------------- economics */

export interface EventEconomics {
  readonly attendance: number;
  readonly ppvBuys: number;
  readonly gate: number;
  readonly revenue: number;
  /** Purse paid to each fighter, keyed by fighter id. */
  readonly purses: Record<string, number>;
}

/**
 * What a show made, and what the fighters were paid.
 *
 * Draw is dominated by the main event — this is why promotions build stars rather than
 * merely ranking them — with a smaller contribution from the rest of the card.
 */
export function settleEvent(
  universe: Universe,
  promotion: Promotion,
  event: PromotionEvent,
  fights: readonly Fight[],
  venue: Venue | undefined,
  rng: Rng,
): EventEconomics {
  const headliners = fights
    .filter((fight) => fight.billing === 'main_event' || fight.billing === 'co_main')
    .flatMap((fight) => [fight.fighterAId, fight.fighterBId])
    .map((id) => universe.fighter(id))
    .filter((fighter): fighter is Fighter => Boolean(fighter));

  const headlinePull = headliners.reduce((sum, fighter) => sum + fighter.career.popularity, 0) / Math.max(1, headliners.length);
  const undercardPull = fights.reduce((sum, fight) => {
    const a = universe.fighter(fight.fighterAId);
    const b = universe.fighter(fight.fighterBId);
    return sum + ((a?.career.popularity ?? 0) + (b?.career.popularity ?? 0)) / 2;
  }, 0) / Math.max(1, fights.length);

  const appeal = clamp(headlinePull * 0.7 + undercardPull * 0.3, 1, 100);
  const capacity = venue?.capacity ?? 8_000;

  // Sell-through, never quite zero and never quite full.
  const sellThrough = clamp(remap(appeal, 10, 90, 0.42, 0.98) * remap(promotion.prestige, 30, 99, 0.7, 1.05) * rng.float(0.9, 1.06), 0.2, 1);
  const attendance = Math.round(capacity * sellThrough);
  const ticketPrice = remap(appeal * 0.6 + (venue?.prestige ?? 40) * 0.4, 10, 95, 55, 260);
  const gate = Math.round(attendance * ticketPrice);

  // Pay-per-view only for the major promotion's numbered shows, and it lives or dies on the
  // headline act.
  const ppvBuys =
    event.tier === 'numbered' && promotion.tier === 'global'
      ? Math.round(clamp((headlinePull - 45) ** 2 * 320 * rng.float(0.75, 1.3), 0, 2_200_000))
      : 0;
  const ppvRevenue = ppvBuys * 52;
  const broadcast = event.tier === 'numbered' ? 3_000_000 : promotion.tier === 'global' ? 1_100_000 : 180_000;
  const revenue = gate + ppvRevenue + broadcast;

  // Purses: base show plus win bonus, scaled by card position, with a share of the gate for
  // whoever is actually selling the show.
  const purses: Record<string, number> = {};
  for (const fight of fights) {
    const positionMultiplier =
      fight.billing === 'main_event' ? 3.2 : fight.billing === 'co_main' ? 2.1 : fight.billing === 'main_card' ? 1.35 : 1;
    for (const fighterId of [fight.fighterAId, fight.fighterBId]) {
      const contract = universe.contractFor(fighterId);
      if (!contract) continue;
      const won = fight.winnerId === fighterId;
      const ppvPoints = contract.ppvPoints > 0 ? ppvBuys * 52 * (contract.ppvPoints / 100) : 0;
      purses[fighterId] = Math.round(
        (contract.baseShow + (won ? contract.winBonus : 0)) * positionMultiplier + ppvPoints,
      );
    }
  }

  return { attendance, ppvBuys, gate, revenue: Math.round(revenue), purses };
}

/* -------------------------------------------------------------- performance */

/** Post-fight bonuses (brief §25): the night's best finish and the best fight. */
export interface PerformanceBonuses {
  readonly performanceOfTheNight: string[];
  readonly fightOfTheNight: [string, string] | undefined;
  readonly amount: number;
}

export function awardBonuses(
  fights: readonly Fight[],
  eventTier: EventTier,
  rng: Rng,
): PerformanceBonuses {
  const amount = eventTier === 'numbered' ? 50_000 : eventTier === 'fight_night' ? 50_000 : 10_000;

  const finishes = fights.filter(
    (fight) => fight.winnerId && fight.outcome && !fight.outcome.includes('DECISION') && fight.outcome !== 'DRAW',
  );
  // The best finishes are the earliest and the most emphatic.
  const ranked = [...finishes].sort((a, b) => (a.finishRound ?? 9) - (b.finishRound ?? 9));
  const performanceOfTheNight = ranked.slice(0, 2).map((fight) => fight.winnerId!).filter(Boolean);

  // Fight of the night goes to a competitive decision — a war, not a shutout.
  const decisions = fights.filter((fight) => fight.outcome?.includes('SPLIT') || fight.outcome?.includes('MAJORITY'));
  const chosen = decisions.length > 0 ? rng.pick(decisions) : undefined;

  return {
    performanceOfTheNight,
    fightOfTheNight: chosen ? [chosen.fighterAId, chosen.fighterBId] : undefined,
    amount,
  };
}

/** Whether a promotion is due to put on a show. */
export function isEventDue(promotion: Promotion, lastEventDate: SimDate | undefined, date: SimDate): boolean {
  if (!lastEventDate) return true;
  return daysBetween(lastEventDate, date) >= EVENT_CADENCE[promotion.tier];
}

/** Ability spread on a card, used by the news engine to describe how strong a show is. */
export function cardStrength(universe: Universe, fights: readonly Fight[]): number {
  if (fights.length === 0) return 0;
  const total = fights.reduce((sum, fight) => {
    const a = universe.fighter(fight.fighterAId);
    const b = universe.fighter(fight.fighterBId);
    return sum + ((a ? currentAbility(a) : 0) + (b ? currentAbility(b) : 0)) / 2;
  }, 0);
  return round(total / fights.length, 1);
}
