import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { User } from '../types';

export interface PostUserResponse extends AlexandriaApiSuccessResponse {
  data: User;
}

export const createUser = async (
  payload: Omit<User, 'userId'>
): Promise<PostUserResponse> => {
  try {
    const { data } = await alexandriaApi.post<PostUserResponse>(
      '/user',
      payload
    );
    return data;
  } catch (error) {
    throw new Error('⚠️ Error creando el usuario');
  }
};
