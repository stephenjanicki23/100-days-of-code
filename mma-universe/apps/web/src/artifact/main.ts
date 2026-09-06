/**
 * The standalone viewer.
 *
 * Same renderer as the app, no React and no API: the fights are baked into the page as the
 * exact payload `/fights/:id/events?format=animation` serves. That is the point of shipping
 * it this way — if the renderer works with nothing but a list of directives, it works when
 * the list arrives over HTTP too.
 */

import { buildTimeline, sampleFrame, type Frame, type Pacing, type Timeline } from '../three/player.ts';
import { createViewer, type FightViewer } from '../three/viewer.ts';
import { PALETTE_A, PALETTE_B } from '../three/skeleton.ts';
import type { AnimationBeatWire, MovementProfile } from '../types.ts';

interface PackedBeat {
  s: number; t: number; r: number; c: string; d: string; k: string;
  clip: string; v: number; st: string; cam: string; rx: string; sp: number;
  act?: string; rct?: string;
}

interface PackedFighter {
  id: string; name: string; record: string; style: string; signature: string;
  ability: number; division: string;
}

interface PackedFight {
  id: string; headline: string; rounds: number; outcome: string; technique?: string;
  finishRound?: number; finishTime?: string; winnerId?: string;
  a: PackedFighter; b: PackedFighter; beats: PackedBeat[];
  profiles?: MovementProfile[];
}

declare global {
  interface Window { __FIGHTS__?: PackedFight[] }
}

const FIGHTS: PackedFight[] = window.__FIGHTS__ ?? [];

/** Expands the wire-trimmed payload back into what the timeline builder expects. */
function inflate(beats: PackedBeat[]): AnimationBeatWire[] {
  return beats.map((b) => ({
    event: {
      schemaVersion: 1,
      fightId: '',
      sequence: b.s,
      round: b.r,
      timestamp: b.t,
      roundTime: b.c,
      timeRemaining: 0,
      position: b.st,
      eventType: b.k,
      description: b.d,
    } as AnimationBeatWire['event'],
    directive: {
      clip: b.clip,
      variant: b.v,
      targetState: b.st,
      camera: b.cam,
      reaction: b.rx,
      speed: b.sp,
      triggersReplay: false,
      actorId: b.act,
      reactorId: b.rct,
    } as AnimationBeatWire['directive'],
  }));
}

const $ = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`missing #${id}`);
  return element as T;
};

const stage = $('stage');
const hudA = $('hud-a');
const hudB = $('hud-b');
const hudClock = $('hud-clock');
const hudCam = $('hud-cam');
const hudLine = $('hud-line');
const scrub = $<HTMLInputElement>('scrub');
const timeLabel = $('time');
const durLabel = $('dur');
const btnPlay = $<HTMLButtonElement>('btn-play');
const stream = $<HTMLUListElement>('stream');
const debugPanel = $('debug');
const debugToggle = $<HTMLInputElement>('debug-toggle');
const tabs = $('tabs');
const tape = $('tape');
const verdict = $('verdict');

let viewer: FightViewer | undefined;
let timeline: Timeline | undefined;
let active = 0;
let pacing: Pacing = 'CONDENSED';
let lastBeat = -1;
let rows: HTMLLIElement[] = [];

function clock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
}

function titleCase(value: string): string {
  return value.replace(/_/g, ' ').toLowerCase();
}

/**
 * The animation debug readout.
 *
 * Blender does no animation in this project — it is handed finished bone rotations — so there
 * are no F-curves or motion paths to inspect there. Everything that decides how a fighter
 * moves happens in the choreography layer, so this is where the state has to be legible: what
 * the current beat claimed, how much of the legs the footwork got, how far through a
 * transition the body is, and how tired it is meant to look.
 */
