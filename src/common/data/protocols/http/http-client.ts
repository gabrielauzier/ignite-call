export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  serverError = 500,
  serviceUnavailable = 503,
}

export type HttpServerError = {
  name: string
  errorMessage: string
}

export type HttpValidationError = HttpServerError & {
  param: string
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: object | string
  params?: object
  headers?: any
  /** Exclusive for Next native fetch API */
  revalidate?: number
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
