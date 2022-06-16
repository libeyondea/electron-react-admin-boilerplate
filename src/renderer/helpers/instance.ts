import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'renderer/config';
import store from 'renderer/store';

const instance = axios.create({
  baseURL: config.API.URL.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: config.REQUEST.TIMEOUT,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getState().authState.current.token;
    if (config.headers && !config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;
