import axios from 'axios';

/**
 * @singleton api
 * @summary Global Axios instance for making API calls.
 * @type api-client
 * @category core-library
 */
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data.data, // Unpack the 'data' from our standard success response
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);
