import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// ? Actions
import { getUsers } from '../actions';

export const useUsers = () => {
  const usersQuery = useQuery({
    // TODO: Hacer paginación
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });

  const users = usersQuery.data?.data.users ?? [];

  useEffect(() => {
    if (usersQuery.isError) {
      toast.error('¡Hubo un error al obtener los usuarios!');
    }
  }, [usersQuery.isError]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...usersQuery,

    // ? Properties
    users,
  };
};
