import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import i18n from '@/plugins/vue-i18n'
import defaultBookmarks from '@/defaults/bookmarks.json'
import { useDBStore } from '@/store/db'
import { useAlertStore } from '@/store/alert'

export interface Bookmark {
  index: number
  title: string
  url: string
  icon?: string
  search?: string
}
export interface BookmarkWithID extends Bookmark {
  id: number
}
const reIndex = (bookmarks: Bookmark[]): void => {
  bookmarks.forEach((bookmark, index) => {
    bookmark.index = index
  })
}

export const useBookmarkStore = defineStore('bookmark', {
  state: () => ({
    bookmarks: [] as BookmarkWithID[]
  }),
  actions: {
    reorder ({ from, to }: { from: number, to: number }) {
      // splice is the recommended way to change an array member
      // and it returns replaced members
      this.bookmarks.splice(
        from, 1, ...this.bookmarks.splice(
          to, 1, this.bookmarks[from]
        )
      )
      reIndex(this.bookmarks)
    },
    async init () {
      const dbStore = useDBStore()
      await dbStore.getDB()
      if (dbStore.newcomer) {
        const bookmarks = defaultBookmarks.map((b, index) => ({ ...b, index }))
        await this.addAll(bookmarks)
        const alertStore = useAlertStore()
        alertStore.push({
          text: i18n.global.t('message.bookmark-init'),
          type: 'success'
        })
      } else await this.refresh()
    },
    async add (bookmark: Bookmark) {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      // idb doesn't have ways to handle auto increment keys (#150)
      // doing the assertion here to suppress warnings
      await db.add('bookmarks', toRaw(bookmark) as BookmarkWithID)
      await this.refresh() // fetch from db to get their id
    },
    async addAll (bookmarks: Bookmark[]) {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      await Promise.all(
        bookmarks.map(async bookmark => await db.add('bookmarks', bookmark as BookmarkWithID))
      )
      await this.refresh()
    },
    async clearAndAddAll (bookmarks: Bookmark[]) {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      await db.clear('bookmarks')
      await this.addAll(bookmarks)
    },
    async put (bookmark: BookmarkWithID) {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      await db.put('bookmarks', toRaw(bookmark))
      this.bookmarks.splice(bookmark.index, 1, bookmark)
    },
    /** Put all current bookmarks to db after reorder
     *
     * No need to refresh because using state.bookmarks
     */
    async putAll () {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      await Promise.all(
        this.bookmarks.map(
          async bookmark => await db.put('bookmarks', toRaw(bookmark))
        ))
    },
    // Index will not be continous after delete,
    // making other assumptions invalid.
    // Let's just reindex
    async delete (bookmark: BookmarkWithID) {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      await db.delete('bookmarks', bookmark.id)
      this.bookmarks.splice(bookmark.index, 1)
      reIndex(this.bookmarks)
      await this.putAll()
    },
    async clear () {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      await db.clear('bookmarks')
      this.bookmarks = []
    },
    async refresh () {
      const dbStore = useDBStore()
      const db = await dbStore.getDB()
      this.bookmarks = (await db.getAll('bookmarks')).sort(
        (a, b) => a.index - b.index
      )
    }
  }
})
