import Link from "next/link";
import { getDictionary, t } from "@/src/lib/i18n";

export default async function NotFound() {
  const dict = await getDictionary();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-md text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">{t(dict, "notFound.title")}</span>
        <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-6 leading-[1] text-balance">
          {t(dict, "notFound.heading")}
        </h1>
        <p className="text-lg text-[var(--ink-soft)] leading-relaxed mb-10 text-balance">
          {t(dict, "notFound.description")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3.5 bg-[var(--ink)] text-[var(--paper)] text-sm font-semibold rounded-lg pressable"
          >
            {t(dict, "notFound.backHome")}
          </Link>
          <Link
            href="/article"
            className="inline-flex items-center px-6 py-3.5 border border-[var(--border)] text-[var(--ink)] text-sm font-medium rounded-lg pressable hover:border-[var(--ink)]"
          >
            {t(dict, "layout.journal")}
          </Link>
        </div>
      </div>
    </div>
  );
}
