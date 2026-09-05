/**
 * The Fight Center (Sprint 17's foundation).
 *
 * Plays back a stored fight from its event stream — the same stream that will drive the 3D
 * renderer. Nothing here interprets the fight; it renders what the engine already decided,
 * which is the separation the whole architecture rests on.
 */

import { useEffect, useMemo, useState } from 'react';
import { useApi } from '../api.ts';
import { Bar, ErrorNote, Loading, Panel } from '../components.tsx';
import { navigate } from '../router.ts';
import type { FightDetail, FightSummary, FightEventWire } from '../types.ts';

const DECISIVE = new Set(['KNOCKDOWN', 'TAKEDOWN', 'CUT', 'STUN', 'FIGHT_END', 'DECISION', 'SUBMISSION_ATTEMPT']);

function isHighlight(event: FightEventWire): boolean {
  if (DECISIVE.has(event.eventType)) return true;
  return event.eventType === 'SIGNIFICANT_STRIKE' && event.result === 'LANDED';
}

/** Per-fighter statistics recomputed from the event stream, exactly as a broadcast would. */
function tallyFrom(events: FightEventWire[], fighterId: string) {
  let landed = 0;
  let attempted = 0;
  let head = 0;
  let body = 0;
  let leg = 0;
  let takedowns = 0;
  let takedownAttempts = 0;
  let submissions = 0;
  let knockdowns = 0;
  let damage = 0;

  for (const event of events) {
    if (event.attacker !== fighterId) continue;
    if (event.eventType === 'SIGNIFICANT_STRIKE') {
      attempted++;
      if (event.result === 'LANDED' || event.result === 'PARTIAL') {
        landed++;
        damage += event.damage ?? 0;
        if (event.target === 'HEAD') head++;
        else if (event.target === 'BODY') body++;
        else if (event.target === 'LEG') leg++;
      }
    }
    if (event.eventType === 'TAKEDOWN_ATTEMPT') takedownAttempts++;
    if (event.eventType === 'TAKEDOWN') takedowns++;
    if (event.eventType === 'SUBMISSION_ATTEMPT') submissions++;
    if (event.eventType === 'KNOCKDOWN') knockdowns++;
  }
  return { landed, attempted, head, body, leg, takedowns, takedownAttempts, submissions, knockdowns, damage };
}

function StatRow({ label, a, b }: { label: string; a: number | string; b: number | string }) {
  const na = typeof a === 'number' ? a : 0;
  const nb = typeof b === 'number' ? b : 0;
  const total = na + nb || 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 140px 1fr 52px', alignItems: 'center', gap: 8, padding: '5px 0' }}>
      <span className="num" style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>{a}</span>
      <div className="bar" style={{ transform: 'scaleX(-1)' }}>
        <span style={{ width: `${(na / total) * 100}%` }} />
      </div>
      <span className="muted" style={{ textAlign: 'center', fontSize: 12 }}>{label}</span>
      <div className="bar">
        <span style={{ width: `${(nb / total) * 100}%` }} />
      </div>
      <span className="num" style={{ fontFamily: 'var(--mono)' }}>{b}</span>
    </div>
  );
}

