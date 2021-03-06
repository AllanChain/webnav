<template>
  <v-app>
    <v-app-bar app :color="config.barColor" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-text-field
        ref="text"
        :value="query"
        prepend-inner-icon="mdi-magnify"
        hide-details outlined
        single-line dense clearable
        @mousedown="handleAutofill"
        @input="query = $event || ''"
        @focus="textFocus = true"
        @blur="textFocus = false"
      />
      <!-- Clear will set the string to null -->
      <!-- See https://github.com/vuetifyjs/vuetify/issues/4144 -->
      <v-spacer />
      <v-expand-x-transition>
        <v-btn
          v-show="showBtn" icon
          @click=" $store.commit('switchMode', 'qrcode-dialog')"
        >
          <v-icon>mdi-qrcode-scan</v-icon>
        </v-btn>
      </v-expand-x-transition>
      <v-expand-x-transition>
        <v-btn
          v-show="showBtn" icon
          :color="$store.state.mode === 'edit' ? 'green' : undefined"
          @click=" $store.commit(
            'switchMode',
            $store.state.mode === 'edit' ? 'normal' : 'edit')"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-expand-x-transition>
    </v-app-bar>
    <v-main
      :style="{
        backgroundColor: config.bgImg.filter.blurColor
      }"
    >
      <div
        class="bg-image"
        :style="{
          backgroundImage: `url(${config.bgImg.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `blur(${config.bgImg.filter.blur}px)
            contrast(${config.bgImg.filter.contrast}%)
            grayscale(${config.bgImg.filter.grayscale}%)`}"
      />
      <div class="mt-3 mx-2 alert-box">
        <DisAlert
          v-for="(message, i) in $store.state.messages"
          :key="i" :message="message"
        />
      </div>
      <WebNav :query="query" />
      <ImportDialog
        v-if="$store.state.mode === 'import-dialog'"
        @input="$store.commit('switchMode', 'normal')"
      />
      <EditDialog
        v-if="$store.state.mode === 'edit-dialog'"
        @input="$store.commit('switchMode', 'normal')"
      />
      <ReorderDialog
        v-if="$store.state.mode === 'reorder-dialog'"
        @input="$store.commit('switchMode', 'normal')"
      />
      <ConfigDialog
        v-if="$store.state.mode === 'config-dialog'"
        @input="$store.commit('switchMode', 'normal')"
      />
      <QRCodeDialog
        v-if="$store.state.mode === 'qrcode-dialog'"
        @input="$store.commit('switchMode', 'normal')"
      />
    </v-main>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              WebNav
            </v-list-item-title>
            <logo class="text-center" @click.native="install.prompt()" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link @click="$store.commit('switchMode', 'import-dialog')">
          <v-list-item-action>
            <v-icon>mdi-application-import</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.import') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="downloadJSON">
          <v-list-item-action>
            <v-icon>mdi-file-download-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.export') }}</v-list-item-title>
            <a ref="downloadLink" class="d-none" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="newBookmark">
          <v-list-item-action>
            <v-icon>mdi-bookmark-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.new-bookmark') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$store.commit('switchMode', 'config-dialog')">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.more-config') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="confirmClear">
          <v-list-item-action>
            <v-icon>mdi-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.clear-bookmark') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://github.com/AllanChain/webnav">
          <v-list-item-action>
            <v-icon>mdi-github</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.github-link') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item @click="upgradeApp">
          <v-list-item-content>
            <span>
              <v-icon small>
                {{
                  $store.state.swStatus === 'updated'
                    ? 'mdi-cog-refresh'
                    : 'mdi-cogs'
                }}
              </v-icon>
              v{{ version }} - {{ $t(`sw.${$store.state.swStatus}`) }}
            </span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { version } from '../package.json'
import { skipWaiting } from './registerServiceWorker'
import WebNav from '@/components/WebNav'
import Logo from '@/components/Logo'
import DisAlert from '@/components/DisAlert'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    ImportDialog: () =>
      import(/* webpackChunkName: "import" */ '@/dialogs/ImportDialog'),
    EditDialog: () =>
      import(/* webpackChunkName: "edit" */ '@/dialogs/EditDialog'),
    ReorderDialog: () =>
      import(/* webpackChunkName: "reorder" */ '@/dialogs/ReorderDialog'),
    ConfigDialog: () =>
      import(/* webpackChunkName: "config" */ '@/dialogs/ConfigDialog'),
    QRCodeDialog: () =>
      import(/* webpackChunkName: "qrcode" */ '@/dialogs/QRCodeDialog'),
    WebNav,
    Logo,
    DisAlert
  },
  data () {
    return {
      install: null,
      importDialog: false,
      query: '',
      drawer: false,
      version,
      textFocus: false,
      autofilled: false
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
        this.$vuetify.theme.dark = dark
      }
    }
  },
  async created () {
    window.addEventListener('beforeinstallprompt', this.installPrompt)
    await this.$store.dispatch('init', this)
  },
  destroyed () {
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
      this.$refs.downloadLink.download =
        `bookmarks-${timeStr}.json`
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
  right: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
