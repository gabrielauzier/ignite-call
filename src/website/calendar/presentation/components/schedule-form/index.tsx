import { makeGetUserAvailability } from '../../factories/usecases'
import { CalendarStep } from '../calendar-step'

export function ScheduleForm() {
  return <CalendarStep getUserAvailability={makeGetUserAvailability()} />
}
