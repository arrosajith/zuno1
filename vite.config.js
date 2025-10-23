import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/zuno1/',        // project path
  build: { outDir: 'docs' } // build straight into /docs
})
