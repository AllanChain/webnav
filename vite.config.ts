import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      styles: { configFile: 'src/settings.scss' }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
})
