import { z } from 'zod';

export const paymentsSchema = z.object({
  primerPago: z
    .string()
    .min(1, { message: 'Por favor ingresa una cantidad' })
    .regex(/^\d*\.?\d+$/, {
      message: 'Por favor ingresa únicamente números y decimales',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'El valor debe ser mayor a 0',
    }),
  segundoPago: z
    .string()
    .min(1, { message: 'Por favor ingresa una cantidad' })
    .regex(/^\d*\.?\d+$/, {
      message: 'Por favor ingresa únicamente números y decimales',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'El valor debe ser mayor a 0',
    }),
  valorAproximado: z
    .string()
    .min(1, { message: 'Por favor ingresa una cantidad' })
    .regex(/^\d*\.?\d+$/, {
      message: 'Por favor ingresa únicamente números y decimales',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'El valor debe ser mayor a 0',
    }),
});
