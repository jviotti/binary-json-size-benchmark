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
  EncodingSchema
} from '../../lib/schema'

import {
  Encoding,
  getStates,
  getEncoding
} from '../../lib/mapper'

tap.test('should encode an object with an enum with one value', (test) => {
  const schema: EncodingSchema = {
    type: 'object',
    properties: {
      test: {
        enum: [ 'foo' ]
      }
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'object',
    encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT',
    options: {
      optionalProperties: [ 'test' ],
      encoding: {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      },
      keyEncoding: {
        type: 'string',
        encoding: 'UNBOUNDED_OBJECT_KEY__PREFIX_LENGTH',
        options: {}
      },
      propertyEncodings: {
        test: {
          type: 'enum',
          encoding: 'BOUNDED_CHOICE_INDEX',
          options: {
            choices: [ 'foo' ]
          }
        }
      }
    }
  })

  test.end()
})

tap.test('should encode a top-level enum with one value', (test) => {
  const schema: EncodingSchema = {
    enum: [ 'foo' ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [ 'foo' ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [ 'foo' ]
    }
  })

  test.end()
})
