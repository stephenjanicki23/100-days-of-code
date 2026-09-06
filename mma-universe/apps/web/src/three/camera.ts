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
