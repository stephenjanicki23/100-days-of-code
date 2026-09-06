/**
 * The living world: what the sport is talking about.
 *
 * Every article here was generated from something that actually happened in the simulation,
 * and every storyline was detected from the world's own history rather than authored. The
 * page is a read-out, not a narrative layer.
 */

import { useState } from 'react';
import { useApi } from '../api.ts';
import { Bar, ErrorNote, Loading, Panel } from '../components.tsx';
import { navigate } from '../router.ts';
import type { NewsArticleWire, StorylineWire, TitleWire } from '../types.ts';

const CATEGORIES = ['all', 'title', 'result', 'injury', 'signing', 'camp', 'retirement'] as const;

const STORYLINE_LABEL: Record<string, string> = {
  rivalry: 'Rivalry',
  unfinished_business: 'Unfinished business',
  title_chase: 'Title chase',
  prospect_rise: 'Rising prospect',
  veteran_decline: 'Veteran at the crossroads',
  comeback: 'Comeback',
  camp_rivalry: 'Camp rivalry',
};

export function News() {
  const [category, setCategory] = useState<string>('all');
  const news = useApi<NewsArticleWire[]>(`/news?limit=45${category === 'all' ? '' : `&category=${category}`}`);
  const storylines = useApi<StorylineWire[]>('/storylines?limit=8');
  const titles = useApi<TitleWire[]>('/titles');

  if (news.error) return <ErrorNote message={news.error} />;

  return (
    <>
      <h1>The Sport</h1>
      <p className="subtitle">
        News is generated from simulation events, never invented. Storylines are detected from the world&rsquo;s own
        history — a rivalry exists because two fighters kept being matched, not because something decided they should
        have one.
      </p>

      <div className="filters">
        <div className="field">
          <label htmlFor="cat">Category</label>
          <select id="cat" value={category} onChange={(event) => setCategory(event.target.value)}>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'Everything' : item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid cols-2">
        <Panel title="Headlines">
          {news.loading && !news.data && <Loading what="news" />}
          {news.data && news.data.length === 0 && (
            <p className="muted">Nothing yet. Advance the simulation and the sport will start generating stories.</p>
          )}
          <ul className="feed">
            {(news.data ?? []).map((article) => (
              <li key={article.id} style={{ flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                  <span className="date">{article.published}</span>
                  <strong
                    className={article.subjectId ? 'link' : undefined}
                    onClick={article.subjectId ? () => navigate(`fighters/${article.subjectId}`) : undefined}
                  >
                    {article.headline}
                  </strong>
                </div>
                <div className="muted" style={{ fontSize: 13, paddingLeft: 92 }}>{article.body}</div>
              </li>
            ))}
          </ul>
        </Panel>

        <div>
          <Panel title="Running storylines">
            {(storylines.data ?? []).length === 0 && <p className="muted">No storylines yet.</p>}
            {(storylines.data ?? []).map((storyline) => (
              <div key={storyline.id} style={{ padding: '10px 0', borderBottom: '1px solid #1c2026' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span className="badge">{STORYLINE_LABEL[storyline.kind] ?? storyline.kind}</span>
                  <strong style={{ flex: 1 }}>{storyline.title}</strong>
                </div>
                <div style={{ margin: '6px 0' }}>
                  <Bar value={storyline.heat} />
                </div>
                {storyline.beats.slice(-1).map((beat, index) => (
                  <div key={index} className="muted" style={{ fontSize: 13 }}>
                    {beat.text}
                  </div>
                ))}
              </div>
            ))}
          </Panel>

          <div style={{ marginTop: 16 }}>
            <Panel title="The title picture">
              <table>
                <tbody>
                  {(titles.data ?? []).map((title) => (
                    <tr key={title.divisionKey}>
                      <td className="muted" style={{ width: 150 }}>{title.divisionName}</td>
                      <td>
                        {title.champion ? (
                          <span className="link" onClick={() => navigate(`fighters/${title.champion!.id}`)}>
                            {title.champion.name}
                          </span>
                        ) : (
                          <span className="muted">vacant</span>
                        )}
                        {title.interimChampion && (
                          <div className="sub muted">interim: {title.interimChampion.name}</div>
                        )}
                      </td>
                      <td className="num muted" title="successful defences">{title.defences}</td>
                      <td className="num muted" title="reigns in this division's history">
                        {title.lineage.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="muted" style={{ fontSize: 12, marginBottom: 0 }}>
                Columns: successful defences, and the number of reigns in the division&rsquo;s lineage.
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}
