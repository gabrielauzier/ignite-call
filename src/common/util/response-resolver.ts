export class ResponseResolver {
  public static parseBody<T extends Record<string, any>>(body?: Partial<T>): T {
    if (!body) throw new Error(`Response body undefined error. `)

    const undefinedProps = Object.keys(body).filter(
      (key) => body[key] === undefined,
    )

    if (undefinedProps.length > 0) {
      const undefinedPropsList = undefinedProps.join(', ')
      throw new Error(
        `Propriedades undefined encontradas: ${undefinedPropsList}`,
      )
    }

    return body as T
  }
}
