import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
   
  ],
  server: {
    proxy: {
        '/v1/admin': 'http://localhost:8000',
    }
}
})
