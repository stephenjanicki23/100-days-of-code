/**
 * The storyline and rivalry engines (Sprint 15, brief §27).
 *
 * Storylines are *detected*, not authored. The simulation already produces the raw material —
 * repeated meetings, close decisions, title chases, prospects rising, veterans sliding — and
 * this module reads the world and notices when a pattern has become a story worth following.
 *
 * Writing them the other way round, by scripting narratives and then making the simulation
 * serve them, is how these systems end up feeling fake. Everything below is a query.
 */

import { clamp } from '../core/math.ts';
import { daysBetween, type SimDate } from '../core/time.ts';
import { currentAbility, displayName, type Fighter } from '../domain/fighter.ts';
import { division } from '../domain/divisions.ts';
import type { Universe } from '../universe/universe.ts';

export type StorylineKind =
  | 'rivalry'
  | 'title_chase'
  | 'prospect_rise'
  | 'veteran_decline'
  | 'comeback'
  | 'camp_rivalry'
  | 'unfinished_business';

export interface Storyline {
  readonly id: string;
  kind: StorylineKind;
  title: string;
  started: SimDate;
  ended?: SimDate;
  status: 'active' | 'resolved';
  /** Fighter or camp ids involved. */
  participants: string[];
  /** 0-100. How much attention this story is getting; decays without developments. */
  heat: number;
  /** Human-readable developments, newest last. */
  beats: { date: SimDate; text: string }[];
}

const HEAT_DECAY_PER_MONTH = 12;
const RESOLVE_BELOW_HEAT = 8;

/* ---------------------------------------------------------------- detection */

/**
 * A rivalry is two fighters who keep being matched, especially when the fights are close.
 * A one-sided pairing is not a rivalry, however many times it happens.
 */
function detectRivalries(universe: Universe, date: SimDate, idFactory: () => string): Storyline[] {
  const found: Storyline[] = [];
  const seen = new Set<string>();

  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired') continue;
    for (const memory of fighter.memories) {
      if (memory.meetings < 2) continue;
      const key = [fighter.id, memory.opponentId].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);

      const opponent = universe.fighter(memory.opponentId);
      if (!opponent || opponent.status === 'retired') continue;

      // Close series make rivalries; a sweep does not.
      const evenness = 1 - Math.abs(memory.wins - memory.losses) / memory.meetings;
      if (evenness < 0.4) continue;

      const heat = clamp(
        40 + memory.meetings * 12 + evenness * 25 + (fighter.career.popularity + opponent.career.popularity) * 0.15,
        0,
        100,
      );

      found.push({
        id: idFactory(),
        kind: memory.meetings >= 3 ? 'rivalry' : 'unfinished_business',
        title: `${fighter.lastName} vs ${opponent.lastName}`,
        started: memory.lastDate,
        status: 'active',
        participants: [fighter.id, opponent.id],
        heat,
        beats: [
          {
            date: memory.lastDate,
            text: `${memory.meetings} meetings and counting — the series stands at ${memory.wins}-${memory.losses} to ${fighter.lastName}.`,
          },
        ],
      });
    }
  }

  return found;
}

/** A contender on a run that the division cannot ignore. */
function detectTitleChases(universe: Universe, date: SimDate, idFactory: () => string): Storyline[] {
  const found: Storyline[] = [];

  for (const promotion of universe.state.promotions) {
    if (promotion.ranksPerDivision <= 0) continue;
    for (const divisionKey of promotion.divisionKeys) {
      const rankings = universe.rankingsFor(promotion.id, divisionKey);
      for (const entry of rankings) {
        if (entry.rank === 0 || entry.rank > 5) continue;
        const fighter = universe.fighter(entry.fighterId);
        if (!fighter || fighter.record.winStreak < 4) continue;

        found.push({
          id: idFactory(),
          kind: 'title_chase',
          title: `${fighter.lastName}'s run at the ${division(divisionKey).name} title`,
          started: date,
          status: 'active',
          participants: [fighter.id],
          heat: clamp(45 + fighter.record.winStreak * 7 + fighter.career.popularity * 0.25, 0, 100),
          beats: [
            {
              date,
              text: `${displayName(fighter)} is ${fighter.record.winStreak} straight and ranked #${entry.rank}. The title shot is getting hard to deny.`,
            },
          ],
        });
      }
    }
  }

  return found;
}

/** A young fighter climbing fast, and a former contender falling out of the picture. */
function detectCareerArcs(universe: Universe, date: SimDate, idFactory: () => string): Storyline[] {
  const found: Storyline[] = [];

  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired') continue;
    const ability = currentAbility(fighter);
    const age = Number(date.slice(0, 4)) - Number(fighter.birthDate.slice(0, 4));

    if (age <= 25 && ability > 140 && fighter.record.winStreak >= 3 && fighter.record.losses <= 1) {
      found.push({
        id: idFactory(),
        kind: 'prospect_rise',
        title: `The rise of ${fighter.lastName}`,
        started: date,
        status: 'active',
        participants: [fighter.id],
        heat: clamp(35 + (fighter.potentialAbility - ability) * 0.3 + fighter.record.winStreak * 6, 0, 100),
        beats: [
          {
            date,
            text: `${displayName(fighter)} is ${age} and already at the edge of the rankings, with a ceiling well above where they are now.`,
          },
        ],
      });
    }

    if (age >= 34 && fighter.record.lossStreak >= 2 && fighter.career.titleReigns > 0) {
      found.push({
        id: idFactory(),
        kind: 'veteran_decline',
        title: `${fighter.lastName} at the crossroads`,
        started: date,
        status: 'active',
        participants: [fighter.id],
        heat: clamp(30 + fighter.career.popularity * 0.4 + fighter.record.lossStreak * 8, 0, 100),
        beats: [
          {
            date,
            text: `A former champion on ${fighter.record.lossStreak} straight defeats at ${age}. The questions are getting louder.`,
          },
        ],
      });
    }

    if (age >= 30 && fighter.record.winStreak >= 3 && fighter.condition.wearAndTear > 45) {
      found.push({
        id: idFactory(),
        kind: 'comeback',
        title: `${fighter.lastName} is not finished yet`,
        started: date,
        status: 'active',
        participants: [fighter.id],
        heat: clamp(30 + fighter.record.winStreak * 8, 0, 100),
        beats: [{ date, text: `Written off a year ago; ${fighter.record.winStreak} straight wins since.` }],
      });
    }
  }

  return found;
}

