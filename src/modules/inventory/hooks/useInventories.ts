import { useQuery } from '@tanstack/react-query';

// ? Actions
import { getInventories } from '../actions';

export const useInventories = () => {
  const inventoriesQuery = useQuery({
    queryKey: ['inventories'],
    queryFn: getInventories,
    staleTime: 1000 * 60 * 5,
  });

  const inventories = inventoriesQuery.data?.data ?? [];

  return {
    ...inventoriesQuery,

    // ? Properties
    inventories,
  };
};
