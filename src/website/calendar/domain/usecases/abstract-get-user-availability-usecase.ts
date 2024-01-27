export namespace IGetUserAvailability {
  export type Params = {
    username: string
    date: Date
  }
  export type Result = {
    possibleTimes: number[]
    availableTimes: number[]
  }
}

export interface AbstractGetUserAvailabilityUsecase {
  execute(
    params: IGetUserAvailability.Params,
  ): Promise<IGetUserAvailability.Result>
}
