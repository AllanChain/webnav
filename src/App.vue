<template>
  <v-app style="background: rgba(0, 0, 0, 0)">
    <v-app-bar app color="purple darken-1" dark>
      <v-text-field
        hide-details
        prepend-inner-icon="search"
        outlined
        single-line
        dense
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>cloud_download</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('edit')">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      install: null
    }
  },
  created: function() {
    window.addEventListener('beforeinstallprompt', this.installPrompt)
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
#app {
  margin-top: 10px;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
