/**
 * Fight cards and venues (Sprint 14).
 *
 * An event is the container a promotion puts fights in, and the unit its economics are
 * measured by. Card position is not cosmetic: it decides who gets seen, who gets paid, and
 * which fights the matchmaker treats as important — so `billing` flows all the way from
 * matchmaking through to revenue.
 */

import type { SimDate } from '../core/time.ts';

export interface Venue {
  readonly id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  /** 0-100. A famous arena sells more tickets and lends an event weight. */
  prestige: number;
}

export type EventStatus = 'scheduled' | 'completed' | 'cancelled';

/** How a promotion sells the show. Pay-per-view is reserved for the biggest nights. */
export type EventTier = 'numbered' | 'fight_night' | 'regional';

export interface PromotionEvent {
  readonly id: string;
  readonly promotionId: string;
  name: string;
  date: SimDate;
  venueId?: string;
  tier: EventTier;
  status: EventStatus;
  /** Fight ids, in bout order — prelims first, main event last. */
  fightIds: string[];
  attendance?: number;
  /** Pay-per-view buys, for numbered events only. */
  ppvBuys?: number;
  /** Gate plus broadcast plus pay-per-view, in dollars. */
  revenue?: number;
}

/** How many bouts each tier of show carries. */
export const CARD_SIZE: Record<EventTier, number> = {
  numbered: 11,
  fight_night: 9,
  regional: 7,
};

/**
 * Card positions in order, from the top down. The matchmaker fills the main event first with
 * the most important fight available and works downward, which is how real cards are built.
 */
export const CARD_POSITIONS = [
  { billing: 'main_event' as const, label: 'Main Event', slots: 1, rounds: 5 },
  { billing: 'co_main' as const, label: 'Co-Main Event', slots: 1, rounds: 3 },
  { billing: 'main_card' as const, label: 'Main Card', slots: 3, rounds: 3 },
  { billing: 'prelim' as const, label: 'Preliminary Card', slots: 4, rounds: 3 },
  { billing: 'early_prelim' as const, label: 'Early Prelims', slots: 2, rounds: 3 },
];

export function isPayPerView(event: PromotionEvent): boolean {
  return event.tier === 'numbered';
}

/** A short label for listings: "AFC 51" or "AFC Fight Night: Vale vs Corbin". */
export function eventLabel(event: PromotionEvent): string {
  return event.name;
}
