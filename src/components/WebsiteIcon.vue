<template>
  <img
    :src="src"
    :crossorigin="crossorigin"
    :style="{ width: size, height: size }"
    data-cy="website-icon"
    @error="src = 'img/fallback.png'"
  >
</template>

<script setup lang="ts">
import { Bookmark } from '@/store/bookmark'
import { useConfig } from '@/store/config'
import { ref, watchEffect } from 'vue'

export interface Props {
  bookmark: Bookmark
  size?: string
}
const props = withDefaults(defineProps<Props>(), { size: '2rem' })

const config = useConfig()

const src = ref('')
const crossorigin = ref<'anonymous' | undefined>(undefined)

watchEffect(() => {
  const cors = config.value.cors
  try {
    src.value = cors + new URL(props.bookmark.icon || '/favicon.ico', props.bookmark.url).href
  } catch (err) {
    return
  }
  // Fail image serve over http if configured
  if (!config.value.httpIcon && !src.value.startsWith('https://'))
    src.value = 'img/fallback.png'
  if (cors)
    crossorigin.value = 'anonymous'
})
</script>
