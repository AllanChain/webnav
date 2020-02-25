<template>
  <div>
    <div class="search">
      <input
        id="search_input"
        v-model="query"
        type="text"
      >
    </div>
    <br>
    <div
      v-for="(bookmark, index) in bookmarks"
      :key="index"
      class="box"
      :data-url="bookmark.url"
      :data-search="bookmark.search"
      @click="go"
    >
      <img
        class="icon"
        :src="resolveIcon(bookmark)"
      >
      <p class="url">
        {{ bookmark.title }}
      </p>
    </div>
  </div>
</template>

<script>
import url from 'url'
import Vue from 'vue'

const IMG_FALLBACK = 'img/icons/favicon-32x32.png'

export default {
  data() {
    return {
      bookmarks: null,
      query: ''
    }
  },
  async created() {
    await this.fetchData()
    Vue.nextTick(() => {
      for (let image of this.$el.querySelectorAll('img')) {
        image.onerror = function () {
          this.src = this.src === IMG_FALLBACK ? '' : IMG_FALLBACK
        }
      }
    })
  },
  methods: {
    go(event) {
      let targetData = event.currentTarget.dataset
      let url
      if (this.query && targetData.search) 
        url = targetData.url + '/' + targetData.search + this.query
       else 
        url = targetData.url
      
      window.location.href = url
    },
    async fetchData() {
      let resp = await fetch('Bookmarks.json')
      this.bookmarks = await resp.json()
    },
    resolveIcon(bookmark) {
      return bookmark.url_icon || url.resolve(bookmark.url, '/favicon.ico')
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

#search_input {
  padding: 5px 15px;
  font-weight: 500;
  font-size: 1em;
  width: 70%;
  max-width: 500px;
  border-radius: 20px;
  background-color: rgba(200, 200, 200, 0);
  color: #333;
  border: none;
  box-shadow: 0 0 10px rgb(175, 23, 245);
}

input:focus {
  outline: none;
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
