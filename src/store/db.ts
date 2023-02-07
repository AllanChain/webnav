import { openDB } from 'idb'
import type { IDBPDatabase, DBSchema } from 'idb'
import { defineStore } from 'pinia'

interface BookmarkDBSchema extends DBSchema {
  bookmarks: {
    key: number,
    value: {
      id: number
      index: number
      title: string
      url: string
      icon?: string
      search?: string
    },
  }
  backgrounds: {
    key: string,
    value: {
      name: string
      data: string
    }
  }
}

export const useDBStore = defineStore('db', {
  state: () => ({
    _db: null as null | IDBPDatabase<BookmarkDBSchema>,
    newcomer: false
  }),
  actions: {
    async getDB (): Promise<IDBPDatabase<BookmarkDBSchema>> {
      if (this._db !== null) return this._db
      this._db = await openDB('BookmarkDB', 2, {
        upgrade: (db, oldVersion) => {
          if (oldVersion < 1) {
            this.newcomer = true
            db.createObjectStore('bookmarks', {
              autoIncrement: true,
              keyPath: 'id'
            })
          } if (oldVersion < 2) {
            db.createObjectStore('backgrounds', {
              keyPath: 'name'
            })
          }
        }
      })
      return this._db
    }
  }
})
