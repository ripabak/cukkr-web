'use client';

import { PublicBookingProvider } from '@/src/public-booking/context/PublicBookingContext';

export function SlugProvider({ children }: { children: React.ReactNode }) {
  return <PublicBookingProvider>{children}</PublicBookingProvider>;
}
