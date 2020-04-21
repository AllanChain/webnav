const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const version = require('./package.json').version

let webpackPlugins = [new webpack.DefinePlugin({
  'process.env': {
    VUE_APP_PACKAGE_VERSION: `"${version}"`
  }
})]
if (process.env.NODE_ENV === 'production') {
  webpackPlugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240, // compress files larger than 10K
      deleteOriginalAssets: true,
      minRatio: 0.8 // compression rate
    }))
}
module.exports = {
  publicPath: process.env.PUB_PATH || '/',
  productionSourceMap: false,
  configureWebpack: {
    plugins: webpackPlugins
  },
  pwa: {
    name: 'WebNav',
    themeColor: '#4c89fe',
    msTileColor: '#4c89fe',
    manifestOptions: {
      start_url: '.',
      background_color: '#4c89fe'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'webnav-AC',
            expiration: {
              maxAgeSeconds: 86400 * 15
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },
  transpileDependencies: ['vuetify']
}
