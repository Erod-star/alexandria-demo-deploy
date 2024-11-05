import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// ? Actions
import { getAnnouncements } from '../actions';

export const useAnnouncements = () => {
  const announcementsQuery = useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
    staleTime: 1000 * 60 * 5,
  });

  const announcements = announcementsQuery.data?.data ?? [];

  useEffect(() => {
    if (announcementsQuery.isError) {
      toast.error('¡Hubo un error al obtener las publicaciones!');
    }
  }, [announcementsQuery.isError]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...announcementsQuery,

    // ? Properties
    announcements,
  };
};
