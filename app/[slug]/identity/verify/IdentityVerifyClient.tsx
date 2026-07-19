'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyIdentity } from '@/src/public-booking/actions/booking.actions';
import { t } from '@/src/lib/i18n/client';

type Status = 'loading' | 'success' | 'alreadyVerified' | 'error';

export function IdentityVerifyClient({ dict }: { dict: unknown }) {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [status, setStatus] = useState<Status>(token ? 'loading' : 'error');

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    async function verify() {
      try {
        const result = await verifyIdentity(slug, token);
        if (cancelled) return;
        if (result.status === 'verified') setStatus('success');
        else if (result.status === 'already_verified') setStatus('alreadyVerified');
        else setStatus('error');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    verify();
    return () => { cancelled = true; };
  }, [slug, token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--paper)]">
      <div className="w-full max-w-sm text-center">
        {status === 'loading' && (
          <>
            <div className="w-12 h-12 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-xl font-bold mb-2 text-[var(--ink)]">{t(dict, 'booking.identity.verifying')}</h1>
            <p className="text-sm text-[var(--ink-soft)]">{t(dict, 'booking.identity.verifyingDesc')}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#f0fdf4]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M8 20L16 28L32 12" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-[var(--ink)]">{t(dict, 'booking.identity.verified')}</h1>
            <p className="text-sm mb-8 text-[var(--ink-soft)]">{t(dict, 'booking.identity.verifiedDesc')}</p>
            <a href={`/${slug}`} className="inline-block px-6 py-3 rounded-xl font-semibold text-sm bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)] no-underline">
              {t(dict, 'booking.appointment.backToHome')}
            </a>
          </>
        )}
        {status === 'alreadyVerified' && (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#eff6ff]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M20 12V22M20 28H20.02" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-[var(--ink)]">{t(dict, 'booking.identity.alreadyVerified')}</h1>
            <p className="text-sm mb-8 text-[var(--ink-soft)]">{t(dict, 'booking.identity.alreadyVerifiedDesc')}</p>
            <a href={`/${slug}`} className="inline-block px-6 py-3 rounded-xl font-semibold text-sm bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)] no-underline">
              {t(dict, 'booking.appointment.backToHome')}
            </a>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#fef2f2]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M12 12L28 28M28 12L12 28" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-[var(--ink)]">{t(dict, 'booking.identity.invalid')}</h1>
            <p className="text-sm mb-8 text-[var(--ink-soft)]">{t(dict, 'booking.identity.invalidDesc')}</p>
            <a href={`/${slug}`} className="inline-block px-6 py-3 rounded-xl font-semibold text-sm bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)] no-underline">
              {t(dict, 'booking.appointment.backToHome')}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
