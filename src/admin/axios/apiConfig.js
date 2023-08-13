import axios from 'axios';
import { useSelector } from 'react-redux';
import adminStore from '../store';

// Create a base axios instance without default headers
const apiConfig = axios.create({
  baseURL: '/api/admin', // Authentication-related API
});

// Create a function to set headers, including optional authorization token
const setHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Create an axios instance with the set headers function
const apiWithHeaders = axios.create({
  baseURL: '/api/admin', // Authentication-related API
});

// Interceptor to set headers before each request
apiWithHeaders.interceptors.request.use((config) => {
 // const token = useSelector((state) => state.auth.token.token);
 const token = adminStore.getState().auth.token?.token
  config.headers = setHeaders(token);
  return config;
});

export { apiConfig, apiWithHeaders };
