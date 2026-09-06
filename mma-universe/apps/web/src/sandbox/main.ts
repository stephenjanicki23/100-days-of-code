/**
 * The fight lab.
 *
 * Every other page in this project shows fights that were chosen and baked in advance. This
 * one ships the simulation itself: the whole engine is pure and I/O-free — no database, no
 * network, no file system — so it compiles straight into the page and the universe is built in
 * the browser at load. Six hundred fighters in about four hundred milliseconds.
 *
 * Which makes it the only honest demonstration of the claim the project keeps making. Pick any
 * two of them, run the fight, watch it. Nothing here was prepared.
 */

import {
  Rng,
  buildAllRankings,
  currentAbility,
  displayName,
  divisionsForSex,
  fighterStyle,
  generateUniverse,
  mapEventToAnimation,
  movementProfile,
  recordString,
  simulateFight,
  type Fighter,
  type FightResult,
  type Universe,
} from '@mma/sim';

import { createViewer, type FightViewer } from '../three/viewer.ts';
import { buildTimeline, type Timeline } from '../three/player.ts';
import { PALETTE_A, PALETTE_B } from '../three/palette.ts';
import type { Frame } from '../three/player.ts';
import type { AnimationBeatWire } from '../types.ts';

/* ---------------------------------------------------------------------- state */

let universe: Universe;
let roster: Fighter[] = [];
let ranks = new Map<string, number>();
let corner: [Fighter | undefined, Fighter | undefined] = [undefined, undefined];
let result: FightResult | undefined;
let timeline: Timeline | undefined;
let viewer: FightViewer | undefined;

const $ = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`missing #${id}`);
  return element as T;
};

const plain = (text: string): string =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

/** Clamped, because a paused viewer can report a hair below zero and `-1:-4` is not a time. */
const clock = (seconds: number): string => {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
};

const titleCase = (value: string): string =>
  value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());

/** Age on the universe's current date, which is all the roster needs to show. */
function ageOf(fighter: Fighter): number {
  const born = new Date(fighter.birthDate);
  const now = new Date(universe.state.currentDate);
  let age = now.getFullYear() - born.getFullYear();
  const month = now.getMonth() - born.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < born.getDate())) age--;
  return age;
}

/* ------------------------------------------------------------------- universe */

function build(seed: string): void {
  const started = performance.now();
  universe = generateUniverse({ seed });
  roster = universe.state.fighters.filter((fighter) => fighter.status === 'active');

  // Rank 0 is the champion, so the display adds one and shows the belt separately.
  ranks = new Map();
  for (const entry of buildAllRankings(
    universe.state.promotions,
    universe.state.fighters,
    universe.state.currentDate,
  )) {
    ranks.set(entry.fighterId, entry.rank);
  }

  const took = Math.round(performance.now() - started);
  $('built').textContent =
    `${roster.length} active fighters across ${universe.state.camps.length} camps, built in ${took}ms`;

  const divisions = $<HTMLSelectElement>('division');
  const seen = new Set(roster.map((fighter) => fighter.divisionKey));
  divisions.innerHTML =
    '<option value="">All divisions</option>' +
    (['male', 'female'] as const)
      .flatMap((sex) => divisionsForSex(sex).filter((d) => seen.has(d.key)))
      .map((d) => `<option value="${d.key}">${plain(d.name)}</option>`)
      .join('');

  // Open on a real bout rather than an empty shell: the two best-ranked fighters in the
  // deepest division, already fought. The page should show what it does before it is touched.
  const contenders = [...roster].sort((x, y) => currentAbility(y) - currentAbility(x));
  const first = contenders[0];
  const second = contenders.find((f) => f !== first && f.divisionKey === first?.divisionKey);
  corner = [first, second ?? contenders[1]];

  result = undefined;
  timeline = undefined;
  renderRoster();
  renderCorners();
  $('result').hidden = true;
  $('replay').hidden = true;
  if (corner[0] && corner[1]) run();
}

/* --------------------------------------------------------------------- roster */

