'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { t } from '@/src/lib/i18n/client';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';
import type { PublicBarber } from '@/src/public-booking/actions/booking.actions';

interface BarberDetailModalProps {
  barber: PublicBarber;
  slug: string;
  dict: unknown;
  onClose: () => void;
}

export function BarberDetailModal({ barber, slug, dict, onClose }: BarberDetailModalProps) {
  const router = useRouter();
  const { setBarber } = usePublicBooking();
  const cardRef = useRef<HTMLDivElement>(null);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (hasOpened.current) return;
    hasOpened.current = true;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleBook = () => {
    setBarber(barber.id, barber.name);
    router.push(`/${slug}/booking`);
  };

  const initial = barber.name.charAt(0).toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        background: 'rgba(28, 25, 23, 0.5)',
        animation: 'backdropFadeIn 0.2s ease-out',
      }}
    >
      <style>{`
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        ref={cardRef}
        className="relative w-full max-w-sm rounded-2xl bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden"
        style={{ animation: 'modalSlideIn 0.25s ease-out' }}
      >
        <button
          onClick={onClose}
          aria-label={t(dict, 'barbershopPage.closeModal')}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[var(--ink)] shadow-[var(--shadow-sm)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          {barber.avatarUrl ? (
            <Image
              src={barber.avatarUrl}
              alt={barber.name}
              width={112}
              height={112}
              unoptimized
              className="w-28 h-28 rounded-3xl object-cover mb-5 shadow-[var(--shadow-md)]"
            />
          ) : (
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center mb-5 bg-[var(--accent)]/30 shadow-[var(--shadow-md)]">
              <span className="text-4xl font-bold text-[var(--ink)]">
                {initial}
              </span>
            </div>
          )}

          <h2 className="text-xl font-bold text-[var(--ink)] mb-1">
            {barber.name}
          </h2>

          <p className="text-sm leading-relaxed text-[var(--ink-soft)] text-center mb-6">
            {barber.bio || t(dict, 'barbershopPage.noBio')}
          </p>

          <button
            onClick={handleBook}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)]"
          >
            {t(dict, 'barbershopPage.bookWithBarber')}
          </button>
        </div>
      </div>
    </div>
  );
}
