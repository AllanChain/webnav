import Vue from 'vue'
import Vuex from 'vuex'
import { openDB } from 'idb'
import validate from '@/validator'

Vue.use(Vuex)

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
    switchMode (state, payload) {
      state.mode = payload.mode || payload
      state.modeData = payload.data
    },
    swUpdate (state, status) {
      state.swStatus = status
    },
    updateConfig (state, payload) {
      state.config = payload.config
      payload.app.$i18n.locale = (
        payload.config.locale ||
        navigator.language.slice(0, 2)
      )
      payload.app.$vuetify.theme.dark = payload.config.dark
      if (payload.write === true)
        localStorage.setItem('config', JSON.stringify(payload.config))
    },
    alert (state, payload) {
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
    async init (context, app) {
      context.dispatch('initConfig', app)
      let newcomer = false
      db = await openDB('BookmarkDB', 1, {
        upgrade (db) {
          newcomer = true
          db.createObjectStore('bookmarks', {
            autoIncrement: true,
            keyPath: 'id'
          })
        }
      })
      if (newcomer) {
        const bookmarks = require('@/defaults/bookmarks.json')
        bookmarks.forEach((b, i) => { b.index = i })
        context.dispatch('addAll', bookmarks)
        context.commit('alert', {
          text: app.$t('message.bookmark-init'),
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
    initConfig (context, app) {
      let result
      let config = JSON.parse(localStorage.getItem('config'))
      if (config === null) { // Beginner friendly
        config = require('@/defaults/config.json')
        localStorage.setItem('config', JSON.stringify(config))
        result = {
          text: app.$t('message.config-init'),
          type: 'success'
        }
      } else if (!validate('/config', config, true)) {
        const defaultConfig = require('@/defaults/config.json')
        config = require('deepmerge')(defaultConfig, config)
        if (!validate('/config', config)) {
          config = defaultConfig
          result = {
            text: app.$t('message.config-error'),
            type: 'error',
            delay: 12000
          }
        } else {
          localStorage.setItem('config', JSON.stringify(config))
          result = {
            text: app.$t('message.config-update'),
            type: 'success'
          }
        }
      }
      context.commit('updateConfig', { config, app })
      if (result !== undefined)
        context.commit('alert', result)
    },
    reorder (context, { from, to }) {
      // splice is the recommended way to change an array member
      // and it returns replaced members
      context.state.bookmarks.splice(
        from, 1, ...context.state.bookmarks.splice(
          to, 1, context.state.bookmarks[from]
        )
      )
      context.dispatch('reIndex')
    },
    sortIndex (context) {
      context.state.bookmarks = context.state.bookmarks.sort(
        (a, b) => a.index - b.index
      )
    },
    reIndex (context) {
      context.state.bookmarks.forEach(
        (bookmark, index) => { bookmark.index = index }
      )
    },
    async add (context, bookmark) {
      await db.add('bookmarks', bookmark)
      await context.dispatch('refresh') // fetch from db to get their id
    },
    async addAll (context, bookmarks) {
      await Promise.all(
        bookmarks.map(bookmark => db.add('bookmarks', bookmark))
      )
      await context.dispatch('refresh')
    },
    async put (context, bookmark) {
      await db.put('bookmarks', bookmark)
      context.state.bookmarks.splice(bookmark.index, 1, bookmark)
    },
    /** Put all current bookmarks to db after reorder
     *
     * No need to refresh because using state.bookmarks
     */
    async putAll (context) {
      await Promise.all(
        context.state.bookmarks.map(
          bookmark => db.put('bookmarks', bookmark)
        ))
    },
    // Index will not be continous after delete,
    // making other assumptions invalid.
    // Let's just reindex
    async delete (context, bookmark) {
      await db.delete('bookmarks', bookmark.id)
      context.state.bookmarks.splice(bookmark.index, 1)
      await context.dispatch('reIndex')
      await context.dispatch('putAll')
    },
    async clear (context) {
      await db.clear('bookmarks')
      context.state.bookmarks = []
    },
    async refresh (context) {
      context.state.bookmarks = await db.getAll('bookmarks')
      await context.dispatch('sortIndex')
    }
  },
  modules: {}
})
