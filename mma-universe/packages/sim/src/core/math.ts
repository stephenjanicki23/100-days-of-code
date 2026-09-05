/** Small numeric helpers shared across the simulation. All are pure. */

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/**
 * Clamps into the visible attribute range.
 *
 * Deliberately does *not* round. Attributes are stored at full precision because a training
 * week moves an attribute by a few hundredths of a point; quantising on every write would
 * discard any change smaller than the quantum, and a fighter whose weekly gain rounds to
 * zero never develops at all. Rounding is a presentation concern — see `displayAttribute`.
 */
export function clampAttribute(value: number): number {
  return clamp(value, 1, 100);
}

/** The rounded value shown in the UI. Never write this back into the model. */
export function displayAttribute(value: number): number {
  return Math.round(value * 10) / 10;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

/** Maps `value` from [inMin, inMax] onto [outMin, outMax], clamped at both ends. */
export function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax === inMin) return outMin;
  return lerp(outMin, outMax, (value - inMin) / (inMax - inMin));
}

export function round(value: number, places = 0): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function sum(values: readonly number[]): number {
  let total = 0;
  for (const v of values) total += v;
  return total;
}

export function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : sum(values) / values.length;
}

/** Standard deviation of a sample (population form — the simulation deals in full populations). */
export function stdDev(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const m = mean(values);
  return Math.sqrt(mean(values.map((v) => (v - m) ** 2)));
}

/** Weighted mean; entries with non-positive weight are ignored. */
export function weightedMean(entries: readonly (readonly [number, number])[]): number {
  let weighted = 0;
  let weight = 0;
  for (const [value, w] of entries) {
    if (w <= 0) continue;
    weighted += value * w;
    weight += w;
  }
  return weight === 0 ? 0 : weighted / weight;
}

/** Logistic curve, used wherever a bounded soft threshold reads better than a hard cut-off. */
export function logistic(x: number, midpoint = 0, steepness = 1): number {
  return 1 / (1 + Math.exp(-steepness * (x - midpoint)));
}
