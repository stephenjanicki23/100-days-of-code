/** Shell: navigation, simulation controls, and the route table. */

import { useState } from 'react';
import { advance, useApi } from './api.ts';
import { navigate, useRoute } from './router.ts';
import { Dashboard } from './pages/Dashboard.tsx';
import { Fighters } from './pages/Fighters.tsx';
import { FighterProfile } from './pages/FighterProfile.tsx';
import { Rankings } from './pages/Rankings.tsx';
import { Camps, CampDetail } from './pages/Camps.tsx';
import { Events, EventDetailPage } from './pages/Events.tsx';
import { News } from './pages/News.tsx';
import { FightCenter } from './pages/FightCenter.tsx';
import type { SimulationState } from './types.ts';

const NAV = [
  { path: '', label: 'Dashboard' },
  { path: 'rankings', label: 'Rankings' },
  { path: 'fighters', label: 'Fighters' },
  { path: 'events', label: 'Events' },
  { path: 'camps', label: 'Camps' },
  { path: 'news', label: 'The Sport' },
  { path: 'fight-center', label: 'Fight Center' },
];

/** The simulation speeds of brief §30. */
const SPEEDS: { label: string; days: number }[] = [
  { label: '+1 day', days: 1 },
  { label: '+1 week', days: 7 },
  { label: '+1 month', days: 30 },
  { label: '+1 year', days: 365 },
];

function SimControls() {
  const state = useApi<SimulationState>('/simulation/state');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  const run = async (days: number) => {
    setBusy(true);
    setError(undefined);
    try {
      await advance(days);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="topbar">
      <div className="clock">
        <small>Current date</small>
        {state.data?.currentDate ?? '————-——-——'}
      </div>
      <div className="spacer" />
      {error && <span className="error">{error}</span>}
      <div className="sim-controls">
        {SPEEDS.map((speed) => (
          <button key={speed.days} disabled={busy} onClick={() => run(speed.days)}>
            {busy ? '…' : speed.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Screen({ segments }: { segments: readonly string[] }) {
  const [head, second] = segments;
  switch (head) {
    case undefined:
      return <Dashboard />;
    case 'rankings':
      return <Rankings divisionKey={second} />;
    case 'fighters':
      return second ? <FighterProfile id={second} /> : <Fighters />;
    case 'camps':
      return second ? <CampDetail id={second} /> : <Camps />;
    case 'events':
      return second ? <EventDetailPage id={second} /> : <Events />;
    case 'news':
      return <News />;
    case 'fight-center':
      return <FightCenter id={second} />;
    default:
      return (
        <div className="center">
          Nothing here. <span className="link" onClick={() => navigate('')}>Back to the dashboard</span>.
        </div>
      );
  }
}

export function App() {
  const route = useRoute();
  const active = route.segments[0] ?? '';

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          MMA <span>Universe</span>
        </div>
        <nav className="nav">
          {NAV.map((item) => (
            <a
              key={item.path}
              href={`#/${item.path}`}
              className={active === item.path ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-group">Simulation</div>
        <div style={{ padding: '0 20px', color: '#5d6675', fontSize: 12, lineHeight: 1.6 }}>
          Deterministic from a single seed. Advance the world with the controls above; every fighter trains, ages,
          recovers and moves between camps as time passes.
        </div>
      </aside>
      <main className="main">
        <SimControls />
        <Screen segments={route.segments} />
      </main>
    </div>
  );
}
