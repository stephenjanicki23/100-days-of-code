/**
 * Where in the octagon the fight is happening, and who put it there.
 *
 * The engagement used to wander a small disc around the middle of the cage, which made every
 * fight look the same and made cage position meaningless. In a real fight the position *is* a
 * contest: a pressure fighter walks his opponent onto the fence and keeps him there, and an
 * out-fighter's whole job is to refuse that — to circle off the cage and get back to open
 * space where his range is worth something.
 *
 * So the position is integrated rather than sampled from a curve. Each beat, the fighter with
 * more forward pressure drives the pair along the axis between them; whoever ends up against
 * the fence works along it to escape, at a rate set by how mobile they are and how much they
 * want distance. A brawler against a karate fighter produces exactly the pattern you would
 * expect — long stretches with someone's back to the fence, broken by an angle out.
 *
 * Integrated once when the timeline is built, for the same reason the footwork is planned
 * rather than simulated: `sampleFrame` stays a pure function of `(timeline, t)`.
 */

export interface CageSeat {
  /** Where the middle of the engagement sits, in metres from the cage centre. */
  readonly centre: readonly [number, number];
  /** Which way round the pair stand. Fighter A is at `centre - half * dir`. */
  readonly facing: number;
  /**
   * Who is being backed up: 0 for A, 1 for B, or -1 when neither is on the fence. Carried
   * through so the debug readout and the tests can talk about cage control directly.
   */
  readonly pinned: number;
}

export interface CageFighters {
  readonly pressure: readonly [number, number];
  readonly reach: readonly [number, number];
  readonly mobility: readonly [number, number];
  readonly phase: readonly [number, number];
}

/** How close a fighter's own position may get to the fence. The cage is 4.55 m to the mesh. */
export const CAGE_INNER = 3.75;
/** Metres the pair travel per beat at a full pressure mismatch. */
const DRIVE = 0.26;
/** Radians per beat the pair circle when one is much lighter on their feet. */
const CIRCLE = 0.09;
/** Radians per beat a trapped fighter works along the fence to get off it. */
const ESCAPE = 0.16;
/** How strongly a fighter who wants distance pulls the fight back to open space. */
const OPEN_SPACE = 0.09;

function length(x: number, z: number): number {
  return Math.hypot(x, z);
}

/**
 * Walks the engagement around the cage, one beat at a time.
 *
 * `half` is the separation at each beat, which matters because it decides how close to the
 * fence a fighter is for a given engagement centre — two people in a clinch can be much nearer
 * the mesh than two at kicking range.
 */
