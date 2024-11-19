/*
TODO:
  - Haceer el fetch por mes de los eventos y revalidar las queries por mes cuando se cree/elimine un evento
*/

import * as z from 'zod';
import { format } from 'date-fns';
import { cn, setTimeToADate } from '@/lib/utils';
import { es } from 'date-fns/locale';

// ? Icons
import { CalendarIcon, CalendarPlus } from 'lucide-react';

// ? Components
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@/components';

// ? Hooks
import { useCalendarEventForm, useEventMutations } from '../hooks';

// ? Types
import type { GoogleCalendarEvent } from '../types';

interface CreateDialogEventProps {
  disabled?: boolean;
}

export const CreateDialogEvent = ({ disabled }: CreateDialogEventProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { form, formSchema } = useCalendarEventForm();
  const { createMutation } = useEventMutations();
  const { mutateAsync, isPending } = createMutation;

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) form.reset();
  };

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    const { date, times, summary, description } = payload;
    const initialDate = setTimeToADate(date, times.start).toISOString();
    const endDate = setTimeToADate(date, times.end).toISOString();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const event: GoogleCalendarEvent = {
      summary: `Altaltium - ${summary}`,
      description: description,
      start: {
        dateTime: initialDate,
        timeZone,
      },
      end: {
        dateTime: endDate,
        timeZone,
      },
    };

    await mutateAsync(event);
    // await createEvent(event);
    form.reset();
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        <Button className="flex gap-2 items-center text-base font-semibold w-full">
          <CalendarPlus className="size-5" /> <p>Nuevo evento</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo evento</DialogTitle>

          <DialogDescription>
            Añade los detalles del nuevo evento
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Mi evento" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha del evento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date('2050-01-01') || date < new Date()
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between gap-5">
                <FormField
                  control={form.control}
                  name="times.start"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Hora de inicio</FormLabel>
                      <FormControl>
                        <Input placeholder="00:00" required {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.times?.start?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="times.end"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Hora de termino</FormLabel>
                      <FormControl>
                        <Input placeholder="00:00" required {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.times?.end?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormMessage>
                {form.formState.errors.times?.root?.message}
              </FormMessage>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del evento</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none h-32"
                      placeholder="Junta por videollamada..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end w-full">
              <Button type="submit">
                {isPending ? 'Cargando...' : 'Crear evento'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
