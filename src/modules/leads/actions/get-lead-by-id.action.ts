import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Lead } from '../types';

export interface GetLeadByIdResponse extends AlexandriaApiSuccessResponse {
  data: Lead;
}

export const getLeadById = async (id?: string): Promise<Lead | undefined> => {
  try {
    if (!id) return undefined;
    const { data } = await alexandriaApi.get<GetLeadByIdResponse>(
      `/leads/${id}`
    );
    return data.data;
  } catch (error) {
    console.error('::Leads', error);
    throw new Error(`⚠️ Error obteniendo el lead con el id - ${id}`);
  }
};
