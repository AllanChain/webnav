import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/vue-i18n'
import pinia from './store'

const app = createApp(App)
app.use(vuetify)
app.use(i18n)
app.use(pinia)

app.mount('#app')
// store.dispatch('init').then(() => app.mount('#app'))
