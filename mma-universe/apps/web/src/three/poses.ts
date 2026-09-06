/**
 * The pose vocabulary.
 *
 * A pose is a sparse map of joint rotations plus an optional hip offset from the standing
 * datum. Sparse matters: a pose states only what differs from the pose it builds on, so a
 * jab is four joints rather than nineteen, and the fighter's legs keep whatever the stance
 * or the ground position put them in.
 *
 * These are authored by hand rather than captured, which is the deliberate trade of option A:
 * no asset downloads, no licences, and the animation data lives in git as reviewable numbers.
 * The figures read as stylised rather than photoreal, and every clip is a diff away from
 * being re-timed.
 *
 * See `rig.ts` for the rotation conventions; briefly, negative X swings a limb forward.
 */

import type { Joint, Vec3 } from './rig.ts';

export interface Pose {
  /** Sparse joint rotations in radians, XYZ euler order. */
  readonly joints: Readonly<Partial<Record<Joint, Vec3>>>;
  /** Hip displacement from the standing datum, in the fighter's local space. */
  readonly offset?: Vec3;
}

/** Builds a pose from a base, overriding only the joints named. */
export function derive(base: Pose, joints: Partial<Record<Joint, Vec3>>, offset?: Vec3): Pose {
  return {
    joints: { ...base.joints, ...joints },
    offset: offset ?? base.offset,
  };
}

/** The rest pose: every joint at zero. Any joint no pose mentions resolves here. */
export const NEUTRAL: Pose = { joints: {}, offset: [0, 0, 0] };

/* ------------------------------------------------------------------ standing */

/**
 * Orthodox fighting stance. The hips drop and yaw so the fighter is bladed rather than
 * square, the rear heel lifts, and the hands sit by the cheekbones.
 */
export const STANCE: Pose = {
  joints: {
    hips: [0.04, -0.34, 0],
    spine: [0.06, 0.12, 0],
    chest: [0.04, 0.1, 0],
    neck: [-0.06, 0, 0],
    head: [0, 0.16, 0],
    shoulderL: [0, 0, -0.12],
    armL: [-0.78, 0.1, -0.16],
    forearmL: [-2.3, 0, 0.2],
    handL: [0, 0, 0],
    shoulderR: [0, 0, 0.12],
    armR: [-0.62, -0.1, 0.2],
    forearmR: [-2.42, 0, -0.24],
    handR: [0, 0, 0],
    thighL: [-0.34, 0.06, 0.06],
    shinL: [0.42, 0, 0],
    footL: [-0.12, 0, 0],
    thighR: [0.3, -0.06, -0.06],
    shinR: [0.5, 0, 0],
    footR: [-0.42, 0, 0],
  },
  offset: [0, -0.075, 0],
};

/** Weight loaded onto the rear leg, the position a power shot is thrown from. */
export const LOADED = derive(
  STANCE,
  { hips: [0.06, -0.42, 0], spine: [0.1, 0.16, 0], thighR: [0.44, -0.06, -0.06], shinR: [0.62, 0, 0] },
  [0, -0.11, -0.05],
);

/* -------------------------------------------------------------------- punches */

/** Lead straight. The lead shoulder rolls through; the rear hand stays home. */
export const JAB = derive(STANCE, {
  hips: [0.04, -0.22, 0],
  chest: [0.04, -0.16, 0],
  shoulderL: [0, 0, -0.3],
  armL: [-1.42, 0.16, -0.06],
  forearmL: [-0.1, 0, 0],
  armR: [-0.58, -0.1, 0.24],
}, [0, -0.075, 0.14]);

export const CROSS = derive(LOADED, {
  hips: [0.05, 0.06, 0],
  spine: [0.1, -0.2, 0],
  chest: [0.05, -0.24, 0],
  shoulderR: [0, 0, 0.3],
  armR: [-1.48, -0.18, 0.06],
  forearmR: [-0.08, 0, 0],
  armL: [-0.7, 0.1, -0.34],
  forearmL: [-2.4, 0, 0.24],
  thighR: [0.12, -0.06, -0.06],
  footR: [-0.62, 0, 0],
}, [0, -0.085, 0.2]);

export const HOOK_L = derive(STANCE, {
  hips: [0.04, -0.02, 0],
  spine: [0.05, -0.24, 0],
  chest: [0.02, -0.2, 0],
  shoulderL: [0, 0, -0.36],
  armL: [-1.62, 0.9, -0.2],
  forearmL: [-1.5, 0, 0],
}, [0, -0.075, 0.13]);

