<script setup lang="ts">
import { useAlertStore } from '@/store/alert'
import { useBookmarkStore } from '@/store/bookmark'
import { useModeStore } from '@/store/mode'
import { ref } from 'vue'

const bookmarkStore = useBookmarkStore()
const modeStore = useModeStore()
const alertStore = useAlertStore()

const index = ref(modeStore.data as number)
const reorder = (newIndex: number) => {
  bookmarkStore.reorder({
    from: index.value,
    to: newIndex
  })
  index.value = newIndex
}
const apply = async () => {
  modeStore.update('normal')
  await bookmarkStore.putAll()
  alertStore.push({
    text: 'Reordered!',
    type: 'success'
  })
}
const cancel = async () => {
  modeStore.update('normal')
  await bookmarkStore.refresh()
}
</script>
<template>
  <v-dialog :model-value="true">
    <v-slider
      :model-value="index"
      data-cy="reorder-slider"
      color="purple"
      track-color="indigo"
      thumb-label="always"
      :min="0"
      :max="bookmarkStore.bookmarks.length - 1"
      step="1"
      @update:model-value="reorder"
    />
    <div class="d-flex">
      <v-btn color="amber darken-3" data-cy="reorder-cancel" @click="cancel">
        {{ $t('button.cancel') }}
      </v-btn>
      <v-spacer />
      <v-btn color="green" data-cy="reorder-apply" @click="apply">
        {{ $t('button.apply') }}
      </v-btn>
    </div>
  </v-dialog>
</template>
