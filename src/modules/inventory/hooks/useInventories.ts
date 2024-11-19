import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// ? Actions
import { getInventories } from '../actions';

export const useInventories = () => {
  const inventoriesQuery = useQuery({
    queryKey: ['inventories'],
    queryFn: getInventories,
    staleTime: 1000 * 60 * 5,
  });

  const inventories = inventoriesQuery.data?.data ?? [];

  useEffect(() => {
    if (inventoriesQuery.isError) {
      toast.info('¡Hubo un error al obtener los usuarios!');
    }
  }, [inventoriesQuery.isError]);

  return {
    ...inventoriesQuery,

    // ? Properties
    inventories,
  };
};
