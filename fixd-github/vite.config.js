import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set base to '/fixd-terminal/' if hosting at github.com/username/fixd-terminal
  // Change 'fixd-terminal' to match your actual repo name
  base: '/fixd-terminal/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
