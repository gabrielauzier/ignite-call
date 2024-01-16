import { AxiosHttpClient } from '@/common/infra/http'
import { makeLoggerService } from '../adapters'

export const makeAxiosHttpClient = () =>
  new AxiosHttpClient(makeLoggerService())
