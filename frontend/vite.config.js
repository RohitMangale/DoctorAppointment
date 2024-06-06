import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    proxy : {
      '/mp' : {
        target: 'https://doctor-appointment-sigma-blue.vercel.app',
        changeOrigin: true
      }
    }
}
})
