import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { Inventory } from '../types';

interface CreateInventoryByFileResponse {
  data: Inventory[];
}

export const createInventoryByFile = async (
  file: File
): Promise<CreateInventoryByFileResponse> => {
  try {
    const { data } = await alexandriaApi.post<CreateInventoryByFileResponse>(
      '/inventory/batch',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error) {
    console.error('::Inventory', error);
    throw new Error('⚠️ Error al crear el inventario por medio de un archivo');
  }
};
