import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// ? Utils
import { cn } from '@/lib/utils';

// ? Icons
import { Copy, Plus } from 'lucide-react';

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
  ScreenLoadingSpinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';

// ? Hooks
import { useAnnouncementMutations } from '../hooks';

// ? Schemas
import { createAnnouncementFormSchema } from '../schemas';

// ? Types
import type { AnnouncementResourceId } from '../schemas';

interface CreateAnnouncementFormProps {
  inventoryId?: string;
  className?: string;
  userId?: string;
}

export const CreateAnnouncementForm = ({
  className,
  inventoryId,
  userId,
}: CreateAnnouncementFormProps) => {
  const navigate = useNavigate();
  const { createMutation } = useAnnouncementMutations();

  const hasRequestsPending = createMutation.isPending;

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

  const proppitIdField = form.watch('proppitId');
  const inmbueblesIdField = form.watch('inmueblesId');
  const meliIdField = form.watch('meliId');

  const handleGenerateId = (field: AnnouncementResourceId): void => {
    const generatedId = uuidv4().replace(/-/g, '').slice(0, 8);
    form.setValue(field, generatedId);
  };

  const handleCopyIdToClipboard = (field: AnnouncementResourceId): void => {
    const currentId = form.getValues(field);
    navigator.clipboard.writeText(currentId);
    toast('Id copiado en el portapapeles', {
      duration: 1500,
    });
  };

  const handleSubmit = async (
    formData: z.infer<typeof createAnnouncementFormSchema>
  ): Promise<void> => {
    const payload = {
      inventoryId: inventoryId || 'No inventoryId',
      userId: userId || 'No userId',
      ...formData,
    };

    await createMutation.mutateAsync(payload);
  };

  return (
    <div
      className={cn(
        'border rounded-md p-4 h-full overflow-y-auto shadow-lg shadow-slate-700/45',
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <TooltipProvider>
            <h3 className="text-lg font-semibold text-alt-green-300">
              Proppit
            </h3>

            <div className="space-y-4 !mt-2">
              <FormField
                control={form.control}
                name="proppitId"
                render={({ field }) => (
                  <FormItem className="form-required-field">
                    <FormLabel>ID</FormLabel>

                    <FormControl className="flex items-center gap-3">
                      <div>
                        <Input
                          required
                          type="text"
                          maxLength={8}
                          placeholder="00000000"
                          {...field}
                        />

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              type="button"
                              disabled={!proppitIdField}
                              onClick={() =>
                                handleCopyIdToClipboard('proppitId')
                              }
                            >
                              <Copy className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copiar id</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              type="button"
                              disabled={proppitIdField !== ''}
                              onClick={() => handleGenerateId('proppitId')}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generar id aleatorio</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
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
                  <FormItem className="form-required-field">
                    <FormLabel>Url de la propiedad</FormLabel>
                    <FormControl>
                      <Input
                        required
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
                  <FormItem className="form-required-field">
                    <FormLabel>ID</FormLabel>

                    <FormControl className="flex items-center gap-3">
                      <div>
                        <Input
                          required
                          type="text"
                          maxLength={8}
                          placeholder="00000000"
                          {...field}
                        />

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              type="button"
                              disabled={!inmbueblesIdField}
                              onClick={() =>
                                handleCopyIdToClipboard('inmueblesId')
                              }
                            >
                              <Copy className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copiar id</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              type="button"
                              disabled={inmbueblesIdField !== ''}
                              onClick={() => handleGenerateId('inmueblesId')}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generar id aleatorio</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
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
                  <FormItem className="form-required-field">
                    <FormLabel>Url de la propiedad</FormLabel>
                    <FormControl>
                      <Input
                        required
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
                  <FormItem className="form-required-field">
                    <FormLabel>ID</FormLabel>

                    <FormControl className="flex items-center gap-3">
                      <div>
                        <Input
                          required
                          type="text"
                          maxLength={8}
                          placeholder="00000000"
                          {...field}
                        />
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              type="button"
                              disabled={!meliIdField}
                              onClick={() => handleCopyIdToClipboard('meliId')}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copiar id</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              type="button"
                              disabled={meliIdField !== ''}
                              onClick={() => handleGenerateId('meliId')}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generar id aleatorio</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
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
                name="meliLink"
                render={({ field }) => (
                  <FormItem className="form-required-field">
                    <FormLabel>Url de la propiedad</FormLabel>
                    <FormControl>
                      <Input
                        required
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
              <Button
                type="button"
                variant="secondary"
                disabled={hasRequestsPending}
                onClick={() => navigate('/inventario')}
              >
                Cancelar
              </Button>

              <Button
                className="min-w-28"
                disabled={hasRequestsPending}
                type="submit"
              >
                {createMutation.isPending ? (
                  <ScreenLoadingSpinner className="size-4" />
                ) : (
                  'Crear publicación'
                )}
              </Button>
            </div>
          </TooltipProvider>
        </form>
      </Form>
    </div>
  );
};
