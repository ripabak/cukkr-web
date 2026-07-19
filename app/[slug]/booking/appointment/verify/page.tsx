import { Suspense } from 'react';
import { getDictionary } from '@/src/lib/i18n';
import { AppointmentVerifyClient } from './AppointmentVerifyClient';

export default async function VerifyAppointmentPage() {
  const dict = await getDictionary();
  return (
    <Suspense>
      <AppointmentVerifyClient dict={dict} />
    </Suspense>
  );
}
