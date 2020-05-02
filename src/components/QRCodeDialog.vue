<template>
  <v-dialog
    :value="true"
    max-width="500"
    scrollable
    @input="$emit('input', false)"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark dense>
          <v-toolbar-title>
            Scan QR Code
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon large @click="rescan">
            <v-icon color="teal lighten-2">
              replay
            </v-icon>
          </v-btn>
          <v-btn icon large @click="$emit('input', false)">
            <v-icon color="yellow lighten-2">
              cancel
            </v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <h3>Result:</h3>
        <p class="pt-2" style="word-break: break-all">
          <a v-if="isLink" :href="result">{{ result }}</a>
          <b v-else>{{ result }}</b>
        </p>
        <v-divider class="my-2" />
        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },
  data () {
    return {
      isLink: false,
      camera: 'auto',
      result: null,
    }
  },
  methods: {
    async onInit (promise) {
      try {
        await promise
      } catch (err) {
        this.$store.commit('alert', err.message)
      }
    },
    rescan () {
      this.isLink = false
      this.result = null
      this.camera = 'auto'
    },
    async onDecode (content) {
      this.result = content
      this.camera = 'off'
      this.isLink = content.startsWith('http')
    }
  }
}
</script>
