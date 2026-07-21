import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBarbershopInfo, OpenHoursDay } from '@/src/public-booking/actions/booking.actions';
import { getDictionary } from '@/src/lib/i18n';
import { BarberShopPageClient } from './page.client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const barbershop = await getBarbershopInfo(slug);
    const title = `${barbershop.name} — Book at cukkr.com`;
    const description =
      barbershop.description?.slice(0, 160) ||
      `Book your appointment or join the walk-in queue at ${barbershop.name}.`;

    const ogImage = barbershop.logoUrl
      ? { url: barbershop.logoMed ?? barbershop.logoUrl, width: 512, height: 512, alt: barbershop.name }
      : undefined;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        siteName: 'Cukkr',
        type: 'website',
        images: ogImage ? [ogImage] : undefined,
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: ogImage ? [ogImage.url] : undefined,
      },
    };
  } catch {
    return {
      title: 'Barbershop not found — Cukkr',
      description: 'The barbershop you are looking for does not exist.',
    };
  }
}

function getLocalBarbershopTime(timezone: string): {
  dayOfWeek: number;
  hours: number;
  minutes: number;
} {
  const now = new Date();
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  let dayOfWeek = now.getDay();
  let hours = 0;
  let minutes = 0;
  for (const p of parts) {
    if (p.type === 'weekday') dayOfWeek = dayMap[p.value] ?? dayOfWeek;
    else if (p.type === 'hour') hours = parseInt(p.value);
    else if (p.type === 'minute') minutes = parseInt(p.value);
  }

  return { dayOfWeek, hours, minutes };
}

function getCurrentDayStatus(openHours: OpenHoursDay[], timezone: string): {
  isOpen: boolean;
  label: string;
} {
  const local = getLocalBarbershopTime(timezone);
  const todayHours = openHours.find((h) => h.dayOfWeek === local.dayOfWeek);

  if (!todayHours || !todayHours.isOpen || !todayHours.openTime || !todayHours.closeTime) {
    return { isOpen: false, label: 'Closed' };
  }

  const currentMinutes = local.hours * 60 + local.minutes;
  const [openH, openM] = todayHours.openTime.split(':').map(Number);
  const [closeH, closeM] = todayHours.closeTime.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  return { isOpen, label: isOpen ? 'Open' : 'Closed' };
}

export default async function BarbershopLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = await getDictionary();

  let barbershop;
  try {
    barbershop = await getBarbershopInfo(slug);
  } catch {
    notFound();
  }

  const status = getCurrentDayStatus(barbershop.openHours, barbershop.timezone);
  const today = getLocalBarbershopTime(barbershop.timezone).dayOfWeek;

  return (
    <BarberShopPageClient
      slug={slug}
      barbershop={barbershop}
      status={status}
      today={today}
      dict={dict}
    />
  );
}
