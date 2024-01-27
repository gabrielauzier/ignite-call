import { HttpClient } from '@/common/data/protocols/http'
import {
  AbstractGetUserAvailabilityUsecase,
  IGetUserAvailability,
} from '../../domain'

import dayjs from 'dayjs'
import { ResponseResolver } from '@/common/util/response-resolver'
import { logger } from '@/common/util'

export class GetUserAvailabilityUsecase
  implements AbstractGetUserAvailabilityUsecase
{
  constructor(private httpClient: HttpClient<IGetUserAvailability.Result>) {}

  async execute({
    username,
    date,
  }: IGetUserAvailability.Params): Promise<IGetUserAvailability.Result> {
    try {
      logger.info('GetUserAvailabilityUsecase: start command', {
        extra: { username, date },
      })
      const apiResponse = await this.httpClient.request({
        url: `/api/users/${username}/availability`,
        method: 'get',
        params: {
          date: dayjs(date).format('YYYY-MM-DD'),
        },
      })

      const result = ResponseResolver.parseBody(apiResponse.body)

      logger.info('GetUserAvailabilityUsecase: completed sucessfully')
      return result
    } catch (error) {
      logger.error('GetUserAvailabilityUsecase: ', { extra: error })
      throw error
    }
  }
}
