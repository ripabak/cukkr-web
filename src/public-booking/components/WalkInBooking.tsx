'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';
import { validatePin, createWalkIn } from '@/src/public-booking/actions/booking.actions';
import type { PublicFormData } from '@/src/public-booking/actions/booking.actions';
import { BookingHeader } from '@/src/public-booking/components/BookingHeader';
import { PinInput } from '@/src/public-booking/components/PinInput';
import { ServiceSelector } from '@/src/public-booking/components/ServiceSelector';
import { BarberSelector } from '@/src/public-booking/components/BarberSelector';

type Step = 'pin' | 'details' | 'identity' | 'recap' | 'success';

const ORDERED: Step[] = ['pin', 'details', 'identity', 'recap'];

const STEP_TITLES: Record<Step, string> = {
  pin: 'Enter Shop PIN',
  details: 'Booking Details',
  identity: 'Your Information',
  recap: 'Review Booking',
  success: '',
};

const STEP_SUBTITLES: Record<Step, string> = {
  pin: 'Ask your barber for the 4-digit PIN',
  details: 'Choose your service and barber',
  identity: 'Just a few details about you',
  recap: 'Check everything before confirming',
  success: '',
};

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

interface Props {
  slug: string;
  formData: PublicFormData;
}

export function WalkInBooking({ slug, formData }: Props) {
  const router = useRouter();
  const { state, setPin, setValidationToken, updateIdentity, setServices, setBarber, setNotes, reset } =
    usePublicBooking();

  const [step, setStep] = useState<Step>('pin');
  const [pinError, setPinError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPinPending, startPinTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const stepIndex = ORDERED.indexOf(step);
  const currentStepNumber = stepIndex === -1 ? ORDERED.length : stepIndex + 1;

  const handleBack = () => {
    setPinError(null);
    setSubmitError(null);
    const idx = ORDERED.indexOf(step);
    if (idx <= 0) {
      router.push(`/${slug}/booking`);
    } else {
      setStep(ORDERED[idx - 1]);
    }
  };

  const handlePinNext = () => {
    if (state.pin.length < 4) return;
    setPinError(null);
    startPinTransition(async () => {
      try {
        const result = await validatePin(slug, state.pin);
        setValidationToken(result.validationToken);
        setStep('details');
      } catch (err: any) {
        setPinError(err.message || 'Invalid PIN. Please try again.');
      }
    });
  };

  const handleDetailsNext = () => {
    if (state.serviceIds.length === 0) return;
    setStep('identity');
  };

  const handleIdentityNext = () => {
    if (!state.identity.name.trim()) return;
    setStep('recap');
  };

  const handleSubmit = () => {
    if (!state.validationToken) return;
    setSubmitError(null);
    startSubmitTransition(async () => {
      try {
        await createWalkIn(slug, {
          validationToken: state.validationToken!,
          customerName: state.identity.name.trim(),
          customerPhone: state.identity.phone?.trim() || null,
          serviceIds: state.serviceIds,
          barberId: state.barberId,
          notes: state.notes?.trim() || null,
        });
        setStep('success');
      } catch (err: any) {
        setSubmitError(err.message || 'Failed to create booking. Please try again.');
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
          <h1 className="text-2xl font-black mb-2 text-[#1a1a1a]">You&apos;re checked in!</h1>
          <p className="text-sm mb-8 text-[#6b7280]">
            You&apos;re on the queue. Sit back and wait for your name.
          </p>
          <div className="rounded-2xl p-4 mb-8 text-left bg-[#f9f9f9]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#6b7280]">Name</span>
              <span className="font-medium text-[#1a1a1a]">{state.identity.name}</span>
            </div>
            {state.identity.phone && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6b7280]">Phone</span>
                <span className="font-medium text-[#1a1a1a]">{state.identity.phone}</span>
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

        {step === 'pin' && (
          <div className="flex flex-col gap-6">
            <PinInput
              value={state.pin}
              onChange={setPin}
              disabled={isPinPending}
              hasError={!!pinError}
            />
            {pinError && (
              <p className="text-sm text-center text-[#ef4444]">{pinError}</p>
            )}
            <button
              onClick={handlePinNext}
              disabled={state.pin.length < 4 || isPinPending}
              className="w-full py-4 rounded-2xl font-black text-base transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-40"
            >
              {isPinPending ? 'Verifying...' : 'Verify PIN'}
            </button>
          </div>
        )}

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
              disabled={state.serviceIds.length === 0}
              className="w-full py-4 rounded-2xl font-black text-base transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'identity' && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[#1a1a1a]">
                Full Name <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ahmad Fauzi"
                value={state.identity.name}
                onChange={e => updateIdentity({ name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 border-[#ebebeb] text-[#1a1a1a] bg-white focus:border-[#ffc81e]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[#1a1a1a]">
                Phone Number <span className="text-xs font-normal text-[#9ca3af]">(optional)</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 081234567890"
                value={state.identity.phone}
                onChange={e => updateIdentity({ phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 border-[#ebebeb] text-[#1a1a1a] bg-white focus:border-[#ffc81e]"
              />
            </div>
            <button
              onClick={handleIdentityNext}
              disabled={!state.identity.name.trim()}
              className="w-full py-4 rounded-2xl font-black text-base mt-2 transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'recap' && (
          <div className="flex flex-col gap-5">
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
                Preferences
              </p>
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
                Your Details
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6b7280]">Name</span>
                <span className="font-medium text-[#1a1a1a]">{state.identity.name}</span>
              </div>
              {state.identity.phone && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Phone</span>
                  <span className="font-medium text-[#1a1a1a]">{state.identity.phone}</span>
                </div>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-center px-2 text-[#ef4444]">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitPending}
              className="w-full py-4 rounded-2xl font-black text-base transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-60"
            >
              {isSubmitPending ? 'Checking in...' : 'Confirm Walk-in'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
