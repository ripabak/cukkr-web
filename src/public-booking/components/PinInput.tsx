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

  const digits = value.padEnd(4, '').split('').slice(0, 4);

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

  const borderColor = (i: number) => {
    if (hasError) return '#ef4444';
    if (digits[i]) return '#ffc81e';
    return '#ebebeb';
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {[0, 1, 2, 3].map(i => (
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
          className="w-14 h-16 text-center text-2xl font-bold rounded-xl outline-none transition-all"
          style={{
            border: `2px solid ${borderColor(i)}`,
            backgroundColor: digits[i] && digits[i] !== ' ' ? '#fff8e1' : '#f9f9f9',
            color: '#1a1a1a',
            caretColor: '#ffc81e',
          }}
          onFocus={e =>
            (e.target.style.border = `2px solid #ffc81e`)
          }
          onBlur={e =>
            (e.target.style.border = `2px solid ${borderColor(i)}`)
          }
        />
      ))}
    </div>
  );
}
