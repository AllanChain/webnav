<template>
  <v-dialog v-if="!!bookmark" :value="value" @input="closeDialog">
    <v-card class="ma-2">
      <v-toolbar color="indigo" dark dense>
        <v-toolbar-title>
          <WebsiteIcon :bookmark="bookmark" size="1.2rem" />
          {{ bookmark.title }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon large @click="done">
          <v-icon color="green lighten-2">
            check
          </v-icon>
        </v-btn>
        <v-btn icon large @click="deleteThis">
          <v-icon color="red lighten-2">
            delete
          </v-icon>
        </v-btn>
        <v-btn icon large @click="closeDialog">
          <v-icon color="yellow lighten-2">
            cancel
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-text-field
          v-model="bookmark.title"
          prepend-inner-icon="bookmark"
          label="Bookmark Name"
          placeholder="Example"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.url"
          prepend-inner-icon="language"
          label="Website URL"
          placeholder="https://example.com"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.search"
          prepend-inner-icon="search"
          label="Search Template"
          placeholder="/search?wd={}"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.icon"
          prepend-inner-icon="adb"
          label="Website Icon"
          placeholder="/favicon.ico"
          outlined
          dense
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import WebsiteIcon from '@/components/WebsiteIcon'

export default {
  components: {
    WebsiteIcon
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      bookmark: JSON.parse(JSON.stringify(this.$store.state.modeData))
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('switchMode', 'normal')
      this.$emit('input', false)
    },
    done(){
      if (this.bookmark.id)
        this.$store.dispatch('put', this.bookmark)
      else
        this.$store.dispatch('add', this.bookmark)
      this.closeDialog()
    },
    deleteThis(){
      this.$store.dispatch('delete', this.bookmark.id)
      this.closeDialog()
    }
  }
}
</script>

<style></style>
