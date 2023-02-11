<script setup lang="ts">
import { ref, watchEffect, watch, computed } from 'vue'
import { Bookmark } from '@/store/bookmark'
import { useConfig } from '@/store/config'
import FallbackIcon from '@/components/FallbackIcon.vue'

export interface Props {
  bookmark: Bookmark
  size?: string
}
const props = withDefaults(defineProps<Props>(), { size: '2rem' })

const config = useConfig()

const src = computed(() => {
  try {
    return config.value.cors + new URL(
      props.bookmark.icon || '/favicon.ico', props.bookmark.url
    ).href
  } catch (err) {
    return ''
  }
})
const useFallback = ref(false)

watchEffect(() => {
  // Fail image serve over http if configured
  if (!config.value.httpIcon && !src.value.startsWith('https://')) {
    useFallback.value = true
  }
})
// reset useFallback when src changes
watch(src, () => { useFallback.value = false })
</script>

<template>
  <img
    v-if="!useFallback"
    class="website-icon"
    :src="src"
    :crossorigin="config.cors ? 'anonymous' : undefined"
    :style="{ width: size, height: size }"
    data-cy="website-icon"
    @error="useFallback = true"
  >
  <FallbackIcon
    v-else
    :title="bookmark.title"
    :size="size"
  />
</template>
