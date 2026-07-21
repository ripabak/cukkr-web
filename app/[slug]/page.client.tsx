'use client';

import { BarbershopTabs } from '@/src/public-booking/components/BarbershopTabs';
import type { BarbershopInfo } from '@/src/public-booking/actions/booking.actions';

interface BarberShopPageClientProps {
  slug: string;
  barbershop: BarbershopInfo;
  status: { isOpen: boolean; label: string };
  today: number;
  dict: unknown;
}

export function BarberShopPageClient({ slug, barbershop, status, today, dict }: BarberShopPageClientProps) {
  return (
    <BarbershopTabs
      slug={slug}
      barbershop={barbershop}
      status={status}
      today={today}
      dict={dict}
    />
  );
}
