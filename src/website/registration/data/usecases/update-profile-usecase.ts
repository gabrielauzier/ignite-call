import { logger } from '@/common/util'
import { HttpClient } from '@/common/data/protocols/http'

import { AbstractUpdateProfileUsecase, IUpdateProfile } from '../../domain'

export class UpdateProfileUsecase implements AbstractUpdateProfileUsecase {
  constructor(private readonly httpClient: HttpClient<IUpdateProfile.Result>) {}

  async execute({
    bio,
  }: IUpdateProfile.Params): Promise<IUpdateProfile.Result> {
    try {
      logger.info('UpdateProfileUsecase: start command')
      const apiResponse = await this.httpClient.request({
        url: '/api/users/profile',
        method: 'put',
        body: { bio },
      })

      logger.info('UpdateProfileUsecase: completed')

      return apiResponse.statusCode === 204
    } catch (error) {
      logger.error('UpdateProfileUsecase: ', { extra: error })
      throw error
    }
  }
}
