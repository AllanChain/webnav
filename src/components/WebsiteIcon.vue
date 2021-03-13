<template>
  <img
    v-bind="image"
    @error="image.src = 'img/fallback.png'"
  >
</template>

<script>
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
  data () {
    return {
      image: {}
    }
  },
  watch: {
    bookmark: {
      deep: true,
      immediate: true,
      handler (bookmark) {
        const cors = this.$store.state.config.cors
        let src = cors + new URL(bookmark.icon || '/favicon.ico', bookmark.url).href
        // Fail image serve over http if configured
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
        this.image = image
      }
    }
  }
}
</script>
