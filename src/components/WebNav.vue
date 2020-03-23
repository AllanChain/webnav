<template>
  <div>
    <div class="text-center pt-5">
      <div
        v-for="bookmark in $store.state.bookmarks"
        :key="bookmark.url"
        class="box"
        @click="go(bookmark)"
      >
        <div>
          <v-btn
            v-show="$store.state.editMode"
            color="#2196f390"
            class="edit-overlay"
            fab
            x-small
          >
            <v-icon color="white">
              edit
            </v-icon>
          </v-btn>
          <WebsiteIcon :bookmark="bookmark" />
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
    go(bookmark) {
      if (this.$store.state.editMode) {
        this.dialog = true
        this.editingBookmark = bookmark
        return
      }
      let searchUrl
      if (this.query && bookmark.search) {
        searchUrl = url.resolve(
          bookmark.url,
          bookmark.search.replace('{}', this.query)
        )
      } else searchUrl = bookmark.url

      window.location.href = searchUrl
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

.edit-overlay {
  position: absolute !important;
  top: 0;
  right: 0;
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
