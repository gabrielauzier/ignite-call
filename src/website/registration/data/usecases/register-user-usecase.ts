import { logger } from '@/common/util'
import { HttpClient } from '@/common/data/protocols/http'

import { AbstractRegisterUserUsecase, IRegisterUser } from '../../domain'
import { ResponseResolver } from '@/common/util/response-resolver'

export class RegisterUserUsecase implements AbstractRegisterUserUsecase {
  constructor(private readonly httpClient: HttpClient<IRegisterUser.Result>) {}

  async execute(params: IRegisterUser.Params): Promise<IRegisterUser.Result> {
    try {
      logger.info('RegisterUserUsecase: start command', { extra: params })
      const apiResponse = await this.httpClient.request({
        url: '/api/users',
        method: 'post',
        body: params,
      })

      const result = ResponseResolver.parseBody(apiResponse.body)

      logger.info('RegisterUserUsecase: completed sucessfully')
      return result
    } catch (error) {
      logger.error('RegisterUserUsecase: ', { extra: error })
      throw error
    }
  }
}
