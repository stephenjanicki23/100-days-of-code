/**
 * The fighter skeleton, as pure data.
 *
 * This file deliberately imports nothing. The skeleton is a *specification* — joint names,
 * parentage, bone offsets and lengths — so that poses, clips and the whole choreography
 * layer can be authored and unit-tested without a WebGL context. `skeleton.ts` is the only
 * module that turns this spec into three.js objects.
 *
 * Units are metres and radians throughout. A fighter stands 1.82 m with the hips at 0.92 m,
 * which puts the feet on the canvas at y = 0.
 *
 * ## Rotation conventions
 *
 * Bones point along their local axis and joints rotate in XYZ euler order. Two rules follow
 * from that, and every pose in `poses.ts` depends on them:
 *
 *   - For a **DOWN** bone (arms, legs, hanging toward -Y), a **negative X** rotation swings
 *     it forward, toward +Z. Punching and kicking are therefore negative X.
 *   - For an **UP** bone (spine, chest, neck), a **positive X** rotation leans it forward.
 *
 * A fighter's local forward is +Z. Fighter A stands at -Z facing the cage centre; fighter B
 * stands at +Z, yawed by pi to face back.
 */

export const JOINT_NAMES = [
  'hips',
  'spine',
  'chest',
  'neck',
  'head',
  'shoulderL',
  'armL',
  'forearmL',
  'handL',
  'shoulderR',
  'armR',
  'forearmR',
  'handR',
  'thighL',
  'shinL',
  'footL',
  'thighR',
  'shinR',
  'footR',
] as const;

export type Joint = (typeof JOINT_NAMES)[number];

export type Vec3 = readonly [number, number, number];

/** Which way a bone extends from its joint origin. */
export type BoneAxis = 'UP' | 'DOWN' | 'FORWARD';

export type BoneShape = 'BOX' | 'CAPSULE' | 'SPHERE';

export interface BoneSpec {
  /** Parent joint, or null for the skeleton root. */
  readonly parent: Joint | null;
  /** Position of this joint relative to its parent's joint origin. */
  readonly offset: Vec3;
  /** Length of the bone drawn from this joint. */
  readonly length: number;
  readonly axis: BoneAxis;
  /** Half-width of the drawn bone; gloves and the head use it as a radius. */
  readonly radius: number;
  readonly shape: BoneShape;
}

/**
 * The skeleton. Proportions are broadly human but slightly heavier through the chest and
 * gloves than life, because at broadcast camera distance a realistic figure reads as a
 * stick and the strike that lands has to be legible.
 */
export const SKELETON: Readonly<Record<Joint, BoneSpec>> = {
  hips: { parent: null, offset: [0, 0.92, 0], length: 0.14, axis: 'UP', radius: 0.122, shape: 'BOX' },
  spine: { parent: 'hips', offset: [0, 0.14, 0], length: 0.24, axis: 'UP', radius: 0.128, shape: 'BOX' },
  chest: { parent: 'spine', offset: [0, 0.24, 0], length: 0.2, axis: 'UP', radius: 0.152, shape: 'BOX' },
  neck: { parent: 'chest', offset: [0, 0.2, 0], length: 0.07, axis: 'UP', radius: 0.058, shape: 'BOX' },
  head: { parent: 'neck', offset: [0, 0.07, 0], length: 0.2, axis: 'UP', radius: 0.108, shape: 'SPHERE' },

  shoulderL: { parent: 'chest', offset: [0.175, 0.145, 0], length: 0.06, axis: 'DOWN', radius: 0.066, shape: 'SPHERE' },
  armL: { parent: 'shoulderL', offset: [0, -0.06, 0], length: 0.29, axis: 'DOWN', radius: 0.055, shape: 'CAPSULE' },
  forearmL: { parent: 'armL', offset: [0, -0.29, 0], length: 0.26, axis: 'DOWN', radius: 0.047, shape: 'CAPSULE' },
  handL: { parent: 'forearmL', offset: [0, -0.26, 0], length: 0.12, axis: 'DOWN', radius: 0.066, shape: 'SPHERE' },

  shoulderR: { parent: 'chest', offset: [-0.175, 0.145, 0], length: 0.06, axis: 'DOWN', radius: 0.066, shape: 'SPHERE' },
  armR: { parent: 'shoulderR', offset: [0, -0.06, 0], length: 0.29, axis: 'DOWN', radius: 0.055, shape: 'CAPSULE' },
  forearmR: { parent: 'armR', offset: [0, -0.29, 0], length: 0.26, axis: 'DOWN', radius: 0.047, shape: 'CAPSULE' },
  handR: { parent: 'forearmR', offset: [0, -0.26, 0], length: 0.12, axis: 'DOWN', radius: 0.066, shape: 'SPHERE' },

  thighL: { parent: 'hips', offset: [0.095, 0, 0], length: 0.44, axis: 'DOWN', radius: 0.082, shape: 'CAPSULE' },
  shinL: { parent: 'thighL', offset: [0, -0.44, 0], length: 0.43, axis: 'DOWN', radius: 0.068, shape: 'CAPSULE' },
  footL: { parent: 'shinL', offset: [0, -0.43, 0], length: 0.24, axis: 'FORWARD', radius: 0.05, shape: 'BOX' },

  thighR: { parent: 'hips', offset: [-0.095, 0, 0], length: 0.44, axis: 'DOWN', radius: 0.082, shape: 'CAPSULE' },
  shinR: { parent: 'thighR', offset: [0, -0.44, 0], length: 0.43, axis: 'DOWN', radius: 0.068, shape: 'CAPSULE' },
  footR: { parent: 'shinR', offset: [0, -0.43, 0], length: 0.24, axis: 'FORWARD', radius: 0.05, shape: 'BOX' },
};

/** Parents always precede children, so a single forward pass can resolve world transforms. */
export const JOINT_ORDER: readonly Joint[] = (() => {
  const ordered: Joint[] = [];
  const placed = new Set<Joint>();
  while (ordered.length < JOINT_NAMES.length) {
    let progressed = false;
    for (const joint of JOINT_NAMES) {
      if (placed.has(joint)) continue;
      const parent = SKELETON[joint].parent;
      if (parent === null || placed.has(parent)) {
        ordered.push(joint);
        placed.add(joint);
        progressed = true;
      }
    }
    if (!progressed) throw new Error('SKELETON contains a cycle');
  }
  return ordered;
})();

/** Standing hip height, used as the datum every pose offset is relative to. */
export const HIP_HEIGHT = SKELETON.hips.offset[1];
