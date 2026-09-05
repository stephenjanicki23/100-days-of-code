/**
 * Universe persistence.
 *
 * A universe is written as one transaction. At the scale the brief targets (thousands of
 * fighters) a full rewrite of the mutable state is both simpler and faster than diffing —
 * SQLite writes this in tens of milliseconds — while the genuinely append-only tables
 * (development snapshots, simulation events, play-by-play) are only ever inserted into.
 *
 * The mapping between rows and domain objects lives here and nowhere else, so `@mma/sim`
 * never learns that a database exists.
 */

import {
  ATTRIBUTE_KEYS,
  DISCIPLINES,
  DIVISIONS,
  Universe,
  computeCurrentAbility,
  type AttributeSet,
  type Camp,
  type CampSpecialisation,
  type Coach,
  type Contract,
  type DevelopmentSnapshot,
  type Fighter,
  type Injury,
  type Personality,
  type Promotion,
  type RankingEntry,
  type SimulationEvent,
  type UniverseState,
} from '@mma/sim';
import type { Db } from '../database.ts';

/* ------------------------------------------------------------------- helpers */

/** Rows come back from SQLite untyped; this alias marks every deliberate crossing. */
type Row = Record<string, any>;

function json(value: unknown): string {
  return JSON.stringify(value);
}

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/**
 * Rebuilds a complete attribute set from a stored map, filling any key the stored universe
 * predates. A universe file must survive the later addition of a new attribute.
 */
function readAttributes(stored: string): AttributeSet {
  const parsed = parseJson<Partial<Record<string, number>>>(stored, {});
  const attributes = {} as AttributeSet;
  for (const key of ATTRIBUTE_KEYS) attributes[key] = parsed[key] ?? 30;
  return attributes;
}

function seedReferenceData(db: Db): void {
  const division = db.prepare(
    'INSERT OR REPLACE INTO division (key, name, sex, weight_limit_lbs, sort_order) VALUES (?, ?, ?, ?, ?)',
  );
  for (const definition of DIVISIONS) {
    division.run(definition.key, definition.name, definition.sex, definition.weightLimitLbs, definition.order);
  }
  const discipline = db.prepare('INSERT OR REPLACE INTO discipline (key, label, family) VALUES (?, ?, ?)');
  for (const definition of DISCIPLINES) discipline.run(definition.key, definition.label, definition.family);
}


/**
 * Columns of the `fighter` table, in bind order.
 *
 * Kept as an explicit list because fighters are written with an UPSERT rather than a
 * delete-and-reinsert. That distinction is not cosmetic: `fighter_development`,
 * `training_session` and `fight_event` all cascade from `fighter`, so deleting the roster on
 * every save silently destroyed the append-only history the whole progression view is built
 * on. `INSERT OR REPLACE` has the same problem — SQLite implements it as a delete followed
 * by an insert, and the cascades fire.
 */
const FIGHTER_COLUMNS = [
  'id', 'first_name', 'last_name', 'nickname', 'sex', 'birth_date', 'nationality', 'home_region',
  'height_in', 'reach_in', 'stance', 'division_key', 'camp_id', 'promotion_id', 'attributes', 'personality',
  'current_ability', 'potential_ability', 'seed_archetype',
  'wins', 'losses', 'draws', 'no_contests', 'ko_wins', 'submission_wins', 'decision_wins',
  'ko_losses', 'submission_losses', 'decision_losses', 'win_streak', 'loss_streak',
  'debut_date', 'amateur_fights', 'career_earnings', 'popularity', 'reputation', 'momentum', 'last_fight_date',
  'title_reigns', 'title_defenses', 'fatigue', 'sharpness', 'weight_management', 'wear_and_tear',
  'training_intensity', 'training_focus', 'status', 'retirement_date',
] as const;

/** Builds an idempotent upsert for a table keyed on a single column. */
function upsertSql(table: string, columns: readonly string[], key: string): string {
  const updates = columns.filter((column) => column !== key).map((column) => `${column} = excluded.${column}`);
  return (
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')}) ` +
    `ON CONFLICT(${key}) DO UPDATE SET ${updates.join(', ')}`
  );
}

