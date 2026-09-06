/**
 * Generated textures.
 *
 * Every surface in the scene shares one tiling noise map, used for roughness variation and a
 * faint bump. It is generated on a canvas rather than downloaded, which keeps the project free
 * of any asset licence — and, more usefully here, means the same file lights skin, canvas and
 * fabric consistently.
 */

import * as THREE from 'three';

/**
 * A small tiling noise texture, generated rather than downloaded.
 *
 * Uniform roughness is one of the strongest tells of a synthetic render — real skin has pores,
 * sweat and unevenness that break up a highlight. A few octaves of value noise on a canvas is
 * enough to stop the specular reading as moulded plastic, and it costs nothing to ship.
 */
export function noiseTexture(size = 256, contrast = 0.5): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.Texture();
  const image = context.createImageData(size, size);

  // Deterministic value noise: the same fighters look the same on every load.
  const hash = (x: number, y: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const smooth = (x: number, y: number, scale: number) => {
    const fx = x / scale;
    const fy = y / scale;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    const tx = fx - ix;
    const ty = fy - iy;
    const ex = tx * tx * (3 - 2 * tx);
    const ey = ty * ty * (3 - 2 * ty);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return (a + (b - a) * ex) * (1 - ey) + (c + (d - c) * ex) * ey;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const value = smooth(x, y, 26) * 0.55 + smooth(x, y, 9) * 0.3 + smooth(x, y, 3) * 0.15;
      const level = Math.round(255 * (0.5 + (value - 0.5) * contrast));
      const offset = (y * size + x) * 4;
      image.data[offset] = level;
      image.data[offset + 1] = level;
      image.data[offset + 2] = level;
      image.data[offset + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

let shared: THREE.Texture | undefined;

/** The shared map. Built once; every material points at the same GPU texture. */
export function surfaceNoise(): THREE.Texture {
  shared ??= noiseTexture(256, 0.75);
  return shared;
}

