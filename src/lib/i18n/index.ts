import { cookies, headers } from 'next/headers'
import id from './id'
import en from './en'
import type { Lang } from './client'
import { t } from './client'

export type { Lang }
export { t }
export { default as idDict } from './id'
export { default as enDict } from './en'

const DICTS: Record<Lang, unknown> = { id, en }

interface LangCookieOptions {
  name?: string
  fallback?: Lang
}

export async function getLanguage(options: LangCookieOptions = {}): Promise<Lang> {
  const { name = 'cukkr_lang', fallback = 'id' } = options

  try {
    const cookieStore = await cookies()
    const langCookie = cookieStore.get(name)
    if (langCookie?.value === 'en' || langCookie?.value === 'id') {
      return langCookie.value as Lang
    }
  } catch {
    // cookies() not available
  }

  try {
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language')
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0]?.trim()
      if (preferred?.toLowerCase().startsWith('id')) return 'id'
    }
  } catch {
    // headers() not available
  }

  return fallback
}

export async function getDictionary(lang?: Lang): Promise<unknown> {
  const language = lang ?? (await getLanguage())
  return DICTS[language]
}
