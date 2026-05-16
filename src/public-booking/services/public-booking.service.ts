import { app } from '@/lib/eden-app';
import type { App } from '@/src/types/app';

// App['~Routes'] contains a catch-all index signature from the type-share-eden-elysia
// plugin ({ [x: string]: { get: BunFile } }). Index signatures make keyof return
// `string`, breaking mapped types. Use conditional inference instead of property
// access to extract route schemas from specific named route blocks.
type Routes = App['~Routes'];

type ApiPublicBarbershopSlug = Routes extends {
  api: { public: { barbershop: { ':slug': infer R } } };
} ? R : never;

type ApiPublicBookingSlug = Routes extends {
  api: { public: { booking: { ':slug': infer R } } };
} ? R : never;

type PublicBookingSlug = Routes extends {
  public: { booking: { ':slug': infer R } };
} ? R : never;

type GetRoute<T> = T extends { get: infer G } ? G : never;
type PostRoute<T> = T extends { post: infer P } ? P : never;
type RouteResponseData<T> = T extends { response: { 200: { data: infer D } } } ? D : never;
type RouteBody<T> = T extends { body: infer B } ? B : never;

export type BarbershopPublicInfo = RouteResponseData<GetRoute<ApiPublicBarbershopSlug>>;
export type PublicFormData = RouteResponseData<GetRoute<ApiPublicBookingSlug extends { 'form-data': infer R } ? R : never>>;
export type PublicService = PublicFormData['services'][number];
export type PublicBarber = PublicFormData['barbers'][number];
export type CreateWalkInPayload = RouteBody<PostRoute<PublicBookingSlug extends { 'walk-in': infer R } ? R : never>>;
export type CreateAppointmentPayload = RouteBody<PostRoute<PublicBookingSlug extends { appointment: infer R } ? R : never>>;

function throwIfError(error: unknown): never {
  throw new Error((error as any)?.value?.message ?? 'Request failed');
}

// The treaty proxy constructs URLs correctly at runtime but TypeScript can't resolve
// the client type due to the catch-all index signature. Cast to any; explicit return
// types on each function preserve safety.
const eden = app as any;

export const publicBookingService = {
  async getBarbershopInfo(slug: string): Promise<BarbershopPublicInfo> {
    const { data, error } = await eden.api.public.barbershop({ slug }).get();
    if (error) throwIfError(error);
    return data.data;
  },

  async getDateAvailability(slug: string, date: string) {
    type AvailabilityData = RouteResponseData<GetRoute<
      Routes extends { public: { barbershop: { ':slug': { availability: infer R } } } } ? R : never
    >>;
    const { data, error } = await eden.api.public.barbershop({ slug }).availability.get({ query: { date } });
    if (error || !data) return null;
    return data.data as AvailabilityData | null;
  },

  async getFormData(slug: string): Promise<PublicFormData> {
    const { data, error } = await eden.api.public.booking({ slug })['form-data'].get();
    if (error) throwIfError(error);
    return data.data;
  },

  async validatePin(slug: string, pin: string) {
    type PinData = RouteResponseData<PostRoute<
      Routes extends { public: { booking: { ':slug': { pin: { validate: infer R } } } } } ? R : never
    >>;
    const { data, error } = await eden.api.public.booking({ slug }).pin.validate.post({ pin });
    if (error) throwIfError(error);
    return data.data as PinData;
  },

  async createWalkIn(slug: string, body: CreateWalkInPayload) {
    const { data, error } = await eden.api.public.booking({ slug })['walk-in'].post(body);
    if (error) throwIfError(error);
    return data.data;
  },

  async createAppointment(slug: string, body: CreateAppointmentPayload) {
    const { data, error } = await eden.api.public.booking({ slug }).appointment.post(body);
    if (error) throwIfError(error);
    return data.data;
  },
};
