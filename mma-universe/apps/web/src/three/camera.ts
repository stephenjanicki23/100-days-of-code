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
  REPLAY: { offset: [3.1, 1.9, 1.0], lookHeight: 1.28, fov: 42 },
  CORNER: { offset: [-1.7, 2.1, -3.1], lookHeight: 1.2, fov: 46 },
};

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
export function solveCamera(hint: CameraHint, centreX: number, centreZ: number, time: number): CameraSolution {
  const preset = CAMERA_PRESETS[hint] ?? CAMERA_PRESETS.BROADCAST;

  let x = centreX + preset.offset[0];
  let y = preset.offset[1];
  let z = centreZ + preset.offset[2];

  x += Math.sin(time * 0.53) * 0.035 + Math.sin(time * 1.31) * 0.012;
  y += Math.sin(time * 0.71 + 1.4) * 0.022;
  z += Math.sin(time * 0.43 + 2.6) * 0.03;

  // Keep the lens inside the fence; a post in the foreground ruins any framing.
  const reach = Math.hypot(x, z);
  if (reach > CAMERA_LEASH) {
    x *= CAMERA_LEASH / reach;
    z *= CAMERA_LEASH / reach;
  }

  return {
    position: [x, y, z],
    target: [centreX, preset.lookHeight + Math.sin(time * 0.61 + 0.8) * 0.012, centreZ],
    fov: preset.fov,
  };
}
