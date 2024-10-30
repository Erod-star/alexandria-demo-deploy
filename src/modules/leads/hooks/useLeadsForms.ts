import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const useLeadsForm = () => {
  const textField = z
    .string()
    .min(2, { message: 'Por favor ingresa minímo 2 caracteres' })
    .max(115, { message: 'Por favor ingresa un máximo de 100 caracteres' })
    .trim();

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.',
    }),
    lastName: z.string().min(2, {
      message: 'El apellido debe tener al menos 2 caracteres.',
    }),
    phone: z.string().min(10, {
      message: 'Por favor ingresa un número de teléfono válido.',
    }),
    email: z.string().email({ message: 'Por favor ingresa un correo válido.' }),
    reason: z
      .string()
      .min(10, {
        message: 'El motivo debe tener al menos 10 caracteres.',
      })
      .optional(),
    propertiesHistory: z
      .string()
      .min(1, {
        message: 'Por favor selecciona una propiedad.',
      })
      .optional(),
    property: z
      .string()
      .min(1, {
        message: 'Por favor selecciona una propiedad.',
      })
      .optional(),
    streetAndNumber: textField,
    colony: textField,
    city: textField,
    zipCode: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, 'Debe ser un código postal válido'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      reason: '',
      propertiesHistory: '',
      property: '',
      streetAndNumber: '',
      colony: '',
      city: '',
      zipCode: '',
    },
  });

  const formState = useFormState(form);

  return {
    form,
    formSchema,
    formState,
  };
};
