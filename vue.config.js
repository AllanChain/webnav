module.exports = {
  publicPath: process.env.PUB_PATH || '/',
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
          urlPattern: /./,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'webnav-AC',
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    }
  },
  transpileDependencies: ['vuetify']
}
