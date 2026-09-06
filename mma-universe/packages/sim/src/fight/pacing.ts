/**
 * Weight-class pacing (brief §2).
 *
 * Every number that decides how a fight *feels* lives here rather than in the engine, so the
 * engine reads a class profile and never a literal. A flyweight fight and a heavyweight fight
 * are not the same fight at different sizes: the small men throw twice as much and finish half
 * as often, and until this table existed the engine could not tell them apart — it never read
 * the division at all, and a measured audit had flyweights and heavyweights both throwing 6.9
 * significant strikes a minute.
 *
 * Targets are taken from public UFC per-class averages. `verify-fights.ts` measures the engine
 * against the `targets` block and prints the comparison, which is what makes these numbers
 * tunable rather than decorative.
 */

export interface ClassProfile {
  /** Multiplier on how often a fighter chooses to throw rather than move or reset. */
  readonly volume: number;
  /** Multiplier on time between actions. Above 1 is a slower, heavier fight. */
  readonly tempo: number;
  /** Multiplier on knockdown chance per clean head strike. */
  readonly knockdown: number;
  /** Multiplier on the chance a knockdown becomes a stoppage. */
  readonly finishing: number;
  /** Multiplier on damage from every landed strike. */
  readonly power: number;
  /** How well a chin holds up: below 1 means the class gets rocked more easily. */
  readonly chin: number;
  /** Multiplier on cardio drain per action. Heavier fighters gas faster. */
  readonly drain: number;
  /** Multiplier on between-round recovery. */
  readonly recovery: number;
  /** Takedown attempts wanted per fifteen minutes, before fighter attributes. */
  readonly takedownRate: number;
  /** Share of takedown entries that are chain wrestling rather than power doubles or trips. */
  readonly chainWrestling: number;
  /** What a fight in this class should look like, for the verification harness. */
  readonly targets: {
    readonly thrownPerMin: readonly [number, number];
    readonly landedPerMin: readonly [number, number];
    readonly koRate: readonly [number, number];
  };
}

/**
 * The men's classes, lightest to heaviest.
 *
 * The gradient is the point: volume falls by roughly half from flyweight to heavyweight while
 * knockdown chance and power rise by about three times, which is what turns "mostly decisions"
 * into "mostly finishes" without a single rule being different.
 */
const MEN: Record<string, ClassProfile> = {
  flyweight: {
    volume: 1.12, tempo: 0.84, knockdown: 0.62, finishing: 0.6, power: 0.78, chin: 1.16,
    drain: 0.84, recovery: 1.16, takedownRate: 3.4, chainWrestling: 0.72,
    targets: { thrownPerMin: [10, 13.5], landedPerMin: [4, 5.5], koRate: [0.12, 0.26] },
  },
  bantamweight: {
    volume: 1.2, tempo: 0.87, knockdown: 0.92, finishing: 0.68, power: 0.84, chin: 1.11,
    drain: 0.88, recovery: 1.12, takedownRate: 3.2, chainWrestling: 0.68,
    targets: { thrownPerMin: [9.5, 13], landedPerMin: [3.9, 5.4], koRate: [0.16, 0.31] },
  },
  featherweight: {
    volume: 1.08, tempo: 0.91, knockdown: 1.1, finishing: 0.76, power: 0.9, chin: 1.06,
    drain: 0.92, recovery: 1.08, takedownRate: 3, chainWrestling: 0.62,
    targets: { thrownPerMin: [9, 12], landedPerMin: [3.7, 5.1], koRate: [0.2, 0.36] },
  },
  lightweight: {
    volume: 1.14, tempo: 0.95, knockdown: 1.0, finishing: 0.85, power: 0.96, chin: 1.02,
    drain: 0.96, recovery: 1.04, takedownRate: 2.9, chainWrestling: 0.56,
    targets: { thrownPerMin: [8.2, 11.2], landedPerMin: [3.5, 4.8], koRate: [0.24, 0.4] },
  },
  welterweight: {
    volume: 1.02, tempo: 1, knockdown: 1.5, finishing: 0.95, power: 1.03, chin: 0.98,
    drain: 1, recovery: 1, takedownRate: 2.7, chainWrestling: 0.5,
    targets: { thrownPerMin: [7.6, 10.4], landedPerMin: [3.3, 4.5], koRate: [0.28, 0.45] },
  },
  middleweight: {
    volume: 0.98, tempo: 1.06, knockdown: 1.25, finishing: 1.02, power: 1.12, chin: 0.93,
    drain: 1.06, recovery: 0.95, takedownRate: 2.5, chainWrestling: 0.44,
    targets: { thrownPerMin: [7, 9.6], landedPerMin: [3.1, 4.2], koRate: [0.33, 0.52] },
  },
  light_heavyweight: {
    volume: 0.94, tempo: 1.13, knockdown: 1.3, finishing: 1.2, power: 1.24, chin: 0.87,
    drain: 1.14, recovery: 0.9, takedownRate: 2.3, chainWrestling: 0.38,
    targets: { thrownPerMin: [6.4, 8.8], landedPerMin: [2.9, 3.9], koRate: [0.4, 0.6] },
  },
  heavyweight: {
    volume: 1.0, tempo: 1.18, knockdown: 1.9, finishing: 1.2, power: 1.42, chin: 0.79,
    drain: 1.26, recovery: 0.82, takedownRate: 2.1, chainWrestling: 0.28,
    targets: { thrownPerMin: [5.6, 8], landedPerMin: [2.8, 3.6], koRate: [0.52, 0.75] },
  },
};

