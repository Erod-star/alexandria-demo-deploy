import alexandriaApi from '@/api/alexandriaApi';

// ? Types
import type { AlexandriaApiSuccessResponse } from '@/modules/global/types';
import type { Announcement } from '../types';

export interface PostAnnouncementPayload
  extends Omit<Announcement, 'announcementId' | 'inventory' | 'user'> {
  inventoryId: string;
  userId: string;
}

export interface PostAnnouncementResponse extends AlexandriaApiSuccessResponse {
  data: Announcement;
}

export const createAnnouncement = async (
  payload: PostAnnouncementPayload
): Promise<PostAnnouncementResponse> => {
  try {
    const { data } = await alexandriaApi.post<PostAnnouncementResponse>(
      '/announcement',
      payload
    );
    return data;
  } catch (error) {
    console.error('::Announcement', error);
    throw new Error(`⚠️ Error creando la publicación - ${error}`);
  }
};
