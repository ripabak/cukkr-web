'use client';

import { useState } from 'react';
import { t } from '@/src/lib/i18n/client';

interface PublicIdentityFormProps {
  name: string;
  email: string;
  emailRequired: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onContinue: () => void;
  dict: unknown;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PublicIdentityForm({
  name,
  email,
  emailRequired,
  onNameChange,
  onEmailChange,
  onContinue,
  dict,
}: PublicIdentityFormProps) {
  const [touched, setTouched] = useState({ name: false, email: false });

  const emailValid = emailRequired ? EMAIL_REGEX.test(email.trim()) : email.trim() === '' || EMAIL_REGEX.test(email.trim());
  const nameValid = name.trim().length >= 2;

  const disabled = emailRequired
    ? !nameValid || !emailValid
    : !nameValid || (!emailValid && email.trim() !== '');

  const showEmailError = touched.email && !emailValid;

  const handleContinue = () => {
    setTouched({ name: true, email: true });
    if (!disabled) onContinue();
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium mb-1.5 text-[var(--ink)]" htmlFor="customer-name">
          {t(dict, 'booking.steps.fullName')} <span className="text-[#ef4444]">*</span>
        </label>
        <input
          id="customer-name"
          type="text"
          placeholder={t(dict, 'booking.steps.namePlaceholder')}
          value={name}
          onChange={e => onNameChange(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 text-[var(--ink)] bg-[var(--paper)] placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] ${
            touched.name && !nameValid ? 'border-[#ef4444]' : 'border-[var(--border)]'
          }`}
        />
        {touched.name && !nameValid && (
          <p className="mt-1.5 text-xs text-[#ef4444]">{t(dict, 'booking.steps.nameError')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5 text-[var(--ink)]" htmlFor="customer-email">
          {t(dict, 'booking.steps.emailLabel')} {emailRequired ? <span className="text-[#ef4444]">*</span> : <span className="text-xs font-normal text-[var(--ink-muted)]">{t(dict, 'booking.steps.emailOptional')}</span>}
        </label>
        <input
          id="customer-email"
          type="email"
          placeholder={t(dict, 'booking.steps.emailPlaceholder')}
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
          className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 text-[var(--ink)] bg-[var(--paper)] placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] ${
            showEmailError ? 'border-[#ef4444]' : 'border-[var(--border)]'
          }`}
        />
        {showEmailError && (
          <p className="mt-1.5 text-xs text-[#ef4444]">{t(dict, 'booking.steps.emailError')}</p>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={disabled}
        className="w-full py-4 rounded-xl font-semibold text-base mt-2 transition-all bg-[var(--accent)] text-[var(--ink)] disabled:opacity-40 disabled:hover:translate-y-0 pressable"
      >
        {t(dict, 'booking.steps.continue')}
      </button>
    </div>
  );
}
