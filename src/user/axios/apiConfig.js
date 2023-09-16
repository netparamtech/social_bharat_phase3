import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userStore from '../store';
import { logout } from '../actions/userAction';
import adminStore from '../../admin/store';
// Create a base axios instance without default headers
const apiConfig = axios.create({
  baseURL: '/api', // Authentication-related API
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
  baseURL: '/api', // Authentication-related API
});

// Interceptor to set headers before each request
apiWithHeaders.interceptors.request.use((config) => {
 const token = adminStore.getState().userAuth.token?.token;
  
  config.headers = setHeaders(token);
  return config;
});

// Create a function to set headers, including optional authorization token
const setHeadersForFile = (token) => {
  
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Create an axios instance with the set headers function
const apiWithFileHeaders = axios.create({
  baseURL: '/api', // Authentication-related API
});

// Interceptor to set headers before each request
apiWithFileHeaders.interceptors.request.use((config) => {
 const token = adminStore.getState().userAuth.token?.token;
  config.headers = setHeadersForFile(token);
  return config;
});



//Axios Interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 /* && error.response.data.error === 'TokenExpiredError' */) {
     adminStore.dispatch(logout())
      const navigate = useNavigate();
        navigate('/login');
       // return Promise.reject(refreshError);
    }
  }
);

export { apiConfig, apiWithHeaders, apiWithFileHeaders };
