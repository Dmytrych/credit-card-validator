import pino from 'pino';

export interface ILogger {
    fatal: pino.LogFn;
    error: pino.LogFn;
    warn: pino.LogFn;
    info: pino.LogFn;
    debug: pino.LogFn;
    trace: pino.LogFn;
    silent: pino.LogFn;
}
