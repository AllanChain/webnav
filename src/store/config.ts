import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'
import validate from '@/validator'
import i18n from '@/plugins/vue-i18n'
import defaultConfig from '@/defaults/config.json'
import { useAlertStore } from '@/store/alert'
import { computed, type ComputedRef } from 'vue'

export interface ImageFilter {
  blur: number
  blurColor: string
  contrast: number
  grayscale: number
}
export interface BGImage {
  url: string
  filter: ImageFilter
}

export interface Config {
  bgImg: BGImage
  blackText: boolean
  cors: string
  barColor: string
  httpIcon: boolean
  locale: string
  dark: boolean
  preferNewTab: boolean
}

export const useConfigStore = defineStore('config', {
  state: () => ({
    _config: null as Config | null
  }),
  actions: {
    update (config: Config, write = true) {
      this._config = config
      const locale = (
        config.locale !== '' ? config.locale : navigator.language.slice(0, 2)
      )
      if (['en', 'zh'].includes(locale))
        i18n.global.locale.value = locale as 'zh' | 'en'
      else
        i18n.global.locale.value = 'en'
      if (write)
        localStorage.setItem('config', JSON.stringify(config))
    },
    getConfig (): Config {
      if (this._config !== null) return this._config

      let result: {
        key: string
        type: 'success' | 'error'
        delay?: number
      } | null = null
      const configString = localStorage.getItem('config')
      let config = configString === null ? null : JSON.parse(configString)
      if (config === null) { // Beginner friendly
        config = defaultConfig
        localStorage.setItem('config', JSON.stringify(config))
        result = {
          key: 'message.config-init',
          type: 'success'
        }
      } else if (!validate('/config', config, true)) {
        config = deepmerge(defaultConfig, config)
        if (!validate('/config', config)) {
          config = defaultConfig
          result = {
            key: 'message.config-error',
            type: 'error',
            delay: 12000
          }
        } else {
          localStorage.setItem('config', JSON.stringify(config))
          result = {
            key: 'message.config-update',
            type: 'success'
          }
        }
      }
      this.update(config, false)
      if (result !== null) {
        const alertStore = useAlertStore()
        alertStore.push({
          text: i18n.global.t(result.key),
          type: result.type,
          delay: result.delay
        })
      }
      return config
    }
  }
})

export const useConfig = (): ComputedRef<Config> => {
  const configStore = useConfigStore()
  const config = computed(() => configStore.getConfig())
  return config
}
