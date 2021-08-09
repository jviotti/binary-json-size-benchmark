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
  NULL_8BITS_ENUM_FIXED as ENCODE_NULL_8BITS_ENUM_FIXED
} from '../../lib/encoder/null/encode'

import {
  NullResult,
  NULL_8BITS_ENUM_FIXED as DECODE_NULL_8BITS_ENUM_FIXED
} from '../../lib/encoder/null/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('NULL_8BITS_ENUM_FIXED', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = ENCODE_NULL_8BITS_ENUM_FIXED(buffer, 0, null, {}, context)
  const result: NullResult = DECODE_NULL_8BITS_ENUM_FIXED(buffer, 0, {})

  test.is(bytesWritten, 0)
  test.is(bytesWritten, result.bytes)
  test.is(result.value, null)
  test.end()
})

tap.test('NULL_8BITS_ENUM_FIXED with offset > 0', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const bytesWritten: number = ENCODE_NULL_8BITS_ENUM_FIXED(buffer, 5, null, {}, context)
  const result: NullResult = DECODE_NULL_8BITS_ENUM_FIXED(buffer, 5, {})

  test.is(bytesWritten, 0)
  test.is(bytesWritten, result.bytes)
  test.is(result.value, null)
  test.end()
})
