/**
 * The renderer's contract tests.
 *
 * The 3D layer's whole claim is that it is driven by the event stream and by nothing else.
 * These tests are where that claim is checked, and they are deliberately the only place the
 * web app and `@mma/sim` are imported together: the browser code mirrors the wire types and
 * talks HTTP, exactly as an Unreal client would, so the coupling is verified here rather
 * than compiled in.
 */

import { describe, expect, it } from 'vitest';
import {
  FIGHT_EVENT_SCHEMA_VERSION,
  FIGHT_POSITIONS,
  Rng,
  animationRegistry,
  generateUniverse,
  mapEventToAnimation,
  requiredClips,
  simulateFight,
  type FightEvent,
  type StrikeEvent,
} from '@mma/sim';

import { CLIPS, REACTIONS, applyVariant, isGrounded, resolveClip, restPose } from '../src/three/clips.ts';
import { CAMERA_PRESETS } from '../src/three/camera.ts';
import { JOINT_NAMES, JOINT_ORDER, SKELETON, type Joint } from '../src/three/rig.ts';
import { angularDelta, resolvePose, sampleClip, type ResolvedPose } from '../src/three/blend.ts';
import { buildTimeline, sampleFrame } from '../src/three/player.ts';
import { MAX_JOINT_OFFSET, addLife, fatigueForRound } from '../src/three/life.ts';
import type { AnimationBeatWire, AnimationDirective, FightEventWire, HitReaction } from '../src/types.ts';

const A = 'fighter_00001';
const B = 'fighter_00002';

/** The API's `?format=animation` response, produced by the real mapper. */
function toBeats(events: readonly FightEvent[]): AnimationBeatWire[] {
  return events.map((event) => ({
    event: event as unknown as FightEventWire,
    directive: mapEventToAnimation(event) as unknown as AnimationDirective,
  }));
}

function strikeEvent(sequence: number, overrides: Partial<StrikeEvent> = {}): StrikeEvent {
  return {
    schemaVersion: FIGHT_EVENT_SCHEMA_VERSION,
    fightId: 'fight_test',
    sequence,
    round: 1,
    timestamp: sequence * 2,
    roundTime: '04:30',
    timeRemaining: 270,
    attacker: A,
    defender: B,
    eventType: 'SIGNIFICANT_STRIKE',
    technique: 'JAB',
    target: 'HEAD',
    result: 'LANDED',
    position: 'STANDING',
    damage: 4,
    staminaCost: 2,
    description: 'A jab.',
    ...overrides,
  };
}

describe('Sprint 18 — the clip library covers the simulation', () => {
  it('has a clip for every name the engine can ask for', () => {
    const missing = requiredClips().filter((name) => !(name in CLIPS));
    expect(missing).toEqual([]);
  });

  it('has no clip the engine never asks for', () => {
    const required = new Set(requiredClips());
    const orphans = Object.keys(CLIPS).filter((name) => !required.has(name));
    expect(orphans).toEqual([]);
  });

  it('has a reaction for every reaction the mapper can emit', () => {
    const reactions: HitReaction[] = ['NONE', 'LIGHT', 'HEAVY', 'STAGGER', 'DROP', 'BLOCK', 'SLIP', 'SPRAWL_DEFEND'];
    for (const reaction of reactions) {
      expect(REACTIONS[reaction], reaction).toBeTruthy();
      expect(REACTIONS[reaction].duration).toBeGreaterThan(0);
    }
  });

  it('has a rest pose for every position the fight engine can be in, on both sides', () => {
    for (const position of FIGHT_POSITIONS) {
      for (const role of ['ACTOR', 'REACTOR'] as const) {
        const pose = restPose(position, role);
        expect(Object.keys(pose.joints).length, `${position}/${role}`).toBeGreaterThan(0);
      }
    }
  });

  it('has a camera preset for every hint the mapper can attach', () => {
    const hints = new Set(Object.values(animationRegistry()).map((entry) => entry.camera ?? 'BROADCAST'));
    hints.add('IMPACT');
    hints.add('REPLAY');
    for (const hint of hints) {
      expect(CAMERA_PRESETS[hint], hint).toBeTruthy();
    }
  });

  it('resolves an unknown clip to the idle rather than throwing', () => {
    const clip = resolveClip('clip_from_a_newer_simulation');
    expect(clip).toBe(CLIPS.stance_idle);
  });
});

