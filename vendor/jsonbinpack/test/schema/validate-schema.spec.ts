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
  JSONValue
} from '../../lib/json'

import {
  EncodingSchema,
  validateSchema
} from '../../lib/schema'

tap.test('should compile a schema and evaluate a matching instance', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: [ 'foo' ],
    additionalProperties: false,
    properties: {
      foo: {
        type: 'string'
      },
      baz: {
        type: 'object',
        required: [ 'qux' ],
        properties: {
          qux: {
            type: 'array'
          }
        }
      }
    }
  }

  const value: JSONValue = {
    foo: 'bar',
    baz: {
      qux: [ 1, 2 ]
    }
  }

  test.true(validateSchema(schema, value))
  test.end()
})

tap.test('should compile a schema and evaluate a non-matching instance', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    required: [ 'foo' ],
    additionalProperties: false,
    properties: {
      foo: {
        type: 'string'
      },
      baz: {
        type: 'object',
        required: [ 'qux' ],
        properties: {
          qux: {
            type: 'array'
          }
        }
      }
    }
  }

  const value: JSONValue = {
    foo: 'bar',
    baz: {
      qux: '11'
    }
  }

  test.false(validateSchema(schema, value))
  test.end()
})