/**
 * Camp rivalries: two gyms whose fighters keep beating each other. This is emergent by
 * construction — nobody assigns camps an enemy, the pattern just appears in the results.
 */
function detectCampRivalries(universe: Universe, date: SimDate, idFactory: () => string): Storyline[] {
  const clashes = new Map<string, { count: number; camps: [string, string] }>();

  for (const fighter of universe.state.fighters) {
    if (!fighter.campId) continue;
    for (const memory of fighter.memories) {
      const opponent = universe.fighter(memory.opponentId);
      if (!opponent?.campId || opponent.campId === fighter.campId) continue;
      const key = [fighter.campId, opponent.campId].sort().join('|');
      const existing = clashes.get(key);
      if (existing) existing.count += memory.meetings;
      else clashes.set(key, { count: memory.meetings, camps: key.split('|') as [string, string] });
    }
  }

  const found: Storyline[] = [];
  for (const { count, camps } of clashes.values()) {
    // Each meeting is counted from both sides, so the threshold is in whole fights.
    if (count < 8) continue;
    const first = universe.camp(camps[0]);
    const second = universe.camp(camps[1]);
    if (!first || !second) continue;

    found.push({
      id: idFactory(),
      kind: 'camp_rivalry',
      title: `${first.name} vs ${second.name}`,
      started: date,
      status: 'active',
      participants: [first.id, second.id],
      heat: clamp(30 + count * 4, 0, 100),
      beats: [{ date, text: `${Math.floor(count / 2)} fights between the two camps, and neither is backing down.` }],
    });
  }

  return found;
}

/* ------------------------------------------------------------------- upkeep */

/** True when two storylines are about the same thing, so a detector does not duplicate one. */
function sameStory(a: Storyline, b: Storyline): boolean {
  if (a.kind !== b.kind) return false;
  const left = [...a.participants].sort().join('|');
  const right = [...b.participants].sort().join('|');
  return left === right;
}

export interface StorylineUpdate {
  readonly created: Storyline[];
  readonly resolved: Storyline[];
}

/**
 * Runs a detection pass and ages the existing stories.
 *
 * Heat decays every month, so a story that stops producing developments fades out rather
 * than living forever — which is the difference between a world with history and a world
 * with an ever-growing list.
 */
export function updateStorylines(
  universe: Universe,
  existing: Storyline[],
  date: SimDate,
  idFactory: () => string,
): StorylineUpdate {
  const created: Storyline[] = [];
  const resolved: Storyline[] = [];

  for (const storyline of existing) {
    if (storyline.status !== 'active') continue;
    storyline.heat = clamp(storyline.heat - HEAT_DECAY_PER_MONTH, 0, 100);
    const stale = daysBetween(storyline.started, date) > 900;
    const retired = storyline.participants.every((id) => universe.fighter(id)?.status === 'retired');
    if (storyline.heat <= RESOLVE_BELOW_HEAT || stale || retired) {
      storyline.status = 'resolved';
      storyline.ended = date;
      resolved.push(storyline);
    }
  }

  const detected = [
    ...detectRivalries(universe, date, idFactory),
    ...detectTitleChases(universe, date, idFactory),
    ...detectCareerArcs(universe, date, idFactory),
    ...detectCampRivalries(universe, date, idFactory),
  ];

  for (const candidate of detected) {
    const match = existing.find((storyline) => storyline.status === 'active' && sameStory(storyline, candidate));
    if (match) {
      // An ongoing story gets hotter when the world keeps giving it material.
      match.heat = clamp(Math.max(match.heat, candidate.heat), 0, 100);
      const latest = candidate.beats[candidate.beats.length - 1];
      if (latest && match.beats[match.beats.length - 1]?.text !== latest.text) match.beats.push(latest);
      continue;
    }
    existing.push(candidate);
    created.push(candidate);
  }

  return { created, resolved };
}

/** The stories a dashboard should lead with. */
export function hottestStorylines(storylines: readonly Storyline[], limit = 6): Storyline[] {
  return storylines
    .filter((storyline) => storyline.status === 'active')
    .sort((a, b) => b.heat - a.heat)
    .slice(0, limit);
}

/** Whether the matchmaker should push a specific pairing because a story demands it. */
export function storylineBonus(storylines: readonly Storyline[], a: Fighter, b: Fighter): number {
  const pair = [a.id, b.id].sort().join('|');
  for (const storyline of storylines) {
    if (storyline.status !== 'active') continue;
    if ([...storyline.participants].sort().join('|') === pair) {
      return storyline.heat * 0.45;
    }
  }
  return 0;
}
