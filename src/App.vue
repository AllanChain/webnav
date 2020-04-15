<template>
  <v-app>
    <v-app-bar app color="indigo darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-text-field
        ref="text"
        :value="query"
        prepend-inner-icon="search"
        hide-details outlined
        single-line dense clearable
        @input="query = $event ? $event : ''"
      />
      <!-- Clear will set the string to null -->
      <!-- See https://github.com/vuetifyjs/vuetify/issues/4144 -->
      <v-spacer />
      <v-btn
        icon
        :color="$store.state.mode === 'edit' ? 'green' : undefined"
        @click=" $store.commit('switchMode', 
                               $store.state.mode === 'edit' ? 'normal' : 'edit')"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content
      :style="{
        backgroundImage: `url(${$store.state.config.bgImg})`,
        backgroundSize: 'cover'
      }"
    >
      <div class="mt-3 mx-2 alert-box">
        <DisAlert 
          v-for="(message, i) in $store.state.messages" 
          :key="i" :message="message"
        />
      </div>
      <WebNav :query="query" />
      <ImportDialog 
        :value="$store.state.mode === 'import-dialog'"
        @input="$store.commit('switchMode', 'normal')"
      />
      <EditDialog 
        v-if="$store.state.mode === 'edit-dialog'"
        :value="$store.state.mode === 'edit-dialog'"
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
    </v-content>
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
            <v-icon>add_to_home_screen</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Import</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="downloadJSON">
          <v-list-item-action>
            <v-icon>file_download</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Export and Download</v-list-item-title>
            <a ref="downloadLink" class="d-none" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="newBookmark">
          <v-list-item-action>
            <v-icon>add</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Bookmark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$store.commit('switchMode', 'config-dialog')">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>More Config</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="confirmClear">
          <v-list-item-action>
            <v-icon>warning</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>CLEAR ALL Bookmark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://github.com/AllanChain/webnav">
          <v-list-item-action>
            <img src="@/assets/octocat.svg" width="24px" class="grayscale">
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Fork me on GitHub</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <span>
              <v-icon small>
                settings
              </v-icon>
              {{ $store.state.swStatus }}
            </span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import ImportDialog from '@/components/ImportDialog'
import EditDialog from '@/components/EditDialog'
import ReorderDialog from '@/components/ReorderDialog'
import ConfigDialog from '@/components/ConfigDialog'
import WebNav from '@/components/WebNav'
import Logo from '@/components/Logo'
import DisAlert from '@/components/DisAlert'

export default {
  name: 'App',
  components: {
    ImportDialog,
    EditDialog,
    ReorderDialog,
    ConfigDialog,
    WebNav,
    Logo,
    DisAlert
  },
  data() {
    return {
      install: null,
      importDialog: false,
      query: '',
      drawer: false
    }
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.installPrompt)
    this.$store.dispatch('init')
  },
  destroyed() {
    window.removeEventListener('beforeinstallprompt', this.installPrompt)
  },
  methods: {
    installPrompt(e) {
      this.install = e
    },
    newBookmark() {
      this.$store.commit({
        type: 'switchMode', 
        mode: 'edit-dialog',
        data: {
          title: '',
          url: '',
          index: this.$store.state.bookmarks.length
        }
      })
    },
    downloadJSON() {
      // Copy and delete `id` field
      let bookmarks = JSON.parse(JSON.stringify(this.$store.state.bookmarks))
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
    confirmClear() {
      if (prompt('Type CLEAR to continue. Hope you have a backup.')
        === 'CLEAR')
        this.$store.dispatch('clear')
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
</style>
