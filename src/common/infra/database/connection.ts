import { PrismaClient } from '@prisma/client'

export class DatabaseConnection {
  private readonly connection: PrismaClient = new PrismaClient({
    log: ['query'],
  })

  public getConnection(): PrismaClient {
    return this.connection
  }
}
