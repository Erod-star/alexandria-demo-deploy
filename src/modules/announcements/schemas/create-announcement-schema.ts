import * as z from 'zod';

export const createAnnouncementFormSchema = z.object({
  proppitId: z.string().min(5, {
    message: 'Se debe ingresar un id básico',
  }),
  proppitLink: z.string().url('Por favor ingresa un enlace válido'),

  inmueblesId: z.string().min(5, {
    message: 'Se debe ingresar un id básico',
  }),
  inmueblesLink: z.string().url('Por favor ingresa un enlace válido'),

  meliId: z.string().url('Por favor ingresa un enlace válido'),
  meliLink: z.string().url('Por favor ingresa un enlace válido'),
});
