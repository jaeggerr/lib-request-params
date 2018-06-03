import { validate, Resolve } from '../src'
import { Schema } from 'jsonschema'
import * as console from 'console'
import { formatDiagnosticsWithColorAndContext } from 'typescript'

const schema: Schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string'
        }
      },
      required: ['street']
    }
  },
  required: ['name']
}

test('Invalid schema', () => {
  const result = validate({
    body: { address: {} },
    schema: schema,
    errorCode: 'fancyErrorCode',
    bodyName: 'zeParams'
  })
  expect(result.hasErrors).toEqual(true)
  expect(result.errorMessages).toHaveLength(2)
  for (const message of result.errorMessages) {
    expect(message).toMatch(/^zeParams/)
  }
})

test('Valid schema', () => {
  const result = validate({
    body: {
      name: 'John',
      address: {
        street: 'My street'
      }
    },
    schema: schema,
    errorCode: 'fancyErrorCode',
    bodyName: 'zeParams'
  })
  expect(result.errorMessages).toHaveLength(0)
  expect(result.hasErrors).toEqual(false)
})
