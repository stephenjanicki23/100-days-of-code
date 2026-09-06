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
import { classProfile, type ClassProfile } from './pacing.ts';
import {
  CLINCH_STRIKES,
  GROUND_STRIKES,
  SUBMISSIONS,
  TAKEDOWNS,
  groundPosition,
  isGroundPosition,
  openStrikes,
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
  /** Per-round statistics per fighter, indexed from round one, for a round-by-round overlay. */
  readonly roundStats: Record<string, FightStats[]>;
  /** Damage carried out of the fight, used to seed post-fight injuries. */
  readonly damage: Record<string, number>;
}

/** Copies a round's tally into the shape the result reports. */
function snapshot(round: {
  significantStrikesLanded: number; significantStrikesAttempted: number; totalStrikesLanded: number;
  totalStrikesAttempted: number; headStrikes: number; bodyStrikes: number; legStrikes: number;
  takedownsLanded: number; takedownsAttempted: number; submissionAttempts: number;
  knockdowns: number; controlTime: number; damageDealt: number;
}): FightStats {
  return {
    significantStrikesLanded: round.significantStrikesLanded,
    significantStrikesAttempted: round.significantStrikesAttempted,
    totalStrikesLanded: round.totalStrikesLanded,
    headStrikes: round.headStrikes,
    bodyStrikes: round.bodyStrikes,
    legStrikes: round.legStrikes,
    takedownsLanded: round.takedownsLanded,
    takedownsAttempted: round.takedownsAttempted,
    submissionAttempts: round.submissionAttempts,
    knockdowns: round.knockdowns,
    controlTime: roundTo(round.controlTime, 0),
    damageTaken: 0,
  };
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
  /**
   * How far apart the two of them are standing.
   *
   * Previously re-rolled from nothing on every exchange, so a fighter could be at kicking
   * range and then in the pocket a second later with nothing in between. It is now a real
   * piece of state that footwork moves, which is what lets a jab set up a cross and a
   * retreating opponent open up the spinning attacks.
   */
  distance: Range;
}

