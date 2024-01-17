/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */

import { AbstractLoggerService, ILoggerService } from '@/common/data/adapters'
import util from 'util'

const colors = {
  info: '36',
  error: '31;1',
  warn: '33',
  debug: '90',
}

export class LoggerService implements AbstractLoggerService {
  logger: ILoggerService.Logger

  constructor(options: ILoggerService.Options) {
    this.logger = LoggerService.makeLog(options)
  }

  info(msg: string, extra?: ILoggerService.ExtraOptions): void {
    this.logger(msg, 'info', extra)
  }

  error(msg: string, extra?: ILoggerService.ExtraOptions): void {
    this.logger(msg, 'error', extra)
  }

  warn(msg: string, extra?: ILoggerService.ExtraOptions): void {
    this.logger(msg, 'warn', extra)
  }

  debug(msg: string, extra?: ILoggerService.ExtraOptions): void {
    this.logger(msg, 'debug', extra)
  }

  private static makeLog({
    isTTY = false,
    ...config
  }: ILoggerService.Options): ILoggerService.Logger {
    function log(
      msg: string,
      level: keyof typeof colors,
      extra?: {
        extra: object
        ident?: number
        name?: string
      },
    ) {
      const c = colors[level] || '32'
      const label = '[' + colorized(level.toUpperCase(), c) + '] '

      if (!config.debug && level === 'debug') return
      if (config.quiet && level === 'info') return
      if (config.timestamp)
        msg = colorized(formatDate(new Date()), '30;1') + ' ' + msg
      if (extra) {
        msg +=
          `\n${extra.name ?? ''} ` +
          JSON.stringify(extra.extra, null, extra.ident)
      }
      console.log(label + msg)
    }

    function colorized(s: string, c: string) {
      if (isTTY) return '\x1B[' + c + 'm' + s + '\x1B[0m'
      return s
    }

    log.debug = function () {
      log(util.format.apply(util), 'debug')
    }
    log.info = function () {
      log(util.format.apply(util), 'info')
    }
    log.warn = function () {
      log(util.format.apply(util), 'warn')
    }
    log.error = function () {
      log(util.format.apply(util), 'error')
    }

    return log
  }
}

export const formatDate = function (date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const dateFormatted = `${year}-${month}-${day}`

  const time = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(function (n) {
      return n.toString().padStart(2, '0')
    })
    .join(':')
    .concat('.')
    .concat(date.getMilliseconds().toString())

  return dateFormatted + 'T' + time
}
