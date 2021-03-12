<template>
  <v-dialog value="true" scrollable fullscreen @input="$emit('input', false)">
    <a ref="downloadLink" class="d-none" />
    <input
      ref="file"
      type="file"
      accept=".json"
      hidden
      @change="importFromFile"
    >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark dense>
          <v-toolbar-title>{{ $t('config.title') }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon large color="blue lighten-2" @click="$refs.file.click()">
            <v-icon>mdi-file-upload-outline</v-icon>
          </v-btn>
          <v-btn icon large @click="downloadJSON">
            <v-icon color="amber">
              mdi-file-download-outline
            </v-icon>
          </v-btn>
          <v-btn icon large @click="done">
            <v-icon color="green lighten-2">
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn icon large @click="$emit('input', false)">
            <v-icon color="yellow lighten-2">
              mdi-close-circle-outline
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs v-model="tab">
          <v-tab> {{ $t('config.bg.title') }} </v-tab>
          <v-tab> {{ $t('config.other.title') }} </v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text class="pt-4">
        <v-tabs-items v-model="tab">
          <!-- Background -->
          <v-tab-item>
            <v-row>
              <v-col cols="12" md="5">
                <div
                  class="bg-preview-wrapper"
                  :style="{
                    backgroundColor: config.bgImg.filter.blurColor
                  }"
                >
                  <div
                    class="bg-image bg-preview"
                    :style="{
                      backgroundImage: `url(${config.bgImg.url})`,
                      filter: `blur(${config.bgImg.filter.blur}px)
                      contrast(${config.bgImg.filter.contrast}%)
                      grayscale(${config.bgImg.filter.grayscale}%)`
                    }"
                  />
                  <div
                    class="pa-3"
                    :style="{
                      position: 'absolute',
                      color: config.blackText ? '#000' : '#eee',
                      textShadow: `1px 1px 3px
            ${config.blackText ? '#eee' : '#000'}`
                    }"
                  >
                    {{ $t('config.bg.example-text').repeat(20) }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="7">
                <!-- <v-divider class="my-2" /> -->
                <v-text-field
                  :value="config.bgImg.url"
                  prepend-inner-icon="mdi-image"
                  :label="$t('config.bg.image-url')"
                  placeholder="back.jpg"
                  :messages="$t('config.bg.img-msg')"
                  outlined
                  dense
                  clearable
                  @input="config.bgImg.url = $event || ''"
                />
                <v-container v-if="config.bgImg.url !== ''">
                  <v-row no-gutters>
                    <v-col cols="3" sm="2">
                      <v-label>{{ $t('config.bg.blur') }}</v-label>
                    </v-col>
                    <v-col cols="9" sm="10">
                      <v-slider
                        v-model="config.bgImg.filter.blur"
                        min="0"
                        max="10"
                        thumb-label
                        hide-details
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="3" sm="2">
                      <v-label>{{ $t('config.bg.contrast') }}</v-label>
                    </v-col>
                    <v-col cols="9" sm="10">
                      <v-slider
                        v-model="config.bgImg.filter.contrast"
                        min="0"
                        max="200"
                        thumb-label
                        hide-details
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="3" sm="2">
                      <v-label>{{ $t('config.bg.gray') }}</v-label>
                    </v-col>
                    <v-col cols="9" sm="10">
                      <v-slider
                        v-model="config.bgImg.filter.grayscale"
                        min="0"
                        max="100"
                        thumb-label
                        hide-details
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-switch
                  v-model="config.blackText"
                  class="mt-0"
                  :label="config.blackText ? $t('config.bg.black-text') : $t('config.bg.white-text')"
                />
              </v-col>
            </v-row>
            <div v-show="config.bgImg.filter.blur || !config.bgImg.url">
              <h2 class="mb-2">
                <span v-if="config.bgImg.filter.blur">
                  {{ $t('config.bg.padding') }}
                </span>
                <span v-else> {{ $t('config.bg.color') }} </span>
              </h2>
              <v-color-picker
                v-model="config.bgImg.filter.blurColor"
                canvas-height="100"
                hide-inputs
                flat
              />
            </div>
          </v-tab-item>
          <!-- other -->
          <v-tab-item>
            <v-row>
              <v-col cols="12" md="7">
                <v-select
                  v-model="config.locale"
                  :items="[
                    {text: $t('config.locale-default'), value: ''},
                    {text: '中文', value: 'zh'},
                    {text: 'English', value: 'en'}
                  ]"
                  :label="$t('config.other.language')"
                  prepend-inner-icon="mdi-language-java"
                  hide-details
                  outlined
                  dense
                />
                <v-switch v-model="config.dark" :label="$t('config.other.dark-mode')" />
                <p>
                  {{ $t('config.other.cors-note') }}
                </p>
                <v-text-field
                  v-model="config.cors"
                  prepend-inner-icon="mdi-airplane-takeoff"
                  :label="$t('config.other.cors')"
                  placeholder="e.g. https://netnr-proxy.cloudno.de/"
                  outlined
                  dense
                />
                <p>
                  {{ $t('config.other.link-preview') }}
                </p>
                <v-text-field
                  v-model="config.linkPreviewKey"
                  prepend-inner-icon="mdi-key-link"
                  :label="$t('config.other.link-preview-key')"
                  placeholder="e.g. 123456abcdfe"
                  clearable
                  outlined
                  dense
                />
                <v-switch v-model="config.httpIcon">
                  <template #label>
                    {{ $t('config.other.http-icon') }}
                  </template>
                </v-switch>
                <v-switch v-model="config.preferNewTab">
                  <template #label>
                    {{ $t('config.other.prefer-new-tab') }}
                  </template>
                </v-switch>
              </v-col>
              <v-col cols="12" md="5">
                <h2 class="mb-2">
                  {{ $t('config.other.bar-color') }}
                </h2>
                <v-color-picker
                  v-model="config.barColor"
                  canvas-height="100"
                  flat
                  mode="hexa"
                />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import validate from '@/validator'

export default {
  data() {
    return {
      tab: 0,
      config: JSON.parse(JSON.stringify(this.$store.state.config))
    }
  },
  methods: {
    done() {
      if (validate('/config', this.config)) {
        this.$store.commit('updateConfig', {
          config: this.config,
          app: this,
          write: true
        })
        this.$emit('input', false)
      }
    },
    importFromFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = async e => {
        const content = JSON.parse(e.target.result)
        if (validate('/config', content)) {
          this.config = content
          this.$store.commit('alert', {
            text: 'Success!',
            type: 'success'
          })
        }
      }
      reader.readAsText(file)
    },
    downloadJSON() {
      const timeStr = new Date()
        .toJSON()
        .slice(0, -8)
        .replace(/-|:/g, '')
      this.$refs.downloadLink.download = `config-${timeStr}.json`
      this.$refs.downloadLink.href =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(localStorage.getItem('config'))
      this.$refs.downloadLink.click()
    }
  }
}
</script>

<style>
.bg-preview-wrapper {
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
}

.bg-preview {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
</style>
