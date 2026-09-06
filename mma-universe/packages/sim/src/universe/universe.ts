/**
 * The universe container.
 *
 * `UniverseState` is plain, serialisable data — it is what the persistence layer reads and
 * writes. `Universe` wraps it with lookup indices and, crucially, with `rngFor`, the single
 * entry point through which every system obtains randomness. Nothing in the simulation is
 * allowed to construct an `Rng` any other way, because the address passed here is what makes
 * a run reproducible.
 */

import { Rng } from '../core/rng.ts';
import type { SimDate } from '../core/time.ts';
import { daysBetween, weekIndex } from '../core/time.ts';
import type { Fighter } from '../domain/fighter.ts';
import type { Camp, Coach } from '../domain/camp.ts';
import type { Contract, Promotion, RankingEntry } from '../domain/promotion.ts';
import type { PromotionEvent, Venue } from '../domain/event.ts';
import type { Fight } from '../domain/fight.ts';
import { titleFor, type TitleRecord } from '../promotion/titles.ts';
import type { NewsArticle } from '../world/news.ts';
import type { Storyline } from '../world/storylines.ts';

/** Domain events produced by the tick loop; the news and storyline engines read these. */
export interface SimulationEvent {
  readonly type: string;
  readonly date: SimDate;
  readonly subjectId?: string;
  readonly secondaryId?: string;
  readonly summary: string;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface UniverseState {
  seed: string;
  startDate: SimDate;
  currentDate: SimDate;
  promotions: Promotion[];
  camps: Camp[];
  coaches: Coach[];
  fighters: Fighter[];
  contracts: Contract[];
  rankings: RankingEntry[];
  /** One record per promotion and division; the authority on who holds a belt. */
  titles: TitleRecord[];
  venues: Venue[];
  /** Scheduled and completed fight cards. */
  cards: PromotionEvent[];
  /** Booked and completed bouts. Play-by-play lives in the database, not here. */
  fights: Fight[];
  /** Published articles, newest last. */
  news: NewsArticle[];
  /** Active and resolved storylines. */
  storylines: Storyline[];
  events: SimulationEvent[];
  /**
   * The active-roster size the world sustains. New prospects are recruited toward this
   * number as fighters retire, which is what stops the universe from ageing out.
   */
  targetPopulation: number;
  /** Id counters, carried across sessions so ids never collide after a reload. */
  idCounters: Record<string, number>;
}

export class Universe {
  private fighterIndex = new Map<string, Fighter>();
  private campIndex = new Map<string, Camp>();
  private coachIndex = new Map<string, Coach>();
  private promotionIndex = new Map<string, Promotion>();
  private campRoster = new Map<string, Fighter[]>();

  constructor(readonly state: UniverseState) {
    this.reindex();
  }

  /** Rebuilds lookup indices. Called after any bulk mutation of the state arrays. */
  reindex(): void {
    this.fighterIndex = new Map(this.state.fighters.map((f) => [f.id, f]));
    this.campIndex = new Map(this.state.camps.map((c) => [c.id, c]));
    this.coachIndex = new Map(this.state.coaches.map((c) => [c.id, c]));
    this.promotionIndex = new Map(this.state.promotions.map((p) => [p.id, p]));
    this.campRoster = new Map();
    for (const fighter of this.state.fighters) {
      if (!fighter.campId) continue;
      const roster = this.campRoster.get(fighter.campId);
      if (roster) roster.push(fighter);
      else this.campRoster.set(fighter.campId, [fighter]);
    }
  }

  /**
   * The only sanctioned source of randomness in the simulation.
   *
   * `domain` names the subsystem, and the remaining parts address the specific decision.
   * Because the tick is part of the address, the same fighter's training week is drawn from
   * the same stream no matter what else the universe did that day.
   */
  rngFor(domain: string, ...parts: (string | number)[]): Rng {
    return Rng.fromSeed(this.state.seed, domain, ...parts);
  }

  get date(): SimDate {
    return this.state.currentDate;
  }

  /** Days elapsed since the universe began — the canonical tick counter. */
  get day(): number {
    return daysBetween(this.state.startDate, this.state.currentDate);
  }

  get week(): number {
    return weekIndex(this.state.startDate, this.state.currentDate);
  }

  fighter(id: string): Fighter | undefined {
    return this.fighterIndex.get(id);
  }

  requireFighter(id: string): Fighter {
    const fighter = this.fighterIndex.get(id);
    if (!fighter) throw new RangeError(`Unknown fighter: ${id}`);
    return fighter;
  }

  camp(id: string): Camp | undefined {
    return this.campIndex.get(id);
  }

  coach(id: string): Coach | undefined {
    return this.coachIndex.get(id);
  }

  promotion(id: string): Promotion | undefined {
    return this.promotionIndex.get(id);
  }

  campFighters(campId: string): readonly Fighter[] {
    return this.campRoster.get(campId) ?? [];
  }

  campCoaches(campId: string): readonly Coach[] {
    const camp = this.campIndex.get(campId);
    if (!camp) return [];
    return camp.coachIds.map((id) => this.coachIndex.get(id)).filter((c): c is Coach => c !== undefined);
  }

  activeFighters(): readonly Fighter[] {
    return this.state.fighters.filter((f) => f.status !== 'retired');
  }

  fightersInDivision(divisionKey: string, promotionId?: string): readonly Fighter[] {
    return this.state.fighters.filter(
      (f) =>
        f.divisionKey === divisionKey &&
        f.status !== 'retired' &&
        (promotionId === undefined || f.promotionId === promotionId),
    );
  }

  rankingsFor(promotionId: string, divisionKey: string): RankingEntry[] {
    return this.state.rankings
      .filter((r) => r.promotionId === promotionId && r.divisionKey === divisionKey)
      .sort((a, b) => a.rank - b.rank);
  }

  contractFor(fighterId: string): Contract | undefined {
    return this.state.contracts.find((c) => c.fighterId === fighterId && c.status === 'active');
  }

  title(promotionId: string, divisionKey: string): TitleRecord | undefined {
    return titleFor(this.state.titles, promotionId, divisionKey);
  }

  venue(id: string): Venue | undefined {
    return this.state.venues.find((v) => v.id === id);
  }

  card(id: string): PromotionEvent | undefined {
    return this.state.cards.find((c) => c.id === id);
  }

  fight(id: string): Fight | undefined {
    return this.state.fights.find((f) => f.id === id);
  }

  /** Cards scheduled on or after a date, soonest first. */
  upcomingCards(from: string): PromotionEvent[] {
    return this.state.cards
      .filter((card) => card.status === 'scheduled' && card.date >= from)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  fightsOnCard(cardId: string): Fight[] {
    return this.state.fights.filter((fight) => fight.eventId === cardId).sort((a, b) => a.boutOrder - b.boutOrder);
  }

  record(event: SimulationEvent): void {
    this.state.events.push(event);
  }

  /** Allocates the next id for a kind, persisting the counter in the universe state. */
  nextId(kind: string): string {
    const next = (this.state.idCounters[kind] ?? 0) + 1;
    this.state.idCounters[kind] = next;
    return `${kind}_${String(next).padStart(5, '0')}`;
  }
}
