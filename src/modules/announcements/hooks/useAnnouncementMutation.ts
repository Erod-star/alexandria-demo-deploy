import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ? Actions
import { createAnnouncement } from '../actions';

export const useAnnouncementMutations = () => {
  const queryClient = useQueryClient();

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['announcements'],
    });
  };

  const createMutation = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      handleInvalidateQueries();
      toast.success('Publicación creada de manera existosa!');
    },
    onError: (error) => {
      toast.error('¡Hubo un error al crear esta publicación!', {
        description: 'Intentalo más tarde o contacta a un administrador.',
      });
      throw error;
    },
  });

  return {
    createMutation,
  };
};
