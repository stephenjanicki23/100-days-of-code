/**
 * Applying a fight result to the world (Sprint 10 → Sprint 12).
 *
 * The fight engine is pure and knows nothing about careers: it returns what happened. This
 * module is where a result becomes *consequence* — records, streaks, momentum, popularity,
 * purses, injuries carried out of the cage, and the memory each fighter keeps of the other.
 *
 * Keeping it separate from the engine means a fight can be simulated speculatively (for
 * matchmaking, or for a "what if") without touching anything.
 */

import { clamp, remap } from '../core/math.ts';
import { addDays, type SimDate } from '../core/time.ts';
import type { Fighter } from '../domain/fighter.ts';
import type { Fight } from '../domain/fight.ts';
import type { FightResult } from '../fight/engine.ts';
import { createInjury, applyChronicCost } from '../development/injury.ts';
import { buildDivisionRankings } from '../promotion/rankings.ts';
import { crownChampion, promoteInterim, recordDefence } from '../promotion/titles.ts';
import type { Universe } from './universe.ts';

export interface ApplyFightOptions {
  readonly date: SimDate;
  /** Purse actually paid, if a contract governed the bout. */
  readonly purse?: Record<string, number>;
}

function methodCategory(outcome: string): 'ko' | 'submission' | 'decision' | 'other' {
  if (outcome === 'KO' || outcome === 'TKO' || outcome === 'DOCTOR_STOPPAGE') return 'ko';
  if (outcome === 'SUBMISSION') return 'submission';
  if (outcome.includes('DECISION')) return 'decision';
  return 'other';
}

