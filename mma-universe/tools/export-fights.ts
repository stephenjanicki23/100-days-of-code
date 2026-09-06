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

/**
 * And one fight picked for the matchup rather than the finish.
 *
 * The other three are chosen by how they ended, which says nothing about how they looked. A
 * showcase for cage control needs the fight cage control is *about*: someone who wants the
 * middle against someone who wants the outside. Picked by the widest gap in where the two men
 * want the fight to happen, over a slightly deeper pool than the top contenders, because a
 * clean style clash is rarer than a good fighter.
 */
{
  const pool = universe.state.fighters
    .filter((f) => f.status === 'active' && currentAbility(f) > 125)
    .map((fighter) => ({ fighter, profile: movementProfile(fighter, 'styles') }));

  let best: { a: Fighter; b: Fighter; gap: number } | undefined;
  for (const forward of pool) {
    for (const outside of pool) {
      if (forward.fighter.divisionKey !== outside.fighter.divisionKey) continue;
      if (forward.fighter.id === outside.fighter.id) continue;
      const gap =
        (forward.profile.pressure - outside.profile.pressure) +
        (outside.profile.reach - forward.profile.reach);
      if (!best || gap > best.gap) best = { a: forward.fighter, b: outside.fighter, gap };
    }
  }

  if (!best) {
    console.error('no style clash found');
  } else {
    const label = 'Styles make fights';
    const result =
      findFight(best.a, best.b, 3, (r) => r.events.length > 180, `${label}-${best.a.id}`) ??
      simulateFight(best.a, best.b, { fightId: `${label}-${best.a.id}`, rounds: 3 }, Rng.fromSeed(`${label}-${best.a.id}`));
    fights.push(pack(best.a, best.b, result, label));
    console.error(
      `${label}: ${displayName(best.a)} (${fighterStyle(best.a).primary.label}) vs ` +
        `${displayName(best.b)} (${fighterStyle(best.b).primary.label}) — gap ${best.gap.toFixed(2)}, ` +
        `${result.outcome} (${result.events.length} events)`,
    );
  }
}

const out = process.argv[2] ?? 'fights.json';
writeFileSync(out, JSON.stringify(fights));
console.error(`wrote ${out}`);
