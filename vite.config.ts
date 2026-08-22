import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  // Relative base path ('./') works no matter what the repo/subpath is named,
  // so GitHub Pages, custom domains, and local `vite preview` all just work.
  // Set VITE_BASE_PATH explicitly only if you need an absolute base (e.g. a
  // custom domain served from root: VITE_BASE_PATH=/).
  base: process.env.VITE_BASE_PATH || './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
