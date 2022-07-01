import i18n from '@/plugins/vue-i18n'
import bookmarks from '@/defaults/bookmarks.json'
import { db } from '.'
import { toRaw } from 'vue'

const reIndex = bookmarks => bookmarks.forEach((bookmark, index) => {
  bookmark.index = index
})

export default {
  namespaced: true,
  state: {
    bookmarks: []
  },
  mutations: {
    update (state, bookmarks) {
      state.bookmarks = bookmarks
    },
    put (state, bookmark) {
      state.bookmarks.splice(bookmark.index, 1, bookmark)
    },
    delete (state, bookmark) {
      state.bookmarks.splice(bookmark.index, 1)
    },
    clear (state) {
      state.bookmarks = []
    },
    reIndex (state) {
      reIndex(state.bookmarks)
    },
    reorder (state, { from, to }) {
      // splice is the recommended way to change an array member
      // and it returns replaced members
      state.bookmarks.splice(
        from, 1, ...state.bookmarks.splice(
          to, 1, state.bookmarks[from]
        )
      )
      reIndex(state.bookmarks)
    }
  },
  actions: {
    async init (context, newcomer) {
      if (newcomer) {
        bookmarks.forEach((b, i) => { b.index = i })
        await context.dispatch('addAll', bookmarks)
        console.log(i18n)
        context.commit('alert', {
          text: i18n.global.t('message.bookmark-init'),
          type: 'success'
        }, {
          root: true
        })
      } else await context.dispatch('refresh')
    },
    async add (context, bookmark) {
      await db.add('bookmarks', toRaw(bookmark))
      await context.dispatch('refresh') // fetch from db to get their id
    },
    async addAll (context, bookmarks) {
      await Promise.all(
        bookmarks.map(bookmark => db.add('bookmarks', bookmark))
      )
      await context.dispatch('refresh')
    },
    async clearAndAddAll (context, bookmarks) {
      await db.clear('bookmarks')
      await context.dispatch('addAll', bookmarks)
    },
    async put (context, bookmark) {
      await db.put('bookmarks', toRaw(bookmark))
      context.commit('put', bookmark)
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
      context.commit('delete', bookmark)
      context.commit('reIndex')
      await context.dispatch('putAll')
    },
    async clear (context) {
      await db.clear('bookmarks')
      context.commit('clear')
    },
    async refresh (context) {
      context.commit('update', (await db.getAll('bookmarks')).sort(
        (a, b) => a.index - b.index
      ))
    }
  }
}
