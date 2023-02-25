<script setup lang="ts">
import RelateUrl from 'relateurl'
import WebsiteIcon from '@/components/WebsiteIcon.vue'
import validate from '@/validator'
import { useModeStore } from '@/store/mode'
import { BookmarkWithID, useBookmarkStore } from '@/store/bookmark'
import { ref, reactive, watch, toRaw } from 'vue'
import { useAlertStore } from '@/store/alert'
import { useI18n } from 'vue-i18n'
import {
  mdiBookmark, mdiCheckBold, mdiDelete, mdiSwapHorizontal, mdiWeb,
  mdiMagnify, mdiEarth
} from '@mdi/js'

const emit = defineEmits<{(e: 'update:modelValue', open: boolean): void}>()

const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()
const alertStore = useAlertStore()
const { t } = useI18n()

const bookmark = reactive(
  JSON.parse(JSON.stringify(modeStore.data)) as BookmarkWithID
)
const faviconGrabLoading = ref(false)

const done = () => {
  if (!validate('/bookmark', toRaw(bookmark))) { return }
  if (bookmark.id) {
    bookmarkStore.put(bookmark)
  } else {
    bookmarkStore.add(bookmark)
  }
  alertStore.push({
    text: t('message.success'),
    type: 'success'
  })
  emit('update:modelValue', false)
}
const deleteThis = () => {
  bookmarkStore.delete(bookmark)
  emit('update:modelValue', false)
}
// Watch paste
watch(() => bookmark.url, (newURL, oldURL) => {
  if (bookmark.url !== newURL) return // out of sync
  // On mobile, onpaste event is not fired
  if (oldURL.length === 0 && newURL.length > 10) {
    if (!newURL.startsWith('http')) {
      bookmark.url = `https://${newURL}`
    }
    faviconGrab()
  }
})
const faviconGrab = async () => {
  faviconGrabLoading.value = true
  try {
    const domain = new URL(bookmark.url).hostname
    const response = await fetch(`${import.meta.env.VITE_FAVIEW_API}/${domain}`)
    const previewData = await response.json()
    faviconGrabLoading.value = false
    if (previewData.error) {
      alertStore.push({
        text: t('faview.error'),
        type: 'error'
      })
      return
    }
    if (previewData.icons.length) {
      bookmark.icon = RelateUrl.relate(
        bookmark.url, previewData.icons[0].src
      )
    }
    if (previewData.title && !bookmark.title) {
      bookmark.title = previewData.title.split(/(:| ?[-|])/)[0]
    }
    if (previewData.search && !bookmark.search) {
      bookmark.search = previewData.search.replace('searchTerms', '')
    }
  } catch {
    alertStore.push({
      text: t('faview.error'),
      type: 'error'
    })
    faviconGrabLoading.value = false
  }
}
</script>
<template>
  <v-dialog
    scrollable
    width="500"
    :model-value="true"
    @update:model-value="$emit('update:modelValue', false)"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact">
          <v-toolbar-title>
            <WebsiteIcon :bookmark="bookmark" size="1.2rem" />
            {{ bookmark.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            :icon="mdiCheckBold"
            color="green lighten-2"
            density="comfortable"
            data-cy="done"
            @click="done"
          />
          <v-btn
            v-if="bookmark.id"
            :icon="mdiDelete"
            color="red lighten-2"
            density="comfortable"
            data-cy="delete"
            @click="deleteThis"
          />
          <v-btn
            v-if="bookmark.id"
            :icon="mdiSwapHorizontal"
            color="yellow lighten-2"
            density="comfortable"
            data-cy="reorder"
            @click="modeStore.update({
              mode: 'reorder-dialog',
              data: bookmark.index
            })"
          />
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pt-4 pb-0">
        <v-text-field
          v-model="bookmark.title"
          color="primary"
          :prepend-inner-icon="mdiBookmark"
          :label="$t('bookmark.name')"
          placeholder="Example"
          data-cy="input-title"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-text-field
          v-model="bookmark.url"
          :autofocus="bookmark.url === ''"
          color="primary"
          :prepend-inner-icon="mdiWeb"
          :label="$t('bookmark.url')"
          placeholder="https://example.com"
          data-cy="input-url"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-text-field
          v-model="bookmark.search"
          color="primary"
          :prepend-inner-icon="mdiMagnify"
          :label="$t('bookmark.search')"
          placeholder="/search?wd={}"
          data-cy="input-search"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-text-field
          v-model="bookmark.icon"
          color="primary"
          :prepend-inner-icon="mdiEarth"
          :label="$t('bookmark.icon')"
          placeholder="/favicon.ico"
          data-cy="input-icon"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn
          text
          data-cy="info-grab"
          color="primary"
          :disabled="!bookmark.url || faviconGrabLoading"
          @click="faviconGrab"
        >
          {{ $t('faview.action') }}
          <span v-if="faviconGrabLoading">...</span>
          <span v-else>!</span>
        </v-btn>
        <v-spacer />
        <v-btn
          class="text-green"
          data-cy="done-bottom"
          @click="done"
        >
          {{ $t('button.done') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
