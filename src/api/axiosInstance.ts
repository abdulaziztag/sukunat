import axios from 'axios';
import {
  deleteStoragePhoneNumber,
  deleteTokens,
  getTokens,
} from 'utils/tokens.ts';
import {navigate} from 'utils/navgation.ts';
import {endpoints} from 'api/endpoints.ts';

export let BASE_URL: string = 'https://qadamavia.uz:1338/v1'; //Config.API_URL;
const reservedHost: string = 'https://change.swttoken.com/kenai/host/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async config => {
  config.headers = config.headers ?? {};
  config.headers['Accept-Language'] = 'ru';
  const tokens = await getTokens();
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens?.access}`;
  } else {
    if (
      config.url === endpoints.sendCode ||
      config.url === endpoints.verifyCode
    ) {
      await deleteStoragePhoneNumber();
      navigate('PhoneNumber');
    } else {
      return Promise.reject('No tokens');
    }
  }

  return config;
});

const fetchReservedHost = async () => {
  try {
    const response = await axios.get(reservedHost);
    console.log('Reserved host:', response.data.name);
    return response.data.name; // Assuming the response contains the new host URL in the 'host' property
  } catch (error) {
    console.error('Failed to fetch reserved host:', error);
    return null;
  }
};

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // Handle network errors
    if (!error.response) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const newHost = await fetchReservedHost();
        if (newHost) {
          axiosInstance.defaults.baseURL = newHost;
          originalRequest.baseURL = newHost;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }

    // Handle other errors
    if (error.response.status === 401) {
      navigate('PhoneNumber');
      await deleteTokens();
      await deleteStoragePhoneNumber();
    } else if (
      (error.response.status === 503 || error.response.status === 504) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newHost = await fetchReservedHost();
      if (newHost) {
        axiosInstance.defaults.baseURL = newHost;
        originalRequest.baseURL = newHost;
        return axiosInstance(originalRequest);
      }
    }
    console.error('Error Response:', error.response.data);
    return Promise.reject(error);
  },
);

export default axiosInstance;
