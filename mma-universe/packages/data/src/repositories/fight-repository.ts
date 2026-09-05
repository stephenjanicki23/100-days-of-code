/**
 * Fight and play-by-play persistence (Sprint 10, completing the Sprint 2 entity set).
 *
 * `fight_event` is strictly append-only. A fight's event stream is the record of what
 * happened; it is written once when the bout is simulated and thereafter only read — by the
 * Fight Center, by the statistics panels, and eventually by the 3D renderer. Nothing in the
 * system is permitted to rewrite history.
 */

import type { Fight, FightEvent, FightResult, JudgeScorecard } from '@mma/sim';
import type { Db } from '../database.ts';

type Row = Record<string, any>;

export interface StoredFight extends Fight {
  /** Convenience for listings; resolved from the fighter table. */
  readonly fighterAName?: string;
  readonly fighterBName?: string;
  readonly winnerName?: string;
}

const UPSERT_FIGHT = `
INSERT INTO fight (id, event_id, division_key, fighter_a_id, fighter_b_id, bout_order, billing,
  is_title_fight, scheduled_rounds, status, outcome, winner_id, finish_round, finish_time, technique, fight_date)
VALUES (@id, @eventId, @divisionKey, @fighterAId, @fighterBId, @boutOrder, @billing,
  @isTitleFight, @scheduledRounds, @status, @outcome, @winnerId, @finishRound, @finishTime, @technique, @fightDate)
ON CONFLICT(id) DO UPDATE SET
  event_id = excluded.event_id, bout_order = excluded.bout_order, billing = excluded.billing,
  is_title_fight = excluded.is_title_fight, scheduled_rounds = excluded.scheduled_rounds,
  status = excluded.status, outcome = excluded.outcome, winner_id = excluded.winner_id,
  finish_round = excluded.finish_round, finish_time = excluded.finish_time,
  technique = excluded.technique, fight_date = excluded.fight_date`;

function fightParams(fight: Fight): Row {
  return {
    id: fight.id,
    eventId: fight.eventId ?? null,
    divisionKey: fight.divisionKey,
    fighterAId: fight.fighterAId,
    fighterBId: fight.fighterBId,
    boutOrder: fight.boutOrder,
    billing: fight.billing,
    isTitleFight: fight.isTitleFight ? 1 : 0,
    scheduledRounds: fight.scheduledRounds,
    status: fight.status,
    outcome: fight.outcome ?? null,
    winnerId: fight.winnerId ?? null,
    finishRound: fight.finishRound ?? null,
    finishTime: fight.finishTime ?? null,
    technique: fight.technique ?? null,
    fightDate: fight.fightDate ?? null,
  };
}

