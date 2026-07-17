export default function AboutPage() {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-6 lg:px-8 gap-16 lg:gap-24 min-h-[60vh] pb-24">
      <div className="flex flex-col gap-8 max-w-3xl mt-12 lg:mt-20">
        <div className="flex items-start gap-3">
          <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
            About Cukkr
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl font-bold tracking-tight text-[var(--ink)] leading-[1] text-balance">
          Built for the
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">people behind</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--accent)] -z-0 opacity-80" />
          </span>
          <br />
          the chair.
        </h1>
        <p className="text-xl lg:text-2xl font-medium leading-relaxed text-[var(--ink-soft)] max-w-2xl text-balance">
          Cukkr was built from a simple conviction: Asia&rsquo;s barbershops deserve tools that match their culture — not generic software forced to fit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Our mission
          </h2>
          <p className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed text-balance">
            We build software that respects the craft — the walk-ins, the regulars, the precision, and the trust. Cukkr gives shop owners operational clarity without stripping away what makes their shop special.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Our approach
          </h2>
          <p className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed text-balance">
            Asia&rsquo;s barbershop culture is unique. The walk-in culture, the relationship between barber and client, the community feel — we design for all of it. Not as an afterthought, but as the foundation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 pt-8 border-t border-[var(--border)]">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
            Contact
          </h2>
          <p className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed text-balance">
            Interested in bringing Cukkr to your shop, or want to learn more about the platform? Reach out directly.
          </p>
          <a
            href="mailto:hello@cukkr.com"
            className="inline-flex self-start px-6 py-3.5 bg-[var(--accent)] text-[var(--ink)] text-sm font-semibold rounded-lg pressable shadow-[var(--shadow-accent)]"
          >
            hello@cukkr.com
          </a>
        </div>

        <div className="flex flex-col gap-6">
          {[
            {
              label: "Asia-first",
              desc: "Designed around how Asian barbershops actually operate — walk-ins, queues, and all.",
            },
            {
              label: "No bloat",
              desc: "We build exactly what shop owners need. Nothing more, nothing less.",
            },
            {
              label: "Craft over hype",
              desc: "Solid software, honest pricing, real support. That's it.",
            },
          ].map((item) => (
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
