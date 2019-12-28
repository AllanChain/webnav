<template>
  <div>
    <div class="search">
      <input v-model="query" type="text" id="search_input" />
    </div>
    <br />
    <div
      class="box"
      v-for="(bookmark, index) in bookmarks"
      :key="index"
      :data-url="bookmark.url"
      :data-search="bookmark.search"
      @click="go"
    >
      <img class="icon" :src="bookmark.url_icon" />
      <p class="url">{{ bookmark.title }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookmarks: null,
      query: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    go(event) {
      let targetData = event.currentTarget.dataset;
      let url;
      if (this.query && targetData.search) {
        url = targetData.url + "/" + targetData.search + this.query;
      } else {
        url = targetData.url;
      }
      window.location.href = url;
    },
    fetchData() {
      axios
        .get("Bookmarks.json")
        .then(response => {
          this.bookmarks = response.data;
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  }
};
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
