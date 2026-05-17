export default function AboutPage() {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 lg:p-12 gap-16 min-h-screen">
      <div className="flex flex-col gap-6 max-w-3xl mt-12">
        <div className="flex items-center gap-4">
          <span className="w-8 h-[2px] bg-[#ffc81e]" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">
            About Cukkr
          </span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-[#1a1a1a] leading-[0.9]">
          Built for the
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">people behind</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#ffc81e] -z-0" />
          </span>
          <br />
          the chair.
        </h1>
        <p className="text-xl lg:text-2xl font-medium leading-relaxed text-[#6b7280] max-w-xl">
          Cukkr was built from a simple conviction: Asia&rsquo;s barbershops deserve tools
          that match their culture — not generic software forced to fit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#ffc81e] pt-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black tracking-tight uppercase text-[#1a1a1a]">Our Mission</h2>
          <p className="text-base text-[#6b7280] leading-relaxed">
            We build software that respects the craft — the walk-ins, the regulars, the
            precision, and the trust. Cukkr gives shop owners operational clarity without
            stripping away what makes their shop special.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black tracking-tight uppercase text-[#1a1a1a]">Our Approach</h2>
          <p className="text-base text-[#6b7280] leading-relaxed">
            Asia&rsquo;s barbershop culture is unique. The walk-in culture, the relationship
            between barber and client, the community feel — we design for all of it. Not as an
            afterthought, but as the foundation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#ffc81e] pt-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black tracking-tight uppercase text-[#1a1a1a]">Contact</h2>
          <p className="text-base text-[#6b7280] leading-relaxed">
            Interested in bringing Cukkr to your shop, or want to learn more about the platform?
            Reach out directly.
          </p>
          <a
            href="mailto:faruqirifa@gmail.com"
            className="inline-flex px-6 py-3 bg-[#ffc81e] text-[#1a1a1a] text-sm font-black tracking-[0.2em] uppercase hover:bg-[#e6b80b] transition-colors w-fit"
          >
            faruqirifa@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-6">
          {[
            { label: "Asia-First", desc: "Designed around how Asian barbershops actually operate — walk-ins, queues, and all." },
            { label: "No Bloat", desc: "We build exactly what shop owners need. Nothing more, nothing less." },
            { label: "Craft Over Hype", desc: "Solid software, honest pricing, real support. That's it." },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 border-l-2 border-[#ffc81e] pl-4">
              <span className="text-sm font-black tracking-[0.15em] uppercase text-[#1a1a1a]">
                {item.label}
              </span>
              <span className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
