export class InvalidParamError extends Error {
  constructor(field: string, value = 'indefinido') {
    super(`O atributo ${field} é inválido: ${value}`)
    this.name = 'InvalidParamError'
  }
}
