<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { mdiSquare, mdiSelectColor } from '@mdi/js'
import { extractColors } from 'extract-colors'

const props = defineProps<{
  modelValue: string
  label: string
  bgImage?: string | null
  message?: string
}>()
const emit = defineEmits<{(e: 'update:modelValue', color: string): void }>()

const color = ref(props.modelValue)
const swatches = ref<string[][]>([])
const dialogOpen = ref(false)

watchEffect(() => {
  color.value = props.modelValue
})
watchEffect(async () => {
  if (props.bgImage) {
    const colors = await extractColors(props.bgImage).catch(() => null)
    if (colors === null) return
    const hexes = colors.sort((a, b) => b.area - a.area).map(c => c.hex)
    const chunkSize = Math.ceil(hexes.length / 5)
    const res = []
    for (let i = 0; i < hexes.length; i += chunkSize) {
      const chunk = hexes.slice(i, i + chunkSize)
      res.push(chunk)
    }
    swatches.value = res
  }
})

const selectDone = () => {
  emit('update:modelValue', color.value)
  dialogOpen.value = false
}
</script>

<template>
  <v-text-field
    class="mt-3"
    :model-value="modelValue"
    :append-inner-icon="mdiSelectColor"
    :label="label"
    :rules="[
      (v: string) => !!v.match(/^#[\da-fA-F]{6}$/) || $t('config.bg.invalid-color')
    ]"
    :messages="message"
    variant="outlined"
    color="primary"
    density="compact"
    @click:append-inner="dialogOpen = true"
  >
    <template #prepend-inner>
      <v-icon :icon="mdiSquare" :color="modelValue" />
    </template>
  </v-text-field>
  <v-dialog v-model="dialogOpen" width="300">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact">
          <v-toolbar-title>
            {{ $t('config.bg.pick-color') }}
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-color-picker
        v-model="color"
        canvas-height="150"
        rounded="0"
        elevation="0"
        mode="hex"
        :swatches="swatches"
        show-swatches
        hide-inputs
      />
      <v-card-actions class="pt-0">
        <v-btn color="amber darken-3" @click="dialogOpen=false">
          {{ $t('button.cancel') }}
        </v-btn>
        <v-spacer />
        <v-btn color="green" @click="selectDone">
          {{ $t('button.done') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
