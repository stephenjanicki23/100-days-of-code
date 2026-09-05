/**
 * The simulation tick loop (brief §30, §32).
 *
 * The universe advances in daily steps, with each system subscribing to the cadence it
 * actually needs. Training does not need to run every day, and rankings do not need to be
 * rebuilt every week — running everything daily is the standard way these simulations become
 * unable to scale.
 *
 *   daily   — injury recovery, sharpness decay, contract expiry
 *   weekly  — training, development, fatigue, injury exposure, training-load decisions
 *   monthly — camp evolution, fighter movement, retirements, ranking reconciliation,
 *             development snapshots
 *
 * Every system is a pure function of (state slice, context, rng) and reports what changed;
 * this runner owns all mutation, which is what lets the persistence layer commit an advance
 * as a single transaction.
 */

import { clamp, remap, round } from '../core/math.ts';
import { addDays, daysBetween, exactAgeOn, monthOf, type SimDate } from '../core/time.ts';
import type { AttributeSet } from '../domain/attributes.ts';
import { currentAbility, type Fighter } from '../domain/fighter.ts';
import { campTrainingQuality, type Camp } from '../domain/camp.ts';
import { buildAllRankings } from '../promotion/rankings.ts';
import {
  applyTrainingWeek,
  computeTrainingWeek,
  INTENSITY_INJURY_RISK,
  type TrainingWeekResult,
} from '../development/training.ts';
import { healDueInjuries, openInjuries, rollTrainingInjury, SEVERITY_WEAR_COST } from '../development/injury.ts';
import { generateFighter } from '../generation/fighter-generator.ts';
import { acceptanceFloor } from '../generation/universe-generator.ts';
import { DIVISIONS } from '../domain/divisions.ts';
import type { Universe } from './universe.ts';

/** A periodic record of where a fighter stands, so development can be plotted over years. */
export interface DevelopmentSnapshot {
  readonly fighterId: string;
  readonly date: SimDate;
  readonly currentAbility: number;
  readonly potentialAbility: number;
  readonly age: number;
  readonly attributes: AttributeSet;
}

export interface AdvanceReport {
  daysAdvanced: number;
  weeksSimulated: number;
  trainingWeeks: number;
  injuriesOpened: number;
  injuriesHealed: number;
  retirements: number;
  debuts: number;
  campMoves: number;
  campsClosed: number;
  snapshots: DevelopmentSnapshot[];
  /** Largest ability movers over the advance, for the CLI and the UI. */
  topRisers: { fighterId: string; delta: number }[];
  topFallers: { fighterId: string; delta: number }[];
}

export interface AdvanceOptions {
  /** How often to capture a development snapshot, in days. 0 disables snapshots. */
  readonly snapshotEveryDays?: number;
  readonly onDay?: (date: SimDate) => void;
}

/* --------------------------------------------------------------------- daily */

function runDailySystems(universe: Universe, date: SimDate, report: AdvanceReport): void {
  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired') continue;

    const healed = healDueInjuries(fighter, date);
    if (healed.length > 0) {
      report.injuriesHealed += healed.length;
      if (openInjuries(fighter).length === 0 && fighter.status === 'injured') {
        fighter.status = 'active';
        universe.record({
          type: 'INJURY_RECOVERED',
          date,
          subjectId: fighter.id,
          summary: `${fighter.firstName} ${fighter.lastName} is cleared to return after ${healed[0]!.label}.`,
        });
      }
    }

    // Competitive sharpness decays out of the cage and cannot be trained back entirely.
    const idleDays = fighter.career.lastFightDate ? daysBetween(fighter.career.lastFightDate, date) : 400;
    if (idleDays > 60) {
      fighter.condition.sharpness = clamp(fighter.condition.sharpness - 0.07, 15, 100);
    }
  }

  for (const contract of universe.state.contracts) {
    if (contract.status !== 'active') continue;
    if (contract.expiresDate <= date || contract.fightsRemaining <= 0) {
      contract.status = 'expired';
      const fighter = universe.fighter(contract.fighterId);
      if (fighter) {
        universe.record({
          type: 'CONTRACT_EXPIRED',
          date,
          subjectId: fighter.id,
          secondaryId: contract.promotionId,
          summary: `${fighter.firstName} ${fighter.lastName} has fought out their contract.`,
        });
      }
    }
  }
}

