import { describe, expect, it } from 'vitest';
import {
  advanceUniverse,
  currentAbility,
  generateUniverse,
  type Universe,
} from '@mma/sim';
import {
  MIGRATIONS,
  developmentHistory,
  loadUniverse,
  migrate,
  openMemoryDatabase,
  recentEvents,
  saveUniverse,
  schemaVersion,
  universeExists,
} from '@mma/data';
import Database from 'better-sqlite3';

function smallUniverse(seed = 'persistence') {
  return generateUniverse({ seed, fighterCount: 90, campCount: 10 });
}

/** Everything a reload must preserve exactly. */
function fingerprint(universe: Universe): string {
  return [
    universe.date,
    universe.state.seed,
    universe.state.targetPopulation,
    universe.state.fighters
      .map((fighter) =>
        [
          fighter.id,
          fighter.firstName,
          fighter.lastName,
          fighter.nickname ?? '-',
          fighter.divisionKey,
          fighter.campId ?? '-',
          fighter.promotionId ?? '-',
          fighter.status,
          currentAbility(fighter).toFixed(8),
          fighter.potentialAbility,
          fighter.condition.fatigue.toFixed(8),
          fighter.condition.injuries.length,
          fighter.training.intensity,
          fighter.training.focus.join('+'),
        ].join(':'),
      )
      .join('|'),
    universe.state.camps.map((camp) => `${camp.id}:${camp.name}:${camp.reputation}:${camp.specialisations.length}`).join('|'),
    universe.state.coaches.map((coach) => `${coach.id}:${coach.campId}:${coach.ability}`).join('|'),
    universe.state.contracts.map((contract) => `${contract.id}:${contract.fightsRemaining}:${contract.status}`).join('|'),
    universe.state.rankings.map((entry) => `${entry.divisionKey}:${entry.rank}:${entry.fighterId}`).join('|'),
  ].join('#');
}