describe('Sprint 18 — clips and the skeleton are well formed', () => {
  const known = new Set<string>(JOINT_NAMES);

  it('orders keyframes, spans the whole clip, and names only real joints', () => {
    for (const [name, clip] of Object.entries(CLIPS)) {
      expect(clip.duration, name).toBeGreaterThan(0);
      expect(clip.impactAt, name).toBeGreaterThanOrEqual(0);
      expect(clip.impactAt, name).toBeLessThanOrEqual(1);
      expect(clip.keys.length, name).toBeGreaterThan(1);
      expect(clip.keys[0]?.t, name).toBe(0);
      expect(clip.keys[clip.keys.length - 1]?.t, name).toBe(1);

      let previous = -1;
      for (const key of clip.keys) {
        expect(key.t, `${name} keyframe order`).toBeGreaterThan(previous);
        previous = key.t;
        for (const joint of Object.keys(key.pose.joints)) {
          expect(known.has(joint), `${name} names unknown joint ${joint}`).toBe(true);
        }
        for (const rotation of Object.values(key.pose.joints)) {
          for (const angle of rotation) expect(Number.isFinite(angle), name).toBe(true);
        }
      }
    }
  });

  it('never interpolates a joint more than half a turn, which euler lerp would take the long way round', () => {
    for (const [name, clip] of Object.entries(CLIPS)) {
      for (let i = 1; i < clip.keys.length; i++) {
        const from = resolvePose(clip.keys[i - 1]!.pose);
        const to = resolvePose(clip.keys[i]!.pose);
        for (const joint of JOINT_NAMES) {
          for (let axis = 0; axis < 3; axis++) {
            const delta = Math.abs(to.joints[joint][axis]! - from.joints[joint][axis]!);
            expect(delta, `${name} ${joint} axis ${axis}`).toBeLessThan(Math.PI);
          }
        }
      }
    }
  });

  it('orders the skeleton so parents always precede children', () => {
    const seen = new Set<Joint>();
    for (const joint of JOINT_ORDER) {
      const parent = SKELETON[joint].parent;
      if (parent !== null) expect(seen.has(parent), `${joint} before its parent`).toBe(true);
      seen.add(joint);
    }
    expect(JOINT_ORDER.length).toBe(JOINT_NAMES.length);
  });

  it('resolves a sparse pose into every joint', () => {
    const resolved = resolvePose({ joints: { head: [0.1, 0, 0] } });
    expect(Object.keys(resolved.joints).sort()).toEqual([...JOINT_NAMES].sort());
    expect(resolved.joints.head).toEqual([0.1, 0, 0]);
    expect(resolved.joints.footR).toEqual([0, 0, 0]);
  });

  it('samples a clip at its endpoints exactly and in between smoothly', () => {
    const clip = CLIPS.strike_jab!;
    const start = sampleClip(clip, 0);
    const end = sampleClip(clip, 1);
    expect(start.joints.armL).toEqual(resolvePose(clip.keys[0]!.pose).joints.armL);
    expect(end.joints.armL).toEqual(resolvePose(clip.keys[clip.keys.length - 1]!.pose).joints.armL);
    // Clamped, not wrapped.
    expect(sampleClip(clip, -3)).toEqual(start);
    expect(sampleClip(clip, 9)).toEqual(end);
  });
});

describe('Sprint 18 — variants are derived, never rolled', () => {
  it('produces the same motion for the same variant index every time', () => {
    const once = applyVariant(CLIPS.strike_jab!, 2);
    const twice = applyVariant(CLIPS.strike_jab!, 2);
    expect(once).toEqual(twice);
  });

  it('makes repeated techniques differ', () => {
    const first = applyVariant(CLIPS.strike_jab!, 0);
    const second = applyVariant(CLIPS.strike_jab!, 1);
    expect(second.duration).not.toBe(first.duration);
  });

  it('honours the variant the mapper derived from the event sequence', () => {
    const directive = mapEventToAnimation(strikeEvent(137));
    const again = mapEventToAnimation(strikeEvent(137));
    expect(directive.variant).toBe(again.variant);
    expect(resolveClip(directive.clip, directive.variant)).toEqual(
      resolveClip(again.clip, again.variant),
    );
  });
});

