import { describe, expect, it } from 'vitest';
import { Rng } from '@mma/sim';

describe('Rng', () => {
  it('reproduces an identical sequence from an identical address', () => {
    const a = Rng.fromSeed('universe-1', 'training', 'fighter_00042', 17);
    const b = Rng.fromSeed('universe-1', 'training', 'fighter_00042', 17);
    const first = Array.from({ length: 40 }, () => a.next());
    const second = Array.from({ length: 40 }, () => b.next());
    expect(first).toEqual(second);
  });

  it('produces uncorrelated streams for adjacent addresses', () => {
    // The failure this guards against is a weak seed hash: `fighter_00042` and
    // `fighter_00043` differing by one character must not produce similar output.
    const a = Rng.fromSeed('universe-1', 'training', 'fighter_00042', 17);
    const b = Rng.fromSeed('universe-1', 'training', 'fighter_00043', 17);
    const pairs = Array.from({ length: 500 }, () => [a.next(), b.next()] as const);
    const meanA = pairs.reduce((sum, [x]) => sum + x, 0) / pairs.length;
    const meanB = pairs.reduce((sum, [, y]) => sum + y, 0) / pairs.length;
    const covariance =
      pairs.reduce((sum, [x, y]) => sum + (x - meanA) * (y - meanB), 0) / pairs.length;
    expect(Math.abs(covariance)).toBeLessThan(0.01);
  });

  it('is order independent: a derived stream does not depend on sibling draws', () => {
    // This is the property that makes the whole simulation reproducible. Draining one child
    // stream must not shift another's output.
    const parent = Rng.fromSeed('universe-1', 'genesis');
    const firstRun = parent.derive('fighter_00007').next();

    const other = Rng.fromSeed('universe-1', 'genesis');
    const sibling = other.derive('fighter_00003');
    for (let i = 0; i < 1000; i++) sibling.next();
    const secondRun = other.derive('fighter_00007').next();

    expect(secondRun).toBe(firstRun);
  });

  it('stays inside its declared ranges', () => {
    const rng = Rng.fromSeed('range-check');
    for (let i = 0; i < 5000; i++) {
      const value = rng.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);

      const integer = rng.int(3, 7);
      expect(integer).toBeGreaterThanOrEqual(3);
      expect(integer).toBeLessThanOrEqual(7);

      const bounded = rng.clampedNormal(50, 20, 10, 90);
      expect(bounded).toBeGreaterThanOrEqual(10);
      expect(bounded).toBeLessThanOrEqual(90);
    }
  });

  it('produces a roughly uniform distribution', () => {
    const rng = Rng.fromSeed('uniformity');
    const buckets = new Array(10).fill(0);
    const samples = 100_000;
    for (let i = 0; i < samples; i++) buckets[Math.floor(rng.next() * 10)]!++;
    for (const count of buckets) {
      expect(count).toBeGreaterThan(samples / 10 - samples / 100);
      expect(count).toBeLessThan(samples / 10 + samples / 100);
    }
  });

  it('respects weights in weighted selection', () => {
    const rng = Rng.fromSeed('weights');
    let heavy = 0;
    for (let i = 0; i < 20_000; i++) {
      if (rng.pickWeighted([['heavy', 9], ['light', 1]] as const) === 'heavy') heavy++;
    }
    expect(heavy / 20_000).toBeGreaterThan(0.87);
    expect(heavy / 20_000).toBeLessThan(0.93);
  });

  it('shuffles without mutating the input', () => {
    const rng = Rng.fromSeed('shuffle');
    const original = [1, 2, 3, 4, 5, 6, 7, 8];
    const shuffled = rng.shuffle(original);
    expect(original).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect([...shuffled].sort((a, b) => a - b)).toEqual(original);
  });

  it('rejects an empty collection rather than returning undefined', () => {
    expect(() => Rng.fromSeed('empty').pick([])).toThrow(RangeError);
  });
});
