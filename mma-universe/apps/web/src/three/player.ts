/**
 * The choreography timeline.
 *
 * This is the module that turns "what happened" into "what is on screen at t = 4.2 s", and
 * it is the heart of the 3D layer. It consumes exactly what the API serves at
 * `/fights/:id/events?format=animation` — nothing else — which is the architectural claim
 * the whole viewer exists to demonstrate: the renderer reads the event stream and reads
 * nothing else. It cannot consult the simulation, because it has no way to.
 *
 * Two pacings are offered because a fight is 15 minutes of clock and about 90 seconds of
 * action:
 *
 *   - `REALTIME` places each beat at the event's own `timestamp`, so the replay runs on the
 *     fight clock and the gaps between exchanges are real gaps.
 *   - `CONDENSED` packs beats back to back, which is what you want when scrubbing a fight
 *     for what actually happened.
 *
 * Sampling is a pure function of `(timeline, t)`. Nothing accumulates frame to frame, so
 * scrubbing backwards costs the same as playing forwards and a paused frame is identical
 * whichever direction you arrived from.
 */

import type { AnimationBeatWire, CameraHint, FightEventWire, FightPositionWire } from '../types.ts';
import type { Clip } from './clips.ts';
import { REACTIONS, isGrounded, resolveClip, restPose } from './clips.ts';
import type { ResolvedPose } from './blend.ts';
import { blendPose, blendPoseShortest, ease, resolvePose, sampleClip } from './blend.ts';
import { addLife, fatigueForRound, feintAt, staggerAt } from './life.ts';
import { claimOf, isTotal, JOINT_REGION, FULL_MASK, REGIONS, type Region, type RegionMask } from './regions.ts';
import { planFootwork, footAt, type FootPlan, type PathSample } from './footwork.ts';
import type { MovementProfile } from '../types.ts';
import { solveLeg, rotateY as rotateGround, eulerToMatrix, transposeApply, subtract } from './ik.ts';
import { JOINT_NAMES, SKELETON, type Joint, type Vec3 } from './rig.ts';

export type Pacing = 'CONDENSED' | 'REALTIME';

/** Held between condensed beats so consecutive strikes do not read as one motion. */
const CONDENSED_GAP = 0.1;
/** Minimum separation in realtime pacing; the engine can emit a combination on one second. */
const MIN_REALTIME_STEP = 0.09;
/** Time the last pose is held so a finish does not cut to black on the frame it lands. */
const TAIL = 1.5;
/**
 * How long a new beat takes to take over from the pose the previous one left behind.
 *
 * Without this every beat begins from its clip's first keyframe — a stance — so the fighter
 * snapped back to neutral and started again between every single action. That discontinuity,
 * repeated a few hundred times a fight, is most of what reads as robotic.
 */
const CARRY_OVER = 0.16;
/**
 * How long a beat takes to take the body over, by what kind of beat it is.
 *
 * A single blend time for everything is wrong in both directions: a stagger that eases in over
 * a sixth of a second has no impact, and a takedown that snaps on in the same time has no
 * weight. A body reacting to a shot it did not see moves faster than one deciding to move.
 */
const BLEND_EMERGENCY = 0.07;
const BLEND_STRIKE = 0.15;
const BLEND_GRAPPLE = 0.3;
/** Strikes that flow out of the one before rather than starting again from guard. */
const COMBO_GAP = 0.02;
const COMBO_WINDOW = 0.9;
/** How fast the two of them circle, in radians per beat of engagement. */
const CIRCLE_RATE = 0.085;
/**
 * How long a reaction takes to take over the defender's body, and to hand it back.
 *
 * Reactions are authored from a neutral stance, but the fighter receiving one may be wobbling,
 * tied up in the clinch or already on the canvas. Cutting straight to the clip's first frame
 * snapped the guard through more than a radian in one frame — the same reset the beat carry-
 * over fixes, one level down.
 */
