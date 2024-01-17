import { AuthenticateUsecase } from '@/website/auth/data/usecases'
import { AbstractSignInUsecase } from '@/website/auth/domain/usecases'
import { makeGoogleOAuthUserRepository } from '../remote'

export const makeUserAuthentication = (): AbstractSignInUsecase =>
  new AuthenticateUsecase(makeGoogleOAuthUserRepository())
