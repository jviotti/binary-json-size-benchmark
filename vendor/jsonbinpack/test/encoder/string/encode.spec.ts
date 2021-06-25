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
  STRING_DICTIONARY_COMPRESSOR,
  URL_PROTOCOL_HOST_REST,
  RFC3339_DATE_INTEGER_TRIPLET,
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED,
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT,
  ROOF__PREFIX_LENGTH_8BIT_FIXED,
  ROOF__PREFIX_LENGTH_ENUM_VARINT,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../../lib/encoder/string/encode'

import {
  BoundedOptions,
  RoofOptions,
  FloorOptions
} from '../../../lib/encoder/string/options'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../../lib/encoder'

tap.test('STRING_DICTIONARY_COMPRESSOR: should encode "" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number =
    STRING_DICTIONARY_COMPRESSOR(buffer, 0, '', {
      index: [ 'bar' ],
      dictionary: {
        bar: 0
      }
    }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: should encode "foo bar baz" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number =
    STRING_DICTIONARY_COMPRESSOR(buffer, 0, 'foo bar baz', {
      index: [ 'bar' ],
      dictionary: {
        bar: 0
      }
    }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x0b, // whole string length
    0x07, 0x66, 0x6f, 0x6f, // zigzag negative length + 'foo'
    0x02, // 'bar'
    0x07, 0x62, 0x61, 0x7a // zigzag negative length + 'baz'
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: should encode "foo bar foo" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(11))
  const bytesWritten: number =
    STRING_DICTIONARY_COMPRESSOR(buffer, 0, 'foo bar foo', {
      index: [ 'bar' ],
      dictionary: {
        bar: 0
      }
    }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x0b, // whole string length
    0x07, 0x66, 0x6f, 0x6f, // zigzag negative length + 'foo'
    0x02, // 'bar'
    0x00, // start of shared string
    0x03, 0x06 // zigzag negative length + offset 'foo'
  ]))

  test.is(bytesWritten, 9)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: should encode "bar foo foo" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number =
    STRING_DICTIONARY_COMPRESSOR(buffer, 0, 'bar foo foo', {
      index: [ 'bar' ],
      dictionary: {
        bar: 0
      }
    }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x0b, // whole string length
    0x02, // 'bar'
    0x0f, // zigzag negative length
    0x66, 0x6f, 0x6f, 0x20, 0x66, 0x6f, 0x6f // 'foo foo'
  ]))

  test.is(bytesWritten, 10)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should encode "https://google.com"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    URL_PROTOCOL_HOST_REST(buffer, 0, 'https://google.com', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x07, // protocol length
    0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, // 'https:'
    0x0b, // host length
    0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d, // 'google.com'
    0x01 // rest length
  ]))
  test.is(bytesWritten, 19)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should encode "https://google.com/"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    URL_PROTOCOL_HOST_REST(buffer, 0, 'https://google.com/', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x07, // protocol length
    0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, // 'https:'
    0x0b, // host length
    0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d, // 'google.com'
    0x02, // rest length
    0x2f
  ]))
  test.is(bytesWritten, 20)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should encode "https://google.com/foo"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    URL_PROTOCOL_HOST_REST(buffer, 0, 'https://google.com/foo', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x07, // protocol length
    0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, // 'https:'
    0x0b, // host length
    0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d, // 'google.com'
    0x05, // rest length
    0x2f, 0x66, 0x6f, 0x6f
  ]))
  test.is(bytesWritten, 23)
  test.end()
})

tap.test('RFC3339_DATE_INTEGER_TRIPLET: should encode "2014-10-01"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    RFC3339_DATE_INTEGER_TRIPLET(buffer, 0, '2014-10-01', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0xde, 0x07, 0x0a, 0x01 ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (2..4)', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
      minimum: 2,
      maximum: 4
    }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode "foo" (..4)', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', {
      maximum: 4
    }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x04, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (..4)', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
      maximum: 4
    }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "fooo" (..4)', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'fooo', {
      maximum: 4
    }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01, 0x66, 0x6f, 0x6f, 0x6f ]))
  test.is(bytesWritten, 5)
  test.end()
})

tap.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (3..)', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
      minimum: 3
    }, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode "foo"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, 'foo', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x04, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 4)
  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode ""', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number =
    ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, '', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode " "', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number =
    ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, ' ', {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x02, 0x20 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED: should encode a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: BoundedOptions = {
    minimum: 0,
    maximum: 4
  }

  const bytesWritten1: number = BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
    buffer, bytesWritten1, 'foo', options, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // String length + foo
    0x04, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x00,

    // String length
    0x04,

    // Pointer (current = 6 - location = 1)
    0x05
  ]))

  test.is(context.strings.get('foo'), 1)
  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: BoundedOptions = {
    minimum: 0,
    maximum: 4
  }

  const bytesWritten1: number = BOUNDED__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = BOUNDED__PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // String length + foo
    0x04, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x00,

    // String length
    0x04,

    // Pointer (current = 6 - location = 1)
    0x05
  ]))

  test.is(context.strings.get('foo'), 1)
  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: RoofOptions = {
    maximum: 4
  }

  const bytesWritten1: number = ROOF__PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ROOF__PREFIX_LENGTH_8BIT_FIXED(
    buffer, bytesWritten1, 'foo', options, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // String length + foo
    0x04, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x00,

    // String length
    0x04,

    // Pointer (current = 6 - location = 1)
    0x05
  ]))

  test.is(context.strings.get('foo'), 1)
  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: RoofOptions = {
    maximum: 4
  }

  const bytesWritten1: number = ROOF__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ROOF__PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // String length + foo
    0x02, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x00,

    // String length
    0x02,

    // Pointer (current = 6 - location = 1)
    0x05
  ]))

  test.is(context.strings.get('foo'), 1)
  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  test.end()
})

tap.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: FloorOptions = {
    minimum: 3
  }

  const bytesWritten1: number = FLOOR__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = FLOOR__PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // String length + foo
    0x01, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x00,

    // String length
    0x01,

    // Pointer (current = 6 - location = 1)
    0x05
  ]))

  test.is(context.strings.get('foo'), 1)
  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))

  const bytesWritten1: number = ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, 0, 'foo', {}, context)

  const bytesWritten2: number = ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, bytesWritten1, 'foo', {}, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // String length + foo
    0x04, 0x66, 0x6f, 0x6f,

    // Start of pointer
    0x00,

    // String length
    0x04,

    // Pointer (current = 6 - location = 1)
    0x05
  ]))

  test.is(context.strings.get('foo'), 1)
  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  test.end()
})
