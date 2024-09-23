import axios from 'axios';
import { logout, setTheme } from './store/userSlice';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Handle request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
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
      // Redirect to login page or show login modal
      // You might want to use a routing library or custom logic here
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

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};