function renderDebug(frame: Frame): void {
  if (!debugToggle.checked) return;
  const beat = frame.beat;
  if (!beat) return;
  const into = frame.time - beat.start;
  const transition = Math.min(1, into / beat.blend);
  const rows: [string, string][] = [
    ['beat', `${beat.index}  ${beat.event.eventType.toLowerCase()}`],
    ['clip', `${beat.clipName}  v${beat.clip.variants > 1 ? '·' : ''}`],
    ['camera', frame.camera.toLowerCase()],
    ['position', beat.position.toLowerCase()],
    ['claim', `legs ${beat.claim.LEGS.toFixed(2)}  spine ${beat.claim.SPINE.toFixed(2)}  armR ${beat.claim.ARM_R.toFixed(2)}`],
    ['reaction', beat.reactionName.toLowerCase().replace(/_/g, ' ')],
    ['blend', `${(transition * 100).toFixed(0)}%  over ${beat.blend.toFixed(2)}s${beat.follows ? '  (combination)' : ''}`],
    ['legs free', `A ${frame.a.legFreedom.toFixed(2)}   B ${frame.b.legFreedom.toFixed(2)}`],
    ['idle', `A ${frame.a.rest.toFixed(2)}   B ${frame.b.rest.toFixed(2)}`],
    ['hurt', `A ${frame.a.stagger.toFixed(2)}   B ${frame.b.stagger.toFixed(2)}`],
    ['feint', `A ${frame.a.feint.toFixed(2)}   B ${frame.b.feint.toFixed(2)}`],
    ['tired', `A ${frame.a.fatigue.toFixed(2)}   B ${frame.b.fatigue.toFixed(2)}`],
    ['facing', `${(beat.facing % (Math.PI * 2)).toFixed(2)} rad`],
    ['round', String(beat.event.round)],
  ];
  debugPanel.innerHTML = rows
    .map(([key, value]) => `<span class="dbg-k">${key}</span><span class="dbg-v">${value}</span>`)
    .join('');
}

function onFrame(frame: Frame): void {
  scrub.value = String(frame.time);
  timeLabel.textContent = clock(frame.time);
  renderDebug(frame);
  const index = frame.beat?.index ?? -1;
  if (index === lastBeat) return;

  lastBeat = index;
  hudClock.textContent = `R${frame.round} · ${frame.roundTime}`;
  hudCam.textContent = titleCase(frame.camera);
  hudLine.textContent = frame.description;

  stream.querySelectorAll('.live').forEach((row) => row.classList.remove('live'));
  const row = rows[index];
  if (row) {
    row.classList.add('live');
    const top = row.offsetTop - stream.clientHeight / 2 + row.clientHeight / 2;
    stream.scrollTo({ top, behavior: 'auto' });
  }
  if (!viewer?.isPlaying) setPlaying(false);
}

function setPlaying(playing: boolean): void {
  btnPlay.textContent = playing ? 'Pause' : 'Play';
  btnPlay.setAttribute('aria-pressed', String(playing));
}

function renderStream(fight: PackedFight): void {
  stream.replaceChildren();
  rows = fight.beats.map((beat) => {
    const li = document.createElement('li');
    li.innerHTML =
      `<span class="col-clip">${beat.clip}</span>` +
      `<span class="col-cam">${beat.cam.replace(/_/g, ' ').toLowerCase()}</span>` +
      `<span class="col-rx${beat.rx === 'NONE' ? ' dim' : ''}">${beat.rx.replace(/_/g, ' ').toLowerCase()}</span>` +
      `<span class="col-line">${beat.d}</span>`;
    li.addEventListener('click', () => {
      const target = timeline?.beats[rows.indexOf(li)];
      if (target && viewer) {
        viewer.pause();
        setPlaying(false);
        viewer.seek(target.impactAt);
      }
    });
    stream.appendChild(li);
    return li;
  });
}

/** Drops the ring nickname; the tape column is too narrow to carry it. */
function plain(name: string): string {
  return name.replace(/ "[^"]*"/, '');
}

function renderTape(fight: PackedFight): void {
  const row = (label: string, a: string, b: string) =>
    `<div class="tape-row"><span class="tape-a">${a}</span><span class="tape-k">${label}</span><span class="tape-b">${b}</span></div>`;
  tape.innerHTML =
    `<div class="tape-head">` +
    `<div class="tape-name"><span class="dot" style="background:#${PALETTE_A.trunks.toString(16)}"></span>${plain(fight.a.name)}</div>` +
    `<div class="tape-div">${fight.a.division}</div>` +
    `<div class="tape-name right">${plain(fight.b.name)}<span class="dot" style="background:#${PALETTE_B.trunks.toString(16)}"></span></div>` +
    `</div>` +
    row('record', fight.a.record, fight.b.record) +
    row('style', fight.a.style, fight.b.style) +
    row('ability', String(fight.a.ability), String(fight.b.ability)) +
    row('signature', fight.a.signature, fight.b.signature);

  const winner = fight.winnerId === fight.a.id ? fight.a.name : fight.winnerId === fight.b.id ? fight.b.name : undefined;
  verdict.innerHTML = winner
    ? `<strong>${winner}</strong> by ${titleCase(fight.outcome)}` +
      (fight.technique ? ` (${titleCase(fight.technique)})` : '') +
      (fight.finishRound ? ` — round ${fight.finishRound}, ${fight.finishTime}` : '') +
      ` · ${fight.beats.length} directives`
    : `Draw · ${fight.beats.length} directives`;
}

