import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://poe.ninja', // Target API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensure the full path is forwarded
      },
    },
  },
})