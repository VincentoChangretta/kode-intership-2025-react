import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/KODE-INTERSHIP-ONLINE/',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      app: '/src/app',
      entities: '/src/entities',
      features: '/src/features',
      pages: '/src/pages',
      shared: '/src/shared',
      widgets: '/src/widgets',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
  publicDir: 'public',
});
