<template>
  <v-dialog
    scrollable
    :model-value="true"
    @onUpdate:modelValue="$emit('onUpdate:modelValue', false)"
  >
    <v-card max-width="500">
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark dense>
          <v-toolbar-title>
            {{ $t('qr.title') }}
          </v-toolbar-title>
          <v-spacer />
          <qrcode-capture
            ref="file"
            class="d-none"
            :multiple="false"
            :capture="null"
            @detect="onDetect"
          />
          <v-btn icon @click="triggerUpload">
            <v-icon color="orange lighten-2">
              mdi-file-upload-outline
            </v-icon>
          </v-btn>
          <v-btn v-show="!!result" icon large @click="copy">
            <v-icon color="amber lighten-2">
              mdi-content-copy
            </v-icon>
          </v-btn>
          <v-btn v-show="camera === 'off'" icon large @click="rescan">
            <v-icon color="teal lighten-2">
              mdi-camera
            </v-icon>
          </v-btn>
          <v-btn icon large @click="$emit('input', false)">
            <v-icon color="yellow lighten-2">
              mdi-close-circle-outline
            </v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pa-0">
        <qrcode-stream
          class="qrcode-stream" :camera="camera"
          @detect="onDetect" @init="onInit"
        >
          <v-overlay v-if="!!result" v-bind="overlayProps">
            <h2>{{ $t('qr.result') }}</h2>
            <p class="pt-2 qrcode-result">
              <a
                v-if="isLink" :href="result"
                :target="config.preferNewTab ? '_blank' : undefined"
                rel="noopener noreferrer"
              >{{ result }}</a>
              <b v-else>{{ result }}</b>
            </p>
          </v-overlay>
          <v-overlay v-if="!result && camera === 'off'" v-bind="overlayProps">
            <h3 class="mb-2">
              {{ $t('qr.help') }}
            </h3>
            <p class="px-2">
              {{ $t('qr.press') }} <v-icon>mdi-camera</v-icon> {{ $t('qr.camera-scan') }}
            </p>
            <p class="px-2">
              {{ $t('qr.press') }} <v-icon>mdi-file-upload-outline</v-icon> {{ $t('qr.upload-scan') }}
            </p>
          </v-overlay>
        </qrcode-stream>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream, QrcodeCapture },
  data () {
    return {
      camera: 'off',
      result: null,
      overlayProps: {
        class: 'text-center',
        color: this.$vuetify.theme.dark ? undefined : '#fff',
        dark: false,
        absolute: true,
        opacity: 0.9
      }
    }
  },
  computed: {
    ...mapState('config', ['config']),
    isLink () {
      return this.result && this.result.startsWith('http')
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
    },
    async onDetect (promise) {
      this.camera = 'off'
      try {
        const { content } = await promise
        if (content === null)
          this.$store.commit('alert', this.$t('qr.empty-content'))
        else
          this.result = content
      } catch (err) {
        this.$store.commit('alert', err.message)
      }
    },
    triggerUpload () {
      this.camera = 'off'
      this.result = null
      this.$refs.file.$el.click()
    },
    async copy () {
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

.qrcode-result {
  word-break: break-all;
}
</style>
