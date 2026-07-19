import { Suspense } from 'react';
import { getDictionary } from '@/src/lib/i18n';
import { IdentityVerifyClient } from './IdentityVerifyClient';

export default async function VerifyIdentityPage() {
  const dict = await getDictionary();
  return (
    <Suspense>
      <IdentityVerifyClient dict={dict} />
    </Suspense>
  );
}