export const HOOK_R = derive(LOADED, {
  hips: [0.04, 0.1, 0],
  spine: [0.06, -0.26, 0],
  chest: [0.03, -0.22, 0],
  shoulderR: [0, 0, 0.36],
  armR: [-1.6, -0.95, 0.2],
  forearmR: [-1.52, 0, 0],
}, [0, -0.09, 0.15]);

export const UPPERCUT = derive(LOADED, {
  hips: [-0.06, 0.04, 0],
  spine: [-0.14, -0.18, 0],
  chest: [-0.1, -0.18, 0],
  // The elbow travels forward, not just up: folded against the ribs the fist finishes beside
  // the fighter's own head, which reads as a guard rather than a punch.
  armR: [-1.15, -0.2, 0.24],
  forearmR: [-1.95, 0, -0.1],
  armL: [-0.72, 0.1, -0.3],
}, [0, -0.09, 0.17]);

export const OVERHAND = derive(LOADED, {
  hips: [0.14, 0.04, 0],
  spine: [0.24, -0.22, 0],
  chest: [0.16, -0.2, 0.14],
  armR: [-2.1, -0.5, 0.2],
  forearmR: [-0.9, 0, 0],
}, [0, -0.08, 0.22]);

export const SUPERMAN = derive(STANCE, {
  hips: [0.3, 0, 0],
  spine: [0.2, -0.18, 0],
  armR: [-1.9, -0.2, 0.06],
  forearmR: [-0.1, 0, 0],
  thighL: [0.9, 0.06, 0.06],
  shinL: [0.9, 0, 0],
  thighR: [1.0, -0.06, -0.06],
  shinR: [0.7, 0, 0],
}, [0, 0.16, 0.24]);

export const BACKFIST = derive(STANCE, {
  hips: [0.04, 0.6, 0],
  spine: [0.04, 0.4, 0],
  chest: [0.02, 0.3, 0],
  armR: [-1.5, -1.2, 0.4],
  forearmR: [-0.4, 0, 0],
}, [0, -0.075, 0.12]);

export const ELBOW = derive(LOADED, {
  hips: [0.04, 0.08, 0],
  spine: [0.08, -0.28, 0],
  chest: [0.04, -0.24, 0],
  shoulderR: [0, 0, 0.44],
  armR: [-1.9, -0.85, 0.3],
  forearmR: [-2.4, 0, 0],
});

/* ---------------------------------------------------------------- knees, kicks */

export const KNEE = derive(STANCE, {
  hips: [-0.16, -0.2, 0],
  spine: [-0.18, 0.08, 0],
  armL: [-1.1, 0.3, -0.2],
  armR: [-1.05, -0.3, 0.24],
  forearmL: [-1.9, 0, 0],
  forearmR: [-1.9, 0, 0],
  thighR: [-1.55, -0.1, -0.06],
  shinR: [1.9, 0, 0],
  thighL: [-0.16, 0.06, 0.06],
  shinL: [0.18, 0, 0],
}, [0, 0.02, 0.06]);

export const FLYING_KNEE = derive(KNEE, {
  hips: [-0.2, -0.16, 0],
  thighR: [-1.75, -0.1, -0.06],
  shinR: [1.6, 0, 0],
  thighL: [-0.6, 0.06, 0.06],
  shinL: [1.5, 0, 0],
}, [0, 0.42, 0.18]);

/** Rear-leg round kick. `KICK_*` differ only in the height the hip opens to. */
function roundKick(hipPitch: number, lean: number, lift: number): Pose {
  return derive(
    STANCE,
    {
      hips: [0.02, -0.9, lean * 0.4],
      spine: [-lean * 0.5, 0.4, lean * 0.6],
      chest: [-lean * 0.3, 0.2, lean * 0.4],
      armL: [-0.4, 0.2, -0.9],
      forearmL: [-1.2, 0, 0],
      armR: [-0.2, -0.2, 1.1],
      forearmR: [-0.6, 0, 0],
      thighR: [hipPitch, -0.2, -1.05],
      shinR: [0.34, 0, 0],
      footR: [-0.3, 0, 0],
      thighL: [-0.08, 0.06, 0.06],
      shinL: [0.14, 0, 0],
      footL: [0.5, 0, 0],
    },
    [0, lift, 0.02],
  );
}

