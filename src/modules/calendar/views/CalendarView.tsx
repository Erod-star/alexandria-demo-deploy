import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// ? Icons
import { UserPlus } from 'lucide-react';

// ? Components
import { Button, Empty } from '@/components';
import {
  CalendarComponent,
  CalendarGlossary,
  CreateDialogEvent,
  ModifyEventDialog,
} from '@/modules/calendar/components';

function CalendarView() {
  const [hasProviderToken, setHasProviderToken] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('provider-token');
    if (token) setHasProviderToken(true);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <ModifyEventDialog />
      <div className="grid grid-cols-4 gap-10 h-full">
        <div className="space-y-10">
          <h2 className="text-4xl font-bold">Calendario</h2>
          <div className="w-full border rounded-sm p-4">
            <CalendarGlossary />
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-medium">Acciones</h3>
            <CreateDialogEvent disabled={!hasProviderToken} />
            <Button
              className="flex gap-3 text-base font-semibold mt-3 w-full"
              disabled={!hasProviderToken}
              onClick={() =>
                toast.info('¡Esta funcionalidad aún no está disponible!')
              }
            >
              <UserPlus className="size-5" /> <p>Buscar personas</p>
            </Button>
          </div>
        </div>

        <div className="col-span-3">
          {hasProviderToken ? (
            <CalendarComponent />
          ) : (
            <Empty
              className="h-[43rem] w-full flex-center flex-col bg-alt-green-900"
              header="No es posible mostrar los eventos"
              description="Por favor, inicia sesión con google para mostrar todos tus eventos"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
