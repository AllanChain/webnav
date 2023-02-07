import { Validator } from 'jsonschema'
import schemas from './schemas'
import { useAlertStore } from './store/alert'

const validator = new Validator()

for (const schema of schemas)
  validator.addSchema(schema, schema.$id)

export default (
  schemaName: string,
  payload: Record<string, unknown>,
  quiet = false
): boolean => {
  const schema = schemas.find(schema => schema.$id === schemaName)
  if (schema === undefined) return false
  const validateResult = validator.validate(payload, schema)
  if (validateResult.valid)
    return true
  if (quiet) return false
  validateResult.errors.forEach(error => {
    // slice to remove leading slash
    const stack = error.stack.replace(/^instance/, schemaName.slice(1))
    useAlertStore().push({
      text: `${stack}. Got "${JSON.stringify(error.instance)}"`,
      type: 'warning',
      break: true
    })
  })
  return false
}
