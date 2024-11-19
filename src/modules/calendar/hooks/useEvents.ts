import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// ? Actions
import { getGoogleEvents } from '../actions';

// ? Types
import type { AltaltiumEvent } from '../types';

export const useEvents = () => {
  // TODO: Hacer la query por mes
  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: getGoogleEvents,
    staleTime: 1000 * 60 * 5,
  });

  const events = eventsQuery.data?.items ?? [];

  const parsedEvents: AltaltiumEvent[] = events.map((event) => {
    const summary = event.summary.replace('Altaltium - ', '');
    return {
      title: summary,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      googleData: { ...event, summary },
    };
  });

  useEffect(() => {
    if (eventsQuery.isError) {
      console.error('::eventsQuery', eventsQuery.error);
      toast.error('Error al obtener los eventos');
    }
  }, [eventsQuery.isError]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...eventsQuery,

    // ? Properties
    events,
    parsedEvents,
  };
};
