import Ajv from 'ajv'
import pointer from 'json-pointer'
import store from '@/store'

let ajv = new Ajv({
  schemas: require('./schemas'),
  allErrors: true,
  jsonPointers: true,
  verbose: true
})
require('ajv-errors')(ajv, {singleError: true})

export default (schema, payload, showError) => {
  const validate = ajv.getSchema(schema)
  if (validate(payload))
    return true
  if (!showError) return false
  validate.errors.map(e => {
    let message = `${e.message}. Got "${pointer.get(payload, e.dataPath)}"`
    store.commit('alert', message)
  })
  return false
}
