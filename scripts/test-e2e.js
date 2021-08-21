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
  const startServer = service.run('build').then(async () => {
    for (const port of [5000, 6723, 8126, 10237, 14236, 17632]) {
      try {
        await new Promise((resolve, reject) => {
          server.listen(port, resolve)
          server.once('error', reject)
        })
        console.log(`Listening on http://localhost:${port}`)
        return port
      } catch (err) {
        if (err.code !== 'EACCES') throw err
      }
    }
    throw new Error('Cannot open server')
  })
  if (command === 'prod') {
    startServer
      .then(port => cypress.open({ config: { baseUrl: `http://localhost:${port}` } }))
      .then(() => server.close())
  } else {
    startServer
      .then(port => cypress.run({
        browser: 'chrome',
        config: {
          baseUrl: `http://localhost:${port}`,
          video: false,
          screenshotOnRunFailure: false
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
