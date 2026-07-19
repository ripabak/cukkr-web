<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

⚡ App Router Rules

* Use Server Components by default
* Avoid "use client" unless needed for SEO optimization purposes
* No client-side fetching for landing page

---

## Multi-Language (i18n)

Cukkr-web supports two languages: Indonesian (`id`) as **default** and English (`en`).

### Architecture

```
src/lib/i18n/
├── index.ts            # getLanguage(), getDictionary(), t(), Lang type
├── id.ts               # Indonesian dictionary (home, about, journal, booking, etc.)
└── en.ts               # English dictionary (identical key structure)
```

### How it works

Language detection happens in Server Components:
1. **Cookie**: reads `cukkr_lang` cookie first (set via a language switcher or URL param)
2. **Accept-Language header**: falls back to browser preference
3. **Default**: `'id'` (Indonesia)

The root `app/layout.tsx` uses `generateMetadata()` (async) to set the `<html lang>` attribute and dynamic OG/title/description metadata per language. All Server Component pages call `getDictionary()` to get the translated object.

### Rules

- **Always use Server Components for translated pages.** Pages import `getDictionary` and `t` from `@/src/lib/i18n`.
- **Use `t(dict, key, params?)`** for all user-facing strings: `t(dict, "home.hero.tagline")`, `t(dict, "layout.footer.copyright", { year })`.
- **Locales are `as const` objects** with dot-notated key access. Keys are structured by page/section: `home.hero.tagline`, `about.mission.title`, `journal.heading`, `booking.walkIn.title`, etc.
- **When adding a new page**: Add all strings to both `id.ts` and `en.ts` with identical key structure. Then import `getDictionary`/`t` in the page.
- **Metadata**: Use `generateMetadata()` (async) in layouts/pages instead of static `metadata` export to support per-language SEO tags.
- **Legal pages** (privacy, terms): Only translate header/branding strings. Legal content body stays in English.
- **CMS content** (articles from Strapi): Not translated — content authors write in their preferred language.

### Example

```typescript
import { getDictionary, t } from "@/src/lib/i18n";

export default async function AboutPage() {
  const dict = await getDictionary();

  return (
    <h1>{t(dict, "about.tagline")}</h1>
    <p>{t(dict, "about.description")}</p>
  );
}
```