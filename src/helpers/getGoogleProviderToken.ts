import axios from 'axios';

// ? Helpers
import { getEnvVariables } from './getEnvVariables';

export const getGoogleProviderToken = async (propelAuthUserId: string) => {
  try {
    const [{ PROPELAUTH_AUTH_URL, AUTH_API_KEY }] = getEnvVariables();
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
  } catch (error) {
    console.error('::Error getting provider token');
    console.error(error);
  }
};