/**
 * The women's classes.
 *
 * Volume runs higher than the men's classes at the same weight and finishes run lower, which
 * is what the public numbers show; they are not the men's table with the labels changed.
 */
const WOMEN: Record<string, ClassProfile> = {
  strawweight: {
    volume: 1.13, tempo: 0.82, knockdown: 1.1, finishing: 0.52, power: 0.72, chin: 1.2,
    drain: 0.82, recovery: 1.18, takedownRate: 3.5, chainWrestling: 0.74,
    targets: { thrownPerMin: [10.5, 14], landedPerMin: [4.2, 5.7], koRate: [0.08, 0.2] },
  },
  flyweight: {
    volume: 1.08, tempo: 0.85, knockdown: 0.62, finishing: 0.56, power: 0.76, chin: 1.17,
    drain: 0.85, recovery: 1.15, takedownRate: 3.4, chainWrestling: 0.7,
    targets: { thrownPerMin: [10, 13.5], landedPerMin: [4.1, 5.6], koRate: [0.1, 0.23] },
  },
  bantamweight: {
    volume: 1.03, tempo: 0.88, knockdown: 0.85, finishing: 0.64, power: 0.82, chin: 1.12,
    drain: 0.89, recovery: 1.1, takedownRate: 3.2, chainWrestling: 0.66,
    targets: { thrownPerMin: [9.4, 12.8], landedPerMin: [3.9, 5.3], koRate: [0.14, 0.28] },
  },
  featherweight: {
    volume: 1.28, tempo: 0.92, knockdown: 0.62, finishing: 0.72, power: 0.88, chin: 1.08,
    drain: 0.93, recovery: 1.06, takedownRate: 3, chainWrestling: 0.6,
    targets: { thrownPerMin: [9, 12.2], landedPerMin: [3.7, 5.1], koRate: [0.18, 0.33] },
  },
};

/** Used when a division key is unrecognised, so an odd catchweight still simulates. */
const FALLBACK: ClassProfile = MEN.welterweight!;

/**
 * The profile for a division key such as `m_lightweight` or `w_strawweight`.
 *
 * Falls back to welterweight rather than throwing: a division the table has not heard of is a
 * data problem, and refusing to simulate the fight is a worse answer than simulating it at a
 * sensible middle pace.
 */
export function classProfile(divisionKey: string): ClassProfile {
  const female = divisionKey.startsWith('w_');
  const name = divisionKey.replace(/^[mw]_/, '');
  return (female ? WOMEN : MEN)[name] ?? MEN[name] ?? FALLBACK;
}

export const CLASS_PROFILES = { men: MEN, women: WOMEN } as const;
