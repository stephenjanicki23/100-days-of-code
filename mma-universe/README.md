# MMA Universe

A deep, persistent, **deterministic** MMA world simulation — Football Manager's underlying
machinery applied to mixed martial arts, with an event stream designed from the start to drive
a real-time 3D fight viewer.

Fighters are generated with hidden potential and personalities, develop (or fail to develop)
week by week according to their camp, their age, their temperament and their luck with injuries,
move between gyms, decline, and retire. Camps rise and fall with the fighters in them. The whole
world is reproducible from a single seed.

```
mma generate --seed 8347291       # 600+ fighters, 54 camps, 6 promotions, 12 divisions
mma advance --years 1             # every fighter trains, ages, gets hurt, and gets better or worse
mma show rankings m_lightweight   # a division that means something
```

## What is built

| Phase | | |
|---|---|---|
| 1 | Foundation — attributes, ability model, procedural generation, persistence, API, UI | ✅ |
| 2 | Development — training, camp bonuses, aging, fatigue, injuries | ✅ |
| 3 | Fight engine | event contract shipped, engine next |
| 4 | Promotion — matchmaking, cards, contracts | schema + rankings shipped |
| 5 | Living universe — news, storylines | camp evolution + fighter movement shipped |
| 6 | Live Fight Center | designed |
| 7 | 3D visualisation | abstraction + clip registry shipped |

See [docs/ROADMAP.md](docs/ROADMAP.md) for detail and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
for the design and the reasoning behind it.

## Quick start

```bash
npm install

# Create a world and run it forward
npm run generate -- --seed 8347291
npm run advance  -- --years 1

# Look around
npm run show -- rankings m_lightweight
npm run show -- fighter "Sadulaev"
npm run show -- camps
npm run show -- news

# Or use the interface
npm run api      # http://localhost:4000
npm run web      # http://localhost:5173
```

`npm test` runs the simulation test suite; `npm run typecheck` type-checks every package.

## Layout

```
packages/sim     the simulation core — pure, deterministic, zero dependencies, no I/O
packages/data    SQLite schema, migrations and typed repositories
apps/api         Fastify REST + WebSocket over a persisted universe
apps/web         React management interface
apps/cli         generate / advance / show
```

Dependencies point downward only. `packages/sim` imports nothing from the other packages, never
touches the filesystem, never reads the clock, and never calls `Math.random` — invariants a test
enforces mechanically, because they are what make the world reproducible.

## The three ideas the design rests on

**Randomness is addressed, not sequential.** Every stream is derived from
`(seed, subsystem, entity, tick)` rather than drawn from one shared generator, so simulating
fighter B before fighter A changes nothing, adding a new subsystem perturbs no existing one, and
a single training week or fight can be replayed exactly in isolation. Advancing 180 days in one
step and in 180 steps produces byte-identical worlds — there is a test for it.

**Nothing is stored twice.** Current Ability is *projected* from a fighter's visible attributes,
and fighting style is *projected* from them too. A wrestler whose takedowns erode through their
thirties becomes a pressure boxer on their own, with nothing reassigning them.

**Camps influence development multiplicatively.** A camp specialisation resolves through its
discipline to the specific attributes that discipline trains, and multiplies the growth rate of
exactly those. The brief's worked example — a 0.40 base gain through a camp with a 1.10 wrestling
bonus giving 0.44 — is literally what the code does, and a test pins it.

## Fight events and the 3D layer

The fight engine is Phase 3, but its output contract already exists and is versioned, validated
and published as JSON Schema at `/schema/fight-event`. Events describe **what happened** and never
how to draw it:

```json
{
  "eventType": "SIGNIFICANT_STRIKE",
  "technique": "RIGHT_CROSS",
  "target": "HEAD",
  "result": "LANDED",
  "position": "STANDING",
  "damage": 7
}
```

A separate mapping layer turns each event into an `AnimationDirective` naming a **prebuilt** clip,
the state transition it implies, a camera hint and a hit reaction — never a generated animation.
Variants are selected from the event's sequence number, so repeated jabs look different but a
replay looks the same every time. That is the whole seam between the simulation and Unreal or
Unity, and it is testable without a game engine.

## A note on the setting

The promotions, camps, coaches and fighters in this universe are invented for this project. No
real organisation, gym or fighter is represented, and no real-world intellectual property is used.
