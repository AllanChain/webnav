<script setup lang="ts">
import { computed } from 'vue'
import randomColor from 'randomcolor'

const props = defineProps<{
  title: string
  size: string
}>()

const displayChar = computed(() => props.title.length ? props.title[0].toUpperCase() : '')
const bgColor = computed(() => randomColor({
  seed: props.title,
  luminosity: 'light'
}))
const fontSize = computed(
  // Alphanumerical chars looks smaller, enlarge them
  () => displayChar.value.match(/[0-9a-zA-Z]/)
    ? '1.2em'
    : '1.05em'
)
</script>

<template>
  <div
    v-if="displayChar !== ''"
    class="fallback-icon d-inline-block"
    :style="{ width: size, height: size, fontSize: size, backgroundColor: bgColor }"
  >
    <div class="fallback-icon-text" :style="{fontSize}">
      {{ displayChar }}
    </div>
  </div>
</template>

<style>
.fallback-icon {
  text-align: center;
  overflow: hidden;
  border-radius: 0.2em;
}
.fallback-icon-text {
  line-height: 1em;
  transform: rotate(15deg);
  font-weight: bold;
  color: rgba(3, 9, 27, 0.8)
}
</style>
