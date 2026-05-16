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
    <div className="sticky top-0 z-10" style={{ backgroundColor: '#ffffff' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{ color: '#1a1a1a' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {showProgress && (
          <span className="text-sm" style={{ color: '#9ca3af' }}>
            {step} / {totalSteps}
          </span>
        )}
      </div>

      {showProgress && (
        <div style={{ height: 3, backgroundColor: '#f0f0f0' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#ffc81e',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}

      {!showProgress && <div style={{ height: 1, backgroundColor: '#ebebeb' }} />}

      <div className="px-4 py-4">
        <h1 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
