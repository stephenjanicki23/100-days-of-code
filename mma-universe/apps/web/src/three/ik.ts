/**
 * Two-bone inverse kinematics, for legs.
 *
 * Forward kinematics answers "where does the foot end up given these joint angles"; the
 * fighters need the opposite. A foot planted on the canvas has a fixed world position, and the
 * hips move over it — so the leg angles have to be solved backwards from where the foot *is*.
 * Without this the legs are posed by a clip while the body translates underneath them, which
 * is foot sliding, and it is one of the loudest tells that a character is not really walking.
 *
 * Pure maths, no three.js: the solver is exercised by a forward-kinematics round trip in
 * `animation.test.ts`, which is also what pins down the sign conventions. Deriving those on
 * paper and hoping is how you spend an afternoon on a backwards knee.
 */

import type { Vec3 } from './rig.ts';

export type Mat3 = readonly [number, number, number, number, number, number, number, number, number];

/** XYZ euler exactly as three.js composes it: R = Rx * Ry * Rz. */
export function eulerToMatrix(rotation: Vec3): Mat3 {
  const [x, y, z] = rotation;
  const cx = Math.cos(x);
  const sx = Math.sin(x);
  const cy = Math.cos(y);
  const sy = Math.sin(y);
  const cz = Math.cos(z);
  const sz = Math.sin(z);
  return [
    cy * cz,
    -cy * sz,
    sy,
    cx * sz + sx * sy * cz,
    cx * cz - sx * sy * sz,
    -sx * cy,
    sx * sz - cx * sy * cz,
    sx * cz + cx * sy * sz,
    cx * cy,
  ];
}

export function apply(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

/** Transpose, which for a rotation is the inverse. */
export function transposeApply(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0] * v[0] + m[3] * v[1] + m[6] * v[2],
    m[1] * v[0] + m[4] * v[1] + m[7] * v[2],
    m[2] * v[0] + m[5] * v[1] + m[8] * v[2],
  ];
}

export function subtract(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function scale(v: Vec3, k: number): Vec3 {
  return [v[0] * k, v[1] * k, v[2] * k];
}

export function length(v: Vec3): number {
  return Math.hypot(v[0], v[1], v[2]);
}

export function normalise(v: Vec3): Vec3 {
  const len = length(v) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

export function rotateY(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

export interface LegSolution {
  readonly thigh: Vec3;
  readonly shin: Vec3;
  /** True when the target was out of reach and the leg was left straight toward it. */
  readonly overreached: boolean;
}

/** Rodrigues: rotate a vector about an arbitrary axis. */
export function rotateAbout(v: Vec3, axis: Vec3, angle: number): Vec3 {
  const k = normalise(axis);
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const dot = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
  const cross: Vec3 = [
    k[1] * v[2] - k[2] * v[1],
    k[2] * v[0] - k[0] * v[2],
    k[0] * v[1] - k[1] * v[0],
  ];
  return [
    v[0] * c + cross[0] * s + k[0] * dot * (1 - c),
    v[1] * c + cross[1] * s + k[1] * dot * (1 - c),
    v[2] * c + cross[2] * s + k[2] * dot * (1 - c),
  ];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

/** Extracts XYZ euler from a rotation matrix, matching three.js's own decomposition. */
export function matrixToEuler(m: Mat3): Vec3 {
  const y = Math.asin(Math.max(-1, Math.min(1, m[2])));
  if (Math.abs(m[2]) < 0.9999999) {
    return [Math.atan2(-m[5], m[8]), y, Math.atan2(-m[1], m[0])];
  }
  return [Math.atan2(m[7], m[4]), y, 0];
}

/**
 * Solves a hip-knee-ankle chain so the ankle lands on `target`.
 *
 * Both vectors are in the hip's own space. The knee is driven toward `pole` — forward, for a
 * human leg — by building the thigh's basis explicitly rather than by pre-rotating about the
 * parent axis. The first version did the latter, and it is correct only when the target is
 * directly fore-and-aft: any sideways component and the bend leaves the plane containing the
 * target, so the ankle misses. The forward-kinematics test is what caught that.
 */
export function solveLeg(
  target: Vec3,
  thighLength: number,
  shinLength: number,
  pole: Vec3 = [0, 0, 1],
): LegSolution {
  const distance = length(target);
  const reach = thighLength + shinLength;
  const minimum = Math.abs(thighLength - shinLength) + 1e-4;
  const clamped = Math.max(minimum, Math.min(reach - 1e-5, distance));
  const direction = normalise(target);

  // The plane the knee bends in: perpendicular to both the leg's line and the pole. The order
  // of this cross product decides which side of the leg the knee ends up on, and the wrong one
  // gives a knee that bends backwards — which the forward-kinematics test cannot see, because
  // the ankle still lands correctly either way. It takes a separate check on the knee itself.
  let axis = cross(pole, direction);
  if (length(axis) < 1e-5) axis = cross([1, 0, 0], direction);
  axis = normalise(axis);

  const cosHip =
    (thighLength * thighLength + clamped * clamped - shinLength * shinLength) / (2 * thighLength * clamped);
  const hipAngle = Math.acos(Math.max(-1, Math.min(1, cosHip)));
  const cosKnee =
    (thighLength * thighLength + shinLength * shinLength - clamped * clamped) / (2 * thighLength * shinLength);
  const bend = Math.PI - Math.acos(Math.max(-1, Math.min(1, cosKnee)));

  // Lean the thigh off the straight line; the knee bend brings the ankle back onto target.
  const thighDirection = rotateAbout(direction, axis, -hipAngle);

  // Build the thigh's basis so its local X *is* the bend axis, which makes the shin's bend
  // exact by construction rather than by approximation.
  const yLocal: Vec3 = [-thighDirection[0], -thighDirection[1], -thighDirection[2]];
  const xLocal = axis;
  const zLocal = cross(xLocal, yLocal);
  const matrix: Mat3 = [
    xLocal[0], yLocal[0], zLocal[0],
    xLocal[1], yLocal[1], zLocal[1],
    xLocal[2], yLocal[2], zLocal[2],
  ];

  return {
    thigh: matrixToEuler(matrix),
    shin: [bend, 0, 0],
    overreached: distance > reach - 1e-4,
  };
}

/** Where the ankle ends up for a given solution — the round trip the tests check. */
export function legTip(thigh: Vec3, shin: Vec3, thighLength: number, shinLength: number): Vec3 {
  const thighMatrix = eulerToMatrix(thigh);
  const knee = apply(thighMatrix, [0, -thighLength, 0]);
  const shinMatrix = eulerToMatrix(shin);
  const lower = apply(thighMatrix, apply(shinMatrix, [0, -shinLength, 0]));
  return add(knee, lower);
}
