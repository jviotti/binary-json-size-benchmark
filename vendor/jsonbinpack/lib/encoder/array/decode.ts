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
  IntegerResult,
  BOUNDED__ENUM_VARINT,
  BOUNDED_8BITS__ENUM_FIXED,
  FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT
} from '../integer/decode'

import {
  ANY__TYPE_PREFIX
} from '../any/decode'

import {
  decode
} from '../index'

import {
  Encoding
} from '../../mapper'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  TypedOptions,
  TypedRoofOptions,
  TypedFloorOptions,
  TypedBoundedOptions,
  SemiTypedOptions,
  SemiTypedRoofOptions,
  SemiTypedFloorOptions,
  SemiTypedBoundedOptions
} from './options'

import {
  DecodeResult
} from '../base'

export interface ArrayResult extends DecodeResult {
  readonly value: JSONValue[];
  readonly bytes: number;
}

const decodeArray = (
  buffer: ResizableBuffer, offset: number, bytesWritten: number, length: number,
  prefixEncodings: Encoding[], defaultEncoding?: Encoding
): ArrayResult => {
  let index = 0
  let cursor = offset + bytesWritten
  const result = []

  while (index < length) {
    const encoding: Encoding | undefined =
      prefixEncodings[index] ?? defaultEncoding
    const elementResult: DecodeResult = typeof encoding === 'undefined'
      ? ANY__TYPE_PREFIX(buffer, cursor, {})
      : decode(buffer, cursor, encoding)
    cursor += elementResult.bytes
    result.push(elementResult.value)
    index += 1
  }

  return {
    value: result,
    bytes: cursor - (offset + bytesWritten) + bytesWritten
  }
}

export const BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: SemiTypedBoundedOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)

  const lengthResult: IntegerResult =
    options.maximum === options.minimum
      ? {
        bytes: 0,
        value: options.maximum
      }
      : BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: options.minimum,
        maximum: options.maximum
      })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings)
}

export const BOUNDED_SEMITYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: SemiTypedBoundedOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)

  const lengthResult: IntegerResult =
    options.maximum === options.minimum
      ? {
        bytes: 0,
        value: options.maximum
      }
      : BOUNDED__ENUM_VARINT(buffer, offset, {
        minimum: options.minimum,
        maximum: options.maximum
      })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings)
}

export const FLOOR_SEMITYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: SemiTypedFloorOptions
): ArrayResult => {
  assert(options.minimum >= 0)

  const lengthResult: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, {
    minimum: options.minimum
  })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings)
}

export const ROOF_SEMITYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: SemiTypedRoofOptions
): ArrayResult => {
  assert(options.maximum >= 0)

  const lengthResult: IntegerResult = ROOF__MIRROR_ENUM_VARINT(buffer, offset, {
    maximum: options.maximum
  })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings)
}

export const ROOF_8BITS_SEMITYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: SemiTypedRoofOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.maximum <= UINT8_MAX)

  return BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, offset, {
    minimum: 0,
    maximum: options.maximum,
    prefixEncodings: options.prefixEncodings
  })
}

export const UNBOUNDED_SEMITYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: SemiTypedOptions
): ArrayResult => {
  return FLOOR_SEMITYPED__LENGTH_PREFIX(buffer, offset, {
    minimum: 0,
    prefixEncodings: options.prefixEncodings
  })
}

export const BOUNDED_TYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedBoundedOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)

  const lengthResult: IntegerResult = options.maximum === options.minimum
    ? {
      bytes: 0,
      value: options.maximum
    }
    : BOUNDED__ENUM_VARINT(buffer, offset, {
      minimum: options.minimum,
      maximum: options.maximum
    })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const BOUNDED_8BITS_TYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedBoundedOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)

  const lengthResult: IntegerResult = options.maximum === options.minimum
    ? {
      bytes: 0,
      value: options.maximum
    }
    : BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
      minimum: options.minimum,
      maximum: options.maximum
    })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const ROOF_TYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedRoofOptions
): ArrayResult => {
  assert(options.maximum >= 0)

  const lengthResult: IntegerResult = ROOF__MIRROR_ENUM_VARINT(buffer, offset, {
    maximum: options.maximum
  })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const ROOF_8BITS_TYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedRoofOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.maximum <= UINT8_MAX)

  return BOUNDED_8BITS_TYPED__LENGTH_PREFIX(buffer, offset, {
    minimum: 0,
    maximum: options.maximum,
    prefixEncodings: options.prefixEncodings,
    encoding: options.encoding
  })
}

export const FLOOR_TYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedFloorOptions
): ArrayResult => {
  assert(options.minimum >= 0)

  const lengthResult: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, {
    minimum: options.minimum
  })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const UNBOUNDED_TYPED__LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedOptions
): ArrayResult => {
  return FLOOR_TYPED__LENGTH_PREFIX(buffer, offset, {
    minimum: 0,
    prefixEncodings: options.prefixEncodings,
    encoding: options.encoding
  })
}
