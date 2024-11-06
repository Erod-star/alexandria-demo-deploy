import { useQuery } from '@tanstack/react-query';

// ? Actions
import { getInventoryById } from '../actions';

interface UseInventoryProps {
  id?: string;
}

export const useInventory = ({ id }: UseInventoryProps) => {
  const inventoryQuery = useQuery({
    queryKey: ['inventory', id],
    queryFn: () => getInventoryById(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  const inventory = inventoryQuery.data;

  return {
    ...inventoryQuery,

    // ? Properties
    inventory,
  };
};
