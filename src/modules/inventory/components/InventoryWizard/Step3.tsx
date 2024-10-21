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
  Separator,
} from '@/components';

// ? Hooks
import { useInventoryStore } from '../../hooks';

// ? Schemas
import { paymentsSchema } from '../../schemas/inventory-payments-schema';

export const Step3 = () => {
  const {
    setPreviousStep,
    setNextStep,
    setInventoryWizardPayments,
    wizardPayments,
  } = useInventoryStore();

  const form = useForm<z.infer<typeof paymentsSchema>>({
    resolver: zodResolver(paymentsSchema),
    defaultValues: {
      primerPago: wizardPayments?.primerPago?.toString() || '',
      segundoPago: wizardPayments?.segundoPago?.toString() || '',
      valorAproximado: wizardPayments?.valorAproximado?.toString() || '',
    },
  });

  function onSubmit({
    primerPago,
    segundoPago,
    valorAproximado,
  }: z.infer<typeof paymentsSchema>) {
    setInventoryWizardPayments({
      primerPago: Number(primerPago),
      segundoPago: Number(segundoPago),
      valorAproximado: Number(valorAproximado),
      total: Number(primerPago) + Number(segundoPago),
    });
    setNextStep();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div>
          <h3 className="mt-2 text-2xl font-semibold">Capital de pagos</h3>
          <Separator className="my-5" />

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="primerPago"
              render={({ field }) => (
                <FormItem className="mb-4 w-2/3">
                  <FormLabel>Primer pago</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      placeholder="150 000"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="segundoPago"
              render={({ field }) => (
                <FormItem className="mb-4 w-2/3">
                  <FormLabel>Segundo pago</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      placeholder="100 000"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="mt-4 text-2xl font-semibold">Valor del terreno</h3>
          <Separator className="my-5" />

          <FormField
            control={form.control}
            name="valorAproximado"
            render={({ field }) => (
              <FormItem className="mb-4 w-1/2">
                <FormLabel>Valor remate</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    placeholder="100 000"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="absolute bottom-0 right-0 flex gap-5">
          <Button type="button" onClick={setPreviousStep}>
            Anterior
          </Button>
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </Form>
  );
};
