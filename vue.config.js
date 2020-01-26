// const fs = require('fs');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/webnav/'
    : '/',
  pwa: {
    name: 'WebNav',
    themeColor: '#4c89fe',
    msTileColor: '#4c89fe',
    manifestOptions: {
      start_url: ".",
      background_color: '#4c89fe'
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: ".",
      runtimeCaching: [{
        urlPattern: new RegExp('/'),
        handler: 'networkFirst',
        options: {
          networkTimeoutSeconds: 20,
          cacheName: 'webnav|AC',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }]
    }
  }
  // },
  // devServer: {
  //   host: '127.0.0.1',
  //   https: {
  //     key: fs.readFileSync('localhost+2-key.pem'),
  //     cert: fs.readFileSync('localhost+2.pem')
  //   }
  // }
}
