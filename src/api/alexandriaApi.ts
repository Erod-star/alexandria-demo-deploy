import axios from 'axios';

// ? Helpers
import { getEnvVariables } from '@/helpers/getEnvVariables';

const [{ API_BASE_URL }] = getEnvVariables();

const alexandriaApi = axios.create({
  baseURL: API_BASE_URL,
});

alexandriaApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(
    'auth-token'
  )}`;
  return config;
});

export default alexandriaApi;
