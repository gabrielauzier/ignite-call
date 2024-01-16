import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpServerError,
  HttpStatusCode,
  HttpValidationError,
} from '@/common/data/protocols/http'
import {
  AccessDeniedError,
  SystemError,
  UnexpectedError,
  ValidationError,
} from '@/common/domain/errors'

import { AbstractLoggerService } from '@/common/data/adapters'

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly logger: AbstractLoggerService) {}

  async request(options: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      const request: AxiosRequestConfig = {
        url: options.url,
        method: options.method,
        data: options.body,
        headers: options.headers,
        withCredentials: true,
        timeout: 60 * 1000,
        params: options.params,
      }

      axiosResponse = await axios.request(request)
    } catch (error: any) {
      axiosResponse = error.response
      this.logger.debug(error, { extra: error, ident: 2 })
      if (axiosResponse === undefined) {
        throw new UnexpectedError()
      }
    }

    switch (axiosResponse.status) {
      case HttpStatusCode.created:
      case HttpStatusCode.ok:
        return {
          statusCode: axiosResponse.status,
          body: axiosResponse.data,
        }

      case HttpStatusCode.badRequest: {
        const responseError: HttpServerError = axiosResponse.data
        throw new SystemError(responseError.errorMessage)
      }

      case HttpStatusCode.unprocessableEntity: {
        const responseError: HttpValidationError = axiosResponse.data
        throw new ValidationError(
          responseError.param,
          responseError.errorMessage,
        )
      }

      case HttpStatusCode.unauthorized:
        throw new AccessDeniedError()

      default:
        throw new UnexpectedError()
    }
  }
}