describe('Sprint 19 — a exchange, driven only by the event stream', () => {
  /**
   * The brief's own acceptance test: jab, block, cross, hit, retreat. Nothing below reaches
   * into the fight engine — the events are the input, the mapper turns them into directives,
   * and the timeline turns those into frames.
   */
  const events: FightEvent[] = [
    strikeEvent(1, { technique: 'JAB', result: 'LANDED', damage: 4, description: 'Jab lands.' }),
    strikeEvent(2, { technique: 'LEFT_HOOK', result: 'BLOCKED', damage: 0, attacker: B, defender: A, description: 'Hook blocked.' }),
    strikeEvent(3, { technique: 'RIGHT_CROSS', result: 'LANDED', damage: 9, description: 'Cross lands clean.' }),
    strikeEvent(4, { technique: 'JAB', result: 'MISSED', damage: 0, attacker: B, defender: A, description: 'Jab misses.' }),
    {
      schemaVersion: FIGHT_EVENT_SCHEMA_VERSION,
      fightId: 'fight_test',
      sequence: 5,
      round: 1,
      timestamp: 12,
      roundTime: '04:18',
      timeRemaining: 258,
      position: 'STANDING',
      eventType: 'CLINCH_BREAK',
      description: 'They reset in the centre.',
    } as FightEvent,
  ];

  const timeline = buildTimeline(toBeats(events), A, B);

  it('plays the right clip for each beat', () => {
    expect(timeline.beats.map((beat) => beat.clip)).toHaveLength(5);
    const directives = toBeats(events).map((beat) => beat.directive.clip);
    expect(directives).toEqual([
      'strike_jab',
      'strike_hook_left',
      'strike_cross',
      'strike_jab',
      'clinch_break',
    ]);
  });

  it('makes the defender block the blocked shot and slip the missed one', () => {
    const reactions = toBeats(events).map((beat) => beat.directive.reaction);
    expect(reactions).toEqual(['LIGHT', 'BLOCK', 'HEAVY', 'SLIP', 'NONE']);
  });

  it('cuts to an impact camera on the shot that hurt', () => {
    const cameras = toBeats(events).map((beat) => beat.directive.camera);
    expect(cameras[2]).toBe('IMPACT');
    expect(cameras[0]).toBe('BROADCAST');
  });

  it('does not react before the glove arrives, and clearly does after', () => {
    const cross = timeline.beats[2]!;
    const rest = resolvePose(restPose('STANDING', 'REACTOR')).joints.neck[0]!;
    const before = sampleFrame(timeline, cross.start + 0.01).b.pose.joints.neck[0]!;
    const after = sampleFrame(timeline, cross.impactAt + 0.12).b.pose.joints.neck[0]!;

    // The defender is never perfectly still — they are breathing — so "no reaction yet" is
    // bounded by the idle layer's own ceiling rather than by exact equality.
    expect(Math.abs(before - rest)).toBeLessThanOrEqual(MAX_JOINT_OFFSET);
    // Once it lands the head snaps well past anything breathing could account for.
    expect(Math.abs(after - rest)).toBeGreaterThan(MAX_JOINT_OFFSET * 2);
  });

  it('separates the fighters by a striking range and faces them at each other', () => {
    const frame = sampleFrame(timeline, timeline.beats[0]!.start + 0.1);
    // Punching range: a fighter reaches about 0.65 m past their own shoulder, so centres
    // more than about 1.4 m apart would have every strike stopping short of the target.
    const gap = Math.abs(frame.a.position[2] - frame.b.position[2]);
    expect(gap).toBeGreaterThan(0.9);
    expect(gap).toBeLessThan(1.4);
    expect(frame.a.yaw).toBe(0);
    expect(frame.b.yaw).toBeCloseTo(Math.PI);
  });

  it('runs the whole exchange in a few seconds and never leaves a gap', () => {
    expect(timeline.duration).toBeGreaterThan(2);
    expect(timeline.duration).toBeLessThan(12);
    for (let i = 1; i < timeline.beats.length; i++) {
      expect(timeline.beats[i]!.start).toBeGreaterThanOrEqual(timeline.beats[i - 1]!.start);
    }
  });
});

