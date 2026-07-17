'use client';

import { PublicBarber } from '../actions/booking.actions';

interface BarberSelectorProps {
  barbers: PublicBarber[];
  selectedId: string | null;
  onChange: (id: string | null, name: string | null) => void;
}

export function BarberSelector({ barbers, selectedId, onChange }: BarberSelectorProps) {
  const options = [{ id: null, name: 'Barber mana saja', avatarUrl: null }, ...barbers] as (
    | PublicBarber
    | { id: null; name: string; avatarUrl: null }
  )[];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select barber">
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
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 pressable ${
              isSelected
                ? 'border-2 border-[var(--accent)] bg-[var(--gold-surface)] text-[var(--ink)]'
                : 'border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]/50 hover:bg-[var(--cream)]'
            }`}
            aria-pressed={isSelected}
          >
            {barber.id === null ? (
              <span className="text-base" aria-hidden="true">✨</span>
            ) : (barber as PublicBarber).avatarUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(barber as PublicBarber).avatarUrl!}
                  alt={barber.name}
                  className="w-6 h-6 rounded-lg object-cover"
                />
              </>
            ) : (
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                isSelected ? 'bg-[var(--accent)] text-[var(--ink)]' : 'bg-[var(--border-soft)] text-[var(--ink-muted)]'
              }`}>
                {initials}
              </div>
            )}
            <span className="truncate max-w-[140px]">{barber.name}</span>
          </button>
        );
      })}
    </div>
  );
}
