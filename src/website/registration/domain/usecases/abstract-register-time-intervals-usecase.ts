export namespace IRegisterTimeIntervals {
  export type Params = {
    weekDay: number
    startTimeInMinutes: number
    endTimeInMinutes: number
  }[]
  export type Result = void
}

export interface AbstractRegisterTimeIntervalsUsecase {
  execute(
    params: IRegisterTimeIntervals.Params,
  ): Promise<IRegisterTimeIntervals.Result>
}
