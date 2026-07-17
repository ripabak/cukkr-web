'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';
import {
  createAppointment,
  getDateAvailability,
  type DateAvailability,
} from '@/src/public-booking/actions/booking.actions';
import type { PublicFormData } from '@/src/public-booking/actions/booking.actions';
import { BookingHeader } from '@/src/public-booking/components/BookingHeader';
import { PublicIdentityForm } from '@/src/public-booking/components/PublicIdentityForm';
import { ServiceSelector } from '@/src/public-booking/components/ServiceSelector';
import { BarberSelector } from '@/src/public-booking/components/BarberSelector';

type Step = 'details' | 'identity' | 'recap' | 'success';

const ORDERED: Step[] = ['details', 'identity', 'recap'];

const STEP_TITLES: Record<Step, string> = {
  details: 'Booking details',
  identity: 'Your information',
  recap: 'Review booking',
  success: '',
};

const STEP_SUBTITLES: Record<Step, string> = {
  details: 'Choose your service, barber, and schedule',
  identity: 'Just a few details about you',
  recap: 'Check everything before confirming',
  success: '',
};

const SLOT_INTERVAL = 30;

function generateTimeSlots(openTime: string, closeTime: string): string[] {
  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);
  const slots: string[] = [];
  let cur = openH * 60 + openM;
  const end = closeH * 60 + closeM;
  while (cur < end) {
    const h = Math.floor(cur / 60).toString().padStart(2, '0');
    const m = (cur % 60).toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
    cur += SLOT_INTERVAL;
  }
  return slots;
}

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

function formatDisplayDateTime(date: string, time: string) {
  if (!date) return '';
  const dateObj = new Date(`${date}T${time || '00:00'}`);
  return (
    dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + (time ? `, ${time}` : '')
  );
}

interface Props {
  slug: string;
  formData: PublicFormData;
}

