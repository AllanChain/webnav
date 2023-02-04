/* eslint-disable no-console */

import { register } from 'register-service-worker'
import store from './store'

let registration = null

if (import.meta.env.PROD) {
  register(`${import.meta.env.BASE_URL}service-worker.js`, {
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
      console.log('Error during service worker registration:', error)
    }
  })
}

export const skipWaiting = () => {
  const newWorker = registration?.waiting
  const oldWorker = registration?.active
  if (!newWorker) return

  // Abort revalidating connections because they block skipWaiting
  // to actually take place (though Promise resolved immediately)
  // Both FireFox and Chrome stucks here. In Chrome messages are stuck too.
  // Thus Vuepress chooses to wait message sent, but not working in FireFox
  oldWorker.postMessage({ type: 'abort-connections' })
  newWorker.postMessage({ type: 'skip-waiting' })
}
