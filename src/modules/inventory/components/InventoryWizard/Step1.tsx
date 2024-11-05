import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ? Components
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';

// ? Hooks
import { useInventoryStore } from '../../hooks';

// ? Schemas
import { addressSchema } from '@/modules/global/schemas';

export const Step1 = () => {
  const { wizardAddress, setNextStep, setInventoryWizardAddress } =
    useInventoryStore();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      calleYNumero: wizardAddress?.calleYNumero || '',
      colonia: wizardAddress?.colonia || '',
      estado: wizardAddress?.estado || '',
      municipio: wizardAddress?.municipio || '',
      cp: wizardAddress?.cp?.toString() || '',
      googleMaps: wizardAddress?.googleMaps || undefined,
    },
  });

  const onSubmit = (formData: z.infer<typeof addressSchema>) => {
    const { cp, googleMaps, ...rest } = formData;
    setInventoryWizardAddress({
      ...rest,
      cp: parseInt(cp),
      googleMaps: googleMaps || null,
    });

    setNextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 gap-x-5 gap-y-6 sm:gap-y-10">
          <FormField
            control={form.control}
            name="calleYNumero"
            render={({ field }) => (
              <FormItem className="col-span-8 sm:col-span-4">
                <FormLabel>Calle y número</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Calle #1..."
                    type="text"
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
            name="colonia"
            render={({ field }) => (
              <FormItem className="col-span-8 sm:col-span-4">
                <FormLabel>Colonia</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Reforma"
                    type="text"
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
            name="estado"
            render={({ field }) => (
              <FormItem className="col-span-8 sm:col-span-3">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Guadalajara"
                    type="text"
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
            name="municipio"
            render={({ field }) => (
              <FormItem className="col-span-5 sm:col-span-3">
                <FormLabel>Alcaldía / Municipio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tlaquepaque"
                    type="text"
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
            name="cp"
            render={({ field }) => (
              <FormItem className="col-span-3 sm:col-span-2">
                <FormLabel>Código postal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="12345"
                    type="text"
                    required
                    minLength={5}
                    maxLength={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="googleMaps"
            render={({ field }) => (
              <FormItem className="col-span-8 sm:col-span-5">
                <FormLabel>Link Google Maps</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://maps.app.goo.gl"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </Form>
  );
};
