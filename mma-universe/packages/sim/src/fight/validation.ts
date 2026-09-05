/**
 * Runtime validation and schema export for the fight event contract.
 *
 * The engine's own events are type-checked at compile time, so this exists for the two
 * places where events cross a trust boundary: the WebSocket feed into a non-TypeScript
 * consumer (Unreal, Unity), and the external live play-by-play ingestion of brief §18, where
 * events are parsed from someone else's data.
 *
 * Hand-written rather than pulled from a validation library on purpose — `@mma/sim` is
 * dependency-free so it can run in a browser, a worker, or a test with no install step, and
 * the JSON Schema below is emitted for consumers who cannot import TypeScript at all.
 */

import {
  ACTION_RESULTS,
  FIGHT_EVENT_SCHEMA_VERSION,
  FIGHT_EVENT_TYPES,
  FIGHT_OUTCOMES,
  FIGHT_POSITIONS,
  STRIKE_TARGETS,
  STRIKE_TECHNIQUES,
  SUBMISSION_TECHNIQUES,
  TAKEDOWN_TECHNIQUES,
  type FightEvent,
} from './events.ts';

export interface ValidationResult {
  readonly ok: boolean;
  readonly errors: readonly string[];
}

const SETS = {
  eventType: new Set<string>(FIGHT_EVENT_TYPES),
  position: new Set<string>(FIGHT_POSITIONS),
  result: new Set<string>(ACTION_RESULTS),
  target: new Set<string>(STRIKE_TARGETS),
  outcome: new Set<string>(FIGHT_OUTCOMES),
  technique: new Set<string>([...STRIKE_TECHNIQUES, ...TAKEDOWN_TECHNIQUES, ...SUBMISSION_TECHNIQUES]),
};

const CLOCK_PATTERN = /^\d{2}:\d{2}$/;

/**
 * Validates one event against the contract.
 *
 * Unknown *event types* are rejected here — a producer must not invent types — but consumers
 * are separately required to tolerate them at runtime, because a renderer may be older than
 * the engine feeding it. The two rules are not in conflict: validation guards ingestion,
 * tolerance guards playback.
 */
export function validateFightEvent(value: unknown): ValidationResult {
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);

  if (typeof value !== 'object' || value === null) {
    return { ok: false, errors: ['event must be an object'] };
  }
  const event = value as Record<string, unknown>;

  if (typeof event.schemaVersion !== 'number') fail('schemaVersion must be a number');
  else if (event.schemaVersion > FIGHT_EVENT_SCHEMA_VERSION) {
    fail(`schemaVersion ${event.schemaVersion} is newer than this consumer supports (${FIGHT_EVENT_SCHEMA_VERSION})`);
  }

  if (typeof event.fightId !== 'string' || event.fightId.length === 0) fail('fightId must be a non-empty string');
  if (typeof event.sequence !== 'number' || !Number.isInteger(event.sequence) || event.sequence < 0) {
    fail('sequence must be a non-negative integer');
  }
  if (typeof event.round !== 'number' || event.round < 1) fail('round must be a positive number');
  if (typeof event.timestamp !== 'number' || event.timestamp < 0) fail('timestamp must be a non-negative number');
  if (typeof event.timeRemaining !== 'number' || event.timeRemaining < 0) fail('timeRemaining must be a non-negative number');
  if (typeof event.roundTime !== 'string' || !CLOCK_PATTERN.test(event.roundTime)) fail('roundTime must match MM:SS');
  if (typeof event.description !== 'string') fail('description must be a string');
  if (typeof event.position !== 'string' || !SETS.position.has(event.position)) fail(`position must be one of the ${FIGHT_POSITIONS.length} known fight positions`);
  if (typeof event.eventType !== 'string' || !SETS.eventType.has(event.eventType)) fail('eventType is not a known event type');

  const requireString = (field: string) => {
    if (typeof event[field] !== 'string' || (event[field] as string).length === 0) fail(`${field} must be a non-empty string`);
  };
  const requireEnum = (field: string, set: Set<string>) => {
    if (typeof event[field] !== 'string' || !set.has(event[field] as string)) fail(`${field} has an unrecognised value`);
  };
  const requireNumber = (field: string) => {
    if (typeof event[field] !== 'number' || Number.isNaN(event[field])) fail(`${field} must be a number`);
  };

  switch (event.eventType) {
    case 'STRIKE':
    case 'SIGNIFICANT_STRIKE':
      requireString('attacker');
      requireString('defender');
      requireEnum('technique', SETS.technique);
      requireEnum('target', SETS.target);
      requireEnum('result', SETS.result);
      requireNumber('damage');
      requireNumber('staminaCost');
      break;
    case 'TAKEDOWN_ATTEMPT':
    case 'TAKEDOWN':
    case 'SPRAWL':
    case 'CLINCH_ENGAGE':
    case 'CLINCH_BREAK':
    case 'SCRAMBLE':
      requireString('attacker');
      requireString('defender');
      requireEnum('result', SETS.result);
      break;
    case 'SUBMISSION_ATTEMPT':
    case 'SUBMISSION_ESCAPE':
      requireString('attacker');
      requireString('defender');
      requireEnum('technique', SETS.technique);
      requireEnum('result', SETS.result);
      requireNumber('tightness');
      break;
    case 'POSITION_CHANGE':
      requireEnum('fromPosition', SETS.position);
      requireEnum('toPosition', SETS.position);
      break;
    case 'KNOCKDOWN':
    case 'STUN':
    case 'CUT':
      requireString('attacker');
      requireString('defender');
      requireNumber('severity');
      break;
    case 'DAMAGE_UPDATE':
      requireString('fighterId');
      if (typeof event.damage !== 'object' || event.damage === null) fail('damage must be an object');
      break;
    case 'STAMINA_UPDATE':
      requireString('fighterId');
      requireNumber('burst');
      requireNumber('cardio');
      break;
    case 'CORNER_INSTRUCTION':
      requireString('fighterId');
      requireString('instruction');
      break;
    case 'FIGHT_END':
    case 'DECISION':
      requireEnum('outcome', SETS.outcome);
      break;
    default:
      break;
  }

  return { ok: errors.length === 0, errors };
}

