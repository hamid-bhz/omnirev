import axios from 'axios';
import type {AxiosError, InternalAxiosRequestConfig} from 'axios';

import {API_BASE_URL} from '@constants';
import {getAuthToken, removeAuthToken} from '@utils';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();

      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
