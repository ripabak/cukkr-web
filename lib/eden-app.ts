import type { App } from '@/src/types/app';
import { treaty } from '@elysia/eden';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL.replace(/^http:\/\//i, 'https://');

export const app = treaty<App>(apiUrl, {
  fetch: {
    credentials: 'include'
  }
});
