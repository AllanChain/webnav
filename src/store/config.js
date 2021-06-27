import validate from '@/validator'
import i18n from '@/plugins/vue-i18n'

export default {
  namespaced: true,
  state: {
    config: {}
  },
  mutations: {
    update (state, { config, write }) {
      state.config = config
      i18n.locale = (
        config.locale ||
        navigator.language.slice(0, 2)
      )
      if (write === true)
        localStorage.setItem('config', JSON.stringify(config))
    }
  },
  actions: {
    /**
     * Load config
     * i18n will work after config load.
     * Thus need result insted of commit.
     * @param {*} context
     */
    init (context) {
      let result
      let config = JSON.parse(localStorage.getItem('config'))
      if (config === null) { // Beginner friendly
        config = require('@/defaults/config.json')
        localStorage.setItem('config', JSON.stringify(config))
        result = {
          text: i18n.t('message.config-init'),
          type: 'success'
        }
      } else if (!validate('/config', config, true)) {
        const defaultConfig = require('@/defaults/config.json')
        config = require('deepmerge')(defaultConfig, config)
        if (!validate('/config', config)) {
          config = defaultConfig
          result = {
            text: i18n.t('message.config-error'),
            type: 'error',
            delay: 12000
          }
        } else {
          localStorage.setItem('config', JSON.stringify(config))
          result = {
            text: i18n.t('message.config-update'),
            type: 'success'
          }
        }
      }
      context.commit('update', { config })
      if (result !== undefined)
        context.commit('alert', result, { root: true })
    }
  }
}
