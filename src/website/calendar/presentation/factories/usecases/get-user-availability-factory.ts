import { makeAxiosHttpClient } from '@/common/presentation/factories/http'
import { GetUserAvailabilityUsecase } from '@/website/calendar/data/usecases'
import { AbstractGetUserAvailabilityUsecase } from '@/website/calendar/domain'

export const makeGetUserAvailability = (): AbstractGetUserAvailabilityUsecase =>
  new GetUserAvailabilityUsecase(makeAxiosHttpClient())
