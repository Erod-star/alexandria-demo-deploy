import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';

// ? Components
import { Skeleton } from '@/components';
import { CalendarEvent } from '../CalendarEvent';

// ? Hooks
import { useEvents } from '../../hooks';

// ? Types
import type { Components } from 'react-big-calendar';
import type { AltaltiumEvent } from '../../types';

// ? Styles
import './CalendarComponent.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  es: es,
};

export const CalendarComponent = () => {
  const { parsedEvents: events, isLoading } = useEvents();

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const components: Components<AltaltiumEvent, object> = {
    event: (props) => <CalendarEvent event={props.event} />,
  };

  return (
    <div className="h-[47rem] overflow-auto">
      {isLoading ? (
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-3 justify-items-center mb-8">
            <div className="relative -bottom-7 flex gap-1 items-center">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>

            <div className="relative">
              <Skeleton className="h-12 w-72" />
            </div>

            <div className="relative -bottom-7 flex gap-1 items-center">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          views={['month', 'day']}
          // defaultView="month"
          // view="month"
          // toolbar={false}
          components={components}
          culture="es"
          messages={{
            allDay: 'Todo el día',
            previous: 'Anterior',
            next: 'Siguiente',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'Sin eventos',
            showMore: (total) => `+${total} más`,
          }}
          allDayMaxRows={2}
        />
      )}
    </div>
  );
};
