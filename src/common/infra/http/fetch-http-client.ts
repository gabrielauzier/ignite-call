import { RequestInit } from 'next/dist/server/web/spec-extension/request'

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

export class FetchHttpClient implements HttpClient {
  constructor(private readonly logger: AbstractLoggerService) {}

  async request(options: HttpRequest): Promise<HttpResponse> {
    let fetchResponse: Response

    let url = options.url
    if (options.params !== undefined) {
      url += '?' + this.convertObjectToURLSearchParams(options.params)
    }

    try {
      const request: RequestInit = {
        method: options.method,
        body: JSON.stringify(options.body),
        headers: options.headers,
        credentials: 'include',
        next: {
          revalidate: options.revalidate,
        },
      }

      fetchResponse = await fetch(url, request)
    } catch (error: any) {
      fetchResponse = error.response
      this.logger.debug(error, { extra: error, ident: 2 })
      if (fetchResponse === undefined) {
        throw new UnexpectedError()
      }
    }

    switch (fetchResponse.status) {
      case HttpStatusCode.created:
      case HttpStatusCode.ok:
        return {
          statusCode: fetchResponse.status,
          body: await fetchResponse.json(),
        }

      case HttpStatusCode.badRequest: {
        const responseError: HttpServerError = await fetchResponse.json()
        throw new SystemError(responseError.errorMessage)
      }

      case HttpStatusCode.unprocessableEntity: {
        const responseError: HttpValidationError = await fetchResponse.json()
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

  private convertObjectToURLSearchParams(obj: Record<string, any>) {
    const params = new URLSearchParams()

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((value: string, index: number) => {
          params.append(`${key}[${index}]`, value)
        })
      } else {
        params.append(key, obj[key])
      }
    }

    return params.toString().replace(/\+/, '%20')
  }
}
