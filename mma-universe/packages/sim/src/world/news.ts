/**
 * The news engine (Sprint 15, brief §26).
 *
 * The rule the brief is explicit about: news is generated *from actual simulation events*,
 * never invented. Every article here is a rendering of something that already happened in
 * the world — a result, an injury, a signing, a title change — with the surrounding context
 * the simulation already knows.
 *
 * That constraint is what makes the feed trustworthy: if an article says a fighter is on a
 * five-fight run, they are, because the number was read from their record.
 */

import { Rng } from '../core/rng.ts';
import type { SimDate } from '../core/time.ts';
import { currentAbility, displayName, recordString, type Fighter } from '../domain/fighter.ts';
import { division } from '../domain/divisions.ts';
import type { SimulationEvent, Universe } from '../universe/universe.ts';

export type NewsCategory = 'result' | 'title' | 'injury' | 'signing' | 'camp' | 'retirement' | 'rankings' | 'card' | 'prospect';

export interface NewsArticle {
  readonly id: string;
  readonly published: SimDate;
  readonly headline: string;
  readonly body: string;
  readonly category: NewsCategory;
  readonly subjectId?: string;
  readonly storylineId?: string;
}

/** How newsworthy an event is; only the top stories become articles. */
function newsworthiness(event: SimulationEvent, universe: Universe): number {
  const subject = event.subjectId ? universe.fighter(event.subjectId) : undefined;
  const fame = subject ? subject.career.popularity : 20;

  switch (event.type) {
    case 'TITLE_CHANGE':
      return 100;
    case 'TITLE_DEFENDED':
      return 82;
    case 'INTERIM_TITLE':
    case 'TITLE_VACATED':
      return 88;
    case 'FIGHT_RESULT':
      return 40 + fame * 0.5;
    case 'RETIREMENT':
      return 45 + fame * 0.6;
    case 'INJURY_SUSTAINED':
      return 22 + fame * 0.55;
    case 'CHRONIC_INJURY':
      return 40 + fame * 0.5;
    case 'CAMP_MOVE':
      return 25 + fame * 0.5;
    case 'CAMP_CLOSED':
      return 48;
    case 'CONTRACT_SIGNED':
      return 30 + fame * 0.45;
    case 'EVENT_ANNOUNCED':
      return 55;
    case 'FIGHTER_DEBUT':
      return 8;
    default:
      return 12;
  }
}

const CATEGORY_BY_TYPE: Record<string, NewsCategory> = {
  TITLE_CHANGE: 'title',
  TITLE_DEFENDED: 'title',
  INTERIM_TITLE: 'title',
  TITLE_VACATED: 'title',
  FIGHT_RESULT: 'result',
  RETIREMENT: 'retirement',
  INJURY_SUSTAINED: 'injury',
  CHRONIC_INJURY: 'injury',
  CAMP_MOVE: 'camp',
  CAMP_CLOSED: 'camp',
  CONTRACT_SIGNED: 'signing',
  EVENT_ANNOUNCED: 'card',
  FIGHTER_DEBUT: 'prospect',
};

/** A fighter's current run, phrased the way a report would phrase it. */
function formPhrase(fighter: Fighter): string {
  const { winStreak, lossStreak } = fighter.record;
  if (winStreak >= 5) return `a ${winStreak}-fight winning run`;
  if (winStreak >= 2) return `${winStreak} straight wins`;
  if (lossStreak >= 3) return `a worrying ${lossStreak}-fight slide`;
  if (lossStreak === 2) return 'back-to-back defeats';
  return 'a mixed recent run';
}

