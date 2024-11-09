import * as z from 'zod';

export type AnnouncementResourceId = 'proppitId' | 'inmueblesId' | 'meliId';

export const createAnnouncementFormSchema = z.object({
  proppitId: z
    .string()
    .length(8, {
      message:
        'Por favor ingresa un valor válido para el id. Debe contener exactamente 8 caracteres.',
    })
    .refine((proppitId) => /^[a-fA-F0-9]{8}$/.test(proppitId), {
      message:
        'Por favor ingresa el un valor válido para el id. Debe contener un valor hexadecimal de 8 caracteres.',
    }),
  proppitLink: z
    .string()
    .url('Por favor ingresa un url válido')
    .refine((link) => link.includes('https://proppit.com/'), {
      message: 'Por favor ingresa un enlace de Proppit válido',
    }),

  inmueblesId: z
    .string()
    .length(8, {
      message:
        'Por favor ingresa un valor válido para el id. Debe contener exactamente 8 caracteres.',
    })
    .refine((inmueblesId) => /^[a-fA-F0-9]{8}$/.test(inmueblesId), {
      message:
        'Por favor ingresa el un valor válido para el id. Debe contener un valor hexadecimal de 8 caracteres.',
    }),
  inmueblesLink: z
    .string()
    .url('Por favor ingresa un url válido')
    .refine((link) => link.includes('https://www.inmuebles24.com/'), {
      message: 'Por favor ingresa un enlace de Inmuebles24 válido',
    }),

  meliId: z
    .string()
    .length(8, {
      message:
        'Por favor ingresa un valor válido para el id. Debe contener exactamente 8 caracteres.',
    })
    .refine((meliId) => /^[a-fA-F0-9]{8}$/.test(meliId), {
      message:
        'Por favor ingresa el un valor válido para el id. Debe contener un valor hexadecimal de 8 caracteres.',
    }),
  meliLink: z
    .string()
    .url('Por favor ingresa un url válido')
    .refine((link) => link.includes('https://casa.mercadolibre.com.mx/'), {
      message: 'Por favor ingresa un enlace de Mercado Libre válido',
    }),
});
