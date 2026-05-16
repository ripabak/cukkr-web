'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePublicBooking } from '@/src/public-booking/context/PublicBookingContext';
import {
  usePublicFormData,
  useValidatePin,
  useCreatePublicWalkIn,
} from '@/src/public-booking/hooks';
import { BookingHeader } from '@/src/public-booking/components/BookingHeader';
import { PinInput } from '@/src/public-booking/components/PinInput';
import { ServiceSelector } from '@/src/public-booking/components/ServiceSelector';
import { BarberSelector } from '@/src/public-booking/components/BarberSelector';

type Step = 'pin' | 'identity' | 'details' | 'recap' | 'success';

const ORDERED: Step[] = ['pin', 'identity', 'details', 'recap'];

const STEP_TITLES: Record<Step, string> = {
  pin: 'Masukkan PIN',
  identity: 'Identitas Diri',
  details: 'Detail Booking',
  recap: 'Konfirmasi Booking',
  success: '',
};

const STEP_SUBTITLES: Record<Step, string> = {
  pin: 'Minta PIN dari barber atau kasir',
  identity: 'Isi data dirimu',
  details: 'Pilih layanan dan barber',
  recap: 'Periksa detail sebelum mengirim',
  success: '',
};

function formatPrice(price: number) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

export default function WalkInPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const ctx = usePublicBooking();
  const { state, setPin, setValidationToken, updateIdentity, setServices, setBarber, setNotes, reset } = ctx;

  const [step, setStep] = useState<Step>('pin');
  const [pinError, setPinError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: formData, isLoading: formLoading } = usePublicFormData(slug);
  const validatePinMutation = useValidatePin(slug);
  const createWalkInMutation = useCreatePublicWalkIn(slug);

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

  const handlePinNext = async () => {
    if (state.pin.length < 4) return;
    setPinError(null);
    try {
      const result = await validatePinMutation.mutateAsync(state.pin);
      setValidationToken(result.validationToken);
      setStep('identity');
    } catch (err: any) {
      setPinError(err.message || 'PIN tidak valid. Coba lagi.');
    }
  };

  const handleIdentityNext = () => {
    if (!state.identity.name.trim()) return;
    setStep('details');
  };

  const handleDetailsNext = () => {
    if (state.serviceIds.length === 0) return;
    setStep('recap');
  };

  const handleSubmit = async () => {
    if (!state.validationToken) return;
    setSubmitError(null);
    try {
      await createWalkInMutation.mutateAsync({
        validationToken: state.validationToken,
        customerName: state.identity.name.trim(),
        customerPhone: state.identity.phone?.trim() || null,
        serviceIds: state.serviceIds,
        barberId: state.barberId,
        notes: state.notes?.trim() || null,
      });
      setStep('success');
    } catch (err: any) {
      setSubmitError(err.message || 'Gagal membuat booking. Coba lagi.');
    }
  };

  const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);

  // ── Success ──────────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="w-full max-w-sm text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#f0fdf4' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20L16 28L32 12" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
            Booking Berhasil!
          </h1>
          <p className="text-sm mb-8" style={{ color: '#6b7280' }}>
            Kamu sudah terdaftar sebagai walk-in. Silakan menunggu giliran.
          </p>
          <div
            className="rounded-2xl p-4 mb-8 text-left"
            style={{ backgroundColor: '#f9f9f9' }}
          >
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: '#6b7280' }}>Nama</span>
              <span className="font-medium" style={{ color: '#1a1a1a' }}>{state.identity.name}</span>
            </div>
            {state.identity.phone && (
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: '#6b7280' }}>HP</span>
                <span className="font-medium" style={{ color: '#1a1a1a' }}>{state.identity.phone}</span>
              </div>
            )}
            {state.barberName && (
              <div className="flex justify-between text-sm">
                <span style={{ color: '#6b7280' }}>Barber</span>
                <span className="font-medium" style={{ color: '#1a1a1a' }}>{state.barberName}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => { reset(); router.push(`/${slug}`); }}
            className="w-full py-4 rounded-2xl font-bold text-base"
            style={{ backgroundColor: '#ffc81e', color: '#1a1a1a' }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <BookingHeader
        title={STEP_TITLES[step]}
        subtitle={STEP_SUBTITLES[step]}
        onBack={handleBack}
        step={currentStepNumber}
        totalSteps={ORDERED.length}
      />

      <div className="flex-grow px-4 py-6 max-w-sm mx-auto w-full">

        {/* ── PIN step ─────────────────────────────────────────────────────────── */}
        {step === 'pin' && (
          <div className="flex flex-col gap-6">
            <PinInput
              value={state.pin}
              onChange={setPin}
              disabled={validatePinMutation.isPending}
              hasError={!!pinError}
            />
            {pinError && (
              <p className="text-sm text-center" style={{ color: '#ef4444' }}>
                {pinError}
              </p>
            )}
            <button
              onClick={handlePinNext}
              disabled={state.pin.length < 4 || validatePinMutation.isPending}
              className="w-full py-4 rounded-2xl font-bold text-base transition-opacity"
              style={{
                backgroundColor: '#ffc81e',
                color: '#1a1a1a',
                opacity: state.pin.length < 4 || validatePinMutation.isPending ? 0.5 : 1,
              }}
            >
              {validatePinMutation.isPending ? 'Memverifikasi...' : 'Verifikasi PIN'}
            </button>
          </div>
        )}

        {/* ── Identity step ────────────────────────────────────────────────────── */}
        {step === 'identity' && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Nama Lengkap <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Ahmad Fauzi"
                value={state.identity.name}
                onChange={e => updateIdentity({ name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ border: '2px solid #ebebeb', color: '#1a1a1a', backgroundColor: '#ffffff' }}
                onFocus={e => (e.target.style.borderColor = '#ffc81e')}
                onBlur={e => (e.target.style.borderColor = '#ebebeb')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>
                Nomor HP <span className="text-xs font-normal" style={{ color: '#9ca3af' }}>(opsional)</span>
              </label>
              <input
                type="tel"
                placeholder="Contoh: 081234567890"
                value={state.identity.phone}
                onChange={e => updateIdentity({ phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ border: '2px solid #ebebeb', color: '#1a1a1a', backgroundColor: '#ffffff' }}
                onFocus={e => (e.target.style.borderColor = '#ffc81e')}
                onBlur={e => (e.target.style.borderColor = '#ebebeb')}
              />
            </div>
            <button
              onClick={handleIdentityNext}
              disabled={!state.identity.name.trim()}
              className="w-full py-4 rounded-2xl font-bold text-base mt-2 transition-opacity"
              style={{
                backgroundColor: '#ffc81e',
                color: '#1a1a1a',
                opacity: !state.identity.name.trim() ? 0.5 : 1,
              }}
            >
              Lanjut
            </button>
          </div>
        )}

        {/* ── Details step ─────────────────────────────────────────────────────── */}
        {step === 'details' && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: '#1a1a1a' }}>
                Pilih Layanan <span style={{ color: '#ef4444' }}>*</span>
              </p>
              {formLoading ? (
                <div className="text-sm" style={{ color: '#9ca3af' }}>Memuat layanan...</div>
              ) : formData?.services?.length ? (
                <ServiceSelector
                  services={formData.services}
                  selected={state.selectedServices}
                  onChange={setServices}
                />
              ) : (
                <div className="text-sm" style={{ color: '#9ca3af' }}>Tidak ada layanan tersedia.</div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: '#1a1a1a' }}>
                Pilih Barber <span className="text-xs font-normal" style={{ color: '#9ca3af' }}>(opsional)</span>
              </p>
              {formLoading ? (
                <div className="text-sm" style={{ color: '#9ca3af' }}>Memuat barber...</div>
              ) : (
                <BarberSelector
                  barbers={formData?.barbers ?? []}
                  selectedId={state.barberId}
                  onChange={setBarber}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1a1a1a' }}>
                Catatan <span className="text-xs font-normal" style={{ color: '#9ca3af' }}>(opsional)</span>
              </label>
              <textarea
                placeholder="Contoh: Potongan rapi sesuai foto"
                value={state.notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                style={{ border: '2px solid #ebebeb', color: '#1a1a1a', backgroundColor: '#ffffff' }}
                onFocus={e => (e.target.style.borderColor = '#ffc81e')}
                onBlur={e => (e.target.style.borderColor = '#ebebeb')}
              />
            </div>

            <button
              onClick={handleDetailsNext}
              disabled={state.serviceIds.length === 0}
              className="w-full py-4 rounded-2xl font-bold text-base transition-opacity"
              style={{
                backgroundColor: '#ffc81e',
                color: '#1a1a1a',
                opacity: state.serviceIds.length === 0 ? 0.5 : 1,
              }}
            >
              Lanjut
            </button>
          </div>
        )}

        {/* ── Recap step ───────────────────────────────────────────────────────── */}
        {step === 'recap' && (
          <div className="flex flex-col gap-5">
            {/* Identity */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#f9f9f9' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>
                Identitas
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: '#6b7280' }}>Nama</span>
                <span className="font-medium" style={{ color: '#1a1a1a' }}>{state.identity.name}</span>
              </div>
              {state.identity.phone && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#6b7280' }}>HP</span>
                  <span className="font-medium" style={{ color: '#1a1a1a' }}>{state.identity.phone}</span>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#f9f9f9' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>
                Layanan
              </p>
              {state.selectedServices.map(s => (
                <div key={s.id} className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#1a1a1a' }}>{s.name}</span>
                  <span className="font-medium" style={{ color: '#1a1a1a' }}>{formatPrice(s.price)}</span>
                </div>
              ))}
              <div
                className="flex justify-between text-sm font-bold pt-2 mt-1"
                style={{ borderTop: '1px solid #ebebeb' }}
              >
                <span style={{ color: '#1a1a1a' }}>Total</span>
                <span style={{ color: '#e6b80b' }}>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Barber & Notes */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#f9f9f9' }}>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: '#6b7280' }}>Barber</span>
                <span className="font-medium" style={{ color: '#1a1a1a' }}>
                  {state.barberName || 'Barber Mana Saja'}
                </span>
              </div>
              {state.notes && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#6b7280' }}>Catatan</span>
                  <span className="font-medium text-right max-w-[60%]" style={{ color: '#1a1a1a' }}>
                    {state.notes}
                  </span>
                </div>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-center px-2" style={{ color: '#ef4444' }}>
                {submitError}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={createWalkInMutation.isPending}
              className="w-full py-4 rounded-2xl font-bold text-base transition-opacity"
              style={{
                backgroundColor: '#ffc81e',
                color: '#1a1a1a',
                opacity: createWalkInMutation.isPending ? 0.6 : 1,
              }}
            >
              {createWalkInMutation.isPending ? 'Membuat Booking...' : 'Buat Booking'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
