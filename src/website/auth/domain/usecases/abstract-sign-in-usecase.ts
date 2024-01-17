import { UserModel } from '../models'

export namespace ISignIn {
  export interface Params {
    user: string
    password: string
  }
  export interface Result {
    user: UserModel
  }
}

export interface AbstractSignInUsecase {
  execute(params?: ISignIn.Params): Promise<void>
}
