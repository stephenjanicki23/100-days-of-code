/**
 * Championships, including interim titles (Sprint 11).
 *
 * The belt is modelled as its own record rather than inferred from the ranking table. That
 * follows from the same principle the ranking fix established — a championship is a fact
 * about who beat whom, not a position computed from form — and it is what makes the
 * interesting cases expressible at all: a vacant title, an interim champion, a unification
 * bout, a champion stripped for inactivity.
 */

import { daysBetween, type SimDate } from '../core/time.ts';
import type { Fighter } from '../domain/fighter.ts';

export interface TitleRecord {
  readonly promotionId: string;
  readonly divisionKey: string;
  /** The undisputed champion. Undefined when the title is vacant. */
  championId?: string;
  /** Holder of an interim belt, created when the champion cannot defend. */
  interimChampionId?: string;
  /** When the current reign began. */
  since?: SimDate;
  defences: number;
  /** Every reign in this division, oldest first — the division's lineage. */
  lineage: { fighterId: string; from: SimDate; to?: SimDate; defences: number }[];
}

export function createTitle(promotionId: string, divisionKey: string): TitleRecord {
  return { promotionId, divisionKey, defences: 0, lineage: [] };
}

export function titleFor(
  titles: readonly TitleRecord[],
  promotionId: string,
  divisionKey: string,
): TitleRecord | undefined {
  return titles.find((title) => title.promotionId === promotionId && title.divisionKey === divisionKey);
}

/** A new champion takes the belt, closing out the previous reign in the lineage. */
export function crownChampion(title: TitleRecord, fighterId: string, date: SimDate): void {
  const previous = title.lineage[title.lineage.length - 1];
  if (previous && !previous.to) {
    previous.to = date;
    previous.defences = title.defences;
  }
  title.championId = fighterId;
  title.since = date;
  title.defences = 0;
  // Winning the undisputed title always ends any interim situation.
  title.interimChampionId = undefined;
  title.lineage.push({ fighterId, from: date, defences: 0 });
}

export function recordDefence(title: TitleRecord): void {
  title.defences++;
}

export function vacateTitle(title: TitleRecord, date: SimDate): void {
  const current = title.lineage[title.lineage.length - 1];
  if (current && !current.to) {
    current.to = date;
    current.defences = title.defences;
  }
  title.championId = undefined;
  title.since = undefined;
  title.defences = 0;
}

/** An interim champion is promoted when the real champion goes away for good. */
export function promoteInterim(title: TitleRecord, date: SimDate): string | undefined {
  const interim = title.interimChampionId;
  if (!interim) return undefined;
  crownChampion(title, interim, date);
  return interim;
}

/** How long a champion has been unable to defend. */
export const INTERIM_THRESHOLD_DAYS = 300;
/**
 * Stripping a champion is a notable event, not routine housekeeping. At 640 days the
 * simulation was vacating belts faster than it could fill them and divisions accumulated
 * permanent vacancies.
 */
export const STRIP_THRESHOLD_DAYS = 900;

export interface TitleSituation {
  readonly needsInterim: boolean;
  readonly shouldStrip: boolean;
  readonly needsUnification: boolean;
  readonly reason?: string;
}

/**
 * Reads the state of a division's title picture.
 *
 * The rules encoded here are the ones promotions actually apply: a long-injured champion
 * gets an interim belt made beneath them, a champion who never comes back is eventually
 * stripped, and once both belts exist the unification is the fight everyone wants.
 */
export function assessTitle(
  title: TitleRecord,
  champion: Fighter | undefined,
  interim: Fighter | undefined,
  date: SimDate,
): TitleSituation {
  if (!title.championId) {
    return { needsInterim: false, shouldStrip: false, needsUnification: false, reason: 'vacant' };
  }
  if (!champion || champion.status === 'retired') {
    return { needsInterim: false, shouldStrip: true, needsUnification: false, reason: 'champion has retired' };
  }

  if (title.interimChampionId && interim && interim.status !== 'retired') {
    return { needsInterim: false, shouldStrip: false, needsUnification: true, reason: 'two champions' };
  }

  const idleSince = champion.career.lastFightDate ?? title.since;
  const idleDays = idleSince ? daysBetween(idleSince, date) : 0;
  const openInjury = champion.condition.injuries.find((injury) => !injury.endDate);
  const longTermInjury = openInjury ? daysBetween(date, openInjury.expectedReturn) > 120 : false;

  if (idleDays > STRIP_THRESHOLD_DAYS) {
    return { needsInterim: false, shouldStrip: true, needsUnification: false, reason: 'inactivity' };
  }
  if ((idleDays > INTERIM_THRESHOLD_DAYS || longTermInjury) && !title.interimChampionId) {
    return {
      needsInterim: true,
      shouldStrip: false,
      needsUnification: false,
      reason: longTermInjury ? 'the champion is injured long-term' : 'the champion has been inactive',
    };
  }

  return { needsInterim: false, shouldStrip: false, needsUnification: false };
}

/** The champion of record for ranking purposes: undisputed, or interim if the belt is vacant. */
export function rankingChampionId(title: TitleRecord | undefined): string | undefined {
  if (!title) return undefined;
  return title.championId ?? title.interimChampionId;
}
