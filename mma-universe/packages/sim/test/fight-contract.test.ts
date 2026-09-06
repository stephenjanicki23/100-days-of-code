import { describe, expect, it } from 'vitest';
import {
  FALLBACK_DIRECTIVE,
  FIGHT_EVENT_JSON_SCHEMA,
  FIGHT_EVENT_SCHEMA_VERSION,
  FIGHT_EVENT_TYPES,
  animationRegistry,
  formatRoundClock,
  isDecisiveEvent,
  mapEventToAnimation,
  parseFightEvent,
  requiredClips,
  validateFightEvent,
  type FightEvent,
  type StrikeEvent,
} from '@mma/sim';

const strike: StrikeEvent = {
  schemaVersion: FIGHT_EVENT_SCHEMA_VERSION,
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

describe('fight event contract (brief §15, §17)', () => {
  it('accepts the brief\'s own worked example', () => {
    expect(validateFightEvent(strike)).toEqual({ ok: true, errors: [] });
  });

  it('rejects malformed events at the ingestion boundary', () => {
    expect(validateFightEvent({ ...strike, roundTime: '2:17' }).ok).toBe(false);
    expect(validateFightEvent({ ...strike, eventType: 'CARTWHEEL' }).ok).toBe(false);
    expect(validateFightEvent({ ...strike, technique: 'MEGA_PUNCH' }).ok).toBe(false);
    expect(validateFightEvent({ ...strike, position: 'FLOATING' }).ok).toBe(false);
    expect(validateFightEvent({ ...strike, sequence: -1 }).ok).toBe(false);
    expect(validateFightEvent(null).ok).toBe(false);
    expect(() => parseFightEvent({ nonsense: true })).toThrow(TypeError);
  });

  it('refuses events from a newer schema than the consumer understands', () => {
    const result = validateFightEvent({ ...strike, schemaVersion: FIGHT_EVENT_SCHEMA_VERSION + 1 });
    expect(result.ok).toBe(false);
    expect(result.errors.join(' ')).toContain('newer');
  });

  it('never mentions presentation — the schema carries no rendering fields', () => {
    const forbidden = ['camera', 'animation', 'clip', 'speed', 'reaction', 'duration'];
    const properties = Object.keys(FIGHT_EVENT_JSON_SCHEMA.properties);
    for (const field of forbidden) expect(properties).not.toContain(field);
  });

  it('publishes a JSON Schema covering every event type', () => {
    expect(FIGHT_EVENT_JSON_SCHEMA.properties.eventType.enum).toEqual([...FIGHT_EVENT_TYPES]);
  });

  it('formats the round clock as a countdown', () => {
    expect(formatRoundClock(137)).toBe('02:17');
    expect(formatRoundClock(0)).toBe('00:00');
    expect(formatRoundClock(300)).toBe('05:00');
  });

  it('identifies the events worth putting in a highlight feed', () => {
    expect(isDecisiveEvent(strike)).toBe(true);
    expect(isDecisiveEvent({ ...strike, result: 'BLOCKED' })).toBe(false);
    expect(isDecisiveEvent({ ...strike, eventType: 'STRIKE' })).toBe(false);
  });
});

describe('3D animation mapping (brief §16, §17)', () => {
  it('maps a technique to a prebuilt clip rather than generating one', () => {
    const directive = mapEventToAnimation(strike);
    expect(directive.clip).toBe('strike_cross');
    expect(requiredClips()).toContain(directive.clip);
  });

  it('is deterministic — the same event always yields the same variant', () => {
    // A renderer that rolled dice would show a different fight on every replay.
    expect(mapEventToAnimation(strike)).toEqual(mapEventToAnimation({ ...strike }));
  });

  it('varies the variant across repeated techniques', () => {
    const variants = new Set(
      Array.from({ length: 12 }, (_, i) => mapEventToAnimation({ ...strike, technique: 'JAB', sequence: i }).variant),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it('never emits a variant outside the clip\'s authored range', () => {
    const registry = animationRegistry();
    for (let sequence = 0; sequence < 200; sequence++) {
      const directive = mapEventToAnimation({ ...strike, technique: 'JAB', sequence });
      expect(directive.variant).toBeLessThan(registry.JAB!.variants);
      expect(directive.variant).toBeGreaterThanOrEqual(0);
    }
  });

  it('derives the hit reaction from what the event says happened', () => {
    // Damage values are on the scale the fight engine actually emits. The tick-loop rewrite
    // moved that scale down — a landed strike now runs about 0.2 to 2.5 with a median near
    // 0.6, where it used to sit higher — so these fixtures moved with it. The live
    // distribution is what `reaction-calibration.test.ts` measures; this only pins the
    // mapping's shape.
    expect(mapEventToAnimation({ ...strike, damage: 2.3 }).reaction).toBe('HEAVY');
    expect(mapEventToAnimation({ ...strike, damage: 0.9 }).reaction).toBe('LIGHT');
    expect(mapEventToAnimation({ ...strike, damage: 0.3 }).reaction).toBe('NONE');
    expect(mapEventToAnimation({ ...strike, result: 'BLOCKED' }).reaction).toBe('BLOCK');
    expect(mapEventToAnimation({ ...strike, result: 'MISSED' }).reaction).toBe('SLIP');
  });

  it('falls back rather than failing on an event type it has never seen', () => {
    // A shipped renderer will always be older than some future engine build.
    const unknown = { ...strike, eventType: 'TELEPORT', technique: 'UNKNOWN_MOVE' } as unknown as FightEvent;
    const directive = mapEventToAnimation(unknown);
    expect(directive.clip).toBe(FALLBACK_DIRECTIVE.clip);
  });

  it('queues a replay only for decisive moments', () => {
    expect(mapEventToAnimation({ ...strike, damage: 2.4 }).triggersReplay).toBe(true);
    expect(mapEventToAnimation({ ...strike, damage: 1.2 }).triggersReplay).toBe(false);
  });

  it('resolves the position implied by a grappling event', () => {
    const takedown = {
      ...strike,
      eventType: 'TAKEDOWN' as const,
      technique: 'DOUBLE_LEG' as const,
      result: 'COMPLETED' as const,
    } as unknown as FightEvent;
    expect(mapEventToAnimation(takedown).targetState).toBe('GROUND_TOP');
    expect(mapEventToAnimation(takedown).clip).toBe('td_double_leg');
  });

  it('names every clip the art pipeline must author', () => {
    const clips = requiredClips();
    expect(clips.length).toBeGreaterThan(30);
    expect(new Set(clips).size).toBe(clips.length);
  });
});
