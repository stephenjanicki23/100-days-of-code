/**
 * A portrait stand for the fighters.
 *
 * Character work cannot be judged from the broadcast camera. At that distance a head is forty
 * pixels tall, so a face either reads or it does not and there is no way to see *why* — which
 * is how a model with no nose on it survived two renderers and a path tracer.
 *
 * This puts one fighter under the arena's own lights and materials, at four fixed angles, with
 * nothing else in the frame. It is a development harness, not part of the viewer: it ships
 * nowhere and is built on demand.
 */

import * as THREE from 'three';

import { FighterModel } from '../three/skeleton.ts';
import { PALETTE_A } from '../three/palette.ts';
import { buildLighting } from '../three/scene.ts';
import { resolvePose } from '../three/blend.ts';
import { CLIPS } from '../three/clips.ts';

declare global {
  interface Window {
    __READY__?: boolean;
    __POSE__?: (shot: string) => void;
  }
}

/** Where the camera stands and what it looks at, for each angle worth checking. */
const SHOTS: Record<string, { position: [number, number, number]; target: [number, number, number]; fov: number }> = {
  front: { position: [0, 1.63, 0.62], target: [0, 1.6, 0], fov: 30 },
  'three-quarter': { position: [0.42, 1.66, 0.48], target: [0, 1.59, 0], fov: 30 },
  profile: { position: [0.66, 1.62, 0.06], target: [0, 1.59, 0], fov: 30 },
  torso: { position: [0.5, 1.45, 1.5], target: [0, 1.25, 0], fov: 38 },
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.72;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c0e13);
buildLighting(scene);

// A floor, only so the fighter has something to drop a shadow onto and is not floating.
const floor = new THREE.Mesh(
  new THREE.CircleGeometry(3, 48).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: 0x2a2f38, roughness: 0.95 }),
);
floor.receiveShadow = true;
scene.add(floor);

const fighter = new FighterModel(PALETTE_A);
fighter.applyPose(resolvePose(CLIPS.stance_idle!.keys[0]!.pose));
scene.add(fighter.root);

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.05, 40);

function look(shot: string): void {
  const spec = SHOTS[shot] ?? SHOTS.front!;
  camera.position.set(...spec.position);
  camera.lookAt(...spec.target);
  camera.fov = spec.fov;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}

window.__POSE__ = look;
look('front');
window.__READY__ = true;
