import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { Interaction } from '../types';
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';

export interface CreateInteractionPayload {
  interactionNotes: string;
  interactionDate: Date | string;
  interactionDuration: number;
  interactionStatus: boolean;
  scheduledMeeting: boolean;
  nextContactDate?: Date | string;
  meetingDate?: Date | string;
  userId: string;
  leadId: string;
}

export interface CreateInteractionResponse
  extends AlexandriaApiSuccessResponse {
  data: Interaction;
}

export const createInteraction = async (
  interaction: CreateInteractionPayload
): Promise<Interaction> => {
  try {
    const { data } = await alexandriaApi.post<CreateInteractionResponse>(
      '/interaction',
      interaction
    );
    return data.data;
  } catch (error) {
    console.error('::Interaction', error);
    throw new Error('⚠️ Error al crear la interacción');
  }
};
