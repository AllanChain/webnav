<script setup lang="ts">
import { useBookmarkStore } from '@/store/bookmark'
import NavItem from './NavItem.vue'

const bookmarkStore = useBookmarkStore()

defineProps<{
  query: string
}>()
</script>

<template>
  <div class="text-center pt-5">
    <div style="max-width: 700px; margin: auto;">
      <NavItem
        v-for="bookmark in bookmarkStore.bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        :query="query"
      />
    </div>
  </div>
</template>
