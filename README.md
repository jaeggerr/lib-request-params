# Request parameters library

This library handles request parmeters.

## Check parameters

Checks if the URL body parameters match the schema and handle the request if there is an error.

```ts
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

// res and next are parameters of an endpoint function
validate({
  body: { address: {} },
  schema: schema,
  response: res,
  next: next,
  errorCode: 'fancyErrorCode',
  bodyName: 'body'
})
```