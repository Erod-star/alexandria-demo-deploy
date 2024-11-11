import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ? Components
import {
  defaultCountries,
  parseCountry,
  PhoneInput,
} from 'react-international-phone';
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingSpinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components';

// ? Schemas
import { leadFormSchema } from '../schemas';

// ? Styles
import 'react-international-phone/style.css';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const LeadsFormView = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      nombre: '',
      telefono: '',
      correo: '',
      mensaje: '',
      idAnuncio: '',
      tipoAnuncio: '',
      fechaContacto: new Date(),
    },
  });

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['mx'].includes(iso2);
  });

  const onSubmit = (values: z.infer<typeof leadFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="h-full relative pt-5">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Creación de nuevo lead</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-4 gap-7">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem className="form-required-field col-span-4">
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Juan Alberto"
                          type="text"
                          minLength={2}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem className="form-required-field col-span-2">
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <PhoneInput
                          required
                          defaultCountry="mx"
                          countries={countries}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem className="form-required-field col-span-2">
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="juan@gmail.com"
                          type="email"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoAnuncio"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Tipo de anuncio</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona uno" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">Todas</SelectItem>

                            <SelectLabel>Premium</SelectLabel>
                            <SelectItem value="Cobranza">Cobranza</SelectItem>
                            <SelectItem value="Juicio">Juicio</SelectItem>
                            <SelectItem value="Sentencia">Sentencia</SelectItem>
                            <SelectItem value="Adjudicadas">
                              Adjudicadas
                            </SelectItem>

                            <SelectLabel>Classic</SelectLabel>
                            <SelectItem value="Altaltium">Altaltium</SelectItem>
                            <SelectItem value="Preventa">Preventa</SelectItem>
                            <SelectItem value="Consignación">
                              Consignación
                            </SelectItem>
                            <SelectItem value="Banco">Banco</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fechaContacto"
                  render={({ field }) => (
                    <FormItem className="form-required-field flex flex-col col-span-2">
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
                  name="idAnuncio"
                  render={({ field }) => (
                    <FormItem className="form-required-field col-span-2">
                      <FormLabel>Id del anuncio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Juan Alberto"
                          type="text"
                          minLength={2}
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem className="form-required-field col-span-2 h-full">
                      <FormLabel>Motivo</FormLabel>
                      <FormControl>
                        <Textarea
                          required
                          className="resize-none h-full"
                          placeholder="Este lead fue añadido por..."
                          minLength={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CardFooter className="pt-6 flex-col-reverse gap-5 items-start justify-end px-0 sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  // disabled={hasRequestsPending}
                  onClick={() => navigate('/usuarios')}
                >
                  Cancelar
                </Button>

                <Button
                  className="min-w-28"
                  // disabled={hasRequestsPending}
                  type="submit"
                >
                  {false ? <LoadingSpinner className="size-4" /> : 'Crear lead'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsFormView;
