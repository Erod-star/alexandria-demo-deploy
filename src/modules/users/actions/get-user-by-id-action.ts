import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { User } from '../types';

export interface GetUserByIdResponse extends AlexandriaApiSuccessResponse {
  data: User;
}

export const getUserById = async (id?: string): Promise<User | undefined> => {
  try {
    if (!id) return undefined;
    const { data } = await alexandriaApi.get<GetUserByIdResponse>(
      `/user/${id}`
    );
    return data.data;
  } catch (error) {
    throw new Error('⚠️ Error obteniendo los usuarios');
  }
};