const REACTION_TAKEOVER = 0.09;
const REACTION_RELEASE = 0.18;

export interface TimelineBeat {
  readonly index: number;
  readonly start: number;
  readonly end: number;
  readonly event: FightEventWire;
  readonly clip: Clip;
  /** The clip's registry name, for debug readouts and for total-takeover checks. */
  readonly clipName: string;
  readonly camera: CameraHint;
  readonly position: FightPositionWire;
  readonly grounded: boolean;
  readonly spacing: number;
  /** Absolute time the reaction fires; the defender does nothing before it. */
  readonly impactAt: number;
  readonly reaction: Clip;
  /** The reaction's name, for the condition it leaves behind and for debug readouts. */
  readonly reactionName: string;
  /** Undefined when the beat belongs to nobody in particular, and both fighters play it. */
  readonly actorId?: string;
  readonly reactorId?: string;
  /** Lateral drift of the engagement, so a fight does not happen on one spot of canvas. */
  readonly centre: Vec3;
  /**
   * Which way round the pair are standing. Without this they face along a fixed axis all
   * fight, which is not something two people circling each other ever do.
   */
  readonly facing: number;
  /** How long this beat takes to take the body over. */
  readonly blend: number;
  /** How strongly this beat's clip claims each part of the body. */
  readonly claim: RegionMask;
  /** True when this beat flows out of the previous one — a combination, not a fresh start. */
  readonly follows: boolean;
}

export interface Timeline {
  readonly beats: readonly TimelineBeat[];
  readonly duration: number;
  readonly fighterA: string;
  readonly fighterB: string;
  readonly pacing: Pacing;
  /** Where each fighter's feet are, planned once so that sampling stays pure. */
  readonly footPlans: readonly [FootPlan, FootPlan];
  /** How each fighter moves. Defaults to an unremarkable middle if none was supplied. */
  readonly profiles: readonly [MovementProfile, MovementProfile];
  /** When each fighter was badly hurt, so the effect can decay rather than end with the clip. */
  readonly staggerHits: readonly [readonly StaggerHit[], readonly StaggerHit[]];
}

export interface StaggerHit {
  readonly at: number;
  readonly magnitude: number;
}

/** A fighter we know nothing about: neither a pressure fighter nor an out-fighter. */
function defaultProfile(fighterId: string, index: number): MovementProfile {
  return {
    fighterId,
    pressure: 0.5,
    mobility: 0.5,
    recovery: 0.5,
    engine: 0.5,
    guard: 0.5,
    deception: 0.5,
    phase: index * Math.PI,
  };
}

/** How badly a reaction says the fighter was hurt, for the condition that follows it. */
const STAGGER_WEIGHT: Readonly<Record<string, number>> = {
  DROP: 1,
  STAGGER: 0.8,
  HEAVY: 0.45,
  BODY_FOLD: 0.4,
  LEG_BUCKLE: 0.3,
};

/**
 * Centre-to-centre separation each position is drawn at.
 *
 * Standing range is set from the rig, not from taste: a fully extended arm puts the glove
 * about 0.81 m past the fighter's own root, and the opponent's face sits about 0.11 m inside
 * theirs, so anything past roughly a metre has every punch stopping visibly short. Fighters
 * in punching range really are that close.
 */
function spacingFor(position: FightPositionWire): number {
  if (isGrounded(position)) return 0.46;
  switch (position) {
    case 'CLINCH':
    case 'CAGE_CLINCH':
      return 0.62;
    case 'TAKEDOWN_ATTEMPT':
      return 0.8;
    case 'STUNNED':
    case 'RECOVERY':
      return 1.3;
    default:
      return 1.05;
  }
}

/**
 * Where in the cage this beat happens.
 *
 * Derived from the event's sequence number rather than from a random walk, for the same
 * reason the mapper derives clip variants that way: a replay has to land in the same place
 * twice. The cage is 4.1 m to the fence, so the engagement wanders within a 1.5 m disc.
 */
