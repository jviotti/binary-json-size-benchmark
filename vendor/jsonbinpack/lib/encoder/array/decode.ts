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
  BOUNDED_8BITS_ENUM_FIXED,
  FLOOR_ENUM_VARINT,
  ROOF_MIRROR_ENUM_VARINT
} from '../integer/decode'

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
  TypedRoofOptions,
  TypedFloorOptions,
  TypedBoundedOptions,
  SizeTypedOptions
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
  prefixEncodings: Encoding[], defaultEncoding: Encoding
): ArrayResult => {
  let index = 0
  let cursor = offset + bytesWritten
  const result = []

  while (index < length) {
    const encoding: Encoding | undefined =
      prefixEncodings[index] ?? defaultEncoding
    const elementResult: DecodeResult = decode(buffer, cursor, encoding)
    cursor += elementResult.bytes
    result.push(elementResult.value)
    index += 1
  }

  return {
    value: result,
    bytes: cursor - (offset + bytesWritten) + bytesWritten
  }
}

export const FIXED_TYPED_ARRAY = (
  buffer: ResizableBuffer, offset: number, options: SizeTypedOptions
): ArrayResult => {
  assert(options.size >= 0)
  return decodeArray(
    buffer, offset, 0, options.size, options.prefixEncodings, options.encoding)
}

export const BOUNDED_TYPED_LENGTH_PREFIX = (
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
    : FLOOR_ENUM_VARINT(buffer, offset, {
      minimum: options.minimum
    })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const BOUNDED_8BITS_TYPED_LENGTH_PREFIX = (
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
    : BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
      minimum: options.minimum,
      maximum: options.maximum
    })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const ROOF_TYPED_LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedRoofOptions
): ArrayResult => {
  assert(options.maximum >= 0)

  const lengthResult: IntegerResult = ROOF_MIRROR_ENUM_VARINT(buffer, offset, {
    maximum: options.maximum
  })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}

export const FLOOR_TYPED_LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, options: TypedFloorOptions
): ArrayResult => {
  assert(options.minimum >= 0)

  const lengthResult: IntegerResult = FLOOR_ENUM_VARINT(buffer, offset, {
    minimum: options.minimum
  })

  return decodeArray(
    buffer, offset, lengthResult.bytes, lengthResult.value,
    options.prefixEncodings, options.encoding)
}
