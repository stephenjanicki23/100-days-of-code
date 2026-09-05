/**
 * Database handle and migration runner.
 *
 * SQLite via `better-sqlite3`: synchronous, transactional, and a universe is a single file
 * you can copy, diff, or attach to a bug report. Every statement here is ordinary SQL, so
 * moving to Postgres later is a driver swap rather than a rewrite.
 */

import Database from 'better-sqlite3';
import { MIGRATIONS } from './migrations.ts';

export type Db = Database.Database;

/**
 * Opens (or creates) a universe database and brings it up to the current schema.
 *
 * WAL mode and `foreign_keys` are both on: the brief asks for relational integrity, and
 * SQLite does not enforce foreign keys unless told to — a detail that silently costs you
 * the guarantee if you forget it.
 */
export function openDatabase(path: string): Db {
  const db = new Database(path);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.pragma('synchronous = NORMAL');
  migrate(db);
  return db;
}

/** An in-memory database, for tests. */
export function openMemoryDatabase(): Db {
  return openDatabase(':memory:');
}

export function migrate(db: Db): void {
  db.exec(`CREATE TABLE IF NOT EXISTS schema_migration (
    id      INTEGER PRIMARY KEY,
    name    TEXT NOT NULL,
    applied TEXT NOT NULL
  )`);

  const applied = new Set(
    db.prepare('SELECT id FROM schema_migration').all().map((row) => (row as { id: number }).id),
  );

  for (const migration of MIGRATIONS) {
    if (applied.has(migration.id)) continue;
    // Each migration is one transaction: a partially applied schema is worse than none.
    const run = db.transaction(() => {
      db.exec(migration.sql);
      db.prepare('INSERT INTO schema_migration (id, name, applied) VALUES (?, ?, datetime(\'now\'))').run(
        migration.id,
        migration.name,
      );
    });
    run();
  }
}

export function schemaVersion(db: Db): number {
  const row = db.prepare('SELECT MAX(id) AS version FROM schema_migration').get() as { version: number | null };
  return row.version ?? 0;
}
