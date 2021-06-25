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

import {
  strict as assert
} from 'assert'

import ResizableBuffer from '../resizable-buffer'

import {
  JSONValue
} from '../../json'

import {
  UINT8_MIN,
  UINT8_MAX
} from '../../utils/limits'

import {
  NoOptions
} from './options'

import {
  Type
} from './types'

import {
  EncodingType
} from '../encoding-type'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  ARBITRARY__PREFIX_LENGTH_VARINT
} from '../string/encode'

import {
  DOUBLE_VARINT_TUPLE
} from '../number/encode'

import {
  ARBITRARY_TYPED_KEYS_OBJECT
} from '../object/encode'

import {
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX
} from '../array/encode'

import {
  EncodingContext
} from '../context'

const encodeTypeTag = (buffer: ResizableBuffer, offset: number, tag: number, context: EncodingContext): number => {
  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
    minimum: UINT8_MIN,

    // TODO: Find a way to keep this automatically in sync with "Type"
    maximum: 11
  }, context)
}

export const ANY__TYPE_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue, _options: NoOptions, context: EncodingContext
): number => {
  // Encode an object value
  if (Array.isArray(value)) {
    const tagBytes: number = encodeTypeTag(buffer, offset, Type.Array, context)
    const valueBytes: number = UNBOUNDED_SEMITYPED__LENGTH_PREFIX(
      buffer, offset + tagBytes, value, {
        prefixEncodings: []
      }, context)

    return tagBytes + valueBytes

  // Encode an array value
  } else if (typeof value === 'object' && value !== null) {
    const tagBytes: number = encodeTypeTag(buffer, offset, Type.Object, context)
    const valueBytes: number = ARBITRARY_TYPED_KEYS_OBJECT(
      buffer, offset + tagBytes, value, {
        keyEncoding: {
          type: EncodingType.String,
          encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
          options: {}
        },
        encoding: {
          type: EncodingType.Any,
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      }, context)

    return tagBytes + valueBytes

  // Encode a null value (at the type level)
  } else if (value === null) {
    return encodeTypeTag(buffer, offset, Type.Null, context)

  // Encode a boolean value (at the type level)
  } else if (typeof value === 'boolean') {
    return encodeTypeTag(buffer, offset, value ? Type.True : Type.False, context)

  // Encode a string value
  } else if (typeof value === 'string') {
    // Exploit the fact that a shared string always starts with an impossible length
    // marker (0) to avoid having to encode an additional tag
    const tagBytes: number = context.strings.has(value)
      ? 0
      : encodeTypeTag(buffer, offset, Type.String, context)
    const valueBytes: number =
      ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tagBytes, value, {}, context)
    return tagBytes + valueBytes

  // Encode an integer value
  } else if (Number.isInteger(value)) {
    const isPositive: boolean = value >= 0
    const absoluteValue: number = isPositive ? value : Math.abs(value) - 1

    if (absoluteValue <= UINT8_MAX) {
      const type: Type = isPositive
        ? Type.PositiveIntegerByte : Type.NegativeIntegerByte
      const tagBytes: number = encodeTypeTag(buffer, offset, type, context)
      const valueBytes: number =
        BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes, absoluteValue, {
          minimum: UINT8_MIN,
          maximum: UINT8_MAX
        }, context)
      return tagBytes + valueBytes
    }

    const type: Type = isPositive
      ? Type.PositiveInteger : Type.NegativeInteger

    // This assertion means that we have an integer that cannot
    // be correctly represented in JavaScript. We will leave this
    // problem aside until we switch over to C++
    assert(type === Type.PositiveInteger || -(absoluteValue + 1) === value)

    const tagBytes: number = encodeTypeTag(buffer, offset, type, context)
    const valueBytes: number =
      FLOOR__ENUM_VARINT(buffer, offset + tagBytes, absoluteValue, {
        minimum: 0
      }, context)
    return tagBytes + valueBytes

  // Encode an number value
  }
  const tagBytes: number = encodeTypeTag(buffer, offset, Type.Number, context)
  const valueBytes: number =
      DOUBLE_VARINT_TUPLE(buffer, offset + tagBytes, value, {}, context)
  return tagBytes + valueBytes
}
