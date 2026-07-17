'use client';

interface BookingHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  step?: number;
  totalSteps?: number;
}

export function BookingHeader({ title, subtitle, onBack, step, totalSteps }: BookingHeaderProps) {
  const showProgress = step !== undefined && totalSteps !== undefined;
  const progress = showProgress ? (step / totalSteps) * 100 : 0;

  return (
    <div className="sticky top-0 z-10 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--ink)] hover:bg-[var(--cream)] transition-colors pressable"
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {showProgress && (
          <span className="text-sm font-medium text-[var(--ink-muted)] tabular-nums">
            {step} / {totalSteps}
          </span>
        )}
      </div>

      {showProgress && (
        <div className="h-1 bg-[var(--border-soft)]">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showProgress && <div className="h-px bg-[var(--border)]" />}

      <div className="px-4 py-4">
        <h1 className="text-xl font-bold text-[var(--ink)] text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-1 text-[var(--ink-soft)]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
