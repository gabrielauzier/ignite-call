import { FetchHttpClient } from '@/common/infra/http'
import { makeLoggerService } from '../adapters'

export const makeFetchHttpClient = () =>
  new FetchHttpClient(makeLoggerService())
