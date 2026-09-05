/**
 * Entity identifiers.
 *
 * Ids are deterministic and human-readable (`fighter_00184`) rather than UUIDs, because
 * they double as RNG address components: a fighter's training stream is addressed by their
 * id, so a stable id is what makes a replay stable.
 */

export type EntityKind =
  | 'fighter'
  | 'camp'
  | 'coach'
  | 'promotion'
  | 'division'
  | 'event'
  | 'fight'
  | 'contract'
  | 'injury'
  | 'venue'
  | 'article'
  | 'storyline';

export function makeId(kind: EntityKind, index: number): string {
  return `${kind}_${String(index).padStart(5, '0')}`;
}

export function kindOf(id: string): EntityKind | undefined {
  const kind = id.split('_')[0];
  return kind as EntityKind | undefined;
}

/** A monotonic id source. Deterministic because allocation order within a generator is fixed. */
export class IdSequence {
  private counters = new Map<EntityKind, number>();

  next(kind: EntityKind): string {
    const n = (this.counters.get(kind) ?? 0) + 1;
    this.counters.set(kind, n);
    return makeId(kind, n);
  }

  issued(kind: EntityKind): number {
    return this.counters.get(kind) ?? 0;
  }
}
