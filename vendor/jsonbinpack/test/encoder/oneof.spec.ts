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
  ONEOF_CHOICE_INDEX_PREFIX as ENCODE_ONEOF_CHOICE_INDEX_PREFIX
} from '../../lib/encoder/oneof/encode'

import {
  OneOfResult,
  ONEOF_CHOICE_INDEX_PREFIX as DECODE_ONEOF_CHOICE_INDEX_PREFIX
} from '../../lib/encoder/oneof/decode'

import {
  SchemasOptions
} from '../../lib/encoder/oneof/options'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

import {
  OneOfEncoding,
  getOneOfEncoding
} from '../../lib/mapper/oneof'

import {
  OneOfEncodingSchema
} from '../../lib/schema'

import {
  JSONValue
} from '../../lib/json'

tap.test('ONEOF_CHOICE_INDEX_PREFIX: 1/3 string encoding', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(8))
  const schema: OneOfEncodingSchema = {
    oneOf: [
      {
        type: 'string'
      },
      {
        type: 'integer',
        maximum: 5
      },
      {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    ]
  }

  const encoding: OneOfEncoding = getOneOfEncoding(schema, 0)
  const options: SchemasOptions = encoding.options
  const value: JSONValue = 'foobar'
  const bytesWritten: number =
    ENCODE_ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, value, options, context)
  const result: OneOfResult =
    DECODE_ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 8)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})

tap.test('ONEOF_CHOICE_INDEX_PREFIX: 2/3 number encoding', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const schema: OneOfEncodingSchema = {
    oneOf: [
      {
        type: 'string'
      },
      {
        type: 'integer',
        maximum: 5
      },
      {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    ]
  }

  const encoding: OneOfEncoding = getOneOfEncoding(schema, 0)
  const options: SchemasOptions = encoding.options
  const value: JSONValue = 4
  const bytesWritten: number =
    ENCODE_ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, value, options, context)
  const result: OneOfResult =
    DECODE_ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 2)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})

tap.test('ONEOF_CHOICE_INDEX_PREFIX: 3/3 array encoding', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const schema: OneOfEncodingSchema = {
    oneOf: [
      {
        type: 'string'
      },
      {
        type: 'integer',
        maximum: 5
      },
      {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    ]
  }

  const encoding: OneOfEncoding = getOneOfEncoding(schema, 0)
  const options: SchemasOptions = encoding.options
  const value: JSONValue = [ 'foobar' ]
  const bytesWritten: number =
    ENCODE_ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, value, options, context)
  const result: OneOfResult =
    DECODE_ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 9)
  test.is(result.bytes, bytesWritten)
  test.strictSame(result.value, value)

  test.end()
})