/** Opens on the first decisive beat, so the page never rests on an empty stance. */
function openingTime(built: Timeline): number {
  const punch = built.beats.find((beat) => beat.camera === 'IMPACT');
  return punch ? punch.impactAt + 0.06 : 0;
}

function load(index: number): void {
  const fight = FIGHTS[index];
  if (!fight || !viewer) return;
  active = index;
  lastBeat = -1;

  tabs.querySelectorAll('button').forEach((button) => {
    const on = Number(button.dataset.index) === index;
    button.classList.toggle('on', on);
    button.setAttribute('aria-selected', String(on));
  });

  const profiles =
    fight.profiles && fight.profiles.length === 2
      ? ([fight.profiles[0]!, fight.profiles[1]!] as const)
      : undefined;
  timeline = buildTimeline(inflate(fight.beats), fight.a.id, fight.b.id, pacing, profiles);
  hudA.textContent = fight.a.name;
  hudB.textContent = fight.b.name;
  scrub.max = String(timeline.duration);
  durLabel.textContent = clock(timeline.duration);
  renderStream(fight);
  renderTape(fight);
  viewer.load(timeline);
  viewer.seek(openingTime(timeline));
  setPlaying(false);
}

function step(direction: 1 | -1): void {
  if (!viewer || !timeline) return;
  viewer.pause();
  setPlaying(false);
  const current = viewer.currentTime;
  const beats = timeline.beats;
  const target =
    direction === 1
      ? beats.find((beat) => beat.impactAt > current + 0.01)
      : [...beats].reverse().find((beat) => beat.impactAt < current - 0.01);
  viewer.seek(target ? target.impactAt : direction === 1 ? timeline.duration : 0);
}

function boot(): void {
  FIGHTS.forEach((fight, index) => {
    const button = document.createElement('button');
    button.dataset.index = String(index);
    button.setAttribute('role', 'tab');
    button.innerHTML = `<span class="tab-kind">${fight.headline}</span><span class="tab-who">${plain(fight.a.name)} v ${plain(fight.b.name)}</span>`;
    button.addEventListener('click', () => load(index));
    tabs.appendChild(button);
  });

  viewer = createViewer(stage, {
    onFrame,
    onError: (message) => {
      stage.innerHTML =
        `<div class="stage-fallback"><p>This browser could not open a WebGL context, so the fight cannot be drawn.</p>` +
        `<p class="mono">${message}</p></div>`;
    },
  });
  if (!viewer) return;

  btnPlay.addEventListener('click', () => {
    if (!viewer) return;
    if (viewer.isPlaying) {
      viewer.pause();
      setPlaying(false);
    } else {
      viewer.play();
      setPlaying(true);
    }
  });
  $('btn-prev').addEventListener('click', () => step(-1));
  $('btn-next').addEventListener('click', () => step(1));
  scrub.addEventListener('input', () => {
    viewer?.pause();
    setPlaying(false);
    viewer?.seek(Number(scrub.value));
  });
  $<HTMLSelectElement>('rate').addEventListener('change', (event) => {
    viewer?.setRate(Number((event.target as HTMLSelectElement).value));
  });
  debugToggle.addEventListener('change', () => {
    debugPanel.hidden = !debugToggle.checked;
  });
  $<HTMLSelectElement>('pacing').addEventListener('change', (event) => {
    pacing = (event.target as HTMLSelectElement).value as Pacing;
    load(active);
  });

  window.addEventListener('keydown', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
    if (event.key === ' ') { event.preventDefault(); btnPlay.click(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  });

  load(0);
}

boot();
