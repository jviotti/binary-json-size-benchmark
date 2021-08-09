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

import {
  ENGLISH_DICTIONARY
} from '../../lib/encoder/string/dictionaries'

import {
  STRING_BROTLI as ENCODE_STRING_BROTLI,
  STRING_DICTIONARY_COMPRESSOR as ENCODE_STRING_DICTIONARY_COMPRESSOR,
  URL_PROTOCOL_HOST_REST as ENCODE_URL_PROTOCOL_HOST_REST,
  RFC3339_DATE_INTEGER_TRIPLET as ENCODE_RFC3339_DATE_INTEGER_TRIPLET,
  BOUNDED_PREFIX_LENGTH_8BIT_FIXED as ENCODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED,
  ROOF_PREFIX_LENGTH_ENUM_VARINT as ENCODE_ROOF_PREFIX_LENGTH_ENUM_VARINT,
  FLOOR_PREFIX_LENGTH_ENUM_VARINT as ENCODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT,
  UTF8_STRING_NO_LENGTH as ENCODE_UTF8_STRING_NO_LENGTH,
  SHARED_STRING_POINTER_RELATIVE_OFFSET as ENCODE_SHARED_STRING_POINTER_RELATIVE_OFFSET,
  STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH as ENCODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH
} from '../../lib/encoder/string/encode'

import {
  StringResult,
  STRING_BROTLI as DECODE_STRING_BROTLI,
  STRING_DICTIONARY_COMPRESSOR as DECODE_STRING_DICTIONARY_COMPRESSOR,
  URL_PROTOCOL_HOST_REST as DECODE_URL_PROTOCOL_HOST_REST,
  RFC3339_DATE_INTEGER_TRIPLET as DECODE_RFC3339_DATE_INTEGER_TRIPLET,
  BOUNDED_PREFIX_LENGTH_8BIT_FIXED as DECODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED,
  ROOF_PREFIX_LENGTH_ENUM_VARINT as DECODE_ROOF_PREFIX_LENGTH_ENUM_VARINT,
  FLOOR_PREFIX_LENGTH_ENUM_VARINT as DECODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT,
  UTF8_STRING_NO_LENGTH as DECODE_UTF8_STRING_NO_LENGTH,
  SHARED_STRING_POINTER_RELATIVE_OFFSET as DECODE_SHARED_STRING_POINTER_RELATIVE_OFFSET,
  STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH as DECODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH
} from '../../lib/encoder/string/decode'

import {
  BoundedOptions,
  RoofOptions,
  FloorOptions,
  DictionaryOptions,
  SizeOptions
} from '../../lib/encoder/string/options'

