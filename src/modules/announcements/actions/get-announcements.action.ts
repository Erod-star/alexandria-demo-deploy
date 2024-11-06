import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Announcement } from '../types';

export interface GetAnnouncementsResponse extends AlexandriaApiSuccessResponse {
  data: Announcement[];
}

export const getAnnouncements = async (): Promise<GetAnnouncementsResponse> => {
  try {
    const { data } = await alexandriaApi.get<GetAnnouncementsResponse>(
      '/announcement'
    );
    return data;
  } catch (error) {
    console.log('::Announcements', error);
    throw new Error('⚠️ Error obteniendo las publicaciones');
  }
};
