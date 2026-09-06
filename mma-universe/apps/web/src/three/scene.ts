/**
 * The arena: cage, canvas, lighting and the camera presets the `CameraHint` resolves to.
 *
 * Everything is built from primitives and flat colours — no textures, no imported meshes —
 * which keeps the viewer free of any downloaded asset and keeps the whole page under a
 * megabyte of code. The cage is a regulation octagon: 9.1 m across the flats, 1.83 m of fence.
 */

import * as THREE from 'three';

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
  const canvasMaterial = track(
    new THREE.MeshStandardMaterial({ color: 0xa7aeba, roughness: 0.95, metalness: 0 }),
  );
  const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
  canvas.rotation.x = -Math.PI / 2;
  canvas.receiveShadow = true;
  group.add(canvas);

  // The apron the cage sits on, so the canvas does not float in the dark.
  const apronGeometry = track(new THREE.CylinderGeometry(CAGE_RADIUS + 1.1, CAGE_RADIUS + 1.4, 0.9, 8, 1));
  const apronMaterial = track(new THREE.MeshStandardMaterial({ color: 0x16181f, roughness: 1 }));
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
  const postMaterial = track(new THREE.MeshStandardMaterial({ color: 0x2a2f3a, roughness: 0.6, metalness: 0.3 }));
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
  const ambient = new THREE.HemisphereLight(0x8695b2, 0x0b0d12, 0.42);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff6ea, 2.6);
  key.position.set(3.4, 9.5, 4.2);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 26;
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.bias = -0.0012;
  scene.add(key);

  const rimA = new THREE.SpotLight(0x6f97ff, 18, 22, Math.PI / 5, 0.7, 1.5);
  rimA.position.set(-7, 6.5, -6);
  scene.add(rimA);

  const rimB = new THREE.SpotLight(0xff8a6a, 12, 22, Math.PI / 5, 0.7, 1.5);
  rimB.position.set(7.5, 6, -5.5);
  scene.add(rimB);

  return () => {
    scene.remove(ambient, key, rimA, rimB);
    key.dispose();
    rimA.dispose();
    rimB.dispose();
  };
}

export { CAMERA_LEASH, CAMERA_PRESETS } from './camera.ts';
export type { CameraPreset } from './camera.ts';
