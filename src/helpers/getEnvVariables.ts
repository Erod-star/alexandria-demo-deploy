/* eslint-disable @typescript-eslint/no-explicit-any*/
const expectedVariables = [
  'VITE_REACT_APP_FRONTEND_BASE_URL',
  'VITE_REACT_APP_API_BASE_URL',
  'VITE_REACT_APP_PROPELAUTH_AUTH_URL',
  'VITE_REACT_APP_GOOGLE_CLIENT_ID',
  'VITE_REACT_APP_GOOGLE_SECRET',
  'VITE_REACT_APP_AUTH_API_KEY',
];

type getEnvVariablesReturn = [
  parsedEnv: any,
  error: {
    hasError: boolean;
    missingVariables: string[];
  }
];

export const getEnvVariables = (): getEnvVariablesReturn => {
  const transformKeys = (
    env: Record<string, string>
  ): getEnvVariablesReturn => {
    const parsedEnv: any = {};
    const missingVariables: string[] = [];

    expectedVariables.forEach((expectedVar) => {
      if (env[expectedVar]) {
        const newKey = expectedVar.replace('VITE_REACT_APP_', '');
        parsedEnv[newKey] = env[expectedVar];
      } else {
        missingVariables.push(expectedVar);
      }
    });

    return [
      parsedEnv,
      {
        hasError: missingVariables.length > 0,
        missingVariables,
      },
    ];
  };
  return transformKeys(import.meta.env);
};
