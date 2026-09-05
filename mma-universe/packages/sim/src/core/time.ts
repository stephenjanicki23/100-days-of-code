/**
 * Simulated time.
 *
 * The engine never reads the wall clock — `Date.now()` would make every run
 * unreproducible. Simulated dates are ISO `YYYY-MM-DD` strings, and all arithmetic is a
 * pure function of its inputs. `Date` is used only as a calendar calculator over explicit
 * UTC values.
 */

export type SimDate = string;

const MS_PER_DAY = 86_400_000;

export function parseDate(date: SimDate): number {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) throw new TypeError(`Invalid simulated date: ${date}`);
  return Date.UTC(y, m - 1, d);
}

export function formatDate(utcMs: number): SimDate {
  return new Date(utcMs).toISOString().slice(0, 10);
}

export function addDays(date: SimDate, days: number): SimDate {
  return formatDate(parseDate(date) + days * MS_PER_DAY);
}

export function daysBetween(from: SimDate, to: SimDate): number {
  return Math.round((parseDate(to) - parseDate(from)) / MS_PER_DAY);
}

export function isBefore(a: SimDate, b: SimDate): boolean {
  return parseDate(a) < parseDate(b);
}

/** Age in whole years on a given date. */
export function ageOn(birthDate: SimDate, onDate: SimDate): number {
  return Math.floor(daysBetween(birthDate, onDate) / 365.2425);
}

/** Fractional age, used by the aging curves so a birthday is not a step change. */
export function exactAgeOn(birthDate: SimDate, onDate: SimDate): number {
  return daysBetween(birthDate, onDate) / 365.2425;
}

/** 0 = Sunday … 6 = Saturday. */
export function dayOfWeek(date: SimDate): number {
  return new Date(parseDate(date)).getUTCDay();
}

export function monthOf(date: SimDate): number {
  return Number(date.slice(5, 7));
}

export function yearOf(date: SimDate): number {
  return Number(date.slice(0, 4));
}

/** ISO week index since the universe epoch — the cadence the training system ticks on. */
export function weekIndex(epoch: SimDate, date: SimDate): number {
  return Math.floor(daysBetween(epoch, date) / 7);
}
