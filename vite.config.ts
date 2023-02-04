import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectRegister: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,woff2}']
      }
    }),
    vuetify({
      styles: { configFile: 'src/settings.scss' }
    }),
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/locales/**'),
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
})
