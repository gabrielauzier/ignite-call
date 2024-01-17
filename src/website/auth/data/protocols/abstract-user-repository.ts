import { ISignIn } from '../../domain/usecases'

export interface AbstractUserRepository {
  auth(params: ISignIn.Params): Promise<void>
  getAuthenticated(): Promise<ISignIn.Result>
}
