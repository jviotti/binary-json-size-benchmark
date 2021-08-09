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
import * as fc from 'fast-check'
import * as util from 'util'

import {
  JSONValue
} from '../../lib/json'

import {
  ANY_PACKED_TYPE_TAG_BYTE_PREFIX as ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX
} from '../../lib/encoder/any/encode'

import {
  AnyResult,
  ANY_PACKED_TYPE_TAG_BYTE_PREFIX as DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX
} from '../../lib/encoder/any/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: should handle " "', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
  const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, ' ', {}, context)
  test.is(bytesWritten, 2)
  const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
  test.is(result.bytes, 2)
  test.is(result.value, ' ')
  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: should handle {"foo":"bar","baz":1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(100))
  const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {}, context)

  test.is(bytesWritten, 14)
  const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
  test.is(result.bytes, 14)
  test.strictSame(result.value, {
    foo: 'bar',
    baz: 1
  })

  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: should handle [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(100))
  const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {}, context)

  test.is(bytesWritten, 9)
  const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
  test.is(result.bytes, 9)
  test.strictSame(result.value, [ 'foo', true, 2000 ])

  test.end()
})

tap.skip('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: should encode { "": -11492746249590654 }', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(12))
  const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {
    '': -11492746249590654
  }, {}, context)

  test.is(bytesWritten, 12)
  const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})

  test.is(result.bytes, 12)
  test.strictSame(result.value, {
    '': -11492746249590654
  })

  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: should handle shared strings', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(100))

  const bytesWritten1: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, 'foo', {}, context)
  const bytesWritten2: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, bytesWritten1, 'foo', {}, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 2)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Tag + length + foo
    0x21, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x20,

    // Pointer (current = 6 - location = 2)
    0x04
  ]))

  const decode1: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, bytesWritten1, {})
  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: scalars', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({
      maxLength: 1000
    })
  ), (offset: number, value: JSONValue): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, offset, value, {}, context)
    const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, offset, {})
    return bytesWritten > 0 &&
      result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: JSON', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, value, {}, context)
    const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: JSON with small ResizableBuffer', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
    const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, value, {}, context)
    const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ANY_PACKED_TYPE_TAG_BYTE_PREFIX: JSON with 0 ResizableBuffer', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(0))
    const bytesWritten: number = ENCODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, value, {}, context)
    const result: AnyResult = DECODE_ANY_PACKED_TYPE_TAG_BYTE_PREFIX(buffer, 0, {})
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
