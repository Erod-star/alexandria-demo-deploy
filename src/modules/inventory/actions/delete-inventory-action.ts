import alexandriaApi from '@/api/alexandriaApi';

export const deleteInventory = async (inventoryId: string): Promise<void> => {
  try {
    await alexandriaApi.delete<any>(`/inventory/${inventoryId}`);
  } catch (error) {
    throw new Error('⚠️ Error al eliminar el inventario');
  }
};
