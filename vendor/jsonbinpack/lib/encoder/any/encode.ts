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
  UINT8_MAX,
  UINT5_MAX
} from '../../utils/limits'

import {
  NoOptions
} from './options'

import {
  Type,
  Subtype,
  getTypeTag
} from './types'

import {
  EncodingType
} from '../encoding-type'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  UTF8_STRING_NO_LENGTH,
  SHARED_STRING_POINTER_RELATIVE_OFFSET,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT
} from '../string/encode'

import {
  DOUBLE_VARINT_TUPLE
} from '../number/encode'

import {
  ARBITRARY_TYPED_KEYS_OBJECT,
  ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH
} from '../object/encode'

import {
  FLOOR_SEMITYPED__LENGTH_PREFIX,
  FLOOR_SEMITYPED__NO_LENGTH_PREFIX
} from '../array/encode'

import {
  EncodingContext
} from '../context'

const STRING_ENCODING: BufferEncoding = 'utf8'

const encodeTypeTag = (buffer: ResizableBuffer, offset: number, tag: number, context: EncodingContext): number => {
  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
    minimum: UINT8_MIN,
    maximum: UINT8_MAX
  }, context)
}

export const ANY__TYPE_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue, _options: NoOptions, context: EncodingContext
): number => {
  // Encode an array value
  if (Array.isArray(value)) {
    const size: number = value.length

    if (size > UINT5_MAX - 1) {
      const typeTag: number = getTypeTag(Type.Array, 0)
      const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
      const valueBytes: number = FLOOR_SEMITYPED__LENGTH_PREFIX(
        buffer, offset + tagBytes, value, {
          minimum: 0,
          prefixEncodings: []
        }, context)

      return tagBytes + valueBytes
    }

    const typeTag: number = getTypeTag(Type.Array, value.length + 1)
    const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
    const valueBytes: number = FLOOR_SEMITYPED__NO_LENGTH_PREFIX(
      buffer, offset + tagBytes, value, {
        size,
        minimum: 0,
        prefixEncodings: []
      }, context)

    return tagBytes + valueBytes

  // Encode an object value
  } else if (typeof value === 'object' && value !== null) {
    const size: number = Object.keys(value).length

    if (size > UINT5_MAX - 1) {
      const typeTag: number = getTypeTag(Type.Object, 0)
      const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
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
    }

    const typeTag: number = getTypeTag(Type.Object, size + 1)
    const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
    const valueBytes: number = ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH(
      buffer, offset + tagBytes, value, {
        size,
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
    const typeTag: number = getTypeTag(Type.Other, Subtype.Null)
    return encodeTypeTag(buffer, offset, typeTag, context)

  // Encode a boolean value (at the type level)
  } else if (typeof value === 'boolean') {
    const typeTag: number = value
      ? getTypeTag(Type.Other, Subtype.True)
      : getTypeTag(Type.Other, Subtype.False)
    return encodeTypeTag(buffer, offset, typeTag, context)

  // Encode a string value
  } else if (typeof value === 'string') {
    const length: number = Buffer.byteLength(value, STRING_ENCODING)

    if (length > UINT5_MAX - 1) {
      const typeTag: number = getTypeTag(Type.String, 0)

      // Exploit the fact that a shared string always starts with an impossible length
      // marker (0) to avoid having to encode an additional tag
      const tagBytes: number = context.strings.has(value)
        ? 0
        : encodeTypeTag(buffer, offset, typeTag, context)
      const valueBytes: number =
        FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset + tagBytes, value, {
          minimum: 0
        }, context)
      return tagBytes + valueBytes
    } else if (context.strings.has(value)) {
      const typeTag: number = getTypeTag(Type.SharedString, length + 1)
      const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
      return tagBytes + SHARED_STRING_POINTER_RELATIVE_OFFSET(buffer, offset + tagBytes, value, {
        size: length
      }, context)
    } else {
      const typeTag: number = getTypeTag(Type.String, length + 1)
      const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
      return tagBytes + UTF8_STRING_NO_LENGTH(buffer, offset + tagBytes, value, {
        size: length
      }, context)
    }

  // Encode an integer value
  } else if (Number.isInteger(value)) {
    const isPositive: boolean = value >= 0
    const absoluteValue: number = isPositive ? value : Math.abs(value) - 1

    if (absoluteValue <= UINT8_MAX) {
      const type: Type = isPositive
        ? Type.PositiveIntegerByte : Type.NegativeIntegerByte

      if (absoluteValue <= UINT5_MAX - 1) {
        const typeTag: number = getTypeTag(type, absoluteValue + 1)
        return encodeTypeTag(buffer, offset, typeTag, context)
      }

      const typeTag: number = getTypeTag(type, 0)
      const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
      const valueBytes: number =
        BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes, absoluteValue, {
          minimum: UINT8_MIN,
          maximum: UINT8_MAX
        }, context)
      return tagBytes + valueBytes
    }

    const type: Type = Type.Other
    const subtype: Subtype = isPositive
      ? Subtype.PositiveInteger : Subtype.NegativeInteger

    // This assertion means that we have an integer that cannot
    // be correctly represented in JavaScript. We will leave this
    // problem aside until we switch over to C++
    assert(subtype === Subtype.PositiveInteger || -(absoluteValue + 1) === value)

    const typeTag: number = getTypeTag(type, subtype)
    const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
    const valueBytes: number =
      FLOOR__ENUM_VARINT(buffer, offset + tagBytes, absoluteValue, {
        minimum: 0
      }, context)
    return tagBytes + valueBytes
  }

  // Encode an number value
  const typeTag: number = getTypeTag(Type.Other, Subtype.Number)
  const tagBytes: number = encodeTypeTag(buffer, offset, typeTag, context)
  const valueBytes: number =
      DOUBLE_VARINT_TUPLE(buffer, offset + tagBytes, value, {}, context)
  return tagBytes + valueBytes
}
