'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';
import { validatePin, createWalkIn } from '@/src/public-booking/actions/booking.actions';
import type { PublicFormData } from '@/src/public-booking/actions/booking.actions';
import { t } from '@/src/lib/i18n/client';
import { BookingHeader } from '@/src/public-booking/components/BookingHeader';
import { PinInput } from '@/src/public-booking/components/PinInput';
import { PublicIdentityForm } from '@/src/public-booking/components/PublicIdentityForm';
import { ServiceSelector } from '@/src/public-booking/components/ServiceSelector';
import { BarberSelector } from '@/src/public-booking/components/BarberSelector';

type Step = 'pin' | 'details' | 'identity' | 'recap' | 'success';

const ORDERED: Step[] = ['pin', 'details', 'identity', 'recap'];

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

interface Props {
  slug: string;
  formData: PublicFormData;
  dict: unknown;
}

export function WalkInBooking({ slug, formData, dict }: Props) {
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

  const stepTitles: Record<Step, string> = {
    pin: t(dict, 'booking.steps.pin'),
    details: t(dict, 'booking.steps.details'),
    identity: t(dict, 'booking.steps.identity'),
    recap: t(dict, 'booking.steps.recap'),
    success: '',
  };
  const stepSubtitles: Record<Step, string> = {
    pin: t(dict, 'booking.steps.pinSub'),
    details: t(dict, 'booking.steps.detailsSub'),
    identity: t(dict, 'booking.steps.identitySub'),
    recap: t(dict, 'booking.steps.recapSub'),
    success: '',
  };

  const handleBack = () => {
    setPinError(null);
    setSubmitError(null);
    const idx = ORDERED.indexOf(step);
    if (idx <= 0) {
      router.push(`/${slug}/booking`);
    } else {
      setStep(ORDERED[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : t(dict, 'booking.walkIn.invalidPin');
        setPinError(message);
      }
    });
  };

  const handleDetailsNext = () => {
    if (state.serviceIds.length === 0) return;
    setStep('identity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIdentityNext = () => {
    if (!state.identity.name.trim()) return;
    setStep('recap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!state.validationToken) return;
    setSubmitError(null);
    startSubmitTransition(async () => {
      try {
        await createWalkIn(slug, {
          validationToken: state.validationToken!,
          customerName: state.identity.name.trim(),
          customerEmail: state.identity.email?.trim() || null,
          serviceIds: state.serviceIds,
          barberId: state.barberId,
          notes: state.notes?.trim() || null,
        });
        setStep('success');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : t(dict, 'booking.error.walkInSubmit');
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
          <h1 className="text-2xl font-bold mb-2 text-[var(--ink)]">{t(dict, 'booking.walkIn.successTitle')}</h1>
          <p className="text-sm mb-8 text-[var(--ink-soft)]">{t(dict, 'booking.walkIn.successDesc')}</p>
          <div className="rounded-2xl p-4 mb-8 text-left bg-[var(--cream)] border border-[var(--border-soft)]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--ink-muted)]">{t(dict, 'booking.recap.name')}</span>
              <span className="font-medium text-[var(--ink)]">{state.identity.name}</span>
            </div>
            {state.identity.email && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-muted)]">{t(dict, 'booking.recap.email')}</span>
                <span className="font-medium text-[var(--ink)]">{state.identity.email}</span>
              </div>
            )}
            {state.barberName && (
              <div className="flex justify-between text-sm">
                <span className="text-[var(--ink-muted)]">{t(dict, 'booking.recap.barber')}</span>
                <span className="font-medium text-[var(--ink)]">{state.barberName}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => { reset(); router.push(`/${slug}`); }}
            className="w-full py-4 rounded-xl font-semibold text-base bg-[var(--accent)] text-[var(--ink)] pressable shadow-[var(--shadow-accent)]"
          >
            {t(dict, 'booking.walkIn.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)]">
      <BookingHeader
        title={stepTitles[step]}
        subtitle={stepSubtitles[step]}
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
              className="w-full py-4 rounded-xl font-semibold text-base transition-all bg-[var(--accent)] text-[var(--ink)] disabled:opacity-40 disabled:hover:translate-y-0 pressable shadow-[var(--shadow-accent)]"
            >
              {isPinPending ? t(dict, 'booking.steps.verifying') : t(dict, 'booking.steps.verify')}
            </button>
          </div>
        )}

        {step === 'details' && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold mb-3 text-[var(--ink)]">
                {t(dict, 'booking.steps.serviceLabel')} <span className="text-[#ef4444]">*</span>
              </p>
              {formData.services.length ? (
                <ServiceSelector
                  services={formData.services}
                  selected={state.selectedServices}
                  onChange={setServices}
                />
              ) : (
                <div className="text-sm text-[var(--ink-muted)] p-4 rounded-xl bg-[var(--cream)] border border-[var(--border-soft)]">
                  {t(dict, 'booking.steps.noServices')}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-[var(--ink)]">
                {t(dict, 'booking.steps.barberLabel')} <span className="text-xs font-normal text-[var(--ink-muted)]">{t(dict, 'booking.steps.barberOptional')}</span>
              </p>
              <BarberSelector
                barbers={formData.barbers}
                selectedId={state.barberId}
                onChange={setBarber}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-[var(--ink)]" htmlFor="walkin-notes">
                {t(dict, 'booking.steps.notesLabel')} <span className="text-xs font-normal text-[var(--ink-muted)]">{t(dict, 'booking.steps.notesOptional')}</span>
              </label>
              <textarea
                id="walkin-notes"
                placeholder={t(dict, 'booking.steps.notesPlaceholder')}
                value={state.notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none border-2 border-[var(--border)] text-[var(--ink)] bg-[var(--paper)] focus:border-[var(--accent)] placeholder:text-[var(--ink-muted)]"
              />
            </div>

            <button
              onClick={handleDetailsNext}
              disabled={state.serviceIds.length === 0}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all bg-[var(--accent)] text-[var(--ink)] disabled:opacity-40 disabled:hover:translate-y-0 pressable shadow-[var(--shadow-accent)]"
            >
              {t(dict, 'booking.steps.continue')}
            </button>
          </div>
        )}

        {step === 'identity' && (
          <PublicIdentityForm
            name={state.identity.name}
            email={state.identity.email}
            emailRequired={false}
            onNameChange={value => updateIdentity({ name: value })}
            onEmailChange={value => updateIdentity({ email: value })}
            onContinue={handleIdentityNext}
            dict={dict}
          />
        )}

        {step === 'recap' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-4 bg-[var(--cream)] border border-[var(--border-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--ink-muted)]">
                {t(dict, 'booking.recap.services')}
              </p>
              {state.selectedServices.map(s => (
                <div key={s.id} className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--ink)]">{s.name}</span>
                  <span className="font-medium text-[var(--ink)] tabular-nums">{formatPrice(s.price)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold pt-2 mt-1 border-t border-[var(--border)]">
                <span className="text-[var(--ink)]">{t(dict, 'booking.walkIn.total')}</span>
                <span className="text-[var(--accent-dark)] tabular-nums">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-[var(--cream)] border border-[var(--border-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--ink-muted)]">
                {t(dict, 'booking.walkIn.preferences')}
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-soft)]">{t(dict, 'booking.recap.barber')}</span>
                <span className="font-medium text-[var(--ink)]">
                  {state.barberName || t(dict, 'booking.walkIn.anyBarber')}
                </span>
              </div>
              {state.notes && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--ink-soft)]">{t(dict, 'booking.recap.notes')}</span>
                  <span className="font-medium text-right max-w-[60%] text-[var(--ink)]">
                    {state.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl p-4 bg-[var(--cream)] border border-[var(--border-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--ink-muted)]">
                {t(dict, 'booking.walkIn.yourDetails')}
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-soft)]">{t(dict, 'booking.recap.name')}</span>
                <span className="font-medium text-[var(--ink)]">{state.identity.name}</span>
              </div>
              {state.identity.email && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--ink-soft)]">{t(dict, 'booking.recap.email')}</span>
                  <span className="font-medium text-[var(--ink)]">{state.identity.email}</span>
                </div>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-center px-2 text-[#ef4444]">{submitError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitPending}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all bg-[var(--accent)] text-[var(--ink)] disabled:opacity-60 disabled:hover:translate-y-0 pressable shadow-[var(--shadow-accent)]"
            >
              {isSubmitPending ? t(dict, 'booking.walkIn.checkingIn') : t(dict, 'booking.walkIn.confirmWalkIn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
