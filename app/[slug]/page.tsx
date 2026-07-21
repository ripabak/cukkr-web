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

function getCurrentDayStatus(openHours: OpenHoursDay[]): {
  isOpen: boolean;
  label: string;
} {
  const now = new Date();
  const today = now.getDay();
  const todayHours = openHours.find((h) => h.dayOfWeek === today);

  if (!todayHours || !todayHours.isOpen || !todayHours.openTime || !todayHours.closeTime) {
    return { isOpen: false, label: 'Closed' };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
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

  const status = getCurrentDayStatus(barbershop.openHours);
  const today = new Date().getDay();

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
