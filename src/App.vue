<template>
  <v-app style="background: rgba(0, 0, 0, 0)">
    <v-app-bar app color="indigo darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-text-field
        v-model="query"
        prepend-inner-icon="search"
        hide-details
        outlined
        single-line
        dense
      />
      <v-spacer />
      <!-- <v-btn icon small>
        <v-icon>file_download</v-icon>
      </v-btn>
      <v-btn icon small @click="importDialog = true">
        <v-icon>add_to_home_screen</v-icon>
      </v-btn> -->
      <v-btn
        icon
        :color="$store.state.editMode ? 'green' : undefined"
        @click="$store.commit('toggleEdit')"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <WebNav :query="query" />
      <JsonImport v-model="importDialog" />
    </v-content>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              WebNav
            </v-list-item-title>
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
        <v-list-item link>
          <v-list-item-action>
            <v-icon>file_download</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Download</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import JsonImport from '@/components/JsonImport'
import WebNav from '@/components/WebNav'


export default {
  name: 'App',
  components: {
    JsonImport,
    WebNav
  },
  data() {
    return {
      install: null,
      importDialog: false,
      query: '',
      drawer: false
    }
  },
  created: function() {
    window.addEventListener('beforeinstallprompt', this.installPrompt)
    this.$store.dispatch('init')
  },
  destroyed: function() {
    window.removeEventListener('beforeinstallprompt', this.installPrompt)
  },
  methods: {
    installPrompt: function(e) {
      this.install = e
    }
  }
}
</script>

<style>
/* #app {
  margin-top: 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */

.clear {
  clear: both;
}

.logo {
  /* max-width: 300px; */
  /* margin: auto; */
  animation: flipInX 3s;
  -webkit-animation: flipInX 3s infinite;
  font-size: 45px;
  color: #fff;
  /* margin-bottom: 20px; */
  line-height: 0;
}

@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    -ms-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotateX(-20deg);
    -ms-transform: perspective(400px) rotateX(-20deg);
    transform: perspective(400px) rotateX(-20deg);
  }

  55% {
    -webkit-transform: perspective(400px) rotateX(25deg);
    -ms-transform: perspective(400px) rotateX(25deg);
    transform: perspective(400px) rotateX(25deg);
  }

  80% {
    -webkit-transform: perspective(400px) rotateX(-30deg);
    -ms-transform: perspective(400px) rotateX(-30deg);
    transform: perspective(400px) rotateX(-30deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    -ms-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
}
</style>
