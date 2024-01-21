import { makeAxiosHttpClient } from '@/common/presentation/factories/http'
import { UpdateProfileUsecase } from '@/website/registration/data/usecases'
import { AbstractUpdateProfileUsecase } from '@/website/registration/domain'

export const makeUpdateProfileUsecase = (): AbstractUpdateProfileUsecase =>
  new UpdateProfileUsecase(makeAxiosHttpClient())
