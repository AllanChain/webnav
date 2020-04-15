import Ajv from 'ajv';
import bookmarkSchema from './bookmark.schema.json'
import bookmarksSchema from './bookmarks.schema.json'
import store from '@/store'

let ajv = new Ajv({
  schemas: [bookmarkSchema, bookmarksSchema]
})

export default (schema, payload) => {
  const validate = ajv.getSchema(schema)
  if (validate(payload)) 
    return true
  validate.errors.map(e => store.commit('alert', e.message))
  return false
}