export const KICK_LOW = roundKick(-0.55, 0.2, -0.04);
export const KICK_BODY = roundKick(-1.15, 0.5, 0.02);
export const KICK_HEAD = roundKick(-1.75, 0.85, 0.08);

export const KICK_FRONT = derive(STANCE, {
  hips: [-0.18, -0.28, 0],
  spine: [-0.24, 0.1, 0],
  armL: [-0.9, 0.2, -0.5],
  armR: [-0.5, -0.2, 0.6],
  thighR: [-1.5, -0.06, -0.06],
  shinR: [0.12, 0, 0],
  footR: [-0.5, 0, 0],
}, [0, -0.02, 0.04]);

export const KICK_SIDE = derive(STANCE, {
  hips: [0, -1.35, 0.14],
  spine: [-0.2, 0.6, -0.2],
  chest: [-0.1, 0.4, -0.1],
  armL: [-0.8, 0.2, -0.7],
  armR: [-0.2, -0.2, 0.9],
  thighR: [-1.35, -0.1, -0.5],
  shinR: [0.1, 0, 0],
  footR: [-0.2, 0, 0],
}, [0, 0.02, 0]);

/** Mid-spin, back to the opponent — the chamber every spinning technique passes through. */
export const SPIN_CHAMBER = derive(STANCE, {
  hips: [0.02, 2.4, 0],
  spine: [0.06, 0.5, 0],
  chest: [0.04, 0.3, 0],
  armL: [-0.5, 0.3, -0.8],
  armR: [-0.5, -0.3, 0.8],
  thighR: [-0.7, -0.06, -0.3],
  shinR: [1.0, 0, 0],
}, [0, -0.04, 0]);

/**
 * Turns a pose further round without changing anything else, for building a spin out of
 * keyframes. Yaw is cumulative rather than wrapped: a clip that goes 0 -> 3.2 -> 6.4 spins
 * once, where 0 -> 3.2 -> 0.1 would spin halfway and then unwind.
 */
export function spinTo(base: Pose, yaw: number): Pose {
  const hips = base.joints.hips ?? ([0, 0, 0] as Vec3);
  return derive(base, { hips: [hips[0], yaw, hips[2]] });
}

/**
 * Spinning back kick, landing at a half turn.
 *
 * The kicking leg extends *behind* the fighter — a positive thigh pitch — and the hips turn
 * through pi so that behind-the-fighter points at the opponent. That is what a back kick is;
 * authoring it as a front kick with a spin bolted on sends the foot into empty cage, which
 * is exactly what the first pass did.
 */
export const SPIN_BACK_KICK = derive(SPIN_CHAMBER, {
  hips: [0.06, Math.PI, 0],
  spine: [0.1, 0.4, 0],
  chest: [0.06, 0.2, 0],
  armL: [-0.9, 0.3, -0.5],
  forearmL: [-1.6, 0, 0],
  armR: [-0.9, -0.3, 0.5],
  forearmR: [-1.6, 0, 0],
  thighR: [2.0, 0, -0.06],
  shinR: [0.1, 0, 0],
  footR: [0.3, 0, 0],
  thighL: [-0.1, 0.06, 0.06],
  shinL: [0.16, 0, 0],
}, [0, -0.02, 0.06]);

/**
 * Landing out of a spin.
 *
 * Identical to `STANCE` except that the hip yaw has continued past a full turn rather than
 * winding back to where it started. Euler angles a whole turn apart render identically, so
 * the fighter finishes facing the same way — but the interpolation now completes the spin
 * instead of reversing it, which is what it did before the clip-shape test caught it.
 */
export const SPIN_RECOVER = derive(STANCE, { hips: [0.04, Math.PI * 2 - 0.34, 0] });

/**
 * Wheel kick, landing after a full turn.
 *
 * The raised leg sits about 0.93 rad off the fighter's own forward once the hip is opened,
 * so it only points at the opponent when the hips have come the whole way round — hence a
 * yaw past 2*pi rather than back toward zero.
 */
export const WHEEL_KICK_YAW = Math.PI * 2 + 0.93;

