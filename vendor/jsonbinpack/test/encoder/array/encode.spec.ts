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
  Encoding,
  getEncoding
} from '../../../lib/mapper'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../../lib/encoder'

import {
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX,
  BOUNDED_SEMITYPED__LENGTH_PREFIX,
  FLOOR_SEMITYPED__LENGTH_PREFIX,
  ROOF_SEMITYPED__LENGTH_PREFIX,
  ROOF_8BITS_SEMITYPED__LENGTH_PREFIX,
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX,

  BOUNDED_TYPED__LENGTH_PREFIX,
  BOUNDED_8BITS_TYPED__LENGTH_PREFIX,
  ROOF_TYPED__LENGTH_PREFIX,
  ROOF_8BITS_TYPED__LENGTH_PREFIX,
  FLOOR_TYPED__LENGTH_PREFIX,
  UNBOUNDED_TYPED__LENGTH_PREFIX
} from '../../../lib/encoder/array/encode'

tap.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: []
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    minimum: 2,
    maximum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, // Array length
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: same max/min', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const bytesWritten: number = BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    minimum: 3,
    maximum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 9)
  test.end()
})

tap.test('BOUNDED_SEMITYPED__LENGTH_PREFIX: same max/min', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const bytesWritten: number = BOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    minimum: 3,
    maximum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 9)
  test.end()
})

tap.test('BOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = BOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    minimum: 2,
    maximum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, // Array length
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('FLOOR_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    minimum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x00, // Array length
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('ROOF_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = ROOF_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    maximum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('ROOF_SEMITYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = ROOF_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {
    prefixEncodings: [],
    maximum: 3
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x00, // Array length
    0x01, 0x04, 0x66, 0x6f, 0x6f, // "foo"
    0x05, // True
    0x08, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('BOUNDED_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = BOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 0,
    maximum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED_TYPED__LENGTH_PREFIX: same max/min', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = BOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 3,
    maximum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 3)
  test.end()
})

tap.test('BOUNDED_8BITS_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 0,
    maximum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED_8BITS_TYPED__LENGTH_PREFIX: same max/min', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 3,
    maximum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 3)
  test.end()
})

tap.test('ROOF_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ROOF_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    maximum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x00, // Array length
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF_8BITS_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ROOF_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    maximum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('FLOOR_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = FLOOR_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 3,
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x00, // Array length
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('UNBOUNDED_TYPED__LENGTH_PREFIX: should encode [ true, false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    prefixEncodings: [],
    encoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x01
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 0,
    maximum: 3,
    prefixEncodings: [ encoding, encoding ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x05
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = BOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 0,
    maximum: 3,
    prefixEncodings: [ encoding, encoding ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x05
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('FLOOR_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    minimum: 2,
    prefixEncodings: [ encoding, encoding ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, // Array length
    0x01, 0x00, 0x05
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ROOF_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    maximum: 3,
    prefixEncodings: [ encoding, encoding ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x00, // Array length
    0x01, 0x00, 0x05
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF_8BITS_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ROOF_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    maximum: 3,
    prefixEncodings: [ encoding, encoding ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x05
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, true ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const encoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, true
  ], {
    prefixEncodings: [ encoding, encoding ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, 0x05
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const booleanEncoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const integerEncoding: Encoding = getEncoding({
    type: 'integer'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = BOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, 5
  ], {
    minimum: 2,
    maximum: 3,
    prefixEncodings: [ booleanEncoding, booleanEncoding ],
    encoding: integerEncoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, // Array length
    0x01, 0x00, // True, false
    0x0a // 5
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED_8BITS_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const booleanEncoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const integerEncoding: Encoding = getEncoding({
    type: 'integer'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, 5
  ], {
    minimum: 2,
    maximum: 3,
    prefixEncodings: [ booleanEncoding, booleanEncoding ],
    encoding: integerEncoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, // Array length
    0x01, 0x00, // True, false
    0x0a // 5
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const booleanEncoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const integerEncoding: Encoding = getEncoding({
    type: 'integer'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ROOF_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, 5
  ], {
    maximum: 3,
    prefixEncodings: [ booleanEncoding, booleanEncoding ],
    encoding: integerEncoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x00, // Array length
    0x01, 0x00, // True, false
    0x0a // 5
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF_8BITS_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const booleanEncoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const integerEncoding: Encoding = getEncoding({
    type: 'integer'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ROOF_8BITS_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, 5
  ], {
    maximum: 3,
    prefixEncodings: [ booleanEncoding, booleanEncoding ],
    encoding: integerEncoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, // True, false
    0x0a // 5
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('FLOOR_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const booleanEncoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const integerEncoding: Encoding = getEncoding({
    type: 'integer'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = FLOOR_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, 5
  ], {
    minimum: 2,
    prefixEncodings: [ booleanEncoding, booleanEncoding ],
    encoding: integerEncoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x01, // Array length
    0x01, 0x00, // True, false
    0x0a // 5
  ]))

  test.is(bytesWritten, 4)
  test.end()
})

tap.test('UNBOUNDED_TYPED__LENGTH_PREFIX: should encode [ typed:true, typed:false, 5 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const booleanEncoding: Encoding = getEncoding({
    type: 'boolean'
  }, 1)

  const integerEncoding: Encoding = getEncoding({
    type: 'integer'
  }, 1)

  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, 0, [
    true, false, 5
  ], {
    prefixEncodings: [ booleanEncoding, booleanEncoding ],
    encoding: integerEncoding
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x03, // Array length
    0x01, 0x00, // True, false
    0x0a // 5
  ]))

  test.is(bytesWritten, 4)
  test.end()
})
