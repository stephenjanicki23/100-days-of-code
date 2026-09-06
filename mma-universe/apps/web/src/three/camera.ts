/**
 * Camera framing.
 *
 * Split out from `scene.ts` so it imports nothing: the presets are data the choreography
 * tests assert on, and pulling three.js into a node test run to read a table of offsets
 * would be silly. It is also the file to retune when the framing is wrong, which is the
 * point of the simulation only ever naming a *hint*.
 */

import type { CameraHint } from '../types.ts';

export interface CameraPreset {
  /** Offset from the engagement centre, in world space so framing never spins. */
  readonly offset: readonly [number, number, number];
  /** Height above the canvas the camera looks at. */
  readonly lookHeight: number;
  readonly fov: number;
}

/**
 * The renderer's own interpretation of the `CameraHint` the mapper attaches to each beat.
 * The simulation never states a camera position — only that a beat is, say, decisive — which
 * is what lets this table be retuned without touching the engine.
 */
/**
 * Maximum distance from the cage centre a camera may sit.
 *
 * Every angle shoots from inside the fence. Shooting from outside is what a broadcast
 * actually does, but a fence post a metre from the lens fills a third of the frame, and no
 * amount of transparency fixes an opaque cylinder — so the cameras come inside and the fence
 * becomes the backdrop rather than the foreground.
 */
export const CAMERA_LEASH = 3.9;

/**
 * How far out the lens may go when holding the soft leash would put it inside a fighter.
 *
 * The leash above is an aesthetic limit, not a wall — the mesh itself is at 4.55 m. With the
 * fight now spending real time against the fence there are angles where 3.9 m leaves less
 * than a metre of room in front of the lens, and a shot from inside somebody's head is worse
 * than a shot with the fence a hand's width behind the camera.
 */
export const CAMERA_REACH = 4.42;
/** The closest the lens will stand to the action before it starts spending that slack. */
const MIN_STANDOFF = 2.1;

/** Metres off the cage centre at which the rig starts swinging round to the open side. */
const SWING_START = 0.9;
/** And where it is fully round, shooting across the cage at a man on the fence. */
const SWING_FULL = 2.7;

/**
 * The renderer's own interpretation of the `CameraHint` the mapper attaches to each beat.
 * The simulation never states a camera position — only that a beat is, say, decisive — which
 * is what lets this table be retuned without touching the engine.
 */
export const CAMERA_PRESETS: Readonly<Record<CameraHint, CameraPreset>> = {
  WIDE: { offset: [-3.5, 3.4, 1.5], lookHeight: 1.0, fov: 52 },
  BROADCAST: { offset: [-3.35, 2.0, 1.15], lookHeight: 1.15, fov: 46 },
  CLOSE: { offset: [-2.75, 1.8, 0.95], lookHeight: 1.32, fov: 42 },
  IMPACT: { offset: [-2.5, 1.7, 0.85], lookHeight: 1.38, fov: 42 },
  GROUND_OVERHEAD: { offset: [-2.5, 3.3, 0.9], lookHeight: 0.35, fov: 46 },
  CAGE_SIDE: { offset: [-2.6, 1.65, 2.4], lookHeight: 1.1, fov: 44 },
  // The reverse angle used to shoot from the other side of the fighters, which reads well and
  // is unusable once the fight lives near the fence: the side the shot is taken from is now
  // chosen for room, and this one asked for whichever side was left over. Reversed along the
  // axis instead — the fighters still swap sides of frame, which is what makes a replay angle
  // read as one, and it inherits the side that has space in it.
  REPLAY: { offset: [-3.1, 1.9, -1.05], lookHeight: 1.28, fov: 42 },
  // Widened off the line of the fighters. A corner shot is meant to be oblique, but authored
  // at under thirty degrees it had almost no room left after being brought inside the fence,
  // and an oblique shot with the near man eclipsing the far one is just a bad shot.
  CORNER: { offset: [-2.4, 2.1, -2.85], lookHeight: 1.2, fov: 46 },
};

