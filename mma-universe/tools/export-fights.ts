/**
 * Bakes a handful of fights into the JSON a standalone renderer consumes.
 *
 * This produces exactly what `/fights/:id/events?format=animation` serves — event plus
 * directive, nothing more — so a page fed by this file is fed by the same contract as the
 * live app. Fields are trimmed to the ones a renderer actually reads, because the payload
 * ships inside the page.
 *
 * Deterministic: fixed seeds in, identical fights out.
 */

import { writeFileSync } from 'node:fs';
import {
  Rng,
  currentAbility,
  displayName,
  fighterStyle,
  generateUniverse,
  mapEventToAnimation,
  recordString,
  movementProfile,
  simulateFight,
  type Fighter,
  type FightResult,
} from '@mma/sim';

const universe = generateUniverse({ seed: 'showcase-2026' });

const contenders = universe.state.fighters
  .filter((f) => currentAbility(f) > 140 && f.status === 'active')
  .sort((a, b) => currentAbility(b) - currentAbility(a));

function describe(fighter: Fighter) {
  const style = fighterStyle(fighter);
  return {
    id: fighter.id,
    name: displayName(fighter),
    record: recordString(fighter),
    style: style.primary.label,
    signature: style.signatureSkill.label,
    ability: Math.round(currentAbility(fighter)),
    division: fighter.divisionKey.replace(/^[mw]_/, '').replace(/_/g, ' '),
  };
}

function pack(a: Fighter, b: Fighter, result: FightResult, headline: string) {
  return {
    id: result.fightId,
    headline,
    rounds: result.rounds,
    outcome: result.outcome,
    technique: result.technique,
    finishRound: result.finishRound,
    finishTime: result.finishTime,
    winnerId: result.winnerId,
    a: describe(a),
    b: describe(b),
    // How the two of them move, so the renderer does not animate every fighter identically.
    profiles: [movementProfile(a, result.fightId), movementProfile(b, result.fightId)],
    beats: result.events.map((event) => {
      const d = mapEventToAnimation(event);
      const packed: Record<string, unknown> = {
        s: event.sequence,
        t: Math.round(event.timestamp * 100) / 100,
        r: event.round,
        c: event.roundTime,
        d: event.description,
        k: event.eventType,
        clip: d.clip,
        v: d.variant,
        st: d.targetState,
        cam: d.camera,
        rx: d.reaction,
        sp: d.speed,
      };
      if (d.actorId) packed.act = d.actorId;
      if (d.reactorId) packed.rct = d.reactorId;
      return packed;
    }),
  };
}

/** Searches seeds for a fight that finished the way we want to show it off. */
function findFight(
  a: Fighter,
  b: Fighter,
  rounds: number,
  wanted: (result: FightResult) => boolean,
  prefix: string,
): FightResult | undefined {
  for (let i = 0; i < 400; i++) {
    const seed = `${prefix}_${i}`;
    const result = simulateFight(a, b, { fightId: seed, rounds }, Rng.fromSeed(seed));
    if (wanted(result)) return result;
  }
  return undefined;
}

const wanted: { label: string; rounds: number; test: (r: FightResult) => boolean }[] = [
  { label: 'Knockout', rounds: 3, test: (r) => r.outcome === 'KO' || r.outcome === 'TKO' },
  { label: 'Submission', rounds: 3, test: (r) => r.outcome === 'SUBMISSION' },
  { label: 'Five-round title fight', rounds: 5, test: (r) => r.outcome.endsWith('DECISION') },
];

const fights: unknown[] = [];
let cursor = 0;

for (const want of wanted) {
  let found: { a: Fighter; b: Fighter; result: FightResult } | undefined;
  while (!found && cursor < contenders.length - 1) {
    const a = contenders[cursor];
    const b = contenders.find((f, i) => i > cursor && f.divisionKey === a?.divisionKey);
    cursor++;
    if (!a || !b) continue;
    const result = findFight(a, b, want.rounds, want.test, `${want.label}-${a.id}`);
    if (result) found = { a, b, result };
  }
  if (!found) {
    console.error(`no fight found for ${want.label}`);
    continue;
  }
  fights.push(pack(found.a, found.b, found.result, want.label));
  console.error(
    `${want.label}: ${displayName(found.a)} vs ${displayName(found.b)} — ${found.result.outcome} ` +
      `${found.result.technique ?? ''} R${found.result.finishRound ?? '-'} (${found.result.events.length} events)`,
  );
}

const out = process.argv[2] ?? 'fights.json';
writeFileSync(out, JSON.stringify(fights));
console.error(`wrote ${out}`);