export function AppointmentBooking({ slug, formData }: Props) {
  const router = useRouter();
  const { state, updateIdentity, setServices, setBarber, setNotes, setScheduledAt, reset } =
    usePublicBooking();

  const [step, setStep] = useState<Step>('details');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [availability, setAvailability] = useState<DateAvailability | null>(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const stepIndex = ORDERED.indexOf(step);
  const currentStepNumber = stepIndex === -1 ? ORDERED.length : stepIndex + 1;
  const todayStr = new Date().toISOString().split('T')[0];

  const timeSlots =
    availability?.isOpen && availability.openTime && availability.closeTime
      ? generateTimeSlots(availability.openTime, availability.closeTime)
      : [];

  const handleDateChange = async (date: string) => {
    setDateValue(date);
    setTimeValue('');
    setAvailability(null);
    if (!date) return;
    setIsLoadingAvailability(true);
    try {
      const result = await getDateAvailability(slug, date);
      setAvailability(result);
    } catch {
      setAvailability(null);
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  const handleBack = () => {
    setSubmitError(null);
    const idx = ORDERED.indexOf(step);
    if (idx <= 0) {
      router.push(`/${slug}/booking`);
    } else {
      setStep(ORDERED[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDetailsNext = () => {
    if (state.serviceIds.length === 0 || !dateValue || !timeValue) return;
    const iso = new Date(`${dateValue}T${timeValue}`).toISOString();
    setScheduledAt(iso, formatDisplayDateTime(dateValue, timeValue));
    setStep('identity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIdentityNext = () => {
    setStep('recap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!state.scheduledAt) return;
    setSubmitError(null);
    startSubmitTransition(async () => {
      try {
        await createAppointment(slug, {
          customerName: state.identity.name.trim(),
          customerEmail: state.identity.email.trim(),
          serviceIds: state.serviceIds,
          barberId: state.barberId,
          scheduledAt: state.scheduledAt!,
          notes: state.notes?.trim() || null,
        });
        setStep('success');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'We could not submit your booking. Please try again.';
        setSubmitError(message);
      }
    });
  };

  const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--paper)]">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#f0fdf4]">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M8 20L16 28L32 12" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[var(--ink)]">Appointment submitted</h1>
          <p className="text-sm mb-8 text-[var(--ink-soft)]">
            Check your email to confirm your appointment. Your booking will only be processed after verification.
          </p>
          <div className="rounded-2xl p-4 mb-8 text-left bg-[var(--cream)] border border-[var(--border-soft)]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--ink-muted)]">Name</span>
              <span className="font-medium text-[var(--ink)]">{state.identity.name}</span>
            </div>
            {state.displayDateTime && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-muted)]">Schedule</span>
                <span className="font-medium text-right max-w-[60%] text-[var(--ink)]">
                  {state.displayDateTime}
                </span>
              </div>
            )}
            {state.barberName && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--ink-muted)]">Barber</span>
                <span className="font-medium text-[var(--ink)]">{state.barberName}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => { reset(); router.push(`/${slug}`); }}
            className="w-full py-4 rounded-xl font-semibold text-base bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)]"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)]">
      <BookingHeader
        title={STEP_TITLES[step]}
        subtitle={STEP_SUBTITLES[step]}
        onBack={handleBack}
        step={currentStepNumber}
        totalSteps={ORDERED.length}
      />

      <div className="flex-grow px-4 py-6 max-w-sm mx-auto w-full">
        {step === 'details' && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold mb-3 text-[var(--ink)]">
                Service <span className="text-[#ef4444]">*</span>
              </p>
              {formData.services.length ? (
                <ServiceSelector
                  services={formData.services}
                  selected={state.selectedServices}
                  onChange={setServices}
                />
              ) : (
                <div className="text-sm text-[var(--ink-muted)] p-4 rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  No services available.
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-[var(--ink)]">
                Barber <span className="text-xs font-normal text-[var(--ink-muted)]">(optional)</span>
              </p>
              <BarberSelector
                barbers={formData.barbers}
                selectedId={state.barberId}
                onChange={setBarber}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-[var(--ink)]" htmlFor="booking-date">
                Date <span className="text-[#ef4444]">*</span>
              </label>
              <input
                id="booking-date"
                type="date"
                value={dateValue}
                min={todayStr}
                onChange={e => handleDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 border-[var(--border)] text-[var(--ink)] bg-[var(--paper)] focus:border-[var(--accent)]"
              />
            </div>

            {dateValue && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-[var(--ink)]">
                  Time <span className="text-[#ef4444]">*</span>
                </label>

                {isLoadingAvailability && (
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-10 rounded-xl bg-[var(--border-soft)] animate-pulse" />
                    ))}
                  </div>
                )}

                {!isLoadingAvailability && availability && !availability.isOpen && (
                  <div className="rounded-xl px-4 py-3 text-sm bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c]">
                    The shop is closed on this date. Please choose another date.
                  </div>
                )}

                {!isLoadingAvailability && timeSlots.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeValue(slot)}
                        className={`py-2 rounded-xl text-sm font-medium transition-all border-2 tabular-nums ${
                          timeValue === slot
                            ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--ink)]'
                            : 'bg-[var(--paper)] border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)]'
                        }`}
                        aria-pressed={timeValue === slot}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-[var(--ink)]" htmlFor="booking-notes">
                Notes <span className="text-xs font-normal text-[var(--ink-muted)]">(optional)</span>
              </label>
              <textarea
                id="booking-notes"
                placeholder="e.g. Clean fade, reference photo available"
                value={state.notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none border-2 border-[var(--border)] text-[var(--ink)] bg-[var(--paper)] focus:border-[var(--accent)] placeholder:text-[var(--ink-muted)]"
              />
            </div>

            <button
              onClick={handleDetailsNext}
              disabled={state.serviceIds.length === 0 || !dateValue || !timeValue}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all bg-[var(--accent)] text-[var(--ink)] disabled:opacity-40 disabled:hover:translate-y-0 pressable shadow-[var(--shadow-accent)]"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'identity' && (
          <PublicIdentityForm
            name={state.identity.name}
            email={state.identity.email}
            emailRequired
            onNameChange={value => updateIdentity({ name: value })}
            onEmailChange={value => updateIdentity({ email: value })}
            onContinue={handleIdentityNext}
          />
        )}

        {step === 'recap' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-4 bg-[var(--cream)] border border-[var(--border-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--ink-muted)]">
                Schedule & preferences
              </p>
              {state.displayDateTime && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--ink-soft)]">Date & time</span>
                  <span className="font-medium text-right max-w-[60%] text-[var(--ink)]">
                    {state.displayDateTime}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-soft)]">Barber</span>
                <span className="font-medium text-[var(--ink)]">
                  {state.barberName || 'Any available barber'}
                </span>
              </div>
              {state.notes && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--ink-soft)]">Notes</span>
                  <span className="font-medium text-right max-w-[60%] text-[var(--ink)]">
                    {state.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl p-4 bg-[var(--cream)] border border-[var(--border-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--ink-muted)]">
                Services
              </p>
              {state.selectedServices.map(s => (
                <div key={s.id} className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--ink)]">{s.name}</span>
                  <span className="font-medium text-[var(--ink)] tabular-nums">{formatPrice(s.price)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold pt-2 mt-1 border-t border-[var(--border)]">
                <span className="text-[var(--ink)]">Total</span>
                <span className="text-[var(--accent-dark)] tabular-nums">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[var(--cream)] border border-[var(--border-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--ink-muted)]">
                Your details
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-soft)]">Name</span>
                <span className="font-medium text-[var(--ink)]">{state.identity.name}</span>
              </div>
              {state.identity.email && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--ink-soft)]">Email</span>
                  <span className="font-medium text-[var(--ink)]">{state.identity.email}</span>
                </div>
              )}
            </div>

            <div className="rounded-xl p-3 text-sm flex items-start gap-3 bg-[var(--gold-surface)] border border-[var(--accent)]/30">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="var(--accent-dark)" strokeWidth="1.5" />
                <path d="M8 5v3.5" stroke="var(--accent-dark)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.75" fill="var(--accent-dark)" />
              </svg>
              <span className="text-[var(--ink-soft)]">
                Your appointment needs barber confirmation before it&apos;s active.
              </span>
            </div>

            {submitError && (
              <p className="text-sm text-center px-2 text-[#ef4444]">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitPending}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all bg-[var(--accent)] text-[var(--ink)] disabled:opacity-60 disabled:hover:translate-y-0 pressable shadow-[var(--shadow-accent)]"
            >
              {isSubmitPending ? 'Submitting...' : 'Confirm appointment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
