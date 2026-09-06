/**
 * Venue generation (Sprint 14).
 *
 * Venues are generated once with the universe and reused, because a promotion returning to
 * the same arenas is part of what makes a world feel continuous. Names are invented.
 */

import { Rng } from '../core/rng.ts';
import { clamp, round } from '../core/math.ts';
import type { Venue } from '../domain/event.ts';
import { NATIONALITIES } from './names.ts';

const VENUE_PREFIXES = [
  'Grand', 'Union', 'Harbour', 'Central', 'Crown', 'Liberty', 'Summit', 'Pinnacle', 'Meridian',
  'Coliseum', 'Vanguard', 'Northgate', 'Bayview', 'Kingsway', 'Silverdome', 'Sunset',
];
const VENUE_TYPES = ['Arena', 'Centre', 'Coliseum', 'Forum', 'Pavilion', 'Dome', 'Hall', 'Garden'];

export function generateVenues(rng: Rng, count: number, idFactory: () => string): Venue[] {
  const venues: Venue[] = [];
  const taken = new Set<string>();

  for (let i = 0; i < count; i++) {
    const venueRng = rng.derive('venue', i);
    const origin = venueRng.pickWeighted(NATIONALITIES.map((n) => [n, n.weight] as const));
    const city = venueRng.pick(origin.regions);

    let name = '';
    for (let attempt = 0; attempt < 40; attempt++) {
      const candidate = `${venueRng.pick(VENUE_PREFIXES)} ${venueRng.pick(VENUE_TYPES)}`;
      if (!taken.has(candidate)) {
        name = candidate;
        break;
      }
    }
    if (!name) name = `${venueRng.pick(VENUE_PREFIXES)} ${venueRng.pick(VENUE_TYPES)} ${i}`;
    taken.add(name);

    // A handful of genuine arenas, a lot of mid-size halls.
    const percentile = i / Math.max(1, count - 1);
    const capacity = Math.round(clamp(21_000 * (1 - percentile) ** 1.5 + venueRng.float(2_400, 5_500), 2_000, 22_000));

    venues.push({
      id: idFactory(),
      name,
      city,
      country: origin.code,
      capacity,
      prestige: round(clamp((capacity / 22_000) * 88 + venueRng.normal(0, 7), 8, 99), 1),
    });
  }

  return venues;
}
