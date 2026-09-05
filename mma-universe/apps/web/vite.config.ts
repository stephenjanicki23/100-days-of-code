import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // The UI is a pure read model over the API; everything under /api is proxied so the
    // frontend never needs to know the API's address.
    proxy: {
      '/api': {
        target: process.env.MMA_API ?? 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
      },
    },
  },
});
