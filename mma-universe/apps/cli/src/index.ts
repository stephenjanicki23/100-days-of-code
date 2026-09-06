#!/usr/bin/env tsx
/**
 * MMA Universe command line.
 *
 *   mma generate [--seed S] [--fighters N] [--camps N] [--db PATH]
 *   mma advance  [--days N | --weeks N | --months N | --years N] [--db PATH]
 *   mma show     rankings|fighter|camps|news [args] [--db PATH]
 *
 * The CLI is a thin shell over `@mma/sim` and `@mma/data`: it parses arguments, calls the
 * simulation, persists, and formats. No simulation logic lives here.
 */

import {
  advanceUniverse, currentAbility, displayName, division, fighterAge, fighterStyle, generateUniverse,
  recordString, abilityTier, DIVISIONS, primarySpecialisation, discipline, simulateFight, applyFightResult,
  summariseResult, isDecisiveEvent, Rng, STANDARD_ROUNDS, TITLE_FIGHT_ROUNDS, type Fight, type Fighter,
} from '@mma/sim';
import {
  developmentHistory, loadUniverse, openDatabase, recentEvents, saveUniverse, universeExists,
  saveFight, loadFightEvents, loadScorecards, loadFight, recentFights,
} from '@mma/data';
import { mkdirSync } from 'node:fs';

const DEFAULT_DB = 'data/universe.sqlite';

interface Args {
  readonly command: string;
  readonly positionals: readonly string[];
  readonly flags: Readonly<Record<string, string | boolean>>;
}

function parseArgs(argv: readonly string[]): Args {
  const [command = 'help', ...rest] = argv;
  const positionals: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < rest.length; i++) {
    const token = rest[i]!;
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = rest[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positionals.push(token);
    }
  }
  return { command, positionals, flags };
}

