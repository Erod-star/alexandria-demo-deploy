import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { toast } from 'sonner';

// ? Icons
import { CalendarIcon, CalendarPlus } from 'lucide-react';

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
  LoadingSpinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Textarea,
} from '@/components';

// ? Hooks
import { useInteractionMutations } from '../hooks';

// ? Schema
import { contactFormSchema } from '../schema';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks';

// ? Types
import { LocalStorageKeys } from '@/types/global';

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
  const navigate = useNavigate();

  const { createMutation } = useInteractionMutations();
  const { setItem } = useLocalStorage();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      interactionNotes: '',
      interactionStatus: 'no',
    },
  });

  const itHadContact = form.watch('interactionStatus');

  const handleSubmit = async (formData: z.infer<typeof contactFormSchema>) => {
    const interactionDate = new Date();
    const timeElapsed = localStorage.getItem(LocalStorageKeys.TIMER_START);
    const interactionDuration = Math.floor(
      (Date.now() - Number(timeElapsed || 0)) / 1000
    );

    try {
      // TODO: Agendar primero la llamada en google y esperar a que salga bien antes de que se mande la solicitud a nuestro backend
      await createMutation.mutateAsync({
        ...formData,
        interactionDate,
        interactionDuration,
        scheduledMeeting: false,
        interactionStatus: formData.interactionStatus === 'si',
        nextContactDate: new Date(),
        leadId: leadId || 'No lead id!',
        userId: userId || 'No user id!',
      });
      localStorage.removeItem(LocalStorageKeys.TIMER_START);
      navigate('/publicaciones');
    } catch (error) {
      console.error('::Contact form', error);
    }
  };

  useEffect(() => {
    const storedStartTime = localStorage.getItem(LocalStorageKeys.TIMER_START);
    const currentTime = Date.now();

    let startTime: number;
    if (storedStartTime) {
      startTime = parseInt(storedStartTime, 10);
    } else {
      startTime = currentTime;
      setItem(LocalStorageKeys.TIMER_START, startTime.toString());
    }
  }, []);
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

          {itHadContact === 'si' && (
            <>
              <h3
                className="form-subtitle pt-4 text-2xl font-medium tracking-tight col-span-2"
                data-testid="form-subtitle"
              >
                Contacto a futuro
              </h3>
              <Separator className="col-span-2" />

              <div className="col-span-2 space-y-4">
                <FormField
                  control={form.control}
                  name="nextContactDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-1/2">
                      <FormLabel>Fecha de próximo contacto</FormLabel>
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
                            lang="es"
                            // TODO: Añadir validación que, al establecer una fecha por google marcar este campo como requerido
                            required={false}
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="gap-3"
                  type="button"
                  onClick={() =>
                    toast.info('¡Esta funcionalidad aún no está disponible!')
                  }
                >
                  Agendar llamada <CalendarPlus className="size-5" />
                </Button>
              </div>
            </>
          )}

          <div className="flex justify-end col-span-2">
            <Button
              className="min-w-28"
              disabled={createMutation.isPending}
              type="submit"
            >
              {createMutation.isPending ? (
                <LoadingSpinner className="size-4" />
              ) : (
                'Finalizar contacto'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
