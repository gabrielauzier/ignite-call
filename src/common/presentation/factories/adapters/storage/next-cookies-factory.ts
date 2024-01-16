import { NextCookiesAdapter } from '@/common/infra/adapters/storage'

export const makeNextCookiesStorageAdapter = () => new NextCookiesAdapter()
