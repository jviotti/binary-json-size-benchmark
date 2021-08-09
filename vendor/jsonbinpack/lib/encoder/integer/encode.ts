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
  JSONNumber
} from '../../json'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  NoOptions,
  FloorOptions,
  FloorMultiplierOptions,
  RoofOptions,
  RoofMultiplierOptions,
  MultiplierOptions,
  BoundedOptions,
  BoundedMultiplierOptions
} from './options'

import {
  EncodingContext
} from '../context'

import {
  zigzagEncode
} from './zigzag'

import {
  varintEncode
} from './varint'

// Applicable if the difference between maximum and
// minimum fits in an unsigned 8-bit integer
export const BOUNDED_8BITS_ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedOptions, _context: EncodingContext
): number => {
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)
  assert(value >= options.minimum)
  assert(value <= options.maximum)

  return buffer.writeUInt8(value - options.minimum, offset) - offset
}

export const BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedMultiplierOptions, context: EncodingContext
): number => {
  assert(options.maximum >= options.minimum)
  assert(value >= options.minimum)
  assert(value <= options.maximum)
  assert(options.multiplier >= options.minimum)
  assert(options.multiplier <= options.maximum)
  assert(value % options.multiplier === 0)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const enumMinimum: number = Math.ceil(options.minimum / absoluteMultiplier)
  const enumMaximum: number = Math.floor(options.maximum / absoluteMultiplier)
  assert(enumMaximum - enumMinimum <= UINT8_MAX)

  return BOUNDED_8BITS_ENUM_FIXED(buffer, offset,
    value / absoluteMultiplier, {
      minimum: enumMinimum,
      maximum: enumMaximum
    }, context)
}

export const FLOOR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: FloorOptions, _context: EncodingContext
): number => {
  assert(value >= options.minimum)
  return varintEncode(buffer, offset, BigInt(value - options.minimum))
}

export const FLOOR_MULTIPLE_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: FloorMultiplierOptions, context: EncodingContext
): number => {
  assert(value >= options.minimum)
  assert(value % options.multiplier === 0)
  assert(options.multiplier >= options.minimum)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  return FLOOR_ENUM_VARINT(buffer, offset, value / absoluteMultiplier, {
    minimum: Math.ceil(options.minimum / absoluteMultiplier)
  }, context)
}

export const ROOF_MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: RoofOptions, _context: EncodingContext
): number => {
  assert(value <= options.maximum)
  return varintEncode(buffer, offset, BigInt(options.maximum - value))
}

export const ROOF_MULTIPLE_MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: RoofMultiplierOptions, context: EncodingContext
): number => {
  assert(value <= options.maximum)
  assert(value % options.multiplier === 0)
  assert(options.maximum >= options.multiplier)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  return ROOF_MIRROR_ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier, {
      maximum: Math.floor(options.maximum / absoluteMultiplier)
    }, context)
}

export const ARBITRARY_ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber, _options: NoOptions, _context: EncodingContext
): number => {
  return varintEncode(buffer, offset, zigzagEncode(BigInt(value)))
}

export const ARBITRARY_MULTIPLE_ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: MultiplierOptions, context: EncodingContext
): number => {
  assert(value % options.multiplier === 0)
  return ARBITRARY_ZIGZAG_VARINT(
    buffer, offset, value / Math.abs(options.multiplier), {}, context)
}
