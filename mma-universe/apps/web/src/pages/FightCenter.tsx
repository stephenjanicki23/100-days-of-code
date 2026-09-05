/**
 * The Fight Center (brief §29).
 *
 * The fight engine is Phase 3, so there is nothing to play back yet — but the contract that
 * will drive this screen already exists, so the page shows it rather than pretending. Both
 * the play-by-play panel and the 3D viewer consume the same event stream over the same
 * WebSocket; only the presentation differs.
 */

import { useApi } from '../api.ts';
import { Panel } from '../components.tsx';

interface AnimationRegistry {
  registry: Record<string, { clip: string; variants: number; camera?: string; speed?: number }>;
  requiredClips: string[];
}

export function FightCenter() {
  const schema = useApi<Record<string, unknown>>('/schema/fight-event');
  const animations = useApi<AnimationRegistry>('/schema/animation-registry');

  const sample = {
    schemaVersion: 1,
    fightId: 'fight_10482',
    sequence: 137,
    round: 2,
    timestamp: 437,
    roundTime: '02:17',
    timeRemaining: 137,
    attacker: 'fighter_00182',
    defender: 'fighter_00421',
    eventType: 'SIGNIFICANT_STRIKE',
    technique: 'RIGHT_CROSS',
    target: 'HEAD',
    result: 'LANDED',
    position: 'STANDING',
    damage: 7,
    staminaCost: 4,
    description: 'Vale lands a clean right cross to the head.',
  };

  return (
    <>
      <h1>Fight Center</h1>
      <p className="subtitle">
        No fights have been simulated yet — the fight engine is Phase&nbsp;3. Its output contract is already fixed, so
        this screen, the statistics panels and the 3D viewer are all built against it.
      </p>

      <div className="grid cols-2">
        <Panel title="A fight event">
          <p className="muted" style={{ marginTop: 0 }}>
            Events say <em>what happened</em> and never how to draw it. The same stream feeds the play-by-play, the stats
            panel and the renderer.
          </p>
          <pre style={{ overflowX: 'auto', fontSize: 12 }}>{JSON.stringify(sample, null, 2)}</pre>
        </Panel>

        <Panel title="3D animation mapping">
          <p className="muted" style={{ marginTop: 0 }}>
            The renderer resolves each event to a <strong>prebuilt</strong> clip through a static registry — never a
            generated animation. {animations.data?.requiredClips.length ?? '…'} clips are required by the current
            technique set.
          </p>
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Event / technique</th>
                  <th>Clip</th>
                  <th className="num">Variants</th>
                  <th>Camera</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(animations.data?.registry ?? {}).map(([key, entry]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td className="muted">{entry.clip}</td>
                    <td className="num">{entry.variants}</td>
                    <td className="muted">{entry.camera ?? 'BROADCAST'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: 16 }}>
        <Panel title="Event schema">
          <p className="muted" style={{ marginTop: 0 }}>
            Published at <code>/api/schema/fight-event</code> as JSON Schema so Unreal or Unity can generate their own
            structs without importing any TypeScript.
          </p>
          <pre style={{ maxHeight: 260, overflow: 'auto', fontSize: 12 }}>{JSON.stringify(schema.data ?? {}, null, 2)}</pre>
        </Panel>
      </div>
    </>
  );
}