import {
  UINT8_MAX
} from '../../lib/utils/limits'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('STRING_BROTLI: "The quick brown fox jumps over the lazy dog"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'The quick brown fox jumps over the lazy dog'
  const bytesWritten: number =
    ENCODE_STRING_BROTLI(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_STRING_BROTLI(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('STRING_BROTLI: "" at offset 1', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = ''
  const bytesWritten: number =
    ENCODE_STRING_BROTLI(buffer, 1, value, {}, context)
  const result: StringResult = DECODE_STRING_BROTLI(buffer, 1, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: "The quick brown fox jumps over the lazy dog"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'The quick brown fox jumps over the lazy dog'
  const options: DictionaryOptions = ENGLISH_DICTIONARY
  const bytesWritten: number =
    ENCODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, value, options, context)
  const result: StringResult = DECODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, options)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: "foo bar baz" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'foo bar baz'

  const options: DictionaryOptions = {
    index: [ 'bar' ],
    dictionary: {
      bar: 0
    }
  }

  const bytesWritten: number =
    ENCODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, value, options, context)
  const result: StringResult = DECODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, options)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: "foo bar foo" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'foo bar foo'

  const options: DictionaryOptions = {
    index: [ 'bar' ],
    dictionary: {
      bar: 0
    }
  }

  const bytesWritten: number =
    ENCODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, value, options, context)
  const result: StringResult = DECODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, options)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR: "bar foo foo" with [ bar ]', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'bar foo foo'

  const options: DictionaryOptions = {
    index: [ 'bar' ],
    dictionary: {
      bar: 0
    }
  }

  const bytesWritten: number =
    ENCODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, value, options, context)
  const result: StringResult = DECODE_STRING_DICTIONARY_COMPRESSOR(buffer, 0, options)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should handle "https://google.com"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'https://google.com'
  const bytesWritten: number =
    ENCODE_URL_PROTOCOL_HOST_REST(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_URL_PROTOCOL_HOST_REST(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should handle "https://google.com/"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'https://google.com/'
  const bytesWritten: number =
    ENCODE_URL_PROTOCOL_HOST_REST(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_URL_PROTOCOL_HOST_REST(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should handle "https://google.com/foo"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'https://google.com/foo'
  const bytesWritten: number =
    ENCODE_URL_PROTOCOL_HOST_REST(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_URL_PROTOCOL_HOST_REST(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should handle "https://google.com/foo?q=x"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'https://google.com/foo?q=x'
  const bytesWritten: number =
    ENCODE_URL_PROTOCOL_HOST_REST(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_URL_PROTOCOL_HOST_REST(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should handle "https://google.com/foo#hello"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'https://google.com/foo#hello'
  const bytesWritten: number =
    ENCODE_URL_PROTOCOL_HOST_REST(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_URL_PROTOCOL_HOST_REST(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('URL_PROTOCOL_HOST_REST: should handle "git://github.com/gruntjs/grunt.git"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'git://github.com/gruntjs/grunt.git'
  const bytesWritten: number =
    ENCODE_URL_PROTOCOL_HOST_REST(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_URL_PROTOCOL_HOST_REST(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)
  test.end()
})

tap.test('RFC3339_DATE_INTEGER_TRIPLET: should handle "2014-10-01"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    ENCODE_RFC3339_DATE_INTEGER_TRIPLET(buffer, 0, '2014-10-01', {}, context)
  test.is(bytesWritten, 4)
  const result: StringResult = DECODE_RFC3339_DATE_INTEGER_TRIPLET(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, '2014-10-01')
  test.end()
})

tap.test('BOUNDED_PREFIX_LENGTH_8BIT_FIXED (ASCII)', (test) => {
  const arbitrary = fc.nat(UINT8_MAX - 1).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.nat(maximum),
      fc.constant(maximum),
      fc.string({
        maxLength: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value ]): boolean => {
    fc.pre(Buffer.byteLength(value, 'utf8') >= minimum)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + UINT8_MAX + 1))
    const bytesWritten: number = ENCODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED(
      buffer, offset, value, {
        minimum, maximum
      }, context)
    const result: StringResult = DECODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED(
      buffer, offset, {
        minimum, maximum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF_PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(1000).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(maximum),
      fc.string({
        maxLength: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, maximum, value ]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_ROOF_PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        maximum
      }, context)
    const result: StringResult =
      DECODE_ROOF_PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        maximum
      })

    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('FLOOR_PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(2000).chain((minimum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(minimum),
      fc.string({
        minLength: minimum, maxLength: 2000
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, value ]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        minimum
      }, context)
    const result: StringResult =
      DECODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        minimum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('STRING_BROTLI (ASCII)', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.string({
    maxLength: 1000
  }), (
    offset: number, value: string
  ): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_STRING_BROTLI(buffer, offset, value, {}, context)
    const result: StringResult =
      DECODE_STRING_BROTLI(buffer, offset, {})
    return result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('STRING_DICTIONARY_COMPRESSOR (ASCII)', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.string({
    maxLength: 1000
  }), (
    offset: number, value: string
  ): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const options: DictionaryOptions = {
      index: [],
      dictionary: {}
    }
    const bytesWritten: number =
      ENCODE_STRING_DICTIONARY_COMPRESSOR(buffer, offset, value, options, context)
    const result: StringResult =
      DECODE_STRING_DICTIONARY_COMPRESSOR(buffer, offset, options)
    return result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED_PREFIX_LENGTH_8BIT_FIXED: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: BoundedOptions = {
    minimum: 0,
    maximum: 4
  }

  const bytesWritten1: number = ENCODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_BOUNDED_PREFIX_LENGTH_8BIT_FIXED(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('ROOF_PREFIX_LENGTH_ENUM_VARINT: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: RoofOptions = {
    maximum: 4
  }

  const bytesWritten1: number = ENCODE_ROOF_PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_ROOF_PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_ROOF_PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_ROOF_PREFIX_LENGTH_ENUM_VARINT(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('FLOOR_PREFIX_LENGTH_ENUM_VARINT: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: FloorOptions = {
    minimum: 2
  }

  const bytesWritten1: number = ENCODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_FLOOR_PREFIX_LENGTH_ENUM_VARINT(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('UTF8_STRING_NO_LENGTH: should handle a string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const value: string = 'foo'
  const options: SizeOptions = {
    size: 3
  }

  const bytesWritten: number = ENCODE_UTF8_STRING_NO_LENGTH(
    buffer, 0, value, options, context)
  const result: StringResult = DECODE_UTF8_STRING_NO_LENGTH(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.is(result.value, value)
  test.end()
})

tap.test('SHARED_STRING_POINTER_RELATIVE_OFFSET: should handle a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'foo'
  const options: SizeOptions = {
    size: 3
  }

  const bytesWritten1: number = ENCODE_UTF8_STRING_NO_LENGTH(
    buffer, 0, value, options, context)
  test.is(context.strings.get('foo'), 0)
  const bytesWritten2: number = ENCODE_SHARED_STRING_POINTER_RELATIVE_OFFSET(
    buffer, bytesWritten1, value, options, context)

  const result: StringResult = DECODE_SHARED_STRING_POINTER_RELATIVE_OFFSET(
    buffer, bytesWritten1, options)

  test.is(result.value, value)
  test.is(result.bytes, bytesWritten2)

  test.end()
})

tap.test('STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH: should handle "foo"', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const value: string = 'foo'
  const bytesWritten: number =
    ENCODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH(buffer, 0, value, {}, context)
  const result: StringResult = DECODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH(buffer, 0, {})

  test.is(result.value, value)
  test.is(result.bytes, bytesWritten)

  test.end()
})

tap.test('STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH: should handle a shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const value: string = 'foo'

  const bytesWritten1: number = ENCODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH(
    buffer, 0, value, {}, context)
  const bytesWritten2: number = ENCODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH(
    buffer, bytesWritten1, value, {}, context)
  const result: StringResult =
    DECODE_STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH(buffer, bytesWritten1, {})

  test.is(bytesWritten1, 4)
  test.is(result.value, value)
  test.is(result.bytes, bytesWritten2)

  test.end()
})
