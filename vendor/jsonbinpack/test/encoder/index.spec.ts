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
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext,
  DecodeResult,
  EncodingType,
  encode,
  decode
} from '../../lib/encoder'

import {
  Encoding
} from '../../lib/mapper'

import {
  JSONValue
} from '../../lib/json'

tap.test('should dynamically encode a boolean value', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const encoding: Encoding = {
    type: EncodingType.Boolean,
    encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
    options: {}
  }

  const value: JSONValue = true
  const bytesWritten: number = encode(buffer, offset, encoding, value, context)
  test.is(bytesWritten, 1)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))

  const result: DecodeResult = decode(buffer, offset, encoding)
  test.is(result.bytes, bytesWritten)
  test.strictSame(result.value, value)

  test.end()
})
