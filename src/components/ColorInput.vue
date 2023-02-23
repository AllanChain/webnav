<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { mdiFormatColorFill, mdiSelectColor } from '@mdi/js'

const props = defineProps<{
  modelValue: string
  label: string
  message?: string
}>()
const emit = defineEmits<{(e: 'update:modelValue', color: string): void }>()

const color = ref(props.modelValue)
const dialogOpen = ref(false)

watchEffect(() => {
  color.value = props.modelValue
})

const selectDone = () => {
  emit('update:modelValue', color.value)
  dialogOpen.value = false
}
</script>

<template>
  <v-text-field
    class="mt-2"
    :model-value="modelValue"
    :prepend-inner-icon="mdiFormatColorFill"
    :append-inner-icon="mdiSelectColor"
    :label="label"
    :rules="[
      (v: string) => !!v.match(/^#([\da-fA-F]{3}){1,2}$/) || 'Color'
    ]"
    :messages="message"
    variant="outlined"
    color="primary"
    density="compact"
    @click:append-inner="dialogOpen = true"
  />
  <v-dialog v-model="dialogOpen" width="320">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact">
          <v-toolbar-title>
            Pick a color
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-color-picker
          v-model="color"
          canvas-height="100"
          hide-inputs
          flat
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="yellow" @clcik="dialogOpen=false">
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
