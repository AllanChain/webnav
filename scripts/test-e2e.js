/* eslint-disable no-console */
const Service = require('@vue/cli-service/lib/Service')
const cypress = require('cypress')
const handler = require('serve-handler')
const http = require('http')

// dev, prod or prod-headless
const command = process.argv[2] || 'prod-headless'
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

if (command === 'dev') {
  service.run('serve')
    .then(() => cypress.open({ config: { baseUrl: 'http://localhost:8080' } }))
} else {
  const server = http.createServer((request, response) => {
    return handler(request, response, { public: 'dist' })
  })
  const startServer = service.run('build').then(() => server.listen(5000))
  if (command === 'prod') {
    startServer
      .then(() => cypress.open({ config: { baseUrl: 'http://localhost:5000' } }))
      .then(() => server.close())
  } else {
    startServer
      .then(() => cypress.run({
        config: {
          baseUrl: 'http://localhost:5000',
          video: false
        }
      })).then(result => {
        if (result.failures) {
          console.error('Could not execute tests: ', result.message)
          return result.failures
        }
        return result.totalFailed
      })
      .catch(err => console.error(err.message))
      .then((code = 1) => {
        server.close()
        process.exit(code)
      })
  }
}
