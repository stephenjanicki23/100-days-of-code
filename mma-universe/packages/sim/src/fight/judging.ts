/**
 * Judging (Sprint 7, brief §19).
 *
 * Judges are modelled *independently*, each with their own weighting of what wins a round.
 * That is the whole reason split decisions exist: one judge rewards damage, another rewards
 * control, and a close round genuinely looks different to each of them. Three judges reading
 * from one shared formula would never disagree, and a simulation without controversial
 * decisions is missing something real about the sport.
 */

import { clamp } from '../core/math.ts';
import { Rng } from '../core/rng.ts';
import type { JudgeScorecard } from './events.ts';
import type { Combatant, RoundStats } from './combatant.ts';

export interface Judge {
  readonly id: string;
  readonly name: string;
  /** How much each criterion counts for this judge. */
  readonly weights: {
    readonly significantStrikes: number;
    readonly damage: number;
    readonly control: number;
    readonly takedowns: number;
    readonly submissionThreat: number;
    readonly aggression: number;
  };
  /** Reluctance to score 10-8; some judges essentially never do. */
  readonly tenEightThreshold: number;
}

const JUDGE_SURNAMES = [
  'Alvarez', 'Petrov', 'Nakamura', 'O\'Hara', 'Grimaldi', 'Baptiste', 'Lindqvist',
  'Okafor', 'Duarte', 'Kaminski', 'Sorensen', 'Reyes', 'Whitfield', 'Marchetti',
];

const JUDGE_FIRST_NAMES = ['Ana', 'Bruce', 'Carla', 'Derek', 'Elena', 'Frank', 'Grace', 'Hugo', 'Ines', 'Karl'];

/**
 * Generates a panel of three. Each judge is drawn with a bias — a striking judge, a grappling
 * judge, a damage judge — because that variation is what produces disagreement.
 */
export function generateJudges(rng: Rng): Judge[] {
  // Names must be distinct: a real panel has three different officials, and downstream a
  // scorecard is identified by the judge who wrote it.
  const used = new Set<string>();
  const uniqueName = (judgeRng: Rng): string => {
    for (let attempt = 0; attempt < 40; attempt++) {
      const candidate = `${judgeRng.pick(JUDGE_FIRST_NAMES)} ${judgeRng.pick(JUDGE_SURNAMES)}`;
      if (!used.has(candidate)) {
        used.add(candidate);
        return candidate;
      }
    }
    const fallback = `${judgeRng.pick(JUDGE_FIRST_NAMES)} ${judgeRng.pick(JUDGE_SURNAMES)} ${used.size + 1}`;
    used.add(fallback);
    return fallback;
  };

  return Array.from({ length: 3 }, (_, index) => {
    const judgeRng = rng.derive('judge', index);
    const strikingLean = judgeRng.float(0.7, 1.35);
    const grapplingLean = judgeRng.float(0.7, 1.35);
    return {
      id: `judge_${index + 1}`,
      name: uniqueName(judgeRng),
      weights: {
        significantStrikes: 1 * strikingLean,
        damage: judgeRng.float(0.8, 1.5),
        control: 0.55 * grapplingLean,
        takedowns: 0.7 * grapplingLean,
        submissionThreat: 0.65 * grapplingLean,
        aggression: judgeRng.float(0.25, 0.6),
      },
      tenEightThreshold: judgeRng.float(3.4, 5.6),
    };
  });
}

/** One judge's view of what a fighter did in a round. */
function scoreFor(judge: Judge, stats: RoundStats, damageDealt: number): number {
  const { weights } = judge;
  return (
    stats.significantStrikesLanded * weights.significantStrikes +
    damageDealt * weights.damage * 0.35 +
    (stats.controlTime / 60) * weights.control * 6 +
    stats.takedownsLanded * weights.takedowns * 4 +
    stats.submissionAttempts * weights.submissionThreat * 3.5 +
    stats.knockdowns * 12 +
    (stats.significantStrikesAttempted / 10) * weights.aggression
  );
}

