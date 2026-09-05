/**
 * API client and data-fetching hook.
 *
 * Deliberately small: the UI is a read model, so it needs request deduplication and a way to
 * invalidate everything after the simulation advances — not a caching library. `useApi`
 * re-runs whenever the global revision changes, which `advance()` bumps once the server has
 * confirmed the new date.
 */

import { useCallback, useEffect, useState } from 'react';

const BASE = '/api';

let revision = 0;
const listeners = new Set<() => void>();

/** Marks every cached view stale — called after the simulation moves. */
export function invalidate(): void {
  revision++;
  for (const listener of listeners) listener();
}

export function useRevision(): number {
  const [value, setValue] = useState(revision);
  useEffect(() => {
    const listener = () => setValue(revision);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return value;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE}${path}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${path}`);
  return (await response.json()) as T;
}

export async function advance(days: number): Promise<void> {
  const response = await fetch(`${BASE}/simulation/advance`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ days }),
  });
  if (!response.ok) throw new Error(`Advance failed: ${response.status}`);
  invalidate();
}

export interface AsyncState<T> {
  data?: T;
  error?: string;
  loading: boolean;
  reload: () => void;
}

export function useApi<T>(path: string | undefined): AsyncState<T> {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(Boolean(path));
  const [local, setLocal] = useState(0);
  const rev = useRevision();

  const reload = useCallback(() => setLocal((n) => n + 1), []);

  useEffect(() => {
    if (!path) {
      setData(undefined);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(undefined);
    apiGet<T>(path)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((cause: unknown) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : String(cause));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path, rev, local]);

  return { data, error, loading, reload };
}
