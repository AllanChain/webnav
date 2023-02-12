<script setup lang="ts">
import { useAlertStore } from '@/store/alert'
import { Bookmark, useBookmarkStore } from '@/store/bookmark'
import validate from '@/validator'
import { mdiCheckBold, mdiWeb, mdiFileUploadOutline, mdiCloseThick } from '@mdi/js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{(e: 'update:modelValue', open: boolean): void}>()

type ImportedBookmark = Omit<Bookmark, 'index'>

// const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()
const alertStore = useAlertStore()
const { t } = useI18n()

const url = ref('')
const overwrite = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

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
const importFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file === undefined) return
  // Clear input to let it fire for the same file
  target.value = ''
  const reader = new FileReader()
  reader.onload = async () => {
    const content = reader.result as string
    await importBookmarks(JSON.parse(content))
  }
  reader.readAsText(file)
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
      <v-card-text class="pa-3">
        <v-container>
          <v-row>
            <v-text-field
              v-model="url"
              :prepend-inner-icon="mdiWeb"
              color="purple"
              label="JSON URL"
              placeholder="https://example.cors/marks.json"
              density="compact"
              variant="outlined"
              hide-details
            />
          </v-row>
          <v-row>
            <v-switch
              v-model="overwrite"
              data-cy="switch-overwrite-bookmark"
              hide-details
              :label="$t('import.overwrite')"
            />
          </v-row>
          <v-row justify="space-between" class="mx-4">
            <v-btn icon small color="indigo lighten-1" @click="fileInput?.click()">
              <v-icon :icon="mdiFileUploadOutline" />
            </v-btn>
            <input
              ref="fileInput"
              data-cy="input-file-bookmark"
              type="file"
              accept=".json"
              hidden
              @change="importFromFile"
            >
            <v-btn icon small color="amber" @click="emit('update:modelValue', false)">
              <v-icon :icon="mdiCloseThick" />
            </v-btn>
            <v-btn
              icon
              small
              color="green"
              data-cy="import-check"
              @click="importFromCloud"
            >
              <v-icon :icon="mdiCheckBold" />
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
