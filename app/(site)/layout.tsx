import Link from "next/link";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-accent selection:text-white min-h-screen">
      <header className="flex justify-between items-center p-6 lg:p-8">
        <Link href="/" className="font-bold text-xl md:text-2xl tracking-tighter uppercase flex items-center gap-3 hover:text-accent transition-colors mix-blend-difference z-50">
          <span className="w-5 h-5 bg-gradient-to-br from-accent to-orange-500 rounded-full inline-block"></span>
          FADHR LABS
        </Link>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest z-50 mix-blend-difference">
          Instagram ↗
        </a>
      </header>
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <footer className="p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-neutral-500 uppercase tracking-widest gap-4">
        <p>Copyright &copy; {new Date().getFullYear()} FADHR LABS. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-accent transition-colors">Terms of service</Link>
          <Link href="#" className="hover:text-accent transition-colors">Privacy policy</Link>
          <Link href="#" className="hover:text-accent transition-colors border border-neutral-700 rounded-full px-3 py-1 -mt-1 flex items-center gap-2">
            Worldwide catalogue 🌐
          </Link>
        </div>
      </footer>
    </div>
  );
}
