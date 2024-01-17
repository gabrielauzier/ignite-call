import { ValidationError } from './validation-error'

export class RequiredParamError extends ValidationError {
  constructor(param: string, message = 'Campo obrigatório.') {
    super(param, message)
  }
}
