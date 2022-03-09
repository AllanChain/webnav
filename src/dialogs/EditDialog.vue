<template>
  <v-dialog
    scrollable
    :model-value="true"
    @update:modelValue="$emit('update:modelValue', false)"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact" class="pr-1">
          <v-toolbar-title>
            <WebsiteIcon :bookmark="bookmark" size="1.2rem" />
            {{ bookmark.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            icon="mdi-check-bold"
            color="green lighten-2"
            size="small"
            data-cy="done"
            @click="done"
          />
          <v-btn
            v-if="bookmark.id"
            icon="mdi-delete"
            color="red lighten-2"
            size="small"
            data-cy="delete"
            @click="deleteThis"
          />
          <v-btn
            v-if="bookmark.id"
            icon="mdi-swap-horizontal"
            color="yellow lighten-2"
            size="small"
            data-cy="reorder"
            @click="$store.commit('switchMode', {
              mode: 'reorder-dialog',
              data: bookmark.index
            })"
          />
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pt-4 pb-0">
        <v-text-field
          v-model="bookmark.title"
          prepend-inner-icon="mdi-bookmark"
          :label="$t('bookmark.name')"
          placeholder="Example"
          data-cy="input-title"
          variant="outlined"
          density="compact"
        />
        <v-text-field
          v-model="bookmark.url"
          prepend-inner-icon="mdi-web"
          :label="$t('bookmark.url')"
          placeholder="https://example.com"
          data-cy="input-url"
          variant="outlined"
          density="compact"
        />
        <v-text-field
          v-model="bookmark.search"
          prepend-inner-icon="mdi-magnify"
          :label="$t('bookmark.search')"
          placeholder="/search?wd={}"
          data-cy="input-search"
          variant="outlined"
          density="compact"
        />
        <v-text-field
          v-model="bookmark.icon"
          prepend-inner-icon="mdi-earth"
          :label="$t('bookmark.icon')"
          placeholder="/favicon.ico"
          data-cy="input-icon"
          variant="outlined"
          density="compact"
        />
      </v-card-text>
      <v-card-actions v-if="config.linkPreviewKey" class="pt-0">
        <v-spacer />
        <v-btn
          text
          color="primary"
          :disabled="!bookmark.url || linkPreviewLoading"
          @click="linkPreview"
        >
          LinkPreview
          <span v-if="linkPreviewLoading">...</span>
          <span v-else>!</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import RelateUrl from 'relateurl'
import WebsiteIcon from '@/components/WebsiteIcon.vue'
import validate from '@/validator'
import { mapState } from 'vuex'

export default {
  components: {
    WebsiteIcon
  },
  data () {
    return {
      bookmark: JSON.parse(JSON.stringify(this.$store.state.modeData)),
      linkPreviewLoading: false
    }
  },
  computed: {
    ...mapState('config', ['config'])
  },
  methods: {
    done () {
      if (!validate('/bookmark', this.bookmark))
        return
      if (this.bookmark.id)
        this.$store.dispatch('db/bookmarks/put', this.bookmark)
      else
        this.$store.dispatch('db/bookmarks/add', this.bookmark)
      this.$store.commit('alert', {
        text: this.$t('message.success'),
        type: 'success'
      })
      this.$emit('input', false)
    },
    deleteThis () {
      this.$store.dispatch('db/bookmarks/delete', this.bookmark)
      this.$emit('input', false)
    },
    async linkPreview () {
      this.linkPreviewLoading = true
      const response = await fetch('https://api.linkpreview.net', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          key: this.config.linkPreviewKey,
          q: this.bookmark.url
        })
      })
      const previewData = await response.json()
      this.linkPreviewLoading = false
      if (previewData.error) {
        this.$store.commit('alert', {
          text: `${previewData.error}: ${previewData.description}`,
          type: 'error'
        })
        return
      }
      if (previewData.title)
        this.bookmark.title = previewData.title
      if (previewData.image) {
        this.bookmark.icon = RelateUrl.relate(
          this.bookmark.url, previewData.image
        )
      }
    }
  }
}
</script>
