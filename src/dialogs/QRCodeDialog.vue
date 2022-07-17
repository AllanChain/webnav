<template>
  <v-dialog
    scrollable
    :model-value="true"
    @update:model-value="$emit('update:modelValue', false)"
  >
    <v-card width="400px" max-width="90vw">
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact">
          <v-toolbar-title>
            {{ $t('qr.title') }}
          </v-toolbar-title>
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
          <v-btn v-show="!!result" icon size="large" @click="copy">
            <v-icon color="amber lighten-2">
              mdi-content-copy
            </v-icon>
          </v-btn>
          <v-btn v-show="camera === 'off'" icon size="large" @click="rescan">
            <v-icon color="teal lighten-2">
              mdi-camera
            </v-icon>
          </v-btn>
          <v-btn icon size="large" @click="$emit('update:modelValue', false)">
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
          <v-overlay
            class="align-center justify-center text-center" contained
            :scrim="scrim"
            :model-value="!!result"
          >
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
          <v-overlay
            class="align-center justify-center text-center" contained
            :scrim="scrim"
            :model-value="!result && camera === 'off'"
          >
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
import { useTheme } from 'vuetify'
import { ref, computed } from 'vue'

export default {
  components: { QrcodeStream, QrcodeCapture },
  emits: ['update:modelValue'],
  setup () {
    const theme = useTheme()
    const camera = ref('off')
    const result = ref(null)
    return {
      camera,
      result,
      scrim: computed(() => theme.current.value.dark ? '#000000' : '#ffffff')
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
  position: relative;
}

.qrcode-stream .v-overlay__scrim {
  opacity: 90%;
}

.qrcode-result {
  word-break: break-all;
}
</style>
