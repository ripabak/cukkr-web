'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BarbershopInfo, OpenHoursDay } from '@/src/public-booking/actions/booking.actions';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type TabId = 'services' | 'barbers' | 'hours' | 'location';

interface Tab {
  id: TabId;
  label: string;
  badge?: number;
}

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

function getTabs(barbershop: BarbershopInfo): Tab[] {
  const tabs: Tab[] = [];

  if (barbershop.openHours.length > 0) {
    tabs.push({ id: 'hours', label: 'Hours' });
  }

  tabs.push(
    { id: 'services', label: 'Services', badge: barbershop.services.length || undefined },
    { id: 'barbers', label: 'Barbers', badge: barbershop.barbers.length || undefined }
  );

  if (barbershop.address) {
    tabs.push({ id: 'location', label: 'Location' });
  }

  return tabs;
}

interface BarbershopTabsProps {
  slug: string;
  barbershop: BarbershopInfo;
  status: { isOpen: boolean; label: string };
  today: number;
}

export function BarbershopTabs({ slug, barbershop, status, today }: BarbershopTabsProps) {
  const tabs = getTabs(barbershop);
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id || 'services');

  const initial = barbershop.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col pb-28 bg-[var(--paper)]">
      {/* Hero */}
      <div className="flex flex-col items-center px-4 pt-12 pb-6">
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            {barbershop.logoUrl ? (
              <Image
                src={barbershop.logoUrl}
                alt={barbershop.name}
                width={96}
                height={96}
                unoptimized
                className="w-24 h-24 rounded-2xl object-cover shadow-[var(--shadow-sm)]"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-[var(--shadow-sm)] bg-[var(--accent)]">
                <span className="text-4xl font-bold text-[var(--ink)]">
                  {initial}
                </span>
              </div>
            )}
          </div>

          {/* Name & status */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-[var(--ink)]">
                {barbershop.name}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  status.isOpen
                    ? 'bg-[#f0fdf4] text-[#15803d]'
                    : 'bg-[#fef2f2] text-[#b91c1c]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status.isOpen ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
                  }`}
                />
                {status.label}
              </span>
            </div>
            {barbershop.description && (
              <p className="text-sm leading-relaxed text-[var(--ink-soft)] text-balance">
                {barbershop.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-sm mx-auto px-4">
          <nav aria-label="Barbershop sections" className="flex gap-1 -mb-px overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink-soft)]'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full tabular-nums ${
                    activeTab === tab.id
                      ? 'bg-[var(--accent)] text-[var(--ink)]'
                      : 'bg-[var(--border-soft)] text-[var(--ink-soft)]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <main className="flex-grow px-4 pt-6">
        <div className="max-w-sm mx-auto w-full">
          {activeTab === 'services' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">Services</h2>
              {barbershop.services.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {barbershop.services.map((svc) => {
                    const hasDiscount = svc.discount != null && svc.discount > 0;
                    const finalPrice = hasDiscount
                      ? Math.round(svc.price * (1 - svc.discount! / 100))
                      : svc.price;
                    return (
                      <div
                        key={svc.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]"
                      >
                        <div>
                          <span className="font-medium text-sm text-[var(--ink)]">
                            {svc.name}
                          </span>
                          {svc.duration != null && svc.duration > 0 && (
                            <span className="ml-2 text-xs text-[var(--ink-muted)]">
                              {svc.duration} min
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-sm text-[var(--ink)] tabular-nums">
                            {formatPrice(finalPrice)}
                          </span>
                          {hasDiscount && (
                            <div className="text-xs line-through text-[var(--ink-muted)] tabular-nums">
                              {formatPrice(svc.price)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  <p className="text-sm text-[var(--ink-muted)]">
                    Services coming soon.
                  </p>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    Please contact the shop directly.
                  </p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'barbers' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">Barbers</h2>
              {barbershop.barbers.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {barbershop.barbers.map((barber) => {
                    const barberInitial = barber.name.charAt(0).toUpperCase();
                    return (
                      <div
                        key={barber.id}
                        className="flex flex-col items-center p-4 rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]"
                      >
                        {barber.avatarUrl ? (
                          <Image
                            src={barber.avatarUrl}
                            alt={barber.name}
                            width={56}
                            height={56}
                            unoptimized
                            className="w-14 h-14 rounded-xl object-cover mb-2"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-2 bg-[var(--border-soft)]">
                            <span className="text-lg font-semibold text-[var(--ink-muted)]">
                              {barberInitial}
                            </span>
                          </div>
                        )}
                        <span className="text-sm font-medium text-[var(--ink)] text-center">
                          {barber.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  <p className="text-sm text-[var(--ink-muted)]">
                    Team details coming soon.
                  </p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'hours' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">Opening hours</h2>
              <div className="rounded-xl overflow-hidden border border-[var(--border-soft)] bg-[var(--cream)]">
                {barbershop.openHours.map((day: OpenHoursDay) => {
                  const isToday = day.dayOfWeek === today;
                  return (
                    <div
                      key={day.dayOfWeek}
                      className={`flex items-center justify-between px-4 py-3 ${
                        isToday ? 'bg-[var(--gold-surface)]' : ''
                      }`}
                    >
                      <span className="text-sm font-medium text-[var(--ink)]">
                        {DAY_LABELS[day.dayOfWeek]}
                      </span>
                      <span
                        className={`text-sm tabular-nums ${
                          day.isOpen ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)] italic'
                        }`}
                      >
                        {day.isOpen
                          ? `${day.openTime} - ${day.closeTime}`
                          : 'Closed'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === 'location' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">Location</h2>
              {barbershop.address ? (
                <div className="rounded-2xl p-5 bg-[var(--cream)] border border-[var(--border-soft)]">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5" aria-hidden="true">📍</span>
                    <div>
                      <p className="text-sm text-[var(--ink)] leading-relaxed">
                        {barbershop.address}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(barbershop.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[var(--accent-dark)] hover:text-[var(--ink)] transition-colors"
                      >
                        Open in Maps
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  <p className="text-sm text-[var(--ink-muted)]">
                    Address not available.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-[var(--paper)] border-t border-[var(--border)]">
        <div className="max-w-sm mx-auto">
          <Link
            href={`/${slug}/booking`}
            className="block w-full py-4 text-center rounded-xl font-semibold text-base bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)]"
          >
            Book now
          </Link>
        </div>
      </div>

      {/* Footer badge */}
      <div className="py-4 text-center mt-auto">
        <span className="text-xs text-[var(--ink-muted)]">
          Powered by{' '}
          <span className="font-semibold text-[var(--accent-dark)]">
            cukkr
          </span>
        </span>
      </div>
    </div>
  );
}
