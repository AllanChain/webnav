<template>
  <div class="text-center pt-5">
    <div style="max-width: 700px; margin: auto;">
      <div
        v-for="bookmark in $store.state.bookmarks"
        :key="bookmark.id" class="box"
      >
        <div>
          <v-overlay
            absolute opacity="0.1" z-index="2"
            :value="$store.state.mode === 'edit'"
          >
            <v-btn
              color="#2196f390" fab x-small
              @click="$store.commit('switchMode', {
                mode: 'edit-dialog',
                data: bookmark
              })"
            >
              <v-icon color="white">
                edit
              </v-icon>
            </v-btn>
          </v-overlay>
          <v-overlay
            absolute opacity="0.1" z-index="2"
            :value="$store.state.mode === 'normal' && query && !!bookmark.search"
          >
            <v-btn
              color="#2196f390" fab x-small
              @click="goSearch(bookmark)"
            >
              <v-icon color="white">
                search
              </v-icon>
            </v-btn>
          </v-overlay>
          <WebsiteIcon :bookmark="bookmark" @click.native="goURL(bookmark.url)" />
        </div>
        <div
          class="url" 
          :style="{
            color: $store.state.config.blackText ? '#000' : '#eee',
            textShadow: `1px 1px 3px
            ${$store.state.config.blackText ? '#eee' : '#000'}`
          }"
        >
          {{ bookmark.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from 'url'
import WebsiteIcon from '@/components/WebsiteIcon'

export default {
  components: {
    WebsiteIcon,
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  methods: {
    goSearch(bookmark) {
      this.goURL(url.resolve(
        bookmark.url,
        bookmark.search.replace('{}', this.query)
      ))
    },
    goURL(url) {
      window.location.href = url
    }
  }
}
</script>

<style>
.box {
  position: relative;
  display: inline-block;
  width: 65px;
  border: 0;
}

.url {
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
