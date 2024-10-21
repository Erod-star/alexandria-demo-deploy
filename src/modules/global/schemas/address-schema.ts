import { z } from 'zod';
import { textField } from './text-field-schema';

export const addressSchema = z.object({
  calleYNumero: textField,
  colonia: textField,
  estado: textField,
  municipio: textField,
  cp: z.string().regex(/^\d{5}(-\d{4})?$/, 'Ingresa un código postal válido'),
  googleMaps: z.string().url('Debe ser un enlace válido').optional(),
});
