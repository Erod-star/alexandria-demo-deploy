import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { format } from 'date-fns';

// ? Icons
import { CalendarIcon } from 'lucide-react';

// ? Utils
import { cn } from '@/lib/utils';

// ? Components
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from '@/components';

// ? Hooks
import { useInteractionMutations } from '../hooks';

// ? Schema
import { contactFormSchema } from '../schema';

interface CreateInteractionFormProps {
  className?: string;
  leadId?: string;
  userId?: string;
}

export const CreateInteractionForm = ({
  className,
  leadId,
  userId,
}: CreateInteractionFormProps) => {
  const { createMutation } = useInteractionMutations();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      interactionNotes: '',
      interactionDate: new Date(),
      interactionStatus: 'no',
      nextContactDate: new Date(),
    },
  });

  const handleSubmit = (formData: z.infer<typeof contactFormSchema>) => {
    console.log('::formData', formData);

    createMutation.mutateAsync({
      ...formData,
      scheduledMeeting: false,
      interactionStatus: formData.interactionStatus === 'si',
      interactionDuration: 0,
      leadId: leadId || 'No lead id!',
      userId: userId || 'No user id!',
    });
  };

  return (
    <div className={cn('', className)}>
      <h3 className="text-2xl text-alt-green-300 font-semibold">
        Detalles de la llamada
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-4 grid grid-cols-2 gap-5"
        >
          <FormField
            control={form.control}
            name="interactionNotes"
            render={({ field }) => (
              <FormItem className="form-required-field col-span-2 sm:col-span-1">
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Juan Alberto"
                    required
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
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
                  <FormLabel className="after:content-['*'] after:ml-1 after:text-red-500">
                    ¿Hubo contacto con el lead?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
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

          <FormField
            control={form.control}
            name="interactionDate"
            render={({ field }) => (
              <FormItem className="form-required-field flex flex-col">
                <FormLabel>Fecha de contacto</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextContactDate"
            render={({ field }) => (
              <FormItem className="form-required-field flex flex-col">
                <FormLabel>Fecha de contacto</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end col-span-2">
            <Button type="submit">Finalizar contacto</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
