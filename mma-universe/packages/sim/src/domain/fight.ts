/** A booked bout and its result (Sprint 2 entity, produced by Sprints 7-10). */

import type { SimDate } from '../core/time.ts';
import type { FightOutcome } from '../fight/events.ts';

export type FightBilling = 'main_event' | 'co_main' | 'main_card' | 'prelim' | 'early_prelim';
export type FightStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Fight {
  readonly id: string;
  eventId?: string;
  readonly divisionKey: string;
  readonly fighterAId: string;
  readonly fighterBId: string;
  boutOrder: number;
  billing: FightBilling;
  isTitleFight: boolean;
  /**
   * What is actually on the line. Distinguishing these matters: an interim belt is not the
   * undisputed title, a vacant-title bout has no champion to dethrone, and a unification
   * collapses two belts into one.
   */
  titleType?: 'undisputed' | 'interim' | 'vacant' | 'unification';
  scheduledRounds: number;
  status: FightStatus;
  fightDate?: SimDate;

  outcome?: FightOutcome;
  winnerId?: string;
  finishRound?: number;
  finishTime?: string;
  technique?: string;
}

/** Reads a result as a sentence, for news copy and fight listings. */
export function describeOutcome(fight: Fight, winnerName?: string, loserName?: string): string {
  if (!fight.outcome) return 'Scheduled';
  const method = fight.outcome.replace(/_/g, ' ').toLowerCase();
  if (fight.outcome.includes('DRAW')) return `Draw (${method})`;
  const when = fight.finishRound ? ` at ${fight.finishTime} of round ${fight.finishRound}` : '';
  const via = fight.technique ? ` (${fight.technique.replace(/_/g, ' ').toLowerCase()})` : '';
  return `${winnerName ?? 'Winner'} def. ${loserName ?? 'opponent'} by ${method}${via}${when}`;
}

export const TITLE_FIGHT_ROUNDS = 5;
export const STANDARD_ROUNDS = 3;
