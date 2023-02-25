import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectRegister: false,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}']
      },
      manifest: {
        name: 'WebNav',
        short_name: 'WebNav',
        theme_color: '#4c89fe',
        icons: [
          {
            src: './img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: './img/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: './img/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        start_url: '.',
        display: 'standalone',
        background_color: '#4c89fe'
      }
    }),
    vuetify({
      styles: { configFile: 'src/settings.scss' }
    }),
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/locales/**')
    }),
    process.env.VITE_SHOW_BUNDLE === '' ? null : visualizer()
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
})
