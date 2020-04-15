import Vue from 'vue'
import Vuex from 'vuex'
import { openDB } from 'idb'

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
    async init(context) {
      const config = JSON.parse(localStorage.getItem('config'))
      if (!config) 
        localStorage.setItem('config', '{}')
      else
        context.state.config = config

      db = await openDB('BookmarkDB', 1, {
        upgrade(db) {
          db.createObjectStore('bookmarks', {
            autoIncrement: true,
            keyPath: 'id'
          })
        }
      })
      context.dispatch('refresh')
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
