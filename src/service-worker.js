import { setCacheNameDetails } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

const controller = new AbortController()

setCacheNameDetails({ prefix: 'webnav' })

self.addEventListener('message', event => {
  const message = event.data
  if (!message) return
  if (message.type === 'skip-waiting')
    self.skipWaiting()
  else if (message.type === 'abort-connections')
    controller.abort()
})

self.__precacheManifest = [].concat(self.__WB_MANIFEST || [])
precacheAndRoute(self.__precacheManifest, {})

registerRoute(
  /.*/,
  new StaleWhileRevalidate({
    cacheName: 'webnav-AC',
    fetchOptions: { signal: controller.signal },
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 1296000,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
)
