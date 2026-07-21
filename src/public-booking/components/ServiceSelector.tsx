'use client';

import Image from 'next/image';
import { PublicSelectedService } from '../context/PublicBookingContext';
import { PublicService } from '../actions/booking.actions';

interface ServiceSelectorProps {
  services: PublicService[];
  selected: PublicSelectedService[];
  onChange: (services: PublicSelectedService[]) => void;
}

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

export function ServiceSelector({ services, selected, onChange }: ServiceSelectorProps) {
  const selectedIds = new Set(selected.map(s => s.id));

  const toggle = (service: PublicService) => {
    if (selectedIds.has(service.id)) {
      onChange(selected.filter(s => s.id !== service.id));
    } else {
      const finalPrice =
        service.discount
          ? Math.round(service.price * (1 - service.discount / 100))
          : service.price;
      onChange([
        ...selected,
        {
          id: service.id,
          name: service.name,
          price: finalPrice,
          discount: service.discount,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-2" role="group" aria-label="Select services">
      {services.map(service => {
        const isSelected = selectedIds.has(service.id);
        const discountedPrice = service.discount
          ? Math.round(service.price * (1 - service.discount / 100))
          : null;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => toggle(service)}
            className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 pressable ${
              isSelected
                ? 'border-2 border-[var(--accent)] bg-[var(--gold-surface)]'
                : 'border-2 border-[var(--border)] bg-[var(--paper)] hover:border-[var(--accent)]/50 hover:bg-[var(--cream)]'
            }`}
            aria-pressed={isSelected}
          >
            {service.imageUrl ? (
              <Image
                src={service.imageUrl}
                alt={service.name}
                width={44}
                height={44}
                unoptimized
                className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--border-soft)]">
                <span className="text-base text-[var(--ink-muted)]">
                  {'\u2702'}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[var(--accent)] border-[var(--accent)]'
                    : 'bg-[var(--border-soft)] border-2 border-[var(--border)]'
                }`}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink)]" />
                  </svg>
                )}
              </div>
              <span className="font-medium text-sm text-[var(--ink)] truncate">
                {service.name}
              </span>
            </div>

            <div className="text-right flex-shrink-0">
              <span className={`font-bold text-sm tabular-nums ${isSelected ? 'text-[var(--accent-dark)]' : 'text-[var(--ink)]'}`}>
                {discountedPrice !== null ? formatPrice(discountedPrice) : formatPrice(service.price)}
              </span>
              {discountedPrice !== null && (
                <div className="text-xs line-through text-[var(--ink-muted)] tabular-nums">
                  {formatPrice(service.price)}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
