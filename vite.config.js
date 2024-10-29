import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remove the server section for production builds
export default defineConfig({
  plugins: [react()],
});
