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
  JSONValue,
  JSONNumber
} from '../../lib/json'

import {
  Encoding,
  getEncoding
} from '../../lib/mapper'

import {
  SemiTypedOptions,
  SemiTypedBoundedOptions
} from '../../lib/encoder/array/options'

import {
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX as ENCODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX,
  UNBOUNDED_TYPED__LENGTH_PREFIX as ENCODE_UNBOUNDED_TYPED__LENGTH_PREFIX,
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX as ENCODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX
} from '../../lib/encoder/array/encode'

import {
  ArrayResult,
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX as DECODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX,
  UNBOUNDED_TYPED__LENGTH_PREFIX as DECODE_UNBOUNDED_TYPED__LENGTH_PREFIX,
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX as DECODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX
} from '../../lib/encoder/array/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: [ "foo", true, 2000 ] (2..3 [])', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONValue = [ 'foo', true, 2000 ]
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: SemiTypedBoundedOptions = {
    prefixEncodings: [],
    minimum: 2,
    maximum: 3
  }

  const bytesWritten: number =
    ENCODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options, context)
  const result: ArrayResult =
    DECODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 10)
  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: [] ([])', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONValue = []
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const options: SemiTypedOptions = {
    prefixEncodings: []
  }

  const bytesWritten: number =
    ENCODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options, context)
  const result: ArrayResult =
    DECODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 1)
  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX (scalars)', (test) => {
  fc.assert(fc.property(fc.array(fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({
      maxLength: 10
    })
  )), (value: JSONValue[]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const offset: number = 0

    const bytesWritten: number =
      ENCODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset, value, {
        prefixEncodings: []
      }, context)

    const result: ArrayResult =
      DECODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset, {
        prefixEncodings: []
      })

    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('UNBOUNDED_TYPED__LENGTH_PREFIX ([], integer)', (test) => {
  fc.assert(fc.property(fc.array(fc.integer()), (value: JSONNumber[]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const offset: number = 0

    const encoding: Encoding = getEncoding({
      type: 'integer'
    }, 1)

    const bytesWritten: number =
      ENCODE_UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, offset, value, {
        prefixEncodings: [],
        encoding
      }, context)

    const result: ArrayResult =
      DECODE_UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, offset, {
        prefixEncodings: [],
        encoding
      })

    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
