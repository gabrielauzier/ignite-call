import { UserModel } from '@/website/auth/domain/models'
import Schedule from '../../pages/schedule'

export const makeSchedulePage = (user: UserModel) => <Schedule user={user} />
