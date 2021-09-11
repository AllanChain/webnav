<template>
  <div class="text-center pt-5">
    <div style="max-width: 700px; margin: auto;">
      <div
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        class="box"
      >
        <v-overlay
          contained z-index="2"
          class="justify-center align-center"
          :model-value="$store.state.mode === 'edit'"
        >
          <v-btn
            color="#2196f390" icon size="small"
            data-cy="edit-one"
            @click="$store.commit('switchMode', {
              mode: 'edit-dialog',
              data: bookmark
            })"
          >
            <v-icon color="white" size="small">
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-overlay>
        <v-overlay
          contained z-index="2"
          class="justify-center align-center"
          :model-value="$store.state.mode === 'normal' && !!query.length && !!bookmark.search"
        >
          <v-btn
            color="#2196f390" icon size="small"
            @click="goSearch(bookmark)"
          >
            <v-icon color="white" size="x-small">
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-overlay>
        <div v-ripple class="website" @click="goURL(bookmark.url)">
          <WebsiteIcon :bookmark="bookmark" />
          <div
            class="name"
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

<script>
import { mapState } from 'vuex'
import WebsiteIcon from '@/components/WebsiteIcon.vue'

export default {
  components: {
    WebsiteIcon
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('config', ['config']),
    ...mapState('db/bookmarks', ['bookmarks'])
  },
  methods: {
    goSearch (bookmark) {
      this.goURL(new URL(
        bookmark.search.replace('{}', this.query),
        bookmark.url
      ).href)
    },
    goURL (url) {
      if (this.config.preferNewTab)
        window.open(url, '_blank', 'noopener,noreferrer')
      else window.location.href = url
    }
  }
}
</script>

<style scoped>
.box {
  position: relative;
  display: inline-block;
  width: 65px;
  border: 0;
  user-select: none;
}
.website:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.website {
  transition-property: all;
  transition-duration: 500ms;
  cursor: pointer;
}
.name {
  height: 3em;
  line-height: 1.1em;
  width: 65px;
  font-size: 0.75em;
  white-space: wrap;
  overflow: hidden;
  -webkit-border-top-right-radius: 5px;
  -webkit-border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  padding-top: 3px;
  padding-bottom: 8px;
}
</style>
