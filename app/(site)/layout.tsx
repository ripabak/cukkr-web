import Link from "next/link";
import Image from "next/image";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1a1a1a]">
      <header className="flex justify-between items-center px-6 py-5 lg:px-12 border-b border-[#ffc81e]">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <Image
            src="/cukkr-logo-trans.png"
            alt="Cukkr"
            width={32}
            height={32}
            className="rounded-md"
            style={{ width: "auto", height: 32 }}
          />
          <span className="hidden sm:inline font-bold text-xl tracking-[0.25em] uppercase text-[#1a1a1a] group-hover:text-[#ffc81e] transition-colors duration-200">
            CUKKR
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-xs font-bold tracking-[0.2em] uppercase">
          <Link href="/about" className="text-[#1a1a1a] hover:text-[#ffc81e] transition-colors duration-200">
            About
          </Link>
          <Link href="/article" className="text-[#1a1a1a] hover:text-[#ffc81e] transition-colors duration-200">
            Journal
          </Link>
          <Link
            href="/get-started"
            className="px-5 py-2 border border-[#ffc81e] bg-[#ffc81e] text-[#1a1a1a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col">{children}</main>

      <footer className="border-t border-[#ffc81e] px-6 py-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-xs text-[#6b7280] tracking-[0.15em] uppercase">
          &copy; {new Date().getFullYear()} Cukkr. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs font-medium tracking-[0.15em] uppercase text-[#6b7280]">
          <Link href="#" className="hover:text-[#ffc81e] transition-colors">Terms</Link>
          <Link href="#" className="hover:text-[#ffc81e] transition-colors">Privacy</Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffc81e] transition-colors"
          >
            Instagram ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
