/**
 * Deterministic, splittable random number generation.
 *
 * The universe must be reproducible from a single seed (brief §31). A single shared
 * generator cannot deliver that: as soon as a new subsystem is inserted, or a collection
 * is iterated in a different order, every downstream draw shifts and the replay diverges.
 *
 * Instead every stream is derived from a stable *address* — the universe seed plus a
 * domain tag plus entity ids plus a tick — rather than from call order:
 *
 *     const rng = Rng.fromSeed(universeSeed, 'training', fighterId, week);
 *
 * Two consequences matter. Simulating fighter B before fighter A produces identical
 * results, and a single training week or fight can be replayed in isolation without
 * replaying anything that came before it.
 */

export type SeedPart = string | number;

/**
 * cyrb128 — hashes an arbitrary string into four well-mixed 32-bit words suitable for
 * seeding sfc32. Chosen over a single 32-bit hash because seeding a 128-bit state from
 * 32 bits of entropy leaves visible correlation between nearby seeds (seed 1 vs seed 2).
 */
function cyrb128(str: string): [number, number, number, number] {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0; i < str.length; i++) {
    const k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

/** Joins seed parts with a separator that cannot appear inside a normal id. */
function addressOf(parts: readonly SeedPart[]): string {
  return parts.join('␟');
}

export class Rng {
  private a: number;
  private b: number;
  private c: number;
  private d: number;

  private constructor(state: [number, number, number, number], readonly address: string) {
    [this.a, this.b, this.c, this.d] = state;
    // Discard the first draws so that similar addresses do not produce correlated
    // opening values — sfc32 needs a short warm-up to fully diffuse its seed.
    for (let i = 0; i < 12; i++) this.nextUint32();
  }

  /** Builds a stream from an address. Identical parts always yield an identical stream. */
  static fromSeed(...parts: SeedPart[]): Rng {
    const address = addressOf(parts);
    return new Rng(cyrb128(address), address);
  }

  /** Derives an independent child stream, addressed relative to this one. */
  derive(...parts: SeedPart[]): Rng {
    return Rng.fromSeed(this.address, ...parts);
  }

  /** sfc32: fast, small-state, and statistically sound for simulation work. */
  private nextUint32(): number {
    const t = (this.a + this.b) | 0;
    this.a = this.b ^ (this.b >>> 9);
    this.b = (this.c + (this.c << 3)) | 0;
    this.c = (this.c << 21) | (this.c >>> 11);
    this.d = (this.d + 1) | 0;
    const r = (t + this.d) | 0;
    this.c = (this.c + r) | 0;
    return r >>> 0;
  }

  /** Uniform float in [0, 1). */
  next(): number {
    return this.nextUint32() / 4294967296;
  }

  /** Uniform integer in [min, max], both inclusive. */
  int(min: number, max: number): number {
    if (max < min) throw new RangeError(`Rng.int: max (${max}) < min (${min})`);
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** Uniform float in [min, max). */
  float(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  /** True with probability `p`. */
  bool(p = 0.5): boolean {
    return this.next() < p;
  }

  /** Uniformly selects one item. Throws on an empty collection rather than returning undefined. */
  pick<T>(items: readonly T[]): T {
    if (items.length === 0) throw new RangeError('Rng.pick: empty collection');
    return items[Math.floor(this.next() * items.length)] as T;
  }

  /** Selects one item with probability proportional to its weight. Non-positive weights are skipped. */
  pickWeighted<T>(entries: readonly (readonly [T, number])[]): T {
    let total = 0;
    for (const [, weight] of entries) if (weight > 0) total += weight;
    if (total <= 0) throw new RangeError('Rng.pickWeighted: no entry has a positive weight');
    let roll = this.next() * total;
    for (const [item, weight] of entries) {
      if (weight <= 0) continue;
      roll -= weight;
      if (roll < 0) return item;
    }
    // Only reachable through floating-point drift on the final entry.
    return entries[entries.length - 1]![0];
  }

  /** Returns a shuffled copy (Fisher-Yates); the input is never mutated. */
  shuffle<T>(items: readonly T[]): T[] {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [out[i], out[j]] = [out[j] as T, out[i] as T];
    }
    return out;
  }

  /** Returns up to `n` distinct items, chosen uniformly without replacement. */
  sample<T>(items: readonly T[], n: number): T[] {
    return this.shuffle(items).slice(0, Math.max(0, Math.min(n, items.length)));
  }

  /**
   * Normal deviate via Box-Muller. The second deviate is intentionally discarded rather
   * than cached: caching would make a stream's output depend on which methods were called
   * before it, which is exactly the order-coupling this module exists to avoid.
   */
  normal(mean = 0, sd = 1): number {
    let u = 0;
    while (u === 0) u = this.next();
    const v = this.next();
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /** Normal deviate resampled until it falls in range, so the distribution keeps its shape. */
  clampedNormal(mean: number, sd: number, min: number, max: number): number {
    for (let attempt = 0; attempt < 24; attempt++) {
      const value = this.normal(mean, sd);
      if (value >= min && value <= max) return value;
    }
    // Pathological parameters (a range far from the mean): fall back to a clamp.
    return Math.min(max, Math.max(min, this.normal(mean, sd)));
  }

  /** Triangular distribution — useful where a mode is known but the tails should stay reachable. */
  triangular(min: number, mode: number, max: number): number {
    const u = this.next();
    const c = (mode - min) / (max - min);
    return u < c
      ? min + Math.sqrt(u * (max - min) * (mode - min))
      : max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }
}
