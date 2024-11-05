import { useEffect, useState } from 'react';
import { withAuthInfo, type WithAuthInfoProps } from '@propelauth/react';
import { toast } from 'sonner';

// ? Icons
import { UserPlus } from 'lucide-react';

// ? Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  Skeleton,
} from '@/components';
import {
  CalendarComponent,
  CalendarGlossary,
  CreateDialogEvent,
  ModifyEventDialog,
} from '@/modules/calendar/components';

// ? Hooks
import { useAuthProvider } from '@/hooks';

const CalendarView = withAuthInfo(({ user }: WithAuthInfoProps) => {
  const { googleAuthRedirectLink, getGoogleProviderToken, isValidatingToken } =
    useAuthProvider();
  const [hasProviderToken, setHasProviderToken] = useState<boolean>(false);

  const validateProviderToken = async () => {
    if (user) {
      const providerToken = localStorage.getItem('provider-token');
      // Añadir loader cuando se hace esta petición
      await getGoogleProviderToken(user.userId);
      if (providerToken) {
        setHasProviderToken(true);
      }
    }
  };

  const navigateToGoogleAuth = async () => {
    localStorage.setItem('needs-provider-token', 'no');
    window.location.href = googleAuthRedirectLink;
  };

  useEffect(() => {
    validateProviderToken();
    const needsProviderToken =
      localStorage.getItem('needs-provider-token') === null;

    return () => {
      if (needsProviderToken) {
        localStorage.removeItem('provider-token');
      }
    };
  }, []);

  return (
    <Card className="flex-grow h-full border-none">
      <ModifyEventDialog />

      <CardHeader className="pb-0">
        <CardTitle className="h-12 flex items-center">Calendario</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mt-5 grid grid-cols-4 gap-5 h-full gap-y-16">
          <div className="space-y-10 col-span-4 lg:col-span-1">
            <div className="w-full border rounded-sm p-4">
              <CalendarGlossary />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-medium">Acciones</h3>
              <CreateDialogEvent
                disabled={!hasProviderToken || isValidatingToken}
              />
              <Button
                className="flex gap-3 text-base font-semibold mt-3 w-full"
                disabled={!hasProviderToken || isValidatingToken}
                onClick={() =>
                  toast.info('¡Esta funcionalidad aún no está disponible!')
                }
              >
                <UserPlus className="size-5" /> <p>Buscar personas</p>
              </Button>
            </div>
          </div>

          <div className="col-span-4 lg:col-span-3">
            {isValidatingToken ? (
              <Skeleton className="h-[43rem]" />
            ) : hasProviderToken ? (
              <CalendarComponent />
            ) : (
              <Empty
                className="h-[40rem] w-full flex-center flex-col bg-alt-green-900"
                header="No es posible mostrar los eventos"
              >
                <Button className="mt-2" onClick={navigateToGoogleAuth}>
                  Por favor, valida tu inicio de sesión con google para mostrar
                  tus eventos
                </Button>
              </Empty>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default CalendarView;
