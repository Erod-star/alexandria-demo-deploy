import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ? Utils
import { cn } from '@/lib/utils';

// ? Components
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from '@/components';

// ? Schema
import { contactFormSchema } from '../schema';

interface ContactFormProps {
  className?: string;
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      interactionNotes: '',
      interactionDate: '',
      interactionStatus: 'no',
      nextContactDate: '',
      scheduledMeeting: false,
      meetingDate: '',
    },
    values: {
      interactionNotes: '',
      interactionDate: '',
      interactionStatus: 'no',
      nextContactDate: '',
      scheduledMeeting: false,
      meetingDate: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log(values);
  };

  return (
    <div className={cn('', className)}>
      <h3 className="text-2xl text-alt-green-300 font-semibold">
        Detalles de la llamada
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-4 grid grid-cols-2"
        >
          <FormField
            control={form.control}
            name="interactionNotes"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Juan Alberto"
                    minLength={2}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex-center">
            <FormField
              control={form.control}
              name="interactionStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>¿Hubo contacto con el lead?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end col-span-2">
            <Button type="submit">Finalizar contacto</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
