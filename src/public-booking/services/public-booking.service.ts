import { app } from '@/lib/eden-app';

function throwIfError(error: unknown): never {
  throw new Error((error as any)?.value?.message ?? 'Request failed');
}

const eden = app;

type EdenBooking = ReturnType<typeof eden.api.public.booking>;
export type CreateWalkInPayload = Parameters<EdenBooking['walk-in']['post']>[0];
export type CreateAppointmentPayload = Parameters<EdenBooking['appointment']['post']>[0];

export const publicBookingService = {
  async getBarbershopInfo(slug: string) {
    const { data, error } = await eden.api.public.barbershop({ slug }).get();
    if (error) throwIfError(error);
    return data!.data;
  },

  async getDateAvailability(slug: string, date: string) {
    const { data, error } = await eden.api.public.barbershop({ slug }).availability.get({ query: { date } });
    if (error || !data) return null;
    return data.data;
  },

  async getFormData(slug: string) {
    const { data, error } = await eden.api.public.booking({ slug })['form-data'].get();
    if (error) throwIfError(error);
    return data!.data;
  },

  async validatePin(slug: string, pin: string) {
    const { data, error } = await eden.api.public.booking({ slug }).pin.validate.post({ pin });
    if (error) throwIfError(error);
    return data!.data;
  },

  async createWalkIn(slug: string, body: CreateWalkInPayload) {
    const { data, error } = await eden.api.public.booking({ slug })['walk-in'].post(body);
    if (error) throwIfError(error);
    return data!.data;
  },

  async createAppointment(slug: string, body: CreateAppointmentPayload) {
    const { data, error } = await eden.api.public.booking({ slug }).appointment.post(body);
    if (error) throwIfError(error);
    return data!.data;
  },
};

export type BarbershopPublicInfo = NonNullable<Awaited<ReturnType<typeof publicBookingService.getBarbershopInfo>>>;
export type PublicFormData = NonNullable<Awaited<ReturnType<typeof publicBookingService.getFormData>>>;
export type PublicService = PublicFormData['services'][number];
export type PublicBarber = PublicFormData['barbers'][number];
