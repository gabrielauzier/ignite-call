/* eslint-disable no-use-before-define */
import { PrismaClient } from '@prisma/client'

export class PrismaDatabaseConnection {
  private static instancia: PrismaDatabaseConnection
  private readonly connection: PrismaClient

  private constructor() {
    this.connection = new PrismaClient({
      log: ['query'],
    })
  }

  public static getInstance(): PrismaDatabaseConnection {
    if (!PrismaDatabaseConnection.instancia) {
      PrismaDatabaseConnection.instancia = new PrismaDatabaseConnection()
    }

    return PrismaDatabaseConnection.instancia
  }

  public getConnection(): PrismaClient {
    return this.connection
  }
}
