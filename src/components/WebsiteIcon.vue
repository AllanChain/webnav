<template>
  <img
    v-if="!!src"
    :src="src"
    :style="{
      width: size,
      height: size
    }"
    @error="src = 'img/icons/favicon-32x32.png'"
  >
</template>

<script>
import url from 'url'

export default {
  props: {
    bookmark: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: '2rem'
    }
  },
  data() {
    return {
      src: url.resolve(this.bookmark.url,
                       this.bookmark.icon || '/favicon.ico')
    }
  }
}
</script>

<style></style>
