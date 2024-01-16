export class NoContentError extends Error {
  constructor() {
    super('Conteúdo vazio.')
    this.name = 'NoContentError'
  }
}
