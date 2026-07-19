import Image from "next/image";
import Link from "next/link";
import { getDictionary, t } from "@/src/lib/i18n";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.cukkr.com";

export default async function Home() {
  const dict = await getDictionary();
  const d = dict as Record<string, Record<string, unknown>>;

  // TypeScript tidak tahu struktur object — kita akses nested array via casting
  const home = d.home as Record<string, unknown>;
  const marqueeItems = (home.marquee as Record<string, string[]>).items;
  const features = (home.features as Record<string, { number: string; title: string; description: string }[]>).items;
  const bookingFeatures = (home.bookingLink as Record<string, { title: string; desc: string }[]>).features;
  const walkInSteps = (home.walkIn as Record<string, { step: string; title: string; desc: string }[]>).steps;
  const philosophyItems = (home.philosophy as Record<string, { label: string; desc: string }[]>).items;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[var(--gold-surface)] rounded-full blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[var(--border-soft)] rounded-full blur-[100px] opacity-60 -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[var(--accent)]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                  {t(dict, "home.hero.tagline")}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-[var(--ink)] text-balance">
                {t(dict, "home.hero.title1")}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">{t(dict, "home.hero.title2")}</span>
                  <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-3 md:h-4 bg-[var(--accent)] -z-0 opacity-80" />
                </span>
              </h1>

              <p className="max-w-md text-[var(--ink-soft)] text-lg leading-relaxed text-balance">
                {t(dict, "home.hero.description")}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={APP_URL}
                  className="inline-flex items-center px-7 py-3.5 bg-[var(--accent)] text-[var(--ink)] text-sm font-semibold rounded-lg pressable shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent)]"
                >
                  {t(dict, "home.hero.getStarted")}
                  <span className="ml-2" aria-hidden="true">→</span>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center px-7 py-3.5 border border-[var(--border)] text-[var(--ink)] text-sm font-medium rounded-lg pressable hover:border-[var(--ink)] hover:bg-[var(--cream)]"
                >
                  {t(dict, "home.hero.howItWorks")}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex flex-col gap-8 pb-2">
              <div className="flex flex-col gap-1 p-5 bg-[var(--paper)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-md)] -rotate-1">
                <span className="text-3xl font-bold text-[var(--ink)] tabular-nums">{t(dict, "home.hero.stat1")}</span>
                <span className="text-xs font-medium text-[var(--ink-muted)] uppercase tracking-wider">{t(dict, "home.hero.stat1Label")}</span>
              </div>
              <div className="flex flex-col gap-1 p-5 bg-[var(--paper)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-md)] rotate-1 ml-8">
                <span className="text-3xl font-bold text-[var(--ink)] tabular-nums">{t(dict, "home.hero.stat2")}</span>
                <span className="text-xs font-medium text-[var(--ink-muted)] uppercase tracking-wider">{t(dict, "home.hero.stat2Label")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-[var(--ink)] py-3 overflow-hidden whitespace-nowrap border-b border-[var(--border)]">
        <div
          className="inline-flex text-[var(--paper)] text-xs font-semibold tracking-widest uppercase"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-10 pr-10">
              {marqueeItems.map((item, j) => (
                  <span key={j}>
                    {j > 0 && <span className="text-[var(--accent)]">—</span>}
                    <span className="mx-5">{item}</span>
                  </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
              {t(dict, "home.features.tagline")}
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] leading-[1.1] text-balance max-w-2xl mb-16 lg:mb-20">
            {t(dict, "home.features.heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <article
                key={f.number}
                className="group relative p-8 lg:p-10 bg-[var(--paper)] border border-[var(--border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)]"
              >
                <span className="absolute top-8 right-8 text-5xl font-bold text-[var(--border)] tabular-nums transition-colors group-hover:text-[var(--accent)]/20">
                  {f.number}
                </span>
                <div className="relative flex flex-col gap-5 h-full">
                  <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-[var(--ink)]">
                    {f.title}
                  </h3>
                  <p className="text-[var(--ink-soft)] leading-relaxed text-balance">
                    {f.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Booking Link */}
      <section className="px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div>
              <div className="flex items-start gap-3 mb-6">
                <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                  {t(dict, "home.bookingLink.tagline")}
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-tight text-[var(--ink)] text-balance">
                {t(dict, "home.bookingLink.heading1")}
                <br />
                {t(dict, "home.bookingLink.heading2")}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">{t(dict, "home.bookingLink.heading3")}</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--accent)] -z-0 opacity-80" />
                </span>
              </h2>
              <p className="text-[var(--ink-soft)] leading-relaxed max-w-md mt-6 text-lg text-balance">
                {t(dict, "home.bookingLink.description")}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)] block mb-3">
                {t(dict, "home.bookingLink.urlLabel")}
              </span>
              <div className="flex items-stretch border border-[var(--ink)] rounded-lg overflow-hidden shadow-[var(--shadow-sm)]">
                <span className="px-4 py-3.5 text-sm font-mono font-medium text-[var(--ink-muted)] bg-[var(--border-soft)] border-r border-[var(--border)] shrink-0">
                  cukkr.com/
                </span>
                <span className="px-4 py-3.5 text-sm font-mono font-bold text-[var(--ink)] bg-[var(--accent)] flex-1 tracking-wide">
                  your-barbershop
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {bookingFeatures.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <span className="w-5 h-[2px] bg-[var(--accent)] shrink-0 mt-2.5" />
                  <div>
                    <span className="block text-sm font-semibold text-[var(--ink)] mb-1">
                      {b.title}
                    </span>
                    <span className="text-sm text-[var(--ink-soft)] leading-relaxed text-balance">
                      {b.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[var(--accent)] rounded-2xl" />
              <div className="relative bg-[var(--paper)] border border-[var(--ink)] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <Image
                  src="/assets/cukkr-web-link-book.png"
                  alt={t(dict, "home.bookingLink.linkCaption")}
                  width={480}
                  height={260}
                  className="w-full object-cover block"
                />
                <div className="px-5 py-4 border-t border-[var(--border)] flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-[var(--accent)]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[var(--ink-muted)]">
                    {t(dict, "home.bookingLink.linkCaption")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Walk-In QR Experience */}
      <section className="relative px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[var(--gold-surface)] via-transparent to-transparent opacity-40" />

        <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <Image
                src="/assets/cukkr-scan-qr.png"
                alt={t(dict, "home.walkIn.tagline")}
                width={560}
                height={720}
                className="w-full object-cover rounded-2xl shadow-[var(--shadow-lg)]"
                priority
              />
              <div className="absolute -bottom-4 -right-4 flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-4 py-3 rounded-xl shadow-[var(--shadow-md)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase">
                  {t(dict, "home.walkIn.queueLocked")}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-10">
            <div>
              <div className="flex items-start gap-3 mb-6">
                <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                  {t(dict, "home.walkIn.tagline")}
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-tight text-[var(--ink)] text-balance">
                {t(dict, "home.walkIn.heading1")}
                <br />
                {t(dict, "home.walkIn.heading2")}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">{t(dict, "home.walkIn.heading3")}</span>
                  <span className="absolute inset-0 bg-[var(--accent)] -z-0 opacity-80" />
                </span>
              </h2>

              <p className="text-[var(--ink-soft)] leading-relaxed max-w-md mt-6 text-lg text-balance">
                {t(dict, "home.walkIn.description")}
              </p>
            </div>

            <div className="flex flex-col">
              {walkInSteps.map((item) => (
                <div
                  key={item.step}
                  className="relative flex items-start gap-5 py-5 border-b border-[var(--border)] last:border-0"
                >
                  <span className="text-xs font-bold tracking-widest text-[var(--accent)] tabular-nums pt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <span className="block text-sm font-semibold text-[var(--ink)] mb-1">
                      {item.title}
                    </span>
                    <span className="text-sm text-[var(--ink-soft)] leading-relaxed text-balance">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={APP_URL}
              className="self-start inline-flex items-center px-7 py-3.5 border border-[var(--ink)] text-[var(--ink)] text-sm font-semibold rounded-lg pressable hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {t(dict, "home.walkIn.cta")}
              <span className="ml-2" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 lg:px-8 py-20 lg:py-28 border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                {t(dict, "home.philosophy.tagline")}
              </span>
            </div>
            <blockquote className="font-[family-name:var(--font-serif)] text-3xl lg:text-5xl font-bold leading-[1.1] text-[var(--ink)] tracking-tight text-balance">
              &ldquo;{t(dict, "home.philosophy.quote")}&rdquo;
            </blockquote>
            <p className="text-[var(--ink-soft)] leading-relaxed max-w-md text-lg text-balance">
              {t(dict, "home.philosophy.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {philosophyItems.map((item) => (
              <div
                key={item.label}
                className="p-6 bg-[var(--paper)] border border-[var(--border)] rounded-2xl transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-sm)]"
              >
                <span className="text-base font-semibold text-[var(--ink)] mb-2 block">
                  {item.label}
                </span>
                <span className="text-sm text-[var(--ink-soft)] leading-relaxed text-balance">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--ink)] text-[var(--paper)] p-10 lg:p-16">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[var(--accent)] rounded-full blur-[120px] opacity-10 translate-x-1/3 -translate-y-1/3" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                    {t(dict, "home.cta.tagline")}
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-serif)] text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
                  {t(dict, "home.cta.heading")}
                </h2>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href={APP_URL}
                  className="inline-flex items-center justify-center px-10 py-4 bg-[var(--accent)] text-[var(--ink)] text-base font-semibold rounded-lg pressable shadow-[var(--shadow-accent)]"
                >
                  {t(dict, "home.cta.getStarted")}
                </a>
                <p className="text-xs text-[var(--ink-muted)] text-center">
                  {t(dict, "home.cta.subtext")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
