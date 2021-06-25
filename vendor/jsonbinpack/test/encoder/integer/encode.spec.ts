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
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED_MULTIPLE_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  BOUNDED_MULTIPLE__ENUM_VARINT,
  FLOOR__ENUM_VARINT,
  FLOOR_MULTIPLE__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT,
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../../lib/encoder/integer/encode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../../lib/encoder'

tap.test('BOUNDED_8BITS__ENUM_FIXED: should encode -5 (-5..-1) as 0x00', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, 0, -5, {
    minimum: -5,
    maximum: -1
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_8BITS__ENUM_FIXED: should encode 2 (-5..5) as 0x07', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, 0, 2, {
    minimum: -5,
    maximum: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_8BITS__ENUM_FIXED: should encode 5 (2..8) as 0x03', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, 0, 5, {
    minimum: 2,
    maximum: 8
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x03 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_MULTIPLE_8BITS__ENUM_FIXED: should encode 5 (1..19) / 5 as 0x00', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_MULTIPLE_8BITS__ENUM_FIXED(buffer, 0, 5, {
    minimum: 1,
    maximum: 19,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_MULTIPLE_8BITS__ENUM_FIXED: should encode 15 (1..19) / 5 as 0x02', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_MULTIPLE_8BITS__ENUM_FIXED(buffer, 0, 15, {
    minimum: 1,
    maximum: 19,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED__ENUM_VARINT: should encode -5 (-5..-1) as 0x00', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, 0, -5, {
    minimum: -5,
    maximum: -1
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED__ENUM_VARINT: should encode 2 (-5..5) as 0x07', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, 0, 2, {
    minimum: -5,
    maximum: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED__ENUM_VARINT: should encode 5 (2..8) as 0x03', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, 0, 5, {
    minimum: 2,
    maximum: 8
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x03 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_MULTIPLE__ENUM_VARINT: should encode 5 (1..19) / 5 as 0x00', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_MULTIPLE__ENUM_VARINT(buffer, 0, 5, {
    minimum: 1,
    maximum: 19,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_MULTIPLE__ENUM_VARINT: should encode 15 (1..19) / 5 as 0x02', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = BOUNDED_MULTIPLE__ENUM_VARINT(buffer, 0, 15, {
    minimum: 1,
    maximum: 19,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('FLOOR__ENUM_VARINT: should encode -3 (-10..) as 0x07', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, 0, -3, {
    minimum: -10
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('FLOOR__ENUM_VARINT: should encode 5 (2..) as 0x03', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, 0, 5, {
    minimum: 2
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x03 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('FLOOR_MULTIPLE__ENUM_VARINT: should encode 10 (5..) / 5 as 0x01', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = FLOOR_MULTIPLE__ENUM_VARINT(buffer, 0, 10, {
    minimum: 5,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('FLOOR_MULTIPLE__ENUM_VARINT: should encode 10 (2..) / 5 as 0x01', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = FLOOR_MULTIPLE__ENUM_VARINT(buffer, 0, 10, {
    minimum: 2,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF__MIRROR_ENUM_VARINT: should encode -3 (..-2) as 0x01', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ROOF__MIRROR_ENUM_VARINT(buffer, 0, -3, {
    maximum: -2
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF__MIRROR_ENUM_VARINT: should encode 8 (..10) as 0x02', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ROOF__MIRROR_ENUM_VARINT(buffer, 0, 8, {
    maximum: 10
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode -15 (..-5) / -5 as 0x02', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, -15, {
    maximum: -5,
    multiplier: -5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 5 (..16) / 5 as 0x02', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 5, {
    maximum: 16,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 10 (..15) / 5 as 0x01', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 10, {
    maximum: 15,
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 10 (..15) / -5 as 0x01', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 10, {
    maximum: 15,
    multiplier: -5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ARBITRARY__ZIGZAG_VARINT: should encode -25200 as 0xdf 0x89 0x03', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = ARBITRARY__ZIGZAG_VARINT(buffer, 0, -25200, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0xdf, 0x89, 0x03 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT: should encode 10 / 5  as 0x04', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, 10, {
    multiplier: 5
  }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x04 ]))
  test.is(bytesWritten, 1)
  test.end()
})
