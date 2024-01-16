export class ServiceUnavailableError extends Error {
  constructor() {
    super('Serviço indisponível no momento. Tente novamente em breve.')
    this.name = 'ServiceUnavailableError'
  }
}