/** State updates run on a fixed tick; actions resolve on each fighter's own clock (brief §1). */
const TICK = 0.1;

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
    distance: 'mid',
  };

  const profileA = classProfile(a.divisionKey);
  const profileB = classProfile(b.divisionKey);
  // A bout has one pace, taken from the heavier man's class when it is a catchweight.
  const pace: ClassProfile = profileA.tempo >= profileB.tempo ? profileA : profileB;

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

  /**
   * Whether a gated technique is available at this moment (brief §3).
   *
   * The spinning and flying attacks are not weighed against a jab and found rare — they are
   * simply not on the menu unless the moment is right. A small weight was tried first and is
   * not enough: over two hundred fights the flashy set still came out at a fifth of all
   * offence, because a rare option offered a thousand times is not rare.
   */
  function gateOpen(actor: Combatant, opponent: Combatant, definition: StrikeDefinition, leading: boolean): boolean {
    const gate = definition.gate;
    if (!gate) return true;
    const clinched = state.position === 'CLINCH' || state.position === 'CAGE_CLINCH';
    if (gate.clinchOnly && !clinched && !opponent.stunnedFor) return false;
    if (gate.flash !== undefined && actor.flash < gate.flash) return false;
    if (gate.neverLeads && leading) return false;
    if (gate.opponentRetreating && opponent.retreatingFor <= 0 && opponent.stunnedFor <= 0) return false;
    if (gate.opponentHurt && opponent.stunnedFor <= 0) return false;
    if (gate.minStamina !== undefined && effectiveOutput(actor.stamina) < gate.minStamina) return false;
    return true;
  }

  /**
   * How much this strike suits the moment, beyond how often it is thrown in general.
   *
   * Selection used to be blind: a weighted draw over the whole legal pool with no idea what
   * had just happened. Real offence is sequential — the cross comes off the jab, the uppercut
   * comes when the other man ducks, the leg kick comes when he plants — so the last strike
   * thrown, the range and the opponent's state all bias the next pick.
   */
  function context(actor: Combatant, opponent: Combatant, definition: StrikeDefinition): number {
    let weight = 1;
    const previous = actor.lastStrike;

    // Off the jab: the straight and the hook are what follows it.
    if (previous === 'JAB' && definition.key === 'CROSS') weight *= 2.6;
    if (previous === 'JAB' && definition.key === 'LEFT_HOOK') weight *= 1.4;
    // Doubling the jab is a real habit.
    if (previous === 'JAB' && definition.key === 'JAB') weight *= 1.35;
    // Hooks follow the straight; the uppercut follows the hook in the pocket.
    if (previous === 'CROSS' && (definition.key === 'LEFT_HOOK' || definition.key === 'RIGHT_HOOK')) weight *= 1.5;
    if ((previous === 'LEFT_HOOK' || previous === 'RIGHT_HOOK') && definition.key === 'UPPERCUT') weight *= 1.25;
    // And the kick comes at the end of the hands, not in the middle of them.
    if (previous && definition.target === 'LEG') weight *= 1.5;

    // Range does most of the work: the jab is a range weapon, the uppercut is a pocket weapon.
    if (state.distance === 'long') weight *= definition.key === 'JAB' ? 1.5 : definition.target === 'LEG' ? 1.3 : 0.85;
    if (state.distance === 'close') weight *= definition.key === 'UPPERCUT' || definition.key === 'ELBOW' ? 1.3 : definition.key === 'JAB' ? 0.6 : 1;

    // A planted opponent gets his leg chopped; a ducking one gets the uppercut.
    if (opponent.retreatingFor <= 0 && definition.target === 'LEG') weight *= 1.45;
    // A hurt opponent gets everything heavy thrown at him.
    if (opponent.stunnedFor > 0) weight *= definition.concussive > 1 ? 2.2 : 0.7;

    return weight;
  }

  /**
   * Picks a strike.
   *
   * `frequency` is the anchor — the share of a real fighter's output the technique accounts
   * for — and everything else modulates it. The old selector had no such term at all: it
   * split a target's weight evenly across every technique aimed there, so a jab and a
   * spinning wheel kick began from the same number.
   */
  function selectStrike(
    actor: Combatant,
    opponent: Combatant,
    pool: readonly StrikeDefinition[],
    r: Rng,
    leading = true,
  ): StrikeDefinition | undefined {
    const plan = actor.plan;
    const output = effectiveOutput(actor.stamina);
    return choose(
      r,
      pool
        .filter((definition) => gateOpen(actor, opponent, definition, leading))
        .map((definition) => {
          const targetWeight =
            definition.target === 'HEAD' ? plan.targetHead
            : definition.target === 'BODY' ? plan.targetBody
            : definition.target === 'LEG' ? plan.targetLegs
            : 0.1;
          // Skill shifts a technique's share but never sets it: a great kicker throws more
          // kicks than the average fighter, not more kicks than punches.
          const skill = definition.skills.reduce((best, key) => Math.max(best, actor.attributes[key]), 0) / 100;
          const affordability = clamp(1.2 - definition.cost * (1 - output) * 1.6, 0.05, 1.2);
          const weight =
            definition.frequency *
            (0.62 + targetWeight * 1.1) *
            (0.7 + skill * 0.6) *
            affordability *
            context(actor, opponent, definition);
          return [definition, weight] as const;
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
    // Swelling and cuts close an eye. Facial damage is tracked separately from concussive
    // load precisely so it can do this rather than only feed the knockout check.
    const vision = 1 - clamp(opponent.damage.face / 240 + opponent.damage.cuts * 0.045, 0, 0.3);
    const defence = effective(opponent, 'strikingDefense') * vision;
    const skill = definition.skills.reduce((best, key) => Math.max(best, actor.attributes[key]), 0);
    // The technique's own accuracy, the fighter's skill in it, and reach at distance.
    const base = contest(offence * 0.7 + skill * 0.3, defence);
    const reach = range === 'long' ? reachModifier(reachAdvantage(actor, opponent)) : 1;
    // Target sets the band the strike lands in: the head is defended, the legs are not.
    // Measured against the sport's own numbers — head strikes land around a third of the
    // time, body and leg strikes between a half and two thirds.
    const byTarget = definition.target === 'HEAD' ? 0.72 : definition.target === 'BODY' ? 1.12 : 1.24;
    // A fighter caught in his own recovery frames is far easier to hit. This is what makes
    // committing to a power shot cost something.
    const exposed = state.elapsed < opponent.vulnerableUntil ? 1.5 : 1;
    return clamp(base * definition.accuracy * reach * byTarget * exposed * 0.62, 0.03, 0.92);
  }

  function resolveStrike(actor: Combatant, opponent: Combatant, definition: StrikeDefinition, range: Range, r: Rng): boolean {
    const stats = currentRound(actor);
    stats.totalStrikesAttempted++;
    if (definition.significant) stats.significantStrikesAttempted++;
    spend(actor.stamina, definition.cost * (0.7 + actor.plan.pace * 0.6) * classProfile(actor.divisionKey).drain);

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
        classProfile(actor.divisionKey).power *
        remap(powerRating, 1, 100, 0.55, 1.5) *
        remap(durability, 1, 100, 1.35, 0.62) *
        (clean ? 1 : 0.45) *
        r.float(0.82, 1.18),
      0.1,
      9,
    );

    applyStrikeDamage(opponent.damage, definition.target, damage, true);
    // Body work is an investment: it does little immediately and makes everything after it
    // more expensive. A battered body drains the tank on every action for the rest of the
    // fight, which is what makes a body-snatcher's round three look the way it does.
    if (definition.target === 'BODY') {
      opponent.stamina.cardio = clamp(opponent.stamina.cardio - damage * 0.55, 0, 100);
    }
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
    const profile = classProfile(actor.divisionKey);
    // The class sets the scale; `chin` is how well this class's fighters take a shot at all.
    const chin = remap(opponent.attributes.durability, 1, 100, 1.6, 0.45) / profile.chin;
    const accumulated = 1 + opponent.damage.concussive / 55;
    const tired = remap(effectiveOutput(opponent.stamina), 0.35, 1, 1.7, 1);
    const chance = clamp(
      0.0085 * profile.knockdown * definition.concussive * (damage / 1.6) * chin * accumulated * tired,
      0,
      0.45,
    );

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
    const koChance = clamp(recovery * profile.finishing * (1 + opponent.damage.concussive / 70), 0, 0.85);
    if (r.bool(koChance)) {
      finish('KO', actor, opponent, definition.key, `${actor.shortName} has knocked them out cold with ${article(definition.label)}.`);
      return;
    }

    // Otherwise the follow-up decides it.
    const followUp = clamp(
      (0.2 + effective(actor, 'strikingOffense') / 480 - opponent.attributes.recovery / 300) * profile.finishing,
      0.05,
      0.62,
    );
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
   * Throws the next strike of a combination.
   *
   * Combinations used to be resolved in a single burst: the length was drawn up front and all
   * of it fired before the other fighter existed again. That is why nobody was ever caught
   * mid-combination. A combination is now a *state* — `comboLeft` on the fighter — and each
   * strike is a separate action on the tick clock, so the opponent gets his own chances in
   * between and a fighter who over-commits at the end of a flurry can be countered.
   *
   * Returns the seconds the action occupied, which the caller turns into the fighter's next
   * ready time.
   */
  function throwStrike(actor: Combatant, opponent: Combatant, r: Rng): number {
    const leading = actor.comboLeft <= 0;
    const clinched = state.position === 'CLINCH' || state.position === 'CAGE_CLINCH';
    const pool = clinched ? CLINCH_STRIKES : openStrikes(state.distance);
    const definition = selectStrike(actor, opponent, pool, r, leading);
    if (!definition) return 0.3;

    if (leading) {
      // 2-4 strikes is the common case; a single shot is the exception, not the rule.
      const volume = actor.plan.strikeVolume;
      const output = effectiveOutput(actor.stamina);
      actor.comboLeft =
        choose(r, [
          [1, 0.5 + (1 - volume) * 0.5],
          [2, 1.5 + volume * 0.5],
          [3, (1.35 + volume * 0.7) * output],
          [4, (0.75 + volume * 0.6) * output * output],
          [5, (0.22 + volume * 0.35) * output * output],
        ]) ?? 2;
    }

    const landed = resolveStrike(actor, opponent, definition, state.distance, r);
    actor.lastStrike = definition.key;
    actor.comboLeft--;
    if (actor.comboLeft <= 0 && state.distance === 'close' && r.bool(0.72)) state.distance = 'mid';
    else if (actor.comboLeft <= 0 && state.distance === 'mid' && r.bool(0.3)) state.distance = 'long';
    // A committed miss ends the sequence; a fighter does not keep swinging into space.
    if (!landed && r.bool(0.4)) actor.comboLeft = 0;

    // Strikes inside a combination come faster than the first one — that is what makes it a
    // combination rather than a series of separate decisions.
    const inCombo = !leading;
    const duration = definition.time * (inCombo ? 0.78 : 1);
    actor.vulnerableUntil = state.elapsed + duration + definition.recovery;
    return duration + definition.recovery * (actor.comboLeft > 0 ? 0.35 : 1);
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
        const strikeDefinition = selectStrike(actor, opponent, GROUND_STRIKES, r);
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
      ['takedown' as const, actor.plan.takedownRate * 0.22],
      ['break' as const, state.topId === actor.id ? 0.35 : 1.4],
    ]);

    if (action === 'strike') {
      const definition = selectStrike(actor, opponent, CLINCH_STRIKES, r);
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

  /**
   * Footwork, feints and level changes — the micro-activity a fight is mostly made of.
   *
   * A real fight is not a sequence of exchanges with nothing between them. It is constant
   * movement with strikes as punctuation, and the engine had none of it: every decision was
   * an attack, a takedown, a clinch entry or a generic "reset". These actions are cheap, they
   * move the distance, and they set up everything else — a level change sells the takedown
   * that makes the overhand land.
   *
   * Returns the seconds occupied.
   */
  function moveOrFeint(actor: Combatant, opponent: Combatant, kind: MicroAction, r: Rng): number {
    const step = (from: Range, to: Range) => {
      state.distance = to;
      return from !== to;
    };

    if (kind === 'advance') {
      // Closing all the way into the pocket is a commitment, not the default step.
      const moved = step(state.distance, state.distance === 'long' ? 'mid' : r.bool(0.45) ? 'close' : 'mid');
      actor.retreatingFor = 0;
      spend(actor.stamina, 0.14);
      if (moved && r.bool(0.24)) {
        emit({
          eventType: 'POSITION_CHANGE', attacker: actor.id, defender: opponent.id,
          fromPosition: 'STANDING', toPosition: 'STANDING',
          description: `${actor.shortName} steps in behind the guard.`,
        });
      }
      return r.float(0.55, 1.1);
    }

    if (kind === 'retreat') {
      step(state.distance, state.distance === 'close' ? 'mid' : 'long');
      actor.retreatingFor = r.float(0.8, 2.2);
      spend(actor.stamina, 0.12);
      return r.float(0.6, 1.2);
    }

    if (kind === 'circle') {
      actor.retreatingFor = Math.max(actor.retreatingFor, r.float(0.3, 1));
      spend(actor.stamina, 0.1);
      // A battered lead leg is what stops a fighter circling, so it costs more when hurt.
      const hobbled = 1 + actor.damage.leadLeg / 90;
      return r.float(0.8, 1.8) * hobbled;
    }

    if (kind === 'feint') {
      spend(actor.stamina, 0.16);
      // A feint that works freezes the opponent for a beat, which is what buys the entry.
      const sold = contest(effective(actor, 'fightIQ' in actor.attributes ? 'strikingOffense' : 'strikingOffense'), effective(opponent, 'strikingDefense'), 0.06);
      if (r.bool(sold * 0.5)) opponent.readyAt = Math.max(opponent.readyAt, state.elapsed + r.float(0.15, 0.4));
      if (r.bool(0.2)) {
        emit({
          eventType: 'POSITION_CHANGE', attacker: actor.id, defender: opponent.id,
          fromPosition: 'STANDING', toPosition: 'STANDING',
          description: `${actor.shortName} feints and ${opponent.shortName} bites on it.`,
        });
      }
      return r.float(0.5, 0.9);
    }

    // Level change: sells the shot, and is the thing that makes a takedown threat real.
    spend(actor.stamina, 0.22);
    if (r.bool(0.28)) {
      emit({
        eventType: 'POSITION_CHANGE', attacker: actor.id, defender: opponent.id,
        fromPosition: 'STANDING', toPosition: 'STANDING',
        description: `${actor.shortName} drops levels and ${opponent.shortName} has to respect it.`,
      });
    }
    return r.float(0.5, 0.9);
  }

  type MicroAction = 'advance' | 'retreat' | 'circle' | 'feint' | 'level';

  /**
   * One standing decision, on this fighter's own clock. Returns the seconds it occupied.
   *
   * The weights are deliberately dominated by movement rather than offence. Counting the
   * decisions a fighter actually makes in a round, only a minority of them are strikes.
   */
  function decideStanding(actor: Combatant, opponent: Combatant, r: Rng): number {
    // Mid-combination: keep throwing, no re-decision.
    if (actor.comboLeft > 0) return throwStrike(actor, opponent, r);

    const plan = actor.plan;
    const profile = classProfile(actor.divisionKey);
    const output = effectiveOutput(actor.stamina);
    const hurt = actor.stunnedFor > 0;
    // Someone who is hurt covers up and moves; they do not start firing back.
    const offence = hurt ? 0.25 : 1;
    // Takedown appetite is set by the class profile, scaled by the fighter's own wrestling.
    const wrestling = effective(actor, 'wrestlingOffense') / 100;

    const action = choose(r, [
      // Pressure belongs *in* the strike weight, not only against it. It used to feed the
      // advance weight alone, so a pressure boxer spent his decisions walking forward and a
      // grappler out-struck him — which is precisely backwards.
      ['strike' as const, plan.strikeVolume * (0.62 + plan.pressure * 0.95) * profile.volume * output * offence * 1.37],
      ['advance' as const, 0.75 + plan.pressure * 0.8 + (state.distance === 'long' ? 0.9 : 0.2)],
      ['retreat' as const, plan.range * 1.1 + (hurt ? 2.4 : 0) + (state.distance === 'close' ? 0.7 : 0.15)],
      ['circle' as const, 1.5 + plan.counterRate * 0.9],
      ['feint' as const, 1.15 + plan.counterRate * 0.7],
      ['level' as const, plan.takedownRate * 0.9],
      ['takedown' as const, plan.takedownRate ** 1.7 * profile.takedownRate * wrestling * 0.0075 * offence],
      ['clinch' as const, plan.clinchRate * 0.26 * offence],
    ]) ?? 'circle';

    if (action === 'strike') return throwStrike(actor, opponent, r);
    if (action === 'takedown') {
      resolveTakedown(actor, opponent, r);
      actor.vulnerableUntil = state.elapsed + 1.2;
      return 1.2;
    }
    if (action === 'clinch') {
      resolveClinchEntry(actor, opponent, r);
      return 0.9;
    }
    return moveOrFeint(actor, opponent, action, r);
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
    // Both come out of the corner fresh and at range, on their own clocks again.
    for (const fighter of [a, b]) {
      fighter.readyAt = state.elapsed;
      fighter.vulnerableUntil = 0;
      fighter.comboLeft = 0;
      fighter.retreatingFor = 0;
      fighter.lastStrike = undefined;
    }
    state.distance = 'mid';

    emit({
      eventType: 'ROUND_START',
      description: `Round ${roundNumber}.`,
    });

    /**
     * The tick loop (brief §1).
     *
     * State advances on a fixed 0.1s tick; actions resolve on each fighter's own clock. The
     * previous loop alternated turns on a coin flip and consumed two to twelve seconds an
     * exchange, which is why the fight had no texture — nobody could be caught mid-flurry,
     * nobody was ever a beat late, and a fifteen-minute fight contained about eighty
     * decisions. This runs nine thousand ticks and lets the two clocks drift against each
     * other, which is where counters, interruptions and being beaten to the punch come from.
     *
     * One RNG per round, drawn in a fixed order, rather than one derived per action: nine
     * thousand derivations a round is real cost for no determinism gain, since the draw
     * order is already fixed.
     */
    const roundRng = rng.derive('round', roundNumber);

    while (state.clock > 0 && !state.finished) {
      state.clock -= TICK;
      state.elapsed += TICK;

      // Continuous state first, so a decision this tick sees the current picture.
      recover(a.stamina, TICK, false);
      recover(b.stamina, TICK, false);
      for (const fighter of [a, b]) {
        fighter.stunnedFor = Math.max(0, fighter.stunnedFor - TICK);
        fighter.retreatingFor = Math.max(0, fighter.retreatingFor - TICK);
        fighter.momentum *= 0.9993;
      }

      const grappling = isGroundPosition(state.position) || state.position === 'CLINCH' || state.position === 'CAGE_CLINCH';
      if (grappling) {
        state.groundStall += TICK;
        if (state.topId) {
          const controller = state.topId === a.id ? a : b;
          const dominance = groundPosition(state.position)?.dominance ?? 0.5;
          const credited = TICK * (dominance > 0.3 ? 1 : 0.5);
          controller.controlTime += credited;
          currentRound(controller).controlTime += credited;
        }
      } else {
        state.groundStall = 0;
      }

      // Each fighter acts on their own timer. Order is fixed for determinism; the timers
      // themselves are what decide who actually gets to move.
      for (const [actor, opponent] of [[a, b], [b, a]] as const) {
        if (state.finished || state.clock <= 0) break;
        if (state.elapsed < actor.readyAt) continue;

        let occupied: number;
        if (isGroundPosition(state.position)) {
          resolveGroundAction(actor, opponent, roundRng);
          occupied = roundRng.float(1.6, 3.4);
        } else if (state.position === 'CLINCH' || state.position === 'CAGE_CLINCH') {
          resolveClinchAction(actor, opponent, roundRng);
          occupied = roundRng.float(1.1, 2.6);
        } else {
          occupied = decideStanding(actor, opponent, roundRng);
        }

        // Class tempo stretches or compresses every action; a heavyweight fight is slower
        // everywhere, not merely less accurate.
        actor.readyAt = state.elapsed + Math.max(TICK, occupied * pace.tempo);
      }

      // Commentary beats: the things a broadcast would actually remark on. Emitted at most
      // once each per fighter per round, so they read as observations rather than a ticker.
      for (const fighter of [a, b]) {
        if (state.finished) break;
        if (!fighter.noted.legs && fighter.damage.leadLeg > 34) {
          fighter.noted.legs = true;
          emit({
            eventType: 'DAMAGE_UPDATE', fighterId: fighter.id,
            damage: { ...fighter.damage, leadLeg: roundTo(fighter.damage.leadLeg, 1) },
            description: `${fighter.shortName} is limping now — that lead leg has been chopped up and the circling has stopped.`,
          });
        }
        if (!fighter.noted.gassed && effectiveOutput(fighter.stamina) < 0.62 && state.round >= 2) {
          fighter.noted.gassed = true;
          emit({
            eventType: 'STAMINA_UPDATE', fighterId: fighter.id,
            stamina: { burst: roundTo(fighter.stamina.burst, 0), cardio: roundTo(fighter.stamina.cardio, 0) },
            description: `The pace has dropped. ${fighter.shortName} has their hands on their knees between exchanges.`,
          });
        }
        if (!fighter.noted.body && fighter.damage.body > 30) {
          fighter.noted.body = true;
          emit({
            eventType: 'DAMAGE_UPDATE', fighterId: fighter.id,
            damage: { ...fighter.damage, leadLeg: roundTo(fighter.damage.leadLeg, 1) },
            description: `${fighter.shortName} is wincing every time that body shot lands — the investment is paying off.`,
          });
        }
      }

      // Fighters reassess a few times a round rather than continuously.
      if (Math.abs(state.elapsed % 25) < TICK / 2) {
        adaptInFight(a, b);
        adaptInFight(b, a);
      }

      // A stalled position gets restarted.
      if (state.groundStall > 40 && isGroundPosition(state.position)) {
        const dominance = groundPosition(state.position)?.dominance ?? 0.5;
        if (roundRng.bool(clamp(0.02 - dominance * 0.018, 0.001, 0.02))) {
          state.position = 'STANDING';
          state.topId = undefined;
          state.groundStall = 0;
          state.distance = 'mid';
          emit({
            eventType: 'REFEREE_ACTION',
            action: 'STAND_THEM_UP',
            description: 'The referee restarts them on the feet.',
          });
        }
      }

      // The doctor gets involved when a cut is bad enough.
      if (!state.finished && roundRng.bool(0.0006)) {
        for (const [hurt, other] of [[a, b], [b, a]] as const) {
          if (!needsDoctor(hurt.damage)) continue;
          emit({
            eventType: 'DOCTOR_CHECK',
            fighterId: hurt.id,
            action: 'CUT_INSPECTION',
            description: `The referee calls time — the doctor takes a look at ${hurt.shortName}'s cut.`,
          });
          if (roundRng.bool(0.18)) {
            finish('DOCTOR_STOPPAGE', other, hurt, undefined, `The doctor will not let them continue. ${other.shortName} wins by doctor stoppage.`);
          }
          break;
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

      // Heavier fighters get less back on the stool, which is what makes their round threes
      // look the way they do.
      recoverBetweenRounds(a.stamina, classProfile(a.divisionKey).recovery);
      recoverBetweenRounds(b.stamina, classProfile(b.divisionKey).recovery);
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
    // Per-round, per-fighter, for the round-by-round overlay (brief §4). Already tracked;
    // it was simply never handed out.
    roundStats: { [a.id]: a.stats.map(snapshot), [b.id]: b.stats.map(snapshot) },
    damage: { [a.id]: roundTo(totalDamage(a.damage), 1), [b.id]: roundTo(totalDamage(b.damage), 1) },
  };
}

/** A cheap composite used only for initiative. */
function effectiveAttributeScore(combatant: Combatant): number {
  return (combatant.attributes.speed * 0.5 + combatant.attributes.aggression * 0.5) / 100;
}
