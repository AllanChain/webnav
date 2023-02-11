<script setup lang="ts">
import WebsiteIcon from '@/components/WebsiteIcon.vue'
import { BookmarkWithID, useBookmarkStore } from '@/store/bookmark'
import { useConfig } from '@/store/config'
import { useModeStore } from '@/store/mode'
import { computed } from 'vue'

const config = useConfig()
const modeStore = useModeStore()
const bookmarkStore = useBookmarkStore()

const props = defineProps<{
  query: string
}>()

const bookmarks = computed(() => bookmarkStore.bookmarks)

const goSearch = (bookmark: BookmarkWithID) => {
  if (bookmark.search === undefined) return
  goURL(new URL(
    bookmark.search.replace('{}', props.query),
    bookmark.url
  ).href)
}
const goURL = (url: string) => {
  if (config.value.preferNewTab) { window.open(url, '_blank', 'noopener,noreferrer') } else window.location.href = url
}
</script>

<template>
  <div class="text-center pt-5">
    <div style="max-width: 700px; margin: auto;">
      <div
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        class="box"
      >
        <v-overlay
          contained
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
          z-index="2"
          class="justify-center align-center"
          :model-value="modeStore.mode === 'normal' && !!query.length && !!bookmark.search"
        >
          <v-btn
            color="#2196f390"
            icon
            size="x-small"
            @click="goSearch(bookmark)"
          >
            <v-icon color="white">
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-overlay>
        <div v-ripple class="website py-1" @click="goURL(bookmark.url)">
          <WebsiteIcon :bookmark="bookmark" />
          <div
            class="name py-1"
            data-cy="title"
            :style="{
              color: config.blackText ? '#000' : '#eee',
              textShadow: `1px 1px 3px
              ${config.blackText ? '#eee' : '#000'}`
            }"
          >
            {{ bookmark.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  display: inline-block;
  width: 65px;
  border: 0;
  user-select: none;
}

.website {
  transition-property: all;
  transition-duration: 500ms;
  cursor: pointer;
}

.website:hover {
  background-color: rgb(0 0 0 / 10%);
}

.name {
  height: 3em;
  line-height: 1.1em;
  width: 65px;
  font-size: 0.75em;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
