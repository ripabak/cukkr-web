import { notFound } from 'next/navigation';
import Link from 'next/link';
import { publicBookingService } from '@/src/public-booking/services/public-booking.service';

export default async function BarbershopLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let barbershop;
  try {
    barbershop = await publicBookingService.getBarbershopInfo(slug);
  } catch {
    notFound();
  }

  const initial = barbershop.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <main className="flex-grow flex flex-col items-center px-4 pt-14 pb-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            {barbershop.logoUrl ? (
              <img
                src={barbershop.logoUrl}
                alt={barbershop.name}
                className="w-24 h-24 rounded-3xl object-cover shadow-sm"
              />
            ) : (
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: '#ffc81e' }}
              >
                <span className="text-4xl font-bold" style={{ color: '#1a1a1a' }}>
                  {initial}
                </span>
              </div>
            )}
          </div>

          {/* Name & description */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
              {barbershop.name}
            </h1>
            {barbershop.description && (
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                {barbershop.description}
              </p>
            )}
          </div>

          {/* Info rows */}
          {(barbershop.address) && (
            <div
              className="rounded-2xl p-4 mb-8 flex flex-col gap-3"
              style={{ backgroundColor: '#f9f9f9' }}
            >
              {barbershop.address && (
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">📍</span>
                  <span className="text-sm" style={{ color: '#6b7280' }}>
                    {barbershop.address}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/${slug}/booking`}
            className="block w-full py-4 text-center rounded-2xl font-bold text-base transition-all"
            style={{ backgroundColor: '#ffc81e', color: '#1a1a1a' }}
          >
            Booking Sekarang
          </Link>
        </div>
      </main>

      {/* Footer badge */}
      <div className="py-4 text-center">
        <span className="text-xs" style={{ color: '#9ca3af' }}>
          Powered by{' '}
          <span className="font-semibold" style={{ color: '#ffc81e' }}>
            cukkr
          </span>
        </span>
      </div>
    </div>
  );
}
