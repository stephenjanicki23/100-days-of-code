/**
 * REST + WebSocket API (brief §33).
 *
 * The universe is held in memory and persisted on every mutation. That is the right shape
 * for this workload: a tick touches most of the roster, so a write-through cache over
 * SQLite beats round-tripping per entity, and it keeps `POST /simulation/advance` atomic —
 * the advance either completes and is saved, or the process failed and the file is
 * unchanged.
 *
 * Read routes never touch the database at all, so a listing is a projection over live
 * objects rather than a query.
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import {
  DIVISIONS,
  advanceUniverse,
  currentAbility,
  division,
  fighterStyle,
  generateUniverse,
  mapEventToAnimation,
  FIGHT_EVENT_JSON_SCHEMA,
  animationRegistry,
  requiredClips,
  type Fighter,
  type Universe,
} from '@mma/sim';
import {
  developmentHistory,
  loadUniverse,
  openDatabase,
  recentEvents,
  saveUniverse,
  universeExists,
  type Db,
} from '@mma/data';
import { campProfile, campSummary, fighterProfile, fighterSummary, rankingView } from './views.ts';
import { mkdirSync } from 'node:fs';

const DB_PATH = process.env.MMA_DB ?? 'data/universe.sqlite';
const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? '0.0.0.0';

function ensureDirectory(path: string): void {
  const directory = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
  if (directory) mkdirSync(directory, { recursive: true });
}

/** Owns the single in-memory universe and the database it is written through to. */
class UniverseService {
  readonly db: Db;
  universe: Universe;

  constructor(path: string) {
    ensureDirectory(path);
    this.db = openDatabase(path);
    if (universeExists(this.db)) {
      this.universe = loadUniverse(this.db);
    } else {
      // A fresh checkout should be able to start the API and see a world.
      this.universe = generateUniverse({ seed: process.env.MMA_SEED ?? 'default-universe' });
      saveUniverse(this.db, this.universe);
    }
  }

  advance(days: number) {
    const report = advanceUniverse(this.universe, days);
    saveUniverse(this.db, this.universe, { snapshots: report.snapshots });
    return report;
  }
}

const service = new UniverseService(DB_PATH);

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? 'info' } });
await app.register(cors, { origin: true });
await app.register(websocket);

/* --------------------------------------------------------------- simulation */

app.get('/health', async () => ({ ok: true, date: service.universe.date }));

app.get('/simulation/state', async () => {
  const { state } = service.universe;
  const active = state.fighters.filter((fighter) => fighter.status !== 'retired');
  return {
    seed: state.seed,
    startDate: state.startDate,
    currentDate: state.currentDate,
    day: service.universe.day,
    week: service.universe.week,
    counts: {
      fighters: state.fighters.length,
      activeFighters: active.length,
      injured: active.filter((fighter) => fighter.status === 'injured').length,
      camps: state.camps.filter((camp) => camp.status !== 'closed').length,
      coaches: state.coaches.length,
      promotions: state.promotions.length,
      divisions: DIVISIONS.length,
    },
  };
});

app.post<{ Body?: { days?: number } }>('/simulation/advance', async (request, reply) => {
  const days = Math.floor(Number(request.body?.days ?? 7));
  if (!Number.isFinite(days) || days < 1 || days > 3650) {
    return reply.code(400).send({ error: 'days must be an integer between 1 and 3650' });
  }
  const report = service.advance(days);
  return {
    from: report.daysAdvanced,
    currentDate: service.universe.date,
    report: { ...report, snapshots: report.snapshots.length },
  };
});

/* ----------------------------------------------------------------- fighters */

interface FighterQuery {
  division?: string;
  camp?: string;
  promotion?: string;
  status?: string;
  q?: string;
  sort?: string;
  limit?: string;
  offset?: string;
}

app.get<{ Querystring: FighterQuery }>('/fighters', async (request) => {
  const { division: divisionKey, camp, promotion, status, q, sort = 'ability' } = request.query;
  const limit = Math.min(Number(request.query.limit ?? 50), 500);
  const offset = Math.max(Number(request.query.offset ?? 0), 0);
  const needle = q?.toLowerCase();

  let fighters: Fighter[] = service.universe.state.fighters.filter((fighter) => {
    if (divisionKey && fighter.divisionKey !== divisionKey) return false;
    if (camp && fighter.campId !== camp) return false;
    if (promotion && fighter.promotionId !== promotion) return false;
    if (status ? fighter.status !== status : fighter.status === 'retired') return false;
    if (needle && !`${fighter.firstName} ${fighter.lastName} ${fighter.nickname ?? ''}`.toLowerCase().includes(needle)) {
      return false;
    }
    return true;
  });

  const comparators: Record<string, (a: Fighter, b: Fighter) => number> = {
    ability: (a, b) => currentAbility(b) - currentAbility(a),
    popularity: (a, b) => b.career.popularity - a.career.popularity,
    name: (a, b) => a.lastName.localeCompare(b.lastName),
    wins: (a, b) => b.record.wins - a.record.wins,
    age: (a, b) => b.birthDate.localeCompare(a.birthDate),
  };
  fighters = fighters.sort(comparators[sort] ?? comparators.ability!);

  return {
    total: fighters.length,
    limit,
    offset,
    items: fighters.slice(offset, offset + limit).map((fighter) => fighterSummary(service.universe, fighter)),
  };
});

app.get<{ Params: { id: string } }>('/fighters/:id', async (request, reply) => {
  const fighter = service.universe.fighter(request.params.id);
  if (!fighter) return reply.code(404).send({ error: 'fighter not found' });
  return {
    ...fighterProfile(service.universe, fighter),
    development: developmentHistory(service.db, fighter.id),
  };
});

