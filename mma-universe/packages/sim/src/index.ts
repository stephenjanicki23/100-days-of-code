/** Public surface of the simulation core. Everything here is pure and I/O-free. */

// Core
export { Rng, type SeedPart } from './core/rng.ts';
export * from './core/math.ts';
export * from './core/time.ts';
export * from './core/ids.ts';

// Domain
export * from './domain/attributes.ts';
export * from './domain/personality.ts';
export * from './domain/divisions.ts';
export * from './domain/disciplines.ts';
export * from './domain/archetypes.ts';
export * from './domain/fighter.ts';
export * from './domain/camp.ts';
export * from './domain/promotion.ts';
export * from './domain/health.ts';
export * from './domain/fight.ts';
export * from './domain/event.ts';

// Ability
export * from './ability/facets.ts';
export * from './ability/ability.ts';
export * from './ability/fitting.ts';

// Generation
export * from './generation/names.ts';
export * from './generation/fighter-generator.ts';
export * from './generation/camp-generator.ts';
export * from './generation/venue-generator.ts';
export * from './generation/universe-generator.ts';

// Promotion
export * from './promotion/rankings.ts';
export * from './promotion/titles.ts';
export * from './promotion/matchmaking.ts';
export * from './promotion/scheduling.ts';

// Living world
export * from './world/news.ts';
export * from './world/storylines.ts';

// Development
export * from './development/aging.ts';
export * from './development/training.ts';
export * from './development/injury.ts';

// Fight contract and engine
export * from './fight/events.ts';
export * from './fight/validation.ts';
export * from './fight/plan.ts';
export * from './fight/techniques.ts';
export * from './fight/pacing.ts';
export * from './fight/stamina.ts';
export * from './fight/damage.ts';
export * from './fight/combatant.ts';
export * from './fight/tactics.ts';
export * from './fight/judging.ts';
export * from './fight/engine.ts';

// 3D visualisation abstraction
export * from './viz/animation-map.ts';
export * from './viz/movement-profile.ts';

// Universe
export * from './universe/universe.ts';
export * from './universe/advance.ts';
export * from './universe/fight-application.ts';
export * from './universe/promotion-systems.ts';