/* -------------------------------------------------------------------- weekly */

/**
 * Fighters manage their own training load. A fatigued or injured fighter backs off; a
 * disciplined, ambitious one pushes when fresh. This is the main reason two fighters at the
 * same camp develop differently.
 */
function chooseTrainingIntensity(fighter: Fighter): Fighter['training']['intensity'] {
  if (openInjuries(fighter).length > 0) return 'recovery';
  const fatigue = fighter.condition.fatigue;
  if (fatigue > 80) return 'recovery';
  if (fatigue > 66) return 'light';

  const drive = (fighter.personality.workEthic * 0.5 + fighter.personality.ambition * 0.3 + fighter.personality.discipline * 0.2) / 100;
  if (fatigue < 30 && drive > 0.72) return 'extreme';
  if (drive > 0.55) return 'hard';
  if (drive > 0.35) return 'moderate';
  return 'light';
}

function runWeeklySystems(universe: Universe, date: SimDate, week: number, report: AdvanceReport): void {
  const abilityDeltas = new Map<string, number>();

  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired') continue;

    const camp = fighter.campId ? universe.camp(fighter.campId) : undefined;
    const coaches = fighter.campId ? universe.campCoaches(fighter.campId) : [];
    const age = exactAgeOn(fighter.birthDate, date);

    fighter.training.intensity = chooseTrainingIntensity(fighter);

    const rng = universe.rngFor('training', fighter.id, week);
    const result: TrainingWeekResult = computeTrainingWeek({ fighter, camp, coaches, age, rng });
    applyTrainingWeek(fighter, result);
    report.trainingWeeks++;
    abilityDeltas.set(fighter.id, result.abilityAfter - result.abilityBefore);

    // Injury exposure for the week just trained.
    const injuryRng = universe.rngFor('injury', fighter.id, week);
    const injury = rollTrainingInjury(
      injuryRng,
      {
        fighter,
        camp,
        age,
        date,
        cause: 'training',
        idFactory: () => universe.nextId('injury'),
      },
      INTENSITY_INJURY_RISK[fighter.training.intensity],
    );

    if (injury) {
      fighter.condition.injuries.push(injury);
      fighter.condition.wearAndTear = clamp(
        fighter.condition.wearAndTear + SEVERITY_WEAR_COST[injury.severity],
        0,
        100,
      );
      fighter.status = 'injured';
      report.injuriesOpened++;
      universe.record({
        type: 'INJURY_SUSTAINED',
        date,
        subjectId: fighter.id,
        summary: `${fighter.firstName} ${fighter.lastName} has suffered ${injury.label} in training and is out until ${injury.expectedReturn}.`,
        payload: { severity: injury.severity, region: injury.region },
      });
    }
  }

  const sorted = [...abilityDeltas.entries()].sort((a, b) => b[1] - a[1]);
  report.topRisers = sorted.slice(0, 5).map(([fighterId, delta]) => ({ fighterId, delta: round(delta, 2) }));
  report.topFallers = sorted.slice(-5).reverse().map(([fighterId, delta]) => ({ fighterId, delta: round(delta, 2) }));
}

/* ------------------------------------------------------------------- monthly */

/**
 * Camp reputation is a slow EMA over the quality of the fighters in the room. The lag is
 * deliberate: reputation that tracked results instantly would let one good month create a
 * super-camp, and the feedback loop of §9 needs damping to stay believable.
 */