/* -------------------------------------------------------------------- camps */

app.get('/camps', async () => {
  const camps = [...service.universe.state.camps]
    .filter((camp) => camp.status !== 'closed')
    .sort((a, b) => b.reputation - a.reputation);
  return { total: camps.length, items: camps.map((camp) => campSummary(service.universe, camp)) };
});

app.get<{ Params: { id: string } }>('/camps/:id', async (request, reply) => {
  const camp = service.universe.camp(request.params.id);
  if (!camp) return reply.code(404).send({ error: 'camp not found' });
  return campProfile(service.universe, camp);
});

/* ------------------------------------------------------- divisions & rankings */

app.get('/divisions', async () =>
  DIVISIONS.map((definition) => ({
    key: definition.key,
    name: definition.name,
    sex: definition.sex,
    weightLimitLbs: definition.weightLimitLbs,
    order: definition.order,
    fighters: service.universe.fightersInDivision(definition.key).length,
  })),
);

app.get('/promotions', async () =>
  service.universe.state.promotions.map((promotion) => ({
    id: promotion.id,
    name: promotion.name,
    shortName: promotion.shortName,
    tier: promotion.tier,
    prestige: promotion.prestige,
    country: promotion.country,
    divisionKeys: promotion.divisionKeys,
    rosterSize: service.universe.state.fighters.filter(
      (fighter) => fighter.promotionId === promotion.id && fighter.status !== 'retired',
    ).length,
  })),
);

app.get<{ Params: { divisionKey: string }; Querystring: { promotion?: string } }>(
  '/rankings/:divisionKey',
  async (request, reply) => {
    const { divisionKey } = request.params;
    if (!DIVISIONS.some((definition) => definition.key === divisionKey)) {
      return reply.code(404).send({ error: 'unknown division' });
    }
    const promotionId = request.query.promotion ?? service.universe.state.promotions[0]?.id;
    if (!promotionId) return reply.code(404).send({ error: 'no promotions in this universe' });
    return rankingView(service.universe, promotionId, divisionKey);
  },
);

app.get('/champions', async () => {
  const promotion = service.universe.state.promotions[0];
  if (!promotion) return [];
  return service.universe.state.rankings
    .filter((entry) => entry.rank === 0 && entry.promotionId === promotion.id)
    .sort((a, b) => division(a.divisionKey).order - division(b.divisionKey).order)
    .map((entry) => {
      const fighter = service.universe.requireFighter(entry.fighterId);
      return {
        divisionKey: entry.divisionKey,
        divisionName: division(entry.divisionKey).name,
        fighter: fighterSummary(service.universe, fighter),
        style: fighterStyle(fighter).primary.label,
      };
    });
});

/* --------------------------------------------------------------------- news */

app.get<{ Querystring: { limit?: string } }>('/events', async (request) => {
  const limit = Math.min(Number(request.query.limit ?? 40), 400);
  return recentEvents(service.db, limit);
});

/* ------------------------------------------------------- fights (Phase 3/4) */

app.get<{ Params: { id: string } }>('/fights/:id', async (request, reply) => {
  const fight = service.db.prepare('SELECT * FROM fight WHERE id = ?').get(request.params.id);
  if (!fight) return reply.code(404).send({ error: 'fight not found' });
  return fight;
});

/**
 * The stored play-by-play for a fight. `?format=animation` returns the same stream mapped
 * through the 3D abstraction, which is what a renderer consumes — the mapping happens here
 * rather than in the engine so the fight data stays presentation-free.
 */
app.get<{ Params: { id: string }; Querystring: { format?: string } }>(
  '/fights/:id/events',
  async (request) => {
    const rows = service.db
      .prepare('SELECT payload FROM fight_event WHERE fight_id = ? ORDER BY sequence')
      .all(request.params.id) as { payload: string }[];
    const events = rows.map((row) => JSON.parse(row.payload));
    if (request.query.format === 'animation') {
      return events.map((event) => ({ event, directive: mapEventToAnimation(event) }));
    }
    return events;
  },
);

/** The contract itself, for non-TypeScript consumers such as Unreal or Unity. */
app.get('/schema/fight-event', async () => FIGHT_EVENT_JSON_SCHEMA);
app.get('/schema/animation-registry', async () => ({
  registry: animationRegistry(),
  requiredClips: requiredClips(),
}));

/**
 * Live fight feed (brief §33, Phase 6).
 *
 * The socket replays a stored fight's events in order. Once the fight engine lands in
 * Phase 3 the same socket carries events as they are generated — the frame is identical, so
 * the frontend and the 3D client are written once.
 */
app.get<{ Params: { id: string } }>('/ws/fights/:id', { websocket: true }, (socket, request) => {
  const rows = service.db
    .prepare('SELECT payload FROM fight_event WHERE fight_id = ? ORDER BY sequence')
    .all((request.params as { id: string }).id) as { payload: string }[];

  socket.send(JSON.stringify({ type: 'FEED_OPEN', fightId: (request.params as { id: string }).id, events: rows.length }));
  for (const row of rows) {
    const event = JSON.parse(row.payload);
    socket.send(JSON.stringify({ type: 'FIGHT_EVENT', event, directive: mapEventToAnimation(event) }));
  }
  socket.send(JSON.stringify({ type: 'FEED_END' }));
});

/* --------------------------------------------------------------------- boot */

try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`MMA Universe API on :${PORT} — ${DB_PATH} @ ${service.universe.date}`);
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
