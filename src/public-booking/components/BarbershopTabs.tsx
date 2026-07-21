'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { t } from '@/src/lib/i18n/client';
import { BarbershopInfo, OpenHoursDay, type PublicService, type PublicBarber } from '@/src/public-booking/actions/booking.actions';
import { ServiceDetailModal } from '@/src/public-booking/components/ServiceDetailModal';
import { BarberDetailModal } from '@/src/public-booking/components/BarberDetailModal';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';

type TabId = 'services' | 'barbers' | 'hours' | 'location';

interface Tab {
  id: TabId;
  label: string;
  badge?: number;
}

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

function ScissorsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function getTabs(barbershop: BarbershopInfo, dict: unknown): Tab[] {
  const tabs: Tab[] = [];

  if (barbershop.openHours.length > 0) {
    tabs.push({ id: 'hours', label: t(dict, 'barbershopPage.hours') });
  }

  tabs.push(
    { id: 'services', label: t(dict, 'barbershopPage.services'), badge: barbershop.services.length || undefined },
    { id: 'barbers', label: t(dict, 'barbershopPage.barbers'), badge: barbershop.barbers.length || undefined }
  );

  if (barbershop.address) {
    tabs.push({ id: 'location', label: t(dict, 'barbershopPage.location') });
  }

  return tabs;
}

interface BarbershopTabsProps {
  slug: string;
  barbershop: BarbershopInfo;
  status: { isOpen: boolean; label: string };
  today: number;
  dict: unknown;
}

