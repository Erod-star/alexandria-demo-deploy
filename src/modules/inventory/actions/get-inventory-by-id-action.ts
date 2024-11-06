import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Inventory } from '../types';

export interface GetInventoryByIdResponse extends AlexandriaApiSuccessResponse {
  data: Inventory;
}

export const getInventoryById = async (
  id?: string
): Promise<Inventory | undefined> => {
  try {
    if (!id) return undefined;
    const { data } = await alexandriaApi.get<GetInventoryByIdResponse>(
      `/inventory/${id}`
    );
    return data.data;
  } catch (error) {
    console.error('::Inventory', error);
    throw new Error(`⚠️ Error obteniendo el inventario con el id - ${id}`);
  }
};
