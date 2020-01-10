/* eslint-disable no-console */

import { register } from 'register-service-worker'

register(`${process.env.BASE_URL}service-worker.js`, {
  ready () {
    fetch('/manifest.json')
      .then(response => console.log(response));
    console.log(
      'App is being served from cache by a service worker.\n' +
      'For more details, visit https://goo.gl/AFskqB'
    )
  },
  registered () {
    fetch('/manifest.json')
      .then(response => console.log(response));
    console.log('Service worker has been registered.')
  },
  cached () {
    fetch('/manifest.json')
      .then(response => console.log(response));
    console.log('Content has been cached for offline use.')
  },
  fetch (event) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response("<h1>Ooopsie! You seem to be offline!</h1>", {
          headers: {'Content-Type': 'text/html'}
        });
      })
    )
  },
  updatefound () {
    fetch('/manifest.json')
      .then(response => console.log(response));
    console.log('New content is downloading.')
  },
  updated () {
    fetch('/manifest.json')
      .then(response => console.log(response));
    console.log('New content is available; please refresh.')
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
