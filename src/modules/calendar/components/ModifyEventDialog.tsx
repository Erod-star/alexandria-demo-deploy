import { format } from 'date-fns';
import { cn, setTimeToADate } from '@/lib/utils';
import * as z from 'zod';
import { es } from 'date-fns/locale';

// ? Icons
import { CalendarIcon, X as Equis } from 'lucide-react';

// ? Components
import {
  Button,
  Calendar,
  Dialog,
  DialogClose,
  DialogContentCustom,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  useCalendarEventForm,
  useCalendarStore,
  useEventMutations,
} from '../hooks';

// ? Types
import type { UpdateEventPayload } from '../actions';

export const ModifyEventDialog = () => {
  const { updateMutation, deleteMutation } = useEventMutations();
  const {
    isEventDetailModalOpen,
    setIsEventDetailModalOpen,
    selectedEvent,
    setSelectedEvent,
  } = useCalendarStore();

  const today = new Date();
  const { form, formSchema } = useCalendarEventForm({
    summary: selectedEvent?.summary || '',
    description: selectedEvent?.description || '',
    date: new Date(selectedEvent?.date || today),
    times: {
      start: selectedEvent?.times.start || '',
      end: selectedEvent?.times.end || '',
    },
  });

  const areButtonsDisabled =
    deleteMutation.isPending || updateMutation.isPending || !selectedEvent;

  const handleCloseModal = () => {
    setIsEventDetailModalOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
    }, 1000);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    await deleteMutation.mutateAsync(selectedEvent.eventId);
    handleCloseModal();
  };

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    if (!selectedEvent) return;

    const { date, times, summary, description } = payload;
    const initialDate = setTimeToADate(date, times.start).toISOString();
    const endDate = setTimeToADate(date, times.end).toISOString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const event: UpdateEventPayload = {
      eventId: selectedEvent.eventId,
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

    await updateMutation.mutateAsync(event);
    handleCloseModal();
  };

  return (
    <Dialog open={isEventDetailModalOpen}>
      <DialogContentCustom className="">
        <DialogHeader>
          <DialogTitle>{selectedEvent?.summary || 'Evento'}</DialogTitle>
          <DialogDescription>
            Estos son los detalles del evento, puedes modificarlos o eliminar
            dicho evento.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 pb-4">
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
              <DialogFooter className="!justify-between w-full">
                <Button
                  type="button"
                  variant="destructive"
                  disabled={areButtonsDisabled}
                  onClick={handleDeleteEvent}
                >
                  {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                </Button>

                <Button type="submit" disabled={areButtonsDisabled}>
                  Actualizar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>

        <DialogClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setIsEventDetailModalOpen(false)}
        >
          <Equis className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContentCustom>
    </Dialog>
  );
};