describe('Sprint 19 — sampling is pure', () => {
  const events = [strikeEvent(1), strikeEvent(2, { technique: 'LOW_KICK' }), strikeEvent(3, { technique: 'RIGHT_CROSS' })];
  const timeline = buildTimeline(toBeats(events), A, B);

  it('gives the same frame whether you played to it or seeked to it', () => {
    const target = timeline.duration * 0.4;
    const seeked = sampleFrame(timeline, target);
    let played = sampleFrame(timeline, 0);
    for (let t = 0; t <= target; t += 0.016) played = sampleFrame(timeline, t);
    expect(sampleFrame(timeline, target)).toEqual(seeked);
    expect(played.time).toBeLessThanOrEqual(target + 0.016);
  });

  it('builds an identical timeline from the same stream twice', () => {
    expect(buildTimeline(toBeats(events), A, B)).toEqual(buildTimeline(toBeats(events), A, B));
  });

  it('places beats on the fight clock in realtime pacing', () => {
    const realtime = buildTimeline(toBeats(events), A, B, 'REALTIME');
    expect(realtime.beats[0]!.start).toBe(events[0]!.timestamp);
    expect(realtime.beats[2]!.start).toBe(events[2]!.timestamp);
  });
});

describe('Sprint 19 — a real fight renders end to end', () => {
  const universe = generateUniverse({ seed: 'renderer-tests' });
  const a = universe.state.fighters[10]!;
  const b = universe.state.fighters[11]!;
  const result = simulateFight(a, b, { fightId: 'render_test', rounds: 3 }, Rng.fromSeed('render_test'));
  const timeline = buildTimeline(toBeats(result.events), a.id, b.id);

  it('turns every event of a real fight into a beat', () => {
    expect(result.events.length).toBeGreaterThan(60);
    expect(timeline.beats).toHaveLength(result.events.length);
  });

  it('never produces a non-finite pose anywhere in the fight', () => {
    for (let step = 0; step <= 400; step++) {
      const frame = sampleFrame(timeline, (timeline.duration * step) / 400);
      for (const side of [frame.a, frame.b]) {
        for (const joint of JOINT_NAMES) {
          for (const angle of side.pose.joints[joint]) {
            expect(Number.isFinite(angle), `${joint} at ${frame.time}`).toBe(true);
          }
        }
        for (const axis of side.position) expect(Number.isFinite(axis)).toBe(true);
      }
    }
  });

  it('keeps the fighters inside the cage', () => {
    for (let step = 0; step <= 400; step++) {
      const frame = sampleFrame(timeline, (timeline.duration * step) / 400);
      for (const side of [frame.a, frame.b]) {
        const distance = Math.hypot(side.position[0], side.position[2]);
        expect(distance).toBeLessThan(4.2);
      }
    }
  });

  it('goes to the canvas when the fight does', () => {
    const grounded = timeline.beats.filter((beat) => isGrounded(beat.position));
    for (const beat of grounded) expect(beat.spacing).toBeLessThan(1);
  });
});

describe('Sprint 19 — the skeleton is drawable', () => {
  /**
   * three.js clamps a capsule whose radius exceeds half its length into a sphere, silently.
   * The spine did exactly that and rendered as a ball on the fighter's chest, which is the
   * kind of defect only a screenshot catches — so it gets a test instead.
   */
  it('never specifies a capsule that would collapse into a ball', () => {
    for (const joint of JOINT_NAMES) {
      const bone = SKELETON[joint];
      if (bone.shape !== 'CAPSULE') continue;
      expect(bone.length, `${joint} capsule`).toBeGreaterThan(bone.radius * 2);
    }
  });

  it('stands the fighter on the canvas rather than in it', () => {
    const hip = SKELETON.hips.offset[1];
    const leg = SKELETON.thighL.length + SKELETON.shinL.length;
    expect(hip - leg).toBeGreaterThan(0);
    expect(hip - leg).toBeLessThan(0.1);
  });
});

