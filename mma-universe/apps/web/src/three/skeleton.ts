/**
 * The three.js fighter: the skeleton spec, built.
 *
 * Everything about *what* the fighter does lives in `rig.ts`, `poses.ts` and `clips.ts`;
 * this file only knows how to draw a joint hierarchy and push a resolved pose into it. The
 * split is what lets the choreography be unit-tested with no browser and no GPU.
 *
 * The figures are primitives — capsules, boxes and spheres — rather than imported meshes.
 * That is the deliberate cost of building the renderer with no downloaded assets: the
 * fighters read as stylised. Swapping in a rigged glTF character later means replacing this
 * file and nothing else, because the pose it consumes is joint rotations, which any humanoid
 * rig accepts.
 */

import * as THREE from 'three';
import type { Joint, Vec3 } from './rig.ts';
import { JOINT_ORDER, SKELETON } from './rig.ts';
import type { ResolvedPose } from './blend.ts';

export interface FighterPalette {
  readonly skin: number;
  readonly trunks: number;
  readonly gloves: number;
}

export const PALETTE_A: FighterPalette = { skin: 0xc98c62, trunks: 0xd23b46, gloves: 0xe23c3c };
export const PALETTE_B: FighterPalette = { skin: 0x8d5a3b, trunks: 0x2f6fd0, gloves: 0x3b6ee2 };

/** Joints drawn in trunks rather than skin. */
const TRUNKS: ReadonlySet<Joint> = new Set<Joint>(['hips', 'thighL', 'thighR']);
const GLOVES: ReadonlySet<Joint> = new Set<Joint>(['handL', 'handR']);

function geometryFor(joint: Joint): THREE.BufferGeometry {
  const bone = SKELETON[joint];
  const { length, radius, shape, axis } = bone;

  if (shape === 'SPHERE') {
    return new THREE.SphereGeometry(radius, 16, 12);
  }
  if (shape === 'CAPSULE') {
    return new THREE.CapsuleGeometry(radius, Math.max(length - radius * 2, 0.02), 6, 12);
  }
  if (axis === 'FORWARD') {
    return new THREE.BoxGeometry(radius * 2, radius * 1.3, length);
  }
  return new THREE.BoxGeometry(radius * 2, length, radius * 1.15);
}

/** Where the drawn bone sits relative to its joint origin. */
function meshOffset(joint: Joint): Vec3 {
  const { length, axis, shape, radius } = SKELETON[joint];
  if (shape === 'SPHERE') {
    if (axis === 'UP') return [0, length / 2, 0];
    return [0, -length / 2, 0];
  }
  if (axis === 'FORWARD') return [0, -radius * 0.3, length / 2 - 0.06];
  return axis === 'UP' ? [0, length / 2, 0] : [0, -length / 2, 0];
}

export class FighterModel {
  readonly root: THREE.Group;
  private readonly joints = new Map<Joint, THREE.Object3D>();
  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];

  constructor(palette: FighterPalette) {
    this.root = new THREE.Group();

    const skin = new THREE.MeshStandardMaterial({ color: palette.skin, roughness: 0.72, metalness: 0.02 });
    const trunks = new THREE.MeshStandardMaterial({ color: palette.trunks, roughness: 0.85 });
    const gloves = new THREE.MeshStandardMaterial({ color: palette.gloves, roughness: 0.45 });
    this.materials.push(skin, trunks, gloves);

    for (const joint of JOINT_ORDER) {
      const bone = SKELETON[joint];
      const node = new THREE.Group();
      node.position.set(bone.offset[0], bone.offset[1], bone.offset[2]);

      const geometry = geometryFor(joint);
      this.geometries.push(geometry);
      const material = GLOVES.has(joint) ? gloves : TRUNKS.has(joint) ? trunks : skin;
      const mesh = new THREE.Mesh(geometry, material);
      const [ox, oy, oz] = meshOffset(joint);
      mesh.position.set(ox, oy, oz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      node.add(mesh);

      const parent = bone.parent === null ? this.root : this.joints.get(bone.parent);
      if (!parent) throw new Error(`joint ${joint} has an unbuilt parent`);
      parent.add(node);
      this.joints.set(joint, node);
    }
  }

  /** Pushes a resolved pose into the hierarchy. Called once per fighter per frame. */
  applyPose(pose: ResolvedPose): void {
    for (const [joint, node] of this.joints) {
      const rotation = pose.joints[joint];
      node.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
    const hips = this.joints.get('hips');
    if (hips) {
      const base = SKELETON.hips.offset;
      hips.position.set(base[0] + pose.offset[0], base[1] + pose.offset[1], base[2] + pose.offset[2]);
    }
  }

  setPlacement(position: Vec3, yaw: number): void {
    this.root.position.set(position[0], position[1], position[2]);
    this.root.rotation.y = yaw;
  }

  /** World position of the head, which the camera frames on. */
  headPosition(target: THREE.Vector3): THREE.Vector3 {
    const head = this.joints.get('head');
    if (!head) return target.set(0, 1.6, 0);
    return head.getWorldPosition(target);
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
    this.geometries.length = 0;
    this.materials.length = 0;
    this.joints.clear();
  }
}
