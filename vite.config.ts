import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify()
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
})
