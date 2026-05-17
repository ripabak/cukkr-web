import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Digital Walk-In Queue",
    description: "Customers check in on arrival, pick their service, and wait their turn — no paper list, no shouted names.",
  },
  {
    number: "02",
    title: "Appointment Booking",
    description: "Let clients book a slot ahead of time. You control the schedule; they pick what works for them.",
  },
  {
    number: "03",
    title: "Team Management",
    description: "Add your barbers, assign bookings, and see who's busy — all in one clear view.",
  },
  {
    number: "04",
    title: "Business Insights",
    description: "Revenue, peak hours, top services. The numbers that matter, presented simply.",
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
                Barbershop Management Platform
              </span>
            </div>

            <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight text-[#1a1a1a] uppercase">
              MANAGE
              <br />
              YOUR SHOP.
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">SERVE YOUR CLIENTS.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#ffc81e] -z-0" />
              </span>
            </h1>

            <p className="max-w-md text-[#6b7280] text-base leading-relaxed">
              Cukkr is the all-in-one platform for modern barbershops — built around the Asia way.
              Digital walk-in queues, appointment booking, and team management. All in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/get-started"
                className="px-8 py-4 bg-[#ffc81e] text-[#1a1a1a] text-sm font-black tracking-[0.2em] uppercase hover:bg-[#e6b80b] transition-colors duration-200"
              >
                Get Started →
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold tracking-[0.2em] uppercase hover:border-[#ffc81e] hover:text-[#ffc81e] transition-all duration-200"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* STATS */}
          {/* <div className="flex lg:flex-col gap-8 lg:gap-10 lg:pb-4 shrink-0">
            {[
              { value: "200+", label: "Active Shops" },
              { value: "10K+", label: "Monthly Bookings" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-[#1a1a1a] leading-none">{stat.value}</span>
                <span className="text-xs text-[#6b7280] tracking-[0.15em] uppercase">{stat.label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-[#ffc81e] py-3 overflow-hidden whitespace-nowrap border-b border-[#e6b80b]">
        <div className="inline-flex gap-16 text-[#1a1a1a] text-xs font-black tracking-[0.3em] uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-16">
              <span>Walk-In Queue</span>
              <span>&mdash;</span>
              <span>Appointments</span>
              <span>&mdash;</span>
              <span>Team Management</span>
              <span>&mdash;</span>
              <span>Insights</span>
              <span>&mdash;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="px-6 lg:px-12 py-20 lg:py-28 border-b border-[#ffc81e]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-[2px] bg-[#ffc81e]" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">Platform Features</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#ffc81e]">
            {features.map((f) => (
              <div
                key={f.number}
                className="bg-white p-8 flex flex-col gap-6 group hover:bg-[#ffc81e] transition-colors duration-300"
              >
                <span className="text-xs font-black tracking-[0.3em] text-[#ffc81e] group-hover:text-[#1a1a1a] transition-colors">
                  {f.number}
                </span>
                <h3 className="text-xl font-black tracking-tight text-[#1a1a1a] uppercase">
                  {f.title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed group-hover:text-[#1a1a1a] transition-colors flex-grow">
                  {f.description}
                </p>
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
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">Our Approach</span>
            </div>
            <blockquote className="text-4xl lg:text-5xl font-black leading-tight text-[#1a1a1a] tracking-tight">
              &ldquo;Built for the culture.
              <br />
              Designed for scale.&rdquo;
            </blockquote>
            <p className="text-[#6b7280] leading-relaxed max-w-md">
              Asia&rsquo;s barbershops run on trust, loyalty, and precision. Cukkr is built to honor
              that — giving shop owners the tools to grow without losing the culture that makes
              their shop worth coming back to.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#ffc81e]">
            {[
              { label: "Asia-First", desc: "Designed around how Asian barbershops actually operate." },
              { label: "Walk-In Ready", desc: "Queue management built for the walk-in culture." },
              { label: "Appointment System", desc: "Let clients book ahead without the back-and-forth." },
              { label: "No Complexity", desc: "Powerful tools, simple enough for any shop owner." },
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
              Your shop,
              <br />
              fully managed.
            </h2>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <Link
              href="/get-started"
              className="px-10 py-5 bg-[#ffc81e] text-[#1a1a1a] text-sm font-black tracking-[0.25em] uppercase hover:bg-[#e6b80b] transition-colors duration-200 text-center"
            >
              Start Free Trial →
            </Link>
            <p className="text-xs text-[#6b7280] tracking-[0.1em] text-center">
              14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
