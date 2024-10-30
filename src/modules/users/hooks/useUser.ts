import { useQuery } from '@tanstack/react-query';

// ? Actions
import { getUserById } from '../actions';

interface UseUserProps {
  id?: string;
}

export const useUser = ({ id }: UseUserProps) => {
  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  const user = userQuery.data;

  return {
    ...userQuery,

    // ? Properties
    user,
  };
};
