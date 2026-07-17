'use client';

import { useRef } from 'react';

interface PinInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export function PinInput({ value, onChange, disabled, hasError }: PinInputProps) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const digits = value.padEnd(4, ' ').split('').slice(0, 4);

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const newDigits = [...digits];
    newDigits[index] = char.slice(-1);
    onChange(newDigits.join('').replace(/ /g, ''));
    if (char && index < 3) refs[index + 1].current?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join('').replace(/ /g, ''));
        refs[index - 1].current?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      refs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, 3);
    refs[focusIdx].current?.focus();
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {[0, 1, 2, 3].map(i => {
        const filled = digits[i] && digits[i] !== ' ';
        return (
          <input
            key={i}
            ref={refs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[i] === ' ' ? '' : digits[i]}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            disabled={disabled}
            className={`w-14 h-16 text-center text-2xl font-bold rounded-xl outline-none transition-all border-2 bg-[var(--paper)] text-[var(--ink)] caret-[var(--accent)] focus:border-[var(--accent)] ${
              hasError
                ? 'border-[#ef4444] bg-[#fef2f2]'
                : filled
                ? 'border-[var(--accent)] bg-[var(--gold-surface)]'
                : 'border-[var(--border)]'
            }`}
          />
        );
      })}
    </div>
  );
}
