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
  JSONObject
} from '../../lib/json'

import {
  getEncoding
} from '../../lib/mapper'

import {
  TypedKeysOptions,
  RequiredUnboundedTypedOptions,
  OptionalUnboundedTypedOptions,
  BoundedTypedOptions,
  UnboundedTypedOptions,
  RequiredBoundedTypedOptions,
  OptionalBoundedTypedOptions,
  PackedUnboundedOptions,
  PackedRequiredBoundedOptions
} from '../../lib/encoder/object/options'

import {
  ARBITRARY_TYPED_KEYS_OBJECT as ENCODE_ARBITRARY_TYPED_KEYS_OBJECT,
  NON_REQUIRED_BOUNDED_TYPED_OBJECT as ENCODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT,
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT as ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT,
  MIXED_BOUNDED_TYPED_OBJECT as ENCODE_MIXED_BOUNDED_TYPED_OBJECT,
  REQUIRED_UNBOUNDED_TYPED_OBJECT as ENCODE_REQUIRED_UNBOUNDED_TYPED_OBJECT,
  OPTIONAL_UNBOUNDED_TYPED_OBJECT as ENCODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT,
  MIXED_UNBOUNDED_TYPED_OBJECT as ENCODE_MIXED_UNBOUNDED_TYPED_OBJECT,
  PACKED_UNBOUNDED_OBJECT as ENCODE_PACKED_UNBOUNDED_OBJECT,
  PACKED_BOUNDED_REQUIRED_OBJECT as ENCODE_PACKED_BOUNDED_REQUIRED_OBJECT
} from '../../lib/encoder/object/encode'

import {
  ObjectResult,
  ARBITRARY_TYPED_KEYS_OBJECT as DECODE_ARBITRARY_TYPED_KEYS_OBJECT,
  NON_REQUIRED_BOUNDED_TYPED_OBJECT as DECODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT,
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT as DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT,
  MIXED_BOUNDED_TYPED_OBJECT as DECODE_MIXED_BOUNDED_TYPED_OBJECT,
  REQUIRED_UNBOUNDED_TYPED_OBJECT as DECODE_REQUIRED_UNBOUNDED_TYPED_OBJECT,
  OPTIONAL_UNBOUNDED_TYPED_OBJECT as DECODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT,
  MIXED_UNBOUNDED_TYPED_OBJECT as DECODE_MIXED_UNBOUNDED_TYPED_OBJECT,
  PACKED_UNBOUNDED_OBJECT as DECODE_PACKED_UNBOUNDED_OBJECT,
  PACKED_BOUNDED_REQUIRED_OBJECT as DECODE_PACKED_BOUNDED_REQUIRED_OBJECT
} from '../../lib/encoder/object/decode'

import {
  StringEncoding,
  getStringEncoding
} from '../../lib/mapper/string'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext,
  EncodingType
} from '../../lib/encoder'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: scalars values', (test) => {
  const options: TypedKeysOptions = {
    keyEncoding: getStringEncoding({
      type: 'string'
    }, 1),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }

  fc.assert(fc.property(fc.nat(10), fc.dictionary(fc.string(), fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({
      maxLength: 10
    })
  )), (offset: number, value: JSONObject): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
      buffer, offset, value, options, context)
    const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
      buffer, offset, options)
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: untyped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(16))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const keyEncoding: StringEncoding = getStringEncoding({
    type: 'string'
  }, 1)

  const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, value, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }, context)

  const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    })

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(16))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const keyEncoding: StringEncoding = getStringEncoding({
    type: 'string',
    minLength: 3
  }, 1)

  const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, value, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    }, context)

  const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    })

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: OptionalBoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: RequiredBoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1} with one required', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: BoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options, context)
  const result: ObjectResult = DECODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: {foo:"bar",baz:1} with one missing optional', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const value: JSONObject = {
    foo: 'bar'
  }

  const options: BoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options, context)
  const result: ObjectResult = DECODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: semityped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(11))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: RequiredUnboundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options, context)
  const result: ObjectResult = DECODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: typed {foo:"bar"}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const value: JSONObject = {
    foo: 'bar'
  }

  const options: RequiredUnboundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options, context)
  const result: ObjectResult = DECODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: semityped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(13))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: OptionalUnboundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)
  const result: ObjectResult = DECODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('MIXED_UNBOUNDED_TYPED_OBJECT: mixed {foo:"bar",baz:1,qux:null}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(13))
  const value: JSONObject = {
    foo: 'bar',
    baz: 1,
    qux: null
  }

  const options: UnboundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_MIXED_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)
  const result: ObjectResult = DECODE_MIXED_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1,baz:true,qux:false}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const value: JSONObject = {
    foo: 'bar',
    bar: 1,
    baz: true,
    qux: false
  }

  const options: RequiredBoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: three boolean properties', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const value: JSONObject = {
    foo: true,
    bar: false,
    baz: true
  }

  const options: RequiredBoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: eight boolean properties', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
  const value: JSONObject = {
    foo: true,
    bar: false,
    baz: true,
    qux: true,
    xxx: false,
    yyy: false,
    zzz: true,
    qqq: true
  }

  const options: RequiredBoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: nine boolean properties', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const value: JSONObject = {
    foo: true,
    bar: false,
    baz: true,
    qux: true,
    xxx: false,
    yyy: false,
    zzz: true,
    qqq: true,
    ppp: false
  }

  const options: RequiredBoundedTypedOptions = {
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
  }

  const bytesWritten: number = ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('PACKED_UNBOUNDED_OBJECT: complex object', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(20))
  const value: JSONObject = {
    foo: 1,
    bar: 2,
    baz: 0,
    qux: 2,
    extra: 1,
    name: 'john',
    flag: true,
    random: 1
  }

  const options: PackedUnboundedOptions = {
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
  }

  const bytesWritten: number = ENCODE_PACKED_UNBOUNDED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_PACKED_UNBOUNDED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('PACKED_BOUNDED_REQUIRED_OBJECT: complex object', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const value: JSONObject = {
    foo: 1,
    bar: 2,
    baz: 0,
    qux: 2,
    extra: 1,
    name: 'john',
    flag: true
  }

  const options: PackedRequiredBoundedOptions = {
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
  }

  const bytesWritten: number = ENCODE_PACKED_BOUNDED_REQUIRED_OBJECT(
    buffer, 0, value, options, context)

  const result: ObjectResult = DECODE_PACKED_BOUNDED_REQUIRED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})