export const WHEEL_KICK = derive(SPIN_CHAMBER, {
  hips: [0.02, WHEEL_KICK_YAW, 0.08],
  spine: [-0.1, 0.4, -0.08],
  chest: [-0.06, 0.2, -0.06],
  thighR: [-1.7, -0.2, -0.95],
  shinR: [0.2, 0, 0],
  thighL: [-0.06, 0.06, 0.06],
  shinL: [0.12, 0, 0],
}, [0, 0.06, 0.04]);

/* ------------------------------------------------------------------ defensive */

export const BLOCK_HIGH = derive(STANCE, {
  spine: [0.14, 0.06, 0],
  neck: [0.18, 0, 0],
  head: [0.1, 0.1, 0],
  armL: [-1.15, 0.35, -0.42],
  forearmL: [-2.35, 0, 0.5],
  armR: [-1.15, -0.35, 0.42],
  forearmR: [-2.35, 0, -0.5],
}, [0, -0.13, -0.02]);

export const SLIP = derive(STANCE, {
  hips: [0.08, -0.4, 0.22],
  spine: [0.18, 0.16, 0.3],
  chest: [0.1, 0.1, 0.22],
  neck: [0.1, 0, 0.16],
  thighL: [-0.46, 0.06, 0.06],
  shinL: [0.6, 0, 0],
}, [0.12, -0.17, -0.03]);

export const HIT_LIGHT = derive(STANCE, {
  neck: [-0.24, -0.1, 0],
  head: [-0.16, 0.24, 0.1],
  spine: [-0.06, 0.14, 0],
}, [0, -0.08, -0.05]);

export const HIT_HEAVY = derive(STANCE, {
  hips: [-0.12, -0.3, 0],
  spine: [-0.26, 0.2, 0.1],
  chest: [-0.18, 0.16, 0.08],
  neck: [-0.5, -0.16, 0],
  head: [-0.3, 0.3, 0.16],
  armL: [-0.4, 0.1, -0.3],
  forearmL: [-1.6, 0, 0],
  armR: [-0.3, -0.1, 0.34],
  forearmR: [-1.5, 0, 0],
  thighL: [-0.1, 0.06, 0.06],
  shinL: [0.3, 0, 0],
}, [0, -0.12, -0.18]);

export const STAGGER = derive(HIT_HEAVY, {
  hips: [-0.2, -0.1, 0.3],
  spine: [-0.34, 0.1, 0.34],
  neck: [-0.55, -0.2, 0.12],
  armL: [-0.2, 0.2, -0.9],
  forearmL: [-0.7, 0, 0],
  armR: [-0.1, -0.2, 0.8],
  forearmR: [-0.5, 0, 0],
  thighL: [-0.7, 0.1, 0.2],
  shinL: [0.8, 0, 0],
  thighR: [0.2, -0.06, -0.2],
  shinR: [0.4, 0, 0],
}, [0.18, -0.22, -0.3]);

export const SPRAWL = derive(STANCE, {
  hips: [0.8, -0.2, 0],
  spine: [0.5, 0.1, 0],
  chest: [0.3, 0.1, 0],
  neck: [-0.5, 0, 0],
  armL: [-2.5, 0.4, -0.3],
  forearmL: [-0.5, 0, 0],
  armR: [-2.5, -0.4, 0.3],
  forearmR: [-0.5, 0, 0],
  thighL: [0.7, 0.06, 0.1],
  shinL: [0.2, 0, 0],
  thighR: [0.7, -0.06, -0.1],
  shinR: [0.2, 0, 0],
}, [0, -0.5, -0.34]);

export const CROUCH = derive(STANCE, {
  hips: [0.34, -0.34, 0],
  spine: [0.28, 0.12, 0],
  thighL: [-0.9, 0.06, 0.1],
  shinL: [1.2, 0, 0],
  thighR: [-0.6, -0.06, -0.1],
  shinR: [1.3, 0, 0],
}, [0, -0.3, 0.04]);

/* --------------------------------------------------------------------- clinch */

export const CLINCH = derive(STANCE, {
  hips: [0.12, -0.16, 0],
  spine: [0.2, 0.06, 0],
  chest: [0.14, 0, 0],
  neck: [-0.3, 0.3, 0],
  armL: [-1.5, 0.5, -0.5],
  forearmL: [-1.9, 0, 0.6],
  armR: [-1.5, -0.5, 0.5],
  forearmR: [-1.9, 0, -0.6],
  thighL: [-0.3, 0.06, 0.1],
  shinL: [0.4, 0, 0],
  thighR: [0.1, -0.06, -0.1],
  shinR: [0.5, 0, 0],
}, [0, -0.11, 0.06]);

