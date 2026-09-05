/** Searchable roster. */

import { useEffect, useState } from 'react';
import { useApi } from '../api.ts';
import { ErrorNote, FighterLink, Loading, Panel, TierBadge } from '../components.tsx';
import type { DivisionInfo, FighterList } from '../types.ts';

export function Fighters() {
  const divisions = useApi<DivisionInfo[]>('/divisions');
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [division, setDivision] = useState('');
  const [sort, setSort] = useState('ability');

  // Typing should not fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(timer);
  }, [query]);

  const params = new URLSearchParams({ limit: '60', sort });
  if (debounced) params.set('q', debounced);
  if (division) params.set('division', division);
  const fighters = useApi<FighterList>(`/fighters?${params.toString()}`);

  return (
    <>
      <h1>Fighters</h1>
      <p className="subtitle">{fighters.data ? `${fighters.data.total} match the current filters` : 'Searching the roster'}</p>

      <div className="filters">
        <div className="field" style={{ minWidth: 240 }}>
          <label htmlFor="q">Search</label>
          <input id="q" value={query} placeholder="Name or nickname" onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="div">Division</label>
          <select id="div" value={division} onChange={(event) => setDivision(event.target.value)}>
            <option value="">All divisions</option>
            {(divisions.data ?? []).map((item) => (
              <option key={item.key} value={item.key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="ability">Ability</option>
            <option value="popularity">Popularity</option>
            <option value="wins">Wins</option>
            <option value="age">Youngest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <Panel>
        {fighters.loading && !fighters.data && <Loading what="fighters" />}
        {fighters.error && <ErrorNote message={fighters.error} />}
        {fighters.data && (
          <table>
            <thead>
              <tr>
                <th>Fighter</th>
                <th>Division</th>
                <th>Record</th>
                <th className="num">Age</th>
                <th>From</th>
                <th>Tier</th>
                <th className="num">Ability</th>
                <th className="num">Rank</th>
              </tr>
            </thead>
            <tbody>
              {fighters.data.items.map((fighter) => (
                <tr key={fighter.id}>
                  <td>
                    <FighterLink fighter={fighter} />
                  </td>
                  <td className="muted">{fighter.divisionName}</td>
                  <td className="record">{fighter.record}</td>
                  <td className="num">{fighter.age}</td>
                  <td className="muted">{fighter.nationality}</td>
                  <td>
                    <TierBadge tier={fighter.tier} status={fighter.status} />
                  </td>
                  <td className="num">{fighter.currentAbility}</td>
                  <td className="num muted">{fighter.rank === 0 ? 'C' : fighter.rank ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}
