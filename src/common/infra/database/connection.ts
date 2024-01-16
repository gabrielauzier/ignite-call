import { PrismaDatabaseConnection } from './prisma'

export const database = PrismaDatabaseConnection.getInstance().getConnection()