function filtered(): Fighter[] {
  const division = $<HTMLSelectElement>('division').value;
  const query = $<HTMLInputElement>('search').value.trim().toLowerCase();
  const sort = $<HTMLSelectElement>('sort').value;

  let list = roster;
  if (division) list = list.filter((fighter) => fighter.divisionKey === division);
  if (query) {
    list = list.filter((fighter) => {
      const style = fighterStyle(fighter).primary.label.toLowerCase();
      return displayName(fighter).toLowerCase().includes(query) || style.includes(query);
    });
  }

  const by: Record<string, (a: Fighter, b: Fighter) => number> = {
    ability: (a, b) => currentAbility(b) - currentAbility(a),
    rank: (a, b) => (ranks.get(a.id) ?? 999) - (ranks.get(b.id) ?? 999),
    name: (a, b) => displayName(a).localeCompare(displayName(b)),
    age: (a, b) => ageOf(a) - ageOf(b),
    wins: (a, b) => b.record.wins - a.record.wins,
  };
  return [...list].sort(by[sort] ?? by.ability!).slice(0, 300);
}

function renderRoster(): void {
  const list = filtered();
  $('count').textContent = `${list.length} shown`;
  $('roster').innerHTML = list
    .map((fighter) => {
      const style = fighterStyle(fighter);
      const rank = ranks.get(fighter.id);
      const picked = corner[0]?.id === fighter.id ? 'a' : corner[1]?.id === fighter.id ? 'b' : '';
      return (
        `<tr data-id="${fighter.id}" class="${picked}">` +
        `<td class="rank">${rank === 0 ? '<b>C</b>' : rank && rank <= 15 ? `#${rank}` : ''}</td>` +
        `<td class="who"><span class="nm">${plain(displayName(fighter))}</span>` +
        `<span class="sub">${plain(style.primary.label)}</span></td>` +
        `<td class="div">${plain(fighter.divisionKey.replace(/^[mw]_/, '').replace(/_/g, ' '))}</td>` +
        `<td class="num">${plain(recordString(fighter))}</td>` +
        `<td class="num">${ageOf(fighter)}</td>` +
        `<td class="num ca">${Math.round(currentAbility(fighter))}</td>` +
        `<td class="pick"><button data-corner="0">A</button><button data-corner="1">B</button></td>` +
        `</tr>`
      );
    })
    .join('');
}

function renderCorners(): void {
  for (const index of [0, 1] as const) {
    const fighter = corner[index];
    const box = $(`corner-${index}`);
    if (!fighter) {
      box.innerHTML = `<p class="empty">Pick a fighter from the roster</p>`;
      continue;
    }
    const style = fighterStyle(fighter);
    const rank = ranks.get(fighter.id);
    const row = (key: string, value: string) => `<div class="tp"><span>${key}</span><b>${plain(value)}</b></div>`;
    box.innerHTML =
      `<h3>${plain(displayName(fighter))}</h3>` +
      `<p class="sub">${rank === 0 ? 'Champion · ' : rank ? `#${rank} · ` : ''}${plain(fighter.divisionKey.replace(/^[mw]_/, '').replace(/_/g, ' '))}</p>` +
      row('Record', recordString(fighter)) +
      row('Style', style.primary.label) +
      row('Signature', style.signatureSkill.label) +
      row('Age', String(ageOf(fighter))) +
      row('Height', `${Math.floor(fighter.heightIn / 12)}'${fighter.heightIn % 12}"`) +
      row('Reach', `${fighter.reachIn}"`) +
      row('Stance', titleCase(fighter.stance)) +
      row('Ability', String(Math.round(currentAbility(fighter))));
  }
  const ready = Boolean(corner[0] && corner[1] && corner[0].id !== corner[1].id);
  $<HTMLButtonElement>('run').disabled = !ready;
  $('mismatch').hidden = !(corner[0] && corner[1] && corner[0].divisionKey !== corner[1].divisionKey);
}

/* ---------------------------------------------------------------------- fight */

function run(): void {
  const [a, b] = corner;
  if (!a || !b) return;
  const rounds = Number($<HTMLSelectElement>('rounds').value);
  const seed = $<HTMLInputElement>('fight-seed').value.trim() || `lab-${a.id}-${b.id}`;

  result = simulateFight(a, b, { fightId: seed, rounds }, Rng.fromSeed(seed));

  const beats: AnimationBeatWire[] = result.events.map((event) => ({
    event: event as never,
    directive: mapEventToAnimation(event) as never,
  }));
  timeline = buildTimeline(beats, a.id, b.id, undefined, [
    movementProfile(a, seed) as never,
    movementProfile(b, seed) as never,
  ]);

  renderResult(a, b);
  renderStream();
  showReplay();
}

