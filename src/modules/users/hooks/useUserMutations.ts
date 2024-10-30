import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ? Actions
import { createUser, deleteUser, editUser } from '../actions';

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const handleInvalidateQueries = (userId?: string) => {
    queryClient.invalidateQueries({
      queryKey: ['users'],
    });
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('¡Usuario creado de manera existosa!');
      handleInvalidateQueries();
    },
    onError: (error) => {
      toast.error('¡Hubo un error al crear este usuario!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  const editMutation = useMutation({
    mutationFn: editUser,
    onSuccess: (data) => {
      toast.success('¡Usuario editado de manera existosa!');
      handleInvalidateQueries(data.data.userId);
    },
    onError: (error) => {
      toast.error('¡Hubo un error al editar este usuario!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, userId) => {
      toast.success('¡Usuario eliminado de manera existosa!');
      handleInvalidateQueries(userId);
    },
    onError: (error) => {
      toast.error('¡Hubo un error al eliminar este usuario!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  return {
    createMutation,
    editMutation,
    deleteMutation,
  };
};
