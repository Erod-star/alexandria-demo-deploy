import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ? Actions
import { createInteraction } from '../actions';

export const useInteractionMutations = () => {
  const queryClient = useQueryClient();

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['announcements'],
    });
    queryClient.invalidateQueries({
      queryKey: ['events'],
    });
    queryClient.invalidateQueries({
      queryKey: ['interactions'],
    });
    queryClient.invalidateQueries({
      queryKey: ['leads'],
    });
  };

  const createMutation = useMutation({
    mutationFn: createInteraction,
    onSuccess: () => {
      handleInvalidateQueries();
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