function renderResult(a: Fighter, b: Fighter): void {
  if (!result) return;
  const winner = result.winnerId === a.id ? a : result.winnerId === b.id ? b : undefined;
  const method = result.technique ? ` (${titleCase(result.technique)})` : '';
  const when = result.finishRound ? `R${result.finishRound} ${result.finishTime}` : 'decision';

  $('verdict').innerHTML = winner
    ? `<strong>${plain(displayName(winner))}</strong> def. ` +
      `${plain(displayName(winner.id === a.id ? b : a))} — ` +
      `${plain(titleCase(result.outcome))}${plain(method)}, ${plain(when)}`
    : `<strong>${plain(titleCase(result.outcome))}</strong> after ${result.rounds} rounds`;

  const cards = result.scorecards
    .map((card) => {
      return `<li>${plain(card.judgeName)}: ${card.totalA} &ndash; ${card.totalB}</li>`;
    })
    .join('');
  $('cards').innerHTML = result.scorecards.length ? `<ul>${cards}</ul>` : '';

  const sa = result.stats[a.id];
  const sb = result.stats[b.id];
  const statRow = (key: string, get: (s: NonNullable<typeof sa>) => string) =>
    sa && sb ? `<div class="tape-row"><span>${get(sa)}</span><em>${key}</em><span>${get(sb)}</span></div>` : '';
  $('stats').innerHTML =
    `<div class="tape-row head"><span>${plain(displayName(a))}</span><em></em><span>${plain(displayName(b))}</span></div>` +
    statRow('Significant strikes', (s) => `${s.significantStrikesLanded}/${s.significantStrikesAttempted}`) +
    statRow('Head / body / leg', (s) => `${s.headStrikes} / ${s.bodyStrikes} / ${s.legStrikes}`) +
    statRow('Takedowns', (s) => `${s.takedownsLanded}/${s.takedownsAttempted}`) +
    statRow('Submission attempts', (s) => String(s.submissionAttempts)) +
    statRow('Knockdowns', (s) => String(s.knockdowns)) +
    statRow('Control time', (s) => clock(s.controlTime));

  renderRoundBreakdown(a, b);

  $('result').hidden = false;
}

/**
 * The round-by-round breakdown, as a broadcast puts it up between rounds (brief §4).
 *
 * Head/body/leg per round per fighter, with the round the judges would have given shaded. The
 * fight totals alone hide the shape of a fight: a man who lost rounds one and two and then
 * took over reads identically to one who cruised, until you split it by round.
 */
function renderRoundBreakdown(a: Fighter, b: Fighter): void {
  if (!result) return;
  const perRound = result.roundStats;
  const left = perRound[a.id] ?? [];
  const right = perRound[b.id] ?? [];
  const rounds = Math.max(left.length, right.length);
  if (rounds === 0) {
    $('breakdown').innerHTML = '';
    return;
  }

  const cell = (s: (typeof left)[number] | undefined) =>
    s
      ? `<b>${s.significantStrikesLanded}</b><span>${s.headStrikes}/${s.bodyStrikes}/${s.legStrikes}</span>`
      : '<b>—</b><span></span>';

  let html = '<div class="rounds"><div class="rhead"><span></span>';
  for (let i = 0; i < rounds; i++) html += `<span>R${i + 1}</span>`;
  html += '</div>';
  for (const [fighter, series, corner] of [[a, left, 'red'], [b, right, 'blue']] as const) {
    html += `<div class="rrow ${corner}"><span class="rname">${plain(displayName(fighter))}</span>`;
    for (let i = 0; i < rounds; i++) {
      const mine = series[i]?.significantStrikesLanded ?? 0;
      const theirs = (fighter === a ? right : left)[i]?.significantStrikesLanded ?? 0;
      html += `<span class="rcell${mine > theirs ? ' won' : ''}">${cell(series[i])}</span>`;
    }
    html += '</div>';
  }
  html += '</div><p class="rlegend">Significant strikes landed, with head / body / leg beneath. Shaded cell led the round on volume.</p>';
  $('breakdown').innerHTML = html;
}

function renderStream(): void {
  if (!result) return;
  $('stream').innerHTML = result.events
    .map((event, index) => {
      const directive = mapEventToAnimation(event);
      return (
        `<li data-beat="${index}">` +
        `<span class="c1">R${event.round} ${event.roundTime}</span>` +
        `<span class="c2">${plain(directive.clip)}</span>` +
        `<span class="c3">${plain(directive.reaction.toLowerCase())}</span>` +
        `<span class="c4">${plain(event.description)}</span></li>`
      );
    })
    .join('');
}