describe('migrations', () => {
  it('upgrades a database created before a later migration existed', () => {
    // The guarantee migrations exist for: a universe file written by an older build must
    // still open against a newer one. This is also why a shipped migration is never edited
    // in place — doing so silently skips the change for every database already out there.
    const db = new Database(':memory:');
    db.pragma('foreign_keys = ON');
    db.exec('CREATE TABLE schema_migration (id INTEGER PRIMARY KEY, name TEXT NOT NULL, applied TEXT NOT NULL)');
    db.exec(MIGRATIONS[0]!.sql);
    db.prepare("INSERT INTO schema_migration VALUES (1, 'initial_schema', datetime('now'))").run();

    const columnsBefore = (db.prepare('PRAGMA table_info(injury)').all() as { name: string }[]).map((c) => c.name);
    expect(columnsBefore).not.toContain('chronic');

    migrate(db);

    expect(schemaVersion(db)).toBe(MIGRATIONS[MIGRATIONS.length - 1]!.id);
    const columnsAfter = (db.prepare('PRAGMA table_info(injury)').all() as { name: string }[]).map((c) => c.name);
    expect(columnsAfter).toContain('chronic');

    // And the upgraded file still works.
    saveUniverse(db, smallUniverse('upgraded'));
    expect(loadUniverse(db).state.fighters.length).toBeGreaterThan(0);
    db.close();
  });

  it('is idempotent — reopening applies nothing twice', () => {
    const db = openMemoryDatabase();
    const version = schemaVersion(db);
    migrate(db);
    migrate(db);
    expect(schemaVersion(db)).toBe(version);
    db.close();
  });

  it('has strictly increasing, unique migration ids', () => {
    const ids = MIGRATIONS.map((migration) => migration.id);
    expect(ids).toEqual([...ids].sort((a, b) => a - b));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('persistence', () => {
  it('applies migrations on open', () => {
    const db = openMemoryDatabase();
    expect(schemaVersion(db)).toBeGreaterThan(0);
    expect(universeExists(db)).toBe(false);
    db.close();
  });

  it('preserves chronic injuries across a save', () => {
    const db = openMemoryDatabase();
    const universe = smallUniverse();
    const fighter = universe.state.fighters[0]!;
    fighter.condition.injuries.push({
      id: 'injury_chronic', fighterId: fighter.id, label: 'a knee injury', region: 'knee',
      severity: 'serious', startDate: '2026-01-05', expectedReturn: '2026-05-05',
      cause: 'training', recurrence: 3, chronic: true,
    });
    saveUniverse(db, universe);
    const reloaded = loadUniverse(db).requireFighter(fighter.id);
    expect(reloaded.condition.injuries.find((i) => i.id === 'injury_chronic')?.chronic).toBe(true);
    db.close();
  });

  it('round-trips a universe without losing anything', () => {
    const db = openMemoryDatabase();
    const original = smallUniverse();
    saveUniverse(db, original);
    expect(universeExists(db)).toBe(true);

    const reloaded = loadUniverse(db);
    expect(fingerprint(reloaded)).toBe(fingerprint(original));
    db.close();
  });

  it('preserves attribute values at full precision', () => {
    // Rounding on the way through the database would quietly break development, since a
    // training week moves an attribute by hundredths of a point.
    const db = openMemoryDatabase();
    const original = smallUniverse();
    saveUniverse(db, original);
    const reloaded = loadUniverse(db);
    expect(reloaded.state.fighters[0]!.attributes).toEqual(original.state.fighters[0]!.attributes);
    db.close();
  });

  it('produces the same future from a reloaded universe as from an unbroken one', () => {
    // The property that matters most: saving and reloading must not perturb the simulation.
    const db = openMemoryDatabase();
    const inMemory = smallUniverse('continuity');
    const persisted = smallUniverse('continuity');

    advanceUniverse(inMemory, 120, { snapshotEveryDays: 0 });

    advanceUniverse(persisted, 60, { snapshotEveryDays: 0 });
    saveUniverse(db, persisted);
    const reloaded = loadUniverse(db);
    advanceUniverse(reloaded, 60, { snapshotEveryDays: 0 });

    expect(fingerprint(reloaded)).toBe(fingerprint(inMemory));
    db.close();
  });

  it('appends development snapshots without rewriting them', () => {
    const db = openMemoryDatabase();
    const universe = smallUniverse();
    saveUniverse(db, universe);
    // Chosen before advancing: a fighter recruited mid-run would only appear in the later
    // snapshots, and a fighter who retires drops out of them entirely.
    const subjectId = universe.state.fighters[0]!.id;

    const first = advanceUniverse(universe, 90, { snapshotEveryDays: 30 });
    saveUniverse(db, universe, { snapshots: first.snapshots });
    const second = advanceUniverse(universe, 90, { snapshotEveryDays: 30 });
    saveUniverse(db, universe, { snapshots: second.snapshots });

    const history = developmentHistory(db, subjectId);
    expect(universe.requireFighter(subjectId).status).not.toBe('retired');
    expect(history).toHaveLength(6);
    // Snapshots must be in chronological order for the progression chart to make sense.
    const dates = history.map((point) => point.date);
    expect([...dates].sort()).toEqual(dates);
    db.close();
  });

  it('accumulates world events across saves', () => {
    const db = openMemoryDatabase();
    const universe = smallUniverse();
    saveUniverse(db, universe);

    advanceUniverse(universe, 200, { snapshotEveryDays: 0 });
    saveUniverse(db, universe);

    const events = recentEvents(db, 500);
    expect(events.length).toBeGreaterThan(5);
    expect(events[0]!.date >= events[events.length - 1]!.date).toBe(true);
    // The in-memory list is cleared once the events are durable, so a long run cannot grow
    // the universe object without bound.
    expect(universe.state.events).toHaveLength(0);
    db.close();
  });

  it('enforces referential integrity', () => {
    const db = openMemoryDatabase();
    saveUniverse(db, smallUniverse());
    expect(() =>
      db.prepare('INSERT INTO injury (id, fighter_id, label, region, severity, start_date, expected_return, cause, recurrence) VALUES (?,?,?,?,?,?,?,?,?)')
        .run('injury_x', 'fighter_does_not_exist', 'a broken hand', 'hand', 'minor', '2026-01-05', '2026-02-05', 'training', 0),
    ).toThrow(/FOREIGN KEY/i);
    db.close();
  });

  it('tolerates a stored universe that predates a new attribute', () => {
    const db = openMemoryDatabase();
    const universe = smallUniverse();
    saveUniverse(db, universe);
    // Simulate an older file: drop an attribute from the stored map.
    const row = db.prepare('SELECT id, attributes FROM fighter LIMIT 1').get() as { id: string; attributes: string };
    const stored = JSON.parse(row.attributes) as Record<string, number>;
    delete stored.cageWork;
    db.prepare('UPDATE fighter SET attributes = ? WHERE id = ?').run(JSON.stringify(stored), row.id);

    const reloaded = loadUniverse(db);
    const fighter = reloaded.requireFighter(row.id);
    expect(Number.isFinite(fighter.attributes.cageWork)).toBe(true);
    db.close();
  });
});