function headlineFor(event: SimulationEvent, universe: Universe, rng: Rng): string {
  const subject = event.subjectId ? universe.fighter(event.subjectId) : undefined;
  const other = event.secondaryId ? universe.fighter(event.secondaryId) : undefined;

  switch (event.type) {
    case 'TITLE_CHANGE':
      return subject && other
        ? rng.pick([
            `${subject.lastName} dethrones ${other.lastName} to take the ${division(subject.divisionKey).name} title`,
            `New champion: ${displayName(subject)} ends ${other.lastName}'s reign`,
            `${subject.lastName} is the ${division(subject.divisionKey).name} champion`,
          ])
        : 'A new champion is crowned';
    case 'TITLE_DEFENDED':
      return subject && other
        ? rng.pick([
            `${subject.lastName} turns back ${other.lastName} to retain`,
            `Still the champion: ${subject.lastName} defends the ${division(subject.divisionKey).name} title`,
          ])
        : 'The champion retains';
    case 'INTERIM_TITLE':
      return subject ? `${subject.lastName} claims the interim ${division(subject.divisionKey).name} title` : 'Interim title decided';
    case 'TITLE_VACATED':
      return subject ? `${subject.lastName} stripped of the title` : 'Title vacated';
    case 'FIGHT_RESULT':
      return subject && other
        ? rng.pick([
            `${subject.lastName} beats ${other.lastName}`,
            `${subject.lastName} gets past ${other.lastName}`,
            `${other.lastName} falls to ${subject.lastName}`,
          ])
        : 'Result';
    case 'RETIREMENT':
      return subject ? `${displayName(subject)} calls time on a ${subject.record.wins}-win career` : 'A retirement';
    case 'CHRONIC_INJURY':
      return subject ? `Injury concerns mount for ${subject.lastName}` : 'Injury news';
    case 'INJURY_SUSTAINED':
      return subject ? `${subject.lastName} sidelined` : 'Injury news';
    case 'CAMP_MOVE':
      return subject ? `${subject.lastName} changes camps` : 'Camp move';
    case 'CAMP_CLOSED':
      return event.summary;
    case 'EVENT_ANNOUNCED':
      return event.summary;
    default:
      return event.summary;
  }
}

function bodyFor(event: SimulationEvent, universe: Universe): string {
  const subject = event.subjectId ? universe.fighter(event.subjectId) : undefined;
  const other = event.secondaryId ? universe.fighter(event.secondaryId) : undefined;

  const parts: string[] = [event.summary];

  if (subject && (event.type === 'FIGHT_RESULT' || event.type.startsWith('TITLE'))) {
    parts.push(
      `${displayName(subject)} moves to ${recordString(subject)} and is on ${formPhrase(subject)}.`,
    );
    if (other) {
      parts.push(`${displayName(other)} falls to ${recordString(other)}.`);
    }
    const camp = subject.campId ? universe.camp(subject.campId) : undefined;
    if (camp) parts.push(`${subject.lastName} trains out of ${camp.name} in ${camp.city}.`);
  }

  if (subject && event.type === 'RETIREMENT') {
    parts.push(
      `They finish with ${recordString(subject)}${subject.career.titleReigns > 0 ? ` and ${subject.career.titleReigns} title reign${subject.career.titleReigns > 1 ? 's' : ''}` : ''}.`,
    );
  }

  if (subject && event.type === 'CAMP_MOVE' && event.secondaryId) {
    const camp = universe.camp(event.secondaryId);
    if (camp) {
      parts.push(
        `${camp.name} carries a reputation of ${Math.round(camp.reputation)} and specialises in ${camp.specialisations[0]?.disciplineKey.replace(/_/g, ' ') ?? 'mixed martial arts'}.`,
      );
    }
  }

  return parts.join(' ');
}

/**
 * Turns a batch of simulation events into articles.
 *
 * Only the most newsworthy events become news — a world where every training injury to an
 * unranked prospect makes the front page is not a world with a front page.
 */
export function generateNews(
  universe: Universe,
  events: readonly SimulationEvent[],
  date: SimDate,
  idFactory: () => string,
  limit = 8,
): NewsArticle[] {
  const rng = universe.rngFor('news', date);
  const ranked = events
    .map((event) => ({ event, score: newsworthiness(event, universe) }))
    .filter((entry) => entry.score >= 30)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return ranked.map(({ event }) => ({
    id: idFactory(),
    published: event.date,
    headline: headlineFor(event, universe, rng.derive(event.type, event.subjectId ?? '')),
    body: bodyFor(event, universe),
    category: CATEGORY_BY_TYPE[event.type] ?? 'result',
    subjectId: event.subjectId,
  }));
}

/** A short scouting line for a fighter, used in previews and profiles. */
export function scoutingLine(fighter: Fighter): string {
  const ability = currentAbility(fighter);
  const potential = fighter.potentialAbility;
  if (potential - ability > 40 && fighter.record.wins < 12) return 'Raw, but the ceiling is obvious.';
  if (ability > 165) return 'Genuinely elite — there is no obvious hole.';
  if (fighter.record.lossStreak >= 3) return 'The results have dried up.';
  if (fighter.record.winStreak >= 4) return 'Nobody in the division wants this fight right now.';
  return 'Solid, durable, and hard to look good against.';
}
