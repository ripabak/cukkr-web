'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookingTypePage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)]">
      {/* Back button */}
      <div className="p-4">
        <Link
          href={`/${slug}`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[var(--ink)] hover:bg-[var(--cream)] transition-colors pressable"
          aria-label="Back to shop"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Center content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm text-center mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)] mb-2 text-balance">
            How would you like to book?
          </h1>
          <p className="text-sm text-[var(--ink-soft)]">Choose your booking type to continue.</p>
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          {/* Walk-in */}
          <button
            onClick={() => router.push(`/${slug}/booking/walkin`)}
            className="flex-1 py-8 flex flex-col items-center gap-3 border-2 border-[var(--border)] bg-[var(--paper)] hover:border-[var(--accent)] hover:bg-[var(--gold-surface)] transition-all duration-200 rounded-2xl pressable"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink)]">
              <circle cx="12" cy="5" r="1.5" />
              <path d="M10 10l-2 5h3l1 4" />
              <path d="M14 10l2 5h-3" />
              <path d="M9.5 15l-1.5 4" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">Walk-in</p>
              <p className="text-xs text-[var(--ink-muted)] mt-0.5">Come in now</p>
            </div>
          </button>

          {/* Appointment */}
          <button
            onClick={() => router.push(`/${slug}/booking/appointment`)}
            className="flex-1 py-8 flex flex-col items-center gap-3 border-2 border-[var(--border)] bg-[var(--paper)] hover:border-[var(--accent)] hover:bg-[var(--gold-surface)] transition-all duration-200 rounded-2xl pressable"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink)]">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">Appointment</p>
              <p className="text-xs text-[var(--ink-muted)] mt-0.5">Book a time slot</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