export function walkCage(halves: readonly number[], fighters: CageFighters): CageSeat[] {
  const seats: CageSeat[] = [];
  let x = 0;
  let z = 0;
  let facing = 0;

  const drive = fighters.pressure[0] - fighters.pressure[1];
  const circling = fighters.mobility[0] - fighters.mobility[1];

  for (const [index, half] of halves.entries()) {
    // A slow base drift, so two evenly matched fighters still work the cage rather than
    // standing on the centre mark for fifteen minutes.
    const wander = Math.sin(index * 0.043 + fighters.phase[0]) * 0.05;
    facing += CIRCLE * (circling * 0.7 + Math.sin(index * 0.031 + fighters.phase[1]) * 0.5);

    const dirX = Math.sin(facing);
    const dirZ = Math.cos(facing);

    // The fighter with more pressure moves the pair toward the other one's side of the cage.
    x += dirX * (drive * DRIVE + wander);
    z += dirZ * (drive * DRIVE + wander);

    let ax = x - dirX * half;
    let az = z - dirZ * half;
    let bx = x + dirX * half;
    let bz = z + dirZ * half;

    // Whoever is nearer the mesh is the one with a problem.
    const outA = length(ax, az);
    const outB = length(bx, bz);
    const trapped = outA > outB ? 0 : 1;
    const worst = Math.max(outA, outB);
    let pinned = -1;

    if (worst > CAGE_INNER) {
      // Bring the pair back inside along the line to the cage centre — physically, the fence
      // simply stops the retreating fighter going further.
      const overflow = worst - CAGE_INNER;
      const px = trapped === 0 ? ax : bx;
      const pz = trapped === 0 ? az : bz;
      const norm = length(px, pz) || 1;
      x -= (px / norm) * overflow;
      z -= (pz / norm) * overflow;
      pinned = trapped;

      // Off the fence: the trapped fighter works an angle, which swings the whole engagement
      // around the cage. Someone quick who wants distance gets out fast; someone slow and
      // happy inside barely moves.
      const craft = fighters.mobility[trapped] * 0.6 + fighters.reach[trapped] * 0.4;
      const way = Math.sin(index * 0.21 + fighters.phase[trapped]) >= 0 ? 1 : -1;
      const angle = ESCAPE * craft * way;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const rx = x * cos - z * sin;
      const rz = x * sin + z * cos;
      x = rx;
      z = rz;
      facing += angle;

      // And a fighter who lives at range pulls the fight back toward open space.
      const pull = OPEN_SPACE * fighters.reach[trapped];
      const away = length(x, z) || 1;
      x -= (x / away) * pull;
      z -= (z / away) * pull;

      ax = x - Math.sin(facing) * half;
      az = z - Math.cos(facing) * half;
      bx = x + Math.sin(facing) * half;
      bz = z + Math.cos(facing) * half;
    }

    // Final guarantee: nobody is ever outside the cage, whatever the arithmetic above did.
    const held = holdInside(x, z, facing, half);
    x = held[0];
    z = held[1];

    seats.push({ centre: [x, z], facing, pinned });
  }

  return seats;
}

/**
 * Pulls an engagement centre straight back toward the middle of the cage until *both* fighters
 * are inside the fence.
 *
 * Shrinking the centre proportionally is the obvious move and is wrong: a fighter sits at
 * `centre + half * dir`, so scaling the centre by `k` does not scale that offset position by
 * `k`, and the pair can still finish a few millimetres outside. Solved exactly instead.
 *
 * Split the centre into the component along the pair's axis (`u`) and across it (`v`). The two
 * fighters are at `u - half` and `u + half` on the axis, both at `v` across it, so the one
 * further out is at a distance of `(|u| + half, v)` and the containment condition is the single
 * inequality `(|u| + half)^2 + v^2 <= R^2`. Substituting a uniform shrink `s` on the centre
 * gives a quadratic in `s`, whose positive root is the largest shrink that still fits.
 */
function holdInside(x: number, z: number, facing: number, half: number): [number, number] {
  const dirX = Math.sin(facing);
  const dirZ = Math.cos(facing);
  const u = x * dirX + z * dirZ;
  const v = x * dirZ - z * dirX;

  // A separation wider than the cage itself has no solution; close the pair up first.
  const gap = Math.min(half, CAGE_INNER);
  if (Math.hypot(Math.abs(u) + gap, v) <= CAGE_INNER) return [x, z];

  const a = u * u + v * v;
  if (a === 0) return [x, z];
  const b = 2 * Math.abs(u) * gap;
  const c = gap * gap - CAGE_INNER * CAGE_INNER;
  const s = (-b + Math.sqrt(Math.max(0, b * b - 4 * a * c))) / (2 * a);
  return [x * s, z * s];
}

/** Where a fighter stands, given the seat and their separation. */
export function seatPositions(seat: CageSeat, half: number): {
  a: readonly [number, number];
  b: readonly [number, number];
} {
  const dirX = Math.sin(seat.facing);
  const dirZ = Math.cos(seat.facing);
  return {
    a: [seat.centre[0] - dirX * half, seat.centre[1] - dirZ * half],
    b: [seat.centre[0] + dirX * half, seat.centre[1] + dirZ * half],
  };
}
