/** Camp rankings and the profile of one camp. */

import { useApi } from '../api.ts';
import { Bar, ErrorNote, FighterLink, Loading, Panel, TierBadge } from '../components.tsx';
import { navigate } from '../router.ts';
import type { CampProfile, CampSummary } from '../types.ts';

export function Camps() {
  const { data, loading, error } = useApi<{ total: number; items: CampSummary[] }>('/camps');
  if (loading) return <Loading what="camps" />;
  if (error) return <ErrorNote message={error} />;

  return (
    <>
      <h1>Camps</h1>
      <p className="subtitle">
        {data?.total ?? 0} active gyms. A camp&rsquo;s specialisation multiplies development in the attributes that
        discipline actually trains — never a flat bonus.
      </p>
      <Panel>
        <table>
          <thead>
            <tr>
              <th>Camp</th>
              <th>Location</th>
              <th className="num">Rep</th>
              <th className="num">Roster</th>
              <th className="num">Quality</th>
              <th>Specialisations</th>
            </tr>
          </thead>
          <tbody>
            {(data?.items ?? []).map((camp) => (
              <tr key={camp.id}>
                <td>
                  <span className="link" onClick={() => navigate(`camps/${camp.id}`)}>
                    {camp.name}
                  </span>
                </td>
                <td className="muted">
                  {camp.city}, {camp.country}
                </td>
                <td className="num">{camp.reputation}</td>
                <td className="num">
                  {camp.rosterSize}/{camp.capacity}
                </td>
                <td className="num">{camp.trainingQuality}</td>
                <td className="muted">
                  {camp.specialisations
                    .map((specialisation) => `${specialisation.discipline} +${specialisation.bonusPercent}%`)
                    .join(' · ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}

export function CampDetail({ id }: { id: string }) {
  const { data, loading, error } = useApi<CampProfile>(`/camps/${id}`);
  if (loading) return <Loading what="camp" />;
  if (error) return <ErrorNote message={error} />;
  if (!data) return null;

  return (
    <>
      <h1>{data.name}</h1>
      <p className="subtitle">
        {data.city}, {data.country} · founded {data.foundedYear} · reputation {data.reputation} (peak {data.peakReputation})
        {data.status !== 'active' ? ` · ${data.status}` : ''}
      </p>

      <div className="grid cols-3" style={{ marginBottom: 16 }}>
        <Panel title="Specialisations">
          {data.specialisations.map((specialisation) => (
            <div className="attr-row" key={specialisation.disciplineKey}>
              <span className="label">
                {specialisation.discipline} <span className="muted">(tier {specialisation.tier})</span>
              </span>
              <span className="val">+{specialisation.bonusPercent}%</span>
              <Bar value={specialisation.bonusPercent} max={15} />
            </div>
          ))}
        </Panel>

        <Panel title="Facilities">
          {Object.entries(data.facilities).map(([key, value]) => (
            <div className="attr-row" key={key}>
              <span className="label">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className="val">{Math.round(value)}</span>
              <Bar value={value} />
            </div>
          ))}
        </Panel>

        <Panel title="Culture">
          {Object.entries(data.culture).map(([key, value]) => (
            <div className="attr-row" key={key}>
              <span className="label">{key}</span>
              <span className="val">{Math.round(value)}</span>
              <Bar value={value} />
            </div>
          ))}
        </Panel>
      </div>

      <div className="grid cols-2">
        <Panel title="Coaching staff">
          <table>
            <thead>
              <tr>
                <th>Coach</th>
                <th>Role</th>
                <th>Discipline</th>
                <th className="num">Ability</th>
                <th className="num">Man-mgmt</th>
              </tr>
            </thead>
            <tbody>
              {data.coaches.map((coach) => (
                <tr key={coach.id}>
                  <td>
                    {coach.name}
                    {coach.id === data.headCoachId && <span className="badge elite" style={{ marginLeft: 8 }}>Head</span>}
                  </td>
                  <td className="muted">{coach.role}</td>
                  <td className="muted">{coach.discipline}</td>
                  <td className="num">{coach.ability}</td>
                  <td className="num">{coach.manManagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={`Roster (${data.roster.length})`}>
          <table>
            <thead>
              <tr>
                <th>Fighter</th>
                <th>Division</th>
                <th>Record</th>
                <th>Tier</th>
                <th className="num">Ability</th>
              </tr>
            </thead>
            <tbody>
              {data.roster.map((fighter) => (
                <tr key={fighter.id}>
                  <td>
                    <FighterLink fighter={fighter} />
                  </td>
                  <td className="muted">{fighter.divisionName}</td>
                  <td className="record">{fighter.record}</td>
                  <td>
                    <TierBadge tier={fighter.tier} status={fighter.status} />
                  </td>
                  <td className="num">{fighter.currentAbility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </>
  );
}
