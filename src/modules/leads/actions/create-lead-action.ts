import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Lead } from '../types';

export interface PostLeadResponse extends AlexandriaApiSuccessResponse {
  data: Lead;
}

export const createLead = async (
  payload: Omit<Lead, 'leadId'>
): Promise<PostLeadResponse> => {
  try {
    const { data } = await alexandriaApi.post<PostLeadResponse>(
      '/leads',
      payload
    );
    return data;
  } catch (error) {
    console.error('::Lead', error);
    throw new Error('⚠️ Error creando el lead');
  }
};
