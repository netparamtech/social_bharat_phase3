import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';
import adminStore from '../../admin/store';


const ENV = process.env.REACT_APP_ENV;
// Function to determine the base URL based on the environment
const getBaseUrl = () => {
  if (ENV === 'PROD') {
<<<<<<< HEAD
    return 'http://164.52.218.124/api';
  } else if (ENV === 'DEV') {
    return 'http://localhost:5000/api';
=======
    return 'http://api.socialbharat.org';
  }
  else if (ENV === 'QAT') {
    return 'http://uat-api.socialbharat.org';
  } 
  else if (ENV === 'DEV') {
    return 'http://localhost:3000/api';
>>>>>>> aa18637f9d18983518432a523acd11d1b9d588df
  }
};
// Create a base axios instance without default headers
const apiConfig = axios.create({
  baseURL: getBaseUrl(), // Authentication-related API
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
  baseURL: getBaseUrl(), // Authentication-related API
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
  baseURL: getBaseUrl(), // Authentication-related API
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
