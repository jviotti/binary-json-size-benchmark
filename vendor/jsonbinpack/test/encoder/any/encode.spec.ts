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
  ANY__TYPE_PREFIX
} from '../../../lib/encoder/any/encode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../../lib/encoder'

tap.test('ANY__TYPE_PREFIX: should encode null as 0x16', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, null, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x16 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode false as 0x06', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, false, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x06 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode true as 0x0e', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, true, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x0e ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode "foo" as 0x21 + string', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, 'foo', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x21, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode " " as 0x11 0x20', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, ' ', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x11, 0x20 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode 3.14 as 0x2e + double', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, 3.14, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x2e, 0xf4, 0x04, 0x02 ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode 256 as 0x1e + varint', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, 256, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x1e, 0x80, 0x02 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode 255 as 0x04 0xff', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, 255, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x04, 0xff ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode 0 as 0x0c', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, 0, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x0c ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode -257 as 0x26 + 256 varint', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, -257, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x26, 0x80, 0x02 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode -1 as 0x0d', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, -1, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x0d ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode -256 as 0x05 0xff', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, -256, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x05, 0xff ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(17))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {}, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x1a, // (Length + 1) + Tag
    0x04, 0x66, 0x6f, 0x6f, // Key length + 'foo'
    0x21, 0x62, 0x61, 0x72, // String tag + length + 'bar'
    0x04, 0x62, 0x61, 0x7a, // Key length + 'baz'
    0x14 // Value 1 + 1 with positive integer type tag
  ]))

  test.is(bytesWritten, 14)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, [
    'foo',
    true,
    2000
  ], {}, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x23, // Length + 1 with tag
    0x21, 0x66, 0x6f, 0x6f, // "foo"
    0x0e, // True
    0x1e, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 9)
  test.end()
})