/* --------------------------------------------------------------------- replay */

function showReplay(): void {
  if (!timeline) return;
  $('replay').hidden = false;
  const [a, b] = corner;
  $('hud-a').textContent = a ? displayName(a) : '';
  $('hud-b').textContent = b ? displayName(b) : '';

  if (!viewer) {
    viewer = createViewer($('stage'), {
      onFrame: onFrame,
      onError: (message) => {
        $('stage').innerHTML = `<p class="empty">${plain(message)}</p>`;
      },
    });
  }
  if (!viewer) return;
  viewer.load(timeline);
  $<HTMLInputElement>('scrub').max = String(timeline.duration);
  viewer.seek(0);
  viewer.play();
  $('play').textContent = 'Pause';
}

function onFrame(frame: Frame): void {
  $<HTMLInputElement>('scrub').value = String(frame.time);
  updateLiveCount(frame.time);
  $('time').textContent = `${clock(frame.time)} / ${clock(timeline?.duration ?? 0)}`;
  $('hud-clock').textContent = `R${frame.round} · ${frame.roundTime}`;
  $('hud-line').textContent = frame.description;
  $('hud-cam').textContent = frame.camera.toLowerCase().replace(/_/g, ' ');
}

/**
 * The live significant-strike count (brief §4).
 *
 * Counted from the event stream up to the playhead rather than from the fight totals, so it
 * ticks up as the replay runs and matches what has actually been shown.
 */
function updateLiveCount(time: number): void {
  if (!result || !corner[0] || !corner[1]) return;
  let left = 0;
  let right = 0;
  for (const event of result.events) {
    if (event.timestamp > time) break;
    if (event.eventType !== 'SIGNIFICANT_STRIKE') continue;
    const landed = 'result' in event && (event.result === 'LANDED' || event.result === 'PARTIAL');
    if (!landed || !('attacker' in event)) continue;
    if (event.attacker === corner[0].id) left++;
    else right++;
  }
  $('count-a').textContent = String(left);
  $('count-b').textContent = String(right);
}

/* ----------------------------------------------------------------------- wire */

function wire(): void {
  $('generate').addEventListener('click', () => build($<HTMLInputElement>('seed').value.trim() || 'sandbox'));
  for (const id of ['division', 'sort']) $(id).addEventListener('change', renderRoster);
  $('search').addEventListener('input', renderRoster);

  $('roster').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest('button[data-corner]');
    const row = (event.target as HTMLElement).closest('tr[data-id]');
    if (!row) return;
    const fighter = roster.find((f) => f.id === (row as HTMLElement).dataset.id);
    if (!fighter) return;
    const index = button ? (Number((button as HTMLElement).dataset.corner) as 0 | 1) : corner[0] ? 1 : 0;
    corner[index] = fighter;
    renderRoster();
    renderCorners();
  });

  $('swap').addEventListener('click', () => {
    corner = [corner[1], corner[0]];
    renderRoster();
    renderCorners();
  });
  $('random').addEventListener('click', () => {
    const pool = filtered();
    if (pool.length < 2) return;
    const first = Math.floor(Math.random() * pool.length);
    let second = Math.floor(Math.random() * pool.length);
    if (second === first) second = (second + 1) % pool.length;
    corner = [pool[first], pool[second]];
    renderRoster();
    renderCorners();
  });
  $('run').addEventListener('click', run);

  $('play').addEventListener('click', () => {
    if (!viewer) return;
    if (viewer.isPlaying) {
      viewer.pause();
      $('play').textContent = 'Play';
    } else {
      viewer.play();
      $('play').textContent = 'Pause';
    }
  });
  $('scrub').addEventListener('input', (event) => {
    viewer?.pause();
    $('play').textContent = 'Play';
    viewer?.seek(Number((event.target as HTMLInputElement).value));
  });
  $('rate').addEventListener('change', (event) => {
    viewer?.setRate(Number((event.target as HTMLSelectElement).value));
  });
  $('stream').addEventListener('click', (event) => {
    const row = (event.target as HTMLElement).closest('li[data-beat]');
    if (!row || !timeline) return;
    const beat = timeline.beats[Number((row as HTMLElement).dataset.beat)];
    if (!beat) return;
    viewer?.pause();
    $('play').textContent = 'Play';
    viewer?.seek(beat.start);
  });
}

wire();
build('sandbox');
