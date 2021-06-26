/* eslint-disable no-console */

import { register } from 'register-service-worker'
import store from './store'

let registration = null

register(`${process.env.BASE_URL}service-worker.js`, {
  ready () {
    store.commit('swUpdate', 'active')
    console.log('Service worker is active')
  },
  registered () {
    store.commit('swUpdate', 'registered')
    console.log('Service worker has been registered.')
  },
  cached () {
    store.commit('swUpdate', 'cached')
    console.log('Content has been cached for offline use.')
  },
  updatefound () {
    store.commit('swUpdate', 'updateFound')
    console.log('New content is downloading.')
  },
  updated (r) {
    store.commit('swUpdate', 'updated')
    console.log('New content is available; please refresh.')
    registration = r
  },
  offline () {
    store.commit('swUpdate', 'offline')
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    store.commit('swUpdate', 'error')
    console.error('Error during service worker registration:', error)
  }
})

export const skipWaiting = () => {
  const newWorker = registration?.waiting
  const oldWorker = registration?.active
  if (!newWorker) return Promise.resolve()

  console.log('Doing worker.skipWaiting().')
  // Abort revalidating connections because they block skipWaiting
  // to actually take place (though Promise resolved immediately)
  // Both FireFox and Chrome stucks here. In Chrome messages are stuck too.
  oldWorker.postMessage({ type: 'abort-connections' })
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      console.log('Done worker.skipWaiting().')
      if (event.data.error)
        reject(event.data.error)
      else
        resolve(event.data)
    }

    newWorker.postMessage({ type: 'skip-waiting' }, [channel.port2])
  })
}
