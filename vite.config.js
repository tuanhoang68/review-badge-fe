import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    allowedHosts: ['sunni-nonseditious-rightwardly.ngrok-free.dev']
  },
})