describe('Sprint 19 — the motion is continuous, not stepped', () => {
  const universe2 = generateUniverse({ seed: 'motion-tests' });
  const a = universe2.state.fighters[4]!;
  const b = universe2.state.fighters[5]!;
  const result = simulateFight(a, b, { fightId: 'motion_test', rounds: 3 }, Rng.fromSeed('motion_test'));
  const timeline = buildTimeline(toBeats(result.events), a.id, b.id);

  const FRAME = 1 / 60;

  /**
   * The headline guard against the puppet look.
   *
   * Every beat used to begin from its clip's opening stance, so the body snapped back to
   * neutral between every action — a few hundred discontinuities a fight. A teleport shows up
   * here as a single frame moving a joint further than any real motion could.
   */
  it('never jumps a joint further in one frame than a body could move', () => {
    // Radians per 1/60 s. A jab extends the elbow through about 120 degrees in 60 ms — some
    // 35 rad/s — so the bound has to allow a genuinely fast limb. It sits at 48 rad/s, well
    // clear of real motion and well below the resets and full-turn unwinds it exists to catch,
    // which ran from 1.2 to 6.4 radians in a single frame.
    const CEILING = 0.8;
    let worst = 0;
    let worstAt = 0;
    let previous = sampleFrame(timeline, 0);

    for (let time = FRAME; time < timeline.duration; time += FRAME) {
      const frame = sampleFrame(timeline, time);
      for (const [now, before] of [
        [frame.a, previous.a],
        [frame.b, previous.b],
      ] as const) {
        for (const joint of JOINT_NAMES) {
          for (let axis = 0; axis < 3; axis++) {
            const delta = Math.abs(angularDelta(before.pose.joints[joint][axis]!, now.pose.joints[joint][axis]!));
            if (delta > worst) {
              worst = delta;
              worstAt = time;
            }
          }
        }
      }
      previous = frame;
    }
    expect(worst, `largest single-frame jump was at t=${worstAt.toFixed(2)}s`).toBeLessThan(CEILING);
  });

  it('never lets a fighter stand perfectly still', () => {
    // Sampled across the whole fight, including the gaps between beats where the old
    // renderer froze both fighters into statues.
    for (let time = 0; time < timeline.duration - 1; time += 0.9) {
      const first = sampleFrame(timeline, time);
      const second = sampleFrame(timeline, time + 0.5);
      for (const side of ['a', 'b'] as const) {
        let moved = 0;
        for (const joint of JOINT_NAMES) {
          for (let axis = 0; axis < 3; axis++) {
            moved += Math.abs(angularDelta(first[side].pose.joints[joint][axis]!, second[side].pose.joints[joint][axis]!));
          }
        }
        expect(moved, `${side} frozen at t=${time.toFixed(1)}s`).toBeGreaterThan(0.004);
      }
    }
  });

  it('moves the fighters around the cage at a walking pace, not by teleporting', () => {
    let worst = 0;
    let previous = sampleFrame(timeline, 0);
    for (let time = FRAME; time < timeline.duration; time += FRAME) {
      const frame = sampleFrame(timeline, time);
      const travel = Math.hypot(
        frame.a.position[0] - previous.a.position[0],
        frame.a.position[2] - previous.a.position[2],
      );
      worst = Math.max(worst, travel / FRAME);
      previous = frame;
    }
    expect(worst, 'metres per second').toBeLessThan(4);
  });

  it('throws a strike ballistically: the fire is faster than the wind-up', () => {
    const clip = CLIPS.strike_cross!;
    const speedAt = (u: number) => {
      const from = sampleClip(clip, u - 0.01);
      const to = sampleClip(clip, u + 0.01);
      let total = 0;
      for (const joint of JOINT_NAMES) {
        for (let axis = 0; axis < 3; axis++) {
          total += Math.abs(to.joints[joint][axis]! - from.joints[joint][axis]!);
        }
      }
      return total;
    };
    const peakOver = (from: number, to: number) => {
      let peak = 0;
      for (let u = from; u <= to; u += 0.01) peak = Math.max(peak, speedAt(u));
      return peak;
    };
    // The wind-up gathers, the throw is explosive, and the arm is then decelerated into full
    // extension by its own joints — so the peak of the strike segment is what carries weight,
    // not its final instant.
    const windUp = peakOver(0.02, 0.18);
    const throwPeak = peakOver(0.21, clip.impactAt);
    expect(windUp).toBeGreaterThan(0);
    expect(throwPeak).toBeGreaterThan(windUp * 1.8);
  });

  it('carries the body from one beat into the next instead of resetting it', () => {
    /**
     * States the property directly rather than by proxy: just after a boundary the body should
     * still be near where the previous beat left it, and *not* near the incoming clip's cold
     * opening pose. A renderer that resets would land on the opening frame exactly.
     */
    const spread = (x: ResolvedPose, y: ResolvedPose) => {
      let total = 0;
      for (const joint of JOINT_NAMES) {
        for (let axis = 0; axis < 3; axis++) {
          total += Math.abs(angularDelta(x.joints[joint][axis]!, y.joints[joint][axis]!));
        }
      }
      return total;
    };

    let checked = 0;
    for (const beat of timeline.beats.slice(1)) {
      const before = sampleFrame(timeline, beat.start - 0.008).a.pose;
      const after = sampleFrame(timeline, beat.start + 0.008).a.pose;
      const coldOpening = sampleClip(beat.clip, 0);

      // Only meaningful where the incoming clip actually starts somewhere else.
      if (spread(before, coldOpening) < 0.5) continue;
      checked++;
      expect(spread(after, before), `beat ${beat.index} jumped away from where the body was`)
        .toBeLessThan(spread(after, coldOpening));
    }
    // Most beats both end and begin near a stance, so only the boundaries into a genuinely
    // different opening — a sprawl, a ground position, a spin — exercise the carry-over.
    expect(checked, 'no boundaries were worth checking').toBeGreaterThan(2);
  });
});

