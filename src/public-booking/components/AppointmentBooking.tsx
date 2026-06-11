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
  details: 'Booking Details',
  identity: 'Your Information',
  recap: 'Review Booking',
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
      window.scrollTo(0, 0);
    }
  };

  const handleDetailsNext = () => {
    if (state.serviceIds.length === 0 || !dateValue || !timeValue) return;
    const iso = new Date(`${dateValue}T${timeValue}`).toISOString();
    setScheduledAt(iso, formatDisplayDateTime(dateValue, timeValue));
    setStep('identity');
    window.scrollTo(0, 0);
  };

  const handleIdentityNext = () => {
    setStep('recap');
    window.scrollTo(0, 0);
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
      } catch (err: any) {
        setSubmitError(err.message || 'Failed to submit booking. Please try again.');
      }
    });
  };

  const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#f0fdf4]">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20L16 28L32 12" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-black mb-2 text-[#1a1a1a]">Appointment Submitted!</h1>
          <p className="text-sm mb-8 text-[#6b7280]">
            Check your email to confirm your appointment. Your booking will only be processed after verification.
          </p>
          <div className="rounded-2xl p-4 mb-8 text-left bg-[#f9f9f9]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#6b7280]">Name</span>
              <span className="font-medium text-[#1a1a1a]">{state.identity.name}</span>
            </div>
            {state.displayDateTime && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6b7280]">Schedule</span>
                <span className="font-medium text-right max-w-[60%] text-[#1a1a1a]">
                  {state.displayDateTime}
                </span>
              </div>
            )}
            {state.barberName && (
              <div className="flex justify-between text-sm">
                <span className="text-[#6b7280]">Barber</span>
                <span className="font-medium text-[#1a1a1a]">{state.barberName}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => { reset(); router.push(`/${slug}`); }}
            className="w-full py-4 rounded-2xl font-black text-base bg-[#ffc81e] text-[#1a1a1a] hover:bg-[#e6b80b] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
              <p className="text-sm font-semibold mb-3 text-[#1a1a1a]">
                Service <span className="text-[#ef4444]">*</span>
              </p>
              {formData.services.length ? (
                <ServiceSelector
                  services={formData.services}
                  selected={state.selectedServices}
                  onChange={setServices}
                />
              ) : (
                <div className="text-sm text-[#9ca3af]">No services available.</div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-[#1a1a1a]">
                Barber <span className="text-xs font-normal text-[#9ca3af]">(optional)</span>
              </p>
              <BarberSelector
                barbers={formData.barbers}
                selectedId={state.barberId}
                onChange={setBarber}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-[#1a1a1a]">
                Date <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="date"
                value={dateValue}
                min={todayStr}
                onChange={e => handleDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 border-[#ebebeb] text-[#1a1a1a] bg-white focus:border-[#ffc81e]"
              />
            </div>

            {dateValue && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#1a1a1a]">
                  Time <span className="text-[#ef4444]">*</span>
                </label>

                {isLoadingAvailability && (
                  <div className="flex items-center gap-2 py-4 text-sm text-[#9ca3af]">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#d1d5db" strokeWidth="2" />
                      <path d="M8 2a6 6 0 0 1 6 6" stroke="#ffc81e" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Checking availability...
                  </div>
                )}

                {!isLoadingAvailability && availability && !availability.isOpen && (
                  <div className="rounded-xl px-4 py-3 text-sm bg-[#fef2f2] border border-[#fecaca] text-[#ef4444]">
                    Barbershop is closed on this date. Please choose another date.
                  </div>
                )}

                {!isLoadingAvailability && timeSlots.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeValue(slot)}
                        className={`py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                          timeValue === slot
                            ? 'bg-[#ffc81e] border-[#ffc81e] text-[#1a1a1a]'
                            : 'bg-white border-[#ebebeb] text-[#1a1a1a] hover:border-[#ffc81e]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-[#1a1a1a]">
                Notes <span className="text-xs font-normal text-[#9ca3af]">(optional)</span>
              </label>
              <textarea
                placeholder="e.g. Clean fade, reference photo available"
                value={state.notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none border-2 border-[#ebebeb] text-[#1a1a1a] bg-white focus:border-[#ffc81e]"
              />
            </div>

            <button
              onClick={handleDetailsNext}
              disabled={state.serviceIds.length === 0 || !dateValue || !timeValue}
              className="w-full py-4 rounded-2xl font-black text-base transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-40"
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
            <div className="rounded-2xl p-4 bg-[#f9f9f9]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[#9ca3af]">
                Schedule & Preferences
              </p>
              {state.displayDateTime && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6b7280]">Date & Time</span>
                  <span className="font-medium text-right max-w-[60%] text-[#1a1a1a]">
                    {state.displayDateTime}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6b7280]">Barber</span>
                <span className="font-medium text-[#1a1a1a]">
                  {state.barberName || 'Any available barber'}
                </span>
              </div>
              {state.notes && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Notes</span>
                  <span className="font-medium text-right max-w-[60%] text-[#1a1a1a]">
                    {state.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl p-4 bg-[#f9f9f9]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[#9ca3af]">
                Services
              </p>
              {state.selectedServices.map(s => (
                <div key={s.id} className="flex justify-between text-sm mb-2">
                  <span className="text-[#1a1a1a]">{s.name}</span>
                  <span className="font-medium text-[#1a1a1a]">{formatPrice(s.price)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-black pt-2 mt-1 border-t border-[#ebebeb]">
                <span className="text-[#1a1a1a]">Total</span>
                <span className="text-[#e6b80b]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[#f9f9f9]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[#9ca3af]">
                Your Details
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6b7280]">Name</span>
                <span className="font-medium text-[#1a1a1a]">{state.identity.name}</span>
              </div>
              {state.identity.email && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Email</span>
                  <span className="font-medium text-[#1a1a1a]">{state.identity.email}</span>
                </div>
              )}
            </div>

            <div className="rounded-xl p-3 text-sm flex items-start gap-2 bg-[#fffbf0] border border-[#ffc81e]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#ffc81e" strokeWidth="1.5" />
                <path d="M8 5v3.5" stroke="#ffc81e" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.75" fill="#ffc81e" />
              </svg>
              <span className="text-[#6b7280]">
                Your appointment needs barber confirmation before it&apos;s active.
              </span>
            </div>

            {submitError && (
              <p className="text-sm text-center px-2 text-[#ef4444]">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitPending}
              className="w-full py-4 rounded-2xl font-black text-base transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-60"
            >
              {isSubmitPending ? 'Submitting...' : 'Confirm Appointment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
