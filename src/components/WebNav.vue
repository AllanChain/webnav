<template>
  <div>
    <div class="text-center pt-5">
      <div
        v-for="bookmark in $store.state.bookmarks"
        :key="bookmark.id"
        class="box"
      >
        <div>
          <v-overlay absolute opacity="0.1" :value="$store.state.editMode">
            <v-btn
              color="#2196f390"
              fab
              x-small
              @click="dialog = true; editingBookmark = bookmark"
            >
              <v-icon color="white">
                edit
              </v-icon>
            </v-btn>
          </v-overlay>
          <v-overlay
            absolute
            opacity="0.1"
            :value="!$store.state.editMode && query && !!bookmark.search"
          >
            <v-btn
              color="#2196f390"
              fab
              x-small
              @click="goSearch(bookmark)"
            >
              <v-icon color="white">
                search
              </v-icon>
            </v-btn>
          </v-overlay>
          <WebsiteIcon :bookmark="bookmark" @click="goURL(bookmark.url)" />
        </div>
        <p class="url">
          {{ bookmark.title }}
        </p>
      </div>
    </div>
    <EditDialog v-model="dialog" :bookmark="editingBookmark" />
  </div>
</template>

<script>
import url from 'url'
import WebsiteIcon from '@/components/WebsiteIcon'
import EditDialog from '@/components/EditDialog'

export default {
  components: {
    WebsiteIcon,
    EditDialog
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      editingBookmark: {}
    }
  },
  methods: {
    add() {
      this.editingBookmark = {
        title: 'New Bookmark',
        url: ''
      }
      this.dialog = true
    },
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
  color: #eee;
  text-shadow: 1px 1px 3px #000;
  height: 2em;
  line-height: 1.1em;
  width: 65px;
  font-size: 0.75em;
  white-space: wrap;
  overflow: hidden;
  margin: auto;
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
