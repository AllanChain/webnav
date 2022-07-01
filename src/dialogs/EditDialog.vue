<template>
  <v-dialog
    scrollable
    :model-value="true"
    @update:model-value="$emit('update:modelValue', false)"
  >
    <v-card width="500px" max-width="90vw">
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark density="compact">
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
          color="primary"
          prepend-inner-icon="mdi-bookmark"
          :label="$t('bookmark.name')"
          placeholder="Example"
          data-cy="input-title"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-text-field
          v-model="bookmark.url"
          color="primary"
          prepend-inner-icon="mdi-web"
          :label="$t('bookmark.url')"
          placeholder="https://example.com"
          data-cy="input-url"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-text-field
          v-model="bookmark.search"
          color="primary"
          prepend-inner-icon="mdi-magnify"
          :label="$t('bookmark.search')"
          placeholder="/search?wd={}"
          data-cy="input-search"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-text-field
          v-model="bookmark.icon"
          color="primary"
          prepend-inner-icon="mdi-earth"
          :label="$t('bookmark.icon')"
          placeholder="/favicon.ico"
          data-cy="input-icon"
          class="my-4"
          variant="outlined"
          density="compact"
          hide-details
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
import WebsiteIcon from '@/components/WebsiteIcon.vue'
import validate from '@/validator'
import { mapState } from 'vuex'

export default {
  components: {
    WebsiteIcon
  },
  emits: ['update:modelValue'],
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
      this.$emit('update:modelValue', false)
    },
    deleteThis () {
      this.$store.dispatch('db/bookmarks/delete', this.bookmark)
      this.$emit('update:modelValue', false)
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
