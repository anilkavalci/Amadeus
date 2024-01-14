import axios from 'axios';

export const API_URL = 'https://65a3372da54d8e805ed37729.mockapi.io/';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15 * 1000,
  //  timeoutErrorMessage: t('timeoutErrorMessage')
});

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error),
);

export default instance;
