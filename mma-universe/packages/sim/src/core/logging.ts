/**
 * Simulation logging (Sprint 1).
 *
 * The engine is pure and must never write to a console — that is enforced by a test — so it
 * cannot own a logger. Instead it accepts one: the CLI, the API or a test supplies an
 * implementation, and the simulation reports through it.
 *
 * The default is a no-op, so logging costs nothing when nobody is listening and the engine
 * still runs unchanged inside a worker or a browser.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  log(level: LogLevel, message: string, context?: Readonly<Record<string, unknown>>): void;
}

export const NOOP_LOGGER: Logger = {
  log: () => {},
};

/** Convenience wrapper so call sites read as `log.info(...)` rather than `log.log('info', ...)`. */
export interface LeveledLogger {
  debug(message: string, context?: Readonly<Record<string, unknown>>): void;
  info(message: string, context?: Readonly<Record<string, unknown>>): void;
  warn(message: string, context?: Readonly<Record<string, unknown>>): void;
  error(message: string, context?: Readonly<Record<string, unknown>>): void;
  child(scope: string): LeveledLogger;
}

export function leveled(logger: Logger = NOOP_LOGGER, scope?: string): LeveledLogger {
  const prefix = scope ? `[${scope}] ` : '';
  const emit = (level: LogLevel) => (message: string, context?: Readonly<Record<string, unknown>>) =>
    logger.log(level, prefix + message, context);
  return {
    debug: emit('debug'),
    info: emit('info'),
    warn: emit('warn'),
    error: emit('error'),
    child: (childScope: string) => leveled(logger, scope ? `${scope}:${childScope}` : childScope),
  };
}
