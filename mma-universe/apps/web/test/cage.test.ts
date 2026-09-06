/**
 * Cage control.
 *
 * Where a fight happens in the octagon is a contest, not a backdrop. A pressure fighter's whole
 * plan is to put your back on the fence and keep it there; an out-fighter's is to refuse that
 * and get back to open space where his range counts. The engagement used to wander a small disc
 * around the centre mark regardless of who was fighting, which made every fight look the same.
 */

import { describe, expect, it } from 'vitest';
import { Rng, generateUniverse, mapEventToAnimation, simulateFight, type FightEvent } from '@mma/sim';

import { buildTimeline, sampleFrame } from '../src/three/player.ts';
import { CAGE_INNER, seatPositions, walkCage } from '../src/three/cage.ts';
import type { AnimationBeatWire, CameraHint, MovementProfile } from '../src/types.ts';
import { CAMERA_REACH, CAMERA_PRESETS, planCameraSides, solveCamera } from '../src/three/camera.ts';

const universe = generateUniverse({ seed: 'cage-tests' });
const a = universe.state.fighters[12]!;
const b = universe.state.fighters[13]!;
const result = simulateFight(a, b, { fightId: 'cage', rounds: 3 }, Rng.fromSeed('cage'));
const beats: AnimationBeatWire[] = result.events.map((event: FightEvent) => ({
  event: event as never,
  directive: mapEventToAnimation(event) as never,
}));

/** A brawler: walks forward, wants to be in the pocket, not especially light on his feet. */
const brawler: MovementProfile = {
  fighterId: a.id,
  pressure: 0.95,
  mobility: 0.3,
  recovery: 0.4,
  engine: 0.5,
  guard: 0.35,
  deception: 0.2,
  reach: 0.1,
  phase: 0.7,
};

/** A karate counter fighter: lives at the end of his range and will not be pinned. */
const karateka: MovementProfile = {
  fighterId: b.id,
  pressure: 0.2,
  mobility: 0.95,
  recovery: 0.85,
  engine: 0.8,
  guard: 0.75,
  deception: 0.85,
  reach: 0.95,
  phase: 3.4,
};

const styled = buildTimeline(beats, a.id, b.id, 'CONDENSED', [brawler, karateka]);

describe('the fight moves around the octagon', () => {
  it('uses the whole cage rather than the centre mark', () => {
    let furthest = 0;
    let total = 0;
    let samples = 0;
    for (let time = 0; time < Math.min(styled.duration, 90); time += 0.25) {
      const frame = sampleFrame(styled, time);
      for (const side of ['a', 'b'] as const) {
        const distance = Math.hypot(frame[side].position[0], frame[side].position[2]);
        furthest = Math.max(furthest, distance);
        total += distance;
        samples++;
      }
    }
    // Somebody's back reaches the fence, and the fight does not live on the centre mark.
    expect(furthest, 'furthest anyone got from the middle').toBeGreaterThan(2.6);
    expect(total / samples, 'average distance from the middle').toBeGreaterThan(0.9);
  });

  it('never puts a fighter through the fence', () => {
    for (let time = 0; time < styled.duration; time += 0.05) {
      const frame = sampleFrame(styled, time);
      for (const side of ['a', 'b'] as const) {
        const distance = Math.hypot(frame[side].position[0], frame[side].position[2]);
        expect(distance, `${side} outside the cage at t=${time.toFixed(2)}`).toBeLessThanOrEqual(CAGE_INNER + 0.35);
      }
    }
  });
});

