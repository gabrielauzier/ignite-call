import UpdateProfile from '../../pages/update-profile'
import { makeUpdateProfileUsecase } from '../usecases'

export const makeUpdateProfilePage = () => (
  <UpdateProfile updateProfile={makeUpdateProfileUsecase()} />
)