/**
 * Builds the camera offset in the *fighters'* frame rather than world space, and keeps it
 * inside the fence.
 *
 * Two failures live here, and the second was created by fixing the first.
 *
 * The offsets are world-space vectors that all shoot from roughly the same side, which was
 * fine while the fight stayed near the centre mark. Once the fighters actually work the cage
 * it falls apart: with the engagement three and a half metres out on the camera's own side,
 * the lens wants to be past the fence, gets dragged back in by the leash, and ends up standing
 * between the two men filming somebody's back.
 *
 * Swinging the rig round to the open side fixes that and immediately causes the other one.
 * The pair face along the axis they are being driven down, which now points out at the fence —
 * so a camera placed on the inward radius is looking straight down the line of the two men,
 * and the near fighter eclipses the far one.
 *
 * Both go away if the offsets are read as what they always meant: so far to the side of the
 * pair, so far along the axis between them. Read that way an offset is already well off the
 * line of the fighters — the broadcast angle sits about seventy degrees round from it — and it
 * stays that way wherever in the cage the fight has got to.
 *
 * That leaves only the fence. When the offset would put the lens outside, its radial part is
 * mirrored back in: still the same side of the pair, still the same angle across them, taken
 * from open space with the mesh behind — which is the shot a broadcast actually cuts to when
 * a man is put on the cage. The mirror is faded in with distance from the middle and is zero
 * at the moment the radial part changes sign, so the framing drifts rather than cuts.
 */
function place(
  offset: readonly [number, number, number],
  centreX: number,
  centreZ: number,
  facing: number,
  side: number,
): [number, number] {
  // The pair's own axis, and which side of it this shot is being taken from.
  const alongX = Math.sin(facing);
  const alongZ = Math.cos(facing);
  const sideX = alongZ * side;
  const sideZ = -alongX * side;

  let x = offset[0] * sideX + offset[2] * alongX;
  let z = offset[0] * sideZ + offset[2] * alongZ;

  const out = Math.hypot(centreX, centreZ);
  if (out < SWING_START) return [x, z];

  const raw = Math.min(1, (out - SWING_START) / (SWING_FULL - SWING_START));
  const weight = raw * raw * (3 - 2 * raw);
  const outX = centreX / out;
  const outZ = centreZ / out;

  // Only the part that stands the camera further *down the axis* is mirrored, never the part
  // that holds it out to the side. Mirroring the whole outward component looks like the same
  // idea and is not: it rotates the shot, and on the way round it passes straight through the
  // line of the two fighters — which is the thing this is here to avoid. Flipping the
  // along-axis part alone can only ever swing the lens wider of that line, never onto it, so
  // a shot authored seventy degrees off the pair stays at least seventy degrees off them.
  //
  // What it means on the mat: with a man pinned on the mesh, the camera moves round behind
  // the fighter doing the pinning and shoots back into him. Which is the angle it wants.
  const along = offset[2] * (alongX * outX + alongZ * outZ);
  if (along > 0) {
    const mirror = 2 * along * weight;
    x -= mirror * outX;
    z -= mirror * outZ;
  }
  return [x, z];
}

/** The largest `k` in zero to one with `|centre + k * offset|` no more than `limit`. */
function fit(centreX: number, centreZ: number, offX: number, offZ: number, limit: number): number {
  const a = offX * offX + offZ * offZ;
  if (a === 0) return 1;
  const b = 2 * (centreX * offX + centreZ * offZ);
  const c = centreX * centreX + centreZ * centreZ - limit * limit;
  if (a + b + c <= 0) return 1;
  return Math.min(1, Math.max(0, (-b + Math.sqrt(Math.max(0, b * b - 4 * a * c))) / (2 * a)));
}

/**
 * How much of the way along its own sightline the camera may stand.
 *
 * Reining the lens in along its own sightline rather than dragging it toward the middle of
 * the cage is the point: shortening a shot keeps its angle on the fighters, while moving it
 * sideways is how a broadcast angle becomes a shot of somebody's shoulder.
 *
 * It holds the soft leash while that still leaves room to see anything, and spends the slack
 * out to the mesh only when it does not. Every term is continuous in the fight's position, so
 * the framing tightens and eases rather than cutting.
 */
function leash(centreX: number, centreZ: number, offX: number, offZ: number): number {
  const soft = fit(centreX, centreZ, offX, offZ, CAMERA_LEASH);
  if (soft === 1) return 1;
  const wanted = MIN_STANDOFF / Math.hypot(offX, offZ);
  const hard = fit(centreX, centreZ, offX, offZ, CAMERA_REACH);
  return Math.min(1, Math.max(soft, Math.min(hard, wanted)));
}

