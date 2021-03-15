<template>
  <v-dialog :value="true" max-width="350px" @input="$emit('input', false)">
    <v-card class="elevation-12">
      <v-card-text class="pa-1">
        <v-container>
          <v-row>
            <v-text-field
              v-model="url"
              prepend-inner-icon="mdi-web"
              color="purple"
              label="JSON URL"
              placeholder="https://example.cors/marks.json"
              dense outlined hide-details
            />
          </v-row>
          <v-row>
            <v-switch
             v-model="overwrite"
             dense
             hide-details
             class="ml-4 mt-0"
              :label="$t('import.overwrite')"
              />
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center">
              <v-btn fab small color="indigo lighten-1" @click="$refs.file.click()">
                <v-icon>mdi-file-upload-outline</v-icon>
              </v-btn>
              <input
                ref="file"
                type="file"
                accept=".json"
                hidden
                @change="importFromFile"
              >
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn fab small color="amber" @click="$emit('input', false)">
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn fab small color="green" @click="importFromCloud">
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import validate from '@/validator'

const bookmarkMatch = (t, m) => t.url === m.url && t.search === m.search

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      url: '',
      overwrite: false
    }
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
        this.$emit('input', false)
        return
      }
      // https://stackoverflow.com/a/36744732/8810271
      bookmarks = bookmarks.filter((m, index, self) =>
        self.findIndex(t => bookmarkMatch(t, m)) === index
      )

      if (this.overwrite) {
        bookmarks.forEach((b, i) => { b.index = i })
        await this.$store.dispatch('clearAndAddAll', bookmarks)
      } else {
        bookmarks = bookmarks = bookmarks.filter(m =>
          this.$store.state.bookmarks.findIndex(t => bookmarkMatch(t, m)) === -1
        )
        bookmarks.forEach((b, i) => {
          b.index = i + this.$store.state.bookmarks.length
        })
        await this.$store.dispatch('addAll', bookmarks)
      }

      this.$store.commit('alert', {
        text: this.$tc('message.import-success', bookmarks.length),
        type: 'success'
      })
      this.$emit('input', false)
    }
  }
}
</script>

<style></style>
