import { useQuery } from '@tanstack/react-query';

// ? Actions
import { getUserById, getUserByPropelAuthId } from '../actions';

interface UseUserProps {
  id?: string;
  propelAuthId?: string;
}

export const useUser = ({ id, propelAuthId }: UseUserProps) => {
  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  const user = userQuery.data;

  const userFromPropelAuthQuery = useQuery({
    queryKey: ['userFromPropelAuth', propelAuthId],
    queryFn: () => getUserByPropelAuthId(propelAuthId),
    staleTime: 1000 * 60 * 60 * 5, // 5 hours
    enabled: !!propelAuthId,
  });

  const currentUserId = userFromPropelAuthQuery.data?.data.user.userId;

  return {
    ...userQuery,
    userFromPropelAuthQuery,

    // ? Properties
    user,
    currentUserId,
  };
};
