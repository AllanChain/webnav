import Vue from 'vue'
import Vuex from 'vuex'
import { openDB } from 'idb'
import validate from '@/validator'

Vue.use(Vuex)

const sortIndex = bookmarks =>
  bookmarks.sort((a, b) => a.index - b.index)

let db

export default new Vuex.Store({
  state: {
    bookmarks: [],
    mode: 'normal',
    modeData: undefined,
    swStatus: '',
    messages: [],
    config: {}
  },
  mutations: {
    switchMode(state, payload) {
      state.mode = payload.mode || payload
      state.modeData = payload.data
    },
    reorder(state, payload) {
      const {from, to} = payload
      const direction = Math.sign(from - to)
      state.bookmarks[from].index = to
      for (let i = to;i !== from;i += direction)
        state.bookmarks[i].index += direction
      state.bookmarks = sortIndex(state.bookmarks)
    },
    swUpdate(state, status) {
      state.swStatus = status
    },
    updateConfig(state, config) {
      state.config = config
      localStorage.setItem('config', JSON.stringify(config))
    },
    alert(state, payload) {
      if (typeof payload === 'string') {
        state.messages.push({
          text: payload,
          type: 'warning'
        })
      } else
        state.messages.push(payload)
    }
  },
  actions: {
    async init(context, app) {
      context.dispatch('initConfig', app)
      let newcomer = false
      db = await openDB('BookmarkDB', 1, {
        upgrade(db) {
          newcomer = true
          db.createObjectStore('bookmarks', {
            autoIncrement: true,
            keyPath: 'id'
          })
        }
      })
      if (newcomer) {
        context.dispatch('addAll', require('@/defaults/bookmarks.json'))
        context.commit('alert', {
          text: app.$t('message.bookmarkInit'),
          type: 'success'
        })
      } else
        context.dispatch('refresh')
    },
    /**
     * Load config
     * i18n will work after config load.
     * Thus need result insted of commit.
     * @param {*} context
     */
    initConfig(context, app) {
      let result
      let config = JSON.parse(localStorage.getItem('config'))
      if (config === null) { // Beginner friendly
        config = require('@/defaults/config.json')
        localStorage.setItem('config', JSON.stringify(config))
        result = {
          text: 'message.configInit',
          type: 'success'
        }
      } else if (!validate('/config', config, true)) {
        const defaultConfig = require('@/defaults/config.json')
        config = require('deepmerge')(defaultConfig, config)
        if (!validate('/config', config, true)) {
          config = defaultConfig
          result = {
            text: 'message.configError',
            type: 'error',
            delay: 12000
          }
        } else {
          localStorage.setItem('config', JSON.stringify(config))
          result = {
            text: 'message.configUpdate',
            type: 'success'
          }
        }
      }
      app.$i18n.locale = config.locale || navigator.language.slice(0, 2)
      context.state.config = config
      if (result !== undefined) {
        context.commit('alert', {
          text: app.$t(result.text),
          type: result.type
        })
      }
    },
    async add(context, bookmark) {
      await db.add('bookmarks', bookmark)
      context.dispatch('refresh')
    },
    async addAll(context, bookmarks) {
      await Promise.all(
        bookmarks.map(bookmark => db.add('bookmarks', bookmark))
      )
      context.dispatch('refresh')
    },
    async put(context, bookmark) {
      await db.put('bookmarks', bookmark)
      context.dispatch('refresh')
    },
    /** Put all current bookmarks to db after reorder
     *
     * No need to refresh because using state.bookmarks
     */
    async putAll(context) {
      await Promise.all(
        context.state.bookmarks.map(
          bookmark => db.put('bookmarks', bookmark)
        ))
    },
    async delete(context, id) {
      await db.delete('bookmarks', id)
      context.dispatch('refresh')
    },
    async clear(context) {
      await db.clear('bookmarks')
      context.state.bookmarks = []
    },
    async refresh(context) {
      const bookmarks = await db.getAll('bookmarks')
      context.state.bookmarks = sortIndex(bookmarks)
    }
  },
  modules: {}
})