function centreFor(event: FightEventWire): Vec3 {
  const phase = (event.sequence * 0.137) % (Math.PI * 2);
  const radius = 0.75 + 0.75 * Math.sin(event.sequence * 0.041);
  return [Math.cos(phase) * radius, 0, Math.sin(phase) * radius * 0.6];
}

/** Which way round the pair are standing, drifting the way two fighters circle. */
function facingFor(event: FightEventWire): number {
  return event.sequence * CIRCLE_RATE + Math.sin(event.sequence * 0.031) * 0.5;
}

/** An emergency, a decision, or a commitment — each takes the body over at its own rate. */
function blendFor(clipName: string, reaction: string, eventType: string): number {
  if (eventType === 'KNOCKDOWN' || eventType === 'STUN' || reaction === 'STAGGER' || reaction === 'DROP') {
    return BLEND_EMERGENCY;
  }
  if (isTotal(clipName)) return BLEND_GRAPPLE;
  return BLEND_STRIKE;
}

const STRIKE_EVENTS = new Set(['STRIKE', 'SIGNIFICANT_STRIKE']);

function positionOf(beat: AnimationBeatWire): FightPositionWire {
  return beat.directive.targetState;
}

export function buildTimeline(
  source: readonly AnimationBeatWire[],
  fighterA: string,
  fighterB: string,
  pacing: Pacing = 'CONDENSED',
  profiles?: readonly [MovementProfile, MovementProfile],
): Timeline {
  const ordered = [...source].sort((x, y) => x.event.sequence - y.event.sequence);
  const beats: TimelineBeat[] = [];
  let cursor = 0;

  for (const [index, entry] of ordered.entries()) {
    const { event, directive } = entry;
    const clip = resolveClip(directive.clip, directive.variant);
    const speed = directive.speed > 0 ? directive.speed : 1;
    const duration = clip.duration / speed;

    // A second strike from the same fighter, straight after the first, is a combination — it
    // leaves from wherever the last one recovered to rather than resetting to guard first.
    const last = beats[beats.length - 1];
    const follows =
      last !== undefined &&
      last.actorId !== undefined &&
      last.actorId === directive.actorId &&
      STRIKE_EVENTS.has(last.event.eventType) &&
      STRIKE_EVENTS.has(event.eventType) &&
      event.timestamp - last.event.timestamp < COMBO_WINDOW;

    const start =
      pacing === 'REALTIME'
        ? Math.max(event.timestamp, cursor + MIN_REALTIME_STEP)
        : index === 0
          ? 0
          : cursor + (follows ? COMBO_GAP : CONDENSED_GAP);

    const position = positionOf(entry);
    beats.push({
      index,
      start,
      end: start + duration,
      event,
      clip,
      clipName: directive.clip,
      camera: isGrounded(position) && directive.camera === 'BROADCAST' ? 'GROUND_OVERHEAD' : directive.camera,
      position,
      grounded: isGrounded(position),
      spacing: spacingFor(position),
      impactAt: start + duration * clip.impactAt,
      reaction: REACTIONS[directive.reaction] ?? REACTIONS.NONE,
      reactionName: directive.reaction,
      actorId: directive.actorId,
      reactorId: directive.reactorId,
      centre: centreFor(event),
      facing: facingFor(event),
      blend: follows ? BLEND_EMERGENCY : blendFor(directive.clip, directive.reaction, event.eventType),
      claim: isTotal(directive.clip) ? FULL_MASK : claimOf(clip),
      follows,
    });
    cursor = start + duration;
  }

  const resolved: readonly [MovementProfile, MovementProfile] = profiles ?? [
    defaultProfile(fighterA, 0),
    defaultProfile(fighterB, 1),
  ];

  // Being hurt outlives the clip that did it, so the moments are collected here and the
  // condition decays from them — see `staggerAt`.
  const hits: [StaggerHit[], StaggerHit[]] = [[], []];
  for (const beat of beats) {
    const magnitude = STAGGER_WEIGHT[beat.reactionName];
    if (magnitude === undefined || beat.reactorId === undefined) continue;
    const index = beat.reactorId === fighterA ? 0 : 1;
    hits[index].push({ at: beat.impactAt, magnitude });
  }

  const partial: Timeline = {
    beats,
    duration: cursor + TAIL,
    fighterA,
    fighterB,
    pacing,
    footPlans: [{ steps: [], start: [[0, 0], [0, 0]] }, { steps: [], start: [[0, 0], [0, 0]] }],
    profiles: resolved,
    staggerHits: hits,
  };

  // The gait is planned against the finished path, then attached — see `footwork.ts` for why
  // it is planned rather than simulated frame by frame.
  const path = samplePath(partial);
  return {
    ...partial,
    footPlans: [
      planFootwork(path[0], { phase: 0, mobility: resolved[0].mobility, pressure: resolved[0].pressure }),
      planFootwork(path[1], { phase: 0.5, mobility: resolved[1].mobility, pressure: resolved[1].pressure }),
    ],
  };
}

