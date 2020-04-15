import Ajv from 'ajv'
import pointer from 'json-pointer'
import bookmarkSchema from './bookmark.schema.json'
import bookmarksSchema from './bookmarks.schema.json'
import store from '@/store'

let ajv = new Ajv({
  schemas: [bookmarkSchema, bookmarksSchema],
  allErrors: true,
  jsonPointers: true,
  verbose: true
})
require('ajv-errors')(ajv, {singleError: true})

export default (schema, payload) => {
  const validate = ajv.getSchema(schema)
  if (validate(payload)) 
    return true
  validate.errors.map(e => {
    let message = `${e.message}. Got "${pointer.get(payload, e.dataPath)}"`
    store.commit('alert', message)
  })
  return false
}
