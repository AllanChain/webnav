<template>
  <v-dialog v-if="!!bookmark" :value="value" @input="$emit('input', false)">
    <v-card class="ma-2">
      <v-card-title class="ma-2">
        <WebsiteIcon :bookmark="bookmark" size="1.2rem" />
        <v-text-field
          v-model="bookmark.title"
          class="px-1"
          hide-details
          dense
        />
        <v-btn icon small @click="dialog = true">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
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
          placeholder="/search?wd={searchItem}"
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
    bookmark: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