/** Samples where each fighter stands, at a fixed rate, for the footwork planner. */
function samplePath(timeline: Timeline): [PathSample[], PathSample[]] {
  const rate = 1 / 30;
  const a: PathSample[] = [];
  const b: PathSample[] = [];
  for (let time = 0; time <= timeline.duration; time += rate) {
    const beat = beatAt(timeline, time);
    if (!beat) continue;
    const duration = Math.max(beat.end - beat.start, 0.001);
    const stance = stanceAt(timeline, beat, (time - beat.start) / duration);
    a.push({ time, x: stance.a[0], z: stance.a[2], yaw: stance.yawA });
    b.push({ time, x: stance.b[0], z: stance.b[2], yaw: stance.yawB });
  }
  return [a, b];
}

/* -------------------------------------------------------------------- sampling */

export interface FighterFrame {
  readonly id: string;
  readonly pose: ResolvedPose;
  /** World position of the fighter's root, on the canvas. */
  readonly position: Vec3;
  readonly yaw: number;
  /**
   * How much of the legs the footwork got, after the action took its share. Exposed because
   * it is the single most useful number for understanding why a fighter is or is not stepping
   * — and because "why did the foot slide there" is otherwise unanswerable from outside.
   */
  readonly legFreedom: number;
  /** How much of the idle layer applied: 1 at rest, lower mid-technique. */
  readonly rest: number;
  /** How hurt this fighter still looks, decaying from the last time they were caught. */
  readonly stagger: number;
  /** Whether a feint is in progress, and how far through it. */
  readonly feint: number;
  /** How tired this fighter should look, given the round and their engine. */
  readonly fatigue: number;
}

export interface Frame {
  readonly time: number;
  readonly beat?: TimelineBeat;
  readonly a: FighterFrame;
  readonly b: FighterFrame;
  readonly camera: CameraHint;
  readonly description: string;
  readonly round: number;
  readonly roundTime: string;
}

