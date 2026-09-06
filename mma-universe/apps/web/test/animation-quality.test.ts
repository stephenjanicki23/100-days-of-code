/**
 * The animation quality bar (brief §29, §30), run over every test scene.
 *
 * The brief's bar is: pause the simulation entirely and the fighters should still look alive —
 * balancing, watching each other, preparing — rather than like an NPC waiting for
 * instructions. That is a judgement, but the things that make it false are not, and each of
 * them is checked here across all ten scenes rather than only inside one real fight.
 */

import { describe, expect, it } from 'vitest';
import { buildScene, SCENE_FIGHTERS, SCENE_NAMES } from '../src/three/scenes.ts';
import { buildTimeline, sampleFrame } from '../src/three/player.ts';
import { angularDelta } from '../src/three/blend.ts';
import { JOINT_NAMES } from '../src/three/rig.ts';

const FRAME = 1 / 60;

function timelineFor(name: string) {
  return buildTimeline(buildScene(name), SCENE_FIGHTERS.a, SCENE_FIGHTERS.b);
}

describe.each(SCENE_NAMES)('scene: %s', (name) => {
  const timeline = timelineFor(name);

  it('never freezes a fighter', () => {
    // §2 and §30. Over any second of the scene, both fighters must have moved.
    for (let time = 0; time < timeline.duration - 1; time += 0.7) {
      const first = sampleFrame(timeline, time);
      const second = sampleFrame(timeline, time + 0.6);
      for (const side of ['a', 'b'] as const) {
        let moved = 0;
        for (const joint of JOINT_NAMES) {
          for (let axis = 0; axis < 3; axis++) {
            moved += Math.abs(
              angularDelta(first[side].pose.joints[joint][axis]!, second[side].pose.joints[joint][axis]!),
            );
          }
        }
        expect(moved, `${side} frozen at t=${time.toFixed(1)}`).toBeGreaterThan(0.004);
      }
    }
  });

  it('never jumps a joint further in a frame than a body could move', () => {
    let worst = 0;
    let worstAt = 0;
    let previous = sampleFrame(timeline, 0);
    for (let time = FRAME; time < timeline.duration; time += FRAME) {
      const frame = sampleFrame(timeline, time);
      for (const side of ['a', 'b'] as const) {
        for (const joint of JOINT_NAMES) {
          for (let axis = 0; axis < 3; axis++) {
            const delta = Math.abs(
              angularDelta(previous[side].pose.joints[joint][axis]!, frame[side].pose.joints[joint][axis]!),
            );
            if (delta > worst) {
              worst = delta;
              worstAt = time;
            }
          }
        }
      }
      previous = frame;
    }
    expect(worst, `largest jump at t=${worstAt.toFixed(2)}s`).toBeLessThan(0.8);
  });

  it('produces only finite poses and stays inside the cage', () => {
    for (let time = 0; time < timeline.duration; time += 0.05) {
      const frame = sampleFrame(timeline, time);
      for (const side of ['a', 'b'] as const) {
        for (const joint of JOINT_NAMES) {
          for (const angle of frame[side].pose.joints[joint]) {
            expect(Number.isFinite(angle), `${joint} at ${time.toFixed(2)}`).toBe(true);
          }
        }
        expect(Math.hypot(frame[side].position[0], frame[side].position[2])).toBeLessThan(4.2);
      }
    }
  });

  it('is identical whether played or seeked', () => {
    const target = Math.min(2.5, timeline.duration * 0.6);
    const seeked = sampleFrame(timeline, target);
    for (let t = 0; t <= target; t += FRAME) sampleFrame(timeline, t);
    expect(sampleFrame(timeline, target)).toEqual(seeked);
  });
});

describe('the scenes exercise what they claim to', () => {
  it('hands the legs to a kick and back to the footwork afterwards', () => {
    const timeline = timelineFor('low-kick');
    const kick = timeline.beats.find((beat) => beat.clipName === 'kick_low')!;
    expect(kick.claim.LEGS).toBeGreaterThan(0.5);
    const after = timeline.beats[kick.index + 1];
    if (after) expect(after.claim.LEGS).toBeLessThan(0.35);
  });

  it('flows the combination rather than resetting between the two shots', () => {
    const timeline = timelineFor('cross-hook');
    const hook = timeline.beats.find((beat) => beat.clipName === 'strike_hook_left')!;
    expect(hook.follows, 'the hook should follow the cross').toBe(true);
  });

  it('leaves the fighter hurt after the stagger clip has finished', () => {
    const timeline = timelineFor('stagger-recovery');
    const hit = timeline.staggerHits.flat()[0];
    expect(hit, 'nobody was hurt in the stagger scene').toBeTruthy();
    const soon = sampleFrame(timeline, hit!.at + 0.3);
    const later = sampleFrame(timeline, hit!.at + 1.5);
    const worst = Math.max(soon.a.stagger, soon.b.stagger);
    const fading = Math.max(later.a.stagger, later.b.stagger);
    expect(worst).toBeGreaterThan(0.3);
    expect(fading).toBeLessThan(worst);
    expect(fading).toBeGreaterThan(0.05);
  });

  it('takes the whole body to the canvas for a takedown', () => {
    const timeline = timelineFor('takedown');
    const takedown = timeline.beats.find((beat) => beat.clipName === 'td_double_leg')!;
    expect(takedown.claim.LEGS).toBe(1);
    expect(takedown.claim.SPINE).toBe(1);
  });

  it('is heavier late in a fight than early', () => {
    const late = sampleFrame(timelineFor('fatigue'), 0.5);
    const early = sampleFrame(timelineFor('jab-recovery'), 0.5);
    expect(late.a.fatigue).toBeGreaterThan(early.a.fatigue);
  });

  it('gives the head, the body and the legs their own reactions', () => {
    const timeline = timelineFor('damage-regions');
    const kinds = timeline.beats.map((beat) => beat.reactionName);
    expect(kinds).toContain('HEAVY');
    expect(kinds).toContain('BODY_FOLD');
    expect(kinds).toContain('LEG_BUCKLE');
  });
});
