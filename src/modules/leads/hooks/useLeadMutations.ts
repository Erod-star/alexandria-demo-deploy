import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ? Actions
import { createLead } from '../actions';

export const useLeadMutations = () => {
  const queryClient = useQueryClient();

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['leads'],
    });
  };

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      toast.success('Lead creado de manera existosa!');
      handleInvalidateQueries();
    },
    onError: (error) => {
      toast.error('¡Hubo un error al crear este lead!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  return {
    createMutation,
  };
};
