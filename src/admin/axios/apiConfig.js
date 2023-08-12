import axios from 'axios';

const apiConfig = axios.create({
  baseURL: '/api/admin', // Authentication-related API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
