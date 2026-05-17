'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookingTypePage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Back button */}
      <div className="p-4">
        <Link
          href={`/${slug}`}
          className="inline-flex items-center justify-center w-9 h-9 text-[#1a1a1a] hover:text-[#ffc81e] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Center content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm text-center mb-10">
          <h1 className="text-2xl font-black tracking-tight text-[#1a1a1a] mb-2">
            How would you like to book?
          </h1>
          <p className="text-sm text-[#6b7280]">Choose your booking type to continue.</p>
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          {/* Walk-in */}
          <button
            onClick={() => router.push(`/${slug}/booking/walkin`)}
            className="flex-1 py-8 flex flex-col items-center gap-3 border-2 border-[#ebebeb] bg-white hover:border-[#ffc81e] hover:bg-[#fffbf0] transition-all duration-200 rounded-2xl"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="1.5" />
              <path d="M10 10l-2 5h3l1 4" />
              <path d="M14 10l2 5h-3" />
              <path d="M9.5 15l-1.5 4" />
            </svg>
            <div>
              <p className="text-sm font-black tracking-tight text-[#1a1a1a]">Walk-in</p>
              <p className="text-xs text-[#6b7280] mt-0.5">Come in now</p>
            </div>
          </button>

          {/* Appointment */}
          <button
            onClick={() => router.push(`/${slug}/booking/appointment`)}
            className="flex-1 py-8 flex flex-col items-center gap-3 border-2 border-[#ebebeb] bg-white hover:border-[#ffc81e] hover:bg-[#fffbf0] transition-all duration-200 rounded-2xl"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div>
              <p className="text-sm font-black tracking-tight text-[#1a1a1a]">Appointment</p>
              <p className="text-xs text-[#6b7280] mt-0.5">Book a time slot</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
