# MMA Universe — Technical Architecture

> Football Manager + a persistent combat-sports world + an event-driven 3D fight viewer.

This document is the design deliverable requested in §39 of the project brief. It covers
requirement analysis, the technology stack, the layering rules, the determinism model, the
database schema, the simulation architecture, the fight-event contract, the camp/development
system, and the 3D visualisation abstraction.

---

## 1. Requirement analysis — what actually constrains the design

Most of the brief is feature surface. Only a handful of requirements genuinely constrain
architecture, and every other decision follows from them:

| Constraint | Source | Architectural consequence |
|---|---|---|
| The same seed must reproduce the same universe | §31 | No ambient randomness anywhere. RNG is a *derived stream*, not a shared mutable generator. |
| Fight engine must not be coupled to the frontend | §1 | The engine emits data; nothing in the engine may import a renderer, a socket, or a DB handle. |
| 1,000+ fighters, many simulated years | §32 | Ticks must be O(entities), not O(entities²). Matchmaking and rankings are event-driven, not recomputed per day. |
| Camps must influence development *multiplicatively* | §8 | Development is a growth-rate pipeline of multipliers, never a flat attribute add. |
| Styles must *emerge* from attributes | §6 | Style is a derived projection of attributes, never a stored cosmetic label. |
| Play-by-play must drive 3D later | §16–17 | The event stream is a versioned public contract with machine-readable fields, designed before any renderer exists. |
| Relational integrity, no giant JSON blob | §28 | Normalised SQL schema; JSON only for genuinely schemaless leaf data. |

The single most important of these is **determinism**, because it is the one property that
cannot be retrofitted. Everything else can be added later; a simulation that was written
against a shared mutable RNG can never be made reproducible without a rewrite.

---

## 2. Technology stack

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript 5, `strict` + `noUncheckedIndexedAccess` | One language across engine, API and UI; the domain is heavily typed (attributes, enums, event unions) and discriminated unions model fight events precisely. |
| Runtime | Node.js 22 | Native test-adjacent tooling, stable ESM, good numeric throughput for a tick loop. |
| Monorepo | npm workspaces | No extra toolchain. Package boundaries are enforced by dependency direction (§3). |
| Simulation | Pure TS, zero dependencies | The engine must run in Node, in a test, in a worker, or in a browser. Zero I/O imports is a lint-able invariant. |
| Persistence | SQLite via `better-sqlite3` | Synchronous, transactional, single-file, embeds in the CLI and the API. A universe is a file you can copy, diff and ship. Postgres is a drop-in later (§9). |
| Schema/validation | Zod | One source of truth for the fight-event contract: TS types *and* runtime validation *and* JSON Schema for non-TS consumers (Unreal/Unity). |
| API | Fastify + `@fastify/websocket` | Lowest-overhead Node HTTP server; WS for the live fight feed in Phase 6. |
| Frontend | React 18 + Vite | Fast dev loop; the UI is a pure read model over the API. Data fetching is a ~60-line hook rather than a caching library — the UI needs request deduplication and one global invalidation after the simulation advances, and nothing more. |
| Tests | Vitest | Fast, TS-native, snapshot support for determinism goldens. |

**Rejected alternatives, briefly:** Python for the engine (loses type sharing with the UI and
forces a serialisation boundary in the hot loop); an ORM such as Prisma (the schema is
write-once and read-heavy; hand-written SQL with typed repositories is faster and avoids a
codegen step); a document store (the brief explicitly forbids it, and rankings/matchmaking are
inherently relational queries).

---

## 3. Layering and dependency direction

```
                 ┌─────────────────────────────────────────┐
                 │  apps/web      (React read-model UI)     │
                 └───────────────────┬─────────────────────┘
                                     │ HTTP / WS
                 ┌───────────────────▼─────────────────────┐
                 │  apps/api      (Fastify: REST + WS)      │
                 └───────┬─────────────────────┬───────────┘
                         │                     │
        ┌────────────────▼──────────┐  ┌───────▼───────────────────┐
        │  packages/data            │  │  apps/cli                 │
        │  SQLite schema, migrations│  │  generate / advance / show │
        │  repositories (row↔domain)│  └───────┬───────────────────┘
        └────────────────┬──────────┘          │
                         │                     │
                 ┌───────▼─────────────────────▼───────────┐
                 │  packages/sim   PURE. No I/O. No deps.   │
                 │  rng · domain · ability · generation ·   │
                 │  development · fight contract · viz map  │
                 └──────────────────────────────────────────┘
```

**The rule:** dependencies point downward only. `packages/sim` imports nothing from `data`,
`api`, `web` or `cli`, and performs no I/O — no `fs`, no `Date.now()`, no `Math.random()`.
This is what makes the engine testable, deterministic, portable to a browser or worker, and
independently runnable as §1 requires.

Time and randomness enter the engine as **explicit parameters**. A tick receives the current
simulated date; a system receives an `Rng` derived from the universe seed. There is no other
source of nondeterminism.

---

## 4. Determinism model

