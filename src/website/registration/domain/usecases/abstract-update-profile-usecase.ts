export namespace IUpdateProfile {
  export type Params = {
    bio: string
  }
  export type Result = boolean
}

export interface AbstractUpdateProfileUsecase {
  execute(params: IUpdateProfile.Params): Promise<IUpdateProfile.Result>
}
