/**
 * Engine verification (brief §5).
 *
 * Simulates a large sample per weight class and prints what the engine actually produces
 * against what `pacing.ts` says it should. Every number the brief specifies is measured here,
 * so tuning is a matter of changing the config and re-running rather than reading the engine
 * and hoping.
 *
 * Usage: npx tsx tools/verify-fights.ts [fightsPerClass]
 */

import { Rng, generateUniverse, simulateFight, classProfile, division, type Fighter } from '@mma/sim';

const PER_CLASS = Number(process.argv[2] ?? 1000);

const CLASSES = [
  'm_flyweight', 'm_bantamweight', 'm_featherweight', 'm_lightweight',
  'm_welterweight', 'm_middleweight', 'm_light_heavyweight', 'm_heavyweight',
  'w_strawweight', 'w_flyweight', 'w_bantamweight',
];

const universe = generateUniverse({ seed: 'verify-2026' });
const active = universe.state.fighters.filter((f) => f.status === 'active');
const pool = new Map<string, Fighter[]>();
for (const fighter of active) pool.set(fighter.divisionKey, [...(pool.get(fighter.divisionKey) ?? []), fighter]);

interface Tally {
  fights: number; seconds: number;
  thrown: number; landed: number; totalThrown: number; totalLanded: number;
  head: number; body: number; leg: number;
  tdAttempts: number; tdLanded: number; knockdowns: number;
  ko: number; sub: number; dec: number; other: number;
  strikes: Map<string, number>;
}

function empty(): Tally {
  return {
    fights: 0, seconds: 0, thrown: 0, landed: 0, totalThrown: 0, totalLanded: 0,
    head: 0, body: 0, leg: 0, tdAttempts: 0, tdLanded: 0, knockdowns: 0,
    ko: 0, sub: 0, dec: 0, other: 0, strikes: new Map(),
  };
}

const overall = empty();
const rows: [string, Tally][] = [];

for (const key of CLASSES) {
  const fighters = pool.get(key) ?? [];
  if (fighters.length < 4) continue;
  const tally = empty();

  for (let i = 0; i < PER_CLASS; i++) {
    const pick = Rng.fromSeed(`pair_${key}_${i}`);
    const x = fighters[pick.int(0, fighters.length - 1)]!;
    let y = fighters[pick.int(0, fighters.length - 1)]!;
    if (y.id === x.id) y = fighters[(fighters.indexOf(x) + 1) % fighters.length]!;

    const seed = `verify_${key}_${i}`;
    const result = simulateFight(x, y, { fightId: seed, rounds: 3 }, Rng.fromSeed(seed));
    tally.fights++;
    tally.seconds += result.events[result.events.length - 1]!.timestamp;

    if (result.outcome === 'KO' || result.outcome === 'TKO') tally.ko++;
    else if (result.outcome === 'SUBMISSION') tally.sub++;
    else if (result.outcome.includes('DECISION')) tally.dec++;
    else tally.other++;

    for (const stats of Object.values(result.stats)) {
      tally.thrown += stats.significantStrikesAttempted;
      tally.landed += stats.significantStrikesLanded;
      tally.totalLanded += stats.totalStrikesLanded;
      tally.head += stats.headStrikes;
      tally.body += stats.bodyStrikes;
      tally.leg += stats.legStrikes;
      tally.tdAttempts += stats.takedownsAttempted;
      tally.tdLanded += stats.takedownsLanded;
      tally.knockdowns += stats.knockdowns;
    }
    for (const event of result.events) {
      if ((event.eventType === 'SIGNIFICANT_STRIKE' || event.eventType === 'STRIKE') && 'technique' in event) {
        const k = event.technique as string;
        tally.strikes.set(k, (tally.strikes.get(k) ?? 0) + 1);
        overall.strikes.set(k, (overall.strikes.get(k) ?? 0) + 1);
        tally.totalThrown++;
      }
    }
  }
  rows.push([key, tally]);
}

const band = (value: number, [lo, hi]: readonly [number, number]) =>
  value < lo ? 'LOW ' : value > hi ? 'HIGH' : ' ok ';
const pct = (n: number, d: number) => (d ? (n / d) * 100 : 0);

console.log(`\n${PER_CLASS} fights per class, 3 rounds, seeded.\n`);
console.log('class               thrown/min        landed/min        KO+TKO           sub   dec   TD/15m  TD%   KD/fight');
console.log('─'.repeat(112));
for (const [key, t] of rows) {
  const minutes = t.seconds / 60;
  const thrown = t.thrown / minutes / 2;
  const landed = t.landed / minutes / 2;
  const koRate = t.ko / t.fights;
  const target = classProfile(key).targets;
  const per15 = (t.tdAttempts / t.fights / 2) * (15 / (minutes / t.fights));
  console.log(
    division(key).name.padEnd(19) +
    `${thrown.toFixed(1).padStart(5)} ${band(thrown, target.thrownPerMin)} ` +
    `${landed.toFixed(1).padStart(6)} ${band(landed, target.landedPerMin)} ` +
    `${(koRate * 100).toFixed(0).padStart(5)}% ${band(koRate, target.koRate)} ` +
    `${pct(t.sub, t.fights).toFixed(0).padStart(4)}% ${pct(t.dec, t.fights).toFixed(0).padStart(4)}% ` +
    `${per15.toFixed(1).padStart(6)} ${pct(t.tdLanded, t.tdAttempts).toFixed(0).padStart(4)}% ` +
    `${(t.knockdowns / t.fights).toFixed(2).padStart(7)}`,
  );
}

const REAL: Record<string, number> = {
  JAB: 30, CROSS: 20, LEFT_HOOK: 8.5, RIGHT_HOOK: 6.5, UPPERCUT: 7, OVERHAND: 4,
  LOW_KICK: 12, BODY_KICK: 4, HEAD_KICK: 2, ELBOW: 2, KNEE: 2,
};
const FLASHY = new Set(['SPINNING_BACK_KICK', 'WHEEL_KICK', 'BACKFIST', 'SUPERMAN_PUNCH', 'FLYING_KNEE']);
const GROUND = new Set(['GROUND_PUNCH', 'GROUND_ELBOW', 'HAMMERFIST']);

let standing = 0;
for (const [k, v] of overall.strikes) if (!GROUND.has(k)) standing += v;

console.log('\nStanding strike distribution (share of standing strikes thrown, all classes)');
console.log('─'.repeat(60));
let flashyTotal = 0;
for (const [k, v] of [...overall.strikes].sort((x, y) => y[1] - x[1])) {
  if (GROUND.has(k)) continue;
  const share = pct(v, standing);
  if (FLASHY.has(k)) flashyTotal += share;
  const want = REAL[k];
  console.log(
    `  ${k.padEnd(20)} ${share.toFixed(1).padStart(5)}%` +
    (want !== undefined ? `   target ~${String(want).padStart(4)}%  ${Math.abs(share - want) <= Math.max(1.5, want * 0.35) ? 'ok' : '<-- off'}` : ''),
  );
}
console.log(`\n  flashy set combined  ${flashyTotal.toFixed(2)}%   target ~1%  ${flashyTotal <= 2 ? 'ok' : '<-- off'}`);

const totalTargets = rows.flatMap(([key, t]) => {
  const minutes = t.seconds / 60;
  const target = classProfile(key).targets;
  return [
    band(t.thrown / minutes / 2, target.thrownPerMin),
    band(t.landed / minutes / 2, target.landedPerMin),
    band(t.ko / t.fights, target.koRate),
  ];
});
console.log(`\n${totalTargets.filter((x) => x === ' ok ').length}/${totalTargets.length} class targets in range.`);
