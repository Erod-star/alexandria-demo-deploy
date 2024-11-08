import { useNavigate } from 'react-router-dom';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';

// ? Schemas
import { createAnnouncementFormSchema } from '../schemas';

interface CreateAnnouncementFormProps {
  className?: string;
}

export const CreateAnnouncementForm = ({
  className,
}: CreateAnnouncementFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createAnnouncementFormSchema>>({
    resolver: zodResolver(createAnnouncementFormSchema),
    defaultValues: {
      proppitId: '',
      proppitLink: '',
      inmueblesId: '',
      inmueblesLink: '',
      meliId: '',
      meliLink: '',
    },
  });

  const handleSubmit = (
    values: z.infer<typeof createAnnouncementFormSchema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  //   ! 8 caracteres para el boton de generación de muuid

  return (
    <div
      className={cn(
        'border rounded-md p-4 h-full overflow-y-auto shadow-lg shadow-slate-700/45',
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <h3 className="text-lg font-semibold text-alt-green-300">Proppit</h3>

          <div className="space-y-4 !mt-2">
            <FormField
              control={form.control}
              name="proppitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000000-0000-000-0000-00000000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Id referente a{' '}
                    <span className="text-alt-green-300 font-semibold">
                      Proppit
                    </span>
                    ,{' '}
                    <span className="font-semibold">
                      {' '}
                      debe ser llenado de manera cuidadosa.
                    </span>
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proppitLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url de la propiedad</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://propit.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold text-alt-green-300">
            Inmuebles 24
          </h3>

          <div className="space-y-4 !mt-2">
            <FormField
              control={form.control}
              name="inmueblesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000000-0000-000-0000-00000000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Id referente a{' '}
                    <span className="text-alt-green-300 font-semibold">
                      Inmuebles 24
                    </span>
                    ,{' '}
                    <span className="font-semibold">
                      {' '}
                      debe ser llenado de manera cuidadosa.
                    </span>
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inmueblesLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url de la propiedad</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://inmuebles24.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold text-alt-green-300">
            Mercado Libre
          </h3>

          <div className="space-y-4 !mt-2">
            <FormField
              control={form.control}
              name="meliId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000000-0000-000-0000-00000000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Id referente a{' '}
                    <span className="text-alt-green-300 font-semibold">
                      Mercado Libre
                    </span>
                    ,{' '}
                    <span className="font-semibold">
                      {' '}
                      debe ser llenado de manera cuidadosa.
                    </span>
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inmueblesLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url de la propiedad</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://casa.mercadolibre.com.mx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-5">
            <Button type="button" onClick={() => navigate('/inventario')}>
              Cancelar
            </Button>
            <Button type="submit">Crear publicación</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