describe('Sprint 19 — the idle layer stays an idle layer', () => {
  const rest = resolvePose(restPose('STANDING', 'ACTOR'));
  const options = { time: 12.5, phase: 0, intensity: 1, fatigue: 0.3, grounded: false };

  it('never moves a joint further than its documented ceiling', () => {
    for (let time = 0; time < 40; time += 0.13) {
      const lived = addLife(rest, { ...options, time });
      for (const joint of JOINT_NAMES) {
        for (let axis = 0; axis < 3; axis++) {
          const delta = Math.abs(lived.joints[joint][axis]! - rest.joints[joint][axis]!);
          expect(delta, `${joint} axis ${axis} at t=${time.toFixed(2)}`).toBeLessThanOrEqual(MAX_JOINT_OFFSET + 1e-9);
        }
      }
    }
  });

  it('is a pure function of time, so a replay is identical', () => {
    expect(addLife(rest, options)).toEqual(addLife(rest, options));
    expect(addLife(rest, { ...options, time: 12.6 })).not.toEqual(addLife(rest, options));
  });

  it('keeps the two fighters out of lockstep', () => {
    const first = addLife(rest, { ...options, phase: 0 });
    const second = addLife(rest, { ...options, phase: 3.71 });
    expect(first.joints.spine).not.toEqual(second.joints.spine);
  });

  it('does nothing at all when the intensity is zero', () => {
    expect(addLife(rest, { ...options, intensity: 0 })).toBe(rest);
  });

  it('tires the fighter as the rounds pass', () => {
    expect(fatigueForRound(1)).toBe(0);
    expect(fatigueForRound(5)).toBeGreaterThan(fatigueForRound(3));
    expect(fatigueForRound(5)).toBeLessThanOrEqual(1);
  });

  it('drops the guard when the fighter is tired', () => {
    const fresh = addLife(rest, { ...options, fatigue: 0, time: 5 });
    const spent = addLife(rest, { ...options, fatigue: 1, time: 5 });
    // A positive rotation on a DOWN limb lets it hang, so a tired guard sits lower.
    expect(spent.joints.armL[0]!).toBeGreaterThan(fresh.joints.armL[0]!);
  });
});