/** Writes the booking, its play-by-play and its scorecards in one transaction. */
export function saveFight(db: Db, fight: Fight, result?: FightResult): void {
  const write = db.transaction(() => {
    db.prepare(UPSERT_FIGHT).run(fightParams(fight));
    if (!result) return;

    // Append-only: writing the same fight twice would duplicate history, so the stream is
    // cleared first and rewritten as a unit. In normal operation this runs exactly once.
    db.prepare('DELETE FROM fight_event WHERE fight_id = ?').run(fight.id);
    const insertEvent = db.prepare(
      `INSERT INTO fight_event (fight_id, sequence, round, timestamp, event_type, position,
         attacker_id, defender_id, technique, target, result, damage, description, payload)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    for (const event of result.events) {
      // Events are a discriminated union; the columns below are the queryable projection of
      // whichever variant this is, and the full event is kept verbatim in `payload`.
      const any = event as unknown as Record<string, unknown>;
      insertEvent.run(
        fight.id,
        event.sequence,
        event.round,
        event.timestamp,
        event.eventType,
        event.position,
        (any.attacker as string) ?? (any.fighterId as string) ?? null,
        (any.defender as string) ?? null,
        (any.technique as string) ?? null,
        (any.target as string) ?? null,
        (any.result as string) ?? null,
        typeof any.damage === 'number' ? any.damage : null,
        event.description,
        JSON.stringify(event),
      );
    }

    db.prepare('DELETE FROM scorecard WHERE fight_id = ?').run(fight.id);
    const insertScore = db.prepare(
      'INSERT INTO scorecard (fight_id, judge_name, round, score_a, score_b) VALUES (?, ?, ?, ?, ?)',
    );
    for (const card of result.scorecards) {
      for (const roundScore of card.rounds) {
        insertScore.run(fight.id, card.judgeName, roundScore.round, roundScore.a, roundScore.b);
      }
    }
  });
  write();
}

function toFight(row: Row): StoredFight {
  return {
    id: row.id,
    eventId: row.event_id ?? undefined,
    divisionKey: row.division_key,
    fighterAId: row.fighter_a_id,
    fighterBId: row.fighter_b_id,
    boutOrder: row.bout_order,
    billing: row.billing,
    isTitleFight: row.is_title_fight === 1,
    scheduledRounds: row.scheduled_rounds,
    status: row.status,
    outcome: row.outcome ?? undefined,
    winnerId: row.winner_id ?? undefined,
    finishRound: row.finish_round ?? undefined,
    finishTime: row.finish_time ?? undefined,
    technique: row.technique ?? undefined,
    fightDate: row.fight_date ?? undefined,
    fighterAName: row.a_name ?? undefined,
    fighterBName: row.b_name ?? undefined,
    winnerName: row.w_name ?? undefined,
  };
}

const FIGHT_SELECT = `
SELECT f.*,
       a.first_name || ' ' || a.last_name AS a_name,
       b.first_name || ' ' || b.last_name AS b_name,
       w.first_name || ' ' || w.last_name AS w_name
FROM fight f
JOIN fighter a ON a.id = f.fighter_a_id
JOIN fighter b ON b.id = f.fighter_b_id
LEFT JOIN fighter w ON w.id = f.winner_id`;

export function loadFight(db: Db, fightId: string): StoredFight | undefined {
  const row = db.prepare(`${FIGHT_SELECT} WHERE f.id = ?`).get(fightId) as Row | undefined;
  return row ? toFight(row) : undefined;
}

export function recentFights(db: Db, limit = 25): StoredFight[] {
  const rows = db
    .prepare(`${FIGHT_SELECT} WHERE f.status = 'completed' ORDER BY f.fight_date DESC, f.id DESC LIMIT ?`)
    .all(limit) as Row[];
  return rows.map(toFight);
}

export function fightsForFighter(db: Db, fighterId: string): StoredFight[] {
  const rows = db
    .prepare(`${FIGHT_SELECT} WHERE f.fighter_a_id = ? OR f.fighter_b_id = ? ORDER BY f.fight_date DESC`)
    .all(fighterId, fighterId) as Row[];
  return rows.map(toFight);
}

/** The full play-by-play, in order. Parsed back into contract-shaped events. */
export function loadFightEvents(db: Db, fightId: string): FightEvent[] {
  const rows = db
    .prepare('SELECT payload FROM fight_event WHERE fight_id = ? ORDER BY sequence')
    .all(fightId) as { payload: string }[];
  return rows.map((row) => JSON.parse(row.payload) as FightEvent);
}

export function loadScorecards(db: Db, fightId: string): JudgeScorecard[] {
  const rows = db
    .prepare('SELECT judge_name, round, score_a, score_b FROM scorecard WHERE fight_id = ? ORDER BY judge_name, round')
    .all(fightId) as Row[];

  const byJudge = new Map<string, JudgeScorecard>();
  for (const row of rows) {
    const existing = byJudge.get(row.judge_name);
    const entry = { round: row.round as number, a: row.score_a as number, b: row.score_b as number };
    if (existing) {
      (existing.rounds as { round: number; a: number; b: number }[]).push(entry);
    } else {
      byJudge.set(row.judge_name, {
        judgeId: row.judge_name,
        judgeName: row.judge_name,
        rounds: [entry],
        totalA: 0,
        totalB: 0,
      });
    }
  }

  return [...byJudge.values()].map((card) => ({
    ...card,
    totalA: card.rounds.reduce((sum, r) => sum + r.a, 0),
    totalB: card.rounds.reduce((sum, r) => sum + r.b, 0),
  }));
}

export function fightCount(db: Db): number {
  return (db.prepare("SELECT COUNT(*) AS n FROM fight WHERE status = 'completed'").get() as { n: number }).n;
}
