import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ? Actions
import {
  createInventory,
  createInventoryByFile,
  deleteInventory,
} from '../actions';

export const useInventoryMutations = () => {
  const queryClient = useQueryClient();

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['inventories'],
    });
  };

  const createByFileMutation = useMutation({
    mutationFn: createInventoryByFile,
    onSuccess: () => {
      toast.success('¡Inventarios del archivo creados de manera existosa!');
      handleInvalidateQueries();
    },
    onError: (error) => {
      toast.error('¡Hubo un error al crear los inventarios de este archivo!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  const createMutation = useMutation({
    mutationFn: createInventory,
    onError: (error) => {
      toast.error('¡Hubo un error al crear este inventario!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  // const updateMutation = useMutation({})

  const deleteMutation = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      toast.success('Inventario eliminado de manera existosa!');
      handleInvalidateQueries();
    },
    onError: (error) => {
      toast.error('¡Hubo un error al intentar eliminar este inventario!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  return {
    createMutation,
    createByFileMutation,
    // updateMutation,
    deleteMutation,
  };
};
