import { IRegisterUser } from '../usecases'

export interface AbstractUserRepository {
  register(params: IRegisterUser.Params): Promise<IRegisterUser.Result>
}
