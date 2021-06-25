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
  ARBITRARY_TYPED_KEYS_OBJECT,
  NON_REQUIRED_BOUNDED_TYPED_OBJECT,
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT,
  MIXED_BOUNDED_TYPED_OBJECT,
  REQUIRED_UNBOUNDED_TYPED_OBJECT,
  OPTIONAL_UNBOUNDED_TYPED_OBJECT,
  MIXED_UNBOUNDED_TYPED_OBJECT,
  PACKED_UNBOUNDED_OBJECT,
  PACKED_BOUNDED_REQUIRED_OBJECT
} from '../../../lib/encoder/object/encode'

import {
  getEncoding
} from '../../../lib/mapper'

import {
  getStringEncoding
} from '../../../lib/mapper/string'

import {
  ResizableBuffer,
  EncodingContext,
  EncodingType,
  getDefaultEncodingContext
} from '../../../lib/encoder'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(16))
  const bytesWritten: number = ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x02,

    // Key length + 'foo'
    0x04, 0x66, 0x6f, 0x6f,

    // String tag + length + 'bar'
    0x01, 0x04, 0x62, 0x61, 0x72,

    // Key length + 'baz'
    0x04, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(16))
  const bytesWritten: number = ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    keyEncoding: getStringEncoding({
      type: 'string',
      minLength: 3
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x02,

    // Key length + 'foo'
    0x01, 0x66, 0x6f, 0x6f,

    // String tag + length + 'bar'
    0x01, 0x04, 0x62, 0x61, 0x72,

    // Key length + 'baz'
    0x01, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const bytesWritten: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    optionalProperties: [ 'baz', 'bar', 'foo', 'qux' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1),
      bar: getEncoding({}, 1),
      qux: getEncoding({}, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x04,

    // Bit set
    0b00000101,

    // 1
    0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72
  ]))

  test.is(bytesWritten, 7)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
    optionalProperties: [ 'baz', 'bar', 'foo', 'qux' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1),
      bar: getEncoding({}, 1),
      qux: getEncoding({}, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x04,

    // Bit set
    0b00000000
  ]))

  test.is(bytesWritten, 2)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode a bounded empty object', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
    propertyEncodings: {},
    requiredProperties: [],
    booleanRequiredProperties: []
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([]))
  test.is(bytesWritten, 0)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    requiredProperties: [ 'baz', 'foo' ],
    booleanRequiredProperties: [],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // 1
    0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72
  ]))

  test.is(bytesWritten, 5)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1,baz:true,qux:false}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    bar: 1,
    baz: true,
    qux: false
  }, {
    requiredProperties: [ 'bar', 'foo' ],
    booleanRequiredProperties: [ 'baz', 'qux' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      bar: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1),
      baz: getEncoding({
        type: 'boolean'
      }, 1),
      qux: getEncoding({
        type: 'boolean'
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Bitset
    0b00000001,

    // 1
    0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72
  ]))

  test.is(bytesWritten, 6)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode three boolean properties', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: true,
    bar: false,
    baz: true
  }, {
    requiredProperties: [],
    booleanRequiredProperties: [ 'foo', 'bar', 'baz' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'boolean'
      }, 1),
      bar: getEncoding({
        type: 'boolean'
      }, 1),
      baz: getEncoding({
        type: 'boolean'
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b00000101 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode eight boolean properties', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: true,
    bar: false,
    baz: true,
    qux: true,
    xxx: false,
    yyy: false,
    zzz: true,
    qqq: true
  }, {
    requiredProperties: [],
    booleanRequiredProperties: [ 'foo', 'bar', 'baz', 'qux', 'xxx', 'yyy', 'zzz', 'qqq' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'boolean'
      }, 1),
      bar: getEncoding({
        type: 'boolean'
      }, 1),
      baz: getEncoding({
        type: 'boolean'
      }, 1),
      qux: getEncoding({
        type: 'boolean'
      }, 1),
      xxx: getEncoding({
        type: 'boolean'
      }, 1),
      yyy: getEncoding({
        type: 'boolean'
      }, 1),
      zzz: getEncoding({
        type: 'boolean'
      }, 1),
      qqq: getEncoding({
        type: 'boolean'
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b11001101 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode nine boolean properties', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: true,
    bar: false,
    baz: true,
    qux: true,
    xxx: false,
    yyy: false,
    zzz: true,
    qqq: true,
    ppp: false
  }, {
    requiredProperties: [],
    booleanRequiredProperties: [ 'foo', 'bar', 'baz', 'qux', 'xxx', 'yyy', 'zzz', 'qqq', 'ppp' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'boolean'
      }, 1),
      bar: getEncoding({
        type: 'boolean'
      }, 1),
      baz: getEncoding({
        type: 'boolean'
      }, 1),
      qux: getEncoding({
        type: 'boolean'
      }, 1),
      xxx: getEncoding({
        type: 'boolean'
      }, 1),
      yyy: getEncoding({
        type: 'boolean'
      }, 1),
      zzz: getEncoding({
        type: 'boolean'
      }, 1),
      qqq: getEncoding({
        type: 'boolean'
      }, 1),
      ppp: getEncoding({
        type: 'boolean'
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([ 0b11001101, 0x00 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one required', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const bytesWritten: number = MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    requiredProperties: [ 'foo' ],
    booleanRequiredProperties: [],
    optionalProperties: [ 'baz' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Bit map
    0x01, 0x01,

    // 1
    0x01
  ]))

  test.is(bytesWritten, 7)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one missing optional', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const bytesWritten: number = MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar'
  }, {
    requiredProperties: [ 'foo' ],
    booleanRequiredProperties: [],
    optionalProperties: [ 'baz' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Bit map
    0x01, 0x00
  ]))

  test.is(bytesWritten, 6)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(11))
  const bytesWritten: number = REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    requiredProperties: [ 'foo' ],
    booleanRequiredProperties: [],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1)
    },
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Length
    0x01,

    // Key length + 'baz'
    0x04, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 11)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode typed {foo:"bar"}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const bytesWritten: number = REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar'
  }, {
    requiredProperties: [ 'foo' ],
    booleanRequiredProperties: [],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1)
    },
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Length
    0x00
  ]))

  test.is(bytesWritten, 5)
  test.end()
})

