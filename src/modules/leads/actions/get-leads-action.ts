import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Lead } from '../types';

export interface GetLeadsResponse extends AlexandriaApiSuccessResponse {
  data: Lead[];
}

export const getLeads = async (): Promise<GetLeadsResponse> => {
  try {
    const { data } = await alexandriaApi.get<GetLeadsResponse>('/leads');
    return data;
  } catch (error) {
    console.error('::Leads', error);
    throw new Error('⚠️ Error obteniendo los leads');
  }
};
