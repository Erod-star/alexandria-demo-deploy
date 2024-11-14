import { useQuery } from '@tanstack/react-query';

// ? Actions
import { getLeadById } from '../actions';

// // ? Types
// import type { Inventory } from '@/modules/inventory/types';

interface UseLeadProps {
  id?: string;
}

export const useLead = ({ id }: UseLeadProps) => {
  const leadQuery = useQuery({
    queryKey: ['lead', id],
    queryFn: () => getLeadById(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  const lead = leadQuery.data;

  // const relatedInventories: Inventory[] =
  //   lead?.announcements?.map((announcement) => announcement.inventory) || [];

  return {
    ...leadQuery,

    // ? Properties
    lead,
    // relatedInventories,
  };
};
