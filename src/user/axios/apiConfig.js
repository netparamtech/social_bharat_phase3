import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userStore from '../store';
import { logout } from '../actions/userAction';
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
  baseURL: '/api/user', // Authentication-related API
});

// Interceptor to set headers before each request
apiWithHeaders.interceptors.request.use((config) => {
 // const token = useSelector((state) => state.auth.token.token);
 const token = userStore.getState().auth.token?.token
  config.headers = setHeaders(token);
  return config;
});

// Axios Interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 /* && error.response.data.error === 'TokenExpiredError' */) {
     userStore.dispatch(logout())
      const navigate = useNavigate();
        navigate('/admin');
       // return Promise.reject(refreshError);
    }
  }
);

export { apiConfig, apiWithHeaders };
