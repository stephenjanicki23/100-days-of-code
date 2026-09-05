import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const SIM_SRC = fileURLToPath(new URL('../src', import.meta.url));

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return path.endsWith('.ts') ? [path] : [];
  });
}

/**
 * Strips comments and string literals before scanning.
 *
 * Without this the checks fire on their own documentation: `core/time.ts` explains in prose
 * that the engine never calls `Date.now()`, which a naive grep reads as a violation.
 */
function code(path: string): string {
  return readFileSync(path, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/[^\n]*/g, ' ')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');
}

/**
 * The simulation core's defining constraint (ARCHITECTURE.md §3): it is pure and I/O-free,
 * so it runs identically in Node, in a worker, in a browser and in a test. These are the
 * invariants that keep it that way, and they are cheap enough to check mechanically.
 */
describe('simulation core purity', () => {
  const files = sourceFiles(SIM_SRC);

  it('has sources to check', () => {
    expect(files.length).toBeGreaterThan(15);
  });

  it('never uses ambient randomness', () => {
    // A single Math.random anywhere in here silently destroys reproducibility (brief §31).
    const offenders = files.filter((file) => /Math\s*\.\s*random/.test(code(file)));
    expect(offenders).toEqual([]);
  });

  it('never reads the wall clock', () => {
    const offenders = files.filter((file) => /Date\s*\.\s*now|new Date\(\s*\)/.test(code(file)));
    expect(offenders).toEqual([]);
  });

  it('imports no Node built-ins and no other workspace package', () => {
    // Import specifiers survive the string-literal blanking above only because this pattern
    // matches the `from` keyword and the opening quote together; check the raw source.
    const offenders = files.filter((file) =>
      /from '(node:|fs|path|better-sqlite3|@mma\/)/.test(readFileSync(file, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('performs no console output', () => {
    const offenders = files.filter((file) => /console\s*\./.test(code(file)));
    expect(offenders).toEqual([]);
  });
});
