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
          <v-btn icon large data-cy="done" @click="done">
            <v-icon color="green lighten-2">
              mdi-check-bold
            </v-icon>
          </v-btn>
          <v-btn
            v-if="bookmark.id" icon large
            data-cy="delete"
            @click="deleteThis"
          >
            <v-icon color="red lighten-2">
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            v-if="bookmark.id"
            icon large data-cy="reorder"
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
          data-cy="input-title"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.url"
          prepend-inner-icon="mdi-web"
          :label="$t('bookmark.url')"
          placeholder="https://example.com"
          data-cy="input-url"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.search"
          prepend-inner-icon="mdi-magnify"
          :label="$t('bookmark.search')"
          placeholder="/search?wd={}"
          data-cy="input-search"
          outlined
          dense
        />
        <v-text-field
          v-model="bookmark.icon"
          prepend-inner-icon="mdi-earth"
          :label="$t('bookmark.icon')"
          placeholder="/favicon.ico"
          data-cy="input-icon"
          outlined
          dense
        />
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer />
        <v-btn
          text
          color="primary"
          :disabled="!bookmark.url || faviconGrabLoading"
          @click="faviconGrab"
        >
          FaviconGrab
          <span v-if="faviconGrabLoading">...</span>
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
      faviconGrabLoading: false
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
    async faviconGrab () {
      this.faviconGrabLoading = true
      const domain = new URL(this.bookmark.url).hostname
      const response = await fetch(`http://favicongrabber.com/api/grab/${domain}`)
      const previewData = await response.json()
      this.faviconGrabLoading = false
      if (previewData.error) {
        this.$store.commit('alert', {
          text: `${previewData.error}: ${previewData.description}`,
          type: 'error'
        })
        return
      }
      if (previewData.icons.length) {
        this.bookmark.icon = RelateUrl.relate(
          this.bookmark.url, previewData.icons[0].src
        )
      }
    }
  }
}
</script>
