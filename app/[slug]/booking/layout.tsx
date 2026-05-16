import { BookingProviders } from '@/src/public-booking/components/BookingProviders';

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <BookingProviders>{children}</BookingProviders>;
}
