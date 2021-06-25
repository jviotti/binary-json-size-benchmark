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
  bitsetEncode,
  bitsetDecode,
  BitsetResult
} from '../../../lib/encoder/object/bitset'

import {
  ResizableBuffer
} from '../../../lib/encoder'

tap.test('should encode [ true ] as 0000 0001', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const bits: boolean[] = [ true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00000001 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ false, false, true, false, true ] as 0001 0100', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const bits: boolean[] = [ false, false, true, false, true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00010100 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ false, false, true, false, true, true, false, true, true ] as 1011 0100 0000 0001', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const bits: boolean[] = [ false, false, true, false, true, true, false, true, true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b10110100, 0b00000001 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode [ false, false, false, false, false, false, false, false, true ] as 0000 0000 0000 0001', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const bits: boolean[] = [ false, false, false, false, false, false, false, false, true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00, 0b00000001 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode [ true x 255 ]', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(32))
  const offset: number = 0
  const bits: boolean[] = Array(255).fill(true)
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer.getBuffer(), Buffer.from([
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b01111111
  ]))
  test.is(bytesWritten, 32)
  test.end()
})

tap.test('should decode 0000 0000 0000 0001 as [ false, false, false, false, false, false, false, false, true ]', (test) => {
  const offset: number = 0
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.from([ 0x00, 0xb00000001 ]))
  const result: BitsetResult = bitsetDecode(buffer, offset, 9)
  test.strictSame(result.value, [ false, false, false, false, false, false, false, false, true ])
  test.is(result.bytes, 2)
  test.end()
})

tap.test('should decode 0000 0001 as [ true ]', (test) => {
  const offset: number = 0
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.from([ 0b00000001 ]))
  const result: BitsetResult = bitsetDecode(buffer, offset, 1)
  test.strictSame(result.value, [ true ])
  test.is(result.bytes, 1)
  test.end()
})

tap.test('should decode 0001 0100 as [ false, false, true, false, true ]', (test) => {
  const offset: number = 0
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.from([ 0b00010100 ]))
  const result: BitsetResult = bitsetDecode(buffer, offset, 5)
  test.strictSame(result.value, [ false, false, true, false, true ])
  test.is(result.bytes, 1)
  test.end()
})

tap.test('should encode/decode random arrays of booleans', (test) => {
  fc.assert(fc.property(fc.array(fc.boolean(), {
    minLength: 0,
    maxLength: 255
  }), (value: boolean[]): boolean => {
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(value.length))
    const offset: number = 0
    const bytesWritten: number = bitsetEncode(buffer, offset, value)
    const result: BitsetResult = bitsetDecode(buffer, offset, value.length)
    return bytesWritten * 8 >= value.length && bytesWritten === result.bytes &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
