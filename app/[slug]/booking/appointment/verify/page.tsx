'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyAppointment } from '@/src/public-booking/actions/booking.actions';

type Status = 'loading' | 'success' | 'alreadyVerified' | 'error';

export default function VerifyAppointmentPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const result = await verifyAppointment(slug, token);
        if (cancelled) return;

        if (result.status === 'verified') {
          setStatus('success');
        } else if (result.status === 'already_verified') {
          setStatus('alreadyVerified');
        } else {
          setStatus('error');
        }
      } catch {
        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    verify();

    return () => {
      cancelled = true;
    };
  }, [slug, token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-sm text-center">
        {status === 'loading' && (
          <>
            <div className="w-12 h-12 border-4 border-[#f0f0f0] border-t-[#ffc81e] rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-xl font-black mb-2 text-[#1a1a1a]">Verifying...</h1>
            <p className="text-sm text-[#6b7280]">Please wait while we confirm your appointment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#f0fdf4]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 20L16 28L32 12" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-black mb-2 text-[#1a1a1a]">Appointment Confirmed!</h1>
            <p className="text-sm mb-8 text-[#6b7280]">Your appointment has been confirmed and the barbershop has been notified.</p>
            <a
              href={`/${slug}`}
              className="inline-block px-6 py-3 rounded-2xl font-bold text-sm transition-opacity bg-[#ffc81e] text-[#1a1a1a] no-underline"
            >
              Back to Barbershop
            </a>
          </>
        )}

        {status === 'alreadyVerified' && (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#eff6ff]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 12V22M20 28H20.02" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-black mb-2 text-[#1a1a1a]">Already Confirmed</h1>
            <p className="text-sm mb-8 text-[#6b7280]">This appointment has already been verified. No further action is needed.</p>
            <a
              href={`/${slug}`}
              className="inline-block px-6 py-3 rounded-2xl font-bold text-sm transition-opacity bg-[#ffc81e] text-[#1a1a1a] no-underline"
            >
              Back to Barbershop
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#fef2f2]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M12 12L28 28M28 12L12 28" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-black mb-2 text-[#1a1a1a]">Verification Failed</h1>
            <p className="text-sm mb-8 text-[#6b7280]">This verification link is invalid or has expired.</p>
            <a
              href={`/${slug}`}
              className="inline-block px-6 py-3 rounded-2xl font-bold text-sm transition-opacity bg-[#ffc81e] text-[#1a1a1a] no-underline"
            >
              Back to Barbershop
            </a>
          </>
        )}
      </div>
    </div>
  );
}
