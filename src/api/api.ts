import axios from 'axios';
import { clearToken, getToken } from './authToken';

const isDevelopment = import.meta.env.MODE === 'development';
const configuredBaseURL = import.meta.env.VITE_API_URL;

// Update this when you have a working backend
let baseURL = configuredBaseURL || 'http://localhost:5125/api/v1';

if (!configuredBaseURL && !isDevelopment) {
  // Update this when you have a working backend
  baseURL = 'https://budgetapp-api-1.onrender.com/api/v1/';
}

const api = axios.create({
  baseURL,
  // Neon can cold-start; 10s was too short for the first request.
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
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
      clearToken();

      const authPages = ['/login', '/signUp'];
      if (
        typeof window !== 'undefined' &&
        !authPages.includes(window.location.pathname)
      ) {
        window.location.assign('/login');
      }
    }
    return Promise.reject(err);
  }
);

export default api;
