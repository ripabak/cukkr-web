'use client';

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
    <div className="flex flex-col gap-2">
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
            className="flex items-center justify-between p-4 rounded-xl text-left transition-all"
            style={{
              border: `2px solid ${isSelected ? '#ffc81e' : '#ebebeb'}`,
              backgroundColor: isSelected ? '#fff8e1' : '#ffffff',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  backgroundColor: isSelected ? '#ffc81e' : '#f0f0f0',
                  border: `2px solid ${isSelected ? '#ffc81e' : '#d1d5db'}`,
                }}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="font-medium text-sm" style={{ color: '#1a1a1a' }}>
                {service.name}
              </span>
            </div>

            <div className="text-right">
              <span className="font-bold text-sm" style={{ color: isSelected ? '#e6b80b' : '#1a1a1a' }}>
                {discountedPrice !== null ? formatPrice(discountedPrice) : formatPrice(service.price)}
              </span>
              {discountedPrice !== null && (
                <div className="text-xs line-through" style={{ color: '#9ca3af' }}>
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
