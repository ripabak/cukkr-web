import { notFound } from 'next/navigation';
import { getFormData } from '@/src/public-booking/actions/booking.actions';
import { WalkInBooking } from '@/src/public-booking/components/WalkInBooking';

export default async function WalkInPage({
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

  return <WalkInBooking slug={slug} formData={formData} />;
}
