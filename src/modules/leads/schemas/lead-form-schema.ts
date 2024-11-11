import * as z from 'zod';

export const leadFormSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  telefono: z.string().min(10, {
    message: 'Por favor ingresa un número de teléfono válido.',
  }),
  correo: z.string().email({ message: 'Por favor ingresa un correo válido.' }),
  mensaje: z.string(),
  fechaContacto: z.date(),
  idAnuncio: z.string(),
  tipoAnuncio: z.string(),
});
