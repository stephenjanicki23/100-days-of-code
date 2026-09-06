/**
 * The 3D viewer (Sprint 19).
 *
 * This page is a consumer of `/fights/:id/events?format=animation` and of nothing else. It
 * has no access to the simulation, no knowledge of attributes, styles or ability — it is
 * handed a list of directives and draws them, which is precisely the position a game engine
 * would be in. If this renders a fight correctly, so can Unreal, from the same JSON.
 *
 * React owns the chrome; `FightViewer` owns the render loop. They meet at three points: the
 * timeline goes in, `onFrame` comes out, and the transport calls `seek`. Frame callbacks
 * deliberately do not drive React state — at 60 fps that would re-render the page sixty
 * times a second — so the scrubber is written straight to the DOM and only a change of beat
 * updates state.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { apiGet, useApi } from '../api.ts';
import { ErrorNote, Loading, Panel } from '../components.tsx';
import { navigate } from '../router.ts';
import { buildTimeline, type Frame, type Pacing, type Timeline } from '../three/player.ts';
import { createViewer, type FightViewer } from '../three/viewer.ts';
import { PALETTE_A, PALETTE_B } from '../three/skeleton.ts';
import type { AnimationStreamWire, FightDetail, FightSummary } from '../types.ts';

const RATES = [0.25, 0.5, 1, 2, 4];

/** Ties a corner's name to the trunks its fighter is wearing, so the label is never ambiguous. */
function Corner({ name, colour, align }: { name: string; colour: number; align: 'left' | 'right' }) {
  const swatch = (
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: 2,
        background: `#${colour.toString(16).padStart(6, '0')}`,
        display: 'inline-block',
      }}
    />
  );
  return (
    <span className="viewer-corner" style={{ textAlign: align, justifyContent: align === 'left' ? 'flex-start' : 'flex-end' }}>
      {align === 'left' && swatch}
      {name}
      {align === 'right' && swatch}
    </span>
  );
}

function formatClock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
}

interface StageProps {
  timeline: Timeline;
  nameA: string;
  nameB: string;
}

