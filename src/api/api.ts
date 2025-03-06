import axios from 'axios';


const isDevelopment = import.meta.env.MODE === 'development';

  // Update this when you have a working backend
let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5125/api/v1';

if (!isDevelopment) {
  // Update this when you have a working backend
  baseURL = 'http://localhost:5125/api/v1';
}

const api = axios.create({
  baseURL,
});

export default api;
