<template>
  <img
    v-bind="image"
    @error="image.src = 'img/fallback.png'"
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
    const cors = this.$store.state.config.cors
    let src = cors + url.resolve(
      this.bookmark.url,
      this.bookmark.icon || '/favicon.ico'
    )
    if (!this.$store.state.config.httpIcon && !src.startsWith('https://'))
      src = 'img/fallback.png'
    let image = {
      src,
      style: {
        width: this.size,
        height: this.size
      }
    }
    if (cors) {
      image = {
        ...image,
        crossorigin: 'anonymous'
      }
    }
    return { image }
  }
}
</script>

<style></style>
