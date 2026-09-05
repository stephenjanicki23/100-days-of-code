/** Division rankings, with movement since the last update. */

import { useApi } from '../api.ts';
import { ErrorNote, FighterLink, Loading, Movement, Panel, TierBadge } from '../components.tsx';
import { navigate } from '../router.ts';
import type { DivisionInfo, RankingView } from '../types.ts';

export function Rankings({ divisionKey }: { divisionKey?: string }) {
  const divisions = useApi<DivisionInfo[]>('/divisions');
  const active = divisionKey ?? divisions.data?.[0]?.key;
  const rankings = useApi<RankingView>(active ? `/rankings/${active}` : undefined);

  if (divisions.error) return <ErrorNote message={divisions.error} />;

  return (
    <>
      <h1>Rankings</h1>
      <p className="subtitle">Weighted by demonstrated ability, opposition, form, activity and dominance — not raw record.</p>

      <div className="field" style={{ maxWidth: 320 }}>
        <label htmlFor="division">Division</label>
        <select id="division" value={active ?? ''} onChange={(event) => navigate(`rankings/${event.target.value}`)}>
          {(divisions.data ?? []).map((division) => (
            <option key={division.key} value={division.key}>
              {division.name} ({division.weightLimitLbs} lb) — {division.fighters} fighters
            </option>
          ))}
        </select>
      </div>

      <Panel>
        {rankings.loading && <Loading what="rankings" />}
        {rankings.error && <ErrorNote message={rankings.error} />}
        {rankings.data && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Fighter</th>
                <th>Record</th>
                <th className="num">Age</th>
                <th>Tier</th>
                <th className="num">Ability</th>
                <th className="num">Points</th>
              </tr>
            </thead>
            <tbody>
              {rankings.data.entries.map((entry) => (
                <tr key={entry.fighter.id}>
                  <td className={`rank ${entry.rank === 0 ? 'champ' : ''}`}>
                    {entry.rank === 0 ? 'C' : entry.rank} <Movement movement={entry.movement} />
                  </td>
                  <td>
                    <FighterLink fighter={entry.fighter} />
                  </td>
                  <td className="record">{entry.fighter.record}</td>
                  <td className="num">{entry.fighter.age}</td>
                  <td>
                    <TierBadge tier={entry.fighter.tier} status={entry.fighter.status} />
                  </td>
                  <td className="num">{entry.fighter.currentAbility}</td>
                  <td className="num muted">{entry.points.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}
