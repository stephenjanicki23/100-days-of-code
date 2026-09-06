/**
 * The arena: cage, canvas, lighting and the camera presets the `CameraHint` resolves to.
 *
 * Everything is built from primitives and flat colours — no textures, no imported meshes —
 * which keeps the viewer free of any downloaded asset and keeps the whole page under a
 * megabyte of code. The cage is a regulation octagon: 9.1 m across the flats, 1.83 m of fence.
 */

import * as THREE from 'three';
import { surfaceNoise } from './textures.ts';

export const CAGE_RADIUS = 4.55;
export const FENCE_HEIGHT = 1.83;

/** The eight fence posts, measured from the cage centre. */
function octagon(radius: number): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
    points.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius));
  }
  return points;
}

export interface Arena {
  readonly group: THREE.Group;
  dispose(): void;
}

export function buildArena(): Arena {
  const group = new THREE.Group();
  const disposables: { dispose(): void }[] = [];

  const track = <T extends { dispose(): void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  const corners = octagon(CAGE_RADIUS);

  // Canvas.
  const shape = new THREE.Shape();
  corners.forEach((point, index) => {
    if (index === 0) shape.moveTo(point.x, point.y);
    else shape.lineTo(point.x, point.y);
  });
  shape.closePath();

  const canvasGeometry = track(new THREE.ShapeGeometry(shape));
  const noise = surfaceNoise();
  const canvasMaterial = track(
    new THREE.MeshStandardMaterial({
      color: 0x6e757f,
      roughness: 0.94,
      metalness: 0,
      roughnessMap: noise,
      bumpMap: noise,
      bumpScale: 0.004,
    }),
  );
  const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
  canvas.rotation.x = -Math.PI / 2;
  canvas.receiveShadow = true;
  group.add(canvas);

  // The apron the cage sits on, so the canvas does not float in the dark.
  const apronGeometry = track(new THREE.CylinderGeometry(CAGE_RADIUS + 1.1, CAGE_RADIUS + 1.4, 0.9, 8, 1));
  const apronMaterial = track(
    new THREE.MeshStandardMaterial({ color: 0x101319, roughness: 1, roughnessMap: noise }),
  );
  const apron = new THREE.Mesh(apronGeometry, apronMaterial);
  apron.position.y = -0.46;
  apron.rotation.y = Math.PI / 8;
  apron.receiveShadow = true;
  group.add(apron);

  // Centre mark, purely so the eye has a reference for where the fighters are standing.
  const markGeometry = track(new THREE.RingGeometry(1.05, 1.2, 48));
  const markMaterial = track(
    new THREE.MeshBasicMaterial({ color: 0x8e97a6, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
  );
  const mark = new THREE.Mesh(markGeometry, markMaterial);
  mark.rotation.x = -Math.PI / 2;
  mark.position.y = 0.005;
  group.add(mark);

  // Posts.
  const postGeometry = track(new THREE.CylinderGeometry(0.075, 0.075, FENCE_HEIGHT + 0.16, 10));
  const postMaterial = track(
    new THREE.MeshStandardMaterial({ color: 0x23272f, roughness: 0.45, metalness: 0.55, roughnessMap: noise }),
  );
  for (const corner of corners) {
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.set(corner.x, (FENCE_HEIGHT + 0.16) / 2, corner.y);
    post.castShadow = true;
    group.add(post);
  }

  // Fence: a diamond lattice per panel, drawn as line segments rather than a texture.
  const fencePoints: number[] = [];
  const rails: number[] = [];
  for (let i = 0; i < corners.length; i++) {
    const from = corners[i];
    const to = corners[(i + 1) % corners.length];
    if (!from || !to) continue;
    const steps = 14;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = from.x + (to.x - from.x) * t;
      const z = from.y + (to.y - from.y) * t;
      // Verticals, then a diagonal in each direction to read as chain link.
      fencePoints.push(x, 0.06, z, x, FENCE_HEIGHT, z);
      if (s < steps) {
        const nt = (s + 1) / steps;
        const nx = from.x + (to.x - from.x) * nt;
        const nz = from.y + (to.y - from.y) * nt;
        for (let band = 0; band < 5; band++) {
          const y0 = 0.06 + (FENCE_HEIGHT - 0.06) * (band / 5);
          const y1 = 0.06 + (FENCE_HEIGHT - 0.06) * ((band + 1) / 5);
          fencePoints.push(x, y0, z, nx, y1, nz);
          fencePoints.push(x, y1, z, nx, y0, nz);
        }
      }
    }
    for (const y of [0.06, FENCE_HEIGHT]) rails.push(from.x, y, from.y, to.x, y, to.y);
  }

  const fenceGeometry = track(new THREE.BufferGeometry());
  fenceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fencePoints, 3));
  const fenceMaterial = track(new THREE.LineBasicMaterial({ color: 0x6d7686, transparent: true, opacity: 0.32 }));
  group.add(new THREE.LineSegments(fenceGeometry, fenceMaterial));

  const railGeometry = track(new THREE.BufferGeometry());
  railGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rails, 3));
  const railMaterial = track(new THREE.LineBasicMaterial({ color: 0xd8dde6, transparent: true, opacity: 0.55 }));
  group.add(new THREE.LineSegments(railGeometry, railMaterial));

  return {
    group,
    dispose() {
      for (const item of disposables) item.dispose();
      disposables.length = 0;
    },
  };
}

export function buildLighting(scene: THREE.Scene): () => void {
  /**
   * Lighting motivated by the room rather than by taste.
   *
   * An arena hangs a bank of hard lights directly over the cage: that is what gives fighters
   * their pooled highlights, short shadows straight down, and a dark surround. Four spots in a
   * square over the canvas do the same job here, and the environment map supplies the bounce
   * that punctual lights alone cannot.
   */
  const ambient = new THREE.HemisphereLight(0x6d7c99, 0x07090d, 0.12);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff2e0, 1.5);
  key.position.set(2.6, 10.5, 3.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 22;
  key.shadow.camera.left = -5.5;
  key.shadow.camera.right = 5.5;
  key.shadow.camera.top = 5.5;
  key.shadow.camera.bottom = -5.5;
  key.shadow.bias = -0.0009;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 2;
  scene.add(key);

  const bank: THREE.SpotLight[] = [];
  for (const [x, z] of [
    [-3.2, -3.2],
    [3.2, -3.2],
    [-3.2, 3.2],
    [3.2, 3.2],
  ] as const) {
    const lamp = new THREE.SpotLight(0xfff4e6, 11, 16, Math.PI / 4.6, 0.55, 1.6);
    lamp.position.set(x, 7.4, z);
    lamp.target.position.set(x * 0.25, 1, z * 0.25);
    scene.add(lamp, lamp.target);
    bank.push(lamp);
  }

  // One cool kicker from behind — what separates a body from a black background on camera.
  const rim = new THREE.SpotLight(0x9dbcff, 14, 20, Math.PI / 5, 0.7, 1.5);
  rim.position.set(-6.5, 4.6, -5.2);
  rim.target.position.set(0, 1.1, 0);
  scene.add(rim, rim.target);

  return () => {
    scene.remove(ambient, key, rim, rim.target);
    for (const lamp of bank) scene.remove(lamp, lamp.target);
    key.dispose();
    rim.dispose();
    for (const lamp of bank) lamp.dispose();
  };
}

export { CAMERA_LEASH, CAMERA_PRESETS } from './camera.ts';
export type { CameraPreset } from './camera.ts';
