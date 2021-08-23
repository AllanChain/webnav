import { Validator } from 'jsonschema'
import store from '@/store'
import schemas from './schemas'

const validator = new Validator()

for (const schema of schemas)
  validator.addSchema(schema, schema.$id)

export default (schemaName, payload, quiet) => {
  const schema = schemas.find(schema => schema.$id === schemaName)
  const validateResult = validator.validate(payload, schema)
  if (validateResult.valid)
    return true
  if (quiet) return false
  validateResult.errors.forEach(error => {
    // slice to remove leading slash
    const stack = error.stack.replace(/^instance/, schemaName.slice(1))
    store.commit('alert', {
      text: `${stack}. Got "${JSON.stringify(error.instance)}"`,
      type: 'warning',
      break: true
    })
  })
  return false
}
