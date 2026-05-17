import { notFound } from 'next/navigation';
import { getFormData } from '@/src/public-booking/actions/booking.actions';
import { AppointmentBooking } from '@/src/public-booking/components/AppointmentBooking';

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let formData;
  try {
    formData = await getFormData(slug);
  } catch {
    notFound();
  }

  return <AppointmentBooking slug={slug} formData={formData} />;
}
