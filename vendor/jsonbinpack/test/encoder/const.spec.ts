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
  isDeepStrictEqual
} from 'util'

import {
  JSONValue
} from '../../lib/json'

import {
  CONST_NONE as ENCODE_CONST_NONE
} from '../../lib/encoder/const/encode'

import {
  ConstResult,
  CONST_NONE as DECODE_CONST_NONE
} from '../../lib/encoder/const/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('CONST_NONE: scalars', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({
      maxLength: 1000
    })
  ), (offset: number, value: JSONValue): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
    const bytesWritten: number = ENCODE_CONST_NONE(buffer, offset, value, {
      value
    }, context)
    const result: ConstResult = DECODE_CONST_NONE(buffer, offset, {
      value
    })
    return bytesWritten === 0 &&
      result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('CONST_NONE: JSON', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
    const bytesWritten: number = ENCODE_CONST_NONE(buffer, 0, value, {
      value
    }, context)
    const result: ConstResult = DECODE_CONST_NONE(buffer, 0, {
      value
    })
    return bytesWritten === 0 && result.bytes === bytesWritten &&
      isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
