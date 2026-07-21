'use server';

import { cookies } from 'next/headers';

function getBase() {
  const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error('API_URL is not set');
  return base.replace(/\/$/, '');
}

async function getLang(): Promise<string> {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get('cukkr_lang');
    return langCookie?.value === 'en' ? 'en' : 'id';
  } catch {
    return 'id';
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getBase()}${path}`, init);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Request failed');
  return json.data as T;
}

export interface DateAvailability {
  date: string;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
}

export interface PublicService {
  id: string;
  name: string;
  price: number;
  discount?: number | null;
  duration?: number;
  description?: string | null;
  imageUrl?: string | null;
  imageThumb?: string | null;
  isDefault?: boolean;
}

export interface PublicBarber {
  id: string;
  name: string;
  avatarUrl: string | null;
  avatarThumb: string | null;
  bio?: string | null;
}

export interface PublicFormData {
  services: PublicService[];
  barbers: PublicBarber[];
}

export interface OpenHoursDay {
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
}

export interface BarbershopInfo {
  name: string;
  description?: string | null;
  address?: string | null;
  logoUrl?: string | null;
  logoThumb?: string | null;
  logoMed?: string | null;
  logoFull?: string | null;
  timezone: string;
  services: PublicService[];
  barbers: PublicBarber[];
  openHours: OpenHoursDay[];
}

export async function getBarbershopInfo(slug: string): Promise<BarbershopInfo> {
  return apiFetch(`/api/public/barbershop/${slug}`);
}

export async function getDateAvailability(slug: string, date: string): Promise<DateAvailability> {
  return apiFetch(`/api/public/barbershop/${slug}/availability?date=${date}`);
}

export async function getFormData(slug: string): Promise<PublicFormData> {
  return apiFetch(`/api/public/booking/${slug}/form-data`);
}

export async function validatePin(slug: string, pin: string): Promise<{ validationToken: string }> {
  return apiFetch(`/api/public/booking/${slug}/pin/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
}

export async function createWalkIn(
  slug: string,
  payload: {
    validationToken: string;
    customerName: string;
    customerEmail: string | null;
    serviceIds: string[];
    barberId: string | null;
    notes: string | null;
  },
): Promise<void> {
  const lang = await getLang();
  await apiFetch(`/api/public/booking/${slug}/walk-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, lang }),
  });
}

export async function createAppointment(
  slug: string,
  payload: {
    customerName: string;
    customerEmail: string;
    serviceIds: string[];
    barberId: string | null;
    scheduledAt: string;
    notes: string | null;
  },
): Promise<void> {
  const lang = await getLang();
  await apiFetch(`/api/public/booking/${slug}/appointment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, lang }),
  });
}

export async function verifyAppointment(
  slug: string,
  token: string,
): Promise<{
  verified: boolean;
  bookingId: string | null;
  status: 'verified' | 'already_verified' | 'invalid';
}> {
  return apiFetch(
    `/api/public/booking/${slug}/appointment/verify?token=${token}`,
  );
}

export async function checkIdentity(
  slug: string,
  token: string,
): Promise<{
  valid: boolean;
  customerName: string | null;
}> {
  return apiFetch(
    `/api/public/booking/${slug}/identity/check?token=${token}`,
  );
}

export async function verifyIdentity(
  slug: string,
  token: string,
): Promise<{
  verified: boolean;
  bookingId: null;
  status: 'verified' | 'already_verified' | 'invalid';
}> {
  return apiFetch(
    `/api/public/booking/${slug}/identity/verify?token=${token}`,
  );
}
