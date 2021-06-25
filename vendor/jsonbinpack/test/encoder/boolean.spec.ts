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
  JSONBoolean
} from '../../lib/json'

import {
  BOOLEAN_8BITS__ENUM_FIXED as ENCODE_BOOLEAN_8BITS__ENUM_FIXED
} from '../../lib/encoder/boolean/encode'

import {
  BooleanResult,
  BOOLEAN_8BITS__ENUM_FIXED as DECODE_BOOLEAN_8BITS__ENUM_FIXED
} from '../../lib/encoder/boolean/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('BOOLEAN_8BITS__ENUM_FIXED: false', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONBoolean = false
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ENCODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, value, {}, context)
  const result: BooleanResult = DECODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, {})

  test.is(bytesWritten, 1)
  test.is(bytesWritten, result.bytes)
  test.is(result.value, value)
  test.end()
})

tap.test('BOOLEAN_8BITS__ENUM_FIXED: false with offset > 0', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONBoolean = false
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const bytesWritten: number = ENCODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, value, {}, context)
  const result: BooleanResult = DECODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, {})

  test.is(bytesWritten, 1)
  test.is(bytesWritten, result.bytes)
  test.is(result.value, value)
  test.end()
})

tap.test('BOOLEAN_8BITS__ENUM_FIXED: true', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONBoolean = true
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ENCODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, value, {}, context)
  const result: BooleanResult = DECODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, {})

  test.is(bytesWritten, 1)
  test.is(bytesWritten, result.bytes)
  test.is(result.value, value)
  test.end()
})

tap.test('BOOLEAN_8BITS__ENUM_FIXED: true with offset > 0', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONBoolean = true
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const bytesWritten: number = ENCODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, value, {}, context)
  const result: BooleanResult = DECODE_BOOLEAN_8BITS__ENUM_FIXED(buffer, 5, {})

  test.is(bytesWritten, 1)
  test.is(bytesWritten, result.bytes)
  test.is(result.value, value)
  test.end()
})
