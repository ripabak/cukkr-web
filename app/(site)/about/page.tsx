import { getDictionary, t } from "@/src/lib/i18n";

export default async function AboutPage() {
  const dict = await getDictionary();
  const d = dict as Record<string, Record<string, unknown>>;
  const about = d.about as Record<string, unknown>;
  const values = (about.values as { label: string; desc: string }[]) ?? [];

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-6 lg:px-8 gap-16 lg:gap-24 min-h-[60vh] pb-24">
      <div className="flex flex-col gap-8 max-w-3xl mt-12 lg:mt-20">
        <div className="flex items-start gap-3">
          <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
            {t(dict, "about.tagline")}
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl font-bold tracking-tight text-[var(--ink)] leading-[1] text-balance">
          {t(dict, "about.heading1")}
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">{t(dict, "about.heading2")}</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--accent)] -z-0 opacity-80" />
          </span>
          <br />
          {t(dict, "about.heading3")}
        </h1>
        <p className="text-xl lg:text-2xl font-medium leading-relaxed text-[var(--ink-soft)] max-w-2xl text-balance">
          {t(dict, "about.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            {t(dict, "about.mission.title")}
          </h2>
          <p className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed text-balance">
            {t(dict, "about.mission.body")}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            {t(dict, "about.approach.title")}
          </h2>
          <p className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed text-balance">
            {t(dict, "about.approach.body")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 pt-8 border-t border-[var(--border)]">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            {t(dict, "about.contact.title")}
          </h2>
          <p className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed text-balance">
            {t(dict, "about.contact.body")}
          </p>
          <a
            href="mailto:hello@cukkr.com"
            className="inline-flex self-start px-6 py-3.5 bg-[var(--accent)] text-[var(--ink)] text-sm font-semibold rounded-lg pressable shadow-[var(--shadow-accent)]"
          >
            hello@cukkr.com
          </a>
        </div>

        <div className="flex flex-col gap-6">
          {values.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 border-l-2 border-[var(--accent)] pl-5">
              <span className="text-base font-semibold text-[var(--ink)]">
                {item.label}
              </span>
              <span className="text-sm lg:text-base text-[var(--ink-soft)] leading-relaxed text-balance">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
