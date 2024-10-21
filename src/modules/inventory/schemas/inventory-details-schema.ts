import { z } from 'zod';

export const inventoryDetailsSchema = z.object({
  folioOriginal: z
    .string()
    .min(5, { message: 'Por favor ingresa un folio valido' })
    .max(5)
    .trim(),
  lista: z
    .string()
    .min(1, { message: 'Por favor selecciona una categoría' })
    .trim(),
  tipoPropiedad: z
    .string()
    .min(1, { message: 'Por favor selecciona un tipo de propiedad' })
    .trim(),
  recamaras: z
    .string()
    .min(1, { message: 'Por favor selecciona la cantidad de habitaciones' })
    .trim(),
  sanitarios: z
    .string()
    .min(1, { message: 'Por favor selecciona la cantidad de baños' })
    .trim(),
  estacionamientos: z
    .string()
    .min(1, { message: 'Por favor selecciona la cantidad de estacionamientos' })
    .trim(),
  terreno: z
    .string()
    .regex(/^\d*\.?\d+$/, {
      message: 'Por favor ingresa únicamente números y decimales',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'El valor debe ser mayor a 0',
    }),
  construccion: z
    .string()
    .regex(/^\d*\.?\d+$/, {
      message: 'Por favor ingresa únicamente números y decimales',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'El valor debe ser mayor a 0',
    }),
});
