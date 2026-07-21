import Link from "next/link";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { getLanguage } from "@/src/lib/i18n";
import { SlugProvider } from "@/src/public-booking/components/SlugProvider";

export default async function BookingSlugLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLanguage();

  return (
    <SlugProvider>
      <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <header className="sticky top-0 z-40 bg-[var(--paper)]/90 backdrop-blur-md border-b border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex justify-between items-center h-14">
              <Link href="/" className="pressable" aria-label="Home">
                <img
                  src="/cukkr-logo-trans.png"
                  alt="Cukkr"
                  className="h-7 w-auto rounded-lg"
                />
              </Link>
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </header>
        {children}
      </div>
    </SlugProvider>
  );
}
