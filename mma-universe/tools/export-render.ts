/**
 * Exports a fight for offline rendering.
 *
 * The path-traced renderer is a *second consumer* of the same contract the browser viewer
 * reads: this script builds the timeline with the same `player.ts`, samples the same frames,
 * and emits geometry and bone rotations. Blender never sees the simulation, the same way the
 * browser never does — which is the whole claim the 3D layer exists to make, tested again
 * with a completely different renderer on the other end.
 *
 * Output is bind-pose meshes plus per-frame bone rotations, not baked vertices: the skinning
 * is done once on the Python side, which keeps the file small enough to iterate on.
 */

import { writeFileSync } from 'node:fs';
import {
  Rng,
  currentAbility,
  displayName,
  generateUniverse,
  mapEventToAnimation,
  movementProfile,
  simulateFight,
} from '@mma/sim';
import type { Fighter, FightResult } from '@mma/sim';

import { JOINT_ORDER, SKELETON } from '../apps/web/src/three/rig.ts';
import { buildBeard, buildFace, buildGloves, buildHair, buildShorts, buildSkin } from '../apps/web/src/three/body.ts';
import { buildTimeline, sampleFrame } from '../apps/web/src/three/player.ts';
import { solveCamera } from '../apps/web/src/three/camera.ts';
import type { CameraHint } from '../apps/web/src/types.ts';
import { PALETTE_A, PALETTE_B, type FighterPalette } from '../apps/web/src/three/palette.ts';
import type { AnimationBeatWire } from '../apps/web/src/types.ts';

const [outPath, mode = 'stills', argA = '0', argB = '5', argC = '24'] = process.argv.slice(2);
if (!outPath) throw new Error('usage: export-render <out.json> [stills|clip] [start] [seconds] [fps]');

const universe = generateUniverse({ seed: 'showcase-2026' });
const contenders = universe.state.fighters
  .filter((f) => currentAbility(f) > 140 && f.status === 'active')
  .sort((a, b) => currentAbility(b) - currentAbility(a));

/** The same knockout the shareable page opens on, so the two show the same fight. */
function findKnockout(): { a: Fighter; b: Fighter; result: FightResult } {
  for (let cursor = 0; cursor < contenders.length - 1; cursor++) {
    const a = contenders[cursor];
    const b = contenders.find((f, i) => i > cursor && f.divisionKey === a?.divisionKey);
    if (!a || !b) continue;
    for (let i = 0; i < 400; i++) {
      const seed = `Knockout-${a.id}_${i}`;
      const result = simulateFight(a, b, { fightId: seed, rounds: 3 }, Rng.fromSeed(seed));
      if (result.outcome === 'KO' || result.outcome === 'TKO') return { a, b, result };
    }
  }
  throw new Error('no knockout found');
}

const { a, b, result } = findKnockout();
const beats: AnimationBeatWire[] = result.events.map((event) => ({
  event: event as never,
  directive: mapEventToAnimation(event) as never,
}));
const profiles = [movementProfile(a, result.fightId), movementProfile(b, result.fightId)] as const;
const timeline = buildTimeline(beats, a.id, b.id, 'CONDENSED', profiles);

function meshesFor(palette: FighterPalette) {
  const parts: { material: string; data: ReturnType<typeof buildSkin> }[] = [
    { material: 'skin', data: buildSkin() },
    { material: 'trunks', data: buildShorts() },
    { material: 'gloves', data: buildGloves() },
    { material: 'hair', data: buildHair(palette.hairStyle) },
    { material: 'eyes', data: buildFace() },
  ];
  if (palette.beard) parts.push({ material: 'hair', data: buildBeard() });
  return parts.map((part) => ({
    material: part.material,
    positions: part.data.positions,
    indices: part.data.indices,
    skinIndices: part.data.skinIndices,
    skinWeights: part.data.skinWeights,
  }));
}

/** Which moments to render. Stills go for the decisive beats; a clip is a contiguous run. */
function chooseTimes(): number[] {
  if (mode === 'finish') {
    // The last few seconds up to the stoppage — the part of a fight anyone would replay.
    const seconds = Number(argB);
    const fps = Number(argC);
    const last = timeline.beats[timeline.beats.length - 1];
    const end = last ? last.end + 0.4 : timeline.duration;
    const start = Math.max(0, end - seconds);
    return Array.from({ length: Math.round(seconds * fps) }, (_, i) => start + i / fps);
  }
  if (mode === 'clip') {
    const start = Number(argA);
    const seconds = Number(argB);
    const fps = Number(argC);
    return Array.from({ length: Math.round(seconds * fps) }, (_, i) => start + i / fps);
  }
  const wanted = [/lands a (clean|hard).*(cross|hook|uppercut)/i, /kick/i, /takedown|trip|slam/i, /hurt|wobbl|knockdown|drops/i];
  const times: number[] = [];
  for (const pattern of wanted) {
    const beat = timeline.beats.find((entry) => pattern.test(entry.event.description));
    if (beat) times.push(beat.impactAt + 0.05);
  }
  return times;
}

const times = chooseTimes();

const frames = times.map((time) => {
  const frame = sampleFrame(timeline, time);
  const centreX = (frame.a.position[0] + frame.b.position[0]) / 2;
  const centreZ = (frame.a.position[2] + frame.b.position[2]) / 2;
  // A still is a chosen photograph, so it gets the tight lens whatever the beat's own hint
  // was; a clip keeps the hint, because there the camera is following the fight.
  const hint: CameraHint = mode === 'stills' ? 'CAGE_SIDE' : frame.camera;
  const facing = Math.atan2(
    frame.b.position[0] - frame.a.position[0],
    frame.b.position[2] - frame.a.position[2],
  );
  const shot = solveCamera(hint, centreX, centreZ, time, facing, frame.cameraSide);
  return {
    time,
    description: frame.description,
    round: frame.round,
    roundTime: frame.roundTime,
    camera: shot,
    fighters: [frame.a, frame.b].map((side) => ({
      position: side.position,
      yaw: side.yaw,
      offset: side.pose.offset,
      rotations: JOINT_ORDER.map((joint) => side.pose.joints[joint]),
    })),
  };
});

const payload = {
  fight: {
    a: displayName(a),
    b: displayName(b),
    outcome: result.outcome,
    technique: result.technique,
    finishRound: result.finishRound,
    finishTime: result.finishTime,
  },
  rig: JOINT_ORDER.map((joint) => ({
    name: joint,
    parent: SKELETON[joint].parent === null ? -1 : JOINT_ORDER.indexOf(SKELETON[joint].parent!),
    offset: SKELETON[joint].offset,
  })),
  palettes: [PALETTE_A, PALETTE_B],
  meshes: [meshesFor(PALETTE_A), meshesFor(PALETTE_B)],
  frames,
};

writeFileSync(outPath, JSON.stringify(payload));
const verts = payload.meshes.flat().reduce((sum, m) => sum + m.positions.length / 3, 0);
console.error(
  `${displayName(a)} vs ${displayName(b)} — ${result.outcome} ${result.technique ?? ''} R${result.finishRound}\n` +
    `${frames.length} frames, ${verts} vertices, ${(JSON.stringify(payload).length / 1024 / 1024).toFixed(2)} MB`,
);
for (const frame of frames) console.error(`  t=${frame.time.toFixed(2)} ${frame.camera.fov}deg  ${frame.description}`);