/** Records the result on both fighters' careers, and returns the domain events it generated. */
export function applyFightResult(
  universe: Universe,
  fight: Fight,
  result: FightResult,
  options: ApplyFightOptions,
): void {
  const a = universe.requireFighter(fight.fighterAId);
  const b = universe.requireFighter(fight.fighterBId);
  const { date } = options;

  // Captured before the result is applied, so a title fight can tell a defence from a change.
  const promotionId = a.promotionId ?? b.promotionId;
  const title = promotionId ? universe.title(promotionId, fight.divisionKey) : undefined;
  const championBefore =
    title?.championId ??
    (promotionId
      ? universe.rankingsFor(promotionId, fight.divisionKey).find((entry) => entry.rank === 0)?.fighterId
      : undefined);

  fight.status = 'completed';
  fight.fightDate = date;
  fight.outcome = result.outcome;
  fight.winnerId = result.winnerId;
  fight.finishRound = result.finishRound;
  fight.finishTime = result.finishTime;
  fight.technique = result.technique;

  const drawn = !result.winnerId;
  const winner = result.winnerId === a.id ? a : result.winnerId === b.id ? b : undefined;
  const loser = winner ? (winner.id === a.id ? b : a) : undefined;
  const method = methodCategory(result.outcome);

  for (const fighter of [a, b]) {
    fighter.career.lastFightDate = date;
    // Time in the cage costs something permanent.
    const damageTaken = result.stats[fighter.id]?.damageTaken ?? 0;
    fighter.condition.wearAndTear = clamp(
      fighter.condition.wearAndTear + 0.6 + damageTaken * 0.05,
      0,
      100,
    );
    fighter.condition.fatigue = clamp(fighter.condition.fatigue + 22 + damageTaken * 0.3, 0, 100);
    // Competing sharpens a fighter in a way training cannot.
    fighter.condition.sharpness = clamp(fighter.condition.sharpness + 12, 0, 100);
    fighter.career.careerEarnings += options.purse?.[fighter.id] ?? 0;
  }

  if (drawn) {
    a.record.draws++;
    b.record.draws++;
    a.record.winStreak = 0;
    b.record.winStreak = 0;
    a.record.lossStreak = 0;
    b.record.lossStreak = 0;
  } else if (winner && loser) {
    winner.record.wins++;
    winner.record.winStreak++;
    winner.record.lossStreak = 0;
    loser.record.losses++;
    loser.record.lossStreak++;
    loser.record.winStreak = 0;

    if (method === 'ko') {
      winner.record.koWins++;
      loser.record.koLosses++;
    } else if (method === 'submission') {
      winner.record.submissionWins++;
      loser.record.submissionLosses++;
    } else {
      winner.record.decisionWins++;
      loser.record.decisionLosses++;
    }

    // Beating someone good is worth more than beating someone.
    const opponentQuality = remap(loser.career.reputation, 1, 100, 0.4, 1.8);
    const finishBonus = method === 'decision' ? 1 : 1.5;
    winner.career.momentum = clamp(winner.career.momentum + 26 * finishBonus, -100, 100);
    loser.career.momentum = clamp(loser.career.momentum - 24 * finishBonus, -100, 100);
    winner.career.reputation = clamp(winner.career.reputation + 2.4 * opponentQuality * finishBonus, 1, 100);
    loser.career.reputation = clamp(loser.career.reputation - 1.6, 1, 100);

    // A spectacular finish sells tickets; a dull decision does not.
    const spectacle = method === 'ko' ? 5.5 : method === 'submission' ? 4.5 : 1.8;
    winner.career.popularity = clamp(winner.career.popularity + spectacle * (fight.isTitleFight ? 2 : 1), 1, 100);
    loser.career.popularity = clamp(loser.career.popularity + spectacle * 0.35 - 1, 1, 100);

    // Confidence is a real, visible attribute and results move it.
    winner.attributes.confidence = clamp(winner.attributes.confidence + 1.2, 1, 100);
    loser.attributes.confidence = clamp(loser.attributes.confidence - (method === 'ko' ? 2.4 : 1.2), 1, 100);

    if (fight.isTitleFight && fight.titleType === 'interim' && title) {
      // An interim belt does not dethrone anybody; it sits alongside the real one until the
      // champion comes back and the two are unified.
      title.interimChampionId = winner.id;
      universe.record({
        type: 'INTERIM_TITLE',
        date,
        subjectId: winner.id,
        secondaryId: loser.id,
        summary: `${winner.firstName} ${winner.lastName} is the interim champion, beating ${loser.firstName} ${loser.lastName}.`,
      });
    } else if (fight.isTitleFight) {
      // A champion who wins has defended; a challenger who wins has taken the belt. Reporting
      // every title-fight win as a new champion is wrong roughly half the time.
      if (championBefore === winner.id) {
        winner.career.titleDefenses++;
        if (title) recordDefence(title);
        universe.record({
          type: 'TITLE_DEFENDED',
          date,
          subjectId: winner.id,
          secondaryId: loser.id,
          summary: `${winner.firstName} ${winner.lastName} retains the title, turning back ${loser.firstName} ${loser.lastName}.`,
        });
      } else {
        winner.career.titleReigns++;
        winner.career.titleDefenses = 0;
        if (title) crownChampion(title, winner.id, date);
        universe.record({
          type: 'TITLE_CHANGE',
          date,
          subjectId: winner.id,
          secondaryId: loser.id,
          summary: `${winner.firstName} ${winner.lastName} is the new champion, beating ${loser.firstName} ${loser.lastName}.`,
        });
      }
    }
  }

  rememberOpponent(a, b, result, date);
  rememberOpponent(b, a, result, date);

  // The division reorders immediately. Recomputing one division is cheap — it is the whole
  // point of keeping rankings per promotion and division rather than as one global table —
  // and without it the standings contradict the result that just happened.
  if (promotionId) {
    const promotion = universe.promotion(promotionId);
    if (promotion && promotion.ranksPerDivision > 0) {
      const previous = universe.state.rankings.filter(
        (entry) => entry.promotionId === promotionId && entry.divisionKey === fight.divisionKey,
      );
      // The belt follows the result of a title fight, and is otherwise unaffected.
      const championAfter =
        fight.isTitleFight && fight.titleType !== 'interim' && result.winnerId ? result.winnerId : championBefore;
      const rebuilt = buildDivisionRankings(
        promotion,
        fight.divisionKey,
        universe.state.fighters,
        date,
        previous,
        championAfter,
      );
      universe.state.rankings = universe.state.rankings
        .filter((entry) => !(entry.promotionId === promotionId && entry.divisionKey === fight.divisionKey))
        .concat(rebuilt);
    }
  }

  applyPostFightInjuries(universe, fight, result, date);

  universe.record({
    type: 'FIGHT_RESULT',
    date,
    subjectId: winner?.id ?? a.id,
    secondaryId: loser?.id ?? b.id,
    summary: drawn
      ? `${a.lastName} and ${b.lastName} fought to a draw.`
      : `${winner!.firstName} ${winner!.lastName} defeated ${loser!.firstName} ${loser!.lastName} by ${result.outcome.replace(/_/g, ' ').toLowerCase()}.`,
    payload: { fightId: fight.id, outcome: result.outcome, round: result.finishRound },
  });
}

