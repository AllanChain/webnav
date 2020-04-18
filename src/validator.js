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

export default (schema, payload, quiet) => {
  const validate = ajv.getSchema(schema)
  if (validate(payload))
    return true
  if (quiet) return false
  validate.errors.map(e => {
    let message = pointer.get(payload, e.dataPath)
    if (typeof message === 'object')
      message = JSON.stringify(message)
    message = `"${e.dataPath}" ${e.message}. Got "${message}"`
    store.commit('alert', {
      text: message,
      type: 'warning',
      break: true
    })
  })
  return false
}
