import { z } from 'zod';

export const textField = z
  .string()
  .min(2, { message: 'Por favor ingresa minímo 2 caracteres' })
  .max(115, { message: 'Por favor ingresa un máximo de 100 caracteres' })
  .trim();
