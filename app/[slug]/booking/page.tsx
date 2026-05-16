'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookingTypePage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #ebebeb' }}>
        <div className="flex items-center px-4 py-3">
          <Link
            href={`/${slug}`}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#1a1a1a' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="px-4 pb-4">
          <h1 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>
            Pilih Tipe Booking
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            Pilih cara kamu ingin booking
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 p-4 max-w-sm mx-auto w-full mt-4">
        {/* Walk-in */}
        <button
          onClick={() => router.push(`/${slug}/booking/walkin`)}
          className="w-full p-5 rounded-2xl text-left flex items-start gap-4 transition-all group"
          style={{ border: '2px solid #ebebeb', backgroundColor: '#ffffff' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#ffc81e';
            (e.currentTarget as HTMLElement).style.backgroundColor = '#fff8e1';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#ebebeb';
            (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ backgroundColor: '#fff8e1' }}
          >
            🚶
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base" style={{ color: '#1a1a1a' }}>
                Walk-in
              </h2>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#9ca3af' }}>
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
              Langsung datang ke barbershop. Perlu PIN dari barber.
            </p>
          </div>
        </button>

        {/* Appointment */}
        <button
          onClick={() => router.push(`/${slug}/booking/appointment`)}
          className="w-full p-5 rounded-2xl text-left flex items-start gap-4 transition-all"
          style={{ border: '2px solid #ebebeb', backgroundColor: '#ffffff' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#ffc81e';
            (e.currentTarget as HTMLElement).style.backgroundColor = '#fff8e1';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#ebebeb';
            (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ backgroundColor: '#fff8e1' }}
          >
            📅
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base" style={{ color: '#1a1a1a' }}>
                Appointment
              </h2>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#9ca3af' }}>
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
              Buat janji temu untuk hari & waktu tertentu. Tanpa PIN.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
