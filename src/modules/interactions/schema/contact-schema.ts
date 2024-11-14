import * as z from 'zod';

export const contactFormSchema = z.object({
  interactionNotes: z
    .string()
    .min(2, {
      message: 'Las notas deben tener al menos 2 caracteres.',
    })
    .max(280, {
      message: 'Las notas no pueden tener más de 280 caracteres.',
    }),
  interactionStatus: z.enum(['si', 'no'], {
    required_error: 'Debes seleccionar una opción',
  }),
  interactionDate: z.date(),
  nextContactDate: z.date(),
  scheduledMeeting: z.boolean().default(false).optional(),
  meetingDate: z.string().min(2).or(z.string().length(0)).optional(),
});