function PlayByPlay({ events, highlightsOnly }: { events: FightEventWire[]; highlightsOnly: boolean }) {
  const shown = highlightsOnly
    ? events.filter((event) => isHighlight(event) || ['ROUND_START', 'ROUND_END', 'CORNER_INSTRUCTION'].includes(event.eventType))
    : events;

  return (
    <ul className="feed" style={{ maxHeight: 560, overflowY: 'auto' }}>
      {shown.map((event) => {
        const isRound = event.eventType === 'ROUND_START' || event.eventType === 'ROUND_END';
        const isBig = ['KNOCKDOWN', 'FIGHT_END', 'DECISION'].includes(event.eventType);
        return (
          <li
            key={event.sequence}
            style={{
              borderTop: isRound ? '1px solid var(--border)' : undefined,
              paddingTop: isRound ? 12 : undefined,
            }}
          >
            <span className="date">{isRound ? `R${event.round}` : `${event.roundTime}`}</span>
            <span style={{ color: isBig ? 'var(--accent)' : isRound ? 'var(--text)' : undefined, fontWeight: isBig || isRound ? 600 : undefined }}>
              {event.description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function FightCenter({ id }: { id?: string }) {
  const list = useApi<FightSummary[]>('/fights?limit=40');
  const [selected, setSelected] = useState<string | undefined>(id);
  const activeId = selected ?? id ?? list.data?.[0]?.id;
  const fight = useApi<FightDetail>(activeId ? `/fights/${activeId}` : undefined);
  const [highlightsOnly, setHighlightsOnly] = useState(true);

  useEffect(() => {
    if (id) setSelected(id);
  }, [id]);

  const tallies = useMemo(() => {
    if (!fight.data) return undefined;
    return {
      a: tallyFrom(fight.data.events, fight.data.fighterAId),
      b: tallyFrom(fight.data.events, fight.data.fighterBId),
    };
  }, [fight.data]);

  if (list.error) return <ErrorNote message={list.error} />;
  if (list.data && list.data.length === 0) {
    return (
      <>
        <h1>Fight Center</h1>
        <Panel>
          <p className="muted">
            No fights have been simulated yet. Run <code>npm run -w @mma/cli start -- fight</code>, or advance the
            simulation once events are being booked.
          </p>
        </Panel>
      </>
    );
  }

  return (
    <>
      <h1>Fight Center</h1>
      <p className="subtitle">
        Played back from the fight&rsquo;s event stream — the same machine-readable feed that drives the statistics
        panels and, in Sprint 19, the 3D renderer.
      </p>

      <div className="field" style={{ maxWidth: 560 }}>
        <label htmlFor="fight">Fight</label>
        <select id="fight" value={activeId ?? ''} onChange={(event) => { setSelected(event.target.value); navigate(`fight-center/${event.target.value}`); }}>
          {(list.data ?? []).map((item) => (
            <option key={item.id} value={item.id}>
              {item.fighterAName} vs {item.fighterBName} — {(item.outcome ?? '').replace(/_/g, ' ').toLowerCase()}
              {item.finishRound ? ` (R${item.finishRound})` : ''}
            </option>
          ))}
        </select>
      </div>

      {fight.loading && <Loading what="fight" />}
      {fight.error && <ErrorNote message={fight.error} />}

      {fight.data && tallies && (
        <>
          <Panel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ marginBottom: 2 }}>{fight.data.fighterA?.name ?? fight.data.fighterAName}</h3>
                <div className="muted">{fight.data.fighterA?.record} · {fight.data.fighterA?.primaryStyle}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="badge">{fight.data.divisionName}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 20, margin: '8px 0' }}>
                  {fight.data.scheduledRounds} × 5:00
                </div>
                {fight.data.isTitleFight && <div className="badge elite">Title fight</div>}
              </div>
              <div>
                <h3 style={{ marginBottom: 2 }}>{fight.data.fighterB?.name ?? fight.data.fighterBName}</h3>
                <div className="muted">{fight.data.fighterB?.record} · {fight.data.fighterB?.primaryStyle}</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <strong style={{ color: 'var(--accent)', fontSize: 16 }}>
                {fight.data.winnerName ?? 'Draw'}
              </strong>{' '}
              <span className="muted">
                by {(fight.data.outcome ?? '').replace(/_/g, ' ').toLowerCase()}
                {fight.data.technique ? ` (${fight.data.technique.replace(/_/g, ' ').toLowerCase()})` : ''}
                {fight.data.finishRound ? ` — round ${fight.data.finishRound}, ${fight.data.finishTime}` : ''}
              </span>
            </div>
          </Panel>

          <div className="grid cols-2" style={{ marginTop: 16 }}>
            <Panel title="Statistics">
              <StatRow label="significant strikes" a={tallies.a.landed} b={tallies.b.landed} />
              <StatRow label="attempted" a={tallies.a.attempted} b={tallies.b.attempted} />
              <StatRow label="head" a={tallies.a.head} b={tallies.b.head} />
              <StatRow label="body" a={tallies.a.body} b={tallies.b.body} />
              <StatRow label="leg" a={tallies.a.leg} b={tallies.b.leg} />
              <StatRow label="takedowns" a={tallies.a.takedowns} b={tallies.b.takedowns} />
              <StatRow label="takedown attempts" a={tallies.a.takedownAttempts} b={tallies.b.takedownAttempts} />
              <StatRow label="submission attempts" a={tallies.a.submissions} b={tallies.b.submissions} />
              <StatRow label="knockdowns" a={tallies.a.knockdowns} b={tallies.b.knockdowns} />

              <div style={{ marginTop: 16 }}>
                <div className="attr-row">
                  <span className="label">Damage dealt — {fight.data.fighterA?.name}</span>
                  <span className="val">{Math.round(tallies.a.damage)}</span>
                  <Bar value={tallies.a.damage} max={Math.max(60, tallies.a.damage, tallies.b.damage)} />
                </div>
                <div className="attr-row">
                  <span className="label">Damage dealt — {fight.data.fighterB?.name}</span>
                  <span className="val">{Math.round(tallies.b.damage)}</span>
                  <Bar value={tallies.b.damage} max={Math.max(60, tallies.a.damage, tallies.b.damage)} />
                </div>
              </div>

              {fight.data.scorecards.length > 0 && (
                <div style={{ marginTop: 18 }}>
                  <h2 style={{ marginBottom: 8 }}>Scorecards</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Judge</th>
                        {fight.data.scorecards[0]!.rounds.map((round) => (
                          <th key={round.round} className="num">R{round.round}</th>
                        ))}
                        <th className="num">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fight.data.scorecards.map((card) => (
                        <tr key={card.judgeName}>
                          <td>{card.judgeName}</td>
                          {card.rounds.map((round) => (
                            <td key={round.round} className="num">{round.a}-{round.b}</td>
                          ))}
                          <td className="num">
                            <strong>{card.totalA}-{card.totalB}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>

            <Panel
              title={`Play-by-play (${fight.data.events.length} events)`}
              actions={
                <button
                  className="link"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                  onClick={() => setHighlightsOnly((value) => !value)}
                >
                  {highlightsOnly ? 'show everything' : 'highlights only'}
                </button>
              }
            >
              <PlayByPlay events={fight.data.events} highlightsOnly={highlightsOnly} />
            </Panel>
          </div>
        </>
      )}
    </>
  );
}
