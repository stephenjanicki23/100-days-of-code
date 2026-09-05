/**
 * The fight engine (Sprints 7-10).
 *
 * A fight is simulated as a sequence of *exchanges*, not as a per-second tick. Each exchange
 * takes a variable slice of the clock, one fighter initiates, the action resolves against the
 * other's effective ability, and the consequences — damage, stamina, position, momentum —
 * feed into the next one. Every exchange emits one or more `FightEvent`s, which are the only
 * output anything downstream ever sees.
 *
 * The engine is pure: it takes two fighters, a configuration and a seeded `Rng`, and returns
 * a result. It writes nothing, logs nothing, and mutates neither `Fighter` it was given.
 * Simulating the same fight twice produces identical events.
 */

import { clamp, logistic, remap, round as roundTo } from '../core/math.ts';
import { Rng } from '../core/rng.ts';
import type { Fighter } from '../domain/fighter.ts';
import { effective, createCombatant, beginRound, currentRound, reachAdvantage, reachModifier, type Combatant } from './combatant.ts';
import { applyStrikeDamage, damageDescription, needsDoctor, recoverDamageBetweenRounds, totalDamage } from './damage.ts';
import { effectiveOutput, recover, recoverBetweenRounds, spend } from './stamina.ts';
import { adaptInFight, buildGamePlan, cornerInstructions } from './tactics.ts';
import {
  CLINCH_STRIKES,
  GROUND_STRIKES,
  SUBMISSIONS,
  TAKEDOWNS,
  groundPosition,
  isGroundPosition,
  standingStrikes,
  type Range,
  type StrikeDefinition,
  type SubmissionDefinition,
  type TakedownDefinition,
} from './techniques.ts';
import {
  FIGHT_EVENT_SCHEMA_VERSION,
  formatRoundClock,
  type ActionResult,
  type FightEvent,
  type FightOutcome,
  type FightPosition,
  type JudgeScorecard,
} from './events.ts';
import { generateJudges, isBehind, resolveDecision, scoreRound, type Judge, type RoundScore } from './judging.ts';

export interface FightConfig {
  readonly fightId: string;
  /** 3 for a normal bout, 5 for a main event or a title fight. */
  readonly rounds?: number;
  readonly roundSeconds?: number;
  readonly isTitleFight?: boolean;
}

export interface FightStats {
  readonly significantStrikesLanded: number;
  readonly significantStrikesAttempted: number;
  readonly totalStrikesLanded: number;
  readonly headStrikes: number;
  readonly bodyStrikes: number;
  readonly legStrikes: number;
  readonly takedownsLanded: number;
  readonly takedownsAttempted: number;
  readonly submissionAttempts: number;
  readonly knockdowns: number;
  readonly controlTime: number;
  readonly damageTaken: number;
}

export interface FightResult {
  readonly fightId: string;
  readonly outcome: FightOutcome;
  readonly winnerId?: string;
  readonly loserId?: string;
  readonly finishRound?: number;
  readonly finishTime?: string;
  readonly technique?: string;
  readonly rounds: number;
  readonly events: FightEvent[];
  readonly scorecards: JudgeScorecard[];
  readonly stats: Record<string, FightStats>;
  /** Damage carried out of the fight, used to seed post-fight injuries. */
  readonly damage: Record<string, number>;
}

/* ------------------------------------------------------------------ internals */

interface FightState {
  position: FightPosition;
  /** For ground and clinch positions, which fighter is in control. */
  topId?: string;
  round: number;
  /** Seconds remaining in the current round. */
  clock: number;
  /** Seconds elapsed in the fight overall. */
  elapsed: number;
  sequence: number;
  finished: boolean;
  /** Seconds of ground time without meaningful action; drives the referee stand-up. */
  groundStall: number;
}

/** "a jab" but "an uppercut" — technique names are interpolated into commentary. */
function article(noun: string): string {
  return `${/^[aeiou]/i.test(noun) ? 'an' : 'a'} ${noun}`;
}

