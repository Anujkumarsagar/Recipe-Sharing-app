import axios from 'axios';
import { logout, setTheme } from './store/userSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Ensure VITE_ prefix
  withCredentials: true,
});

// Handle request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // You do not need to set Access-Control-Allow-Origin here, it's a server-side header
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      localStorage.removeItem('token');
      import('./store').then(({ default: store }) => {
        store.dispatch(logout());
      });
      // Redirect to login page or handle login logic
    }
    return Promise.reject(error);
  }
);

// Handle theme
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');
document.documentElement.classList.toggle('light', theme === 'light');
import('./store').then(({ default: store }) => {
  store.dispatch(setTheme(theme));
});

export default api;

// Login function
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};