function evolveCamps(universe: Universe, date: SimDate, report: AdvanceReport): void {
  for (const camp of universe.state.camps) {
    if (camp.status === 'closed') continue;

    const roster = universe.campFighters(camp.id).filter((f) => f.status !== 'retired');
    const abilities = roster.map(currentAbility).sort((a, b) => b - a);
    const headline = abilities.slice(0, 5);
    const headlineAverage = headline.length > 0 ? headline.reduce((a, b) => a + b, 0) / headline.length : 40;
    const rosterAverage = abilities.length > 0 ? abilities.reduce((a, b) => a + b, 0) / abilities.length : 40;
    // Reputation follows the headline names but is anchored by the depth behind them: a gym
    // with five good fighters and forty journeymen is not an elite room, and judging camps
    // on their top five alone let exactly that happen.
    const quality = headlineAverage * 0.7 + rosterAverage * 0.3;

    const rankedCount = universe.state.rankings.filter(
      (r) => r.rank <= 10 && roster.some((f) => f.id === r.fighterId),
    ).length;

    // A camp is worth what its best fighters are worth. Roster size only matters at the
    // margins: a near-empty gym loses standing however good its facilities are, but a
    // *selective* elite room with four world-class fighters must not be scored as a small
    // one — penalising selectivity collapses the top camps' reputation, drops their
    // acceptance standards, and fills them with journeymen within a few simulated years.
    const rosterFactor = clamp(0.55 + roster.length / 10, 0.5, 1.05);
    const target = clamp(
      (remap(quality, 60, 190, 4, 92) + rankedCount * 2.2 + remap(campTrainingQuality(camp), 20, 95, -6, 6)) *
        rosterFactor,
      3,
      99,
    );

    camp.reputation = round(clamp(camp.reputation + (target - camp.reputation) * 0.06, 3, 99), 2);
    camp.peakReputation = Math.max(camp.peakReputation, camp.reputation);
    camp.history.rankedFighterPeak = Math.max(camp.history.rankedFighterPeak, rankedCount);

    // A camp that has fallen far below its peak and holds nobody of note is finished.
    if (camp.reputation < 12 && camp.peakReputation > 30 && roster.length <= 2) {
      camp.status = 'closed';
      camp.closedDate = date;
      report.campsClosed++;
      for (const fighter of roster) fighter.campId = undefined;
      universe.record({
        type: 'CAMP_CLOSED',
        date,
        subjectId: camp.id,
        summary: `${camp.name} has closed its doors after a long decline.`,
      });
    } else if (camp.reputation < 26 && camp.status === 'active' && camp.peakReputation - camp.reputation > 18) {
      camp.status = 'declining';
    } else if (camp.reputation > 34 && camp.status === 'declining') {
      camp.status = 'active';
    }
  }
}

/**
 * Fighter movement between camps (brief §10) — a scored decision, never a coin flip. A
 * fighter must be genuinely dissatisfied *and* disloyal enough to act on it before they
 * even enter the market.
 */
/** The strongest camp that would currently accept a fighter of this ability. */
function bestReputationAvailable(ability: number): number {
  // `acceptanceFloor` is monotonic in reputation, so this inverts it directly.
  for (let reputation = 97; reputation > 10; reputation--) {
    if (ability >= acceptanceFloor(reputation)) return reputation;
  }
  return 10;
}

function moveFighters(universe: Universe, date: SimDate, month: number, report: AdvanceReport): void {
  const openCamps = universe.state.camps.filter((c) => c.status !== 'closed');

  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired' || fighter.status === 'injured') continue;

    const camp = fighter.campId ? universe.camp(fighter.campId) : undefined;
    const ability = currentAbility(fighter);
    const rng = universe.rngFor('camp-move', fighter.id, month);

    // A fighter with no camp is always looking.
    let dissatisfaction = camp ? 0 : 60;
    if (camp) {
      // The room is beneath them, or falling apart. "Beneath them" is measured against the
      // best camp that would currently take them, using the same standard generation used.
      const deserved = bestReputationAvailable(ability);
      dissatisfaction += clamp(deserved - camp.reputation, 0, 45) * 0.9;
      if (camp.status === 'declining') dissatisfaction += 12;
      if (!camp.headCoachId) dissatisfaction += 18;
      dissatisfaction += clamp(60 - camp.culture.cohesion, 0, 45) * 0.35;
      // Results matter: three straight losses makes a fighter question everything.
      dissatisfaction += fighter.record.lossStreak * 7;
    }

    // Loyalty and a settled temperament are what keep fighters in place.
    const threshold = 22 + fighter.personality.loyalty * 0.45 - fighter.personality.ambition * 0.12;
    if (dissatisfaction < threshold) continue;
    // Even a dissatisfied fighter rarely moves in any given month — leaving a camp mid-career
    // is a disruptive decision, not a monthly reshuffle.
    if (!rng.bool(0.25)) continue;

    const candidates = openCamps
      .filter(
        (c) =>
          c.id !== fighter.campId &&
          universe.campFighters(c.id).length < c.capacity &&
          // A camp that would not sign this fighter is not an option, however keen they are.
          ability >= acceptanceFloor(c.reputation),
      )
      .map((c) => {
        const ambition = (c.reputation / 100) ** 1.6;
        const nationality = c.country === fighter.nationality ? 1.9 : 1;
        return [c, Math.max(0.02, ambition) * nationality] as const;
      });
    if (candidates.length === 0) continue;

    const destination = rng.pickWeighted(candidates);
    // A fighter does not leave for somewhere no better than where they are.
    if (camp && destination.reputation < camp.reputation + 4) continue;

    fighter.campId = destination.id;
    report.campMoves++;
    universe.record({
      type: 'CAMP_MOVE',
      date,
      subjectId: fighter.id,
      secondaryId: destination.id,
      summary: `${fighter.firstName} ${fighter.lastName} has left ${camp?.name ?? 'independent training'} to join ${destination.name}.`,
    });
  }
  universe.reindex();
}

