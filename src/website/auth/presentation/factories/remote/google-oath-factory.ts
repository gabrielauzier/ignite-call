import { AbstractUserRepository } from '@/website/auth/data/protocols'
import { GoogleOAuthUserRepository } from '@/website/auth/infra/remote'

export const makeGoogleOAuthUserRepository = (): AbstractUserRepository =>
  new GoogleOAuthUserRepository()
