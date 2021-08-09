/*
 * Copyright 2021 Juan Cruz Viotti
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import tap from 'tap'

import {
  canonicalizeSchema
} from '../../lib/preprocessor/canonical'

import {
  EncodingSchema
} from '../../lib/schema'

tap.test('should canonicalize an allOf with multiple integer schemas', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    allOf: [
      {
        type: 'integer'
      },
      {
        maximum: 4
      }
    ]
  })

  test.strictSame(result, {
    type: 'integer',
    maximum: 4
  })

  test.end()
})

tap.test('should canonicalize a multiple-type schema', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    type: [ 'object', 'integer', 'string' ],
    maxLength: 15,
    minimum: 0,
    properties: {
      foo: {
        type: 'string'
      }
    }
  })

  test.strictSame(result, {
    anyOf: [
      {
        type: 'object',
        properties: {
          foo: {
            type: 'string'
          }
        }
      },
      {
        type: 'integer',
        minimum: 0
      },
      {
        type: 'string',
        maxLength: 15
      }
    ]
  })

  test.end()
})

tap.test('should canonicalize a const schema', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    type: 'integer',
    minimum: 0,
    maximum: 10,
    multipleOf: 2,
    const: 4
  })

  test.strictSame(result, {
    const: 4
  })

  test.end()
})

tap.test('should canonicalize an enum schema', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    type: 'integer',
    minimum: 0,
    maximum: 10,
    multipleOf: 2,
    enum: [ 0, 2, 4, 6, 8, 10 ]
  })

  test.strictSame(result, {
    enum: [ 0, 2, 4, 6, 8, 10 ]
  })

  test.end()
})

tap.test('should canonicalize a oneOf schema', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    type: 'integer',
    oneOf: [
      {
        minimum: 0,
        const: 5
      },
      {
        maximum: 10,
        multipleOf: 2
      }
    ]
  })

  test.strictSame(result, {
    oneOf: [
      {
        const: 5
      },
      {
        type: 'integer',
        maximum: 10,
        multipleOf: 2
      }
    ]
  })

  test.end()
})

tap.test('should canonicalize a oneOf schema with one duplicated choice', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    oneOf: [
      {
        type: 'boolean'
      },
      {
        type: 'integer'
      },
      {
        type: 'boolean'
      }
    ]
  })

  test.strictSame(result, {
    oneOf: [
      {
        type: 'boolean'
      },
      {
        type: 'integer'
      }
    ]
  })

  test.end()
})

tap.test('should canonicalize a oneOf schema with one all duplicated choices', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    oneOf: [
      {
        type: 'boolean'
      },
      {
        type: 'boolean'
      },
      {
        type: 'boolean'
      }
    ]
  })

  test.strictSame(result, {
    type: 'boolean'
  })

  test.end()
})

tap.test('should canonicalize a oneOf schema lacking a type', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    oneOf: [
      {
        type: 'integer'
      },
      {
        minimum: 2
      }
    ]
  })

  test.strictSame(result, {
    oneOf: [
      {
        type: 'integer'
      },
      {
        anyOf: [
          {
            type: 'boolean'
          },
          {
            type: 'integer',
            minimum: 2
          },
          {
            type: 'null'
          },
          {
            type: 'number',
            minimum: 2
          },
          {
            type: 'string'
          },
          {
            type: 'array'
          },
          {
            type: 'object'
          }
        ]
      }
    ]
  })

  test.end()
})

tap.test('should canonicalize an any array without a type', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    items: true
  })

  test.strictSame(result, {
    anyOf: [
      {
        type: 'boolean'
      },
      {
        type: 'integer'
      },
      {
        type: 'null'
      },
      {
        type: 'number'
      },
      {
        type: 'string'
      },
      {
        type: 'array',
        items: {}
      },
      {
        type: 'object'
      }
    ]
  })

  test.end()
})

tap.test('should canonicalize an any array with prefixItems and uniqueItems', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    prefixItems: [
      {
        type: 'boolean'
      },
      {
        type: 'boolean'
      }
    ],
    uniqueItems: false
  })

  test.strictSame(result, {
    anyOf: [
      {
        type: 'boolean'
      },
      {
        type: 'integer'
      },
      {
        type: 'null'
      },
      {
        type: 'number'
      },
      {
        type: 'string'
      },
      {
        type: 'array',
        prefixItems: [
          {
            type: 'boolean'
          },
          {
            type: 'boolean'
          }
        ]
      },
      {
        type: 'object'
      }
    ]
  })

  test.end()
})

tap.test('should canonicalize an any object with truthy properties', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    required: [ 'bar' ],
    properties: {
      bar: true,
      baz: true
    }
  })

  test.strictSame(result, {
    anyOf: [
      {
        type: 'boolean'
      },
      {
        type: 'integer'
      },
      {
        type: 'null'
      },
      {
        type: 'number'
      },
      {
        type: 'string'
      },
      {
        type: 'array'
      },
      {
        type: 'object',
        required: [ 'bar' ],
        properties: {
          bar: {},
          baz: {}
        }
      }
    ]
  })

  test.end()
})
