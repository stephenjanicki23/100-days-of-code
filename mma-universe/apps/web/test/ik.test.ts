/**
 * The IK solver, checked by forward kinematics.
 *
 * Deriving euler sign conventions on paper and hoping is how an afternoon goes to a backwards
 * knee. Solving for a target and then running the result forwards is unambiguous: either the
 * ankle lands where it was asked to or it does not.
 */

import { describe, expect, it } from 'vitest';
import { legTip, solveLeg, eulerToMatrix, apply, normalise, rotateY } from '../src/three/ik.ts';
import { SKELETON } from '../src/three/rig.ts';

const THIGH = SKELETON.thighL.length;
const SHIN = SKELETON.shinL.length;

describe('two-bone IK', () => {
  const targets: [string, [number, number, number]][] = [
    ['straight down', [0, -0.8, 0]],
    ['tucked under', [0, -0.6, 0]],
    ['forward', [0, -0.72, 0.22]],
    ['behind', [0, -0.7, -0.24]],
    ['out to the side', [0.2, -0.74, 0]],
    ['forward and across', [-0.16, -0.68, 0.18]],
    ['deep crouch', [0.05, -0.45, 0.1]],
  ];

  it('lands the ankle on the target', () => {
    for (const [name, target] of targets) {
      const solution = solveLeg(target, THIGH, SHIN);
      const tip = legTip(solution.thigh, solution.shin, THIGH, SHIN);
      for (let axis = 0; axis < 3; axis++) {
        expect(tip[axis], `${name} axis ${axis}`).toBeCloseTo(target[axis]!, 4);
      }
    }
  });

  it('bends the knee forwards, never backwards', () => {
    for (const [name, target] of targets) {
      const solution = solveLeg(target, THIGH, SHIN);
      // A positive X on the shin swings it behind the thigh, which is how a knee works.
      expect(solution.shin[0], `${name} knee`).toBeGreaterThanOrEqual(0);
      expect(solution.shin[0], `${name} knee`).toBeLessThan(Math.PI);
    }
  });

  it('puts the knee in front of the leg, where a knee goes', () => {
    // The property that matters is not the euler decomposition but where the joint ends up:
    // the knee must sit forward of the straight line from hip to ankle, never behind it.
    for (const [name, target] of targets) {
      const solution = solveLeg(target, THIGH, SHIN);
      const knee = apply(eulerToMatrix(solution.thigh), [0, -THIGH, 0]);
      const along = THIGH / Math.hypot(...target);
      const straight = target.map((axis) => axis * along) as [number, number, number];
      expect(knee[2] - straight[2], `${name} knee is behind the leg`).toBeGreaterThan(-1e-6);
    }
  });

  it('straightens toward an unreachable target rather than tearing the leg off', () => {
    const solution = solveLeg([0, -2.5, 0], THIGH, SHIN);
    expect(solution.overreached).toBe(true);
    // Straight to within half a degree; the clamp leaves a hair of bend by design, so the
    // knee never passes through the exact singularity.
    expect(solution.shin[0]).toBeLessThan(0.02);
    const tip = legTip(solution.thigh, solution.shin, THIGH, SHIN);
    // Pointing at it, at full extension.
    expect(tip[1]).toBeCloseTo(-(THIGH + SHIN), 3);
  });

  it('is stable at the singular straight-down pose', () => {
    const solution = solveLeg([0, -(THIGH + SHIN), 0], THIGH, SHIN);
    for (const value of [...solution.thigh, ...solution.shin]) {
      expect(Number.isFinite(value)).toBe(true);
    }
  });

  it('composes euler exactly as three.js does', () => {
    // A rotation of pi/2 about X takes -Y to -Z, which is the convention every pose relies on.
    const matrix = eulerToMatrix([Math.PI / 2, 0, 0]);
    const out = apply(matrix, [0, -1, 0]);
    expect(out[0]).toBeCloseTo(0, 6);
    expect(out[1]).toBeCloseTo(0, 6);
    expect(out[2]).toBeCloseTo(-1, 6);
  });

  it('rotates about Y the same way the fighters are placed', () => {
    const out = rotateY([0, 0, 1], Math.PI);
    expect(normalise(out)[2]).toBeCloseTo(-1, 6);
  });
});