/**
 * Which side of the two fighters each shot is taken from, decided once per beat.
 *
 * There is no continuous answer to this. Whichever side of the pair the lens is on, turning
 * the fighters far enough swings it at the fence, and the only cure is to cross to the other
 * side — which is a jump of six or seven metres however it is dressed up. Choosing per frame
 * puts that jump in the middle of a shot; choosing per beat puts it where the camera is
 * allowed to cut anyway, next to the cuts between angles that were already there.
 *
 * So the side is walked once when the timeline is built, like the footwork and the cage walk,
 * and it is sticky: it crosses only when the side it is on has become clearly worse, not
 * merely worse, so a pair turning slowly on the spot do not make the camera flit back and
 * forth across them.
 */
export function planCameraSides(
  seats: readonly { readonly centre: readonly [number, number]; readonly facing: number }[],
): number[] {
  const sides: number[] = [];
  let side = 1;
  for (const seat of seats) {
    const here = crowding(seat.centre[0], seat.centre[1], seat.facing, side);
    const there = crowding(seat.centre[0], seat.centre[1], seat.facing, -side);
    // Cross when the far side is clearly roomier — or the moment this one has run out of
    // room altogether, where any improvement is worth the cut.
    if (there < here - SIDE_HYSTERESIS || (here > CAMERA_LEASH && there < here)) side = -side;
    sides.push(side);
  }
  return sides;
}

/** How far out a representative lens would be pushed on this side: less is more room. */
function crowding(centreX: number, centreZ: number, facing: number, side: number): number {
  const placed = place(NOMINAL, centreX, centreZ, facing, side);
  return Math.hypot(centreX + placed[0], centreZ + placed[1]);
}

/** A stand-in for the table, so every angle in one beat agrees on which side it shoots from. */
const NOMINAL: readonly [number, number, number] = [-3.2, 2.0, 1.1];
/** Metres of extra room the far side must offer before the camera will cross the fighters. */
const SIDE_HYSTERESIS = 0.75;

export interface CameraSolution {
  readonly position: readonly [number, number, number];
  readonly target: readonly [number, number, number];
  readonly fov: number;
}

/**
 * Where the camera actually sits for a beat, as a pure function.
 *
 * Extracted from the viewer so the offline renderer frames a shot exactly as the live one
 * does. Two implementations of "where is the camera" would drift, and the whole point of the
 * offline path is that it is the same fight seen through a better lens — not a different shot.
 *
 * The handheld float is deliberate: a camera on a perfect spline reads as CAD rather than
 * coverage. It is a function of the timeline clock, so a paused frame is stable and a replay
 * is identical.
 */
export function solveCamera(
  hint: CameraHint,
  centreX: number,
  centreZ: number,
  time: number,
  facing = 0,
  side = 1,
): CameraSolution {
  const preset = CAMERA_PRESETS[hint] ?? CAMERA_PRESETS.BROADCAST;
  const placed = place(preset.offset, centreX, centreZ, facing, side);

  // The handheld float is deliberate, and belongs to the offset rather than the position, so
  // that reining the lens in below cannot argue with it.
  const offX = placed[0] + Math.sin(time * 0.53) * 0.035 + Math.sin(time * 1.31) * 0.012;
  const offZ = placed[1] + Math.sin(time * 0.43 + 2.6) * 0.03;
  const y = preset.offset[1] + Math.sin(time * 0.71 + 1.4) * 0.022;

  // Keep the lens inside the fence; a post in the foreground ruins any framing. Done by
  // walking the camera in along its own sightline rather than by pulling the position toward
  // the middle of the cage: shortening a shot keeps its angle on the fighters, while dragging
  // it sideways is how a broadcast angle turns into a shot of somebody's shoulder.
  const near = leash(centreX, centreZ, offX, offZ);

  return {
    position: [centreX + offX * near, y, centreZ + offZ * near],
    target: [centreX, preset.lookHeight + Math.sin(time * 0.61 + 0.8) * 0.012, centreZ],
    fov: preset.fov,
  };
}
