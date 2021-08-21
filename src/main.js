import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/vue-i18n'
import store from './store'

Vue.config.productionTip = false

const vueApp = new Vue({
  vuetify,
  store,
  i18n,
  render: h => h(App)
})

store.dispatch('init').then(() => vueApp.$mount('#app'))
