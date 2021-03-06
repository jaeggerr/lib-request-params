import { isNullOrUndefined } from 'util'
import { Schema, validate as jsonschemaValidate } from 'jsonschema'

export interface Response {
  send (errorCode: any, response: any)
}

export interface CheckBodyResult {
  hasErrors: boolean,
  errorMessages: string[]
}

/**
 * Checks if the URL body parameters match the schema and handle the request if there is an error.
 * @param options The options
 */
export function validate (options: {
  body: any,
  /**
   * The schema that the body must match. Check this URL for more information: https://github.com/tdegrunt/jsonschema.
   */
  schema: Schema,
  /**
   * The response object of the request. If set and errors were found the method will be called.
   */
  response?: Response,
  /**
   * The body can be null or undefined. False by default.
   */
  canBeNull?: boolean,
  /**
   * The next method of the request. If set and errors were fould, the method will be called.
   */
  next?: (() => any),
  /**
   * The error code to return in the response. Default is 400.
   */
  errorCode?: number | string,
  /**
   * The name of the parameters object printed in the error messages. Default is 'body'.
   */
  bodyName?: string
}): CheckBodyResult {
  const result = jsonschemaValidate(options.body, options.schema)
  const bodyName = options.bodyName || 'body'
  const canBeNull = options.canBeNull || false
  const errorMessages: string[] = []

  if (isNullOrUndefined(options.body) && !canBeNull) {
    errorMessages.push(`${bodyName} must be set`)
  } else {
    for (let error of result.errors) {
      // TODO: Find if there is a better way to replace 'instance' in the message string
      let message: string = error.property.replace(new RegExp('^instance'), bodyName)
      message += ` ${error.message}`
      errorMessages.push(message)
    }
  }

  if (errorMessages.length > 0) {
    if (options.response) {
      options.response.send(options.errorCode || 400, { errors: errorMessages })
    }
    if (options.next) {
      options.next()
    }
  }

  return {
    hasErrors: errorMessages.length > 0,
    errorMessages: errorMessages
  }
}
