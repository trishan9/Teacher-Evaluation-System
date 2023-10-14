import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/src": "/src",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/config": "/src/config",
      "@/constants": "/src/constants",
      "@/hooks": "/src/hooks",
      "@/pages": "/src/pages",
      "@/styles": "/src/styles",
      "@/states": "/src/states",
      "@/utils": "/src/utils"
    },
  }
})
