/**
 * Database migrations.
 *
 * Migrations are numbered, append-only and idempotent at the file level: a universe created
 * by an older build must still open against a newer one. Nothing here is ever edited after
 * it ships — corrections go in a new migration.
 *
 * On the JSON columns: the brief (§28) is explicit that the schema must not be one giant
 * document, and it is not — every entity is a table with real foreign keys. JSON is used in
 * exactly two places, both of which are fixed-shape leaf data that is only ever read as a
 * whole and never joined or filtered on: a fighter's 44-attribute map and their personality
 * map. The values that *are* queried — current ability, potential, division, camp, status —
 * are ordinary indexed columns.
 */

export interface Migration {
  readonly id: number;
  readonly name: string;
  readonly sql: string;
}

const INITIAL_SCHEMA = `
-- ---------------------------------------------------------------- reference data
CREATE TABLE division (
  key              TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  sex              TEXT NOT NULL CHECK (sex IN ('male','female')),
  weight_limit_lbs INTEGER NOT NULL,
  sort_order       INTEGER NOT NULL
);

CREATE TABLE discipline (
  key    TEXT PRIMARY KEY,
  label  TEXT NOT NULL,
  family TEXT NOT NULL
);

-- ---------------------------------------------------------------- universe
CREATE TABLE universe (
  id                INTEGER PRIMARY KEY CHECK (id = 1),
  seed              TEXT NOT NULL,
  start_date        TEXT NOT NULL,
  current_date      TEXT NOT NULL,
  target_population INTEGER NOT NULL,
  id_counters       TEXT NOT NULL,
  schema_note       TEXT
);

CREATE TABLE promotion (
  id                 TEXT PRIMARY KEY,
  name               TEXT NOT NULL,
  short_name         TEXT NOT NULL,
  tier               TEXT NOT NULL CHECK (tier IN ('global','regional','developmental')),
  country            TEXT NOT NULL,
  founded_year       INTEGER NOT NULL,
  prestige           REAL NOT NULL,
  ranks_per_division INTEGER NOT NULL,
  roster_share       REAL NOT NULL,
  division_keys      TEXT NOT NULL
);

CREATE TABLE venue (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  city     TEXT NOT NULL,
  country  TEXT NOT NULL,
  capacity INTEGER NOT NULL
);

-- ---------------------------------------------------------------- camps
CREATE TABLE camp (
  id                   TEXT PRIMARY KEY,
  name                 TEXT NOT NULL UNIQUE,
  city                 TEXT NOT NULL,
  country              TEXT NOT NULL,
  region               TEXT NOT NULL,
  founded_year         INTEGER NOT NULL,
  reputation           REAL NOT NULL,
  peak_reputation      REAL NOT NULL,
  capacity             INTEGER NOT NULL,
  facility_training    REAL NOT NULL,
  facility_medical     REAL NOT NULL,
  facility_science     REAL NOT NULL,
  facility_recovery    REAL NOT NULL,
  culture_discipline   REAL NOT NULL,
  culture_intensity    REAL NOT NULL,
  culture_cohesion     REAL NOT NULL,
  head_coach_id        TEXT,
  titles_won           INTEGER NOT NULL DEFAULT 0,
  ranked_fighter_peak  INTEGER NOT NULL DEFAULT 0,
  fighters_developed   INTEGER NOT NULL DEFAULT 0,
  status               TEXT NOT NULL CHECK (status IN ('active','declining','closed')),
  closed_date          TEXT
);
CREATE INDEX idx_camp_reputation ON camp (reputation DESC);

CREATE TABLE camp_specialisation (
  camp_id        TEXT NOT NULL REFERENCES camp (id) ON DELETE CASCADE,
  discipline_key TEXT NOT NULL REFERENCES discipline (key),
  tier           INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 3),
  multiplier     REAL NOT NULL,
  PRIMARY KEY (camp_id, discipline_key)
);

CREATE TABLE coach (
  id              TEXT PRIMARY KEY,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  camp_id         TEXT REFERENCES camp (id) ON DELETE SET NULL,
  role            TEXT NOT NULL,
  discipline_key  TEXT NOT NULL REFERENCES discipline (key),
  ability         REAL NOT NULL,
  man_management  REAL NOT NULL,
  reputation      REAL NOT NULL,
  birth_year      INTEGER NOT NULL,
  loyalty         REAL NOT NULL,
  joined_date     TEXT
);
CREATE INDEX idx_coach_camp ON coach (camp_id);

-- ---------------------------------------------------------------- fighters
CREATE TABLE fighter (
  id                  TEXT PRIMARY KEY,
  first_name          TEXT NOT NULL,
  last_name           TEXT NOT NULL,
  nickname            TEXT,
  sex                 TEXT NOT NULL CHECK (sex IN ('male','female')),
  birth_date          TEXT NOT NULL,
  nationality         TEXT NOT NULL,
  home_region         TEXT NOT NULL,
  height_in           REAL NOT NULL,
  reach_in            REAL NOT NULL,
  stance              TEXT NOT NULL,
  division_key        TEXT NOT NULL REFERENCES division (key),
  camp_id             TEXT REFERENCES camp (id) ON DELETE SET NULL,
  promotion_id        TEXT REFERENCES promotion (id) ON DELETE SET NULL,

  -- Fixed-shape leaf maps, read only as a whole. See the note at the top of this file.
  attributes          TEXT NOT NULL,
  personality         TEXT NOT NULL,

  -- The queryable projection of the attribute map, maintained on every write.
  current_ability     REAL NOT NULL,
  potential_ability   REAL NOT NULL,
  seed_archetype      TEXT NOT NULL,

  wins                INTEGER NOT NULL DEFAULT 0,
  losses              INTEGER NOT NULL DEFAULT 0,
  draws               INTEGER NOT NULL DEFAULT 0,
  no_contests         INTEGER NOT NULL DEFAULT 0,
  ko_wins             INTEGER NOT NULL DEFAULT 0,
  submission_wins     INTEGER NOT NULL DEFAULT 0,
  decision_wins       INTEGER NOT NULL DEFAULT 0,
  ko_losses           INTEGER NOT NULL DEFAULT 0,
  submission_losses   INTEGER NOT NULL DEFAULT 0,
  decision_losses     INTEGER NOT NULL DEFAULT 0,
  win_streak          INTEGER NOT NULL DEFAULT 0,
  loss_streak         INTEGER NOT NULL DEFAULT 0,

  debut_date          TEXT NOT NULL,
  amateur_fights      INTEGER NOT NULL DEFAULT 0,
  career_earnings     INTEGER NOT NULL DEFAULT 0,
  popularity          REAL NOT NULL DEFAULT 0,
  reputation          REAL NOT NULL DEFAULT 0,
  momentum            REAL NOT NULL DEFAULT 0,
  last_fight_date     TEXT,
  title_reigns        INTEGER NOT NULL DEFAULT 0,
  title_defenses      INTEGER NOT NULL DEFAULT 0,

  fatigue             REAL NOT NULL DEFAULT 0,
  sharpness           REAL NOT NULL DEFAULT 100,
  weight_management   REAL NOT NULL DEFAULT 50,
  wear_and_tear       REAL NOT NULL DEFAULT 0,

  training_intensity  TEXT NOT NULL DEFAULT 'moderate',
  training_focus      TEXT NOT NULL DEFAULT '[]',

  status              TEXT NOT NULL CHECK (status IN ('active','injured','inactive','retired')),
  retirement_date     TEXT
);
CREATE INDEX idx_fighter_division ON fighter (division_key, status);
CREATE INDEX idx_fighter_camp ON fighter (camp_id);
CREATE INDEX idx_fighter_promotion ON fighter (promotion_id, division_key);
CREATE INDEX idx_fighter_ability ON fighter (current_ability DESC);
CREATE INDEX idx_fighter_name ON fighter (last_name, first_name);

/* What a fighter remembers about a previous opponent (brief §22). */
CREATE TABLE fighter_memory (
  fighter_id         TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  opponent_id        TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  meetings           INTEGER NOT NULL,
  wins               INTEGER NOT NULL,
  losses             INTEGER NOT NULL,
  last_result        TEXT NOT NULL,
  last_method        TEXT,
  psychological_edge REAL NOT NULL,
  last_date          TEXT NOT NULL,
  PRIMARY KEY (fighter_id, opponent_id)
);

CREATE TABLE injury (
  id              TEXT PRIMARY KEY,
  fighter_id      TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  label           TEXT NOT NULL,
  region          TEXT NOT NULL,
  severity        TEXT NOT NULL,
  start_date      TEXT NOT NULL,
  expected_return TEXT NOT NULL,
  end_date        TEXT,
  cause           TEXT NOT NULL,
  recurrence      INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_injury_fighter ON injury (fighter_id, end_date);

/* Append-only development history; the source for a fighter's progression chart. */
CREATE TABLE fighter_development (
  fighter_id        TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  snapshot_date     TEXT NOT NULL,
  age               INTEGER NOT NULL,
  current_ability   REAL NOT NULL,
  potential_ability REAL NOT NULL,
  attributes        TEXT NOT NULL,
  PRIMARY KEY (fighter_id, snapshot_date)
);
CREATE INDEX idx_development_date ON fighter_development (snapshot_date);

CREATE TABLE training_session (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  fighter_id  TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  week_date   TEXT NOT NULL,
  intensity   TEXT NOT NULL,
  camp_id     TEXT REFERENCES camp (id) ON DELETE SET NULL,
  ability_before REAL NOT NULL,
  ability_after  REAL NOT NULL,
  fatigue_after  REAL NOT NULL,
  notable     TEXT
);
CREATE INDEX idx_training_fighter ON training_session (fighter_id, week_date);

-- ---------------------------------------------------------------- promotion side
CREATE TABLE contract (
  id              TEXT PRIMARY KEY,
  fighter_id      TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  promotion_id    TEXT NOT NULL REFERENCES promotion (id) ON DELETE CASCADE,
  signed_date     TEXT NOT NULL,
  fights_total    INTEGER NOT NULL,
  fights_remaining INTEGER NOT NULL,
  expires_date    TEXT NOT NULL,
  base_show       INTEGER NOT NULL,
  win_bonus       INTEGER NOT NULL,
  ppv_points      REAL NOT NULL DEFAULT 0,
  status          TEXT NOT NULL CHECK (status IN ('active','expired','terminated'))
);
CREATE INDEX idx_contract_fighter ON contract (fighter_id, status);

CREATE TABLE ranking_entry (
  promotion_id  TEXT NOT NULL REFERENCES promotion (id) ON DELETE CASCADE,
  division_key  TEXT NOT NULL REFERENCES division (key),
  fighter_id    TEXT NOT NULL REFERENCES fighter (id) ON DELETE CASCADE,
  rank          INTEGER NOT NULL,
  points        REAL NOT NULL,
  previous_rank INTEGER,
  updated_date  TEXT NOT NULL,
  PRIMARY KEY (promotion_id, division_key, fighter_id)
);
CREATE INDEX idx_ranking_lookup ON ranking_entry (promotion_id, division_key, rank);

-- ---------------------------------------------------------------- events & fights
/* Fight cards. Populated from Phase 4; the schema is defined now so the fight engine and
   matchmaker have somewhere to write without a migration. */
CREATE TABLE event_card (
  id            TEXT PRIMARY KEY,
  promotion_id  TEXT NOT NULL REFERENCES promotion (id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  event_date    TEXT NOT NULL,
  venue_id      TEXT REFERENCES venue (id) ON DELETE SET NULL,
  status        TEXT NOT NULL DEFAULT 'scheduled',
  attendance    INTEGER,
  revenue       INTEGER
);
CREATE INDEX idx_event_date ON event_card (event_date);

CREATE TABLE fight (
  id             TEXT PRIMARY KEY,
  event_id       TEXT REFERENCES event_card (id) ON DELETE CASCADE,
  division_key   TEXT NOT NULL REFERENCES division (key),
  fighter_a_id   TEXT NOT NULL REFERENCES fighter (id),
  fighter_b_id   TEXT NOT NULL REFERENCES fighter (id),
  bout_order     INTEGER NOT NULL DEFAULT 0,
  billing        TEXT NOT NULL DEFAULT 'prelim',
  is_title_fight INTEGER NOT NULL DEFAULT 0,
  scheduled_rounds INTEGER NOT NULL DEFAULT 3,
  status         TEXT NOT NULL DEFAULT 'scheduled',
  outcome        TEXT,
  winner_id      TEXT REFERENCES fighter (id),
  finish_round   INTEGER,
  finish_time    TEXT,
  technique      TEXT,
  fight_date     TEXT
);
CREATE INDEX idx_fight_event ON fight (event_id, bout_order);
CREATE INDEX idx_fight_fighters ON fight (fighter_a_id, fighter_b_id);

/* Append-only play-by-play. Written once, read only by the Fight Center and the 3D layer. */
CREATE TABLE fight_event (
  fight_id   TEXT NOT NULL REFERENCES fight (id) ON DELETE CASCADE,
  sequence   INTEGER NOT NULL,
  round      INTEGER NOT NULL,
  timestamp  REAL NOT NULL,
  event_type TEXT NOT NULL,
  position   TEXT NOT NULL,
  attacker_id TEXT,
  defender_id TEXT,
  technique  TEXT,
  target     TEXT,
  result     TEXT,
  damage     REAL,
  description TEXT NOT NULL,
  payload    TEXT NOT NULL,
  PRIMARY KEY (fight_id, sequence)
);

CREATE TABLE scorecard (
  fight_id   TEXT NOT NULL REFERENCES fight (id) ON DELETE CASCADE,
  judge_name TEXT NOT NULL,
  round      INTEGER NOT NULL,
  score_a    INTEGER NOT NULL,
  score_b    INTEGER NOT NULL,
  PRIMARY KEY (fight_id, judge_name, round)
);

-- ---------------------------------------------------------------- world flavour
CREATE TABLE simulation_event (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  event_date   TEXT NOT NULL,
  type         TEXT NOT NULL,
  subject_id   TEXT,
  secondary_id TEXT,
  summary      TEXT NOT NULL,
  payload      TEXT
);
CREATE INDEX idx_simulation_event_date ON simulation_event (event_date DESC);

CREATE TABLE news_article (
  id           TEXT PRIMARY KEY,
  published    TEXT NOT NULL,
  headline     TEXT NOT NULL,
  body         TEXT NOT NULL,
  category     TEXT NOT NULL,
  subject_id   TEXT,
  storyline_id TEXT
);
CREATE INDEX idx_news_published ON news_article (published DESC);

CREATE TABLE storyline (
  id          TEXT PRIMARY KEY,
  kind        TEXT NOT NULL,
  title       TEXT NOT NULL,
  started     TEXT NOT NULL,
  ended       TEXT,
  status      TEXT NOT NULL DEFAULT 'active',
  participants TEXT NOT NULL,
  heat        REAL NOT NULL DEFAULT 0
);

CREATE TABLE sponsor (
  id      TEXT PRIMARY KEY,
  name    TEXT NOT NULL,
  sector  TEXT NOT NULL,
  budget  INTEGER NOT NULL
);
`;

export const MIGRATIONS: readonly Migration[] = [
  { id: 1, name: 'initial_schema', sql: INITIAL_SCHEMA },
];