/** Retirement (brief §5 of the roadmap): age, decline, damage and lost ambition. */
function considerRetirements(universe: Universe, date: SimDate, month: number, report: AdvanceReport): void {
  for (const fighter of universe.state.fighters) {
    if (fighter.status === 'retired') continue;
    const age = exactAgeOn(fighter.birthDate, date);
    if (age < 30) continue;

    const ability = currentAbility(fighter);
    const decline = clamp((fighter.potentialAbility - ability) / fighter.potentialAbility, 0, 1);

    let chance = 0;
    chance += clamp((age - 32) * 0.004, 0, 0.06);
    chance += fighter.record.lossStreak * 0.011;
    chance += decline * 0.02;
    chance += clamp((fighter.condition.wearAndTear - 55) / 100, 0, 0.35) * 0.06;
    chance -= clamp(fighter.personality.ambition / 100, 0, 1) * 0.012;
    // A fighter still winning at a high level does not walk away.
    if (fighter.record.winStreak >= 3 && ability > 140) chance *= 0.25;

    if (chance <= 0) continue;
    if (!universe.rngFor('retirement', fighter.id, month).bool(chance)) continue;

    fighter.status = 'retired';
    fighter.retirementDate = date;
    report.retirements++;
    universe.record({
      type: 'RETIREMENT',
      date,
      subjectId: fighter.id,
      summary: `${fighter.firstName} ${fighter.lastName} has retired at ${Math.floor(age)}, finishing ${fighter.record.wins}-${fighter.record.losses}-${fighter.record.draws}.`,
    });
  }
}

/**
 * New fighters entering the sport (brief §38's "living universe" requirement in practice).
 *
 * Without an intake the world simply ages out: after a decade every remaining fighter is
 * past thirty and the divisions hollow. Recruitment tracks the shortfall against the
 * universe's target roster size, so retirements are replaced at the rate they occur rather
 * than by a fixed quota.
 */
