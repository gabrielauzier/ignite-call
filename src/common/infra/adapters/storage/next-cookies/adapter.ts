import { AbstractAppStorage } from '@/common/data/adapters'

import { getCookie, setCookie } from './functions'

export class NextCookiesAdapter implements AbstractAppStorage {
  public async get(key: string): Promise<string | undefined> {
    return await getCookie(key)
  }

  async set(key: string, value: string): Promise<void> {
    const time = 6 * 60 * 60 * 1000 /* 4 hours */
    await setCookie(key, value, { expires: Date.now() + time })
  }

  remove(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
