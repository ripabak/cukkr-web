import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Haircut",
    description: "Precision cuts shaped to your face and lifestyle. Clean lines, no compromise.",
  },
  {
    number: "02",
    title: "Beard Grooming",
    description: "Defined edges, balanced shape. From stubble to full beard — handled with care.",
  },
  {
    number: "03",
    title: "Scalp Treatment",
    description: "Deep-cleanse ritual for a healthy foundation. Refreshed from root to tip.",
  },
  {
    number: "04",
    title: "Wax & Polish",
    description: "Finishing touches that make the difference. Walk out sharper than you walked in.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 lg:px-12 pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#ffc81e]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ffc81e]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">
                Minimalistic Barbershop
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.9] tracking-tight text-[#1a1a1a] uppercase">
              THE ART
              <br />
              OF{" "}
              <span className="relative inline-block">
                <span className="relative z-10">CLEAN.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#ffc81e] -z-0" />
              </span>
            </h1>

            <p className="max-w-md text-[#6b7280] text-base leading-relaxed">
              A barbershop built on precision, simplicity, and respect for your time.
              No distractions — just a sharp cut and an honest experience.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/book"
                className="px-8 py-4 bg-[#ffc81e] text-[#1a1a1a] text-sm font-black tracking-[0.2em] uppercase hover:bg-[#e6b80b] transition-colors duration-200"
              >
                Book Appointment →
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold tracking-[0.2em] uppercase hover:border-[#ffc81e] hover:text-[#ffc81e] transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Side stat strip */}
          <div className="flex lg:flex-col gap-8 lg:gap-10 lg:pb-4 shrink-0">
            {[
              { value: "5+", label: "Years of cuts" },
              { value: "3K+", label: "Happy clients" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-[#1a1a1a] leading-none">{stat.value}</span>
                <span className="text-xs text-[#6b7280] tracking-[0.15em] uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-[#ffc81e] py-3 overflow-hidden whitespace-nowrap border-b border-[#e6b80b]">
        <div className="inline-flex gap-16 animate-none text-[#1a1a1a] text-xs font-black tracking-[0.3em] uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-16">
              <span>Haircut</span>
              <span>&mdash;</span>
              <span>Beard</span>
              <span>&mdash;</span>
              <span>Wax</span>
              <span>&mdash;</span>
              <span>Scalp</span>
              <span>&mdash;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 lg:py-28 border-b border-[#ffc81e]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-[2px] bg-[#ffc81e]" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">What We Do</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#ffc81e]">
            {services.map((svc) => (
              <div
                key={svc.number}
                className="bg-white p-8 flex flex-col gap-6 group hover:bg-[#ffc81e] transition-colors duration-300"
              >
                <span className="text-xs font-black tracking-[0.3em] text-[#ffc81e] group-hover:text-[#1a1a1a] transition-colors">
                  {svc.number}
                </span>
                <h3 className="text-xl font-black tracking-tight text-[#1a1a1a] uppercase">
                  {svc.title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed group-hover:text-[#1a1a1a] transition-colors flex-grow">
                  {svc.description}
                </p>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a1a1a] group-hover:underline underline-offset-4">
                  Learn more →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 lg:px-12 py-20 lg:py-28 border-b border-[#ffc81e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ffc81e]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">Our Philosophy</span>
            </div>
            <blockquote className="text-4xl lg:text-5xl font-black leading-tight text-[#1a1a1a] tracking-tight">
              &ldquo;Less noise.
              <br />
              More craft.&rdquo;
            </blockquote>
            <p className="text-[#6b7280] leading-relaxed max-w-md">
              We strip away everything unnecessary — the gimmicks, the noise, the excess.
              What remains is pure skill, clean space, and a result you can feel.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#ffc81e]">
            {[
              { label: "Walk-in", desc: "No appointment needed. Show up, sit down." },
              { label: "On-time", desc: "Your time is respected. Always." },
              { label: "No Upsell", desc: "You get exactly what you asked for." },
              { label: "Est. 2020", desc: "Four years of sharper cuts." },
            ].map((item) => (
              <div key={item.label} className="bg-white p-6 flex flex-col gap-2">
                <span className="text-sm font-black tracking-[0.15em] uppercase text-[#1a1a1a]">
                  {item.label}
                </span>
                <span className="text-xs text-[#6b7280] leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ffc81e]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">Ready?</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] tracking-tight uppercase leading-tight">
              Walk in.
              <br />
              Walk out sharp.
            </h2>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <Link
              href="/book"
              className="px-10 py-5 bg-[#ffc81e] text-[#1a1a1a] text-sm font-black tracking-[0.25em] uppercase hover:bg-[#e6b80b] transition-colors duration-200 text-center"
            >
              Book Appointment →
            </Link>
            <p className="text-xs text-[#6b7280] tracking-[0.1em] text-center">
              Or walk in — we&apos;ll be here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
