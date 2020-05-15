<template>
  <img
    v-bind="image"
    @error="image.src = 'img/icons/favicon-32x32.png'"
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
    if (!src.startsWith('https://')) src = 'img/icons/favicon-32x32.png'
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
