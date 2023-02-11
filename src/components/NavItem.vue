<script setup lang="ts">
import { BookmarkWithID } from '@/store/bookmark'
import { useConfig } from '@/store/config'
import { useModeStore } from '@/store/mode'
import WebsiteIcon from '@/components/WebsiteIcon.vue'

const props = defineProps<{
  bookmark: BookmarkWithID
  query: string
}>()

const config = useConfig()
const modeStore = useModeStore()

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
  <div class="nav-item-container">
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
        @click="modeStore.update({
          mode: 'edit-dialog',
          data: bookmark
        })"
      >
        <v-icon color="white">
          mdi-pencil
        </v-icon>
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
        <v-icon color="white">
          mdi-magnify
        </v-icon>
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
  </div>
</template>

<style>
.nav-item-container {
  position: relative;
  display: inline-block;
  width: 65px;
  border: 0;
  user-select: none;
}

.nav-item {
  display: block;
  text-decoration: none;
  color: inherit;
  transition-property: all;
  transition-duration: 500ms;
  cursor: pointer;
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
</style>
