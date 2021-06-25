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
  range
} from 'lodash'

import {
  EncodingSchema
} from '../../lib/schema'

import {
  Encoding,
  getStates,
  getEncoding
} from '../../lib/mapper'

tap.test('should encode an 8-bit integer with minimum, maximum, and multiplier', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: -100,
    maximum: 100,
    multipleOf: 5
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), range(-100, 105, 5))
  test.strictSame(result, {
    type: 'integer',
    encoding: 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED',
    options: {
      minimum: -100,
      maximum: 100,
      multiplier: 5
    }
  })

  test.end()
})

tap.test('should encode an integer with minimum, maximum, and multiplier', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: -100,
    maximum: 10000,
    multipleOf: 5
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), 2021)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'BOUNDED_MULTIPLE__ENUM_VARINT',
    options: {
      minimum: -100,
      maximum: 10000,
      multiplier: 5
    }
  })

  test.end()
})

tap.test('should encode an arbitrary integer', (test) => {
  const schema: EncodingSchema = {
    type: 'integer'
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'ARBITRARY__ZIGZAG_VARINT',
    options: {}
  })

  test.end()
})

tap.test('should encode an arbitrary integer with multipleOf', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    multipleOf: 5
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT',
    options: {
      multiplier: 5
    }
  })

  test.end()
})

tap.test('should encode an integer with minimum', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: 0
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'FLOOR__ENUM_VARINT',
    options: {
      minimum: 0
    }
  })

  test.end()
})

tap.test('should encode an integer with minimum and multipleOf', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: 0,
    multipleOf: 5
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'FLOOR_MULTIPLE__ENUM_VARINT',
    options: {
      minimum: 0,
      multiplier: 5
    }
  })

  test.end()
})

tap.test('should encode an integer with maximum', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    maximum: 100
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'ROOF__MIRROR_ENUM_VARINT',
    options: {
      maximum: 100
    }
  })

  test.end()
})

tap.test('should encode an integer with maximum and multipleOf', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    maximum: 100,
    multipleOf: 5
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT',
    options: {
      maximum: 100,
      multiplier: 5
    }
  })

  test.end()
})

tap.test('should encode an 8-bit integer with minimum and maximum', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: -100,
    maximum: 100
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), range(-100, 101))
  test.strictSame(result, {
    type: 'integer',
    encoding: 'BOUNDED_8BITS__ENUM_FIXED',
    options: {
      minimum: -100,
      maximum: 100
    }
  })

  test.end()
})

tap.test('should encode an >8-bit integer with minimum and maximum', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: -100,
    maximum: 100000
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), 100101)
  test.strictSame(result, {
    type: 'integer',
    encoding: 'BOUNDED__ENUM_VARINT',
    options: {
      minimum: -100,
      maximum: 100000
    }
  })

  test.end()
})
