import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows external connections and shows network URL
    port: 3000,
    open: false, // Don't auto-open browser
  }
})
