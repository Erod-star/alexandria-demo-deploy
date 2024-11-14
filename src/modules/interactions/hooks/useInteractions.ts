import { useQuery } from '@tanstack/react-query';

// ? Actions
import { getInteractionsByLeadIdAndUserId } from '../actions';

interface UseInteractionProps {
  leadId?: string;
  userId?: string;
}

export const useInteractions = ({ leadId, userId }: UseInteractionProps) => {
  const interactionsQuery = useQuery({
    queryKey: ['interactions', { leadId, userId }],
    queryFn: () => getInteractionsByLeadIdAndUserId(leadId, userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!leadId && !!userId,
  });

  const interactions = interactionsQuery.data ?? [];

  return {
    ...interactionsQuery,

    // ? Properties
    interactions,
  };
};
