'use client';

import { PublicBookingProvider } from '../context/PublicBookingContext';

export function BookingProviders({ children }: { children: React.ReactNode }) {
  return <PublicBookingProvider>{children}</PublicBookingProvider>;
}
