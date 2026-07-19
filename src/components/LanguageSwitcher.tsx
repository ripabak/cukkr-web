'use client'

import { usePathname } from 'next/navigation'
import type { Lang } from '@/src/lib/i18n/client'

interface Props {
  currentLang: Lang
}

export function LanguageSwitcher({ currentLang }: Props) {
  const pathname = usePathname()
  const nextLang: Lang = currentLang === 'id' ? 'en' : 'id'

  return (
    <a
      href={`/api/language?lang=${nextLang}&redirect=${encodeURIComponent(pathname)}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--border-soft)] transition-colors pressable"
      aria-label={`Switch to ${nextLang === 'id' ? 'Indonesian' : 'English'}`}
    >
      <span className="text-sm leading-none">
        {nextLang === 'id' ? '\uD83C\uDDEE\uD83C\uDDE9' : '\uD83C\uDDEC\uD83C\uDDE7'}
      </span>
      <span className="uppercase tracking-wide">{nextLang}</span>
    </a>
  )
}
