let plugins = []
if (process.env.WEBPACK_STATS) {
  const { StatsWriterPlugin } = require('webpack-stats-plugin')
  plugins.push(new StatsWriterPlugin({
    fields: null,
    stats: {chunkModules: true}
  }))
}

module.exports = {
  publicPath: process.env.PUB_PATH || '/',
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push(
        'img/icons/converter.sh', // shell script to convert logo to all icons
        'img/icons/logo.*' // original logo
      )
      options.push({
        from: 'src/defaults',
        to: 'dist',
        toType: 'dir'
      })
      return [options]
    })
  },
  configureWebpack: {
    plugins
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
