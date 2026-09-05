/** A single fighter: identity, ability, style, attributes, condition and development. */

import { useApi } from '../api.ts';
import { AbilityMeter, Bar, ErrorNote, Loading, Panel } from '../components.tsx';
import { navigate } from '../router.ts';
import type { FighterProfile as Profile } from '../types.ts';

const GROUP_LABELS: Record<string, string> = {
  striking: 'Striking',
  wrestling: 'Wrestling',
  grappling: 'Grappling',
  physical: 'Physical',
  mental: 'Mental',
};

function DevelopmentChart({ history }: { history: Profile['development'] }) {
  if (history.length < 2) {
    return <p className="muted">Development history appears once the simulation has advanced a few months.</p>;
  }
  // Scaled to the series' own range rather than to zero. A career moves by a handful of
  // ability points over months, and a chart anchored at zero renders that as a flat wall.
  const values = history.map((point) => point.currentAbility);
  const low = Math.min(...values);
  const high = Math.max(...values);
  const span = Math.max(high - low, 2);
  return (
    <>
      <div className="spark">
        {history.map((point, index) => (
          <span
            key={point.date}
            className={index === history.length - 1 ? 'last' : ''}
            style={{ height: `${12 + ((point.currentAbility - low) / span) * 88}%` }}
            title={`${point.date} — age ${point.age}, ability ${point.currentAbility.toFixed(1)}`}
          />
        ))}
      </div>
      <p className="muted" style={{ fontSize: 12, marginBottom: 0 }}>
        {history[0]!.date} → {history[history.length - 1]!.date} · ability{' '}
        {history[0]!.currentAbility.toFixed(0)} → {history[history.length - 1]!.currentAbility.toFixed(0)}
      </p>
    </>
  );
}

export function FighterProfile({ id }: { id: string }) {
  const { data, loading, error } = useApi<Profile>(`/fighters/${id}`);
  if (loading) return <Loading what="fighter" />;
  if (error) return <ErrorNote message={error} />;
  if (!data) return null;

  const groups = [...new Set(data.attributes.map((attribute) => attribute.group))];

  return (
    <>
      <h1>{data.name}</h1>
      <p className="subtitle">
        {data.divisionName} · {data.record} · age {data.age} · {data.homeRegion}, {data.nationality} · {data.stance}
        {data.camp && (
          <>
            {' · '}
            <span className="link" onClick={() => navigate(`camps/${data.camp!.id}`)}>
              {data.camp.name}
            </span>
          </>
        )}
      </p>

      <div className="grid cols-2" style={{ marginBottom: 16 }}>
        <Panel title="Ability">
          <AbilityMeter current={data.scouting.currentAbility} potential={data.scouting.potentialAbility} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span>
              <strong>{data.scouting.currentAbility}</strong> <span className="muted">current</span>
            </span>
            <span>
              <strong>{data.scouting.potentialAbility}</strong> <span className="muted">potential</span>
            </span>
            <span>
              <strong>{Math.round(data.scouting.fulfilment * 100)}%</strong> <span className="muted">realised</span>
            </span>
          </div>
          <p className="muted" style={{ fontSize: 12, marginBottom: 0 }}>
            Potential is a ceiling, not a promise — training, camp, age, injuries and temperament decide how much of it a
            fighter ever reaches.
          </p>
        </Panel>

        <Panel title="Style">
          <h3>
            {data.style.primary} <span className="muted">/ {data.style.secondary}</span>
          </h3>
          <p className="muted" style={{ marginTop: 0 }}>{data.style.description}</p>
          <dl className="kv">
            <dt>Strength</dt>
            <dd>
              {data.style.strength.label} ({data.style.strength.rating})
            </dd>
            <dt>Weakness</dt>
            <dd>
              {data.style.weakness.label} ({data.style.weakness.rating})
            </dd>
            <dt>Signature</dt>
            <dd>
              {data.style.signature.label} ({data.style.signature.rating})
            </dd>
          </dl>
        </Panel>
      </div>

      <div className="grid cols-3" style={{ marginBottom: 16 }}>
        <Panel title="Condition">
          <dl className="kv">
            <dt>Fatigue</dt>
            <dd>{data.condition.fatigue}</dd>
            <dt>Sharpness</dt>
            <dd>{data.condition.sharpness}</dd>
            <dt>Weight</dt>
            <dd>{data.condition.weightManagement}</dd>
            <dt>Wear</dt>
            <dd>{data.condition.wearAndTear}</dd>
          </dl>
          {data.condition.injuries.length > 0 && (
            <p className="error" style={{ marginBottom: 0 }}>
              {data.condition.injuries.map((injury) => `${injury.label} — out until ${injury.expectedReturn}`).join('; ')}
            </p>
          )}
        </Panel>

        <Panel title="Training">
          <dl className="kv">
            <dt>Intensity</dt>
            <dd>{data.training.intensity}</dd>
            <dt>Focus</dt>
            <dd style={{ fontFamily: 'inherit' }}>{data.training.focus.join(', ') || '—'}</dd>
          </dl>
        </Panel>

        <Panel title="Career">
          <dl className="kv">
            <dt>Popularity</dt>
            <dd>{Math.round(Number(data.career.popularity))}</dd>
            <dt>Reputation</dt>
            <dd>{Math.round(Number(data.career.reputation))}</dd>
            <dt>Momentum</dt>
            <dd>{Math.round(Number(data.career.momentum))}</dd>
            <dt>Earnings</dt>
            <dd>${Number(data.career.careerEarnings).toLocaleString()}</dd>
          </dl>
        </Panel>
      </div>

      <div className="grid cols-2" style={{ marginBottom: 16 }}>
        <Panel title="Fight shape">
          {Object.entries(data.facets).map(([key, value]) => (
            <div className="attr-row" key={key}>
              <span className="label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}</span>
              <span className="val">{value}</span>
              <Bar value={value} />
            </div>
          ))}
        </Panel>
        <Panel title="Development">
          <DevelopmentChart history={data.development} />
        </Panel>
      </div>

      <div className="grid cols-2">
        {groups.map((group) => (
          <Panel key={group} title={GROUP_LABELS[group] ?? group}>
            {data.attributes
              .filter((attribute) => attribute.group === group)
              .sort((a, b) => b.value - a.value)
              .map((attribute) => (
                <div className="attr-row" key={attribute.key}>
                  <span className="label">{attribute.label}</span>
                  <span className="val">{attribute.value.toFixed(1)}</span>
                  <Bar value={attribute.value} />
                </div>
              ))}
          </Panel>
        ))}
      </div>
    </>
  );
}
