import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { User } from '../types';

export interface GetUsersResponse extends AlexandriaApiSuccessResponse {
  data: {
    users: User[];
    total: number;
    totalPages: number;
  };
}

export const getUsers = async (): Promise<GetUsersResponse> => {
  try {
    const { data } = await alexandriaApi.get<GetUsersResponse>('/user');
    return data;
  } catch (error) {
    throw new Error('⚠️ Error obteniendo los usuarios');
  }
};