describe('style decides who owns the cage', () => {
  it('backs the out-fighter onto the fence far more than the brawler', () => {
    const pinnedKarateka = styled.beats.filter((beat) => beat.pinned === 1).length;
    const pinnedBrawler = styled.beats.filter((beat) => beat.pinned === 0).length;
    expect(pinnedKarateka, 'the pressure fighter should be the one doing the pushing').toBeGreaterThan(
      pinnedBrawler,
    );
  });

  it('does not leave the out-fighter pinned there all night', () => {
    // He should keep getting off the fence — long unbroken stretches mean the escape is broken.
    let longest = 0;
    let run = 0;
    for (const beat of styled.beats) {
      run = beat.pinned === 1 ? run + 1 : 0;
      longest = Math.max(longest, run);
    }
    const free = styled.beats.filter((beat) => beat.pinned === -1).length;
    expect(longest, 'longest unbroken spell on the fence').toBeLessThan(styled.beats.length * 0.5);
    expect(free / styled.beats.length, 'share of the fight in open space').toBeGreaterThan(0.25);
  });

  it('reverses when the pressure does', () => {
    const flipped = buildTimeline(beats, a.id, b.id, 'CONDENSED', [
      { ...brawler, pressure: 0.2, reach: 0.95, mobility: 0.95 },
      { ...karateka, pressure: 0.95, reach: 0.1, mobility: 0.3 },
    ]);
    const pinnedA = flipped.beats.filter((beat) => beat.pinned === 0).length;
    const pinnedB = flipped.beats.filter((beat) => beat.pinned === 1).length;
    expect(pinnedA, 'the fighter now being pressured should be the one on the fence').toBeGreaterThan(pinnedB);
  });

  it('keeps two evenly matched fighters nearer the middle than a mismatch does', () => {
    const even = buildTimeline(beats, a.id, b.id, 'CONDENSED', [
      { ...brawler, pressure: 0.5, reach: 0.5, mobility: 0.5 },
      { ...karateka, pressure: 0.5, reach: 0.5, mobility: 0.5 },
    ]);
    const spread = (timeline: typeof even) => {
      let total = 0;
      for (const beat of timeline.beats) total += Math.hypot(beat.centre[0], beat.centre[2]);
      return total / timeline.beats.length;
    };
    expect(spread(even)).toBeLessThan(spread(styled));
  });
});

describe('the cage walk itself', () => {
  const halves = Array.from({ length: 200 }, () => 0.55);

  it('holds both fighters inside the fence for any pairing', () => {
    for (const pressure of [0, 0.5, 1]) {
      for (const reach of [0, 1]) {
        const seats = walkCage(halves, {
          pressure: [pressure, 1 - pressure],
          reach: [reach, 1 - reach],
          mobility: [0.5, 0.5],
          phase: [0.3, 2.1],
        });
        for (const seat of seats) {
          const { a: left, b: right } = seatPositions(seat, 0.55);
          expect(Math.hypot(...left)).toBeLessThanOrEqual(CAGE_INNER + 1e-6);
          expect(Math.hypot(...right)).toBeLessThanOrEqual(CAGE_INNER + 1e-6);
        }
      }
    }
  });

  it('is deterministic', () => {
    const input = { pressure: [0.9, 0.2], reach: [0.1, 0.9], mobility: [0.3, 0.9], phase: [0.7, 3.4] } as const;
    expect(walkCage(halves, input)).toEqual(walkCage(halves, input));
  });

  it('does not teleport the engagement between beats', () => {
    const seats = walkCage(halves, {
      pressure: [0.95, 0.05],
      reach: [0.1, 0.95],
      mobility: [0.3, 0.95],
      phase: [0.7, 3.4],
    });
    for (let index = 1; index < seats.length; index++) {
      const step = Math.hypot(
        seats[index]!.centre[0] - seats[index - 1]!.centre[0],
        seats[index]!.centre[1] - seats[index - 1]!.centre[1],
      );
      expect(step, `jump at beat ${index}`).toBeLessThan(0.85);
    }
  });
});

