import Link from "next/link";
import Image from "next/image";
import { NavLink } from "@/components/NavLink";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.cukkr.com";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 bg-[var(--paper)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            <Link
              href="/"
              className="flex items-center gap-2.5 group pressable"
              aria-label="Cukkr home"
            >
              <Image
                src="/cukkr-logo-trans.png"
                alt=""
                width={32}
                height={32}
                className="rounded-lg"
                style={{ width: "auto", height: 32 }}
              />
              <span className="hidden sm:inline font-semibold text-lg tracking-tight text-[var(--ink)]">
                Cukkr
              </span>
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
              <NavLink
                href="/about"
                className="px-3 py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors rounded-md"
                activeClassName="text-[var(--ink)] bg-[var(--border-soft)]"
              >
                About
              </NavLink>
              <NavLink
                href="/article"
                className="px-3 py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors rounded-md"
                activeClassName="text-[var(--ink)] bg-[var(--border-soft)]"
              >
                Journal
              </NavLink>
              <a
                href={APP_URL}
                className="ml-2 sm:ml-4 inline-flex items-center px-4 py-2.5 bg-[var(--ink)] text-[var(--paper)] text-sm font-semibold rounded-lg pressable hover:shadow-md"
              >
                Get started
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow flex flex-col" tabIndex={-1}>
        {children}
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--cream)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-sm">
              <Link href="/" className="flex items-center gap-2.5 pressable w-fit">
                <Image
                  src="/cukkr-logo-trans.png"
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-md"
                  style={{ width: "auto", height: 28 }}
                />
                <span className="font-semibold text-lg tracking-tight">Cukkr</span>
              </Link>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                Barbershop management built for the culture. Walk-ins, appointments, team management, and insights in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Product</h3>
                <div className="flex flex-col gap-2">
                  <NavLink href="/about" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors w-fit" activeClassName="text-[var(--ink)]">
                    About
                  </NavLink>
                  <NavLink href="/article" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors w-fit" activeClassName="text-[var(--ink)]">
                    Journal
                  </NavLink>
                  <a href={APP_URL} className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors w-fit">
                    App login
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Legal</h3>
                <div className="flex flex-col gap-2">
                  <NavLink href="/privacy" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors w-fit" activeClassName="text-[var(--ink)]">
                    Privacy
                  </NavLink>
                  <NavLink href="/terms" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors w-fit" activeClassName="text-[var(--ink)]">
                    Terms
                  </NavLink>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Social</h3>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors w-fit"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-[var(--ink-muted)]">
              &copy; {currentYear} Cukkr. All rights reserved.
            </p>
            <p className="text-xs text-[var(--ink-muted)]">
              PT AURA KODE NUSANTARA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
