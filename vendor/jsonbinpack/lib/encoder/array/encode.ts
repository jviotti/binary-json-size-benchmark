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
  UINT8_MAX
} from '../../utils/limits'

import {
  encode
} from '../index'

import {
  Encoding
} from '../../mapper'

import {
  TypedBoundedOptions,
  TypedFloorOptions,
  TypedRoofOptions,
  SizeTypedOptions
} from './options'

import {
  FLOOR_ENUM_VARINT,
  BOUNDED_8BITS_ENUM_FIXED,
  ROOF_MIRROR_ENUM_VARINT
} from '../integer/encode'

import {
  EncodingContext
} from '../context'

const encodeArray = (
  buffer: ResizableBuffer, offset: number, value: JSONValue[],
  prefixEncodings: Encoding[], context: EncodingContext, defaultEncoding: Encoding
): number => {
  let cursor = offset
  for (const [ index, element ] of value.entries()) {
    const encoding: Encoding | undefined = prefixEncodings[index] ?? defaultEncoding
    const bytesWritten: number =
      encode(buffer, cursor, encoding, element, context)
    cursor += bytesWritten
  }

  return cursor - offset
}

export const FIXED_TYPED_ARRAY = (
  buffer: ResizableBuffer, offset: number, value: JSONValue[],
  options: SizeTypedOptions, context: EncodingContext
): number => {
  assert(options.size >= 0)
  return encodeArray(buffer, offset, value, options.prefixEncodings, context, options.encoding)
}

export const BOUNDED_TYPED_LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue[], options: TypedBoundedOptions, context: EncodingContext
): number => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(value.length >= options.minimum)
  assert(value.length <= options.maximum)

  const lengthBytes: number = options.maximum === options.minimum
    ? 0
    : FLOOR_ENUM_VARINT(buffer, offset, value.length, {
      minimum: options.minimum
    }, context)

  return lengthBytes + encodeArray(
    buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding)
}

export const BOUNDED_8BITS_TYPED_LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue[], options: TypedBoundedOptions, context: EncodingContext
): number => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(value.length >= options.minimum)
  assert(value.length <= options.maximum)
  assert(options.maximum - options.minimum <= UINT8_MAX)

  const lengthBytes: number = options.maximum === options.minimum
    ? 0
    : BOUNDED_8BITS_ENUM_FIXED(buffer, offset, value.length, {
      minimum: options.minimum,
      maximum: options.maximum
    }, context)

  return lengthBytes + encodeArray(
    buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding)
}

export const ROOF_TYPED_LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue[], options: TypedRoofOptions, context: EncodingContext
): number => {
  assert(options.maximum >= 0)
  assert(value.length <= options.maximum)

  const lengthBytes: number =
    ROOF_MIRROR_ENUM_VARINT(buffer, offset, value.length, {
      maximum: options.maximum
    }, context)

  return lengthBytes + encodeArray(
    buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding)
}

export const FLOOR_TYPED_LENGTH_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue[], options: TypedFloorOptions, context: EncodingContext
): number => {
  assert(options.minimum >= 0)
  assert(value.length >= options.minimum)

  const lengthBytes: number =
    FLOOR_ENUM_VARINT(buffer, offset, value.length, {
      minimum: options.minimum
    }, context)

  return lengthBytes + encodeArray(
    buffer, offset + lengthBytes, value, options.prefixEncodings, context, options.encoding)
}
