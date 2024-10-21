import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Inventory } from '../types';

export interface GetInventoriesResponse extends AlexandriaApiSuccessResponse {
  data: Inventory[];
}

export const getInventories = async (): Promise<GetInventoriesResponse> => {
  try {
    const { data } = await alexandriaApi.get<GetInventoriesResponse>(
      '/inventory'
    );
    return data;
  } catch (error) {
    throw new Error('⚠️ Error obteniendo inventarios');
  }
};
