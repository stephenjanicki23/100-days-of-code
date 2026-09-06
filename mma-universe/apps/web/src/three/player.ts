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
import { blendPose, resolvePose, sampleClip } from './blend.ts';
import type { Vec3 } from './rig.ts';

export type Pacing = 'CONDENSED' | 'REALTIME';

/** Held between condensed beats so consecutive strikes do not read as one motion. */
const CONDENSED_GAP = 0.1;
/** Minimum separation in realtime pacing; the engine can emit a combination on one second. */
const MIN_REALTIME_STEP = 0.09;
/** Time the last pose is held so a finish does not cut to black on the frame it lands. */
const TAIL = 1.5;

export interface TimelineBeat {
  readonly index: number;
  readonly start: number;
  readonly end: number;
  readonly event: FightEventWire;
  readonly clip: Clip;
  readonly camera: CameraHint;
  readonly position: FightPositionWire;
  readonly grounded: boolean;
  readonly spacing: number;
  /** Absolute time the reaction fires; the defender does nothing before it. */
  readonly impactAt: number;
  readonly reaction: Clip;
  /** Undefined when the beat belongs to nobody in particular, and both fighters play it. */
  readonly actorId?: string;
  readonly reactorId?: string;
  /** Lateral drift of the engagement, so a fight does not happen on one spot of canvas. */
  readonly centre: Vec3;
}

export interface Timeline {
  readonly beats: readonly TimelineBeat[];
  readonly duration: number;
  readonly fighterA: string;
  readonly fighterB: string;
  readonly pacing: Pacing;
}

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

function positionOf(beat: AnimationBeatWire): FightPositionWire {
  return beat.directive.targetState;
}

export function buildTimeline(
  source: readonly AnimationBeatWire[],
  fighterA: string,
  fighterB: string,
  pacing: Pacing = 'CONDENSED',
): Timeline {
  const ordered = [...source].sort((x, y) => x.event.sequence - y.event.sequence);
  const beats: TimelineBeat[] = [];
  let cursor = 0;

  for (const [index, entry] of ordered.entries()) {
    const { event, directive } = entry;
    const clip = resolveClip(directive.clip, directive.variant);
    const speed = directive.speed > 0 ? directive.speed : 1;
    const duration = clip.duration / speed;

    const start =
      pacing === 'REALTIME'
        ? Math.max(event.timestamp, cursor + MIN_REALTIME_STEP)
        : index === 0
          ? 0
          : cursor + CONDENSED_GAP;

    const position = positionOf(entry);
    beats.push({
      index,
      start,
      end: start + duration,
      event,
      clip,
      camera: isGrounded(position) && directive.camera === 'BROADCAST' ? 'GROUND_OVERHEAD' : directive.camera,
      position,
      grounded: isGrounded(position),
      spacing: spacingFor(position),
      impactAt: start + duration * clip.impactAt,
      reaction: REACTIONS[directive.reaction] ?? REACTIONS.NONE,
      actorId: directive.actorId,
      reactorId: directive.reactorId,
      centre: centreFor(event),
    });
    cursor = start + duration;
  }

  return { beats, duration: cursor + TAIL, fighterA, fighterB, pacing };
}

/* -------------------------------------------------------------------- sampling */

export interface FighterFrame {
  readonly id: string;
  readonly pose: ResolvedPose;
  /** World position of the fighter's root, on the canvas. */
  readonly position: Vec3;
  readonly yaw: number;
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

/**
 * The whole frame, from the timeline and a clock. Pure: no state, no accumulation, so a
 * seek and a play arrive at identical frames.
 */
export function sampleFrame(timeline: Timeline, time: number): Frame {
  const beat = beatAt(timeline, time);
  if (!beat) {
    return {
      time,
      a: { id: timeline.fighterA, pose: IDLE, position: [0, 0, -0.81], yaw: 0 },
      b: { id: timeline.fighterB, pose: IDLE, position: [0, 0, 0.81], yaw: Math.PI },
      camera: 'WIDE',
      description: '',
      round: 1,
      roundTime: '05:00',
    };
  }

  const elapsed = time - beat.start;
  const duration = Math.max(beat.end - beat.start, 0.001);
  const u = elapsed / duration;
  const shared = beat.actorId === undefined;

  const actorPose = sampleClip(beat.clip, u);
  const reactorPose = shared
    ? actorPose
    : reactionPose(beat, time);

  const half = beat.spacing / 2;
  const [cx, , cz] = beat.centre;

  const actorIsA = shared ? true : beat.actorId === timeline.fighterA;
  const aPose = actorIsA ? actorPose : reactorPose;
  const bPose = actorIsA ? reactorPose : actorPose;

  /**
   * On the canvas the fighters are not side by side, they are stacked. The poses each assume
   * they are the only body in the scene, so the renderer lifts whoever is working — the actor
   * of a takedown or a ground strike is by definition the one on top — clear of the fighter
   * underneath. Without it two bodies occupy the same half-metre and read as one.
   */
  const lift = beat.grounded && !shared ? 0.22 : 0;
  const aLift = actorIsA ? lift : 0;
  const bLift = actorIsA ? 0 : lift;

  return {
    time,
    beat,
    a: { id: timeline.fighterA, pose: aPose, position: [cx, aLift, cz - half], yaw: 0 },
    b: { id: timeline.fighterB, pose: bPose, position: [cx, bLift, cz + half], yaw: Math.PI },
    camera: beat.camera,
    description: beat.event.description,
    round: beat.event.round,
    roundTime: beat.event.roundTime,
  };
}

/**
 * The defender's pose. Before the strike lands they hold the position's rest pose; from the
 * impact they play the reaction, blending back out. Timing the reaction to the actor clip's
 * own `impactAt` rather than to the start of the beat is what keeps a head snapping back on
 * the frame the glove arrives instead of as the punch is thrown.
 */
function reactionPose(beat: TimelineBeat, time: number): ResolvedPose {
  const rest = resolvePose(restPose(beat.position, 'REACTOR'));
  if (time < beat.impactAt) return rest;

  const into = time - beat.impactAt;
  if (into >= beat.reaction.duration) return rest;
  const reacting = sampleClip(beat.reaction, into / beat.reaction.duration);
  // The reaction is authored from a standing stance; on the ground the rest pose dominates.
  return beat.grounded ? blendPose(rest, reacting, 0.35) : reacting;
}
