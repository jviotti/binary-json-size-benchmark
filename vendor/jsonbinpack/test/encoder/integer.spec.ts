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
  BOUNDED_8BITS__ENUM_FIXED as ENCODE_BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED_MULTIPLE_8BITS__ENUM_FIXED as ENCODE_BOUNDED_MULTIPLE_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT as ENCODE_BOUNDED__ENUM_VARINT,
  BOUNDED_MULTIPLE__ENUM_VARINT as ENCODE_BOUNDED_MULTIPLE__ENUM_VARINT,
  FLOOR__ENUM_VARINT as ENCODE_FLOOR__ENUM_VARINT,
  FLOOR_MULTIPLE__ENUM_VARINT as ENCODE_FLOOR_MULTIPLE__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT as ENCODE_ROOF__MIRROR_ENUM_VARINT,
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT as ENCODE_ROOF_MULTIPLE__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT as ENCODE_ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT as ENCODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../lib/encoder/integer/encode'

import {
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED as DECODE_BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED_MULTIPLE_8BITS__ENUM_FIXED as DECODE_BOUNDED_MULTIPLE_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT as DECODE_BOUNDED__ENUM_VARINT,
  BOUNDED_MULTIPLE__ENUM_VARINT as DECODE_BOUNDED_MULTIPLE__ENUM_VARINT,
  FLOOR__ENUM_VARINT as DECODE_FLOOR__ENUM_VARINT,
  FLOOR_MULTIPLE__ENUM_VARINT as DECODE_FLOOR_MULTIPLE__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT as DECODE_ROOF__MIRROR_ENUM_VARINT,
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT as DECODE_ROOF_MULTIPLE__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT as DECODE_ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT as DECODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../lib/encoder/integer/decode'

import {
  UINT8_MAX
} from '../../lib/utils/limits'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('BOUNDED_8BITS__ENUM_FIXED', (test) => {
  const arbitrary = fc.integer().chain((minimum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(minimum),
      fc.integer(minimum, minimum + UINT8_MAX),
      fc.integer(minimum, minimum + UINT8_MAX))
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value ]): boolean => {
    fc.pre(value <= maximum)

    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 1))
    const bytesWritten: number =
      ENCODE_BOUNDED_8BITS__ENUM_FIXED(buffer, offset, value, {
        minimum, maximum
      }, context)
    const result: IntegerResult =
      DECODE_BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum, maximum
      })
    return bytesWritten === 1 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED_MULTIPLE_8BITS__ENUM_FIXED', (test) => {
  const arbitrary = fc.integer().chain((minimum: number) => {
    return fc.integer(minimum, minimum + UINT8_MAX).chain((maximum: number) => {
      return fc.tuple(
        fc.nat(10),
        fc.constant(minimum),
        fc.constant(maximum),
        fc.integer(minimum, maximum),
        fc.integer(minimum, maximum)
      )
    })
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value, multiplier ]): boolean => {
    fc.pre(value % multiplier === 0)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 1))
    const bytesWritten: number =
      ENCODE_BOUNDED_MULTIPLE_8BITS__ENUM_FIXED(
        buffer, offset, value, {
          minimum, maximum, multiplier
        }, context)
    const result: IntegerResult =
      DECODE_BOUNDED_MULTIPLE_8BITS__ENUM_FIXED(
        buffer, offset, {
          minimum, maximum, multiplier
        })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED__ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.integer(), fc.integer(), fc.integer(), (
    offset: number, value: number, minimum: number, maximum: number
  ): boolean => {
    fc.pre(value >= minimum && value <= maximum)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_BOUNDED__ENUM_VARINT(buffer, offset, value, {
        minimum, maximum
      }, context)
    const result: IntegerResult =
      DECODE_BOUNDED__ENUM_VARINT(buffer, offset, {
        minimum, maximum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED_MULTIPLE__ENUM_VARINT', (test) => {
  const arbitrary = fc.integer().chain((minimum: number) => {
    return fc.integer({
      min: minimum
    }).chain((maximum: number) => {
      return fc.tuple(
        fc.nat(10),
        fc.constant(minimum),
        fc.constant(maximum),
        fc.integer({
          min: minimum, max: maximum
        }),
        fc.integer({
          min: minimum, max: maximum
        })
      )
    })
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value, multiplier ]): boolean => {
    fc.pre(value % multiplier === 0)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_BOUNDED_MULTIPLE__ENUM_VARINT(buffer, offset, value, {
        minimum, maximum, multiplier
      }, context)
    const result: IntegerResult =
      DECODE_BOUNDED_MULTIPLE__ENUM_VARINT(buffer, offset, {
        minimum, maximum, multiplier
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('FLOOR__ENUM_VARINT: should encode 696667952522107300000', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(60))
  const value: number = 696667952522107300000
  const bytesWritten: number =
    ENCODE_FLOOR__ENUM_VARINT(buffer, 0, value, {
      minimum: 0
    }, context)
  const result: IntegerResult =
    DECODE_FLOOR__ENUM_VARINT(buffer, 0, {
      minimum: 0
    })

  test.is(bytesWritten, result.bytes)
  test.is(result.value, value)
  test.end()
})

tap.test('FLOOR__ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.integer(), fc.integer(), (
    offset: number, value: number, minimum: number
  ): boolean => {
    fc.pre(value >= minimum)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_FLOOR__ENUM_VARINT(buffer, offset, value, {
        minimum
      }, context)
    const result: IntegerResult =
      DECODE_FLOOR__ENUM_VARINT(buffer, offset, {
        minimum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('FLOOR_MULTIPLE__ENUM_VARINT', (test) => {
  const arbitrary = fc.integer().chain((minimum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(minimum),
      fc.integer({
        min: minimum
      }),
      fc.integer({
        min: minimum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, value, multiplier ]): boolean => {
    fc.pre(value % multiplier === 0)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_FLOOR_MULTIPLE__ENUM_VARINT(buffer, offset, value, {
        minimum, multiplier
      }, context)
    const result: IntegerResult =
      DECODE_FLOOR_MULTIPLE__ENUM_VARINT(buffer, offset, {
        minimum, multiplier
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF__MIRROR_ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.integer(), fc.integer(), (
    offset: number, value: number, maximum: number
  ): boolean => {
    fc.pre(value <= maximum)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_ROOF__MIRROR_ENUM_VARINT(buffer, offset, value, {
        maximum
      }, context)
    const result: IntegerResult =
      DECODE_ROOF__MIRROR_ENUM_VARINT(buffer, offset, {
        maximum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT', (test) => {
  const arbitrary = fc.integer().chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(maximum),
      fc.integer({
        max: maximum
      }),
      fc.integer({
        max: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, maximum, value, multiplier ]): boolean => {
    fc.pre(value % multiplier === 0)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, offset, value, {
        maximum, multiplier
      }, context)
    const result: IntegerResult =
      DECODE_ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, offset, {
        maximum, multiplier
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY__ZIGZAG_VARINT', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.integer(), (offset: number, value: number): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_ARBITRARY__ZIGZAG_VARINT(buffer, offset, value, {}, context)
    const result: IntegerResult =
      DECODE_ARBITRARY__ZIGZAG_VARINT(buffer, offset, {})
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.integer(), fc.integer(), (
    offset: number, value: number, multiplier: number
  ): boolean => {
    fc.pre(value % multiplier === 0)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number =
      ENCODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, offset, value, {
        multiplier
      }, context)
    const result: IntegerResult =
      DECODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, offset, {
        multiplier
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})
