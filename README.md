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

// req, res and next are parameters of an endpoint function
validate({
  body: { address: {} },
  schema: schema,
  request: req,
  next: next,
  errorCode: 'fancyErrorCode',
  bodyName: 'body'
})
```