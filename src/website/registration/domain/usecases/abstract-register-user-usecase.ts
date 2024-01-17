import { UserModel } from '../models'

export namespace IRegisterUser {
  export interface Params {
    username: string
    name: string
  }
  export interface Result {
    user: UserModel
  }
}

export interface AbstractRegisterUserUsecase {
  execute(params: IRegisterUser.Params): Promise<IRegisterUser.Result>
}
