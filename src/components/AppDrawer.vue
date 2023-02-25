<script setup lang="ts">
import { ref } from 'vue'
import {
  mdiAlert, mdiApplicationImport, mdiBookmarkPlusOutline, mdiCog,
  mdiGithub, mdiFileDownloadOutline
} from '@mdi/js'
import { useModeStore } from '@/store/mode'
import { BookmarkWithID, useBookmarkStore } from '@/store/bookmark'
import AppLogo from '@/components/AppLogo.vue'
import ServiceWorker from '@/components/ServiceWorker.vue'
import ClearConfirmDialog from '@/dialogs/ClearConfirmDialog.vue'

defineProps<{drawer: boolean}>()
const emit = defineEmits<{(e: 'update:drawer', drawer: boolean): void}>()

const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()

const confirmOpen = ref(false)
const downloadLink = ref<HTMLAnchorElement | null>(null)

const newBookmark = () => {
  modeStore.update({
    mode: 'edit-dialog',
    data: {
      title: '',
      url: '',
      index: bookmarkStore.bookmarks.length
    }
  })
}
const downloadJSON = () => {
  // Copy and delete `id` and `index` field
  const bookmarks: (
    Omit<BookmarkWithID, 'index'|'id'> &
    Partial<Pick<BookmarkWithID, 'index'|'id'>>
  )[] = JSON.parse(JSON.stringify(bookmarkStore.bookmarks))
  bookmarks.forEach(m => {
    delete m.id
    delete m.index
  })
  const timeStr = new Date().toJSON().slice(0, -8).replace(/-|:/g, '')
  if (downloadLink.value === null) return
  downloadLink.value.download = `bookmarks-${timeStr}.json`
  downloadLink.value.href =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(bookmarks, null, 4))
  downloadLink.value.click()
}
</script>

<template>
  <v-navigation-drawer
    :model-value="drawer"
    disable-resize-watcher
    app
    @update:model-value="emit('update:drawer', $event)"
  >
    <v-list shaped nav density="compact">
      <v-list-item>
        <v-list-item-title class="text-subtitle-1">
          WebNav
        </v-list-item-title>
        <v-list-item-subtitle>
          <AppLogo class="text-center" />
        </v-list-item-subtitle>
      </v-list-item>

      <v-divider />

      <v-list-item
        link
        data-cy="button-import"
        @click="modeStore.update('import-dialog')"
      >
        <template #prepend>
          <v-icon :icon="mdiApplicationImport" />
        </template>
        <v-list-item-title>{{ $t('menu.import') }}</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="downloadJSON">
        <template #prepend>
          <v-icon :icon="mdiFileDownloadOutline" />
        </template>
        <a ref="downloadLink" class="d-none" />
        <v-list-item-title>{{ $t('menu.export') }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        link
        data-cy="button-new-bookmark"
        @click="newBookmark"
      >
        <template #prepend>
          <v-icon :icon="mdiBookmarkPlusOutline" />
        </template>
        <v-list-item-title>{{ $t('menu.new-bookmark') }}</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="modeStore.update('config-dialog')">
        <template #prepend>
          <v-icon :icon="mdiCog" />
        </template>
        <v-list-item-title>{{ $t('menu.more-config') }}</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="confirmOpen=true">
        <template #prepend>
          <v-icon :icon="mdiAlert" />
        </template>
        <v-list-item-title>{{ $t('menu.clear-bookmark') }}</v-list-item-title>
      </v-list-item>

      <v-list-item link href="https://github.com/AllanChain/webnav">
        <template #prepend>
          <v-icon :icon="mdiGithub" />
        </template>
        <v-list-item-title>{{ $t('menu.github-link') }}</v-list-item-title>
      </v-list-item>

      <v-divider />
      <ServiceWorker />
    </v-list>
  </v-navigation-drawer>
  <ClearConfirmDialog v-model="confirmOpen" />
</template>
