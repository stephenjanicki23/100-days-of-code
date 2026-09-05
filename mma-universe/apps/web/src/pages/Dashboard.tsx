/** The world at a glance: state of the simulation, the champions, and what just happened. */

import { useApi } from '../api.ts';
import { Loading, ErrorNote, Panel, Stat, FighterLink, TierBadge } from '../components.tsx';
import { navigate } from '../router.ts';
import type { Champion, PromotionInfo, SimulationState, WorldEvent } from '../types.ts';

export function Dashboard() {
  const state = useApi<SimulationState>('/simulation/state');
  const champions = useApi<Champion[]>('/champions');
  const events = useApi<WorldEvent[]>('/events?limit=18');
  const promotions = useApi<PromotionInfo[]>('/promotions');

  if (state.error) return <ErrorNote message={state.error} />;
  if (!state.data) return <Loading what="the universe" />;

  const { counts } = state.data;

  return (
    <>
      <h1>Dashboard</h1>
      <p className="subtitle">
        Universe seed <code>{state.data.seed}</code> · day {state.data.day} · week {state.data.week}
      </p>

      <div className="grid cols-4" style={{ marginBottom: 20 }}>
        <Stat label="Active fighters" value={counts.activeFighters} hint={`${counts.fighters} all-time`} />
        <Stat label="Currently injured" value={counts.injured} />
        <Stat label="Camps" value={counts.camps} hint={`${counts.coaches} coaches`} />
        <Stat label="Divisions" value={counts.divisions} hint={`${counts.promotions} promotions`} />
      </div>

      <div className="grid cols-2">
        <Panel title="Champions">
          {champions.data ? (
            <table>
              <tbody>
                {champions.data.map((champion) => (
                  <tr key={champion.divisionKey}>
                    <td style={{ width: 170 }}>
                      <span className="link" onClick={() => navigate(`rankings/${champion.divisionKey}`)}>
                        {champion.divisionName}
                      </span>
                    </td>
                    <td>
                      <FighterLink fighter={champion.fighter} />
                    </td>
                    <td className="record">{champion.fighter.record}</td>
                    <td className="num">
                      <TierBadge tier={champion.fighter.tier} status={champion.fighter.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loading what="champions" />
          )}
        </Panel>

        <Panel title="Around the sport">
          {events.data ? (
            <ul className="feed">
              {events.data.map((event, index) => (
                <li key={`${event.date}-${index}`}>
                  <span className="date">{event.date}</span>
                  <span>{event.summary}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Loading what="news" />
          )}
        </Panel>
      </div>

      <div style={{ marginTop: 16 }}>
        <Panel title="Promotions">
          <table>
            <thead>
              <tr>
                <th>Promotion</th>
                <th>Tier</th>
                <th>Base</th>
                <th className="num">Prestige</th>
                <th className="num">Roster</th>
                <th className="num">Divisions</th>
              </tr>
            </thead>
            <tbody>
              {(promotions.data ?? []).map((promotion) => (
                <tr key={promotion.id}>
                  <td>{promotion.name}</td>
                  <td className="muted">{promotion.tier}</td>
                  <td className="muted">{promotion.country}</td>
                  <td className="num">{promotion.prestige}</td>
                  <td className="num">{promotion.rosterSize}</td>
                  <td className="num">{promotion.divisionKeys.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </>
  );
}
