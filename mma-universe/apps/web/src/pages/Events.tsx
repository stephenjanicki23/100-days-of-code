/** Fight cards: what is coming, what happened, and what a show was worth. */

import { useApi } from '../api.ts';
import { ErrorNote, Loading, Panel } from '../components.tsx';
import { navigate } from '../router.ts';
import type { EventDetail, EventSummary } from '../types.ts';

function money(value: number | undefined): string {
  if (!value) return '—';
  return value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(1)}M` : `$${Math.round(value / 1000)}k`;
}

const BILLING_LABEL: Record<string, string> = {
  main_event: 'Main Event',
  co_main: 'Co-Main',
  main_card: 'Main Card',
  prelim: 'Prelims',
  early_prelim: 'Early Prelims',
};

export function Events() {
  const upcoming = useApi<EventSummary[]>('/events?status=scheduled&limit=8');
  const results = useApi<EventSummary[]>('/events?status=completed&limit=25');

  if (results.error) return <ErrorNote message={results.error} />;

  const table = (items: EventSummary[] | undefined, showGate: boolean) => (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Venue</th>
          <th className="num">Bouts</th>
          {showGate && <th className="num">Attendance</th>}
          {showGate && <th className="num">Revenue</th>}
        </tr>
      </thead>
      <tbody>
        {(items ?? []).map((event) => (
          <tr key={event.id}>
            <td className="muted" style={{ whiteSpace: 'nowrap' }}>{event.date}</td>
            <td>
              <span className="link" onClick={() => navigate(`events/${event.id}`)}>
                {event.name}
              </span>
              {event.hasTitleFight && <span className="badge elite" style={{ marginLeft: 8 }}>Title</span>}
              {event.headline && <div className="sub muted">{event.headline}</div>}
            </td>
            <td className="muted">{event.venue ? `${event.venue.name}, ${event.venue.city}` : '—'}</td>
            <td className="num">{event.boutCount}</td>
            {showGate && <td className="num">{event.attendance?.toLocaleString() ?? '—'}</td>}
            {showGate && <td className="num">{money(event.revenue)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <h1>Events</h1>
      <p className="subtitle">
        Cards are booked by the promotion itself — the matchmaker picks the fights, the best of them headlines, and the
        gate follows whoever is selling the show.
      </p>

      {(upcoming.data?.length ?? 0) > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Panel title="Upcoming">{table(upcoming.data, false)}</Panel>
        </div>
      )}

      <Panel title="Results">
        {results.loading && !results.data && <Loading what="events" />}
        {results.data && results.data.length === 0 && (
          <p className="muted">No events yet. Advance the simulation and the promotions will start booking.</p>
        )}
        {results.data && results.data.length > 0 && table(results.data, true)}
      </Panel>
    </>
  );
}

export function EventDetailPage({ id }: { id: string }) {
  const { data, loading, error } = useApi<EventDetail>(`/events/${id}`);
  if (loading) return <Loading what="event" />;
  if (error) return <ErrorNote message={error} />;
  if (!data) return null;

  // Cards are stored top-down; a show is read the same way.
  const grouped = new Map<string, typeof data.fights>();
  for (const fight of data.fights) {
    const list = grouped.get(fight.billing) ?? [];
    list.push(fight);
    grouped.set(fight.billing, list);
  }

  return (
    <>
      <h1>{data.name}</h1>
      <p className="subtitle">
        {data.date} · {data.venue ? `${data.venue.name}, ${data.venue.city}` : 'venue to be confirmed'} ·{' '}
        {data.promotion?.name}
        {data.attendance ? ` · ${data.attendance.toLocaleString()} in attendance` : ''}
        {data.ppvBuys ? ` · ${data.ppvBuys.toLocaleString()} pay-per-view buys` : ''}
        {data.revenue ? ` · ${money(data.revenue)}` : ''}
      </p>

      {[...grouped.entries()].map(([billing, fights]) => (
        <div key={billing} style={{ marginBottom: 16 }}>
          <Panel title={BILLING_LABEL[billing] ?? billing}>
            <table>
              <tbody>
                {fights.map((fight) => (
                  <tr key={fight.id}>
                    <td className="muted" style={{ width: 150 }}>
                      {fight.divisionName}
                      {fight.isTitleFight && (
                        <span className="badge elite" style={{ marginLeft: 6 }}>
                          {fight.titleType === 'interim' ? 'Interim' : fight.titleType === 'vacant' ? 'Vacant' : 'Title'}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="link" onClick={() => navigate(`fighters/${fight.fighterAId}`)}>
                        {fight.fighterA?.name ?? fight.fighterAName}
                      </span>
                      <span className="muted"> vs </span>
                      <span className="link" onClick={() => navigate(`fighters/${fight.fighterBId}`)}>
                        {fight.fighterB?.name ?? fight.fighterBName}
                      </span>
                    </td>
                    <td>
                      {fight.status === 'cancelled' ? (
                        <span className="muted">cancelled</span>
                      ) : (
                        <>
                          <strong>{fight.winnerName ?? 'Draw'}</strong>{' '}
                          <span className="muted">
                            {(fight.outcome ?? '').replace(/_/g, ' ').toLowerCase()}
                            {fight.finishRound ? `, R${fight.finishRound} ${fight.finishTime}` : ''}
                          </span>
                        </>
                      )}
                    </td>
                    <td style={{ width: 110 }}>
                      {fight.status === 'completed' && (
                        <span className="link" onClick={() => navigate(`fight-center/${fight.id}`)}>
                          play-by-play
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
      ))}
    </>
  );
}