/** A fighter as a row, in `FIGHTER_COLUMNS` order. */
function fighterRow(fighter: Fighter): unknown[] {
  const { record, career, condition, training } = fighter;
  return [
    fighter.id, fighter.firstName, fighter.lastName, fighter.nickname ?? null, fighter.sex,
    fighter.birthDate, fighter.nationality, fighter.homeRegion, fighter.heightIn, fighter.reachIn,
    fighter.stance, fighter.divisionKey, fighter.campId ?? null, fighter.promotionId ?? null,
    json(fighter.attributes), json(fighter.personality),
    computeCurrentAbility(fighter.attributes), fighter.potentialAbility, fighter.seedArchetype,
    record.wins, record.losses, record.draws, record.noContests,
    record.koWins, record.submissionWins, record.decisionWins,
    record.koLosses, record.submissionLosses, record.decisionLosses,
    record.winStreak, record.lossStreak,
    career.debutDate, career.amateurFights, career.careerEarnings, career.popularity,
    career.reputation, career.momentum, career.lastFightDate ?? null,
    career.titleReigns, career.titleDefenses,
    condition.fatigue, condition.sharpness, condition.weightManagement, condition.wearAndTear,
    training.intensity, json(training.focus),
    fighter.status, fighter.retirementDate ?? null,
  ];
}

/* ---------------------------------------------------------------------- save */

export interface SaveOptions {
  /** Development snapshots to append. Existing snapshots are never rewritten. */
  readonly snapshots?: readonly DevelopmentSnapshot[];
}

