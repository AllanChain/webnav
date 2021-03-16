<template>
  <v-overlay
    opacity="0.7"
    @click.native="closeDialog"
  >
    <v-slider
      :value="index"
      color="purple"
      track-color="indigo"
      thumb-label="always"
      :min="0"
      :max="bookmarks.length - 1"
      @input="reorder"
    />
    <div style="width: 90vw;" />
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      index: this.$store.state.modeData
    }
  },
  computed: {
    ...mapState('db/bookmarks', ['bookmarks'])
  },
  methods: {
    reorder (newIndex) {
      this.$store.dispatch('reorder', {
        from: this.index,
        to: newIndex
      })
      this.index = newIndex
    },
    async closeDialog () {
      this.$store.commit('switchMode', 'normal')
      await this.$store.dispatch('putAll')
      this.$store.commit('alert', {
        text: 'Reordered!',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>
