<script setup lang="ts">
/* eslint-disable no-console */
import { ref, onBeforeMount } from 'vue'
import { register } from 'register-service-worker'
import { version } from '../../package.json'

let registration: ServiceWorkerRegistration | null = null
const swStatus = ref('pending')

onBeforeMount(() => {
  if (import.meta.env.PROD) {
    register(`${import.meta.env.BASE_URL}service-worker.js`, {
      ready () {
        swStatus.value = 'active'
        console.log('Service worker is active')
      },
      registered () {
        swStatus.value = 'registered'
        console.log('Service worker has been registered.')
      },
      cached () {
        swStatus.value = 'cached'
        console.log('Content has been cached for offline use.')
      },
      updatefound () {
        swStatus.value = 'updateFound'
        console.log('New content is downloading.')
      },
      updated (r) {
        swStatus.value = 'updated'
        console.log('New content is available; please refresh.')
        registration = r
      },
      offline () {
        swStatus.value = 'offline'
        console.log('No internet connection found. App is running in offline mode.')
      },
      error (error) {
        swStatus.value = 'error'
        console.error('Error during service worker registration:', error)
      }
    })
  }
})

const upgradeApp = async () => {
  if (swStatus.value === 'updated') {
    const newWorker = registration?.waiting
    const oldWorker = registration?.active
    if (!newWorker) return

    // Abort revalidating connections because they block skipWaiting
    // to actually take place (though Promise resolved immediately)
    // Both FireFox and Chrome stucks here. In Chrome messages are stuck too.
    // Thus Vuepress chooses to wait message sent, but not working in FireFox
    oldWorker && oldWorker.postMessage({ type: 'abort-connections' })
    newWorker.postMessage({ type: 'skip-waiting' })
    location.reload()
  }
}
</script>

<template>
  <v-list-item @click="upgradeApp">
    <v-icon size="small">
      {{ swStatus === 'updated' ? 'mdi-cog-refresh' : 'mdi-cogs' }}
    </v-icon>
    <div class="text-caption ml-2 d-inline-block">
      v{{ version }} - {{ $t(`sw.${swStatus}`) }}
    </div>
  </v-list-item>
</template>
