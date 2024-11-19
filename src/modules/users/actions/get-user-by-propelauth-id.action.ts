import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { User as UserPropelAuth } from '@propelauth/react';
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { User } from '../types';

export interface GetUserByPropelAuthIdResponse
  extends AlexandriaApiSuccessResponse {
  data: {
    user: User;
    propelAuthData: UserPropelAuth;
  };
}

export const getUserByPropelAuthId = async (
  propelAuthId?: string
): Promise<GetUserByPropelAuthIdResponse | undefined> => {
  try {
    if (!propelAuthId) return undefined;
    const { data } = await alexandriaApi.get<GetUserByPropelAuthIdResponse>(
      `/user/propelauth/${propelAuthId}`
    );
    return data;
  } catch (error) {
    console.error('::Users', error);
    throw new Error('⚠️ Error obteniendo usuarios por PropelAuth ID');
  }
};
