import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { RedirectToLogin, RequiredAuthProvider } from '@propelauth/react';

import App from './App.tsx';
import './index.css';

// ? Plugins
import { TanstackProvider } from '@/plugins';

// ? Helpers
import { getEnvVariables } from './helpers/getEnvVariables.ts';
import EnvErrorView from './modules/global/views/EnvErrorView.tsx';

const [{ PROPELAUTH_AUTH_URL }, { hasError, missingVariables }] =
  getEnvVariables();

if (missingVariables.length > 0) {
  // eslint-disable-next-line no-console
  console.error('::Warning, missing env variables:', missingVariables);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {hasError ? (
      <EnvErrorView />
    ) : (
      <RequiredAuthProvider
        authUrl={PROPELAUTH_AUTH_URL}
        displayIfLoggedOut={<RedirectToLogin />}
      >
        <TanstackProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </TanstackProvider>
      </RequiredAuthProvider>
    )}
  </StrictMode>
);
