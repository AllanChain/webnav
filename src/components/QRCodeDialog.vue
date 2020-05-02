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
          <qrcode-capture ref="file" class="d-none" @decode="onDecode" />
          <v-btn icon @click="triggerUpload">
            <v-icon color="pink">
              upload_file
            </v-icon>
          </v-btn>
          <v-btn v-show="!!result" icon large @click="copy">
            <v-icon color="amber lighten-2">
              content_copy
            </v-icon>
          </v-btn>
          <v-btn v-show="camera === 'off'" icon large @click="rescan">
            <v-icon color="teal lighten-2">
              camera_alt
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
        <p class="pt-2" style="word-break: break-all;">
          <a v-if="isLink" :href="result">{{ result }}</a>
          <b v-else>{{ result }}</b>
        </p>
        <v-divider class="my-2" />
        <qrcode-stream
          class="qrcode-stream" :camera="camera"
          @decode="onDecode" @init="onInit"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream, QrcodeCapture },
  data () {
    return {
      isLink: false,
      camera: 'off',
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
      this.camera = 'auto'
      this.result = null
      this.isLink = false
    },
    async onDecode (content) {
      this.camera = 'off'
      this.result = content
      this.isLink = content.startsWith('http')
    },
    triggerUpload() {
      this.camera = 'off'
      this.result = null
      this.isLink = false
      this.$refs.file.$el.click()
    },
    async copy() {
      try {
        await navigator.clipboard.writeText(this.result)
        this.$store.commit('alert', {
          type: 'success',
          text: 'Copied!'
        })
      } catch (err) {
        this.$store.commit('alert', err.message)
      }
    }
  }
}
</script>

<style>
.qrcode-stream {
  max-height: 70vh;
}
</style>
