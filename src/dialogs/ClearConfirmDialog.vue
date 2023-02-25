<script setup lang="ts">
import { useBookmarkStore } from '@/store/bookmark'
import { mdiAlert } from '@mdi/js'

const emit = defineEmits<{(e:'update:modelValue', v:boolean):void}>()

const bookmarkStore = useBookmarkStore()

const closeDialog = () => emit('update:modelValue', false)
const confirmClear = () => {
  bookmarkStore.clear()
  closeDialog()
}
</script>

<template>
  <v-dialog
    width="350"
    :model-value="true"
    @update:model-value="closeDialog"
  >
    <v-card class="text-center elevation-12">
      <v-card-title class="text-red">
        <v-icon :icon="mdiAlert" size="xxx-large" />
        <div>{{ $t('menu.clear-bookmark') }}</div>
      </v-card-title>
      <v-card-text>
        {{ $t('message.clear-warn') }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="amber darken-3" data-cy="clear-cancel" @click="closeDialog">
          {{ $t('button.cancel') }}
        </v-btn>
        <v-spacer />
        <v-btn color="red" data-cy="clear-confirm" @click="confirmClear">
          {{ $t('button.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
