/**
 * The animation test scenes (brief §29).
 *
 * Hand-built directive streams, one per thing worth watching in isolation. They exist because
 * judging movement inside a real fight is hard: three hundred beats go past, and a bad
 * transition is one of them. A scene is short, named, and contains exactly the transition it
 * is testing.
 *
 * These are inputs to the renderer, not to the simulation — the fight engine is not involved
 * and is not supposed to be. That is the same boundary everything else respects: the renderer
 * consumes directives, and it does not care whether a simulation or a test wrote them.
 *
 * `animation-quality.test.ts` walks every scene and asserts the properties that make movement
 * read as human, which means the whole set runs in CI rather than needing a render each time.
 */

import type { AnimationBeatWire, AnimationDirective, FightEventWire } from '../types.ts';

const A = 'scene_fighter_a';
const B = 'scene_fighter_b';

export const SCENE_FIGHTERS = { a: A, b: B } as const;

interface BeatSpec {
  readonly clip: string;
  readonly reaction?: string;
  readonly actor?: string;
  readonly reactor?: string;
  readonly position?: string;
  readonly camera?: string;
  readonly eventType?: string;
  readonly target?: string;
  readonly damage?: number;
  readonly round?: number;
  readonly gap?: number;
  readonly description: string;
}

function beat(index: number, time: number, spec: BeatSpec): AnimationBeatWire {
  const event: FightEventWire = {
    schemaVersion: 1,
    fightId: 'scene',
    sequence: index + 1,
    round: spec.round ?? 1,
    timestamp: time,
    roundTime: '05:00',
    timeRemaining: 300,
    position: spec.position ?? 'STANDING',
    eventType: spec.eventType ?? 'SIGNIFICANT_STRIKE',
    description: spec.description,
    attacker: spec.actor,
    defender: spec.reactor,
    target: spec.target,
    result: 'LANDED',
    damage: spec.damage,
  };
  const directive: AnimationDirective = {
    clip: spec.clip,
    variant: 0,
    targetState: (spec.position ?? 'STANDING') as AnimationDirective['targetState'],
    camera: (spec.camera ?? 'BROADCAST') as AnimationDirective['camera'],
    reaction: (spec.reaction ?? 'NONE') as AnimationDirective['reaction'],
    speed: 1,
    triggersReplay: false,
    actorId: spec.actor,
    reactorId: spec.reactor,
  };
  return { event, directive };
}

function stream(specs: readonly BeatSpec[]): AnimationBeatWire[] {
  let time = 0;
  return specs.map((spec, index) => {
    const entry = beat(index, time, spec);
    time += spec.gap ?? 1.2;
    return entry;
  });
}

const idle = (description = 'Circling.'): BeatSpec => ({ clip: 'stance_idle', eventType: 'ROUND_START', description });

export const SCENES: Readonly<Record<string, readonly BeatSpec[]>> = {
  /** 1 — nothing happens, twice, with movement in between. The quality bar of §30. */
  'idle-move-idle': [idle('Both circling.'), idle('Still circling.'), idle('Resetting.'), idle('Circling again.')],

  /** 2 — the simplest complete action: leave the stance, throw, come back to it. */
  'jab-recovery': [
    idle(),
    { clip: 'strike_jab', actor: A, reactor: B, reaction: 'LIGHT', target: 'HEAD', damage: 1.4, description: 'Jab.' },
    idle('Back to the stance.'),
  ],

  /** 3 — a combination, which should flow rather than reset between the two. */
  'cross-hook': [
    idle(),
    { clip: 'strike_cross', actor: A, reactor: B, reaction: 'LIGHT', target: 'HEAD', damage: 1.6, gap: 0.35, description: 'Cross.' },
    { clip: 'strike_hook_left', actor: A, reactor: B, reaction: 'HEAVY', target: 'HEAD', damage: 2.3, description: 'Hook behind it.' },
    idle('Resets.'),
  ],

  /** 4 — the legs are claimed outright, then handed back to the footwork. */
  'low-kick': [
    idle(),
    { clip: 'kick_low', actor: A, reactor: B, reaction: 'LEG_BUCKLE', target: 'LEG', damage: 1.4, description: 'Low kick.' },
    idle('Stance recovers.'),
  ],

  /** 5 — the receiving end, which is a different animation problem from throwing. */
  'take-a-shot': [
    idle(),
    { clip: 'strike_cross', actor: B, reactor: A, reaction: 'HEAVY', target: 'HEAD', damage: 2.4, description: 'Caught clean.' },
    idle('Gathers himself.'),
  ],

  /** 6 — a total takeover: the whole body goes to the canvas and stays there. */
  'takedown': [
    idle(),
    { clip: 'td_double_leg', actor: A, reactor: B, position: 'GROUND_TOP', eventType: 'TAKEDOWN', gap: 1.6, description: 'Double leg.' },
    { clip: 'ground_punch', actor: A, reactor: B, position: 'GROUND_TOP', reaction: 'LIGHT', damage: 1.3, description: 'Ground and pound.' },
  ],

  /** 7 — hurt, then still hurt, which is the condition the stagger value carries. */
  'stagger-recovery': [
    idle(),
    { clip: 'strike_overhand', actor: B, reactor: A, reaction: 'STAGGER', target: 'HEAD', damage: 2.5, eventType: 'STUN', gap: 2.2, description: 'Badly hurt.' },
    idle('Still on unsteady legs.'),
    idle('Coming back to himself.'),
  ],

  /** 8 — the end of the chain: impact, stagger, loss of balance, floor. */
  'knockdown': [
    idle(),
    { clip: 'knockdown', actor: B, reactor: A, reaction: 'DROP', target: 'HEAD', damage: 2.5, eventType: 'KNOCKDOWN', position: 'STUNNED', gap: 2, description: 'Down he goes.' },
    { clip: 'stance_idle', position: 'RECOVERY', eventType: 'REFEREE_ACTION', description: 'The referee moves in.' },
  ],

  /** 9 — the same beats late in a fight, where everything should look heavier. */
  'fatigue': [
    { ...idle('Round five.'), round: 5 },
    { clip: 'strike_jab', actor: A, reactor: B, reaction: 'LIGHT', target: 'HEAD', damage: 1.3, round: 5, description: 'A tired jab.' },
    { ...idle('Hands low.'), round: 5 },
  ],

  /** 10 — where a strike lands changing what the body does. */
  'damage-regions': [
    idle(),
    { clip: 'strike_cross', actor: A, reactor: B, reaction: 'HEAVY', target: 'HEAD', damage: 2.4, description: 'To the head.' },
    { clip: 'kick_body', actor: A, reactor: B, reaction: 'BODY_FOLD', target: 'BODY', damage: 2, description: 'To the body.' },
    { clip: 'kick_low', actor: A, reactor: B, reaction: 'LEG_BUCKLE', target: 'LEG', damage: 1.5, description: 'To the leg.' },
    idle(),
  ],
};

export const SCENE_NAMES = Object.keys(SCENES);

export function buildScene(name: string): AnimationBeatWire[] {
  const specs = SCENES[name];
  if (!specs) throw new Error(`unknown scene: ${name}`);
  return stream(specs);
}
