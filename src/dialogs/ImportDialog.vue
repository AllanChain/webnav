<script setup lang="ts">
import { useAlertStore } from '@/store/alert'
import { Bookmark, useBookmarkStore } from '@/store/bookmark'
import validate from '@/validator'
import { mdiCheckBold, mdiWeb, mdiFileUploadOutline, mdiCloseThick } from '@mdi/js'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{(e: 'update:modelValue', open: boolean): void}>()

type ImportedBookmark = Omit<Bookmark, 'index'>

// const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()
const alertStore = useAlertStore()
const { t } = useI18n()

const url = ref('')
const file = ref<File | undefined>()
const overwrite = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const canImport = computed(() => url.value !== '' || file.value !== undefined)

const bookmarkMatch = (t:ImportedBookmark, m: ImportedBookmark) => t.url === m.url && t.search === m.search

const importFromCloud = async () => {
  try {
    const response = await fetch(url.value)
    const bookmarks = await response.json()
    importBookmarks(bookmarks)
  } catch (error) {
    alertStore.push({
      text: typeof error === 'string' ? error : 'Unknown error',
      type: 'error'
    })
  }
}
const importFromFile = () => {
  if (file.value === undefined) return
  const reader = new FileReader()
  reader.onload = async () => {
    const content = reader.result as string
    await importBookmarks(JSON.parse(content))
  }
  reader.readAsText(file.value)
}
const doImport = () => {
  if (url.value) {
    importFromCloud()
  } else {
    importFromFile()
  }
}
const importBookmarks = async (bookmarks: ImportedBookmark[]) => {
  if (!validate('/bookmarks', bookmarks)) {
    emit('update:modelValue', false)
    return
  }
  // https://stackoverflow.com/a/36744732/8810271
  bookmarks = bookmarks.filter((m, index, self) =>
    self.findIndex(t => bookmarkMatch(t, m)) === index
  )

  if (overwrite.value) {
    const indexedBookmarks = bookmarks.map((b, index) => ({ ...b, index }))
    await bookmarkStore.clearAndAddAll(indexedBookmarks)
  } else {
    bookmarks = bookmarks = bookmarks.filter(m =>
      bookmarks.findIndex(t => bookmarkMatch(t, m)) === -1
    )
    const indexedBookmarks = bookmarks.map((b, i) => ({
      ...b, index: i + bookmarks.length
    }))
    await bookmarkStore.addAll(indexedBookmarks)
  }

  alertStore.push({
    text: t('message.import-success', bookmarks.length),
    type: 'success'
  })
  emit('update:modelValue', false)
}
</script>
<template>
  <v-dialog
    width="500"
    :model-value="true"
    @update:model-value="$emit('update:modelValue', false)"
  >
    <v-card class="elevation-12">
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact">
          <v-toolbar-title>
            {{ $t('import.title') }}
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        {{ $t('import.url-import') }}
        <v-text-field
          v-model="url"
          class="pt-1"
          :prepend-inner-icon="mdiWeb"
          color="primary"
          label="JSON URL"
          placeholder="https://example.cors/marks.json"
          density="compact"
          variant="outlined"
        />
        <v-expand-transition>
          <div v-show="!url">
            {{ $t('import.or-file-import') }}
            <v-btn
              :prepend-icon="mdiFileUploadOutline"
              small
              :color="file ? 'green' : 'indigo lighten-1'"
              @click="fileInput?.click()"
            >
              {{ file ? $t('import.file-ready') : $t('import.upload-file') }}
            </v-btn>
          </div>
        </v-expand-transition>
        <input
          ref="fileInput"
          data-cy="input-file-bookmark"
          type="file"
          accept=".json"
          hidden
          @change="file = ($event.target as HTMLInputElement).files?.[0]"
        >
        <v-checkbox
          v-model="overwrite"
          color="primary"
          data-cy="switch-overwrite-bookmark"
          hide-details
          :label="$t('import.overwrite')"
        />
        <v-card-actions>
          <v-btn :prepend-icon="mdiCloseThick" small color="amber" @click="emit('update:modelValue', false)">
            {{ $t('button.cancel') }}
          </v-btn>
          <v-spacer />
          <v-btn
            :prepend-icon="mdiCheckBold"
            :disabled="!canImport"
            small
            color="green"
            data-cy="import-check"
            @click="doImport"
          >
            {{ $t('button.done') }}
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
