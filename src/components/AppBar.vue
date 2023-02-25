<script setup lang="ts">
import { useBookmarkStore } from '@/store/bookmark'
import { useConfigStore } from '@/store/config'
import { useModeStore } from '@/store/mode'
import { computed, ref, watch } from 'vue'
import type { VTextField } from 'vuetify/components/VTextField'
import { mdiMagnify, mdiPencil, mdiBookmarkPlusOutline } from '@mdi/js'
const configStore = useConfigStore()
const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'drawer-toggle'): void
  (e: 'update:query', query: string): void
}>()

const props = defineProps<{
  query: string
}>()

const _query = ref(props.query)
watch(_query, (newQuery) => emit('update:query', newQuery))

const textFocus = ref(false)
const autofilled = ref(false)
const textInput = ref<InstanceType<typeof VTextField> | null>(null)

const config = computed(() => configStore.getConfig())
const showBtn = computed(() => {
  if (window.innerWidth >= 550) return true
  if (textFocus.value || _query.value) return false
  return true
})
const barTheme = computed(() => {
  const rgb = parseInt(config.value.barColor.slice(1), 16) // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
  return luma < 100 ? 'dark' : 'light'
})

const handleAutofill = () => {
  if (!autofilled.value) {
    if (textInput.value === null) return
    // Vuetify is not aware of auto completed contents
    const el = textInput.value.$el as HTMLDivElement
    const inputEl = el.getElementsByTagName('input')[0]
    _query.value = inputEl.value
    autofilled.value = true
  }
}
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
</script>

<template>
  <v-app-bar app :color="config.barColor" :theme="barTheme" density="compact">
    <v-app-bar-nav-icon
      data-cy="button-drawer"
      @click="emit('drawer-toggle')"
    />
    <v-text-field
      ref="textInput"
      :prepend-inner-icon="mdiMagnify"
      hide-details
      variant="outlined"
      single-line
      density="compact"
      clearable
      :model-value="_query"
      @mousedown="handleAutofill"
      @update:model-value="_query = $event || ''"
      @focus="textFocus = true"
      @blur="textFocus = false"
    />
    <!-- Clear will set the string to null -->
    <!-- See https://github.com/vuetifyjs/vuetify/issues/4144 -->
    <v-spacer />
    <v-expand-x-transition>
      <v-btn
        v-show="showBtn"
        data-cy="button-edit-mode"
        :icon="mdiPencil"
        :color="modeStore.mode === 'edit' ? 'green' : undefined"
        @click="
          modeStore.update(
            modeStore.mode === 'edit' ? 'normal' : 'edit'
          )
        "
      />
    </v-expand-x-transition>
    <v-expand-x-transition>
      <v-btn
        v-show="showBtn"
        data-cy="button-add-bookmark"
        :icon="mdiBookmarkPlusOutline"
        @click="newBookmark"
      />
    </v-expand-x-transition>
  </v-app-bar>
</template>
