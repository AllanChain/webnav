import Vue from 'vue'
import Vuex from 'vuex'
import { openDB } from 'idb'

Vue.use(Vuex)

let db

export default new Vuex.Store({
  state: {
    bookmarks: [],
    mode: 'normal',
    modeData: undefined,
    swStatus: ''
  },
  mutations: {
    switchMode(state, payload) {
      state.mode = payload.mode || payload
      state.modeData = payload.data
    },
    swUpdate(state, status) {
      state.swStatus = status
    }
  },
  actions: {
    async init(context) {
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
      context.state.bookmarks = bookmarks.sort(
        (a, b) => a.index - b.index
      )
    }
  },
  modules: {}
})
