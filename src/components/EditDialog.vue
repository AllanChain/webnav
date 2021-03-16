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
      <v-card-text class="pt-4 pb-0">
        <v-text-field
          v-model="bookmark.title"
          prepend-inner-icon="mdi-bookmark"
          :label="$t('bookmark.name')"
          placeholder="Example"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.url"
          prepend-inner-icon="mdi-web"
          :label="$t('bookmark.url')"
          placeholder="https://example.com"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.search"
          prepend-inner-icon="mdi-magnify"
          :label="$t('bookmark.search')"
          placeholder="/search?wd={}"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.icon"
          prepend-inner-icon="mdi-earth"
          :label="$t('bookmark.icon')"
          placeholder="/favicon.ico"
          outlined
          dense
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
import WebsiteIcon from '@/components/WebsiteIcon'
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
        this.$store.dispatch('put', this.bookmark)
      else
        this.$store.dispatch('add', this.bookmark)
      this.$store.commit('alert', {
        text: this.$t('message.success'),
        type: 'success'
      })
      this.$emit('input', false)
    },
    deleteThis () {
      this.$store.dispatch('delete', this.bookmark)
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
