export type Lang = 'id' | 'en'

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
