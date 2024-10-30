import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { withAuthInfo, WithAuthInfoProps } from '@propelauth/react';

// ? Routes
import { router } from '@/routes';

// ? Components
import { Toaster } from '@/components';

const App = withAuthInfo((props: WithAuthInfoProps) => {
  useEffect(() => {
    if (props.accessToken) {
      localStorage.setItem('auth-token', props.accessToken);
    }
  }, [props]);

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