export const CLINCH_BREAK = derive(STANCE, {
  hips: [-0.1, -0.3, 0],
  armL: [-1.6, 0.3, -0.7],
  forearmL: [-0.9, 0, 0],
  armR: [-1.6, -0.3, 0.7],
  forearmR: [-0.9, 0, 0],
}, [0, -0.08, -0.2]);

/* --------------------------------------------------------------------- ground */

/** Flat on the back, head toward -Z. Every supine ground pose builds on this. */
export const SUPINE: Pose = {
  joints: {
    hips: [-1.5, 0, 0],
    spine: [-0.1, 0, 0],
    chest: [-0.06, 0, 0],
    neck: [0.5, 0, 0],
    head: [0.2, 0, 0],
    armL: [-0.6, 0.2, -0.7],
    forearmL: [-1.8, 0, 0],
    armR: [-0.6, -0.2, 0.7],
    forearmR: [-1.8, 0, 0],
    thighL: [-0.7, 0.1, 0.3],
    shinL: [1.3, 0, 0],
    footL: [-0.4, 0, 0],
    thighR: [-0.7, -0.1, -0.3],
    shinR: [1.3, 0, 0],
    footR: [-0.4, 0, 0],
  },
  offset: [0, -0.66, -0.18],
};

/** Kneeling astride the opponent, which is how every top position is drawn. */
export const MOUNT_TOP: Pose = {
  joints: {
    hips: [0.24, 0, 0],
    spine: [0.16, 0, 0],
    chest: [0.1, 0, 0],
    neck: [-0.2, 0, 0],
    armL: [-1.2, 0.3, -0.4],
    forearmL: [-1.5, 0, 0],
    armR: [-1.2, -0.3, 0.4],
    forearmR: [-1.5, 0, 0],
    thighL: [-1.5, 0.1, 0.5],
    shinL: [2.2, 0, 0],
    thighR: [-1.5, -0.1, -0.5],
    shinR: [2.2, 0, 0],
  },
  offset: [0, -0.44, 0],
};

export const GUARD_BOTTOM = derive(SUPINE, {
  neck: [0.8, 0, 0],
  spine: [0.2, 0, 0],
  thighL: [-1.5, 0.1, 0.4],
  shinL: [1.7, 0, 0],
  thighR: [-1.5, -0.1, -0.4],
  shinR: [1.7, 0, 0],
  armL: [-1.4, 0.3, -0.4],
  forearmL: [-1.7, 0, 0],
  armR: [-1.4, -0.3, 0.4],
  forearmR: [-1.7, 0, 0],
}, [0, -0.6, -0.16]);

export const TURTLE: Pose = {
  joints: {
    hips: [1.2, 0, 0],
    spine: [0.3, 0, 0],
    chest: [0.2, 0, 0],
    neck: [-0.8, 0, 0],
    armL: [-2.2, 0.3, -0.3],
    forearmL: [-1.6, 0, 0],
    armR: [-2.2, -0.3, 0.3],
    forearmR: [-1.6, 0, 0],
    thighL: [-0.4, 0.1, 0.3],
    shinL: [2.3, 0, 0],
    thighR: [-0.4, -0.1, -0.3],
    shinR: [2.3, 0, 0],
  },
  offset: [0, -0.5, -0.1],
};

export const GROUND_STRIKE_UP = derive(MOUNT_TOP, {
  spine: [0.3, -0.16, 0],
  armR: [-2.6, -0.4, 0.3],
  forearmR: [-0.4, 0, 0],
});

export const GROUND_STRIKE_DOWN = derive(MOUNT_TOP, {
  spine: [0.42, -0.1, 0],
  chest: [0.24, -0.1, 0],
  armR: [-0.5, -0.2, 0.3],
  forearmR: [-0.5, 0, 0],
});

/** Chest to back, arms working for the choke. */
export const SUB_APPLY = derive(MOUNT_TOP, {
  spine: [0.4, 0.1, 0],
  chest: [0.24, 0.1, 0],
  neck: [-0.4, 0.2, 0],
  armL: [-1.9, 0.7, -0.55],
  forearmL: [-2.5, 0, 0.7],
  armR: [-1.9, -0.7, 0.55],
  forearmR: [-2.5, 0, -0.7],
}, [0, -0.46, -0.1]);

