import * as z from 'zod';

export const contactFormSchema = z.object({
  interactionNotes: z.string().min(2, {
    message: 'Las notas deben tener al menos 2 caracteres.',
  }),
  interactionStatus: z.enum(['si', 'no'], {
    required_error: 'Debes seleccionar una opción',
  }),
  interactionDate: z.string().min(2),
  nextContactDate: z.string().min(2),
  scheduledMeeting: z.boolean().default(false),
  meetingDate: z.string().min(2).optional(),
});
