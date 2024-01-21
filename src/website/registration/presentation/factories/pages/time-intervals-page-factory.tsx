import TimeIntervals from '../../pages/time-intervals'
import { makeRegisterTimeIntervalsUsecase } from '../usecases'

export const makeTimeIntervalsPage = () => (
  <TimeIntervals registerTimeIntervals={makeRegisterTimeIntervalsUsecase()} />
)
