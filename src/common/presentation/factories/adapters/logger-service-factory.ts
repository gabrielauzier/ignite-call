import { LoggerService } from '@/common/infra/adapters/logger'

export const makeLoggerService = () =>
  new LoggerService({
    debug: true,
    quiet: false,
    timestamp: true,
    isTTY: true,
  })
