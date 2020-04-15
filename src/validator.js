import Ajv from 'ajv';
import bookmarkSchema from './bookmark.schema.json'
import bookmarksSchema from './bookmarks.schema.json'

let ajv = new Ajv({
  schemas: [bookmarkSchema, bookmarksSchema]
})

const validateBookmark = ajv.getSchema('/bookmark')
const validateBookmarks = ajv.getSchema('/bookmarks')

export {
  validateBookmark, validateBookmarks
}
