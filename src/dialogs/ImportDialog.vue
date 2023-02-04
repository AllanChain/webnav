<template>
  <v-dialog
    :model-value="true"
    @update:model-value="$emit('update:modelValue', false)"
  >
    <v-card class="elevation-12">
      <v-card-text class="pa-3">
        <v-container>
          <v-row>
            <v-text-field
              v-model="url"
              prepend-inner-icon="mdi-web"
              color="purple"
              label="JSON URL"
              placeholder="https://example.cors/marks.json"
              density="compact" variant="outlined" hide-details
            />
          </v-row>
          <v-row>
            <v-switch
              v-model="overwrite"
              data-cy="switch-overwrite-bookmark"
              hide-details
              :label="$t('import.overwrite')"
            />
          </v-row>
          <v-row justify="space-between" class="mx-4">
            <v-btn icon small color="indigo lighten-1" @click="$refs.file.click()">
              <v-icon>mdi-file-upload-outline</v-icon>
            </v-btn>
            <input
              ref="file"
              data-cy="input-file-bookmark"
              type="file"
              accept=".json"
              hidden
              @change="importFromFile"
            >
            <v-btn icon small color="amber" @click="$emit('update:modelValue', false)">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
            <v-btn
              icon small color="green"
              data-cy="import-check"
              @click="importFromCloud"
            >
              <v-icon>mdi-check-bold</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import validate from '@/validator'

const bookmarkMatch = (t, m) => t.url === m.url && t.search === m.search

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      url: '',
      overwrite: false
    }
  },
  computed: {
    ...mapState('db/bookmarks', ['bookmarks'])
  },
  methods: {
    async importFromCloud () {
      try {
        const response = await fetch(this.url)
        const bookmarks = await response.json()
        this.importBookmarks(bookmarks)
      } catch (error) {
        this.$store.commit('alert', {
          text: error,
          type: 'error'
        })
      }
    },
    importFromFile (e) {
      const file = e.target.files[0]
      // Clear input to let it fire for the same file
      e.target.value = null
      const reader = new FileReader()
      reader.onload = async e => {
        const content = e.target.result
        await this.importBookmarks(JSON.parse(content))
      }
      reader.readAsText(file)
    },
    async importBookmarks (bookmarks) {
      if (!validate('/bookmarks', bookmarks)) {
        this.$emit('update:modelValue', false)
        return
      }
      // https://stackoverflow.com/a/36744732/8810271
      bookmarks = bookmarks.filter((m, index, self) =>
        self.findIndex(t => bookmarkMatch(t, m)) === index
      )

      if (this.overwrite) {
        bookmarks.forEach((b, i) => { b.index = i })
        await this.$store.dispatch('db/bookmarks/clearAndAddAll', bookmarks)
      } else {
        bookmarks = bookmarks = bookmarks.filter(m =>
          this.bookmarks.findIndex(t => bookmarkMatch(t, m)) === -1
        )
        bookmarks.forEach((b, i) => {
          b.index = i + this.bookmarks.length
        })
        await this.$store.dispatch('db/bookmarks/addAll', bookmarks)
      }

      this.$store.commit('alert', {
        text: this.$t('message.import-success', bookmarks.length),
        type: 'success'
      })
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style></style>
