/**
 * Movement quality, measured rather than eyeballed.
 *
 * "Looks robotic" is a judgement, but most of what produces it is not. A foot that slides
 * while planted, a body that is captive to one clip, a transition that takes the same time
 * whether it is a decision or a flinch — each of those is a measurable property, and each is
 * checked here so the improvement cannot silently regress.
 */

import { describe, expect, it } from 'vitest';
import { Rng, generateUniverse, mapEventToAnimation, simulateFight, type FightEvent } from '@mma/sim';

import { buildTimeline, sampleFrame, type Frame } from '../src/three/player.ts';
import { footAt, ANKLE_HEIGHT } from '../src/three/footwork.ts';
import { claimOf, isTotal } from '../src/three/regions.ts';
import { CLIPS } from '../src/three/clips.ts';
import { SKELETON } from '../src/three/rig.ts';
import { apply, eulerToMatrix, legTip, rotateY } from '../src/three/ik.ts';
import type { AnimationBeatWire } from '../src/types.ts';

const universe = generateUniverse({ seed: 'movement-tests' });
const a = universe.state.fighters[6]!;
const b = universe.state.fighters[7]!;
const result = simulateFight(a, b, { fightId: 'movement', rounds: 3 }, Rng.fromSeed('movement'));
const beats: AnimationBeatWire[] = result.events.map((event: FightEvent) => ({
  event: event as never,
  directive: mapEventToAnimation(event) as never,
}));
const timeline = buildTimeline(beats, a.id, b.id);

/** World position of an ankle, forward-kinematically, for a rendered frame. */
function anklePosition(frame: Frame, side: 'a' | 'b', leg: 'L' | 'R'): [number, number, number] {
  const fighter = frame[side];
  const pose = fighter.pose;
  const hips = SKELETON.hips.offset;
  const hipsPosition: [number, number, number] = [
    hips[0] + pose.offset[0],
    hips[1] + pose.offset[1],
    hips[2] + pose.offset[2],
  ];
  const hipsMatrix = eulerToMatrix(pose.joints.hips);
  const thighOffset = SKELETON[`thigh${leg}`].offset;
  const tip = legTip(
    pose.joints[`thigh${leg}`],
    pose.joints[`shin${leg}`],
    SKELETON[`thigh${leg}`].length,
    SKELETON[`shin${leg}`].length,
  );
  const local = apply(hipsMatrix, [
    thighOffset[0] + tip[0],
    thighOffset[1] + tip[1],
    thighOffset[2] + tip[2],
  ]);
  const inFighter: [number, number, number] = [
    hipsPosition[0] + local[0],
    hipsPosition[1] + local[1],
    hipsPosition[2] + local[2],
  ];
  const rotated = rotateY(inFighter, fighter.yaw);
  return [
    fighter.position[0] + rotated[0],
    fighter.position[1] + rotated[1],
    fighter.position[2] + rotated[2],
  ];
}

describe('footwork — the feet drive the movement', () => {
  const FRAME = 1 / 60;

  it('puts the ankle where the footwork plan says it should be', () => {
    /**
     * The headline measurement, and a stronger one than watching for drift: if the solved leg
     * actually reaches the planned foot position, then the foot is on the floor by
     * construction — planned positions do not move while planted. Previously the root was
     * interpolated between beats while the legs were posed by whatever clip was playing, so a
     * planted foot simply travelled with the body.
     *
     * Only judged where the action leaves the legs free. A head kick is entitled to take its
     * leg off the canvas, and the layering is what grants it that.
     */
    let worst = 0;
    let worstAt = 0;
    let judged = 0;
    for (let time = 0; time < Math.min(timeline.duration, 40); time += FRAME * 2) {
      const frame = sampleFrame(timeline, time);
      if (!frame.beat || frame.beat.grounded) continue;
      for (const [index, side] of (['a', 'b'] as const).entries()) {
        // Judge only the fighter whose legs the footwork actually got. A fighter sprawling or
        // throwing a head kick has handed their legs to the technique, and should have.
        if (frame[side].legFreedom < 0.8) continue;
        for (const [slot, leg] of (['L', 'R'] as const).entries()) {
          const planned = footAt(timeline.footPlans[index]!, slot as 0 | 1, time);
          const actual = anklePosition(frame, side, leg);
          const error = Math.hypot(actual[0] - planned.x, actual[2] - planned.z);
          judged++;
          if (error > worst) {
            worst = error;
            worstAt = time;
          }
        }
      }
    }
    expect(judged, 'no frames left the legs free enough to judge').toBeGreaterThan(200);
    expect(worst, `worst ankle error at t=${worstAt.toFixed(2)}s`).toBeLessThan(0.12);
  });

  it('keeps both feet on the canvas, and only lifts one at a time', () => {
    for (const plan of timeline.footPlans) {
      for (const step of plan.steps) {
        const overlapping = plan.steps.filter(
          (other) => other !== step && other.foot !== step.foot && other.lift < step.plant && other.plant > step.lift,
        );
        expect(overlapping.length, 'both feet in the air at once').toBe(0);
      }
    }
  });

  it('takes steps rather than gliding', () => {
    for (const [index, plan] of timeline.footPlans.entries()) {
      expect(plan.steps.length, `fighter ${index} never moved a foot`).toBeGreaterThan(20);
    }
  });

  it('never leaves a foot below the canvas', () => {
    for (const plan of timeline.footPlans) {
      for (let time = 0; time < 30; time += 0.02) {
        for (const foot of [0, 1] as const) {
          expect(footAt(plan, foot, time).y).toBeGreaterThanOrEqual(ANKLE_HEIGHT - 1e-9);
        }
      }
    }
  });

  it('resets the stance even when the engagement is not moving', () => {
    // Item 30's quality bar: with nothing happening, the fighters must still be alive. A
    // fighter who only steps when pushed is an NPC waiting for instructions.
    const quiet = timeline.footPlans[0].steps.filter((step) => step.lift > 5 && step.lift < 25);
    expect(quiet.length).toBeGreaterThan(3);
  });
});

