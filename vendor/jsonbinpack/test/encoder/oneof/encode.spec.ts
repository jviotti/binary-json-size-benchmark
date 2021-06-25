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
  ONEOF_CHOICE_INDEX_PREFIX
} from '../../../lib/encoder/oneof/encode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../../lib/encoder'

import {
  SchemasOptions
} from '../../../lib/encoder/oneof/options'

import {
  OneOfEncoding,
  getOneOfEncoding
} from '../../../lib/mapper/oneof'

import {
  OneOfEncodingSchema
} from '../../../lib/schema'

import {
  JSONValue
} from '../../../lib/json'

tap.test('ONEOF_CHOICE_INDEX_PREFIX: should encode a value matching choice 1 of 3', (test) => {
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
    ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, value, options, context)

  test.is(bytesWritten, 8)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    // OneOf index
    0x00,

    // String length
    0x07,

    // "foobar"
    0x66, 0x6f, 0x6f, 0x62, 0x61, 0x72
  ]))
  test.end()
})

tap.test('ONEOF_CHOICE_INDEX_PREFIX: should encode a value matching choice 2 of 3', (test) => {
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
    ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, value, options, context)

  test.is(bytesWritten, 2)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    // OneOf index
    0x01,

    // Integer value
    0x01
  ]))
  test.end()
})

tap.test('ONEOF_CHOICE_INDEX_PREFIX: should encode a value matching choice 3 of 3', (test) => {
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
    ONEOF_CHOICE_INDEX_PREFIX(buffer, 0, value, options, context)

  test.is(bytesWritten, 9)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    // OneOf index
    0x02,

    // Array length
    0x01,

    // String length
    0x07,

    // "foobar"
    0x66, 0x6f, 0x6f, 0x62, 0x61, 0x72
  ]))
  test.end()
})
