import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// ? Actions
import { getLeads } from '../actions';

export const useLeads = () => {
  const leadsQuery = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
    staleTime: 1000 * 60 * 5,
  });

  const leads = leadsQuery.data?.data ?? [];

  useEffect(() => {
    if (leadsQuery.isError) {
      toast.info('¡Hubo un error al obtener los usuarios!');
    }
  }, [leadsQuery.isError]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...leadsQuery,

    // ? Properties
    leads,
  };
};
