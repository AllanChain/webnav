// const fs = require('fs');

module.exports = {
  publicPath: process.env.PUB_PATH || '/',
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
      runtimeCaching: [{
        urlPattern: /./,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'webnav-AC',
          cacheableResponse: {
            statuses: [200],
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