A naive design uses one global `Rng` seeded once. That reproduces only while nothing changes:
insert one new subsystem, or iterate a map in a different order, and every downstream draw
shifts. That is unusable for debugging a world with thousands of fights.

Instead the design uses a **splittable, address-derived RNG**:

```
stream = sfc32( cyrb128( universeSeed ‖ domain ‖ entityId ‖ tick ) )
```

Any subsystem can derive its own independent stream from a stable *address* rather than from
call order:

```ts
const rng = universe.rngFor('training', fighter.id, tick);
```

Properties this buys:

- **Order independence.** Simulating fighter B before fighter A yields identical results.
- **Insertion safety.** Adding a new system does not perturb existing ones — it uses a new domain tag.
- **Replayability.** Any single fight or training week can be re-run in isolation, exactly, without replaying the whole universe.
- **Parallelism-ready.** Independent streams mean per-fighter work can be sharded later without changing results.

`Math.random` is banned in `packages/sim` and the ban is enforced by a test that greps the
built sources.

---

## 5. Simulation architecture

### 5.1 The tick loop

The universe advances in **daily ticks**, with systems subscribing to the cadence they need.
The user-facing speeds of §30 (day / week / month / year) are just tick counts.

```
advance(days) ─┬─ for each day:
               │    ├─ DailySystems   : injury recovery, contract expiry, fight bookings coming due
               │    ├─ WeeklySystems  : training + development, fatigue, camp evolution   (on day % 7)
               │    └─ MonthlySystems : matchmaking, event booking, rankings decay, aging  (on month roll)
               └─ emit domain events → news/storyline engines → persistence
```

Systems are **pure functions over a slice of state**:
`(state, context, rng) → { patches, events }`. They never write to the database directly.
The runner applies patches and persists in a single transaction per tick batch. This keeps
systems unit-testable with no database at all, and makes the whole advance atomic.

### 5.2 Performance shape (§32)

- Per-day work is O(active fighters) with a small constant; there is no all-pairs computation anywhere in the tick.
- Rankings are **incrementally updated** on fight-result events, not recomputed by scanning history.
- Matchmaking runs monthly over a *candidate pool* narrowed by division + availability index, not over the full roster.
- Fight history is append-only and never re-read during a tick; the hot path touches only current state.
- Play-by-play events are written once, then treated as cold storage read only by the Fight Center.

### 5.3 Ability model (§4)

Each fighter carries hidden **Current Ability (0–200)** and **Potential Ability (0–200)**.

`CurrentAbility` is *derived*, not stored independently: it is a weighted projection of the
visible 0–100 attributes, weighted by how much each attribute contributes to winning fights.
This means CA cannot drift out of sync with attributes — a class of bug that plagues designs
where both are stored.

Generation runs the projection in reverse: pick PA from a talent distribution, pick CA from PA
given age and experience, then distribute attribute points under an archetype's weight profile
until the projection reproduces the target CA (iterative scaling, converges in a few passes).

Development is gated by **headroom** `1 − CA/PA`: growth slows asymptotically as a fighter
approaches their ceiling, so high potential is an *opportunity*, never a guarantee — poor
training, injuries, age, low discipline or a weak camp all suppress the realised fraction (§4).

### 5.4 Emergent style (§6)

Archetypes are **weight profiles over attributes plus behavioural tendencies**, not labels.
Generation uses an archetype to *shape* the attribute distribution; the displayed style is
always recomputed by scoring the fighter's current attributes against every archetype profile
and taking the best two (primary + secondary), with the largest positive and negative
deviations reported as strength and weakness. A fighter whose wrestling erodes with age will
therefore *become* a different style over their career without anything reassigning them.

---

## 6. Camp and development system (§7–§12)

This is the system the brief singles out, so it is modelled explicitly rather than as a bonus table.

### 6.1 Disciplines as the join between camps and attributes

A **discipline** (Boxing, Freestyle Wrestling, BJJ, …) declares which attributes it develops
and with what weight. A **camp specialisation** references a discipline and a multiplier.
Therefore "+10% wrestling development" resolves, with no special-casing, to a growth multiplier
on exactly the attributes wrestling trains.

```
Camp specialisation → Discipline → weighted attribute set → growth multiplier
```

### 6.2 The development pipeline (multiplicative, never additive)

Weekly, per fighter, per attribute:

```
gain = BASE_WEEKLY_GAIN
     × ageCurve(age, attribute.agingClass)     // young grow, old decline
     × headroom(CA, PA)                        // asymptote at potential
     × intensity(trainingIntensity)            // recovery … extreme
     × campQuality(facilities, coaching, science)
     × campSpecialisation(attribute, camp)     // §8, e.g. 1.10 wrestling
     × coachBonus(headCoach, specialists)
     × personality(workEthic, discipline, coachability, ambition)
     × conditionPenalty(fatigue, injuries)
     × focus(fighter's own training focus)
     × noise(rng)                              // deterministic, per fighter/week
```

Worked example from §8: `0.40 base × 1.10 camp wrestling = 0.44`. The brief's arithmetic is the
system's actual behaviour, and there is a test asserting exactly that.

### 6.3 Camp evolution and the feedback loop (§9)

