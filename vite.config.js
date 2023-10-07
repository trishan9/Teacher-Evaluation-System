import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/src": "/src",
      "@/components": "/src/components",
      "@/config": "/src/config",
      "@/constants": "/src/constants",
      "@/assets": "/src/assets",
      "@/styles": "/src/styles",
      "@/pages": "/src/pages",
      "@/utils": "/src/utils"
    },
  }
})
