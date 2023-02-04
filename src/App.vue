<template>
  <v-theme-provider :theme="theme">
    <v-app>
      <v-app-bar app :color="config.barColor" theme="dark" density="compact">
        <v-app-bar-nav-icon
          data-cy="button-drawer"
          @click="drawer = !drawer"
        />
        <v-text-field
          ref="text"
          :model-value="query"
          prepend-inner-icon="mdi-magnify"
          hide-details
          variant="outlined"
          single-line
          density="compact"
          clearable
          @mousedown="handleAutofill"
          @update:model-value="query = $event || ''"
          @focus="textFocus = true"
          @blur="textFocus = false"
        />
        <!-- Clear will set the string to null -->
        <!-- See https://github.com/vuetifyjs/vuetify/issues/4144 -->
        <v-spacer />
        <v-expand-x-transition>
          <v-btn
            v-show="showBtn"
            data-cy="button-edit-mode"
            icon="mdi-pencil"
            :color="$store.state.mode === 'edit' ? 'green' : undefined"
            @click="
              $store.commit(
                'switchMode',
                $store.state.mode === 'edit' ? 'normal' : 'edit'
              )
            "
          />
        </v-expand-x-transition>
      </v-app-bar>
      <v-main
        :style="{
          backgroundColor: config.bgImg.filter.blurColor,
        }"
      >
        <div
          class="bg-image"
          :style="{
            backgroundImage: `url(${config.bgImg.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            filter: `blur(${config.bgImg.filter.blur}px)
            contrast(${config.bgImg.filter.contrast}%)
            grayscale(${config.bgImg.filter.grayscale}%)`,
          }"
        />
        <div class="mt-3 mx-2 alert-box">
          <DisAlert
            v-for="(message, i) in $store.state.messages"
            :key="i"
            :message="message"
          />
        </div>
        <WebNav :query="query" />
        <ImportDialog
          v-if="$store.state.mode === 'import-dialog'"
          @update:model-value="dialogClose"
        />
        <EditDialog
          v-if="$store.state.mode === 'edit-dialog'"
          @update:model-value="dialogClose"
        />
        <ReorderDialog
          v-if="$store.state.mode === 'reorder-dialog'"
          @update:model-value="dialogClose"
        />
        <ConfigDialog
          v-if="$store.state.mode === 'config-dialog'"
          @update:model-value="dialogClose"
        />
      </v-main>
      <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
        <v-list shaped nav density="compact">
          <v-list-item>
            <v-list-item-title class="text-subtitle-1">
              WebNav
            </v-list-item-title>
            <v-list-item-subtitle>
              <logo class="text-center" @click="install.prompt()" />
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider />

          <v-list-item
            link
            data-cy="button-import"
            @click="$store.commit('switchMode', 'import-dialog')"
          >
            <template #prepend>
              <v-icon icon="mdi-application-import" />
            </template>
            <v-list-item-title>{{ $t('menu.import') }}</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="downloadJSON">
            <template #prepend>
              <v-icon icon="mdi-file-download-outline" />
            </template>
            <a ref="downloadLink" class="d-none" />
            <v-list-item-title>{{ $t('menu.export') }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            link
            data-cy="button-new-bookmark"
            @click="newBookmark"
          >
            <template #prepend>
              <v-icon icon="mdi-bookmark-plus-outline" />
            </template>
            <v-list-item-title>{{ $t('menu.new-bookmark') }}</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="$store.commit('switchMode', 'config-dialog')">
            <template #prepend>
              <v-icon icon="mdi-cog" />
            </template>
            <v-list-item-title>{{ $t('menu.more-config') }}</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="confirmClear">
            <template #prepend>
              <v-icon icon="mdi-alert" />
            </template>
            <v-list-item-title>{{ $t('menu.clear-bookmark') }}</v-list-item-title>
          </v-list-item>

          <v-list-item link href="https://github.com/AllanChain/webnav">
            <template #prepend>
              <v-icon icon="mdi-github" />
            </template>
            <v-list-item-title>{{ $t('menu.github-link') }}</v-list-item-title>
          </v-list-item>

          <v-divider />
          <v-list-item @click="upgradeApp">
            <v-icon size="small">
              {{
                $store.state.swStatus === 'updated'
                  ? 'mdi-cog-refresh'
                  : 'mdi-cogs'
              }}
            </v-icon>
            <div class="text-caption ml-2 d-inline-block">
              v{{ version }} - {{ $t(`sw.${$store.state.swStatus}`) }}
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </v-theme-provider>
</template>

<script>
import pkg from '../package.json'
import { skipWaiting } from './registerServiceWorker'
import WebNav from '@/components/WebNav.vue'
import Logo from '@/components/Logo.vue'
import DisAlert from '@/components/DisAlert.vue'
import { mapState } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'App',
  components: {
    ImportDialog: defineAsyncComponent(() =>
      import(/* webpackChunkName: "import" */ '@/dialogs/ImportDialog.vue')
    ),
    EditDialog: defineAsyncComponent(() =>
      import(/* webpackChunkName: "edit" */ '@/dialogs/EditDialog.vue')
    ),
    ReorderDialog: defineAsyncComponent(() =>
      import(/* webpackChunkName: "reorder" */ '@/dialogs/ReorderDialog.vue')
    ),
    ConfigDialog: defineAsyncComponent(() =>
      import(/* webpackChunkName: "config" */ '@/dialogs/ConfigDialog.vue')
    ),
    WebNav,
    Logo,
    DisAlert
  },
  data () {
    return {
      install: null,
      theme: 'light',
      importDialog: false,
      query: '',
      drawer: false,
      version: pkg.version,
      textFocus: false,
      autofilled: false,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' }
      ]
    }
  },
  computed: {
    showBtn () {
      if (window.innerWidth >= 550) return true
      if (this.textFocus || this.query) return false
      return true
    },
    ...mapState('config', ['config']),
    ...mapState('db/bookmarks', ['bookmarks'])
  },
  watch: {
    'config.dark': {
      immediate: true,
      handler (dark) {
        this.theme = dark ? 'dark' : 'light'
      }
    }
  },
  mounted () {
    window.addEventListener('beforeinstallprompt', this.installPrompt)
  },
  unmounted () {
    window.removeEventListener('beforeinstallprompt', this.installPrompt)
  },
  methods: {
    installPrompt (e) {
      e.preventDefault()
      this.install = e
    },
    async upgradeApp () {
      if (this.$store.state.swStatus === 'updated') {
        await skipWaiting()
        location.reload()
      }
    },
    dialogClose () {
      this.drawer = false
      this.$store.commit('switchMode', 'normal')
    },
    newBookmark () {
      this.$store.commit({
        type: 'switchMode',
        mode: 'edit-dialog',
        data: {
          title: '',
          url: '',
          index: this.bookmarks.length
        }
      })
    },
    downloadJSON () {
      // Copy and delete `id` and `index` field
      const bookmarks = JSON.parse(JSON.stringify(this.bookmarks))
      bookmarks.forEach(m => {
        delete m.id
        delete m.index
      })
      const timeStr = new Date().toJSON().slice(0, -8).replace(/-|:/g, '')
      this.$refs.downloadLink.download = `bookmarks-${timeStr}.json`
      this.$refs.downloadLink.href =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(bookmarks, null, 4))
      this.$refs.downloadLink.click()
    },
    confirmClear () {
      if (prompt(this.$t('message.clear-warn')) === 'CLEAR')
        this.$store.dispatch('db/bookmarks/clear')
    },
    handleAutofill () {
      if (!this.autofilled) {
        this.query = this.$refs.text.$refs.input.value
        this.autofilled = true
      }
    }
  }
}
</script>

<style>
html {
  font-size: 16px !important;
}

.alert-box {
  position: fixed;
  z-index: 9999;
}

.grayscale {
  filter: grayscale(100%);
}

.bg-image {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
