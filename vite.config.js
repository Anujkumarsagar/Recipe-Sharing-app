import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: import.meta.env.VITE_MODE === 'development' ? {
      '/api': {
        target: import.meta.env.VITE_BACKEND_URL, // Custom environment variable
        changeOrigin: true,
      }
    } : undefined,
  },
});