export function saveUniverse(db: Db, universe: Universe, options: SaveOptions = {}): void {
  const state = universe.state;

  const write = db.transaction(() => {
    seedReferenceData(db);

    db.prepare(
      `INSERT INTO universe (id, seed, start_date, current_date, target_population, id_counters, schema_note)
       VALUES (1, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET
         seed = excluded.seed,
         start_date = excluded.start_date,
         current_date = excluded.current_date,
         target_population = excluded.target_population,
         id_counters = excluded.id_counters`,
    ).run(state.seed, state.startDate, state.currentDate, state.targetPopulation, json(state.idCounters), 'mma-universe');

    // Current-state tables are replaced wholesale; deletion order respects the foreign keys.
    // `fighter` is conspicuously absent — see the note on FIGHTER_COLUMNS above.
    for (const table of [
      'ranking_entry', 'contract', 'injury', 'fighter_memory',
      'camp_specialisation', 'coach', 'camp', 'promotion',
    ]) {
      db.prepare(`DELETE FROM ${table}`).run();
    }

    const insertPromotion = db.prepare(
      `INSERT INTO promotion (id, name, short_name, tier, country, founded_year, prestige, ranks_per_division, roster_share, division_keys)
       VALUES (@id, @name, @shortName, @tier, @country, @foundedYear, @prestige, @ranksPerDivision, @rosterShare, @divisionKeys)`,
    );
    for (const promotion of state.promotions) {
      insertPromotion.run({ ...promotion, divisionKeys: json(promotion.divisionKeys) });
    }

    const insertCamp = db.prepare(
      `INSERT INTO camp (id, name, city, country, region, founded_year, reputation, peak_reputation, capacity,
         facility_training, facility_medical, facility_science, facility_recovery,
         culture_discipline, culture_intensity, culture_cohesion, head_coach_id,
         titles_won, ranked_fighter_peak, fighters_developed, status, closed_date)
       VALUES (@id, @name, @city, @country, @region, @foundedYear, @reputation, @peakReputation, @capacity,
         @facilityTraining, @facilityMedical, @facilityScience, @facilityRecovery,
         @cultureDiscipline, @cultureIntensity, @cultureCohesion, @headCoachId,
         @titlesWon, @rankedFighterPeak, @fightersDeveloped, @status, @closedDate)`,
    );
    const insertSpecialisation = db.prepare(
      'INSERT INTO camp_specialisation (camp_id, discipline_key, tier, multiplier) VALUES (?, ?, ?, ?)',
    );
    for (const camp of state.camps) {
      insertCamp.run({
        id: camp.id,
        name: camp.name,
        city: camp.city,
        country: camp.country,
        region: camp.region,
        foundedYear: camp.foundedYear,
        reputation: camp.reputation,
        peakReputation: camp.peakReputation,
        capacity: camp.capacity,
        facilityTraining: camp.facilities.training,
        facilityMedical: camp.facilities.medical,
        facilityScience: camp.facilities.sportsScience,
        facilityRecovery: camp.facilities.recovery,
        cultureDiscipline: camp.culture.discipline,
        cultureIntensity: camp.culture.intensity,
        cultureCohesion: camp.culture.cohesion,
        headCoachId: camp.headCoachId ?? null,
        titlesWon: camp.history.titlesWon,
        rankedFighterPeak: camp.history.rankedFighterPeak,
        fightersDeveloped: camp.history.fightersDeveloped,
        status: camp.status,
        closedDate: camp.closedDate ?? null,
      });
      for (const specialisation of camp.specialisations) {
        insertSpecialisation.run(camp.id, specialisation.disciplineKey, specialisation.tier, specialisation.multiplier);
      }
    }

    const insertCoach = db.prepare(
      `INSERT INTO coach (id, first_name, last_name, camp_id, role, discipline_key, ability, man_management, reputation, birth_year, loyalty, joined_date)
       VALUES (@id, @firstName, @lastName, @campId, @role, @disciplineKey, @ability, @manManagement, @reputation, @birthYear, @loyalty, @joinedDate)`,
    );
    for (const coach of state.coaches) {
      insertCoach.run({ ...coach, campId: coach.campId ?? null, joinedDate: coach.joinedDate ?? null });
    }

    const insertFighter = db.prepare(upsertSql('fighter', FIGHTER_COLUMNS, 'id'));
    const insertInjury = db.prepare(
      `INSERT INTO injury (id, fighter_id, label, region, severity, start_date, expected_return, end_date, cause, recurrence)
       VALUES (@id, @fighterId, @label, @region, @severity, @startDate, @expectedReturn, @endDate, @cause, @recurrence)`,
    );
    const insertMemory = db.prepare(
      `INSERT INTO fighter_memory (fighter_id, opponent_id, meetings, wins, losses, last_result, last_method, psychological_edge, last_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    for (const fighter of state.fighters) {
      insertFighter.run(fighterRow(fighter));

      for (const injury of fighter.condition.injuries) {
        insertInjury.run({ ...injury, endDate: injury.endDate ?? null });
      }
      for (const memory of fighter.memories) {
        insertMemory.run(
          fighter.id, memory.opponentId, memory.meetings, memory.wins, memory.losses,
          memory.lastResult, memory.lastMethod ?? null, memory.psychologicalEdge, memory.lastDate,
        );
      }
    }

    // Fighters are never removed from the simulation — retirees stay in the world's history —
    // but a prune keeps the file honest if a caller ever trims the roster.
    const liveIds = new Set(state.fighters.map((fighter) => fighter.id));
    const storedIds = (db.prepare('SELECT id FROM fighter').all() as Row[]).map((row) => row.id as string);
    const removeFighter = db.prepare('DELETE FROM fighter WHERE id = ?');
    for (const id of storedIds) if (!liveIds.has(id)) removeFighter.run(id);

    const insertContract = db.prepare(
      `INSERT INTO contract (id, fighter_id, promotion_id, signed_date, fights_total, fights_remaining, expires_date, base_show, win_bonus, ppv_points, status)
       VALUES (@id, @fighterId, @promotionId, @signedDate, @fightsTotal, @fightsRemaining, @expiresDate, @baseShow, @winBonus, @ppvPoints, @status)`,
    );
    for (const contract of state.contracts) insertContract.run({ ...contract });

    const insertRanking = db.prepare(
      `INSERT INTO ranking_entry (promotion_id, division_key, fighter_id, rank, points, previous_rank, updated_date)
       VALUES (@promotionId, @divisionKey, @fighterId, @rank, @points, @previousRank, @updatedDate)`,
    );
    for (const entry of state.rankings) {
      insertRanking.run({ ...entry, previousRank: entry.previousRank ?? null });
    }

    // Append-only tables from here down.
    const insertEvent = db.prepare(
      'INSERT INTO simulation_event (event_date, type, subject_id, secondary_id, summary, payload) VALUES (?, ?, ?, ?, ?, ?)',
    );
    for (const event of state.events) {
      insertEvent.run(
        event.date, event.type, event.subjectId ?? null, event.secondaryId ?? null,
        event.summary, event.payload ? json(event.payload) : null,
      );
    }
    // The events are durable now, so the in-memory list stays bounded across long runs.
    state.events.length = 0;

    if (options.snapshots?.length) {
      const insertSnapshot = db.prepare(
        `INSERT OR REPLACE INTO fighter_development (fighter_id, snapshot_date, age, current_ability, potential_ability, attributes)
         VALUES (?, ?, ?, ?, ?, ?)`,
      );
      for (const snapshot of options.snapshots) {
        insertSnapshot.run(
          snapshot.fighterId, snapshot.date, snapshot.age,
          snapshot.currentAbility, snapshot.potentialAbility, json(snapshot.attributes),
        );
      }
    }
  });

  write();
}

/* ---------------------------------------------------------------------- load */

export function universeExists(db: Db): boolean {
  const row = db.prepare('SELECT COUNT(*) AS count FROM universe').get() as { count: number };
  return row.count > 0;
}

export function loadUniverse(db: Db): Universe {
  const meta = db.prepare('SELECT * FROM universe WHERE id = 1').get() as Row | undefined;
  if (!meta) throw new Error('No universe in this database. Generate one first.');

  const promotions: Promotion[] = (db.prepare('SELECT * FROM promotion').all() as Row[]).map((row) => ({
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    tier: row.tier,
    country: row.country,
    foundedYear: row.founded_year,
    prestige: row.prestige,
    divisionKeys: parseJson<string[]>(row.division_keys, []),
    ranksPerDivision: row.ranks_per_division,
    rosterShare: row.roster_share,
  }));

  const specialisationsByCamp = new Map<string, CampSpecialisation[]>();
  for (const row of db.prepare('SELECT * FROM camp_specialisation ORDER BY tier').all() as Row[]) {
    const list = specialisationsByCamp.get(row.camp_id) ?? [];
    list.push({ disciplineKey: row.discipline_key, tier: row.tier, multiplier: row.multiplier });
    specialisationsByCamp.set(row.camp_id, list);
  }

  const coaches: Coach[] = (db.prepare('SELECT * FROM coach').all() as Row[]).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    campId: row.camp_id ?? undefined,
    role: row.role,
    disciplineKey: row.discipline_key,
    ability: row.ability,
    manManagement: row.man_management,
    reputation: row.reputation,
    birthYear: row.birth_year,
    loyalty: row.loyalty,
    joinedDate: row.joined_date ?? undefined,
  }));

  const coachIdsByCamp = new Map<string, string[]>();
  for (const coach of coaches) {
    if (!coach.campId) continue;
    const list = coachIdsByCamp.get(coach.campId) ?? [];
    list.push(coach.id);
    coachIdsByCamp.set(coach.campId, list);
  }

  const camps: Camp[] = (db.prepare('SELECT * FROM camp').all() as Row[]).map((row) => ({
    id: row.id,
    name: row.name,
    city: row.city,
    country: row.country,
    region: row.region,
    foundedYear: row.founded_year,
    reputation: row.reputation,
    peakReputation: row.peak_reputation,
    capacity: row.capacity,
    facilities: {
      training: row.facility_training,
      medical: row.facility_medical,
      sportsScience: row.facility_science,
      recovery: row.facility_recovery,
    },
    culture: {
      discipline: row.culture_discipline,
      intensity: row.culture_intensity,
      cohesion: row.culture_cohesion,
    },
    specialisations: specialisationsByCamp.get(row.id) ?? [],
    headCoachId: row.head_coach_id ?? undefined,
    coachIds: coachIdsByCamp.get(row.id) ?? [],
    history: {
      titlesWon: row.titles_won,
      rankedFighterPeak: row.ranked_fighter_peak,
      fightersDeveloped: row.fighters_developed,
    },
    status: row.status,
    closedDate: row.closed_date ?? undefined,
  }));

  const injuriesByFighter = new Map<string, Injury[]>();
  for (const row of db.prepare('SELECT * FROM injury').all() as Row[]) {
    const list = injuriesByFighter.get(row.fighter_id) ?? [];
    list.push({
      id: row.id,
      fighterId: row.fighter_id,
      label: row.label,
      region: row.region,
      severity: row.severity,
      startDate: row.start_date,
      expectedReturn: row.expected_return,
      endDate: row.end_date ?? undefined,
      cause: row.cause,
      recurrence: row.recurrence,
    });
    injuriesByFighter.set(row.fighter_id, list);
  }

  const memoriesByFighter = new Map<string, Fighter['memories']>();
  for (const row of db.prepare('SELECT * FROM fighter_memory').all() as Row[]) {
    const list = memoriesByFighter.get(row.fighter_id) ?? [];
    list.push({
      opponentId: row.opponent_id,
      meetings: row.meetings,
      wins: row.wins,
      losses: row.losses,
      lastResult: row.last_result,
      lastMethod: row.last_method ?? undefined,
      psychologicalEdge: row.psychological_edge,
      lastDate: row.last_date,
    });
    memoriesByFighter.set(row.fighter_id, list);
  }

  const fighters: Fighter[] = (db.prepare('SELECT * FROM fighter').all() as Row[]).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    nickname: row.nickname ?? undefined,
    sex: row.sex,
    birthDate: row.birth_date,
    nationality: row.nationality,
    homeRegion: row.home_region,
    heightIn: row.height_in,
    reachIn: row.reach_in,
    stance: row.stance,
    divisionKey: row.division_key,
    campId: row.camp_id ?? undefined,
    promotionId: row.promotion_id ?? undefined,
    attributes: readAttributes(row.attributes),
    personality: parseJson<Personality>(row.personality, {} as Personality),
    potentialAbility: row.potential_ability,
    seedArchetype: row.seed_archetype,
    record: {
      wins: row.wins,
      losses: row.losses,
      draws: row.draws,
      noContests: row.no_contests,
      koWins: row.ko_wins,
      submissionWins: row.submission_wins,
      decisionWins: row.decision_wins,
      koLosses: row.ko_losses,
      submissionLosses: row.submission_losses,
      decisionLosses: row.decision_losses,
      winStreak: row.win_streak,
      lossStreak: row.loss_streak,
    },
    career: {
      debutDate: row.debut_date,
      amateurFights: row.amateur_fights,
      careerEarnings: row.career_earnings,
      popularity: row.popularity,
      reputation: row.reputation,
      momentum: row.momentum,
      lastFightDate: row.last_fight_date ?? undefined,
      titleReigns: row.title_reigns,
      titleDefenses: row.title_defenses,
    },
    condition: {
      fatigue: row.fatigue,
      sharpness: row.sharpness,
      weightManagement: row.weight_management,
      wearAndTear: row.wear_and_tear,
      injuries: injuriesByFighter.get(row.id) ?? [],
    },
    training: {
      intensity: row.training_intensity,
      focus: parseJson<string[]>(row.training_focus, []),
    },
    memories: memoriesByFighter.get(row.id) ?? [],
    status: row.status,
    retirementDate: row.retirement_date ?? undefined,
  }));

  const contracts: Contract[] = (db.prepare('SELECT * FROM contract').all() as Row[]).map((row) => ({
    id: row.id,
    fighterId: row.fighter_id,
    promotionId: row.promotion_id,
    signedDate: row.signed_date,
    fightsTotal: row.fights_total,
    fightsRemaining: row.fights_remaining,
    expiresDate: row.expires_date,
    baseShow: row.base_show,
    winBonus: row.win_bonus,
    ppvPoints: row.ppv_points,
    status: row.status,
  }));

  const rankings: RankingEntry[] = (db.prepare('SELECT * FROM ranking_entry').all() as Row[]).map((row) => ({
    promotionId: row.promotion_id,
    divisionKey: row.division_key,
    fighterId: row.fighter_id,
    rank: row.rank,
    points: row.points,
    previousRank: row.previous_rank ?? undefined,
    updatedDate: row.updated_date,
  }));

  const state: UniverseState = {
    seed: meta.seed,
    startDate: meta.start_date,
    currentDate: meta.current_date,
    promotions,
    camps,
    coaches,
    fighters,
    contracts,
    rankings,
    events: [],
    targetPopulation: meta.target_population,
    idCounters: parseJson<Record<string, number>>(meta.id_counters, {}),
  };

  return new Universe(state);
}

/** Recent world events, newest first — the raw feed the news engine will build on. */
export function recentEvents(db: Db, limit = 50): SimulationEvent[] {
  const rows = db
    .prepare('SELECT * FROM simulation_event ORDER BY event_date DESC, id DESC LIMIT ?')
    .all(limit) as Row[];
  return rows.map((row) => ({
    type: row.type,
    date: row.event_date,
    subjectId: row.subject_id ?? undefined,
    secondaryId: row.secondary_id ?? undefined,
    summary: row.summary,
    payload: row.payload ? parseJson<Record<string, unknown>>(row.payload, {}) : undefined,
  }));
}

/** A fighter's development history, oldest first, for the progression chart. */
export function developmentHistory(
  db: Db,
  fighterId: string,
): { date: string; currentAbility: number; potentialAbility: number; age: number }[] {
  const rows = db
    .prepare(
      'SELECT snapshot_date, age, current_ability, potential_ability FROM fighter_development WHERE fighter_id = ? ORDER BY snapshot_date',
    )
    .all(fighterId) as Row[];
  return rows.map((row) => ({
    date: row.snapshot_date,
    age: row.age,
    currentAbility: row.current_ability,
    potentialAbility: row.potential_ability,
  }));
}
