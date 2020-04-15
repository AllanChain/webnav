<template>
  <v-dialog :value="value" max-width="350px" @input="$emit('input', false)">
    <v-card class="elevation-12">
      <v-card-text class="pa-1">
        <v-container>
          <v-row>
            <v-text-field
              v-model="url"
              prepend-inner-icon="link"
              color="purple"
              label="JSON URL"
              placeholder="https://cors.net/bookmarks.json"
              dense outlined hide-details
            />
          </v-row>
          <v-row>
            <v-col cols="4" class="text-center">
              <v-btn fab small color="indigo lighten-1" @click="$refs.file.click()">
                <v-icon>upload_file</v-icon>
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
              <v-btn fab small color="amber" @click="emit(false)">
                <v-icon>cancel</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
              <v-btn fab small color="green" @click="importFromCloud">
                <v-icon>done</v-icon>
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
  name: 'JsonImport',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url: ''
    }
  },
  methods: {
    async importFromCloud() {
      try {
        let response = await fetch(this.url)
        let bookmarks = await response.json()
        this.importBookmarks(bookmarks)
      } catch (error) {
        alert(error)
      }
    },
    importFromFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = async e => {
        const content = e.target.result
        await this.importBookmarks(JSON.parse(content))
      }
      reader.readAsText(file)
    },
    async importBookmarks(bookmarks) {
      if (!validate('/bookmarks', bookmarks)) {
        this.$emit('input', false)
        return
      }
      // https://stackoverflow.com/a/36744732/8810271
      bookmarks = bookmarks.filter(
        (m, index, self) => 
          self.findIndex(t => bookmarkMatch(t, m)) === index &&
          this.$store.state.bookmarks.findIndex(
            t => bookmarkMatch(t, m)) === -1)
      bookmarks.forEach((b, i) => b.index = i)
      await this.$store.dispatch('addAll', bookmarks)
      this.$store.commit('alert', {
        text: `Successfully added ${bookmarks.length} bookmark(s)`,
        type: 'success'
      })
      this.$emit('input', false)
    }
  }
}
</script>

<style></style>
