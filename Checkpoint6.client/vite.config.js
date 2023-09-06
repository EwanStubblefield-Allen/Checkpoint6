import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../Checkpoint6/client',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})