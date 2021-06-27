importScripts("/webnav/precache-manifest.d9bd92e5c757b86962788f342296b86e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* global workbox */

const controller = new AbortController()

workbox.core.setCacheNameDetails({ prefix: 'webnav' })

self.addEventListener('message', event => {
  const message = event.data
  if (!message) return
  if (message.type === 'skip-waiting')
    self.skipWaiting()
  else if (message.type === 'abort-connections')
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

