/** Small presentational pieces shared across screens. */

import type { ReactNode } from 'react';
import { navigate } from './router.ts';
import type { FighterSummary } from './types.ts';

export function Panel({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="panel">
      {(title || actions) && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          {title && <h2 style={{ flex: 1 }}>{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="panel stat">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      {hint && <div className="muted" style={{ fontSize: 12 }}>{hint}</div>}
    </div>
  );
}

/** A 0-100 rating bar. Used for attributes, facets, and camp facilities alike. */
export function Bar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="bar">
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

/**
 * Current ability against potential. The darker bar is the ceiling, the bright one is what
 * has actually been realised — the single most informative thing about a fighter's future.
 */
export function AbilityMeter({ current, potential }: { current: number; potential: number }) {
  const scale = 200;
  return (
    <div className="ability-meter" title={`${current} current / ${potential} potential`}>
      <span className="potential" style={{ width: `${(potential / scale) * 100}%` }} />
      <span className="current" style={{ width: `${(current / scale) * 100}%` }} />
    </div>
  );
}

/** `compact` drops the camp, for narrow columns where the full line wraps to three rows. */
export function FighterLink({ fighter, compact = false }: { fighter: FighterSummary; compact?: boolean }) {
  return (
    <div className="name-cell">
      <span className="link" onClick={() => navigate(`fighters/${fighter.id}`)}>
        {fighter.name}
      </span>
      <span className="sub">
        {fighter.primaryStyle}
        {!compact && fighter.campName ? ` · ${fighter.campName}` : ''}
      </span>
    </div>
  );
}

export function TierBadge({ tier, status }: { tier: string; status?: string }) {
  if (status === 'injured') return <span className="badge injured">Injured</span>;
  if (status === 'retired') return <span className="badge retired">Retired</span>;
  return <span className={`badge ${tier === 'Elite' ? 'elite' : ''}`}>{tier}</span>;
}

export function Loading({ what = 'data' }: { what?: string }) {
  return <div className="center">Loading {what}…</div>;
}

export function ErrorNote({ message }: { message: string }) {
  return <div className="center error">{message}</div>;
}

/** Rank movement since the previous ranking update. */
export function Movement({ movement }: { movement: number }) {
  if (!movement) return <span className="muted"> </span>;
  return <span className={movement > 0 ? 'move-up' : 'move-down'}>{movement > 0 ? `▲${movement}` : `▼${-movement}`}</span>;
}