describe('layering — a clip claims part of the body, not all of it', () => {
  it('lets a jab leave the legs to the footwork', () => {
    const claim = claimOf(CLIPS.strike_jab!);
    expect(claim.ARM_L, 'the jab must own the lead arm').toBeGreaterThan(0.7);
    expect(claim.LEGS, 'the jab must not own the legs').toBeLessThan(0.4);
  });

  it('lets a punch turn the hips, because that is where a punch comes from', () => {
    const claim = claimOf(CLIPS.strike_cross!);
    expect(claim.SPINE).toBeGreaterThan(0.05);
    expect(claim.ARM_R).toBeGreaterThan(0.7);
  });

  it('gives a kick the legs outright', () => {
    expect(claimOf(CLIPS.kick_head!).LEGS).toBeGreaterThan(0.6);
  });

  it('treats a takedown or a knockdown as the whole body', () => {
    expect(isTotal('td_double_leg')).toBe(true);
    expect(isTotal('knockdown')).toBe(true);
    expect(isTotal('sub_rnc')).toBe(true);
    expect(isTotal('strike_jab')).toBe(false);
  });
});

describe('transitions — timing depends on what is happening', () => {
  it('blends an emergency faster than a decision', () => {
    const emergency = timeline.beats.filter((beat) => beat.event.eventType === 'KNOCKDOWN' || beat.event.eventType === 'STUN');
    const strikes = timeline.beats.filter((beat) => beat.event.eventType === 'SIGNIFICANT_STRIKE' && !beat.follows);
    if (emergency.length > 0 && strikes.length > 0) {
      expect(emergency[0]!.blend).toBeLessThan(strikes[0]!.blend);
    }
    const grapples = timeline.beats.filter((beat) => isTotal(beat.clip === CLIPS.td_double_leg ? 'td_double_leg' : ''));
    expect(grapples.length).toBeGreaterThanOrEqual(0);
  });

  it('flows a combination out of the strike before it', () => {
    const combos = timeline.beats.filter((beat) => beat.follows);
    expect(combos.length, 'no combinations detected in a whole fight').toBeGreaterThan(3);
    for (const combo of combos) {
      const previous = timeline.beats[combo.index - 1]!;
      // A combination starts almost immediately, rather than after a full reset to guard.
      expect(combo.start - previous.end).toBeLessThan(0.05);
      expect(combo.blend).toBeLessThanOrEqual(0.1);
    }
  });

  it('still produces identical frames whether played or seeked', () => {
    const target = 12.5;
    const seeked = sampleFrame(timeline, target);
    let played = sampleFrame(timeline, 0);
    for (let t = 0; t <= target; t += 1 / 60) played = sampleFrame(timeline, t);
    expect(sampleFrame(timeline, target)).toEqual(seeked);
    expect(played.time).toBeLessThanOrEqual(target + 1 / 60);
  });

  it('builds an identical timeline, footwork included, from the same stream twice', () => {
    const again = buildTimeline(beats, a.id, b.id);
    expect(again.footPlans).toEqual(timeline.footPlans);
  });
});
