import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Interaction } from '../types';

export interface GetInteractionsByLeadIdAndUserIdResponse
  extends AlexandriaApiSuccessResponse {
  data: Interaction[];
}

export const getInteractionsByLeadIdAndUserId = async (
  leadId?: string,
  userId?: string
): Promise<Interaction[] | undefined> => {
  try {
    if (!leadId || !userId) return undefined;
    const { data } =
      await alexandriaApi.get<GetInteractionsByLeadIdAndUserIdResponse>(
        `/interaction/${leadId}/${userId}`
      );
    return data.data;
  } catch (error) {
    console.error('::Interactions', error);
    throw new Error(
      `⚠️ Error obteniendo las interacciones para el lead ${leadId} y el usuario ${userId} - ${error}`
    );
  }
};
