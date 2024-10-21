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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  TabNumbers,
} from '@/components';

// ? Hooks
import { useInventoryStore } from '../../hooks';

// ? Schemas
import { inventoryDetailsSchema } from '../../schemas';

export const Step2 = () => {
  const {
    setPreviousStep,
    setNextStep,
    wizardDetails,
    setInventoryWizardDetails,
  } = useInventoryStore();

  const form = useForm<z.infer<typeof inventoryDetailsSchema>>({
    resolver: zodResolver(inventoryDetailsSchema),
    defaultValues: {
      folioOriginal: wizardDetails?.folioOriginal || '',
      lista: wizardDetails?.lista || '',
      tipoPropiedad: wizardDetails?.tipoPropiedad || '',
      recamaras: wizardDetails?.recamaras?.toString() || '',
      sanitarios: wizardDetails?.sanitarios?.toString() || '',
      estacionamientos: wizardDetails?.estacionamientos?.toString() || '',
      terreno: wizardDetails?.terreno?.toString() || '',
      construccion: wizardDetails?.construccion?.toString() || '',
    },
  });

  const onSubmit = (formData: z.infer<typeof inventoryDetailsSchema>) => {
    const {
      estacionamientos,
      recamaras,
      sanitarios,
      terreno,
      construccion,
      ...rest
    } = formData;
    setInventoryWizardDetails({
      ...rest,
      estacionamientos: Number(estacionamientos),
      recamaras: Number(recamaras),
      sanitarios: Number(sanitarios),
      terreno: Number(terreno),
      construccion: Number(construccion),
    });
    setNextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="lista"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Premium</SelectLabel>
                      <SelectItem value="Cobranza">Cobranza</SelectItem>
                      <SelectItem value="Juicio">Juicio</SelectItem>
                      <SelectItem value="Sentencia">Sentencia</SelectItem>
                      <SelectItem value="Adjudicada">Adjudicada</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Classic</SelectLabel>
                      <SelectItem value="Altaltium">Altaltium</SelectItem>
                      <SelectItem value="Preventa">Preventa</SelectItem>
                      <SelectItem value="Consignación">Consignación</SelectItem>
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
            name="tipoPropiedad"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de propiedad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Departamento">Departamento</SelectItem>
                    <SelectItem value="Condominio">Condominio</SelectItem>
                    <SelectItem value="Nave industrial">
                      Nave industrial
                    </SelectItem>
                    <SelectItem value="Terreno">Terreno</SelectItem>
                    <SelectItem value="Local">Local</SelectItem>
                    <SelectItem value="Oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="folioOriginal"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Folio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  minLength={5}
                  maxLength={5}
                  placeholder="86228"
                  required
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-5">
          <div className="space-y-7 justify-center justify-self-center mx-auto">
            <FormField
              control={form.control}
              name="recamaras"
              render={({ field }) => (
                <TabNumbers
                  label="Habitaciones"
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <FormField
              control={form.control}
              name="sanitarios"
              render={({ field }) => (
                <TabNumbers
                  label="Baños"
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <FormField
              control={form.control}
              name="estacionamientos"
              render={({ field }) => (
                <TabNumbers
                  label="Estacionamientos"
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>

          <div className="col-span-2">
            <h3 className="mt-8 text-2xl font-semibold">Superficie</h3>
            <Separator className="my-4" />

            <FormField
              control={form.control}
              name="terreno"
              render={({ field }) => (
                <FormItem className="mb-4 w-2/3">
                  <FormLabel>Terreno total (m²)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="10 000"
                      required
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="construccion"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <FormLabel>Terreno construido (m²)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="5 000"
                      required
                      type="text "
                    />
                  </FormControl>
                  <FormMessage className="pb-5" />
                </FormItem>
              )}
            />
          </div>
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