/** The same, at the start of a sentence. */
function capitalisedArticle(noun: string): string {
  const phrase = article(noun);
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

const OPENERS = ['establishes the range', 'circles to the outside', 'feints and resets', 'measures the distance'];

/** Weighted choice helper that tolerates an all-zero weight vector. */
function choose<T>(rng: Rng, entries: readonly (readonly [T, number])[]): T | undefined {
  const viable = entries.filter(([, weight]) => weight > 0);
  if (viable.length === 0) return undefined;
  return rng.pickWeighted(viable);
}

/**
 * The core contest: an attacking quality against a defending one.
 *
 * A logistic curve rather than a linear difference, because ability differences should
 * compound — a 20-point edge is decisive, not merely 20% better — while still leaving a
 * meaningful chance for the underdog. That residual chance is where upsets come from.
 */
function contest(attack: number, defence: number, steepness = 0.075): number {
  return clamp(logistic(attack - defence, 0, steepness), 0.04, 0.96);
}

export function simulateFight(
  fighterA: Fighter,
  fighterB: Fighter,
  config: FightConfig,
  seed: Rng,
): FightResult {
  const rng = seed.derive('fight', config.fightId);
  const totalRounds = config.rounds ?? 3;
  const roundSeconds = config.roundSeconds ?? 300;

  // Combatants are built first, then game-planned: a plan is built against a specific
  // opponent, so both must exist before either can scout the other.
  const a = createCombatant(fighterA);
  const b = createCombatant(fighterB);
  a.plan = buildGamePlan(a, b, rng.derive('plan', a.id));
  b.plan = buildGamePlan(b, a, rng.derive('plan', b.id));

  const judges = generateJudges(rng.derive('judges'));
  const scores: RoundScore[] = [];
  const events: FightEvent[] = [];

  const state: FightState = {
    position: 'STANDING',
    round: 1,
    clock: roundSeconds,
    elapsed: 0,
    sequence: 0,
    finished: false,
    groundStall: 0,
  };

  /**
   * The body of an event, minus everything the engine fills in from the fight's own state.
   *
   * Typed loosely because the engine assembles a discriminated union dynamically — the fields
   * present depend on `eventType` at runtime. The single cast below is the only place in the
   * codebase where the contract is asserted rather than checked, so `test/fight-engine.test.ts`
   * validates *every* event of a simulated fight against the schema, which is a stronger
   * guarantee than the compiler could give here anyway.
   */
  type EventBody = { eventType: FightEvent['eventType']; description: string } & Record<string, unknown>;

  const emit = (event: EventBody): void => {
    events.push({
      schemaVersion: FIGHT_EVENT_SCHEMA_VERSION,
      fightId: config.fightId,
      sequence: state.sequence++,
      round: state.round,
      timestamp: roundTo(state.elapsed, 1),
      roundTime: formatRoundClock(state.clock),
      timeRemaining: Math.max(0, Math.round(state.clock)),
      position: state.position,
      ...event,
    } as unknown as FightEvent);
  };

  let outcome: FightOutcome | undefined;
  let winner: Combatant | undefined;
  let loser: Combatant | undefined;
  let finishTechnique: string | undefined;
  // Captured at the moment of the finish. The exchange loop keeps running to the end of its
  // iteration afterwards, so reading the clock at return time reports the wrong second.
  let finishRound: number | undefined;
  let finishClock: string | undefined;

  const finish = (
    result: FightOutcome,
    won: Combatant,
    lost: Combatant,
    technique: string | undefined,
    description: string,
  ): void => {
    outcome = result;
    winner = won;
    loser = lost;
    finishTechnique = technique;
    finishRound = state.round;
    finishClock = formatRoundClock(state.clock);
    lost.finished = true;
    state.finished = true;
    emit({
      eventType: 'FIGHT_END',
      outcome: result,
      winnerId: won.id,
      loserId: lost.id,
      finishRound: state.round,
      finishTime: formatRoundClock(state.clock),
      technique,
      description,
    });
  };

  emit({
    eventType: 'FIGHT_START',
    description: `${a.name} versus ${b.name}${config.isTitleFight ? ' — for the title' : ''}, scheduled for ${totalRounds} rounds.`,
  });

  /* --------------------------------------------------------------- resolution */

  /** Decides how close the fighters are standing. */
  function chooseRange(actor: Combatant, opponent: Combatant, r: Rng): Range {
    const pressure = actor.plan.pressure + (1 - opponent.plan.range) * 0.4;
    const distance = actor.plan.range + opponent.plan.range * 0.4;
    return choose(r, [
      ['close' as Range, pressure * 1.1],
      ['mid' as Range, 1],
      ['long' as Range, distance * 1.1],
    ]) ?? 'mid';
  }

  /** Picks a strike from those available, weighted by plan, skill and what the body allows. */
  function selectStrike(actor: Combatant, pool: readonly StrikeDefinition[], r: Rng): StrikeDefinition | undefined {
    const plan = actor.plan;
    // There are four times as many head techniques as leg techniques, so weighting each
    // option independently made every fighter a head-hunter regardless of their game plan.
    // Dividing by the number of options for a target makes the plan's split the real split.
    const optionsPerTarget = new Map<string, number>();
    for (const definition of pool) {
      optionsPerTarget.set(definition.target, (optionsPerTarget.get(definition.target) ?? 0) + 1);
    }
    return choose(
      r,
      pool.map((definition) => {
        const targetWeight =
          definition.target === 'HEAD' ? plan.targetHead
          : definition.target === 'BODY' ? plan.targetBody
          : definition.target === 'LEG' ? plan.targetLegs
          : 0.1;
        // Skill in the specific technique matters as much as the general facet.
        const skill = definition.skills.reduce((best, key) => Math.max(best, actor.attributes[key]), 0) / 100;
        // A tired fighter stops throwing expensive strikes.
        const affordability = clamp(1.2 - definition.cost * (1 - effectiveOutput(actor.stamina)) * 1.6, 0.05, 1.2);
        // Power shots come out more when a fighter smells blood or needs a finish.
        const aggression = definition.concussive > 1 ? 0.6 + plan.urgency * 0.9 : 1;
        const share = targetWeight / (optionsPerTarget.get(definition.target) ?? 1);
        return [definition, share * (0.35 + skill) * affordability * aggression] as const;
      }),
    );
  }

  function landChanceForStrike(
    actor: Combatant,
    opponent: Combatant,
    definition: StrikeDefinition,
    range: Range,
  ): number {
    const offence = effective(actor, 'strikingOffense');
    const defence = effective(opponent, 'strikingDefense');
    const skill = definition.skills.reduce((best, key) => Math.max(best, actor.attributes[key]), 0);
    // The technique's own accuracy, the fighter's skill in it, and reach at distance.
    const base = contest(offence * 0.7 + skill * 0.3, defence);
    const reach = range === 'long' ? reachModifier(reachAdvantage(actor, opponent)) : 1;
    return clamp(base * definition.accuracy * reach * 0.9, 0.03, 0.9);
  }

  function resolveStrike(actor: Combatant, opponent: Combatant, definition: StrikeDefinition, range: Range, r: Rng): boolean {
    const stats = currentRound(actor);
    stats.totalStrikesAttempted++;
    if (definition.significant) stats.significantStrikesAttempted++;
    spend(actor.stamina, definition.cost * (0.7 + actor.plan.pace * 0.6));

    const chance = landChanceForStrike(actor, opponent, definition, range);
    const roll = r.next();

    if (roll > chance) {
      // A miss, a block or a slip — which one depends on how the defence was applied.
      const result: ActionResult = r.bool(0.45) ? 'BLOCKED' : r.bool(0.55) ? 'MISSED' : 'SLIPPED';
      actor.momentum = clamp(actor.momentum - 1.5, -100, 100);
      emit({
        eventType: definition.significant ? 'SIGNIFICANT_STRIKE' : 'STRIKE',
        attacker: actor.id,
        defender: opponent.id,
        technique: definition.key,
        target: definition.target,
        result,
        damage: 0,
        staminaCost: roundTo(definition.cost, 2),
        description:
          result === 'BLOCKED'
            ? `${opponent.shortName} blocks ${article(definition.label)} from ${actor.shortName}.`
            : result === 'SLIPPED'
              ? `${opponent.shortName} slips the ${definition.label}.`
              : `${actor.shortName} misses with ${article(definition.label)}.`,
      });
      return false;
    }

    // Clean or partial. A partial landing does far less.
    const clean = r.bool(0.68);
    const powerRating = actor.attributes.strikingPower;
    const durability = opponent.attributes.durability;
    // Scaled so a fighter who absorbs fifty significant strikes over three rounds ends up
    // badly hurt rather than dead twice over: the average significant strike is worth about
    // two points of a hundred, and only the biggest shots are worth eight.
    const damage = clamp(
      definition.power *
        0.22 *
        remap(powerRating, 1, 100, 0.55, 1.5) *
        remap(durability, 1, 100, 1.35, 0.62) *
        (clean ? 1 : 0.45) *
        r.float(0.82, 1.18),
      0.1,
      9,
    );

    applyStrikeDamage(opponent.damage, definition.target, damage, true);
    stats.totalStrikesLanded++;
    stats.damageDealt += damage;
    if (definition.significant) {
      stats.significantStrikesLanded++;
      // The head/body/leg split describes significant strikes, matching how the sport reports it.
      if (definition.target === 'HEAD') stats.headStrikes++;
      else if (definition.target === 'BODY') stats.bodyStrikes++;
      else if (definition.target === 'LEG') stats.legStrikes++;
    }

    actor.momentum = clamp(actor.momentum + damage * 0.9, -100, 100);
    opponent.momentum = clamp(opponent.momentum - damage * 0.7, -100, 100);

    emit({
      eventType: definition.significant ? 'SIGNIFICANT_STRIKE' : 'STRIKE',
      attacker: actor.id,
      defender: opponent.id,
      technique: definition.key,
      target: definition.target,
      result: clean ? 'LANDED' : 'PARTIAL',
      damage: roundTo(damage, 1),
      staminaCost: roundTo(definition.cost, 2),
      // The technique labels are self-describing ("low kick to the lead leg"), so no target
      // phrase is appended — doing so produced "a kick to the body to the body".
      description: `${actor.shortName} lands ${clean ? 'a clean' : 'a partial'} ${definition.label}.`,
    });

    // Cuts.
    if (clean && definition.target === 'HEAD' && r.bool(definition.cutChance)) {
      opponent.damage.cuts++;
      emit({
        eventType: 'CUT',
        attacker: actor.id,
        defender: opponent.id,
        technique: definition.key,
        severity: roundTo(damage, 1),
        description: `${opponent.shortName} has been opened up — blood coming from a cut.`,
      });
    }

    if (definition.target === 'HEAD' && clean) checkKnockdown(actor, opponent, definition, damage, r);
    return true;
  }

  /**
   * The knockdown check. Scales with the technique's concussive quality, the damage already
   * accumulated, and how tired the fighter being hit is — which is why late finishes happen.
   */
  function checkKnockdown(
    actor: Combatant,
    opponent: Combatant,
    definition: StrikeDefinition,
    damage: number,
    r: Rng,
  ): void {
    if (definition.concussive <= 0) return;
    const chin = remap(opponent.attributes.durability, 1, 100, 1.6, 0.45);
    const accumulated = 1 + opponent.damage.concussive / 55;
    const tired = remap(effectiveOutput(opponent.stamina), 0.35, 1, 1.7, 1);
    const chance = clamp(0.0085 * definition.concussive * (damage / 1.6) * chin * accumulated * tired, 0, 0.35);

    if (!r.bool(chance)) {
      // Short of a knockdown, a big shot can still hurt them.
      if (r.bool(chance * 1.8)) {
        opponent.stunnedFor = r.float(3, 9);
        emit({
          eventType: 'STUN',
          attacker: actor.id,
          defender: opponent.id,
          technique: definition.key,
          severity: roundTo(damage, 1),
          description: `${opponent.shortName} is hurt! ${actor.shortName} has them wobbled.`,
        });
      }
      return;
    }

    opponent.knockdowns++;
    currentRound(actor).knockdowns++;
    opponent.stunnedFor = r.float(6, 16);
    opponent.damage.concussive = clamp(opponent.damage.concussive + 12, 0, 100);
    actor.momentum = 100;
    opponent.momentum = -60;

    emit({
      eventType: 'KNOCKDOWN',
      attacker: actor.id,
      defender: opponent.id,
      technique: definition.key,
      target: 'HEAD',
      severity: roundTo(damage, 1),
      description: `DOWN GOES ${opponent.shortName.toUpperCase()}! ${capitalisedArticle(definition.label)} puts them on the canvas.`,
    });

    // Can they continue? A clean knockout is a failure to recover at all — which, even after
    // a genuine knockdown, is the exception. Most fighters who go down get back up.
    const recovery = remap(opponent.attributes.durability * 0.6 + opponent.attributes.recovery * 0.4, 1, 100, 0.35, 0.03);
    const koChance = clamp(recovery * (1 + opponent.damage.concussive / 70), 0, 0.8);
    if (r.bool(koChance)) {
      finish('KO', actor, opponent, definition.key, `${actor.shortName} has knocked them out cold with ${article(definition.label)}.`);
      return;
    }

    // Otherwise the follow-up decides it.
    const followUp = clamp(0.2 + effective(actor, 'strikingOffense') / 480 - opponent.attributes.recovery / 300, 0.05, 0.5);
    if (r.bool(followUp)) {
      finish('TKO', actor, opponent, definition.key, `${actor.shortName} swarms and the referee has seen enough — it is over.`);
    } else {
      emit({
        eventType: 'REFEREE_ACTION',
        fighterId: opponent.id,
        action: 'ALLOWED_TO_CONTINUE',
        description: `${opponent.shortName} survives the follow-up and fights back to their feet.`,
      });
      state.position = 'STANDING';
    }
  }

  /**
   * Throws a combination rather than a single shot.
   *
   * Fighters do not trade one punch at a time — they throw two, three, four, and the
   * sequence is what produces both the strike counts a real fight has and the moments where
   * someone gets caught at the end of a flurry. The combination shortens if the opening
   * strike is defended cleanly, which is what a fighter actually does.
   */
  function throwCombination(
    actor: Combatant,
    opponent: Combatant,
    pool: readonly StrikeDefinition[],
    range: Range,
    r: Rng,
  ): void {
    const volume = actor.plan.strikeVolume;
    const stamina = effectiveOutput(actor.stamina);
    const length = choose(r, [
      [1, 1.1 - volume * 0.5],
      [2, 1.2 + volume * 0.7],
      [3, (0.85 + volume * 0.9) * stamina],
      [4, (0.4 + volume * 0.7) * stamina * stamina],
      [5, (0.15 + volume * 0.4) * stamina * stamina],
    ]) ?? 1;

    for (let i = 0; i < length; i++) {
      if (state.finished || isGroundPosition(state.position)) return;
      const definition = selectStrike(actor, pool, r);
      if (!definition) return;
      const landed = resolveStrike(actor, opponent, definition, range, r);
      // Each strike in the sequence occupies its own moment on the clock. Without this the
      // play-by-play reports a four-punch combination as four events at the same second.
      if (i < length - 1) {
        const beat = r.float(0.6, 1.4);
        state.clock = Math.max(0, state.clock - beat);
        state.elapsed += beat;
      }
      // A committed miss ends the sequence; a fighter does not keep swinging into space.
      if (!landed && r.bool(0.45)) return;
    }
  }

  function resolveTakedown(actor: Combatant, opponent: Combatant, r: Rng): void {
    const options = TAKEDOWNS.filter((definition) => definition.from.includes(state.position));
    const definition = choose(
      r,
      options.map((option) => {
        const skill = option.skills.reduce((best, key) => Math.max(best, actor.attributes[key]), 0) / 100;
        return [option, option.ease * (0.3 + skill * 1.4)] as const;
      }),
    );
    if (!definition) return;

    const stats = currentRound(actor);
    stats.takedownsAttempted++;
    spend(actor.stamina, definition.cost);

    emit({
      eventType: 'TAKEDOWN_ATTEMPT',
      attacker: actor.id,
      defender: opponent.id,
      technique: definition.key,
      result: 'DEFENDED',
      staminaCost: roundTo(definition.cost, 2),
      description: `${actor.shortName} shoots for ${article(definition.label)}.`,
    });

    const offence = effective(actor, 'wrestlingOffense');
    const defence = effective(opponent, 'wrestlingDefense');
    const chance = clamp(contest(offence, defence) * definition.ease * 0.82, 0.05, 0.82);

    if (r.bool(chance)) {
      stats.takedownsLanded++;
      state.position = definition.lands;
      state.topId = actor.id;
      actor.momentum = clamp(actor.momentum + 14, -100, 100);
      emit({
        eventType: 'TAKEDOWN',
        attacker: actor.id,
        defender: opponent.id,
        technique: definition.key,
        result: 'COMPLETED',
        staminaCost: 0,
        description: `${actor.shortName} completes the ${definition.label} and lands ${groundPosition(definition.lands)?.label ?? 'on top'}.`,
      });
    } else {
      opponent.momentum = clamp(opponent.momentum + 8, -100, 100);
      spend(opponent.stamina, definition.cost * 0.55);
      emit({
        eventType: 'SPRAWL',
        attacker: opponent.id,
        defender: actor.id,
        result: 'DEFENDED',
        staminaCost: roundTo(definition.cost * 0.55, 2),
        description: `${opponent.shortName} sprawls and stuffs the takedown.`,
      });
      // A stuffed shot often ends up against the fence.
      if (r.bool(0.35)) {
        state.position = 'CAGE_CLINCH';
        state.topId = opponent.id;
      }
    }
  }

  function resolveClinchEntry(actor: Combatant, opponent: Combatant, r: Rng): void {
    spend(actor.stamina, 0.9);
    const chance = contest(effective(actor, 'clinch'), effective(opponent, 'wrestlingDefense') * 0.8);
    if (r.bool(chance)) {
      state.position = r.bool(0.6) ? 'CAGE_CLINCH' : 'CLINCH';
      state.topId = actor.id;
      emit({
        eventType: 'CLINCH_ENGAGE',
        attacker: actor.id,
        defender: opponent.id,
        result: 'COMPLETED',
        staminaCost: 0.9,
        description:
          state.position === 'CAGE_CLINCH'
            ? `${actor.shortName} closes the distance and presses ${opponent.shortName} into the fence.`
            : `${actor.shortName} ties up in the clinch.`,
      });
    } else {
      emit({
        eventType: 'CLINCH_BREAK',
        attacker: opponent.id,
        defender: actor.id,
        result: 'DEFENDED',
        staminaCost: 0.4,
        description: `${opponent.shortName} frames and keeps the fight at range.`,
      });
    }
  }

  /**
   * How inclined a fighter is to go hunting for a finish on the mat, as a weight against the
   * other ground options. Cubed skill term: only genuine submission fighters attack often.
   */
  function submissionAppetite(actor: Combatant): number {
    const skill = clamp(actor.baseFacets.groundOffense / 100, 0, 1);
    return actor.plan.submissionSeeking * skill ** 3 * 0.75;
  }

  function resolveSubmission(actor: Combatant, opponent: Combatant, r: Rng): void {
    const isTop = state.topId === actor.id;
    const options = SUBMISSIONS.filter((definition) => {
      const suitability = definition.from[state.position];
      if (!suitability) return false;
      return isTop ? !definition.fromBottom || suitability > 0.7 : definition.fromBottom;
    });
    const definition = choose(
      r,
      options.map((option) => {
        const skill = option.skills.reduce((best, key) => Math.max(best, actor.attributes[key]), 0) / 100;
        return [option, (option.from[state.position] ?? 0) * option.ease * (0.25 + skill * 1.5)] as const;
      }),
    );
    if (!definition) return;

    const stats = currentRound(actor);
    stats.submissionAttempts++;
    spend(actor.stamina, definition.cost);

    const offence = effective(actor, 'groundOffense');
    const defence = effective(opponent, 'groundDefense');
    const tightness = clamp(contest(offence, defence) * definition.ease * r.float(0.7, 1.3), 0.05, 0.98);

    emit({
      eventType: 'SUBMISSION_ATTEMPT',
      attacker: actor.id,
      defender: opponent.id,
      technique: definition.key,
      result: 'DEFENDED',
      tightness: roundTo(tightness, 2),
      staminaCost: roundTo(definition.cost, 2),
      description:
        tightness > 0.7
          ? `${actor.shortName} has the ${definition.label} locked in deep — this looks bad for ${opponent.shortName}!`
          : `${actor.shortName} threatens with ${article(definition.label)}.`,
    });

    // Tapping is a function of how tight it is, how well they defend, and how much they have left.
    const escapeAbility = remap(effective(opponent, 'groundDefense'), 1, 100, 0.15, 0.9);
    const tapChance = clamp((tightness - 0.48) * 1.25 * (1 - escapeAbility * 0.7), 0, 0.65);

    if (r.bool(tapChance)) {
      finish('SUBMISSION', actor, opponent, definition.key, `${opponent.shortName} taps! ${actor.shortName} wins by ${definition.label}.`);
      return;
    }

    spend(opponent.stamina, definition.cost * 0.8);
    opponent.momentum = clamp(opponent.momentum + 6, -100, 100);
    emit({
      eventType: 'SUBMISSION_ESCAPE',
      attacker: opponent.id,
      defender: actor.id,
      technique: definition.key,
      result: 'DEFENDED',
      tightness: roundTo(tightness, 2),
      staminaCost: roundTo(definition.cost * 0.8, 2),
      description: `${opponent.shortName} works free of the ${definition.label}.`,
    });
  }

  function resolveGroundAction(actor: Combatant, opponent: Combatant, r: Rng): void {
    const definition = groundPosition(state.position);
    if (!definition) return;
    const isTop = state.topId === actor.id;

    if (isTop) {
      const action = choose(r, [
        ['strike' as const, (1 - actor.plan.submissionSeeking * 0.5) * definition.strikeAccess * 2.4],
        ['advance' as const, definition.advancesTo.length > 0 ? actor.plan.groundControl * 1.3 : 0],
        // Submission hunting is gated behind real skill and a position that actually offers
        // something: an average wrestler in half guard is not throwing up a triangle.
        ['submit' as const, submissionAppetite(actor)],
        ['hold' as const, 0.5],
      ]);

      if (action === 'strike') {
        state.groundStall = 0;
        const strikeDefinition = selectStrike(actor, GROUND_STRIKES, r);
        if (strikeDefinition) resolveStrike(actor, opponent, strikeDefinition, 'close', r);
      } else if (action === 'advance') {
        const target = r.pick(definition.advancesTo);
        const chance = contest(effective(actor, 'groundOffense'), effective(opponent, 'groundDefense'));
        spend(actor.stamina, 1.1);
        if (r.bool(chance)) {
          const from = state.position;
          state.position = target;
          emit({
            eventType: 'POSITION_CHANGE',
            attacker: actor.id,
            defender: opponent.id,
            fromPosition: from,
            toPosition: target,
            description: `${actor.shortName} advances to ${groundPosition(target)?.label ?? target.toLowerCase()}.`,
          });
        } else {
          emit({
            eventType: 'SCRAMBLE',
            attacker: opponent.id,
            defender: actor.id,
            result: 'DEFENDED',
            staminaCost: 1,
            description: `${opponent.shortName} defends the pass and stays busy from the bottom.`,
          });
        }
      } else if (action === 'submit') {
        state.groundStall = 0;
        resolveSubmission(actor, opponent, r);
      } else {
        spend(actor.stamina, 0.4);
        emit({
          eventType: 'POSITION_CHANGE',
          attacker: actor.id,
          defender: opponent.id,
          fromPosition: state.position,
          toPosition: state.position,
          description: `${actor.shortName} holds ${definition.label} and controls the position.`,
        });
      }
      return;
    }

    // Bottom fighter: get up, sweep, or attack.
    const action = choose(r, [
      ['standup' as const, (1 - actor.plan.acceptBottom) * 2.2],
      ['sweep' as const, actor.baseFacets.groundOffense / 90],
      ['submit' as const, submissionAppetite(actor)],
    ]);

    if (action === 'submit') {
      resolveSubmission(actor, opponent, r);
      return;
    }

    spend(actor.stamina, 1.3);
    const escapeChance = clamp(
      contest(effective(actor, 'groundDefense') + actor.attributes.scrambling * 0.3, effective(opponent, 'groundOffense')) *
        (1 - definition.escapeDifficulty * 0.55),
      0.05,
      0.85,
    );

    if (r.bool(escapeChance)) {
      const from = state.position;
      if (action === 'sweep') {
        state.topId = actor.id;
        state.position = 'GUARD';
        emit({
          eventType: 'POSITION_CHANGE',
          attacker: actor.id,
          defender: opponent.id,
          fromPosition: from,
          toPosition: 'GUARD',
          description: `${actor.shortName} sweeps and comes up on top!`,
        });
      } else {
        state.position = 'STANDING';
        state.topId = undefined;
        emit({
          eventType: 'POSITION_CHANGE',
          attacker: actor.id,
          defender: opponent.id,
          fromPosition: from,
          toPosition: 'STANDING',
          description: `${actor.shortName} works back to their feet.`,
        });
      }
    } else {
      emit({
        eventType: 'SCRAMBLE',
        attacker: actor.id,
        defender: opponent.id,
        result: 'DEFENDED',
        staminaCost: 1.3,
        description: `${actor.shortName} scrambles but ${opponent.shortName} rides the position.`,
      });
    }
  }

  function resolveClinchAction(actor: Combatant, opponent: Combatant, r: Rng): void {
    const action = choose(r, [
      ['strike' as const, actor.plan.strikeVolume * 1.4],
      ['takedown' as const, actor.plan.takedownRate * 0.8],
      ['break' as const, state.topId === actor.id ? 0.35 : 1.4],
    ]);

    if (action === 'strike') {
      const definition = selectStrike(actor, CLINCH_STRIKES, r);
      if (definition) resolveStrike(actor, opponent, definition, 'close', r);
    } else if (action === 'takedown') {
      resolveTakedown(actor, opponent, r);
    } else {
      spend(actor.stamina, 0.6);
      const chance = contest(effective(actor, 'clinch'), effective(opponent, 'clinch'));
      if (r.bool(chance)) {
        state.position = 'STANDING';
        state.topId = undefined;
        emit({
          eventType: 'CLINCH_BREAK',
          attacker: actor.id,
          defender: opponent.id,
          result: 'COMPLETED',
          staminaCost: 0.6,
          description: `${actor.shortName} breaks the clinch and gets back to open space.`,
        });
      } else {
        emit({
          eventType: 'CLINCH_ENGAGE',
          attacker: opponent.id,
          defender: actor.id,
          result: 'DEFENDED',
          staminaCost: 0.6,
          description: `${opponent.shortName} keeps them pinned against the fence.`,
        });
      }
    }
  }

  function resolveStandingAction(actor: Combatant, opponent: Combatant, r: Rng): void {
    const range = chooseRange(actor, opponent, r);
    const action = choose(r, [
      ['strike' as const, actor.plan.strikeVolume * (0.7 + actor.plan.pace * 0.6) * 4.2],
      ['takedown' as const, actor.plan.takedownRate * 0.15],
      ['clinch' as const, actor.plan.clinchRate * 0.35],
      ['reset' as const, 0.5 * (1 - actor.plan.urgency)],
    ]);

    if (action === 'strike') {
      throwCombination(actor, opponent, standingStrikes(range), range, r);
    } else if (action === 'takedown') {
      resolveTakedown(actor, opponent, r);
    } else if (action === 'clinch') {
      resolveClinchEntry(actor, opponent, r);
    } else {
      recover(actor.stamina, 2, false);
      emit({
        eventType: 'POSITION_CHANGE',
        attacker: actor.id,
        defender: opponent.id,
        fromPosition: 'STANDING',
        toPosition: 'STANDING',
        description: `${actor.shortName} ${r.pick(OPENERS)}.`,
      });
    }
  }

  /* ------------------------------------------------------------- the main loop */

  let exchangeCount = 0;

  for (let roundNumber = 1; roundNumber <= totalRounds && !state.finished; roundNumber++) {
    state.round = roundNumber;
    state.clock = roundSeconds;
    if (roundNumber > 1) {
      beginRound(a);
      beginRound(b);
    }

    emit({
      eventType: 'ROUND_START',
      description: `Round ${roundNumber}.`,
    });

    while (state.clock > 0 && !state.finished) {
      const exchangeRng = rng.derive('exchange', roundNumber, exchangeCount++);

      // Initiative: who acts. Pressure, speed, momentum and being hurt all matter.
      const initiativeA =
        a.plan.pressure * 1.4 + effectiveAttributeScore(a) + (a.stunnedFor > 0 ? -1.2 : 0) + a.momentum / 220;
      const initiativeB =
        b.plan.pressure * 1.4 + effectiveAttributeScore(b) + (b.stunnedFor > 0 ? -1.2 : 0) + b.momentum / 220;
      const actorIsA = exchangeRng.bool(clamp(initiativeA / Math.max(0.01, initiativeA + initiativeB), 0.1, 0.9));
      const actor = actorIsA ? a : b;
      const opponent = actorIsA ? b : a;

      // Fighters reassess every few exchanges rather than continuously.
      if (exchangeCount % 4 === 0) {
        adaptInFight(a, b);
        adaptInFight(b, a);
      }

      if (isGroundPosition(state.position)) {
        resolveGroundAction(actor, opponent, exchangeRng);
      } else if (state.position === 'CLINCH' || state.position === 'CAGE_CLINCH') {
        resolveClinchAction(actor, opponent, exchangeRng);
      } else {
        resolveStandingAction(actor, opponent, exchangeRng);
      }

      // Time passes. Grappling exchanges eat more clock than a single punch.
      const grappling = isGroundPosition(state.position) || state.position === 'CLINCH' || state.position === 'CAGE_CLINCH';
      // A stand-up exchange is a few seconds; a grappling exchange eats more clock.
      const step = clamp(
        (grappling ? exchangeRng.float(5, 12) : exchangeRng.float(1.8, 4.6)) * (1.3 - actor.plan.pace * 0.45),
        1.2,
        16,
      );
      state.clock -= step;
      state.elapsed += step;

      // A stalled position gets restarted. Without this the engine happily spends whole
      // rounds in a guard where nothing is happening, which is neither realistic nor watchable.
      if (grappling) {
        state.groundStall += step;
        if (state.groundStall > 40 && isGroundPosition(state.position)) {
          const dominance = groundPosition(state.position)?.dominance ?? 0.5;
          // Referees leave dominant positions alone far longer than a stalled guard.
          if (exchangeRng.bool(clamp(0.5 - dominance * 0.45, 0.03, 0.5))) {
            state.position = 'STANDING';
            state.topId = undefined;
            state.groundStall = 0;
            emit({
              eventType: 'REFEREE_ACTION',
              action: 'STAND_THEM_UP',
              description: 'The referee restarts them on the feet.',
            });
          }
        }
      } else {
        state.groundStall = 0;
      }

      // Control time accrues to whoever is on top.
      if (grappling && state.topId) {
        const controller = state.topId === a.id ? a : b;
        const dominance = groundPosition(state.position)?.dominance ?? 0.5;
        const credited = step * (dominance > 0.3 ? 1 : 0.5);
        controller.controlTime += credited;
        currentRound(controller).controlTime += credited;
      }

      // Recovery and the stun clock.
      recover(a.stamina, step, false);
      recover(b.stamina, step, false);
      a.stunnedFor = Math.max(0, a.stunnedFor - step);
      b.stunnedFor = Math.max(0, b.stunnedFor - step);
      // Momentum decays toward neutral.
      a.momentum *= 0.94;
      b.momentum *= 0.94;

      // The doctor gets involved when a cut is bad enough.
      if (!state.finished && needsDoctor(opponent.damage) && exchangeRng.bool(0.015)) {
        emit({
          eventType: 'DOCTOR_CHECK',
          fighterId: opponent.id,
          action: 'CUT_INSPECTION',
          description: `The referee calls time — the doctor takes a look at ${opponent.shortName}'s cut.`,
        });
        if (exchangeRng.bool(0.18)) {
          finish('DOCTOR_STOPPAGE', actor, opponent, undefined, `The doctor will not let them continue. ${actor.shortName} wins by doctor stoppage.`);
        }
      }
    }

    if (state.finished) break;

    state.clock = 0;
    emit({ eventType: 'ROUND_END', description: `End of round ${roundNumber}.` });

    // Judges score, and each fighter's damage and stamina updates for the next round.
    for (const judge of judges) {
      scores.push(scoreRound(judge, roundNumber, a, b, roundNumber - 1));
    }

    emit({
      eventType: 'DAMAGE_UPDATE',
      fighterId: a.id,
      damage: { ...a.damage, leadLeg: roundTo(a.damage.leadLeg, 1) },
      description: `${a.shortName}: ${damageDescription(a.damage) ?? 'no significant damage'}.`,
    });
    emit({
      eventType: 'DAMAGE_UPDATE',
      fighterId: b.id,
      damage: { ...b.damage, leadLeg: roundTo(b.damage.leadLeg, 1) },
      description: `${b.shortName}: ${damageDescription(b.damage) ?? 'no significant damage'}.`,
    });

    if (roundNumber < totalRounds) {
      for (const [side, fighter, other] of [['a', a, b], ['b', b, a]] as const) {
        const advice = cornerInstructions(
          fighter,
          other,
          roundNumber,
          isBehind(scores, side),
          rng.derive('corner', fighter.id, roundNumber),
        );
        for (const item of advice) {
          emit({
            eventType: 'CORNER_INSTRUCTION',
            fighterId: fighter.id,
            instruction: item.instruction,
            description: `Corner to ${fighter.shortName}: "${item.line}"`,
          });
        }
      }

      recoverBetweenRounds(a.stamina);
      recoverBetweenRounds(b.stamina);
      recoverDamageBetweenRounds(a.damage);
      recoverDamageBetweenRounds(b.damage);
      a.stunnedFor = 0;
      b.stunnedFor = 0;
      a.momentum *= 0.4;
      b.momentum *= 0.4;
    }
  }

  /* ------------------------------------------------------------------ decision */

  let scorecards: JudgeScorecard[] = [];
  if (!outcome) {
    const decision = resolveDecision(judges, scores);
    scorecards = decision.scorecards;
    outcome = decision.outcome;
    if (decision.winner === 'a') {
      winner = a;
      loser = b;
    } else if (decision.winner === 'b') {
      winner = b;
      loser = a;
    }
    state.clock = 0;
    emit({
      eventType: 'DECISION',
      outcome,
      winnerId: winner?.id,
      scorecards,
      description: winner
        ? `We go to the judges: ${winner.shortName} takes it by ${outcome.replace(/_/g, ' ').toLowerCase()}.`
        : `We go to the judges, and this one is a draw.`,
    });
  } else {
    // Cards up to the finish still exist, and the Fight Center shows them.
    scorecards = resolveDecision(judges, scores).scorecards;
  }

  const statsFor = (combatant: Combatant): FightStats => {
    const totals = combatant.stats.reduce(
      (sum, roundStats) => ({
        significantStrikesLanded: sum.significantStrikesLanded + roundStats.significantStrikesLanded,
        significantStrikesAttempted: sum.significantStrikesAttempted + roundStats.significantStrikesAttempted,
        totalStrikesLanded: sum.totalStrikesLanded + roundStats.totalStrikesLanded,
        headStrikes: sum.headStrikes + roundStats.headStrikes,
        bodyStrikes: sum.bodyStrikes + roundStats.bodyStrikes,
        legStrikes: sum.legStrikes + roundStats.legStrikes,
        takedownsLanded: sum.takedownsLanded + roundStats.takedownsLanded,
        takedownsAttempted: sum.takedownsAttempted + roundStats.takedownsAttempted,
        submissionAttempts: sum.submissionAttempts + roundStats.submissionAttempts,
        knockdowns: sum.knockdowns + roundStats.knockdowns,
        controlTime: sum.controlTime + roundStats.controlTime,
        damageTaken: 0,
      }),
      {
        significantStrikesLanded: 0, significantStrikesAttempted: 0, totalStrikesLanded: 0,
        headStrikes: 0, bodyStrikes: 0, legStrikes: 0, takedownsLanded: 0, takedownsAttempted: 0,
        submissionAttempts: 0, knockdowns: 0, controlTime: 0, damageTaken: 0,
      },
    );
    return { ...totals, controlTime: Math.round(totals.controlTime), damageTaken: roundTo(totalDamage(combatant.damage), 1) };
  };

  return {
    fightId: config.fightId,
    outcome: outcome ?? 'DRAW',
    winnerId: winner?.id,
    loserId: loser?.id,
    finishRound,
    finishTime: finishClock,
    technique: finishTechnique,
    rounds: state.round,
    events,
    scorecards,
    stats: { [a.id]: statsFor(a), [b.id]: statsFor(b) },
    damage: { [a.id]: roundTo(totalDamage(a.damage), 1), [b.id]: roundTo(totalDamage(b.damage), 1) },
  };
}

/** A cheap composite used only for initiative. */
function effectiveAttributeScore(combatant: Combatant): number {
  return (combatant.attributes.speed * 0.5 + combatant.attributes.aggression * 0.5) / 100;
}