function Stage({ timeline, nameA, nameB }: StageProps) {
  const mount = useRef<HTMLDivElement>(null);
  const viewer = useRef<FightViewer>();
  const scrubber = useRef<HTMLInputElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const lastBeat = useRef<number>(-1);

  const [hud, setHud] = useState<{ round: number; roundTime: string; description: string; camera: string }>({
    round: 1,
    roundTime: '05:00',
    description: '',
    camera: 'BROADCAST',
  });
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [failure, setFailure] = useState<string>();

  useEffect(() => {
    const element = mount.current;
    if (!element) return;

    const onFrame = (frame: Frame) => {
      if (scrubber.current) scrubber.current.value = String(frame.time);
      if (clock.current) clock.current.textContent = formatClock(frame.time);
      const index = frame.beat?.index ?? -1;
      if (index !== lastBeat.current) {
        lastBeat.current = index;
        setHud({
          round: frame.round,
          roundTime: frame.roundTime,
          description: frame.description,
          camera: frame.camera,
        });
      }
      if (!viewer.current?.isPlaying) setPlaying(false);
    };

    const created = createViewer(element, { onFrame, onError: setFailure });
    viewer.current = created;
    return () => {
      created?.dispose();
      viewer.current = undefined;
    };
  }, []);

  useEffect(() => {
    lastBeat.current = -1;
    viewer.current?.load(timeline);
    if (scrubber.current) {
      scrubber.current.max = String(timeline.duration);
      scrubber.current.value = '0';
    }
    setPlaying(false);
  }, [timeline]);

  useEffect(() => {
    viewer.current?.setRate(rate);
  }, [rate]);

  const toggle = () => {
    const instance = viewer.current;
    if (!instance) return;
    if (instance.isPlaying) {
      instance.pause();
      setPlaying(false);
    } else {
      instance.play();
      setPlaying(true);
    }
  };

  const step = (direction: 1 | -1) => {
    const instance = viewer.current;
    if (!instance) return;
    instance.pause();
    setPlaying(false);
    const current = instance.currentTime;
    const beats = timeline.beats;
    // Step to the moment the beat *lands*, not to its wind-up: a 0.4 s jab spends most of
    // its length in a stance, and stopping there shows you nothing about what happened.
    const target =
      direction === 1
        ? beats.find((beat) => beat.impactAt > current + 0.01)
        : [...beats].reverse().find((beat) => beat.impactAt < current - 0.01);
    instance.seek(target ? target.impactAt : direction === 1 ? timeline.duration : 0);
  };

  if (failure) {
    return (
      <Panel title="3D unavailable">
        <p className="muted">
          This browser could not create a WebGL context, so the fight cannot be drawn. Everything the renderer
          needs is still available as JSON at <code>/fights/:id/events?format=animation</code>.
        </p>
        <p className="muted" style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{failure}</p>
      </Panel>
    );
  }

  return (
    <div className="viewer">
      <div className="viewer-stage" ref={mount}>
        <div className="viewer-hud viewer-hud-top">
          <Corner name={nameA} colour={PALETTE_A.trunks} align="left" />
          <span className="viewer-clock">
            R{hud.round} · {hud.roundTime}
          </span>
          <Corner name={nameB} colour={PALETTE_B.trunks} align="right" />
        </div>
        <div className="viewer-hud viewer-hud-bottom">
          <span className="badge">{hud.camera.replace(/_/g, ' ').toLowerCase()}</span>
          <span className="viewer-line">{hud.description}</span>
        </div>
      </div>

      <div className="viewer-transport">
        <button onClick={() => step(-1)} title="Previous beat">‹‹</button>
        <button className="primary" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={() => step(1)} title="Next beat">››</button>
        <span className="viewer-time">
          <span ref={clock}>00:00</span> / {formatClock(timeline.duration)}
        </span>
        <input
          ref={scrubber}
          type="range"
          min={0}
          max={timeline.duration}
          step={0.01}
          defaultValue={0}
          onChange={(event) => {
            viewer.current?.pause();
            setPlaying(false);
            viewer.current?.seek(Number(event.target.value));
          }}
        />
        <select value={rate} onChange={(event) => setRate(Number(event.target.value))} title="Playback rate">
          {RATES.map((value) => (
            <option key={value} value={value}>
              {value}×
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function FightViewer3D({ id }: { id?: string }) {
  const list = useApi<FightSummary[]>('/fights?limit=40');
  const [selected, setSelected] = useState<string | undefined>(id);
  const activeId = selected ?? id ?? list.data?.[0]?.id;
  const fight = useApi<FightDetail>(activeId ? `/fights/${activeId}` : undefined);

  const [stream, setStream] = useState<AnimationStreamWire>();
  const [pacing, setPacing] = useState<Pacing>('CONDENSED');
  const [loadError, setLoadError] = useState<string>();

  useEffect(() => {
    if (id) setSelected(id);
  }, [id]);

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    setStream(undefined);
    setLoadError(undefined);
    apiGet<AnimationStreamWire>(`/fights/${activeId}/events?format=animation`)
      .then((data) => {
        if (!cancelled) setStream(data);
      })
      .catch((cause: unknown) => {
        if (!cancelled) setLoadError(cause instanceof Error ? cause.message : String(cause));
      });
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  const timeline = useMemo(() => {
    if (!stream || !fight.data) return undefined;
    const profiles =
      stream.profiles.length === 2 ? ([stream.profiles[0]!, stream.profiles[1]!] as const) : undefined;
    return buildTimeline(stream.beats, fight.data.fighterAId, fight.data.fighterBId, pacing, profiles);
  }, [stream, fight.data, pacing]);

  if (list.error) return <ErrorNote message={list.error} />;

  return (
    <>
      <h1>Fight Viewer</h1>
      <p className="subtitle">
        Rendered from <code>/fights/:id/events?format=animation</code> — the directive stream the simulation&rsquo;s
        animation mapper produces. The renderer has no access to the fight engine; it is handed clip names, camera
        hints and reactions, and draws them.
      </p>

      <div className="viewer-controls">
        <div className="field" style={{ flex: 1, minWidth: 280 }}>
          <label htmlFor="viewer-fight">Fight</label>
          <select
            id="viewer-fight"
            value={activeId ?? ''}
            onChange={(event) => {
              setSelected(event.target.value);
              navigate(`fight-3d/${event.target.value}`);
            }}
          >
            {(list.data ?? []).map((item) => (
              <option key={item.id} value={item.id}>
                {item.fighterAName} vs {item.fighterBName} — {(item.outcome ?? '').replace(/_/g, ' ').toLowerCase()}
                {item.finishRound ? ` (R${item.finishRound})` : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="viewer-pacing">Pacing</label>
          <select id="viewer-pacing" value={pacing} onChange={(event) => setPacing(event.target.value as Pacing)}>
            <option value="CONDENSED">Condensed — action only</option>
            <option value="REALTIME">Real time — on the fight clock</option>
          </select>
        </div>
      </div>

      {list.data && list.data.length === 0 && (
        <Panel>
          <p className="muted">No fights have been simulated yet, so there is nothing to draw.</p>
        </Panel>
      )}
      {loadError && <ErrorNote message={loadError} />}
      {fight.error && <ErrorNote message={fight.error} />}
      {!timeline && !loadError && activeId && <Loading what="fight stream" />}

      {timeline && fight.data && (
        <Stage
          key={`${activeId}-${pacing}`}
          timeline={timeline}
          nameA={fight.data.fighterA?.name ?? fight.data.fighterAName ?? 'Red corner'}
          nameB={fight.data.fighterB?.name ?? fight.data.fighterBName ?? 'Blue corner'}
        />
      )}

      {timeline && (
        <Panel title="Directive stream" actions={<span className="muted">{timeline.beats.length} beats</span>}>
          <p className="muted" style={{ marginTop: 0 }}>
            Every beat below is one event from the engine paired with the clip, camera and reaction the mapper
            resolved for it. Nothing else reaches the renderer.
          </p>
          <ul className="feed" style={{ maxHeight: 320, overflowY: 'auto' }}>
            {timeline.beats.slice(0, 200).map((beat) => (
              <li key={beat.event.sequence}>
                <span className="date">{formatClock(beat.start)}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)' }}>
                  {beat.clip.duration.toFixed(2)}s
                </span>{' '}
                <span>{beat.event.description}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  );
}
