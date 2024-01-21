import { logger } from '@/common/util'
import { HttpClient } from '@/common/data/protocols/http'

import {
  AbstractRegisterTimeIntervalsUsecase,
  IRegisterTimeIntervals,
} from '../../domain'

export class RegisterTimeIntervalsUsecase
  implements AbstractRegisterTimeIntervalsUsecase
{
  constructor(
    private readonly httpClient: HttpClient<IRegisterTimeIntervals.Result>,
  ) {}

  async execute(
    params: IRegisterTimeIntervals.Params,
  ): Promise<IRegisterTimeIntervals.Result> {
    try {
      logger.info('RegisterTimeIntervalsUsecase: start command', {
        extra: params,
      })
      await this.httpClient.request({
        url: '/api/users/time-intervals',
        method: 'post',
        body: params,
      })

      logger.info('RegisterTimeIntervalsUsecase: completed sucessfully')
    } catch (error) {
      logger.error('RegisterTimeIntervalsUsecase: ', { extra: error })
      throw error
    }
  }
}
