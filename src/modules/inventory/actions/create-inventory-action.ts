import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { Inventory } from '../types';
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';

export interface CreateInventoryResponse extends AlexandriaApiSuccessResponse {
  data: Inventory;
}

export const createInventory = async (
  inventory: Omit<Inventory, 'inventoryId'>
): Promise<Inventory> => {
  try {
    const { data } = await alexandriaApi.post<CreateInventoryResponse>(
      '/inventory',
      inventory
    );
    return data.data;
  } catch (error) {
    throw new Error('⚠️ Error al crear el inventario');
  }
};