function flagNumber(flags: Args['flags'], key: string): number | undefined {
  const value = flags[key];
  if (value === undefined || value === true) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function dbPath(flags: Args['flags']): string {
  const value = flags.db;
  return typeof value === 'string' ? value : DEFAULT_DB;
}

function ensureDirectory(path: string): void {
  const directory = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
  if (directory) mkdirSync(directory, { recursive: true });
}

function pad(text: string, width: number): string {
  return text.length >= width ? text.slice(0, width) : text.padEnd(width);
}

/* ------------------------------------------------------------------ generate */

function commandGenerate(args: Args): void {
  const seed = typeof args.flags.seed === 'string' ? args.flags.seed : String(Date.now());
  const fighterCount = flagNumber(args.flags, 'fighters') ?? 560;
  const campCount = flagNumber(args.flags, 'camps') ?? 54;
  const path = dbPath(args.flags);

  console.log(`Generating universe (seed ${seed})…`);
  const started = Date.now();
  const universe = generateUniverse({ seed, fighterCount, campCount });

  ensureDirectory(path);
  const db = openDatabase(path);
  if (universeExists(db) && args.flags.force !== true) {
    console.error(`\n${path} already holds a universe. Pass --force to overwrite it.`);
    process.exit(1);
  }
  saveUniverse(db, universe);
  db.close();

  const { fighters, camps, coaches, promotions } = universe.state;
  console.log(`\n  ${fighters.length} fighters · ${camps.length} camps · ${coaches.length} coaches · ${promotions.length} promotions`);
  console.log(`  ${DIVISIONS.length} divisions · start date ${universe.state.startDate}`);
  console.log(`  written to ${path} in ${Date.now() - started}ms\n`);

  const champions = universe.state.rankings.filter((r) => r.rank === 0 && r.promotionId === promotions[0]!.id);
  console.log(`${promotions[0]!.name} champions:`);
  for (const entry of champions.sort((a, b) => division(a.divisionKey).order - division(b.divisionKey).order)) {
    const fighter = universe.requireFighter(entry.fighterId);
    console.log(`  ${pad(division(entry.divisionKey).name, 22)} ${pad(displayName(fighter), 36)} ${recordString(fighter)}`);
  }
}

/* ------------------------------------------------------------------- advance */

function commandAdvance(args: Args): void {
  const path = dbPath(args.flags);
  const db = openDatabase(path);
  const universe = loadUniverse(db);

  const composed =
    (flagNumber(args.flags, 'weeks') ?? 0) * 7 +
    (flagNumber(args.flags, 'months') ?? 0) * 30 +
    (flagNumber(args.flags, 'years') ?? 0) * 365;
  // `--days` wins outright; otherwise the week/month/year flags compose, defaulting to a week.
  const days = flagNumber(args.flags, 'days') ?? (composed > 0 ? composed : 7);

  const from = universe.date;
  console.log(`Advancing ${days} day(s) from ${from}…`);
  const started = Date.now();
  const report = advanceUniverse(universe, days);
  saveUniverse(db, universe, { snapshots: report.snapshots });
  // Play-by-play is written per fight; the universe save only carries the bout's result.
  for (const { fight, result } of report.fightResults) saveFight(db, fight, result);

  console.log(`\n  ${from} → ${universe.date}  (${Date.now() - started}ms)`);
  console.log(`  training weeks   ${report.trainingWeeks}`);
  console.log(`  injuries         ${report.injuriesOpened} sustained, ${report.injuriesHealed} healed`);
  console.log(`  retirements      ${report.retirements}`);
  console.log(`  debuts           ${report.debuts}`);
  console.log(`  camp moves       ${report.campMoves}`);
  console.log(`  camps closed     ${report.campsClosed}`);
  const promotion = report.promotion;
  console.log(`  events           ${promotion.eventsBooked} booked, ${promotion.eventsHeld} held`);
  console.log(`  fights           ${promotion.fightsSimulated} (${promotion.titleFights} for a title, ${promotion.titleChanges} changed hands)`);
  console.log(`  short notice     ${promotion.replacements} replacements, ${promotion.fightsCancelled} cancelled`);
  console.log(`  contracts        +${promotion.contractsSigned} / -${promotion.contractsReleased}`);
  console.log(`  news             ${promotion.articlesPublished} articles, ${promotion.storylinesStarted} storylines`);
  console.log(`  revenue          $${(promotion.revenue / 1_000_000).toFixed(1)}M`);

  if (report.topRisers.length > 0) {
    console.log('\n  most improved in the final week:');
    for (const { fighterId, delta } of report.topRisers) {
      const fighter = universe.fighter(fighterId);
      if (fighter && delta > 0) {
        console.log(`    +${delta.toFixed(2)}  ${pad(displayName(fighter), 34)} CA ${currentAbility(fighter).toFixed(0)}`);
      }
    }
  }

  const news = recentEvents(db, 6);
  if (news.length > 0) {
    console.log('\n  latest from around the sport:');
    for (const event of news) console.log(`    ${event.date}  ${event.summary}`);
  }
  db.close();
  console.log();
}

/* --------------------------------------------------------------------- fight */

/** Resolves a fighter from an id or a name fragment. */
function findFighter(universe: ReturnType<typeof loadUniverse>, query: string): Fighter | undefined {
  const needle = query.toLowerCase();
  return (
    universe.fighter(query) ??
    universe.state.fighters.find((f) => `${f.firstName} ${f.lastName}`.toLowerCase().includes(needle))
  );
}

function commandFight(args: Args): void {
  const path = dbPath(args.flags);
  const db = openDatabase(path);
  const universe = loadUniverse(db);

  const divisionKey = typeof args.flags.division === 'string' ? args.flags.division : 'm_lightweight';
  const promotion = universe.state.promotions[0]!;

  let a: Fighter | undefined;
  let b: Fighter | undefined;
  if (typeof args.flags.a === 'string' && typeof args.flags.b === 'string') {
    a = findFighter(universe, args.flags.a);
    b = findFighter(universe, args.flags.b);
  } else {
    // Default to the most compelling bout available: champion versus top contender.
    const ranked = universe.rankingsFor(promotion.id, divisionKey);
    a = ranked[0] ? universe.fighter(ranked[0].fighterId) : undefined;
    b = ranked[1] ? universe.fighter(ranked[1].fighterId) : undefined;
  }

  if (!a || !b) {
    console.error('Could not resolve both fighters. Use --a and --b with ids or names.');
    db.close();
    process.exit(1);
  }

  const isTitleFight = args.flags.title === true;
  const rounds = flagNumber(args.flags, 'rounds') ?? (isTitleFight ? TITLE_FIGHT_ROUNDS : STANDARD_ROUNDS);

  const fight: Fight = {
    id: universe.nextId('fight'),
    divisionKey: a.divisionKey,
    fighterAId: a.id,
    fighterBId: b.id,
    boutOrder: 1,
    billing: 'main_event',
    isTitleFight,
    scheduledRounds: rounds,
    status: 'scheduled',
  };

  console.log(`\n${division(fight.divisionKey).name}${isTitleFight ? ' title fight' : ''} · ${rounds} rounds\n`);
  console.log(`  ${pad(displayName(a), 34)} ${pad(recordString(a), 10)} ${fighterStyle(a).primary.label}`);
  console.log(`  ${pad(displayName(b), 34)} ${pad(recordString(b), 10)} ${fighterStyle(b).primary.label}\n`);

  const result = simulateFight(a, b, { fightId: fight.id, rounds, isTitleFight }, universe.rngFor('fight', fight.id));
  applyFightResult(universe, fight, result, { date: universe.date });

  const verbose = args.flags.verbose === true;
  let round = 0;
  for (const event of result.events) {
    if (event.round !== round) {
      round = event.round;
    }
    if (verbose || isDecisiveEvent(event) || ['ROUND_START', 'ROUND_END', 'CORNER_INSTRUCTION', 'DECISION', 'REFEREE_ACTION'].includes(event.eventType)) {
      const clock = ['ROUND_START', 'ROUND_END'].includes(event.eventType) ? '     ' : event.roundTime;
      console.log(`  R${event.round} ${clock}  ${event.description}`);
    }
  }

  console.log(`\n  ${summariseResult(result, (id) => displayName(universe.requireFighter(id)))}\n`);
  for (const [id, statistics] of Object.entries(result.stats)) {
    const fighter = universe.requireFighter(id);
    console.log(
      `  ${pad(fighter.lastName, 16)} sig ${pad(`${statistics.significantStrikesLanded}/${statistics.significantStrikesAttempted}`, 8)}` +
        ` head ${pad(String(statistics.headStrikes), 3)} body ${pad(String(statistics.bodyStrikes), 3)} leg ${pad(String(statistics.legStrikes), 3)}` +
        ` TD ${pad(`${statistics.takedownsLanded}/${statistics.takedownsAttempted}`, 6)} sub ${pad(String(statistics.submissionAttempts), 3)}` +
        ` ctrl ${pad(`${statistics.controlTime}s`, 6)} KD ${statistics.knockdowns}`,
    );
  }
  if (result.scorecards.length > 0 && result.outcome.includes('DECISION')) {
    console.log();
    for (const card of result.scorecards) {
      console.log(`  ${pad(card.judgeName, 22)} ${card.totalA}-${card.totalB}   [${card.rounds.map((r) => `${r.a}-${r.b}`).join('  ')}]`);
    }
  }

  saveFight(db, fight, result);
  saveUniverse(db, universe);
  db.close();
  console.log(`\n  saved as ${fight.id} — see it with: mma show fight ${fight.id}\n`);
}

/* ---------------------------------------------------------------------- show */

function showRankings(universe: ReturnType<typeof loadUniverse>, divisionKey: string, promotionShort?: string): void {
  const promotion =
    universe.state.promotions.find((p) => p.shortName.toLowerCase() === promotionShort?.toLowerCase()) ??
    universe.state.promotions[0]!;
  const entries = universe.rankingsFor(promotion.id, divisionKey);
  if (entries.length === 0) {
    console.log(`No rankings for ${divisionKey} in ${promotion.shortName}.`);
    return;
  }
  console.log(`\n${promotion.name} — ${division(divisionKey).name}  (${universe.date})\n`);
  for (const entry of entries) {
    const fighter = universe.requireFighter(entry.fighterId);
    const style = fighterStyle(fighter);
    const label = entry.rank === 0 ? 'C' : `${entry.rank}`;
    const movement =
      entry.previousRank === undefined ? '  ' : entry.previousRank > entry.rank ? '▲' : entry.previousRank < entry.rank ? '▼' : ' ';
    console.log(
      `${pad(label, 3)}${movement} ${pad(displayName(fighter), 34)} ${pad(recordString(fighter), 11)} ` +
        `age ${pad(String(fighterAge(fighter, universe.date)), 3)} ${pad(style.primary.label, 26)} ${entry.points.toFixed(1)}`,
    );
  }
  console.log();
}

function showFighter(universe: ReturnType<typeof loadUniverse>, query: string, path: string): void {
  const needle = query.toLowerCase();
  const fighter =
    universe.fighter(query) ??
    universe.state.fighters.find((f) => `${f.firstName} ${f.lastName}`.toLowerCase().includes(needle));
  if (!fighter) {
    console.log(`No fighter matching "${query}".`);
    return;
  }

  const ability = currentAbility(fighter);
  const style = fighterStyle(fighter);
  const camp = fighter.campId ? universe.camp(fighter.campId) : undefined;
  const promotion = fighter.promotionId ? universe.promotion(fighter.promotionId) : undefined;

  console.log(`\n${displayName(fighter)}   ${recordString(fighter)}`);
  console.log(`${division(fighter.divisionKey).name} · ${fighter.homeRegion}, ${fighter.nationality} · age ${fighterAge(fighter, universe.date)} · ${fighter.stance}`);
  console.log(`${fighter.heightIn.toFixed(1)}" tall, ${fighter.reachIn.toFixed(1)}" reach`);
  console.log(`\nCamp        ${camp ? `${camp.name} (reputation ${camp.reputation.toFixed(0)})` : 'unattached'}`);
  console.log(`Promotion   ${promotion ? promotion.name : 'unsigned'}`);
  console.log(`Ability     ${ability.toFixed(0)} current / ${fighter.potentialAbility.toFixed(0)} potential — ${abilityTier(ability).label}`);
  console.log(`Style       ${style.primary.label} / ${style.secondary.label}`);
  console.log(`Strength    ${style.strength.label} (${style.strength.rating})`);
  console.log(`Weakness    ${style.weakness.label} (${style.weakness.rating})`);
  console.log(`Signature   ${style.signatureSkill.label} (${style.signatureSkill.rating})`);
  console.log(`Condition   fatigue ${fighter.condition.fatigue.toFixed(0)} · sharpness ${fighter.condition.sharpness.toFixed(0)} · wear ${fighter.condition.wearAndTear.toFixed(0)}`);

  const open = fighter.condition.injuries.filter((i) => !i.endDate);
  if (open.length > 0) {
    console.log(`Injured     ${open.map((i) => `${i.label} (out until ${i.expectedReturn})`).join(', ')}`);
  }

  const db = openDatabase(path);
  const history = developmentHistory(db, fighter.id);
  db.close();
  if (history.length > 1) {
    console.log('\nDevelopment');
    for (const point of history.slice(-8)) {
      const filled = Math.round((point.currentAbility / 200) * 40);
      console.log(`  ${point.date}  age ${pad(String(point.age), 3)} ${'█'.repeat(filled)}${'·'.repeat(40 - filled)} ${point.currentAbility.toFixed(0)}`);
    }
  }
  console.log();
}

function showCamps(universe: ReturnType<typeof loadUniverse>): void {
  const camps = [...universe.state.camps].sort((a, b) => b.reputation - a.reputation).slice(0, 20);
  console.log(`\nTop camps (${universe.date})\n`);
  for (const camp of camps) {
    const specialisation = primarySpecialisation(camp);
    const roster = universe.campFighters(camp.id).filter((f) => f.status !== 'retired');
    const best = roster.map(currentAbility).sort((a, b) => b - a)[0] ?? 0;
    console.log(
      `${pad(camp.name, 34)} ${pad(`${camp.city}, ${camp.country}`, 26)} rep ${pad(camp.reputation.toFixed(0), 3)} ` +
        `${pad(`${roster.length}/${camp.capacity}`, 7)} best ${pad(best.toFixed(0), 4)} ` +
        `${specialisation ? `${discipline(specialisation.disciplineKey).label} ×${specialisation.multiplier}` : ''}`,
    );
  }
  console.log();
}

function commandShow(args: Args): void {
  const path = dbPath(args.flags);
  const db = openDatabase(path);
  const universe = loadUniverse(db);
  const [subject = 'rankings', ...rest] = args.positionals;

  switch (subject) {
    case 'rankings': {
      const divisionKey = rest[0] ?? 'm_lightweight';
      db.close();
      showRankings(universe, divisionKey, rest[1]);
      break;
    }
    case 'fighter': {
      db.close();
      showFighter(universe, rest.join(' ') || 'fighter_00001', path);
      break;
    }
    case 'camps': {
      db.close();
      showCamps(universe);
      break;
    }
    case 'fight': {
      const fightId = rest[0];
      const fight = fightId ? loadFight(db, fightId) : recentFights(db, 1)[0];
      if (!fight) {
        db.close();
        console.log('No fights have been simulated yet. Run: mma fight');
        break;
      }
      const fightEvents = loadFightEvents(db, fight.id);
      const cards = loadScorecards(db, fight.id);
      db.close();
      console.log(`\n${fight.fighterAName} vs ${fight.fighterBName} — ${division(fight.divisionKey).name}\n`);
      for (const event of fightEvents) {
        if (isDecisiveEvent(event) || ['ROUND_START', 'ROUND_END', 'DECISION', 'CORNER_INSTRUCTION'].includes(event.eventType)) {
          console.log(`  R${event.round} ${event.roundTime}  ${event.description}`);
        }
      }
      for (const card of cards) console.log(`  ${pad(card.judgeName, 22)} ${card.totalA}-${card.totalB}`);
      console.log();
      break;
    }
    case 'fights': {
      const fights = recentFights(db, flagNumber(args.flags, 'limit') ?? 20);
      db.close();
      console.log(`\nRecent results (${universe.date})\n`);
      for (const fight of fights) {
        console.log(
          `  ${pad(fight.fightDate ?? '', 11)} ${pad(division(fight.divisionKey).name, 20)} ` +
            `${pad(`${fight.fighterAName} vs ${fight.fighterBName}`, 44)} ${fight.winnerName ?? 'Draw'} ` +
            `(${(fight.outcome ?? '').replace(/_/g, ' ').toLowerCase()}${fight.finishRound ? `, R${fight.finishRound}` : ''})`,
        );
      }
      console.log();
      break;
    }
    case 'news': {
      const news = recentEvents(db, flagNumber(args.flags, 'limit') ?? 25);
      db.close();
      console.log(`\nRecent events (${universe.date})\n`);
      for (const event of news) console.log(`  ${event.date}  ${pad(event.type, 20)} ${event.summary}`);
      console.log();
      break;
    }
    default:
      db.close();
      console.log(`Unknown subject "${subject}". Try: rankings, fighter, camps, fights, fight, news.`);
  }
}

/* ---------------------------------------------------------------------- main */

function help(): void {
  console.log(`
MMA Universe

  mma generate [--seed S] [--fighters N] [--camps N] [--db PATH] [--force]
      Creates a new universe and writes it to a SQLite file.

  mma advance [--days N] [--weeks N] [--months N] [--years N] [--db PATH]
      Advances the simulation and persists the result.

  mma fight [--a <id|name>] [--b <id|name>] [--division KEY] [--title] [--rounds N] [--verbose]
      Simulates a bout, applies the result to both careers, and stores the play-by-play.

  mma show rankings [divisionKey] [promotionShortName]
  mma show fighter <id or name>
  mma show camps
  mma show fights [--limit N]
  mma show fight <fightId>
  mma show news [--limit N]

  Default database: ${DEFAULT_DB}
  Divisions: ${DIVISIONS.map((d) => d.key).join(', ')}
`);
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  switch (args.command) {
    case 'generate':
      commandGenerate(args);
      break;
    case 'advance':
      commandAdvance(args);
      break;
    case 'fight':
      commandFight(args);
      break;
    case 'show':
      commandShow(args);
      break;
    default:
      help();
  }
}

main();
