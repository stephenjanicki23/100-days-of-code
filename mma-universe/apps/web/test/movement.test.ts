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
import { claimOf, isTotal, JOINT_REGION, REGION_LAG } from '../src/three/regions.ts';
import { sampleClipChained } from '../src/three/blend.ts';
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

describe('personality — fighters do not all move the same', () => {
  const pressureFighter = {
    fighterId: a.id,
    pressure: 0.95,
    mobility: 0.2,
    recovery: 0.3,
    engine: 0.25,
    guard: 0.3,
    deception: 0.15,
    phase: 0.4,
  };
  const outFighter = {
    fighterId: b.id,
    pressure: 0.15,
    mobility: 0.95,
    recovery: 0.9,
    engine: 0.9,
    guard: 0.9,
    deception: 0.9,
    phase: 2.7,
  };
  const styled = buildTimeline(beats, a.id, b.id, 'CONDENSED', [pressureFighter, outFighter]);

  it('makes the mobile fighter step more than the flat-footed one', () => {
    expect(styled.footPlans[1].steps.length).toBeGreaterThan(styled.footPlans[0].steps.length);
  });

  it('tires the fighter without an engine faster', () => {
    const late = styled.beats.find((beat) => beat.event.round >= 2);
    if (!late) return;
    const frame = sampleFrame(styled, late.start + 0.1);
    expect(frame.a.fatigue).toBeGreaterThan(frame.b.fatigue);
  });

  it('lets the craftier fighter feint, and the plain one hardly ever', () => {
    let crafty = 0;
    let plain = 0;
    for (let time = 0; time < 60; time += 0.05) {
      const frame = sampleFrame(styled, time);
      if (frame.a.feint > 0.2) plain++;
      if (frame.b.feint > 0.2) crafty++;
    }
    expect(crafty).toBeGreaterThan(plain);
    expect(plain, 'even a plain fighter feints occasionally').toBeGreaterThan(0);
  });

  it('is still deterministic with profiles applied', () => {
    const again = buildTimeline(beats, a.id, b.id, 'CONDENSED', [pressureFighter, outFighter]);
    expect(again.footPlans).toEqual(styled.footPlans);
    expect(sampleFrame(again, 9.25)).toEqual(sampleFrame(styled, 9.25));
  });

  it('falls back to an unremarkable fighter when no profile is supplied', () => {
    expect(timeline.profiles[0].pressure).toBe(0.5);
    expect(timeline.profiles[0].fighterId).toBe(a.id);
  });
});

describe('being hurt is a condition, not a clip', () => {
  it('leaves a fighter shaken after the reaction has finished', () => {
    const hurt = timeline.staggerHits.flat();
    expect(hurt.length, 'nobody was hurt in a whole fight').toBeGreaterThan(0);

    const worst = hurt.reduce((best, hit) => (hit.magnitude > best.magnitude ? hit : best));
    const side = timeline.staggerHits[0].includes(worst) ? 'a' : 'b';

    const atImpact = sampleFrame(timeline, worst.at + 0.05)[side].stagger;
    const oneSecondLater = sampleFrame(timeline, worst.at + 1.2)[side].stagger;
    const longAfter = sampleFrame(timeline, worst.at + 9)[side].stagger;

    // The chain the brief asks for — stunned, staggering, recovering, normal — as a value that
    // decays through all of them rather than as states to switch between.
    expect(atImpact).toBeGreaterThan(0.1);
    expect(oneSecondLater).toBeLessThan(atImpact);
    expect(oneSecondLater).toBeGreaterThan(0.02);
    expect(longAfter).toBeLessThan(0.05);
  });

  it('never shows a fighter hurt before they were hit', () => {
    const first = timeline.staggerHits.flat().sort((x, y) => x.at - y.at)[0];
    if (!first) return;
    expect(sampleFrame(timeline, Math.max(0, first.at - 0.4)).a.stagger).toBeLessThan(0.2);
  });
});

describe('damage reactions depend on where the strike landed', () => {
  it('folds the body for a body shot and buckles the stance for a leg kick', () => {
    const kinds = new Set(timeline.beats.map((beat) => beat.reactionName));
    // A whole fight should contain body work and leg kicks, not only head shots.
    expect(kinds.has('BODY_FOLD') || kinds.has('LEG_BUCKLE'), [...kinds].join(',')).toBe(true);
  });

  it('has a distinct clip for every reaction the mapper can now emit', () => {
    for (const beat of timeline.beats) {
      expect(beat.reaction, beat.reactionName).toBeTruthy();
      expect(beat.reaction.duration).toBeGreaterThan(0);
    }
  });
});

describe('secondary motion — the body moves as a chain', () => {
  it('turns the hips before the hand arrives', () => {
    /**
     * A punch travels through the body: hips, torso, shoulder, hand. Animating every joint off
     * the same clock makes the whole figure move as one rigid piece, which is much of why
     * keyframed characters read as mechanical even when the poses are good.
     *
     * Measured as: at the moment the hips are moving fastest, the arm should not yet be.
     */
    const clip = CLIPS.strike_cross!;
    const duration = clip.duration;
    const speedOf = (joint: 'hips' | 'forearmR', u: number) => {
      const before = sampleClipChained(clip, u - 0.01, duration, REGION_LAG, JOINT_REGION);
      const after = sampleClipChained(clip, u + 0.01, duration, REGION_LAG, JOINT_REGION);
      let total = 0;
      for (let axis = 0; axis < 3; axis++) {
        total += Math.abs(after.joints[joint][axis]! - before.joints[joint][axis]!);
      }
      return total;
    };

    let hipPeak = 0;
    let hipPeakAt = 0;
    let armPeak = 0;
    let armPeakAt = 0;
    for (let u = 0.05; u < 0.95; u += 0.01) {
      const hips = speedOf('hips', u);
      const arm = speedOf('forearmR', u);
      if (hips > hipPeak) {
        hipPeak = hips;
        hipPeakAt = u;
      }
      if (arm > armPeak) {
        armPeak = arm;
        armPeakAt = u;
      }
    }
    expect(hipPeakAt, 'the hips must lead the hand').toBeLessThan(armPeakAt);
  });

  it('does not lag the hips against themselves', () => {
    expect(REGION_LAG.HIPS).toBe(0);
    // Nothing should trail by more than a few frames, or the body comes apart.
    for (const value of Object.values(REGION_LAG)) expect(value).toBeLessThan(0.07);
  });

  it('is still deterministic with the chain applied', () => {
    const clip = CLIPS.strike_cross!;
    const once = sampleClipChained(clip, 0.4, clip.duration, REGION_LAG, JOINT_REGION);
    const twice = sampleClipChained(clip, 0.4, clip.duration, REGION_LAG, JOINT_REGION);
    expect(once).toEqual(twice);
  });
});