describe('the camera copes with a fight that is not in the middle', () => {
  const HINTS = Object.keys(CAMERA_PRESETS) as CameraHint[];

  /** Every position the engagement can reach, at every angle the pair can stand. */
  const SEATS: { centre: [number, number]; facing: number }[] = [];
  for (let ring = 0; ring <= 4; ring++) {
    const radius = (CAGE_INNER * ring) / 4;
    for (let step = 0; step < 16; step++) {
      const angle = (step / 16) * Math.PI * 2;
      const centre: [number, number] = [Math.cos(angle) * radius, Math.sin(angle) * radius];
      for (let turn = 0; turn < 24; turn++) {
        SEATS.push({ centre, facing: (turn / 24) * Math.PI * 2 });
      }
    }
  }
  const SIDES = planCameraSides(SEATS);

  function everyShot(
    time: number,
    visit: (shot: ReturnType<typeof solveCamera>, seat: (typeof SEATS)[number]) => void,
  ): void {
    for (const hint of HINTS) {
      SEATS.forEach((seat, index) => {
        visit(solveCamera(hint, seat.centre[0], seat.centre[1], time, seat.facing, SIDES[index]!), seat);
      });
    }
  }

  it('never stands closer to the action than the fighters stand to each other', () => {
    // The failure this guards: a fixed world-space offset put the lens between the two men
    // once the fight reached the camera's own side of the cage, filming somebody's back from
    // half a metre away.
    let closest = Infinity;
    everyShot(3.2, (shot, seat) => {
      closest = Math.min(
        closest,
        Math.hypot(shot.position[0] - seat.centre[0], shot.position[2] - seat.centre[1]),
      );
    });
    expect(closest).toBeGreaterThan(1.6);
  });

  it('never shoots down the line of the two fighters', () => {
    // And the failure that fixing the first one caused: the pair face along the axis they are
    // driven down, which points at the fence, so a lens brought in on the radius looks
    // straight through the near man at the far one.
    let flattest = Math.PI;
    everyShot(2.4, (shot, seat) => {
      const toLens = Math.atan2(shot.position[0] - seat.centre[0], shot.position[2] - seat.centre[1]);
      let off = Math.abs(((toLens - seat.facing + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      off = Math.min(off, Math.PI - off);
      flattest = Math.min(flattest, off);
    });
    expect((flattest * 180) / Math.PI).toBeGreaterThan(25);
  });

  it('keeps the lens inside the cage wherever the fight goes', () => {
    everyShot(1.1, (shot) => {
      expect(Math.hypot(shot.position[0], shot.position[2])).toBeLessThanOrEqual(CAMERA_REACH + 1e-6);
    });
  });

  /**
   * The largest step the shot takes as some parameter is swept, at a given resolution.
   *
   * Asserting a threshold on this would only say the motion is gentle. Halving the step and
   * watching the largest jump halve with it is what actually distinguishes a shot that moves
   * fast from a shot that cuts — a discontinuity does not care how finely you sample it.
   */
  function roughest(steps: number, sweep: (t: number) => ReturnType<typeof solveCamera>): number {
    let worst = 0;
    let previous = sweep(0);
    for (let step = 1; step <= steps; step++) {
      const shot = sweep(step / steps);
      worst = Math.max(
        worst,
        Math.hypot(shot.position[0] - previous.position[0], shot.position[2] - previous.position[2]),
      );
      previous = shot;
    }
    return worst;
  }

  it('does not lurch when the fight drifts off the centre mark', () => {
    for (const hint of HINTS) {
      for (const facing of [0, 0.7, 1.57, 2.4, 3.9, 5.1]) {
        const sweep = (t: number) => solveCamera(hint, CAGE_INNER * t, CAGE_INNER * t * 0.35, 0, facing, 1);
        expect(roughest(800, sweep)).toBeLessThan(roughest(400, sweep) * 0.6);
      }
    }
  });

  it('does not lurch as the pair turn', () => {
    for (const hint of HINTS) {
      for (const radius of [0, 1.9, CAGE_INNER]) {
        const sweep = (t: number) => solveCamera(hint, radius, 0, 0, t * Math.PI * 2, -1);
        expect(roughest(800, sweep)).toBeLessThan(roughest(400, sweep) * 0.6);
      }
    }
  });
});

describe('choosing which side of the fighters to shoot from', () => {
  it('crosses the fighters rarely, not every time they turn a little', () => {
    // The hysteresis is the whole point: crossing the line is a cut, and a pair turning on
    // the spot must not make the camera flit back and forth across them.
    const seats = Array.from({ length: 600 }, (_, index) => ({
      centre: [3.1, 0.4] as [number, number],
      facing: Math.sin(index * 0.05) * 0.9,
    }));
    const sides = planCameraSides(seats);
    const crossings = sides.filter((side, index) => index > 0 && side !== sides[index - 1]).length;
    expect(crossings).toBeLessThan(4);
  });

  it('does cross when the fight turns all the way round', () => {
    const seats = Array.from({ length: 400 }, (_, index) => ({
      centre: [3.4, 0] as [number, number],
      facing: (index / 400) * Math.PI * 4,
    }));
    const sides = planCameraSides(seats);
    expect(new Set(sides).size).toBe(2);
  });

  it('is a pure function of the seats, so a replay picks the same angles', () => {
    const seats = Array.from({ length: 120 }, (_, index) => ({
      centre: [Math.sin(index * 0.3) * 3, Math.cos(index * 0.21) * 3] as [number, number],
      facing: index * 0.17,
    }));
    expect(planCameraSides(seats)).toEqual(planCameraSides(seats));
  });
});
