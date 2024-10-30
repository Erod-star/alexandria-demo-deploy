import * as z from 'zod';

export const userFormSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  apellido: z.string().min(2, {
    message: 'El apellido debe tener al menos 2 caracteres.',
  }),
  telefono: z.string().min(10, {
    message: 'Por favor ingresa un número de teléfono válido.',
  }),
  rol: z.string().min(1, {
    message: 'Por favor selecciona un rol.',
  }),
  correoPersonal: z
    .string()
    .email({ message: 'Por favor ingresa un correo válido.' }),
  correoEmpresarial: z
    .string()
    .email({ message: 'Por favor ingresa un correo válido.' })
    .refine((correo) => correo.endsWith('@gmail.com'), {
      message:
        'El correo empresarial debe ser un correo de Google (@gmail.com).',
    })
    .optional(),
});
