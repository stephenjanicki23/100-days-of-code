/**
 * A hash router in thirty lines.
 *
 * The app has six screens and no nested layouts, so a routing library would be more
 * configuration than code. Hash routing also means the built frontend can be served from any
 * static path without server rewrite rules.
 */

import { useEffect, useState } from 'react';

export interface Route {
  readonly path: string;
  readonly segments: readonly string[];
}

function currentRoute(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const path = raw.split('?')[0] ?? '';
  return { path, segments: path.split('/').filter(Boolean) };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(currentRoute);
  useEffect(() => {
    const listener = () => setRoute(currentRoute());
    window.addEventListener('hashchange', listener);
    return () => window.removeEventListener('hashchange', listener);
  }, []);
  return route;
}

export function navigate(path: string): void {
  window.location.hash = `#/${path.replace(/^\//, '')}`;
}
