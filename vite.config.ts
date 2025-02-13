import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() =>
  {
  
    return {
      base: '/DIRIAuth/',
      build: {
        outDir: 'docs',
      },
      plugins: [react()],
    }
  })