/** Throws on an invalid event. Used at ingestion boundaries where bad data must not enter. */
export function parseFightEvent(value: unknown): FightEvent {
  const result = validateFightEvent(value);
  if (!result.ok) throw new TypeError(`Invalid fight event: ${result.errors.join('; ')}`);
  return value as FightEvent;
}

/**
 * JSON Schema for the contract, for consumers that cannot import TypeScript — chiefly the
 * Unreal/Unity side, which generates its own structs from this document.
 */
export const FIGHT_EVENT_JSON_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://mma-universe.dev/schemas/fight-event-v1.json',
  title: 'FightEvent',
  description: 'A single machine-readable event in an MMA fight. Describes what happened, never how to render it.',
  type: 'object',
  required: ['schemaVersion', 'fightId', 'sequence', 'round', 'timestamp', 'roundTime', 'timeRemaining', 'position', 'eventType', 'description'],
  properties: {
    schemaVersion: { type: 'integer', const: FIGHT_EVENT_SCHEMA_VERSION },
    fightId: { type: 'string' },
    sequence: { type: 'integer', minimum: 0 },
    round: { type: 'integer', minimum: 1 },
    timestamp: { type: 'number', minimum: 0, description: 'Seconds elapsed in the fight overall.' },
    roundTime: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
    timeRemaining: { type: 'number', minimum: 0 },
    position: { enum: [...FIGHT_POSITIONS] },
    eventType: { enum: [...FIGHT_EVENT_TYPES] },
    description: { type: 'string' },
    attacker: { type: 'string' },
    defender: { type: 'string' },
    fighterId: { type: 'string' },
    technique: { enum: [...STRIKE_TECHNIQUES, ...TAKEDOWN_TECHNIQUES, ...SUBMISSION_TECHNIQUES] },
    target: { enum: [...STRIKE_TARGETS] },
    result: { enum: [...ACTION_RESULTS] },
    outcome: { enum: [...FIGHT_OUTCOMES] },
    damage: { type: ['number', 'object'] },
    staminaCost: { type: 'number' },
    severity: { type: 'number' },
    tightness: { type: 'number', minimum: 0, maximum: 1 },
    fromPosition: { enum: [...FIGHT_POSITIONS] },
    toPosition: { enum: [...FIGHT_POSITIONS] },
  },
  additionalProperties: true,
} as const;
