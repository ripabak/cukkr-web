import type { App } from '@/src/types/app';
import { treaty } from '@elysia/eden';

export const app = treaty<App>(process.env.NEXT_PUBLIC_API_URL!, {
  fetch: {
    credentials: 'include'
  }
});
