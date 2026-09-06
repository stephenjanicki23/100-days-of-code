# Phased Roadmap

Status legend: **✅ shipped** · **🟡 contract shipped, engine pending** · **⬜ designed, not built**

| Phase | Scope | Status |
|---|---|---|
| 1 — Foundation | Divisions, disciplines, attributes, personality, archetypes, ability model, procedural generation, persistence, API, UI | ✅ |
| 2 — Development | Training, camp bonuses, aging, potential, fatigue, injuries, weekly tick | ✅ |
| 3 — Fight engine | Fight states, striking/wrestling/grappling exchanges, damage, stamina, judges, outcomes | 🟡 event contract + damage/stamina/outcome types shipped |
| 4 — Promotion | Rankings, champions, contracts, matchmaking, events, fight cards | 🟡 schema + division/ranking tables shipped |
| 5 — Living universe | News, storylines, camp evolution, rivalries, retirements, fighter movement | 🟡 camp evolution + movement scoring shipped; news/storylines designed |
| 6 — Live Fight Center | Detailed play-by-play UI, live stats, WebSockets | ⬜ |
| 7 — 3D visualisation | Event→animation abstraction, prebuilt clip registry, Unreal/Unity integration | 🟡 abstraction + mapping registry shipped |

## Phase 1 — Foundation ✅

- Deterministic splittable RNG (`sfc32` + `cyrb128` address hashing).
- 12 divisions (8 men's, 4 women's), data-driven and extensible.
- 25 disciplines, each declaring the attributes it develops and with what weight.
- 44 visible attributes in 5 groups, plus 11 hidden personality traits.
- Hidden Current Ability / Potential Ability (0–200) derived from attributes.
- 15 archetypes as weight profiles; style is *derived*, never stored.
- Procedural generation of fighters, coaches, camps, promotions and a full universe.
- SQLite schema with foreign keys and migrations; typed repositories.
- REST API and React UI over the read model.
- CLI: `generate`, `advance`, `show`.

## Phase 2 — Development ✅

- Weekly training tick with 5 intensities (recovery → extreme).
- Multiplicative development pipeline (§6.2 of ARCHITECTURE.md).
- Camp specialisation multipliers resolved through disciplines.
- Age curves that differ per attribute class — physicals decline, mental attributes keep rising.
- Fatigue accumulation and recovery; injury generation, severity and rehabilitation.
- Append-only development history for every attribute change.

## Phase 3 — Fight engine (next)

The contract is already fixed (`packages/sim/src/fight/events.ts`), so the engine can be built
without touching any consumer. Order of work:

1. Fight state machine over the 15 positions.
2. Exchange resolution: strike selection → defence → outcome, weighted by attributes, style tendencies, position and stamina.
3. Damage accumulation by body region, feeding back into behaviour.
4. Stamina: burst pool + long-term cardio, with fatigue penalties to speed/power/accuracy/defence.
5. Corner strategy between rounds (§14) mutating fighter behaviour weights.
6. Independent judges (§19), each with their own scoring bias, producing per-round scorecards.
7. Outcome resolution: KO/TKO/submission/decision variants/doctor stoppage/DQ/NC.

## Phase 4 — Promotion

Rankings weighted by opponent quality, method, dominance, recency and activity — not raw record.
Matchmaking over a candidate pool scored on ranking proximity, streak, popularity, availability,
rivalry and rematch value. Card assembly into main event / co-main / prelims. Contract
negotiation driven by popularity and reputation.

## Phase 5 — Living universe

Camp evolution and collapse; fighter movement between camps; retirements; and the news and
storyline engines, which read the domain event stream produced by the tick loop rather than
inventing events of their own (§26).

## Phase 6 — Live Fight Center

WebSocket broadcast of the fight-event stream at simulated pace, with live play-by-play,
statistics, damage, stamina and momentum panels.

## Phase 7 — 3D visualisation

The `AnimationMapper` and clip registry live in `packages/sim/src/viz`. The renderer that
consumes them is `apps/web/src/three`: a three.js viewer reading
`/fights/:id/events?format=animation` over HTTP and nothing else, with the fighters built from
primitives and 56 clips authored as keyframe data rather than downloaded as assets. See
`docs/ARCHITECTURE.md` §8.1 for why the reference renderer is a browser one and what that costs.

Remaining: the live-feed parser of §18, which converts external play-by-play text into the same
event objects, and — if wanted — an Unreal or Unity client, which would be a second consumer of
the identical JSON contract rather than a change to anything upstream of it.
