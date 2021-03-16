import { openDB } from 'idb'
import bookmarks from './bookmarks'

export let db

export default {
  namespaced: true,
  modules: {
    bookmarks
  },
  actions: {
    async init (context) {
      let newcomer = false
      db = await openDB('BookmarkDB', 2, {
        upgrade (db, oldVersion) {
          if (oldVersion < 1) {
            newcomer = true
            db.createObjectStore('bookmarks', {
              autoIncrement: true,
              keyPath: 'id'
            })
          } else if (oldVersion < 2) {
            db.createObjectStore('backgrounds', {
              keyPath: 'name'
            })
          }
        }
      })
      await context.dispatch('bookmarks/init', newcomer)
    }
  }
}
