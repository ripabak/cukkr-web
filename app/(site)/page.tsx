import Image from "next/image";
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
                href={process.env.NEXT_PUBLIC_APP_URL || "https://app.cukkr.com"}
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
        <div
          className="inline-flex text-[#1a1a1a] text-xs font-black tracking-[0.3em] uppercase"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-12 pr-12">
              <span>Walk-In Queue</span>
              <span>&mdash;</span>
              <span>Appointments</span>
              <span>&mdash;</span>
              <span>Team Management</span>
              <span>&mdash;</span>
              <span>Insights</span>
              <span>&mdash;</span>
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

      {/* Exclusive Booking Link */}
      <section className="px-6 lg:px-12 py-20 lg:py-28 border-b border-[#ffc81e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Copy */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-[2px] bg-[#ffc81e]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">
                  Your Booking Page
                </span>
              </div>
              <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.9] tracking-tight text-[#1a1a1a] uppercase">
                YOUR SHOP.
                <br />
                YOUR LINK.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">EVERYWHERE.</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#ffc81e] -z-0" />
                </span>
              </h2>
              <p className="text-[#6b7280] leading-relaxed max-w-md mt-6">
                Every barbershop on Cukkr gets its own exclusive URL — like your Instagram
                username, but for bookings. Drop it anywhere and customers land directly
                on your booking page.
              </p>
            </div>

            {/* URL showcase */}
            <div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280] block mb-3">
                Your link looks like this
              </span>
              <div className="flex items-stretch border border-[#1a1a1a] overflow-hidden">
                <span className="px-4 py-4 text-sm font-mono font-bold text-[#9ca3af] bg-[#f9fafb] border-r border-[#e5e7eb] shrink-0">
                  cukkr.com/
                </span>
                <span className="px-4 py-4 text-sm font-mono font-black text-[#1a1a1a] bg-[#ffc81e] flex-1 tracking-wide">
                  your-barbershop
                </span>
              </div>
            </div>

            {/* 3 benefit bullets */}
            <div className="flex flex-col gap-5">
              {[
                {
                  title: "Bio link that books",
                  desc: "Paste it in your Instagram bio. Customers tap once — they're on your booking page.",
                },
                {
                  title: "Share anywhere",
                  desc: "WhatsApp, Stories, printed on your business card. One URL does it all.",
                },
                {
                  title: "Exclusively yours",
                  desc: "No one else has this address. It's your shop's identity on the internet.",
                },
              ].map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <span className="w-5 h-[2px] bg-[#ffc81e] shrink-0 mt-2.5" />
                  <div>
                    <span className="block text-xs font-black tracking-[0.15em] uppercase text-[#1a1a1a] mb-1">
                      {b.title}
                    </span>
                    <span className="text-sm text-[#6b7280] leading-relaxed">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram screenshot — editorial offset shadow */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs lg:max-w-sm">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#ffc81e]" />
              <div className="relative bg-white border border-[#1a1a1a]">
                <Image
                  src="/assets/cukkr-web-link-book.png"
                  alt="Cukkr barbershop Instagram profile with exclusive booking link in bio"
                  width={480}
                  height={260}
                  className="w-full object-cover block"
                />
                <div className="px-4 py-3 border-t border-[#e5e7eb] flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-[#ffc81e]" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b7280]">
                    link in bio → your booking page
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Walk-In QR Experience */}
      <section className="px-6 lg:px-12 py-20 lg:py-28 bg-[#1a1a1a] border-b border-[#ffc81e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm lg:max-w-none">
              <Image
                src="/assets/cukkr-scan-qr.png"
                alt="Customer scanning QR code to join walk-in queue at barbershop"
                width={560}
                height={720}
                className="w-full object-cover"
                priority
              />
              {/* Present-tense activation badge — "this is happening now" */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-[#ffc81e] px-4 py-3">
                <span className="w-2 h-2 rounded-full bg-[#1a1a1a] animate-pulse shrink-0" />
                <span className="text-[#1a1a1a] text-xs font-black tracking-[0.2em] uppercase">
                  Queue Locked
                </span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 flex flex-col gap-10">
            <div>
              {/* Label + social proof anchoring */}
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-[2px] bg-[#ffc81e]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">
                  Walk-In Experience
                </span>
                {/* <span className="ml-auto border border-[#ffc81e44] px-3 py-1 text-xs font-black tracking-[0.15em] text-[#ffc81e] shrink-0">
                  4,832+ booked
                </span> */}
              </div>

              {/* Headline — focal anchor on final line */}
              <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.95] tracking-tight text-white uppercase">
                WALK IN.
                <br />
                SCAN.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#1a1a1a] px-1">YOU&rsquo;RE IN.</span>
                  <span className="absolute inset-0 bg-[#ffc81e]" />
                </span>
              </h2>

              <p className="text-[#9ca3af] leading-relaxed max-w-md mt-6 text-base">
                No app download. No receptionist. Just scan the QR at the shop, pick your
                service, and your spot in the queue is locked — instantly recorded.
              </p>
            </div>

            {/* Steps with momentum: connector line + depth watermark */}
            <div className="flex flex-col">
              {[
                {
                  step: "01",
                  title: "ARRIVE",
                  desc: "Walk in. The QR code is right there — on the door, counter, or wall.",
                },
                {
                  step: "02",
                  title: "SCAN",
                  desc: "Open your phone camera. One point, one tap.",
                },
                {
                  step: "03",
                  title: "PICK YOUR CUT",
                  desc: "Choose your service and preferred barber — takes under 30 seconds.",
                },
                {
                  step: "04",
                  title: "QUEUE LOCKED",
                  desc: "Your number is set. Step out, grab a coffee, come back when you're almost up.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="relative flex items-start gap-6 py-5 border-b border-[#ffffff10] last:border-0 overflow-hidden"
                >
                  {/* Watermark number — creates depth, visual interest */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[4.5rem] font-black text-white opacity-[0.04] leading-none select-none pointer-events-none">
                    {item.step}
                  </span>
                  {/* Vertical connector dot — Gestalt continuity */}
                  <div className="relative flex flex-col items-center shrink-0 pt-0.5">
                    <span className="text-xs font-black tracking-[0.3em] text-[#ffc81e]">
                      {item.step}
                    </span>
                    {i < 3 && (
                      <span className="mt-2 w-[1px] h-6 bg-gradient-to-b from-[#ffc81e] to-transparent opacity-40" />
                    )}
                  </div>
                  <div>
                    <span className="block text-xs font-black tracking-[0.2em] uppercase text-white mb-1">
                      {item.title}
                    </span>
                    <span className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ghost CTA — conversion moment on dark section */}
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL || "https://app.cukkr.com"}
              className="self-start px-8 py-4 border border-[#ffc81e] text-[#ffc81e] text-xs font-black tracking-[0.25em] uppercase hover:bg-[#ffc81e] hover:text-[#1a1a1a] transition-all duration-200"
            >
              Set Up Walk-In for Your Shop →
            </Link>
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
