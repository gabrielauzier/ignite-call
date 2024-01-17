import Register from '../../pages/register'
import { makeRegisterUserUsecase } from '../usecases'

export const makeRegisterPage = () => (
  <Register register={makeRegisterUserUsecase()} />
)
