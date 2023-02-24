<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useConfig } from '@/store/config'
import { useModeStore } from '@/store/mode'
import { useAlertStore } from '@/store/alert'
import WebNav from '@/components/WebNav.vue'
import AppBar from '@/components/AppBar.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import DisAlert from '@/components/DisAlert.vue'
import ImportDialog from '@/dialogs/ImportDialog.vue'
import EditDialog from '@/dialogs/EditDialog.vue'
import ReorderDialog from '@/dialogs/ReorderDialog.vue'
import ConfigDialog from '@/dialogs/ConfigDialog.vue'
import { useBookmarkStore } from '@/store/bookmark'
import { useBGImg } from '@/composables/bgImg'

const config = useConfig()
const modeStore = useModeStore()
const alertStore = useAlertStore()
const bookmarkStore = useBookmarkStore()

const theme = ref<'light' | 'dark'>('light')
const query = ref('')
const drawer = ref(false)
const { bgImg } = useBGImg(config)

onMounted(async () => {
  await bookmarkStore.init()
})

watchEffect(() => {
  theme.value = config.value.dark ? 'dark' : 'light'
})

const dialogClose = () => {
  drawer.value = false
  modeStore.update('normal')
}
</script>
<template>
  <v-theme-provider :theme="theme">
    <v-app>
      <AppBar v-model:query="query" @drawer-toggle="drawer = !drawer" />
      <v-main
        :style="{
          backgroundColor: config.bgImg.filter.blurColor,
        }"
      >
        <div
          class="bg-image"
          :style="{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            filter: `blur(${config.bgImg.filter.blur}px)
            contrast(${config.bgImg.filter.contrast}%)
            grayscale(${config.bgImg.filter.grayscale}%)`,
          }"
        />
        <div class="mt-3 mx-2 alert-box">
          <DisAlert
            v-for="(message, i) in alertStore.messages"
            :key="i"
            :message="message"
          />
        </div>
        <WebNav :query="query" />
        <ImportDialog
          v-if="modeStore.mode === 'import-dialog'"
          @update:model-value="dialogClose"
        />
        <EditDialog
          v-if="modeStore.mode === 'edit-dialog'"
          @update:model-value="dialogClose"
        />
        <ReorderDialog
          v-if="modeStore.mode === 'reorder-dialog'"
          @update:model-value="dialogClose"
        />
        <ConfigDialog
          v-if="modeStore.mode === 'config-dialog'"
          @update:model-value="dialogClose"
        />
      </v-main>
      <AppDrawer v-model:drawer="drawer" />
    </v-app>
  </v-theme-provider>
</template>

<style>
html {
  font-size: 16px !important;
}

.alert-box {
  position: fixed;
  z-index: 9999;
}

.grayscale {
  filter: grayscale(100%);
}

.bg-image {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