Camp reputation is a slow-moving EMA driven by its fighters' results, title runs and rankings.
Reputation gates recruitment quality, which gates future results — the positive loop of §9.
The loop is deliberately **dampened and reversible**: reputation decays without results, coaches
leave for better offers, and a camp that loses its head coach and its ranked fighters can
collapse and lose specialisation tiers. Without the damping, one lucky camp wins the world.

### 6.4 Fighter movement (§10)

Movement is a *scored decision*, never a coin flip. A fighter periodically evaluates their
situation (recent results, coach departures, facility gap, money, career stage) and weighs it
against loyalty, ambition and risk tolerance. Only when dissatisfaction exceeds a
personality-derived threshold do they enter the market, and camps then bid based on reputation
fit. This is what stops the roster from shuffling randomly.

---

## 7. Fight-event contract (§15, §17, §18)

The event stream is the **public contract** between the fight engine, the frontend, and the 3D
renderer. It is versioned (`schemaVersion`), validated by Zod, and exportable as JSON Schema for
Unreal/Unity consumers.

Every event carries: identity (`fightId`, `sequence`), clock (`round`, `roundTime`,
`timeRemaining`), participants (`attacker`, `defender`), the fight state (`position`), a
discriminated `eventType` payload, and a human-readable `description` for the play-by-play feed.

```jsonc
{
  "schemaVersion": 1,
  "fightId": "fight_10482",
  "sequence": 137,
  "round": 2,
  "roundTime": "02:17",
  "timeRemaining": 163,
  "attacker": "fighter_182",
  "defender": "fighter_421",
  "eventType": "SIGNIFICANT_STRIKE",
  "technique": "RIGHT_CROSS",
  "target": "HEAD",
  "result": "LANDED",
  "position": "STANDING",
  "damage": 7,
  "staminaCost": 4,
  "description": "Vale lands a clean right cross to the head."
}
```

**The contract's discipline:** events describe *what happened*, never *how to draw it*. No
camera, animation, or timing field ever enters the schema. That separation is what lets the same
stream feed a text play-by-play, a stats panel, a 3D renderer, and — via §18 — a parser for real
live-fight data.

Because the schema is the boundary, the ingestion path of §18 is a *mapping problem, not a new
pipeline*: an external feed's text is parsed into the same event objects, and everything
downstream is unchanged.

---

## 8. 3D visualisation abstraction (§16–§17)

The renderer is a **consumer**, not a participant. The brief's key constraint — never generate a
new animation per event — is enforced by making the mapping declarative:

```
FightEvent ──▶ AnimationMapper ──▶ AnimationDirective ──▶ engine-native playback
 (what)          (registry)          (clip + state + camera + reaction)
```

An `AnimationDirective` names a **prebuilt clip**, the state-machine transition it implies, a
camera hint, and a hit reaction — all selected from a static registry keyed by
`(eventType, technique, result, position)`, with deterministic variant selection so repeated
jabs do not look identical. Unknown or future event types resolve to a documented fallback clip
rather than failing, so the renderer never has to be redeployed in lockstep with the engine.

The mapping registry lives in `packages/sim/src/viz` because it is pure data and must be
testable without a game engine. Unreal/Unity consume it over the wire as JSON; the engine-side
work is then only clip playback and blending.

---

## 9. Database design (§28)

SQLite now, Postgres-compatible SQL. Every core entity from the brief is a table with real
foreign keys; JSON columns are used only for genuinely open-ended leaf data (attribute maps,
event payload extras) and never for anything that is queried or joined.

```
promotion ─< division ─< ranking_entry >─ fighter
                          │
camp ─< coach             │
  │                       │
  └─< fighter >─ contract ┤
        │                 │
        ├─< injury        │
        ├─< training_session
        ├─< fighter_development   (append-only attribute history)
        ├─< fighter_memory        (opponent history, §22)
        │
event (fight card) ─< fight >─ fight_event   (play-by-play, append-only)
        │               │
      venue          scorecard
news_article  storyline  sponsor
```

Design rules:
1. **Append-only history** (`fight_event`, `fighter_development`, `news_article`) is never mutated — it is the audit trail that makes a deterministic replay verifiable.
2. **Current state is narrow**; history is wide. The tick loop touches only current state.
3. Indices exist for the actual access paths: rankings by division, fights by event, events by fighter, play-by-play by fight+sequence.
4. Schema changes go through numbered, idempotent migrations — a universe file created today must still open next month.

---

## 10. Minimum viable implementation

The smallest thing that is genuinely *alive* rather than a database with a UI:

1. A seeded universe of 500+ fighters across 50+ camps and 12 divisions, with believable talent, age and record distributions.
2. Fighters who develop week over week according to camp, age, potential and personality — and who can stagnate or decline.
3. Reproducibility: same seed ⇒ byte-identical universe, provable by test.
4. A read-model UI that makes the world legible: rankings, fighter profiles with hidden-vs-visible ability, camps and their specialisations.

Phases 1 and 2 deliver exactly this. See [ROADMAP.md](./ROADMAP.md) for the phase breakdown and
current status.
