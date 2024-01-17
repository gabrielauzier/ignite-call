import { signIn } from 'next-auth/react'

import { AbstractUserRepository } from '../../data/protocols'
import { ISignIn } from '../../domain/usecases'

export class GoogleOAuthUserRepository implements AbstractUserRepository {
  async auth(): Promise<void> {
    await signIn('google', { callbackUrl: '/connect-calendar' })
  }

  async getAuthenticated(): Promise<ISignIn.Result> {
    throw new Error('Method not implemented.')
  }
}
