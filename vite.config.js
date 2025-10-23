// D:\zuno\frontend\vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/zuno1/',
  build: { outDir: 'docs' }, // build straight into /docs
});
