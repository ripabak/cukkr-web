'use client';

import { PublicBarber } from '../actions/booking.actions';

interface BarberSelectorProps {
  barbers: PublicBarber[];
  selectedId: string | null;
  onChange: (id: string | null, name: string | null) => void;
}

export function BarberSelector({ barbers, selectedId, onChange }: BarberSelectorProps) {
  const options = [{ id: null, name: 'Barber Mana Saja', avatarUrl: null }, ...barbers] as (
    | PublicBarber
    | { id: null; name: string; avatarUrl: null }
  )[];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(barber => {
        const isSelected = barber.id === selectedId;
        const initials = barber.name
          .split(' ')
          .map(w => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();

        return (
          <button
            key={barber.id ?? 'any'}
            type="button"
            onClick={() => onChange(barber.id ?? null, barber.id ? barber.name : null)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              border: `2px solid ${isSelected ? '#ffc81e' : '#ebebeb'}`,
              backgroundColor: isSelected ? '#fff8e1' : '#ffffff',
              color: '#1a1a1a',
            }}
          >
            {barber.id === null ? (
              <span className="text-base">✨</span>
            ) : (barber as PublicBarber).avatarUrl ? (
              <img
                src={(barber as PublicBarber).avatarUrl!}
                alt={barber.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: isSelected ? '#ffc81e' : '#e5e7eb', color: isSelected ? '#1a1a1a' : '#6b7280' }}
              >
                {initials}
              </div>
            )}
            {barber.name}
          </button>
        );
      })}
    </div>
  );
}
