import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { withAuthInfo, WithAuthInfoProps } from '@propelauth/react';

// ? Hooks
import { useLocalStorage } from './hooks';

// ? Routes
import { router } from '@/routes';

// ? Components
import { Toaster } from '@/components';

// ? Types
import { LocalStorageKeys } from './types/global';

const App = withAuthInfo((props: WithAuthInfoProps) => {
  const { setItem } = useLocalStorage();

  useEffect(() => {
    if (props.accessToken) {
      setItem(LocalStorageKeys.AUTH_TOKEN, props.accessToken);
    }
  }, [props]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
    </>
  );
});

export default App;