/** Leg-attack finish: the attacker falls back with the limb isolated. */
export const SUB_LEG = derive(SUPINE, {
  hips: [-1.35, 0.4, 0],
  spine: [-0.3, 0.2, 0],
  armL: [-1.9, 0.6, -0.5],
  forearmL: [-2.2, 0, 0.4],
  armR: [-1.9, -0.6, 0.5],
  forearmR: [-2.2, 0, -0.4],
  thighL: [-1.4, 0.1, 0.4],
  shinL: [0.9, 0, 0],
  thighR: [-1.3, -0.1, -0.4],
  shinR: [0.6, 0, 0],
}, [0, -0.6, 0.1]);

/** Caught in a submission: defending the limb, hips bridging. */
export const SUB_CAUGHT = derive(SUPINE, {
  neck: [0.9, 0.2, 0],
  spine: [0.24, 0.1, 0],
  armL: [-1.5, 0.6, -0.5],
  forearmL: [-2.4, 0, 0.6],
  armR: [-1.5, -0.6, 0.5],
  forearmR: [-2.4, 0, -0.6],
  thighL: [-1.1, 0.1, 0.4],
  shinL: [1.1, 0, 0],
}, [0, -0.56, -0.16]);

export const DOWNED = derive(SUPINE, {
  neck: [0.3, 0.3, 0],
  head: [0.1, 0.3, 0],
  armL: [-0.3, 0.2, -1.1],
  forearmL: [-0.6, 0, 0],
  armR: [-0.3, -0.2, 1.1],
  forearmR: [-0.5, 0, 0],
  thighL: [-0.3, 0.1, 0.4],
  shinL: [0.5, 0, 0],
  thighR: [-0.4, -0.1, -0.3],
  shinR: [0.7, 0, 0],
}, [0, -0.68, -0.3]);

export const SCRAMBLE_UP: Pose = {
  joints: {
    hips: [0.6, -0.3, 0],
    spine: [0.4, 0.2, 0],
    chest: [0.2, 0.1, 0],
    neck: [-0.5, 0, 0],
    armL: [-2.0, 0.4, -0.4],
    forearmL: [-0.8, 0, 0],
    armR: [-1.2, -0.3, 0.5],
    forearmR: [-1.4, 0, 0],
    thighL: [-1.5, 0.1, 0.3],
    shinL: [1.6, 0, 0],
    thighR: [-0.2, -0.1, -0.3],
    shinR: [2.2, 0, 0],
  },
  offset: [0, -0.44, -0.06],
};

/* ---------------------------------------------------------------- takedowns */

/** Level change: the shot every takedown starts from. */
export const SHOT = derive(STANCE, {
  hips: [0.62, -0.3, 0],
  spine: [0.4, 0.14, 0],
  chest: [0.24, 0.1, 0],
  neck: [-0.5, 0, 0],
  armL: [-2.2, 0.5, -0.3],
  forearmL: [-0.7, 0, 0],
  armR: [-2.2, -0.5, 0.3],
  forearmR: [-0.7, 0, 0],
  thighL: [-1.3, 0.1, 0.2],
  shinL: [1.5, 0, 0],
  thighR: [-0.1, -0.1, -0.2],
  shinR: [1.7, 0, 0],
}, [0, -0.42, 0.36]);

export const DRIVE = derive(SHOT, {
  hips: [0.9, -0.24, 0],
  spine: [0.3, 0.1, 0],
  thighL: [-0.9, 0.1, 0.2],
  shinL: [1.0, 0, 0],
  thighR: [0.4, -0.1, -0.2],
  shinR: [0.9, 0, 0],
}, [0, -0.5, 0.62]);

export const LIFT = derive(STANCE, {
  hips: [-0.2, -0.2, 0],
  spine: [-0.24, 0.1, 0],
  chest: [-0.14, 0.1, 0],
  armL: [-2.4, 0.5, -0.4],
  forearmL: [-1.4, 0, 0],
  armR: [-2.4, -0.5, 0.4],
  forearmR: [-1.4, 0, 0],
  thighL: [-0.5, 0.1, 0.14],
  shinL: [0.7, 0, 0],
  thighR: [-0.3, -0.1, -0.14],
  shinR: [0.6, 0, 0],
}, [0, -0.02, 0.2]);