export interface RoundScore {
  readonly judgeId: string;
  readonly round: number;
  readonly a: number;
  readonly b: number;
}

/**
 * Scores one round on the ten-point must system. The winner takes 10; the margin decides
 * whether the loser takes 9 or 8.
 */
export function scoreRound(
  judge: Judge,
  round: number,
  a: Combatant,
  b: Combatant,
  roundIndex: number,
): RoundScore {
  const statsA = a.stats[roundIndex] ?? { ...a.stats[0]! };
  const statsB = b.stats[roundIndex] ?? { ...b.stats[0]! };

  const scoreA = scoreFor(judge, statsA, statsA.damageDealt);
  const scoreB = scoreFor(judge, statsB, statsB.damageDealt);
  const total = scoreA + scoreB;

  // A round where nothing happened is a 10-9 to whoever did marginally more; a completely
  // dead round is scored 10-10 by nobody in practice, so the tie goes on total offence.
  if (total === 0) return { judgeId: judge.id, round, a: 10, b: 9 };

  const margin = Math.abs(scoreA - scoreB) / Math.max(1, Math.min(scoreA, scoreB) + 4);
  const dominant = margin > judge.tenEightThreshold || statsA.knockdowns >= 2 || statsB.knockdowns >= 2;
  const loserScore = dominant ? 8 : 9;

  return scoreA >= scoreB
    ? { judgeId: judge.id, round, a: 10, b: loserScore }
    : { judgeId: judge.id, round, a: loserScore, b: 10 };
}

export interface DecisionResult {
  readonly outcome: 'UNANIMOUS_DECISION' | 'SPLIT_DECISION' | 'MAJORITY_DECISION' | 'DRAW' | 'MAJORITY_DRAW';
  readonly winner: 'a' | 'b' | undefined;
  readonly scorecards: JudgeScorecard[];
}

/** Tallies the panel and classifies the decision. */
export function resolveDecision(judges: readonly Judge[], scores: readonly RoundScore[]): DecisionResult {
  const scorecards: JudgeScorecard[] = judges.map((judge) => {
    const rounds = scores
      .filter((score) => score.judgeId === judge.id)
      .sort((x, y) => x.round - y.round)
      .map((score) => ({ round: score.round, a: score.a, b: score.b }));
    return {
      judgeId: judge.id,
      judgeName: judge.name,
      rounds,
      totalA: rounds.reduce((sum, round) => sum + round.a, 0),
      totalB: rounds.reduce((sum, round) => sum + round.b, 0),
    };
  });

  let forA = 0;
  let forB = 0;
  let even = 0;
  for (const card of scorecards) {
    if (card.totalA > card.totalB) forA++;
    else if (card.totalB > card.totalA) forB++;
    else even++;
  }

  if (forA === 3 || forB === 3) {
    return { outcome: 'UNANIMOUS_DECISION', winner: forA === 3 ? 'a' : 'b', scorecards };
  }
  if (forA === 2 && forB === 1) return { outcome: 'SPLIT_DECISION', winner: 'a', scorecards };
  if (forB === 2 && forA === 1) return { outcome: 'SPLIT_DECISION', winner: 'b', scorecards };
  if (forA === 2 && even === 1) return { outcome: 'MAJORITY_DECISION', winner: 'a', scorecards };
  if (forB === 2 && even === 1) return { outcome: 'MAJORITY_DECISION', winner: 'b', scorecards };
  if (even >= 2) return { outcome: 'MAJORITY_DRAW', winner: undefined, scorecards };
  return { outcome: 'DRAW', winner: undefined, scorecards };
}

/** Whether a fighter is behind on the unofficial tally, for corner urgency. */
export function isBehind(scores: readonly RoundScore[], side: 'a' | 'b'): boolean {
  let mine = 0;
  let theirs = 0;
  for (const score of scores) {
    mine += side === 'a' ? score.a : score.b;
    theirs += side === 'a' ? score.b : score.a;
  }
  return mine < theirs;
}

export function clampScore(value: number): number {
  return clamp(Math.round(value), 7, 10);
}
