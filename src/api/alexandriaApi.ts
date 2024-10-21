import axios from 'axios';

// ? Helpers
import { getEnvVariables } from '@/helpers/getEnvVariables';

const [{ API_BASE_URL }] = getEnvVariables();

const alexandriaApi = axios.create({
  baseURL: API_BASE_URL,
});

export default alexandriaApi;
