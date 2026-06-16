import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from https://<user>.github.io/client-website/ on GitHub Pages
  base: '/client-website/',
  plugins: [react()],
})
