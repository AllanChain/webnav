import { setCacheNameDetails } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

const controller = new AbortController()

setCacheNameDetails({ prefix: 'webnav' })

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  const message = event.data
  if (typeof message !== 'object') return
  if (message.type === 'skip-waiting') {
    void self.skipWaiting() // Not awaiting here
  } else if (message.type === 'abort-connections') {
    controller.abort()
  }
})

precacheAndRoute(self.__WB_MANIFEST)

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
