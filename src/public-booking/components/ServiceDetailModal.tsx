'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { t } from '@/src/lib/i18n/client';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';
import type { PublicService } from '@/src/public-booking/actions/booking.actions';

interface ServiceDetailModalProps {
  service: PublicService;
  slug: string;
  dict: unknown;
  onClose: () => void;
}

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

export function ServiceDetailModal({ service, slug, dict, onClose }: ServiceDetailModalProps) {
  const router = useRouter();
  const { setServices } = usePublicBooking();
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
    const hasDiscount = service.discount != null && service.discount > 0;
    const finalPrice = hasDiscount
      ? Math.round(service.price * (1 - service.discount! / 100))
      : service.price;

    setServices([{
      id: service.id,
      name: service.name,
      price: finalPrice,
      discount: service.discount,
    }]);
    router.push(`/${slug}/booking`);
  };

  const hasDiscount = service.discount != null && service.discount > 0;
  const finalPrice = hasDiscount
    ? Math.round(service.price * (1 - service.discount! / 100))
    : service.price;

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

        <div className="relative aspect-square w-full bg-[var(--border-soft)]">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              sizes="480px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[var(--accent)]/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-muted)]">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
          )}
          {service.duration != null && service.duration > 0 && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-[var(--ink-soft)] shadow-sm">
              {service.duration} min
            </span>
          )}
        </div>

        <div className="p-5">
          <h2 className="text-lg font-bold text-[var(--ink)] mb-2">
            {service.name}
          </h2>

          <p className="text-sm leading-relaxed text-[var(--ink-soft)] mb-5">
            {service.description || t(dict, 'barbershopPage.noDescription')}
          </p>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[var(--accent-dark)] tabular-nums">
                {formatPrice(finalPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs line-through text-[var(--ink-muted)] tabular-nums">
                  {formatPrice(service.price)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="ml-auto px-2 py-1 rounded-md text-xs font-semibold bg-[var(--gold-surface)] text-[var(--accent-dark)]">
                -{service.discount}%
              </span>
            )}
          </div>

          <button
            onClick={handleBook}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)]"
          >
            {t(dict, 'barbershopPage.bookService')}
          </button>
        </div>
      </div>
    </div>
  );
}
