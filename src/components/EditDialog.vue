<template>
  <v-dialog
    :value="true"
    max-width="500"
    scrollable
    @input="$emit('input', false)"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark dense>
          <v-toolbar-title>
            <WebsiteIcon :bookmark="bookmark" size="1.2rem" />
            {{ bookmark.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon large @click="done">
            <v-icon color="green lighten-2">
              mdi-check-bold
            </v-icon>
          </v-btn>
          <v-btn v-if="bookmark.id" icon large @click="deleteThis">
            <v-icon color="red lighten-2">
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            v-if="bookmark.id"
            icon large
            @click="$store.commit('switchMode', {
              mode: 'reorder-dialog',
              data: bookmark.index
            })"
          >
            <v-icon color="yellow lighten-2">
              mdi-swap-horizontal
            </v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="mt-4">
        <v-text-field
          v-model="bookmark.title"
          prepend-inner-icon="mdi-bookmark"
          label="Bookmark Name"
          placeholder="Example"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.url"
          prepend-inner-icon="mdi-web"
          label="Website URL"
          placeholder="https://example.com"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.search"
          prepend-inner-icon="mdi-magnify"
          label="Search Template"
          placeholder="/search?wd={}"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.icon"
          prepend-inner-icon="mdi-earth"
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
import validate from '@/validator'

export default {
  components: {
    WebsiteIcon
  },
  data() {
    return {
      bookmark: JSON.parse(JSON.stringify(this.$store.state.modeData))
    }
  },
  methods: {
    done() {
      if (!validate('/bookmark', this.bookmark))
        return
      if (this.bookmark.id)
        this.$store.dispatch('put', this.bookmark)
      else
        this.$store.dispatch('add', this.bookmark)
      this.$store.commit('alert', {
        text: 'Success!',
        type: 'success'
      })
      this.$emit('input', false)
    },
    deleteThis() {
      this.$store.dispatch('delete', this.bookmark.id)
      this.$emit('input', false)
    }
  }
}
</script>

<style></style>
