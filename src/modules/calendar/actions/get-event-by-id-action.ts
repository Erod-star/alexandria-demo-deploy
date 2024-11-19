import googleApi from '@/api/googleApi';

// ? Types
import type { EventCreator, EventDateTime } from '../types';

interface Attendee {
  email: string;
  organizer?: boolean;
  responseStatus: string;
  self?: boolean;
}

interface ConferenceData {
  entryPoints: EntryPoint[];
  conferenceSolution: ConferenceSolution;
  conferenceId: string;
}

interface ConferenceSolution {
  key: {
    type: string;
  };
  name: string;
  iconUri: string;
}

interface EntryPoint {
  entryPointType: string;
  uri: string;
  label: string;
}

interface Reminders {
  useDefault: boolean;
}

export interface GetGoogleCalendarEventByIdResponse {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  creator: EventCreator;
  organizer: EventCreator;
  start: EventDateTime;
  end: EventDateTime;
  iCalUID: string;
  sequence: number;
  attendees: Attendee[];
  hangoutLink: string;
  conferenceData: ConferenceData;
  reminders: Reminders;
  eventType: string;
}

export const getEventById = async (eventId: string) => {
  try {
    const { data } = await googleApi.get<GetGoogleCalendarEventByIdResponse>(
      `${eventId}`
    );
    return data;
  } catch (error) {
    console.error('::Calendar', error);
    throw new Error('⚠️ Error obteniendo este evento');
  }
};
