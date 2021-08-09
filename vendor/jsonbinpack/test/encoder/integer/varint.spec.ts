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
  varintEncode,
  varintDecode,
  VarintDecodeResult
} from '../../../lib/encoder/integer/varint'

import {
  ResizableBuffer
} from '../../../lib/encoder'

tap.test('should encode 1 as 0x01', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, BigInt(1))
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode 300 as 0xAC 0x02', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, BigInt(300))
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0xAC, 0x02 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode 23 as 0x17', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, BigInt(23))
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x17 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode 50399 as 0xDF 0x89 0x03', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, BigInt(50399))
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0xDF, 0x89, 0x03 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('should decode 0xAC 0x02 as 300', (test) => {
  const buffer: ResizableBuffer =
    new ResizableBuffer(Buffer.from([ 0xAC, 0x02 ]))
  const offset: number = 0
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  test.is(result.value, BigInt(300))
  test.is(result.bytes, 2)
  test.end()
})

tap.test('should encode and decode 4294967294', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, BigInt(4294967294))
  test.is(bytesWritten, 5)
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  test.is(result.bytes, 5)
  test.is(result.value, BigInt(4294967294))
  test.end()
})

tap.test('should encode and decode 696667952522107300000', (test) => {
  const buffer: ResizableBuffer =
    new ResizableBuffer(Buffer.allocUnsafe(10))
  const offset: number = 0
  const bytesWritten: number =
    varintEncode(buffer, offset, BigInt(696667952522107300000))
  test.is(bytesWritten, 10)
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  test.is(result.bytes, 10)
  test.is(result.value, BigInt(696667952522107300000))
  test.end()
})

tap.test('should decode a varint encoded unsigned integer', (test) => {
  fc.assert(fc.property(fc.integer({
    min: 0
  }), (value: number): boolean => {
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
    const offset: number = 0
    const bytesWritten: number = varintEncode(buffer, offset, BigInt(value))
    const result: VarintDecodeResult = varintDecode(buffer, offset)
    return bytesWritten > 0 &&
      result.bytes === bytesWritten && result.value === BigInt(value)
  }), {
    verbose: false
  })

  test.end()
})
