import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';

// Update this when you have a working backend
let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5125/api/v1';

if (!isDevelopment) {
  // Update this when you have a working backend
  baseURL = 'https://budgetapp-api-1.onrender.com/api/v1/';
}

const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn('Unauthorized - clearing token');
      localStorage.removeItem('token');
    }
    return Promise.reject(err);
  }
);

export default api;
