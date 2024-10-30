import { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

// ? Components
import {
  defaultCountries,
  parseCountry,
  PhoneInput,
} from 'react-international-phone';
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
  LoadingSpinner,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/components';

// ? Hooks
import { useUser, useUserMutations } from '../hooks';

// ? Schemas
import { userFormSchema } from '../schemas';

// ? Types
import type { Department } from '../types';

// ? Styles
import 'react-international-phone/style.css';
import './UsersFormView/UsersFormView.css';

const UsersFormView = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { createMutation, editMutation, deleteMutation } = useUserMutations();
  const { user, isLoading } = useUser({ id: params.id });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const hasRequestsPending =
    createMutation.isPending ||
    deleteMutation.isPending ||
    editMutation.isPending;

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['mx'].includes(iso2);
  });

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      telefono: user?.telefono || '',
      rol: user?.rol || '',
      correoPersonal: user?.correoPersonal || '',
      correoEmpresarial: user?.correoEmpresarial || undefined,
    },
    values: user,
  });

  const { isDirty } = useFormState(form);

  const roleField = form.watch('rol');

  const onSubmit = async (formData: z.infer<typeof userFormSchema>) => {
    const payload = {
      ...formData,
      rol: formData.rol as Department,
    };

    try {
      if (isEditing) {
        await editMutation.mutateAsync({
          ...payload,
          userId: params.id!,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      navigate('/usuarios');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(params.id!);
      navigate('/usuarios');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      setIsEditing(true);
    }
  }, []);

  useEffect(() => {
    if (roleField === 'Client') {
      form.setValue('correoEmpresarial', undefined);
    }
  }, [roleField]);

  return (
    <div className="h-full relative pt-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="mb-5 flex justify-between">
            <h2 className="text-4xl font-bold">
              {isEditing
                ? `${user?.nombre} ${user?.apellido}`
                : 'Creación de usuario'}
            </h2>
          </section>

          <div className="py-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-7">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre(s)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Juan Alberto"
                            type="text"
                            minLength={2}
                            required
                            disabled={hasRequestsPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pérez Rodríguez"
                            type="text"
                            minLength={2}
                            required
                            disabled={hasRequestsPending}
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
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <PhoneInput
                            required
                            defaultCountry="mx"
                            countries={countries}
                            disabled={hasRequestsPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rol</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          disabled={hasRequestsPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona uno" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Juridico">Juridico</SelectItem>
                            <SelectItem value="Ventas">Ventas</SelectItem>
                            <SelectItem value="Gerencia">Gerencia</SelectItem>
                            <SelectItem value="Dirección">Dirección</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Client">Client</SelectItem>
                            <SelectItem value="Asistencia">
                              Asistencia
                            </SelectItem>
                            <SelectItem value="Seguimiento">
                              Seguimiento
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="correoPersonal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico personal</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="juan@gmail.com"
                            type="email"
                            disabled={hasRequestsPending}
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {roleField !== 'Client' && roleField !== '' && (
                  <div>
                    <h3
                      className="form-subtitle mt-8 mb-4 text-lg font-medium tracking-tight"
                      data-testid="form-subtitle"
                    >
                      Validaciones para usuarios internos
                    </h3>

                    <Separator className="my-3" />

                    <div className="grid grid-cols-2 gap-7">
                      <FormField
                        control={form.control}
                        name="correoEmpresarial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Correo electrónico empresarial
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="juan@gmail.com"
                                type="email"
                                disabled={hasRequestsPending}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Para este campo es necesario utilizar un correo
                              gmail
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between w-full absolute right-0 bottom-5">
                  <Button
                    className={isEditing ? 'w-36 flex' : 'invisible'}
                    type="button"
                    variant="destructive"
                    disabled={hasRequestsPending}
                    onClick={handleDelete}
                  >
                    {deleteMutation.isPending ? (
                      <LoadingSpinner className="size-4" />
                    ) : (
                      'Eliminar usuario'
                    )}
                  </Button>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={hasRequestsPending}
                      onClick={() => navigate('/usuarios')}
                    >
                      Cancelar
                    </Button>

                    <Button
                      className="min-w-28"
                      disabled={hasRequestsPending || !isDirty}
                      type="submit"
                    >
                      {createMutation.isPending || editMutation.isPending ? (
                        <LoadingSpinner className="size-4" />
                      ) : isEditing ? (
                        'Actualizar usuario'
                      ) : (
                        'Crear usuario'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersFormView;
