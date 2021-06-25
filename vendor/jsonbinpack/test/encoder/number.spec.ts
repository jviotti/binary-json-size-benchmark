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
  DOUBLE_VARINT_TUPLE as ENCODE_DOUBLE_VARINT_TUPLE
} from '../../lib/encoder/number/encode'

import {
  NumberResult,
  DOUBLE_VARINT_TUPLE as DECODE_DOUBLE_VARINT_TUPLE
} from '../../lib/encoder/number/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('DOUBLE_VARINT_TUPLE: 2.980232223226409e-7', (test) => {
  const offset: number = 0

  // This equals 0.0000002980232223226409
  const value: number = 2.980232223226409e-7

  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const bytesWritten: number =
    ENCODE_DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context)
  const result: NumberResult = DECODE_DOUBLE_VARINT_TUPLE(buffer, offset, {})

  test.is(bytesWritten, 9)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})

tap.test('DOUBLE_VARINT_TUPLE: 234.9e-1', (test) => {
  const offset: number = 0

  // This equals 23.49
  const value: number = 234.9e-1

  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number =
    ENCODE_DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context)
  const result: NumberResult = DECODE_DOUBLE_VARINT_TUPLE(buffer, offset, {})

  test.is(bytesWritten, 3)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})

tap.test('DOUBLE_VARINT_TUPLE: 234.9e-1', (test) => {
  const offset: number = 0

  // This equals
  // -0.00000000000000000000000000000000000000000000000000000000000000
  // 00000000000000000000000000000000000000000000000000000000000000000
  // 00000000000000000000000000000000000000000000000000000000000000000
  // 00000000000000000000000000000000000000000000000000000000000000000
  // 0000000000000000000000000000000000000000000000000000000000000000005
  const value: number = -5e-324

  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number =
    ENCODE_DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context)
  const result: NumberResult = DECODE_DOUBLE_VARINT_TUPLE(buffer, offset, {})

  test.is(bytesWritten, 3)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})

tap.test('DOUBLE_VARINT_TUPLE: 0', (test) => {
  const offset: number = 0
  const value: number = 0

  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number =
    ENCODE_DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context)
  const result: NumberResult = DECODE_DOUBLE_VARINT_TUPLE(buffer, offset, {})

  test.is(bytesWritten, 2)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})

tap.test('DOUBLE_VARINT_TUPLE', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.double(), (offset: number, value: number): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 20))
    const bytesWritten: number = ENCODE_DOUBLE_VARINT_TUPLE(buffer, offset, value, {}, context)
    const result: NumberResult = DECODE_DOUBLE_VARINT_TUPLE(buffer, offset, {})
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})
