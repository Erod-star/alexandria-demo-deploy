import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';

export interface DeleteUserResponse extends AlexandriaApiSuccessResponse {
  data: any;
}

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await alexandriaApi.delete(`/user/${userId}`);
  } catch (error) {
    console.error('::Users', error);
    throw new Error('⚠️ Error eliminando el usuario');
  }
};
