export namespace ILoggerService {
  export type ExtraOptions = {
    extra: any
    ident?: number | undefined
    name?: string | undefined
  }
  export type Levels = 'info' | 'error' | 'warn' | 'debug'
  export type Logger = {
    (msg: string, level: Levels, extra?: ExtraOptions): void
    debug(): void
    info(): void
    warn(): void
    error(): void
  }
  export type Options = {
    quiet: boolean
    timestamp: boolean
    debug: boolean
    isTTY?: boolean
  }
}

export interface AbstractLoggerService {
  info(msg: string, extraOptions?: ILoggerService.ExtraOptions): void
  error(msg: string, extraOptions?: ILoggerService.ExtraOptions): void
  warn(msg: string, extraOptions?: ILoggerService.ExtraOptions): void
  debug(msg: string, extraOptions?: ILoggerService.ExtraOptions): void
}
