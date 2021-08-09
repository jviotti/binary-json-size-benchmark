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
  JSONSchema,
  dereferenceSchema
} from '../../lib/preprocessor/deref'

tap.test('should de-reference a simple schema', async (test) => {
  const schema: JSONSchema = {
    type: 'object',
    properties: {
      foo: {
        type: 'integer'
      },
      bar: {
        $ref: '#/properties/foo'
      }
    }
  }

  const result: JSONSchema = await dereferenceSchema(schema)
  test.strictSame(result, {
    type: 'object',
    properties: {
      foo: {
        type: 'integer'
      },
      bar: {
        type: 'integer'
      }
    }
  })

  test.end()
})

tap.test('should not de-reference a circular schema', async (test) => {
  const schema: JSONSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      foo: {
        $ref: '#'
      }
    }
  }

  const result: JSONSchema = await dereferenceSchema(schema)
  test.strictSame(result, {
    type: 'object',
    additionalProperties: false,
    properties: {
      foo: {
        $ref: '#'
      }
    }
  })

  test.end()
})

tap.test('should de-reference a simple oneOf schema', async (test) => {
  const schema: JSONSchema = {
    oneOf: [
      {
        type: 'integer'
      },
      {
        minimum: 2
      }
    ]
  }

  const result: JSONSchema = await dereferenceSchema(schema)
  test.strictSame(result, {
    oneOf: [
      {
        type: 'integer'
      },
      {
        minimum: 2
      }
    ]
  })

  test.end()
})
