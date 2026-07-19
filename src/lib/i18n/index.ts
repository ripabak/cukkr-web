import { cookies, headers } from 'next/headers'
import id from './id'
import en from './en'

export type Lang = 'id' | 'en'

const DICTS: Record<Lang, unknown> = { id, en }

function resolveKey(obj: Record<string, unknown>, path: string): string | undefined {
  let current: unknown = obj
  for (const key of path.split('.')) {
    if (!current || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : undefined
}

function interpolate(str: string, params?: Record<string, string>): string {
  if (!params) return str
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    str,
  )
}

export function t(
  dictionary: unknown,
  key: string,
  params?: Record<string, string>,
): string {
  const value = resolveKey(dictionary as Record<string, unknown>, key)
  if (value === undefined) return key
  return interpolate(value, params)
}

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
    // cookies() not available (e.g. in middleware or static generation)
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