export const SLAM = derive(STANCE, {
  hips: [0.8, -0.2, 0],
  spine: [0.5, 0.1, 0],
  armL: [-2.6, 0.4, -0.3],
  forearmL: [-0.6, 0, 0],
  armR: [-2.6, -0.4, 0.3],
  forearmR: [-0.6, 0, 0],
  thighL: [-1.4, 0.1, 0.3],
  shinL: [2.0, 0, 0],
  thighR: [-1.4, -0.1, -0.3],
  shinR: [2.0, 0, 0],
}, [0, -0.44, 0.34]);

/** Arched back over the top, for a suplex. */
export const ARCH = derive(LIFT, {
  hips: [-0.7, -0.2, 0],
  spine: [-0.5, 0.1, 0],
  chest: [-0.3, 0.1, 0],
  neck: [0.4, 0, 0],
  armL: [-2.8, 0.5, -0.4],
  armR: [-2.8, -0.5, 0.4],
  thighL: [-0.2, 0.1, 0.14],
  thighR: [0, -0.1, -0.14],
}, [0, 0.06, 0.08]);

/* ------------------------------------------------------------------ ceremony */

export const WALK_IDLE = derive(STANCE, {
  hips: [0.02, -0.2, 0],
  armL: [-0.5, 0.1, -0.24],
  forearmL: [-1.4, 0, 0.1],
  armR: [-0.5, -0.1, 0.24],
  forearmR: [-1.4, 0, -0.1],
}, [0, -0.04, 0]);

export const TOUCH_GLOVES = derive(STANCE, {
  hips: [0.2, -0.1, 0],
  spine: [0.16, 0.06, 0],
  armL: [-1.3, 0.3, -0.2],
  forearmL: [-0.5, 0, 0],
  armR: [-1.3, -0.3, 0.2],
  forearmR: [-0.5, 0, 0],
}, [0, -0.1, 0.06]);

export const ARMS_RAISED = derive(STANCE, {
  hips: [-0.06, -0.1, 0],
  spine: [-0.12, 0, 0],
  neck: [0.2, 0, 0],
  head: [0.1, 0, 0],
  armL: [-2.9, 0.3, -0.5],
  forearmL: [-0.3, 0, 0],
  armR: [-2.9, -0.3, 0.5],
  forearmR: [-0.3, 0, 0],
  thighL: [-0.1, 0.06, 0.06],
  shinL: [0.12, 0, 0],
  thighR: [0.1, -0.06, -0.06],
  shinR: [0.12, 0, 0],
}, [0, -0.01, 0]);

export const CORNER_SEATED: Pose = {
  joints: {
    hips: [0.16, 0, 0],
    spine: [0.1, 0, 0],
    chest: [0.06, 0, 0],
    neck: [-0.3, 0, 0],
    armL: [-0.9, 0.2, -0.4],
    forearmL: [-1.5, 0, 0],
    armR: [-0.9, -0.2, 0.4],
    forearmR: [-1.5, 0, 0],
    thighL: [-1.5, 0.1, 0.2],
    shinL: [1.5, 0, 0],
    thighR: [-1.5, -0.1, -0.2],
    shinR: [1.5, 0, 0],
  },
  offset: [0, -0.42, -0.06],
};

export const WOBBLE = derive(STANCE, {
  hips: [-0.1, -0.3, 0.24],
  spine: [-0.2, 0.1, 0.2],
  neck: [-0.3, -0.2, 0.14],
  head: [-0.1, 0.2, 0.2],
  armL: [-0.4, 0.2, -0.5],
  forearmL: [-1.0, 0, 0],
  armR: [-0.3, -0.2, 0.5],
  forearmR: [-0.9, 0, 0],
  thighL: [-0.5, 0.1, 0.2],
  shinL: [0.7, 0, 0],
  thighR: [0.2, -0.06, -0.16],
  shinR: [0.5, 0, 0],
}, [0.08, -0.2, -0.06]);

export const CUT_CHECK = derive(STANCE, {
  neck: [-0.16, 0, 0],
  armL: [-2.3, 0.3, -0.24],
  forearmL: [-2.2, 0, 0.4],
  armR: [-0.6, -0.1, 0.2],
  forearmR: [-2.3, 0, -0.24],
}, [0, -0.09, -0.06]);
