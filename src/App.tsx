import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSession, useSessionContext } from '@supabase/auth-helpers-react';

// ? Routes
import { router } from '@/routes';

// ? Components
import { Toaster } from '@/components';

// ? Plugins
import { TanstackProvider } from '@/plugins';

// ? Views
import AuthView from '@/modules/auth/AuthView';

function App() {
  const session = useSession();
  const { isLoading } = useSessionContext();

  useEffect(() => {
    if (session?.provider_token) {
      localStorage.setItem('provider-token', session.provider_token);
    }
  }, [session]);

  // TODO: Hacer validacion de sacar al usuario si el provider_token no expira
  if (isLoading) return <></>;

  if (!session) return <AuthView />;

  return (
    <TanstackProvider>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          unstyled: false,
          classNames: {
            // TODO: Definir las clases de los toast
            success: '!bg-green-400 text-black',
            error: '!bg-red-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
            toast: 'bg-white text-black',
          },
        }}
      />
    </TanstackProvider>
  );
}

export default App;
