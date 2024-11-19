import googleApi from '@/api/googleApi';

// ? Types
import type {
  EventCreator,
  EventDateTime,
  GoogleCalendarEvent,
} from '../types';

export interface PostGoogleCalendarEventResponse {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  creator: EventCreator;
  organizer: EventCreator;
  start: EventDateTime;
  end: EventDateTime;
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}

export const createEvent = async (
  event: GoogleCalendarEvent
): Promise<PostGoogleCalendarEventResponse> => {
  try {
    const { data } = await googleApi.post('', JSON.stringify(event));
    return data;
  } catch (error) {
    console.error('::Calendar', error);
    throw new Error('⚠️ ¡Error al crear el evento!');
  }
};
