import googleApi from '@/api/googleApi';

// ? Types
import type { GoogleCalendarEvent } from '../types';

export interface UpdateEventPayload extends GoogleCalendarEvent {
  eventId: string;
}

export const updateEvent = async (event: UpdateEventPayload): Promise<void> => {
  try {
    const { eventId, ...payload } = event;
    const { data } = await googleApi.put(
      `/${eventId}`,
      JSON.stringify(payload)
    );
    console.log('::data', data);
  } catch (error) {
    console.error('::Calendar', error);
    throw new Error('⚠️ ¡Error al editar el evento!');
  }
};
