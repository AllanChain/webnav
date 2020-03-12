import Vue from 'vue'
import Vuex from 'vuex'
import { openDB } from 'idb'

Vue.use(Vuex)

let db

export default new Vuex.Store({
  state: {
    bookmarks: [],
    editMode: false,
  },
  mutations: {
    refresh(state, bookmarks) {
      state.bookmarks = bookmarks
    },
    toggleEdit(state) {
      state.editMode = !state.editMode
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
      context.state.bookmarks = await db.getAll('bookmarks')
    },
    async add(context, bookmark) {
      await db.add('bookmarks', bookmark)
      context.dispatch('refresh')
    },
    async addAll(context, bookmarks) {
      await Promise.all(bookmarks.map(bookmark => db.add('bookmarks', bookmark)))
      context.dispatch('refresh')
    },
    async put(context, bookmark) {
      await db.put('bookmarks', bookmark)
      context.dispatch('refresh')
    },
    async refresh(context) {
      context.commit('refresh', await db.getAll('bookmarks'))
    }
  },
  modules: {}
})
