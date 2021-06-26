/* global workbox */

const controller = new AbortController()

workbox.core.setCacheNameDetails({ prefix: 'webnav' })

self.addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  } else if (message && message.type === 'abort-connections')
    controller.abort()
})

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
  /.*/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'webnav-AC',
    fetchOptions: { signal: controller.signal },
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 1296000,
        purgeOnQuotaError: false
      }),
      new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })
    ]
  }),
  'GET'
)
