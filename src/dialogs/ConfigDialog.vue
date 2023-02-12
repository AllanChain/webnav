<script setup lang="ts">
import { useAlertStore } from '@/store/alert'
import { Config, useConfigStore } from '@/store/config'
import validate from '@/validator'
import {
  mdiCheck, mdiFileUploadOutline, mdiFileDownloadOutline,
  mdiImage, mdiLanguageJava, mdiCloseCircleOutline, mdiAirplaneTakeoff
} from '@mdi/js'
import { ref } from 'vue'

const emit = defineEmits<{(e: 'update:modelValue', open: boolean): void}>()

const configStore = useConfigStore()
const alertStore = useAlertStore()

const tab = ref(0)
const config = ref(JSON.parse(JSON.stringify(configStore.getConfig())) as Config)
const downloadLink = ref<HTMLAnchorElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const done = () => {
  if (validate('/config', config.value)) {
    configStore.update(config.value)
    emit('update:modelValue', false)
  }
}
const importFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file === undefined) return
  const reader = new FileReader()
  reader.onload = async () => {
    const content = JSON.parse(reader.result as string)
    if (validate('/config', content)) {
      config.value = content
      alertStore.push({
        text: 'Success!',
        type: 'success'
      })
    }
  }
  reader.readAsText(file)
}
const downloadJSON = () => {
  if (downloadLink.value === null) return
  const configString = localStorage.getItem('config')
  if (configString === null) return
  const timeStr = new Date()
    .toJSON()
    .slice(0, -8)
    .replace(/-|:/g, '')
  downloadLink.value.download = `config-${timeStr}.json`
  downloadLink.value.href =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(configString)
  downloadLink.value.click()
}
</script>
<template>
  <v-dialog
    scrollable
    fullscreen
    :model-value="true"
    @update:model-value="$emit('update:modelValue', false)"
  >
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
        <v-toolbar color="indigo" dark density="compact">
          <v-toolbar-title>{{ $t('config.title') }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon size="large" color="blue lighten-2" @click="fileInput?.click()">
            <v-icon :icon="mdiFileUploadOutline" />
          </v-btn>
          <v-btn icon size="large" @click="downloadJSON">
            <v-icon color="amber" :icon="mdiFileDownloadOutline" />
          </v-btn>
          <v-btn icon size="large" @click="done">
            <v-icon color="green lighten-2" :icon="mdiCheck" />
          </v-btn>
          <v-btn icon size="large" @click="$emit('update:modelValue', false)">
            <v-icon color="yellow lighten-2" :icon="mdiCloseCircleOutline" />
          </v-btn>
        </v-toolbar>
        <v-tabs v-model="tab" background-color="indigo-darken-1">
          <v-tab> {{ $t('config.bg.title') }} </v-tab>
          <v-tab> {{ $t('config.other.title') }} </v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text class="pt-4">
        <v-window v-model="tab">
          <!-- Background -->
          <v-window-item>
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
                  :model-value="config.bgImg.url"
                  :prepend-inner-icon="mdiImage"
                  :label="$t('config.bg.image-url')"
                  placeholder="back.jpg"
                  :messages="$t('config.bg.img-msg')"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  clearable
                  @update:model-value="config.bgImg.url = $event || ''"
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
                        color="primary"
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
                        color="primary"
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
                        color="primary"
                        hide-details
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-switch
                  v-model="config.blackText"
                  class="mt-0"
                  hide-details
                  color="primary"
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
          </v-window-item>
          <!-- other -->
          <v-window-item>
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
                  item-title="text"
                  item-state="value"
                  :prepend-inner-icon="mdiLanguageJava"
                  hide-details
                  variant="outlined"
                  color="primary"
                  density="compact"
                />
                <v-switch v-model="config.dark" color="primary" hide-details :label="$t('config.other.dark-mode')" />
                <p>
                  {{ $t('config.other.cors-note') }}
                </p>
                <v-text-field
                  v-model="config.cors"
                  :prepend-inner-icon="mdiAirplaneTakeoff"
                  :label="$t('config.other.cors')"
                  placeholder="e.g. https://netnr-proxy.cloudno.de/"
                  hide-details
                  variant="outlined"
                  color="primary"
                  density="compact"
                />
                <v-switch
                  v-model="config.httpIcon"
                  hide-details
                  color="primary"
                  :label="$t('config.other.http-icon')"
                />
                <v-switch
                  v-model="config.preferNewTab"
                  hide-details
                  color="primary"
                  :label="$t('config.other.prefer-new-tab')"
                />
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
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style>
.bg-preview-wrapper {
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
}

.bg-preview {
  background-size: cover;
  background-position: center 60%;
  width: 100%;
  height: 100%;
}
</style>