/** The beat covering `time`, or the last one to have started. Binary search: fights are long. */
export function beatAt(timeline: Timeline, time: number): TimelineBeat | undefined {
  const beats = timeline.beats;
  if (beats.length === 0) return undefined;
  let low = 0;
  let high = beats.length - 1;
  let found: TimelineBeat | undefined;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const beat = beats[mid];
    if (!beat) break;
    if (beat.start <= time) {
      found = beat;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return found ?? beats[0];
}

const IDLE = resolvePose(restPose('STANDING', 'ACTOR'));

/** Both fighters' poses within one beat, before carry-over, idle or footwork. */
interface BeatPoses {
  readonly a: ResolvedPose;
  readonly b: ResolvedPose;
  /** How occupied each fighter is, 0 (mid-technique) to 1 (at rest). Scales the idle layer. */
  readonly aRest: number;
  readonly bRest: number;
  /** What the action leaves the legs free to do, per fighter. */
  readonly aLegs: number;
  readonly bLegs: number;
}

/**
 * Composes one beat as layers rather than as a pose.
 *
 * This is the change the whole rewrite turns on. A clip used to return all nineteen joints, so
 * a fighter throwing a jab had the legs the jab clip specified and could not simultaneously be
 * stepping, circling or shifting weight — every action was total, and total actions read as
 * discrete states a body snaps between. Now a clip states a *claim* over each region, and
 * whatever it does not claim is left to the stance underneath and to the footwork below that.
 */
function posesForBeat(timeline: Timeline, beat: TimelineBeat, time: number): BeatPoses {
  const duration = Math.max(beat.end - beat.start, 0.001);
  const u = (time - beat.start) / duration;
  const shared = beat.actorId === undefined;

  const actorBase = resolvePose(restPose(beat.position, 'ACTOR'));
  const actorAction = sampleClip(beat.clip, u);
  const actorPose = layer(actorBase, actorAction, beat.claim);

  const reactorBase = resolvePose(restPose(beat.position, 'REACTOR'));
  const reaction = reactionFor(beat, time);
  const reactorPose = shared ? actorPose : layer(reactorBase, reaction.pose, reaction.claim);

  // A fighter mid-strike should not also be bouncing in their stance, so the idle layer is
  // damped in proportion to how close this frame is to the moment of the technique.
  const actorRest = Math.max(0.3, Math.min(1, Math.abs(u - beat.clip.impactAt) * 3));
  const reactorRest = shared ? actorRest : reaction.active ? 0.35 : 1;

  const actorLegs = 1 - beat.claim.LEGS;
  const reactorLegs = shared ? actorLegs : 1 - reaction.claim.LEGS;

  const actorIsA = shared ? true : beat.actorId === timeline.fighterA;
  return {
    a: actorIsA ? actorPose : reactorPose,
    b: actorIsA ? reactorPose : actorPose,
    aRest: actorIsA ? actorRest : reactorRest,
    bRest: actorIsA ? reactorRest : actorRest,
    aLegs: actorIsA ? actorLegs : reactorLegs,
    bLegs: actorIsA ? reactorLegs : actorLegs,
  };
}

interface Reaction {
  readonly pose: ResolvedPose;
  readonly claim: RegionMask;
  readonly active: boolean;
}

/**
 * The defender's contribution.
 *
 * Before the strike lands they are doing nothing in particular, so the reaction claims nothing
 * and the stance shows through. From the impact it eases on, and off again if it outlives the
 * beat — reactions are authored from a neutral stance, and a defender who is wobbling or
 * already on the canvas is not standing in one.
 */
function reactionFor(beat: TimelineBeat, time: number): Reaction {
  const rest = resolvePose(restPose(beat.position, 'REACTOR'));
  if (time < beat.impactAt) return { pose: rest, claim: EMPTY_CLAIM, active: false };

  const into = time - beat.impactAt;
  const duration = beat.reaction.duration;
  if (into >= duration) return { pose: rest, claim: EMPTY_CLAIM, active: false };

  const reacting = sampleClip(beat.reaction, into / duration);
  const takeover = Math.min(1, into / REACTION_TAKEOVER);
  const release = Math.min(1, (duration - into) / REACTION_RELEASE);
  const strength = ease(Math.min(takeover, release));

  const claim = claimOf(beat.reaction);
  const scaled = {} as Record<Region, number>;
  for (const region of REGIONS) scaled[region] = claim[region] * strength;

  return { pose: blendPoseShortest(rest, reacting, strength), claim: scaled, active: true };
}

const EMPTY_CLAIM: RegionMask = { LEGS: 0, HIPS: 0, SPINE: 0, ARM_L: 0, ARM_R: 0, HEAD: 0 };

/**
 * Where the engagement sits and which way round the pair are standing.
 *
 * `centre`, `spacing` and `facing` are all step functions — one value per beat — so using them
 * directly teleported both fighters on every action. Treating each as the value reached by the
 * *end* of the beat, starting from where the previous beat left them, turns the same data into
 * footwork and circling at about half a metre a second.
 */
interface Stance {
  readonly a: Vec3;
  readonly b: Vec3;
  readonly yawA: number;
  readonly yawB: number;
  readonly half: number;
}

function stanceAt(timeline: Timeline, beat: TimelineBeat, u: number): Stance {
  const previous = timeline.beats[beat.index - 1];
  const from = previous ? previous.centre : beat.centre;
  const fromSpacing = previous ? previous.spacing : beat.spacing;
  const fromFacing = previous ? previous.facing : beat.facing;
  const k = ease(Math.max(0, Math.min(1, u)));

  const cx = from[0] + (beat.centre[0] - from[0]) * k;
  const cz = from[2] + (beat.centre[2] - from[2]) * k;
  const half = (fromSpacing + (beat.spacing - fromSpacing) * k) / 2;
  const facing = fromFacing + (beat.facing - fromFacing) * k;

  const near = rotateGround([0, 0, -half], facing);
  const far = rotateGround([0, 0, half], facing);
  return {
    a: [cx + near[0], 0, cz + near[2]],
    b: [cx + far[0], 0, cz + far[2]],
    yawA: facing,
    yawB: facing + Math.PI,
    half,
  };
}

/** Blends an action over a base pose, region by region, according to the clip's claim. */
function layer(base: ResolvedPose, action: ResolvedPose, mask: RegionMask): ResolvedPose {
  const joints = {} as Record<Joint, Vec3>;
  for (const joint of JOINT_NAMES) {
    const weight = mask[JOINT_REGION[joint]];
    const from = base.joints[joint];
    const to = action.joints[joint];
    joints[joint] =
      weight >= 1
        ? to
        : weight <= 0
          ? from
          : [
              from[0] + (to[0] - from[0]) * weight,
              from[1] + (to[1] - from[1]) * weight,
              from[2] + (to[2] - from[2]) * weight,
            ];
  }
  // The hips carry the body, so their displacement follows whichever of the two lower-body
  // claims is stronger — a kick lifts the fighter, a stance does not.
  const weight = Math.max(mask.HIPS, mask.LEGS);
  return {
    joints,
    offset: [
      base.offset[0] + (action.offset[0] - base.offset[0]) * weight,
      base.offset[1] + (action.offset[1] - base.offset[1]) * weight,
      base.offset[2] + (action.offset[2] - base.offset[2]) * weight,
    ],
  };
}

const THIGH_LENGTH = SKELETON.thighL.length;
const SHIN_LENGTH = SKELETON.shinL.length;
const FOOT_JOINTS: readonly [Joint, Joint, Joint][] = [
  ['thighL', 'shinL', 'footL'],
  ['thighR', 'shinR', 'footR'],
];

/**
 * Solves the legs onto their planted foot positions.
 *
 * `freedom` is what the action clip has left over: a kick claims the legs outright and gets
 * them, a jab claims almost none of them and the floor wins. Without this the legs would fight
 * the technique, and a head kick would be delivered by a fighter standing flat-footed.
 */
function plantFeet(
  pose: ResolvedPose,
  root: Vec3,
  yaw: number,
  plan: FootPlan,
  time: number,
  freedom: number,
): ResolvedPose {
  if (freedom <= 0.02) return pose;

  const joints = { ...pose.joints } as Record<Joint, Vec3>;
  const hipsBase = SKELETON.hips.offset;
  const hipsPosition: Vec3 = [
    hipsBase[0] + pose.offset[0],
    hipsBase[1] + pose.offset[1],
    hipsBase[2] + pose.offset[2],
  ];
  const hipsRotation = eulerToMatrix(pose.joints.hips);
  // The knee should point along the fighter's forward, not the hip's. A bladed stance yaws
  // the hips a third of a radian off the line of the body, and using the hip's own axis puts
  // that much splay into both knees.
  const pole = transposeApply(hipsRotation, [0, 0, 1]);

  for (const [index, bones] of FOOT_JOINTS.entries()) {
    const foot = footAt(plan, index as 0 | 1, time);
    // World, then the fighter's own space, then the hip's, then the thigh's.
    const local = rotateGround([foot.x - root[0], foot.y - root[1], foot.z - root[2]], -yaw);
    const fromHips = transposeApply(hipsRotation, subtract(local, hipsPosition));
    const thighOffset = SKELETON[bones[0]].offset;
    const target = subtract(fromHips, thighOffset);

    const solved = solveLeg(target, THIGH_LENGTH, SHIN_LENGTH, pole);
    for (const [slot, bone] of [bones[0], bones[1]].entries()) {
      const current = joints[bone];
      const wanted = slot === 0 ? solved.thigh : solved.shin;
      joints[bone] = [
        current[0] + (wanted[0] - current[0]) * freedom,
        current[1] + (wanted[1] - current[1]) * freedom,
        current[2] + (wanted[2] - current[2]) * freedom,
      ];
    }

    // Keep the sole roughly on the floor, and roll onto the toe through a step.
    const ankle = joints[bones[0]][0] + joints[bones[1]][0];
    const flat = -ankle + foot.swing * 0.55;
    const current = joints[bones[2]];
    joints[bones[2]] = [current[0] + (flat - current[0]) * freedom * 0.8, current[1], current[2]];
  }

  return { joints, offset: pose.offset };
}

/**
 * Turns the head toward the opponent.
 *
 * A clip can leave the head pointing wherever the technique took it, and the idle layer drifts
 * it further. Neither knows there is another person in the cage. This pulls it back, softly and
 * within limits — a head mechanically locked on target is its own kind of robotic.
 */
function trackOpponent(pose: ResolvedPose, strength: number): ResolvedPose {
  if (strength <= 0) return pose;
  const joints = { ...pose.joints } as Record<Joint, Vec3>;
  const limit = 0.42;
  for (const [joint, share] of [['neck', 0.35], ['head', 0.65]] as const) {
    const current = joints[joint];
    const pull = Math.max(-limit, Math.min(limit, -current[1])) * strength * share;
    joints[joint] = [current[0], current[1] + pull, current[2]];
  }
  return { joints, offset: pose.offset };
}

/**
 * The whole frame, from the timeline and a clock.
 *
 * Pure: no state, no accumulation, so a seek and a play arrive at identical frames — the idle
 * layer and the footwork included, because both are functions of absolute time rather than of
 * anything that accumulates.
 *
 * The order of the layers is the design. Stance, then the action's claim over it, then
 * carry-over from the previous beat, then the idle that never stops, then the head finding the
 * opponent, and the feet solved onto the floor last so nothing above can slide them.
 */
export function sampleFrame(timeline: Timeline, time: number): Frame {
  const beat = beatAt(timeline, time);
  if (!beat) {
    return {
      time,
      a: { id: timeline.fighterA, pose: IDLE, position: [0, 0, -0.81], yaw: 0, legFreedom: 1, rest: 1, stagger: 0, feint: 0, fatigue: 0 },
      b: { id: timeline.fighterB, pose: IDLE, position: [0, 0, 0.81], yaw: Math.PI, legFreedom: 1, rest: 1, stagger: 0, feint: 0, fatigue: 0 },
      camera: 'WIDE',
      description: '',
      round: 1,
      roundTime: '05:00',
    };
  }

  const duration = Math.max(beat.end - beat.start, 0.001);
  const elapsed = time - beat.start;
  const u = elapsed / duration;

  let poses = posesForBeat(timeline, beat, time);

  // Take over from wherever the previous beat left the body, over a window that depends on
  // what kind of beat this is: an emergency reaction arrives faster than a decision.
  const previous = timeline.beats[beat.index - 1];
  if (previous && elapsed < beat.blend) {
    const tail = posesForBeat(timeline, previous, previous.end);
    const alpha = ease(elapsed / beat.blend);
    poses = {
      a: blendPoseShortest(tail.a, poses.a, alpha),
      b: blendPoseShortest(tail.b, poses.b, alpha),
      aRest: tail.aRest + (poses.aRest - tail.aRest) * alpha,
      bRest: tail.bRest + (poses.bRest - tail.bRest) * alpha,
      aLegs: tail.aLegs + (poses.aLegs - tail.aLegs) * alpha,
      bLegs: tail.bLegs + (poses.bLegs - tail.bLegs) * alpha,
    };
  }

  const stance = stanceAt(timeline, beat, u);

  const sides = [
    { pose: poses.a, rest: poses.aRest, legs: poses.aLegs, root: stance.a, yaw: stance.yawA, plan: timeline.footPlans[0] },
    { pose: poses.b, rest: poses.bRest, legs: poses.bLegs, root: stance.b, yaw: stance.yawB, plan: timeline.footPlans[1] },
  ] as const;

  const conditions = sides.map((side, index) => {
    const profile = timeline.profiles[index]!;
    // A fighter with an engine is barely into their work when one without is emptying out.
    const fatigue = fatigueForRound(beat.event.round, profile.engine);
    // Being hurt decays rather than ending with the clip, and composure shortens it.
    const stagger = beat.grounded
      ? 0
      : staggerAt(timeline.staggerHits[index]!, time) * (1 - profile.recovery * 0.45);
    // Feints only happen in the gaps, and only from someone inclined to throw them.
    const feint = beat.grounded ? 0 : feintAt(profile.deception, profile.phase, time) * side.rest;
    return { profile, fatigue, stagger, feint };
  });

  const finished = sides.map((side, index) => {
    const state = conditions[index]!;
    let pose = addLife(side.pose, {
      time,
      phase: state.profile.phase,
      intensity: side.rest,
      fatigue: state.fatigue,
      grounded: beat.grounded,
      guard: state.profile.guard,
      verve: state.profile.mobility,
      stagger: state.stagger,
      feint: state.feint,
    });
    pose = trackOpponent(pose, beat.grounded ? 0 : 0.55 * side.rest * (1 - state.stagger * 0.6));
    if (!beat.grounded) {
      pose = plantFeet(pose, side.root, side.yaw, side.plan, time, side.legs);
    }
    return pose;
  });

  /**
   * On the canvas the fighters are not side by side, they are stacked. The poses each assume
   * they are the only body in the scene, so the renderer lifts whoever is working — the actor
   * of a takedown or a ground strike is by definition the one on top — clear of the fighter
   * underneath.
   */
  const shared = beat.actorId === undefined;
  const actorIsA = shared ? true : beat.actorId === timeline.fighterA;
  const lift = beat.grounded && !shared ? 0.22 : 0;

  return {
    time,
    beat,
    a: {
      id: timeline.fighterA,
      pose: finished[0]!,
      position: [stance.a[0], actorIsA ? lift : 0, stance.a[2]],
      yaw: stance.yawA,
      legFreedom: poses.aLegs,
      rest: poses.aRest,
      stagger: conditions[0]!.stagger,
      feint: conditions[0]!.feint,
      fatigue: conditions[0]!.fatigue,
    },
    b: {
      id: timeline.fighterB,
      pose: finished[1]!,
      position: [stance.b[0], actorIsA ? 0 : lift, stance.b[2]],
      yaw: stance.yawB,
      legFreedom: poses.bLegs,
      rest: poses.bRest,
      stagger: conditions[1]!.stagger,
      feint: conditions[1]!.feint,
      fatigue: conditions[1]!.fatigue,
    },
    camera: beat.camera,
    description: beat.event.description,
    round: beat.event.round,
    roundTime: beat.event.roundTime,
  };
}