tap.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(13))
  const bytesWritten: number = OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    optionalProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1)
    },
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Bit map
    0x01, 0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Length
    0x01,

    // Key length + 'baz'
    0x04, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 13)
  test.end()
})

tap.test('MIXED_UNBOUNDED_TYPED_OBJECT: should encode mixed {foo:"bar",baz:1,qux:null}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(13))
  const bytesWritten: number = MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1,
    qux: null
  }, {
    requiredProperties: [ 'foo' ],
    booleanRequiredProperties: [],
    optionalProperties: [ 'baz' ],
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    },
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }, 1),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1)
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Bit map
    0x01, 0x01,

    // 1
    0x01,

    // Free form count
    0x01,

    // "qux"
    0x04, 0x71, 0x75, 0x78,

    // Null type tag
    0x07
  ]))

  test.is(bytesWritten, 13)
  test.end()
})

tap.test('PACKED_UNBOUNDED_OBJECT: should encode a complex object', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(20))
  const bytesWritten: number = PACKED_UNBOUNDED_OBJECT(buffer, 0, {
    foo: 1,
    bar: 2,
    baz: 0,
    qux: 2,
    extra: 1,
    name: 'john',
    flag: true,
    random: 1
  }, {
    packedRequiredProperties: [ 'bar', 'baz', 'extra', 'foo', 'qux' ],
    packedEncoding: {
      type: EncodingType.Integer,
      encoding: 'BOUNDED_8BITS__ENUM_FIXED',
      options: {
        minimum: 0,
        maximum: 2
      }
    },
    propertyEncodings: {
      name: getEncoding({
        type: 'string'
      }, 1),
      age: getEncoding({
        type: 'integer',
        minimum: 0
      }, 1),
      flag: getEncoding({
        type: 'boolean'
      }, 1)
    },
    optionalProperties: [ 'age' ],
    requiredProperties: [ 'name' ],
    booleanRequiredProperties: [ 'flag' ],
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1)
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x05, // Amount of packed integers
    0b10100001, // REVERSE(10 (bar) 00 (baz) 01 (extra) 01 (foo))
    0b00000001, // REVERSE(10 (qux) 000000)
    0x01, // true (flag)
    0x05, // string length (4)
    0x6a, 0x6f, 0x68, 0x6e, // 'john'
    0x01, // Optional bitset length = 1
    0x00, // Optional properties bitset = 0
    0x01, // Extra properties length = 1
    0x07, // string length (6)
    0x72, 0x61, 0x6e, 0x64, 0x6f, 0x6d, // 'random'
    0x01 // 1 (random)
  ]))

  test.is(bytesWritten, 20)
  test.end()
})

tap.test('PACKED_BOUNDED_REQUIRED_OBJECT: should encode a complex object', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const bytesWritten: number = PACKED_BOUNDED_REQUIRED_OBJECT(buffer, 0, {
    foo: 1,
    bar: 2,
    baz: 0,
    qux: 2,
    extra: 1,
    name: 'john',
    flag: true
  }, {
    packedRequiredProperties: [ 'bar', 'baz', 'extra', 'foo', 'qux' ],
    packedEncoding: {
      type: EncodingType.Integer,
      encoding: 'BOUNDED_8BITS__ENUM_FIXED',
      options: {
        minimum: 0,
        maximum: 2
      }
    },
    propertyEncodings: {
      name: getEncoding({
        type: 'string'
      }, 1),
      flag: getEncoding({
        type: 'boolean'
      }, 1)
    },
    requiredProperties: [ 'name' ],
    booleanRequiredProperties: [ 'flag' ]
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    0x05, // Amount of packed integers
    0b10100001, // REVERSE(10 (bar) 00 (baz) 01 (extra) 01 (foo))
    0b00000001, // REVERSE(10 (qux) 000000)
    0x01, // true (flag)
    0x05, // string length (4)
    0x6a, 0x6f, 0x68, 0x6e // 'john'
  ]))

  test.is(bytesWritten, 9)
  test.end()
})
