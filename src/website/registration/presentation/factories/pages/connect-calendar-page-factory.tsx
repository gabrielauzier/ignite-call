import { makeUserAuthentication } from '@/website/auth/presentation/factories/usecases/make-user-authentication'
import ConnectCalendar from '../../pages/connect-calendar'

export const makeConnectCalendarPage = () => (
  <ConnectCalendar authenticate={makeUserAuthentication()} />
)
