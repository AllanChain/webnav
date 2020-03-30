<template>
  <v-app style="background: rgba(0, 0, 0, 0)">
    <v-app-bar app color="indigo darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-text-field
        ref="text"
        :value="query"
        prepend-inner-icon="search"
        hide-details
        outlined
        single-line
        dense
        clearable
        @input="query = $event ? $event : ''"
      />
      <!-- Clear will set the string to null -->
      <!-- See https://github.com/vuetifyjs/vuetify/issues/4144 -->
      <v-spacer />
      <v-btn
        icon
        :color="$store.state.editMode ? 'green' : undefined"
        @click="$store.commit('toggleEdit')"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <WebNav ref="webnav" :query="query" />
      <JsonImport v-model="importDialog" />
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
        <v-list-item link @click="importDialog = true">
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
        <v-list-item link @click="$refs.webnav.add()">
          <v-list-item-action>
            <v-icon>add</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Bookmark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <span>
              <v-icon small>
                settings
              </v-icon>
              SW: {{ $store.state.swStatus }}
            </span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import JsonImport from "@/components/JsonImport"
import WebNav from "@/components/WebNav"
import Logo from '@/components/Logo'

export default {
  name: "App",
  components: {
    JsonImport,
    WebNav,
    Logo
  },
  data() {
    return {
      install: null,
      importDialog: false,
      query: "",
      drawer: false
    };
  },
  created: function() {
    window.addEventListener("beforeinstallprompt", this.installPrompt);
    this.$store.dispatch("init");
  },
  destroyed: function() {
    window.removeEventListener("beforeinstallprompt", this.installPrompt);
  },
  methods: {
    installPrompt: function(e) {
      this.install = e;
    },
    downloadJSON() {
      // Copy and delete `id` field
      let bookmarks = JSON.parse(JSON.stringify(this.$store.state.bookmarks));
      bookmarks.map(m => delete m.id);
      const timeStr =new Date().toJSON().slice(0, -8).replace(/-|:/g, '')
      this.$refs.downloadLink.download = 
        `bookmarks-${timeStr}.json`
      this.$refs.downloadLink.href =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(bookmarks));
      this.$refs.downloadLink.click();
    }
  }
};
</script>

<style>

</style>