export function BarbershopTabs({ slug, barbershop, status, today, dict }: BarbershopTabsProps) {
  const tabs = getTabs(barbershop, dict);
  const router = useRouter();
  const { reset } = usePublicBooking();
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id || 'services');
  const [modalService, setModalService] = useState<PublicService | null>(null);
  const [modalBarber, setModalBarber] = useState<PublicBarber | null>(null);

  const initial = barbershop.name.charAt(0).toUpperCase();
  const statusLabel = status.isOpen ? t(dict, 'barbershopPage.open') : t(dict, 'barbershopPage.closed');
  const dictDays = (dict as Record<string, unknown>).barbershopPage as Record<string, unknown> | undefined;
  const dayLabels: string[] = (dictDays?.days as string[]) ?? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen flex flex-col pb-28 bg-[var(--paper)]">
      {/* Hero */}
      <div className="flex flex-col items-center px-4 pt-12 pb-6">
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            {barbershop.logoUrl ? (
              <Image
                src={barbershop.logoMed ?? barbershop.logoUrl}
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
                {statusLabel}
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
          <nav aria-label={t(dict, 'barbershopPage.services')} className="flex gap-1 -mb-px overflow-x-auto no-scrollbar">
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
              <h2 className="sr-only">{t(dict, 'barbershopPage.services')}</h2>
              {barbershop.services.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {barbershop.services.map((svc) => {
                    const hasDiscount = svc.discount != null && svc.discount > 0;
                    const finalPrice = hasDiscount
                      ? Math.round(svc.price * (1 - svc.discount! / 100))
                      : svc.price;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => setModalService(svc)}
                        className="group text-left rounded-2xl bg-[var(--paper)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] pressable"
                      >
                        <div className="relative aspect-square w-full bg-[var(--border-soft)]">
                          {svc.imageUrl ? (
                            <Image
                              src={svc.imageThumb ?? svc.imageUrl}
                              alt={svc.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 220px"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[var(--accent)]/30 flex items-center justify-center">
                              <ScissorsIcon className="w-8 h-8 text-[var(--ink-muted)]" />
                            </div>
                          )}
                          {svc.duration != null && svc.duration > 0 && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-[var(--ink-soft)] shadow-sm">
                              {svc.duration} min
                            </span>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-sm text-[var(--ink)] line-clamp-1 mb-0.5">
                            {svc.name}
                          </h3>
                          <p className="text-[11px] text-[var(--ink-soft)] line-clamp-2 mb-2 h-8 leading-4">
                            {svc.description || t(dict, 'barbershopPage.noDescription')}
                          </p>
                          <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-[var(--accent-dark)] tabular-nums">
                                {formatPrice(finalPrice)}
                              </span>
                              {hasDiscount && (
                                <span className="text-[10px] line-through text-[var(--ink-muted)] tabular-nums">
                                  {formatPrice(svc.price)}
                                </span>
                              )}
                            </div>
                            <span className="w-6 h-6 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent-dark)] opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRightIcon className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  <p className="text-sm text-[var(--ink-muted)]">
                    {t(dict, 'barbershopPage.servicesComingSoon')}
                  </p>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    {t(dict, 'barbershopPage.contactShop')}
                  </p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'barbers' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">{t(dict, 'barbershopPage.barbers')}</h2>
              {barbershop.barbers.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {barbershop.barbers.map((barber) => {
                    const barberInitial = barber.name.charAt(0).toUpperCase();
                    return (
                      <button
                        key={barber.id}
                        onClick={() => setModalBarber(barber)}
                        className="group flex items-center gap-4 p-3 text-left rounded-2xl bg-[var(--paper)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] pressable"
                      >
                        {barber.avatarUrl ? (
                          <Image
                            src={barber.avatarThumb ?? barber.avatarUrl}
                            alt={barber.name}
                            width={64}
                            height={64}
                            unoptimized
                            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-[var(--shadow-sm)]"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[var(--accent)]/30 shadow-[var(--shadow-sm)]">
                            <span className="text-xl font-bold text-[var(--ink)]">
                              {barberInitial}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0 py-0.5">
                          <span className="font-semibold text-sm text-[var(--ink)] block truncate mb-0.5">
                            {barber.name}
                          </span>
                          <p className="text-xs text-[var(--ink-soft)] line-clamp-2 leading-relaxed">
                            {barber.bio || t(dict, 'barbershopPage.noBio')}
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-[var(--ink-muted)] flex-shrink-0 group-hover:text-[var(--accent-dark)] transition-colors" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  <p className="text-sm text-[var(--ink-muted)]">
                    {t(dict, 'barbershopPage.teamComingSoon')}
                  </p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'hours' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">{t(dict, 'barbershopPage.hours')}</h2>
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
                        {dayLabels[day.dayOfWeek]}
                      </span>
                      <span
                        className={`text-sm tabular-nums ${
                          day.isOpen ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)] italic'
                        }`}
                      >
                        {day.isOpen
                          ? `${day.openTime} - ${day.closeTime}`
                          : statusLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === 'location' && (
            <section className="animate-fade-in">
              <h2 className="sr-only">{t(dict, 'barbershopPage.location')}</h2>
              {barbershop.address ? (
                <div className="rounded-2xl p-5 bg-[var(--cream)] border border-[var(--border-soft)]">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5" aria-hidden="true">{'\uD83D\uDCCD'}</span>
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
                        {t(dict, 'barbershopPage.openInMaps')}
                        <span aria-hidden="true">{'\u2197'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  <p className="text-sm text-[var(--ink-muted)]">
                    {t(dict, 'barbershopPage.addressNotAvailable')}
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
          <button
            onClick={() => { reset(); router.push(`/${slug}/booking`); }}
            className="block w-full py-3.5 text-center rounded-xl font-semibold text-sm bg-white text-[var(--accent-dark)] border-2 border-[var(--accent)] pressable shadow-[var(--shadow-sm)]"
          >
            {t(dict, 'barbershopPage.bookNow')}
          </button>
        </div>
      </div>

      {/* Footer badge */}
      <div className="py-4 text-center mt-auto">
        <span className="text-xs text-[var(--ink-muted)]">
          {t(dict, 'barbershopPage.poweredBy')}{' '}
          <span className="font-semibold text-[var(--accent-dark)]">
            cukkr
          </span>
        </span>
      </div>

      {/* Modals */}
      {modalService && (
        <ServiceDetailModal
          service={modalService}
          slug={slug}
          dict={dict}
          onClose={() => setModalService(null)}
        />
      )}
      {modalBarber && (
        <BarberDetailModal
          barber={modalBarber}
          slug={slug}
          dict={dict}
          onClose={() => setModalBarber(null)}
        />
      )}
    </div>
  );
}
