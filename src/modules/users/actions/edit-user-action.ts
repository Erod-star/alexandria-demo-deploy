import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { User } from '../types';

export interface PatchUserResponse extends AlexandriaApiSuccessResponse {
  data: User;
}

export const editUser = async (payload: User): Promise<PatchUserResponse> => {
  try {
    const { userId, ...rest } = payload;
    const { data } = await alexandriaApi.patch<PatchUserResponse>(
      `/user/${userId}`,
      rest
    );
    return data;
  } catch (error) {
    throw new Error('⚠️ Error editando el usuario');
  }
};
