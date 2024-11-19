import googleApi from '@/api/googleApi';

// ? Types
import type { EventItem, EventReminder } from '../types';

export interface GetGoogleCalendarEventsResponse {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: Date;
  timeZone: string;
  accessRole: string;
  defaultReminders: EventReminder[];
  nextSyncToken: string;
  items: EventItem[];
}

export const getGoogleEvents =
  async (): Promise<GetGoogleCalendarEventsResponse> => {
    try {
      const params = new URLSearchParams();
      params.append('q', 'ALTALTIUM');

      // TODO: Validar desde cuando se obtienen los eventos
      // const now = new Date();
      // const firstDayOfMonth = new Date(
      //   now.getFullYear(),
      //   now.getMonth(),
      //   1
      // ).toISOString();
      // params.append('timeMin', firstDayOfMonth);

      const { data } = await googleApi.get<GetGoogleCalendarEventsResponse>(
        '',
        {
          params,
        }
      );
      return data;
    } catch (error) {
      console.error('::Calendar', error);
      throw new Error('⚠️ Error obteniendo eventos de Google Calendar');
    }
  };
