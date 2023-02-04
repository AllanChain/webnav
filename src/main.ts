import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/vue-i18n'
import store from './store'

const app = createApp(App)
app.use(vuetify)
app.use(i18n)
app.use(store)

store.dispatch('init').then(() => app.mount('#app'))
