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
  IntegerListResult,
  integerListEncode,
  integerListDecode
} from '../../../lib/encoder/object/integer-list'

import {
  ResizableBuffer
} from '../../../lib/encoder'

tap.test('should encode [] (1:3) as []', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(0))
  const offset: number = 0
  const integers: number[] = []
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 1,
    maximum: 3
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([]))
  test.is(bytesWritten, 0)
  test.end()
})

tap.test('should encode [ 1, 2, 3 ] (1:3) as REVERSE(00 01 10 00)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 1,
    maximum: 3
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00011000 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ 1, 2, 3, 2 ] (1:3) as REVERSE(00 01 10 01)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3, 2 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 1,
    maximum: 3
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b10011000 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ 1, 2, 3, 2, 2 ] (1:3) as REVERSE(00 01 10 01) ++ REVERSE(01 000000)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3, 2, 2 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 1,
    maximum: 3
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b10011000, 0b00000010 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode [ 1, 2, 3, 2, 2, 3 ] (1:3) as REVERSE(00 01 10 01) ++ REVERSE(01 10 0000)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3, 2, 2, 3 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 1,
    maximum: 3
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b10011000, 0b00000110 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode [ 5, 6, 6, 5 ] (5:6) as REVERSE(0110 0000)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const integers: number[] = [ 5, 6, 6, 5 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 5,
    maximum: 6
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00000110 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ 1, 2 ] (0:3) as REVERSE(01 10 0000)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const integers: number[] = [ 1, 2 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 0,
    maximum: 3
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00000110 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ 1, 2 ] (0:4) as REVERSE(001 010 00)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const integers: number[] = [ 1, 2 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 0,
    maximum: 4
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00010100 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ 1, 2, 3 ] (0:4) as REVERSE(001 010 01) ++ REVERSE(1 0000000)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 0,
    maximum: 4
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b10010100, 0b00000001 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode [ 1, 2, 3, 4 ] (0:4) as REVERSE(001 010 01) ++ REVERSE(1 100 0000)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3, 4 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 0,
    maximum: 4
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b10010100, 0b00000011 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode [ 3, 2 ] (0:127) as REVERSE(0000011 0) ++ REVERSE(000010 00)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const offset: number = 0
  const integers: number[] = [ 3, 2 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 0,
    maximum: 127
  })

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b01100000, 0b00010000 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('should encode/decode [ 1, 2, 3 ] (1:3)', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const offset: number = 0
  const integers: number[] = [ 1, 2, 3 ]
  const bytesWritten: number = integerListEncode(buffer, offset, integers, {
    minimum: 1,
    maximum: 3
  })

  const result: IntegerListResult = integerListDecode(buffer, offset, integers.length, {
    minimum: 1,
    maximum: 3
  })

  test.strictSame(result.value, integers)
  test.is(bytesWritten, result.bytes)
  test.end()
})

tap.test('should encode/decode random arrays of bounded integers', (test) => {
  const arbitrary = fc.integer().chain((minimum: number) => {
    return fc.integer(minimum, minimum + 400).chain((maximum: number) => {
      return fc.tuple(
        fc.nat(10),
        fc.constant(minimum),
        fc.constant(maximum),
        fc.array(fc.integer(minimum, maximum))
      )
    })
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value ]): boolean => {
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(20))
    const bytesWritten: number = integerListEncode(buffer, offset, value, {
      minimum,
      maximum
    })

    const result: IntegerListResult = integerListDecode(buffer, offset, value.length, {
      minimum,
      maximum
    })

    return bytesWritten >= 0 && result.bytes === bytesWritten &&
      isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
