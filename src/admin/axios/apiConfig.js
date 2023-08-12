import axios from 'axios';

const apiConfig = axios.create({
  baseURL: 'https://localhost:3000/api/admin', // Authentication-related API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
