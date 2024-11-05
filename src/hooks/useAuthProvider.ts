import { useState } from 'react';
import axios from 'axios';

// ? Helpers
import { getEnvVariables } from '@/helpers';

export const useAuthProvider = () => {
  const [{ PROPELAUTH_AUTH_URL, AUTH_API_KEY, FRONTEND_BASE_URL }] =
    getEnvVariables();

  const base64AppLink = btoa(`${FRONTEND_BASE_URL}/calendario`);
  const googleAuthRedirectLink = `${PROPELAUTH_AUTH_URL}/google/login?&scope=https://www.googleapis.com/auth/calendar&rt=${base64AppLink}`;

  const [isValidatingToken, setIsValidatingToken] = useState<boolean>(false);

  const getGoogleProviderToken = async (
    propelAuthUserId: string
  ): Promise<string | undefined> => {
    setIsValidatingToken(true);
    try {
      const response = await axios.get(
        `${PROPELAUTH_AUTH_URL}/api/backend/v1/user/${propelAuthUserId}/oauth_token`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AUTH_API_KEY}`,
          },
        }
      );
      localStorage.setItem('provider-token', response.data.google.access_token);
      return response.data.google.access_token;
    } catch (error) {
      console.error('::Error getting provider token');
      console.error(error);
    } finally {
      setIsValidatingToken(false);
    }
  };

  return {
    // ? Properties
    googleAuthRedirectLink,
    base64AppLink,
    isValidatingToken,

    // ? Methods
    getGoogleProviderToken,
  };
};
