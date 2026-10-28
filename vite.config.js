import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_DEV_API_PROXY || 'http://localhost:5000';
  return {
    plugins: [react()],
    server: {
      port: 5173,
      // Same-origin proxy in development so the HttpOnly auth cookie just works.
      proxy: {
        '/api': { target: apiTarget, changeOrigin: false },
        '/uploads': { target: apiTarget, changeOrigin: false },
        '/socket.io': { target: apiTarget, ws: true, changeOrigin: false },
      },
    },
    build: {
      // Admin pages are already split out; the main chunk is React, Redux, the router and the Socket.IO client.
      chunkSizeWarningLimit: 700,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.js'],
      css: false,
    },
  };
});
