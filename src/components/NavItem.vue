<script setup lang="ts">
import { ref } from 'vue'
import {
  mdiMagnify, mdiPencil, mdiDotsVertical, mdiDelete, mdiSwapHorizontalBold
} from '@mdi/js'
import { BookmarkWithID, useBookmarkStore } from '@/store/bookmark'
import { useConfig } from '@/store/config'
import { useModeStore } from '@/store/mode'
import WebsiteIcon from '@/components/WebsiteIcon.vue'

const props = defineProps<{
  bookmark: BookmarkWithID
  query: string
}>()

const config = useConfig()
const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()

const showActions = ref(false)
const container = ref<HTMLDivElement | null>(null)

const openEdit = () => modeStore.update({
  mode: 'edit-dialog',
  data: props.bookmark
})
const deleteThis = () => {
  bookmarkStore.delete(props.bookmark)
}
const startReorder = () => {
  modeStore.update({
    mode: 'reorder-dialog',
    data: props.bookmark.index
  })
}
const goSearch = () => {
  if (props.bookmark.search === undefined) return
  goURL(new URL(
    props.bookmark.search.replace('{}', props.query),
    props.bookmark.url
  ).href)
}
const goURL = (url: string) => {
  if (config.value.preferNewTab) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    window.location.href = url
  }
}
</script>

<template>
  <div ref="container" class="nav-item-container">
    <v-overlay
      contained
      persistent
      z-index="2"
      class="justify-center align-center"
      :model-value="modeStore.mode === 'edit'"
    >
      <v-btn
        color="#2196f390"
        icon
        size="x-small"
        data-cy="edit-one"
        @click="openEdit"
      >
        <v-icon color="white" :icon="mdiPencil" />
      </v-btn>
    </v-overlay>
    <v-overlay
      contained
      persistent
      z-index="2"
      class="justify-center align-center"
      :model-value="modeStore.mode === 'normal' && !!query.length && !!bookmark.search"
    >
      <v-btn
        color="#2196f390"
        icon
        size="x-small"
        @click="goSearch"
      >
        <v-icon color="white" :icon="mdiMagnify" />
      </v-btn>
    </v-overlay>
    <a
      v-ripple
      class="nav-item py-1"
      :href="bookmark.url"
      :target="config.preferNewTab ? '_blank' : undefined"
      rel="noopener,noreferrer"
    >
      <WebsiteIcon :bookmark="bookmark" />
      <div
        class="nav-item-name py-1"
        data-cy="title"
        :style="{
          color: config.blackText ? '#000' : '#eee',
          textShadow: `1px 1px 3px
              ${config.blackText ? '#eee' : '#000'}`
        }"
      >
        {{ bookmark.title }}
      </div>
    </a>

    <v-btn
      class="nav-item-actions"
      position="absolute"
      location="top right"
      density="compact"
      size="small"
      color="rgba(3, 9, 27, 0.2)"
      :icon="mdiDotsVertical"
      @click="showActions = true"
    />
    <v-menu v-model="showActions" location="end">
      <template #activator="{ props:menuProps }">
        <div class="nav-item-menu-anchor" v-bind="menuProps" />
      </template>
      <v-list
        shaped
        link
        density="compact"
        :bg-color="config.dark ? 'rgb(100, 100, 100, 0.9)': 'rgb(240, 240, 240, 0.9)'"
      >
        <v-list-item @click="openEdit">
          <template #prepend>
            <v-icon class="menu-icon" :icon="mdiPencil" size="x-small" />
          </template>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item class="text-red-darken-2" @click="deleteThis">
          <template #prepend>
            <v-icon class="menu-icon" :icon="mdiDelete" size="x-small" />
          </template>
          <v-list-item-title>Remove</v-list-item-title>
        </v-list-item>
        <v-list-item class="text-yellow-darken-4" @click="startReorder">
          <template #prepend>
            <v-icon class="menu-icon" :icon="mdiSwapHorizontalBold" size="x-small" />
          </template>
          <v-list-item-title color="red">
            Reorder
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style>
.nav-item-container {
  position: relative;
  display: inline-block;
  width: 65px;
  border: 0;
}

.nav-item {
  display: block;
  text-decoration: none;
  color: inherit;
  transition-property: all;
  transition-duration: 500ms;
  cursor: pointer;
  user-select: none;
}

.nav-item:hover {
  background-color: rgb(0 0 0 / 10%);
}

.nav-item-name {
  height: 3em;
  line-height: 1.1em;
  width: 65px;
  font-size: 0.75em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-item-actions {
  display: none !important;
}

.nav-item-container:hover .nav-item-actions {
  display: inline-grid !important;
}

.nav-item-menu-anchor {
  position: absolute;
  top: 1em;
  right: 0;
}

.menu-icon {
  margin-inline-end: 8px !important;
}
</style>
