<template>
  <v-dialog :model-value="true">
    <v-slider
      :model-value="index"
      data-cy="reorder-slider"
      color="purple"
      track-color="indigo"
      thumb-label="always"
      :min="0"
      :max="bookmarks.length - 1"
      step="1"
      @update:model-value="reorder"
    />
    <div class="d-flex" style="width: 90vw;">
      <v-btn color="amber darken-3" data-cy="reorder-cancel" @click="cancel">
        {{ $t('button.cancel') }}
      </v-btn>
      <v-spacer />
      <v-btn color="green" data-cy="reorder-apply" @click="apply">
        {{ $t('button.apply') }}
      </v-btn>
    </div>
  </v-dialog>
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
      this.$store.commit('db/bookmarks/reorder', {
        from: this.index,
        to: newIndex
      })
      this.index = newIndex
    },
    async apply () {
      this.$store.commit('switchMode', 'normal')
      await this.$store.dispatch('db/bookmarks/putAll')
      this.$store.commit('alert', {
        text: 'Reordered!',
        type: 'success'
      })
    },
    async cancel () {
      this.$store.commit('switchMode', 'normal')
      await this.$store.dispatch('db/bookmarks/refresh')
    }
  }
}
</script>

<style>

</style>
