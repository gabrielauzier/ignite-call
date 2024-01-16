import { makeAxiosHttpClient } from '@/common/presentation/factories/http'
import { RegisterUserUsecase } from '@/website/registration/data/usecases'
import { AbstractRegisterUserUsecase } from '@/website/registration/domain'

export const makeRegisterUserUsecase = (): AbstractRegisterUserUsecase =>
  new RegisterUserUsecase(makeAxiosHttpClient())
