import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/DIRIAuth/', // This ensures correct paths in production
  build: {
    outDir: 'docs', // Needed for GitHub Pages
  },
  plugins: [react()],
});
