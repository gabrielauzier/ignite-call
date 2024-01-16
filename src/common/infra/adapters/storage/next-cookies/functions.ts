'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function getCookie(key: string) {
  return cookies().get(key)?.value
}

export async function setCookie(
  key: string,
  value: any,
  options?: Partial<ResponseCookie>,
) {
  cookies().set(key, value, options)
}