function recruitProspects(universe: Universe, date: SimDate, month: number, report: AdvanceReport): void {
  const active = universe.state.fighters.filter((f) => f.status !== 'retired').length;
  const shortfall = universe.state.targetPopulation - active;
  if (shortfall <= 0) return;

  const rng = universe.rngFor('recruitment', month);
  // Close roughly a twelfth of the gap each month, plus a little churn, so intake is steady
  // rather than arriving in an implausible annual wave.
  const intake = Math.max(0, Math.round(shortfall / 12 + rng.float(-0.5, 1.5)));
  if (intake === 0) return;

  const openCamps = universe.state.camps.filter((c) => c.status !== 'closed');

  for (let i = 0; i < intake; i++) {
    const definition = rng.pickWeighted(DIVISIONS.map((d) => [d, d.populationWeight] as const));
    const id = universe.nextId('fighter');
    const fighter = generateFighter(rng, {
      id,
      date,
      divisionKey: definition.key,
      // Debutants are young and, by definition, have realised very little of their ceiling.
      ageRange: [18, 23],
    });

    // A newcomer joins a room that will take them — generally a smaller one.
    const ability = currentAbility(fighter);
    const accepting = openCamps.filter((c) => ability >= acceptanceFloor(c.reputation));
    const candidates = accepting
      .filter((c) => universe.campFighters(c.id).length < c.capacity)
      .map((c) => [c, (c.reputation / 100) ** 1.6 * (c.country === fighter.nationality ? 2 : 1)] as const);
    if (candidates.length > 0) {
      fighter.campId = rng.pickWeighted(candidates).id;
    } else {
      // Every debutant trains somewhere; the least crowded gym that would have them takes them.
      fighter.campId = [...accepting].sort(
        (a, b) =>
          universe.campFighters(a.id).length / a.capacity - universe.campFighters(b.id).length / b.capacity,
      )[0]?.id;
    }

    universe.state.fighters.push(fighter);
    report.debuts++;
    universe.record({
      type: 'FIGHTER_DEBUT',
      date,
      subjectId: fighter.id,
      summary: `${fighter.firstName} ${fighter.lastName} has turned professional out of ${fighter.homeRegion}.`,
    });
  }
  universe.reindex();
}

function captureSnapshots(universe: Universe, date: SimDate): DevelopmentSnapshot[] {
  return universe.state.fighters
    .filter((f) => f.status !== 'retired')
    .map((fighter) => ({
      fighterId: fighter.id,
      date,
      currentAbility: round(currentAbility(fighter), 2),
      potentialAbility: fighter.potentialAbility,
      age: Math.floor(exactAgeOn(fighter.birthDate, date)),
      attributes: { ...fighter.attributes },
    }));
}

/* ------------------------------------------------------------------- runner */

export function advanceUniverse(universe: Universe, days: number, options: AdvanceOptions = {}): AdvanceReport {
  const report: AdvanceReport = {
    daysAdvanced: 0,
    weeksSimulated: 0,
    trainingWeeks: 0,
    injuriesOpened: 0,
    injuriesHealed: 0,
    retirements: 0,
    debuts: 0,
    campMoves: 0,
    campsClosed: 0,
    snapshots: [],
    topRisers: [],
    topFallers: [],
  };
  if (days <= 0) return report;

  const snapshotEvery = options.snapshotEveryDays ?? 30;
  let daysSinceSnapshot = 0;

  for (let i = 0; i < days; i++) {
    const date = addDays(universe.state.currentDate, 1);
    const previousMonth = monthOf(universe.state.currentDate);
    universe.state.currentDate = date;
    report.daysAdvanced++;
    daysSinceSnapshot++;

    runDailySystems(universe, date, report);

    const dayIndex = universe.day;
    if (dayIndex % 7 === 0) {
      report.weeksSimulated++;
      runWeeklySystems(universe, date, universe.week, report);
    }

    const monthRolled = monthOf(date) !== previousMonth;
    if (monthRolled) {
      const monthIndex = universe.day;
      evolveCamps(universe, date, report);
      moveFighters(universe, date, monthIndex, report);
      considerRetirements(universe, date, monthIndex, report);
      recruitProspects(universe, date, monthIndex, report);
      universe.state.rankings = buildAllRankings(
        universe.state.promotions,
        universe.state.fighters,
        date,
        universe.state.rankings,
      );
    }

    if (snapshotEvery > 0 && daysSinceSnapshot >= snapshotEvery) {
      daysSinceSnapshot = 0;
      report.snapshots.push(...captureSnapshots(universe, date));
    }

    options.onDay?.(date);
  }

  universe.reindex();
  return report;
}

/** Named simulation speeds (brief §30). */
export const SIMULATION_SPEEDS = {
  day: 1,
  week: 7,
  month: 30,
  quarter: 91,
  year: 365,
} as const;

export type SimulationSpeed = keyof typeof SIMULATION_SPEEDS;

export function isCampActive(camp: Camp): boolean {
  return camp.status !== 'closed';
}
