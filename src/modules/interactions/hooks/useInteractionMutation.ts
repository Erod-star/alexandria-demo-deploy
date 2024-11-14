import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

// ? Actions
import { createInteraction } from '../actions';

export const useInteractionMutations = () => {
  const createMutation = useMutation({
    mutationFn: createInteraction,
    onSuccess: () => {
      toast.success('Interacción creada de manera existosa!');
    },
    onError: (error) => {
      toast.error('¡Hubo un error al crear esta interacción!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  return {
    createMutation,
  };
};
