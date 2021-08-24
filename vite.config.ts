import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import path from 'path'

const srcPath = path.resolve(__dirname, 'src', 'styles', 'variables.sass')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      globalComponentsDeclaration: true,
      customComponentResolvers: [
        (name: string) => {
          if (name.match(/^V[A-Z]/))
            return { importName: name, path: 'vuetify/lib/components' }
        }
      ]
    })
  ],
  define: { 'process.env': {} },
  css: {
    preprocessorOptions: {
      sass: { additionalData: `@import ${srcPath}\n` },
      scss: { additionalData: `@import ${srcPath};\n` }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
