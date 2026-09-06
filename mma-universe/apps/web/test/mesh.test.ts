/**
 * Properties of the generated body meshes that are invisible in code and total on screen.
 *
 * Winding is the case that motivated this file. The trunks were built inside out from the day
 * they were written: `tube` winds its triangles in the order its sections are given, and the
 * shorts ran waistband-downward while every other tube on the body runs bottom to top. Every
 * vertex was in exactly the right place. It rendered as the far side of the shorts with the
 * fighter's hip showing through the middle, and four separate probes for a gap in the geometry
 * came back clean, because there was no gap.
 */

import { describe, expect, it } from 'vitest';
import {
  buildBeard,
  buildGloves,
  buildHair,
  buildShorts,
  buildSkin,
  occluders,
  occlusionAt,
  signedVolume,
  toneAt,
} from '../src/three/body.ts';

const GARMENTS = {
  skin: buildSkin(),
  'short trunks': buildShorts(0),
  'long trunks': buildShorts(1),
  gloves: buildGloves(),
  hair: buildHair(0),
  beard: buildBeard(),
};

describe('every generated mesh faces outward', () => {
  for (const [name, mesh] of Object.entries(GARMENTS)) {
    it(`winds ${name} the right way round`, () => {
      // Positive signed volume means the surface encloses its own inside, which is the whole
      // of what "the right way round" means to a renderer.
      expect(signedVolume(mesh)).toBeGreaterThan(0);
    });
  }

  it('catches a mesh that is inside out', () => {
    // The guard is only worth having if it fails on the thing it is meant to catch.
    const shorts = buildShorts(0.5);
    const flipped = { ...shorts, indices: [...shorts.indices] };
    for (let i = 0; i < flipped.indices.length; i += 3) {
      const swap = flipped.indices[i]!;
      flipped.indices[i] = flipped.indices[i + 2]!;
      flipped.indices[i + 2] = swap;
    }
    expect(signedVolume(flipped)).toBeLessThan(0);
  });
});

describe('the trunks cover the fighter', () => {
  const height = (mesh: { positions: number[] }) => {
    let low = Infinity;
    let high = -Infinity;
    for (let i = 1; i < mesh.positions.length; i += 3) {
      low = Math.min(low, mesh.positions[i]!);
      high = Math.max(high, mesh.positions[i]!);
    }
    return { low, high };
  };

  it('reaches from above the hip bone to below the crotch', () => {
    const trunks = height(buildShorts(0.5));
    // The hip joint sits at 0.92 and the thighs start there; the waistband has to clear it and
    // the hem has to pass it, or there is bare fighter between the two.
    expect(trunks.high).toBeGreaterThan(1.05);
    expect(trunks.low).toBeLessThan(0.86);
  });

  it('makes longer trunks longer and leaves the waist alone', () => {
    const short = height(buildShorts(0));
    const long = height(buildShorts(1));
    expect(long.low).toBeLessThan(short.low - 0.1);
    expect(Math.abs(long.high - short.high)).toBeLessThan(1e-9);
  });

  it('stops well above the knee even at its longest', () => {
    // The knee is at 0.48. Trunks past it are a gi, not fight shorts.
    expect(height(buildShorts(1)).low).toBeGreaterThan(0.55);
  });
});

describe('baked shading', () => {
  const balls = occluders();

  it('darkens a crease more than open skin', () => {
    // Inside the armpit, facing down into it, versus the outside of the same shoulder.
    const armpit = occlusionAt([0.12, 1.38, 0], [0, -1, 0], balls);
    const shoulder = occlusionAt([0.24, 1.45, 0], [1, 0.3, 0], balls);
    expect(armpit).toBeLessThan(shoulder);
  });

  it('never darkens past its floor, and never brightens', () => {
    for (const point of [[0, 1.2, 0], [0.3, 0.9, 0.1], [0, 1.7, 0.1], [0.1, 0.2, 0]] as const) {
      for (const normal of [[0, 1, 0], [0, -1, 0], [1, 0, 0], [0, 0, 1]] as const) {
        const ao = occlusionAt(point, normal, balls);
        expect(ao).toBeGreaterThan(0.3);
        expect(ao).toBeLessThanOrEqual(1);
      }
    }
  });

  it('keeps skin tone warm rather than tinted', () => {
    for (const point of [[0, 1.6, 0], [0.3, 0.9, 0], [0, 0.1, 0]] as const) {
      const [r, g, b] = toneAt(point);
      expect(r).toBeGreaterThanOrEqual(g);
      expect(g).toBeGreaterThanOrEqual(b);
      expect(r).toBeLessThan(1.3);
      expect(b).toBeGreaterThan(0.7);
    }
  });

  it('derives its occluders from the body rather than a hand-written list', () => {
    // A stand-in set that can drift from the body it stands for is worse than none.
    expect(balls.length).toBeGreaterThan(30);
    for (const ball of balls) {
      expect(Number.isFinite(ball.radius)).toBe(true);
      expect(ball.radius).toBeGreaterThan(0);
      expect(ball.at.every(Number.isFinite)).toBe(true);
    }
  });
});