/**
 * Fighter memory (brief §22). What a fighter carries into a rematch: how it went, how it
 * ended, and a psychological edge that decays as the memory ages.
 */
function rememberOpponent(fighter: Fighter, opponent: Fighter, result: FightResult, date: SimDate): void {
  const existing = fighter.memories.find((memory) => memory.opponentId === opponent.id);
  const won = result.winnerId === fighter.id;
  const lost = result.winnerId === opponent.id;
  const outcome = won ? 'win' : lost ? 'loss' : 'draw';

  // Being finished leaves a deeper mark than losing a decision.
  const severity = result.outcome === 'KO' || result.outcome === 'TKO' ? 1 : result.outcome === 'SUBMISSION' ? 0.85 : 0.45;
  const edge = clamp((won ? severity : lost ? -severity : 0), -1, 1);

  if (existing) {
    existing.meetings++;
    if (won) existing.wins++;
    if (lost) existing.losses++;
    existing.lastResult = outcome;
    existing.lastMethod = result.outcome;
    existing.psychologicalEdge = clamp(existing.psychologicalEdge * 0.4 + edge, -1, 1);
    existing.lastDate = date;
    return;
  }

  fighter.memories.push({
    opponentId: opponent.id,
    meetings: 1,
    wins: won ? 1 : 0,
    losses: lost ? 1 : 0,
    lastResult: outcome,
    lastMethod: result.outcome,
    psychologicalEdge: edge,
    lastDate: date,
  });
}

/**
 * Injuries picked up in the cage. A hard fight costs more than a soft one, and a fighter who
 * was finished by strikes carries the most.
 */
function applyPostFightInjuries(universe: Universe, fight: Fight, result: FightResult, date: SimDate): void {
  for (const fighterId of [fight.fighterAId, fight.fighterBId]) {
    const fighter = universe.requireFighter(fighterId);
    const damage = result.stats[fighterId]?.damageTaken ?? 0;
    const rng = universe.rngFor('fight-injury', fight.id, fighterId);

    // Every fighter takes a mandatory rest after a bout; a knockout loss takes a long one.
    const knockedOut = result.loserId === fighterId && (result.outcome === 'KO' || result.outcome === 'TKO');
    const chance = clamp(0.1 + damage / 160 + (knockedOut ? 0.35 : 0), 0, 0.85);
    if (!rng.bool(chance)) continue;

    const severity = knockedOut
      ? rng.pickWeighted([['moderate' as const, 0.55], ['serious' as const, 0.35], ['severe' as const, 0.1]])
      : rng.pickWeighted([['knock' as const, 0.4], ['minor' as const, 0.35], ['moderate' as const, 0.2], ['serious' as const, 0.05]]);

    const injury = createInjury(rng, {
      fighter,
      age: 30,
      date,
      cause: 'fight',
      idFactory: () => universe.nextId('injury'),
    }, severity);

    fighter.condition.injuries.push(injury);
    applyChronicCost(fighter, injury);
    fighter.status = 'injured';
    universe.record({
      type: 'INJURY_SUSTAINED',
      date,
      subjectId: fighter.id,
      summary: `${fighter.firstName} ${fighter.lastName} leaves the cage with ${injury.label}; out until ${injury.expectedReturn}.`,
      payload: { severity: injury.severity, fightId: fight.id },
    });
  }
}

/** The medical suspension every fighter serves, on top of any injury. */
export function medicalSuspensionUntil(date: SimDate, result: FightResult, fighterId: string): SimDate {
  const knockedOut = result.loserId === fighterId && (result.outcome === 'KO' || result.outcome === 'TKO');
  return addDays(date, knockedOut ? 60 : 21);
}

/** Convenience for tooling: a one-line summary of a completed fight. */
export function summariseResult(result: FightResult, nameFor: (id: string) => string): string {
  if (!result.winnerId) return `Draw after ${result.rounds} rounds.`;
  const via = result.technique ? ` (${result.technique.replace(/_/g, ' ').toLowerCase()})` : '';
  const when = result.finishRound ? ` — R${result.finishRound} ${result.finishTime}` : '';
  return `${nameFor(result.winnerId)} def. ${nameFor(result.loserId!)} by ${result.outcome.replace(/_/g, ' ').toLowerCase()}${via}${when}`;
}
