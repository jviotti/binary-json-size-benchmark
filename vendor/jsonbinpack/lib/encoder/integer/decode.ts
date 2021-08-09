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
  DecodeResult
} from '../base'

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
  zigzagDecode
} from './zigzag'

import {
  varintDecode,
  VarintDecodeResult
} from './varint'

export interface IntegerResult extends DecodeResult {
  readonly value: JSONNumber;
  readonly bytes: number;
}

export const BOUNDED_8BITS_ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, options: BoundedOptions
): IntegerResult => {
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)

  return {
    value: buffer.readUInt8(offset) + options.minimum,
    bytes: 1
  }
}

export const BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, options: BoundedMultiplierOptions
): IntegerResult => {
  assert(options.maximum >= options.minimum)
  assert(options.multiplier >= options.minimum)
  assert(options.multiplier <= options.maximum)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier

  return {
    value: (buffer.readUInt8(offset) * absoluteMultiplier) + closestMinimumMultiple,
    bytes: 1
  }
}

export const FLOOR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: FloorOptions
): IntegerResult => {
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  return {
    value: Number(result.value) + options.minimum,
    bytes: result.bytes
  }
}

export const FLOOR_MULTIPLE_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: FloorMultiplierOptions
): IntegerResult => {
  assert(options.multiplier >= options.minimum)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier

  const result: VarintDecodeResult = varintDecode(buffer, offset)
  return {
    value: (Number(result.value) * absoluteMultiplier) + closestMinimumMultiple,
    bytes: result.bytes
  }
}

export const ROOF_MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: RoofOptions
): IntegerResult => {
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  return {
    value: options.maximum - Number(result.value),
    bytes: result.bytes
  }
}

export const ROOF_MULTIPLE_MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: RoofMultiplierOptions
): IntegerResult => {
  assert(options.maximum >= options.multiplier)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMaximumMultiple: number =
    Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  return {
    value: -1 * ((Number(result.value) * absoluteMultiplier) - closestMaximumMultiple),
    bytes: result.bytes
  }
}

export const ARBITRARY_ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): IntegerResult => {
  const result: VarintDecodeResult = varintDecode(buffer, offset)
  return {
    value: Number(zigzagDecode(result.value)),
    bytes: result.bytes
  }
}

export const ARBITRARY_MULTIPLE_ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, options: MultiplierOptions
): IntegerResult => {
  const result: IntegerResult = ARBITRARY_ZIGZAG_VARINT(buffer, offset, {})
  return {
    value: result.value * Math.abs(options.multiplier),
    bytes: result.bytes
  }
}
