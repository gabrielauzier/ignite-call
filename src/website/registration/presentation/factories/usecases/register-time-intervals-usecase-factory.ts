import { makeAxiosHttpClient } from '@/common/presentation/factories/http'
import { RegisterTimeIntervalsUsecase } from '@/website/registration/data/usecases'
import { AbstractRegisterTimeIntervalsUsecase } from '@/website/registration/domain'

export const makeRegisterTimeIntervalsUsecase =
  (): AbstractRegisterTimeIntervalsUsecase =>
    new RegisterTimeIntervalsUsecase(makeAxiosHttpClient())
