import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
