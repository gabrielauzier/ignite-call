import { logger } from '@/common/util'
import { AbstractSignInUsecase, ISignIn } from '../../domain/usecases'
import { AbstractUserRepository } from '../protocols'

export class AuthenticateUsecase implements AbstractSignInUsecase {
  constructor(private readonly userRepository: AbstractUserRepository) {}

  async execute(params: ISignIn.Params): Promise<void> {
    try {
      logger.info('AuthenticateUsecase: start command')
      await this.userRepository.auth(params)
      logger.info('AuthenticateUsecase: completed successfully')
    } catch (error) {
      logger.error('AuthenticateUsecase: ', { extra: error })
    }
  }
}
