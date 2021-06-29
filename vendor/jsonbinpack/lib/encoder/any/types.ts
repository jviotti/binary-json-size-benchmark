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

import {
  UINT8_MIN,
  UINT8_MAX,
  UINT4_MIN,
  UINT4_MAX
} from '../../utils/limits'

// IMPORTANT! This enumeration is capped to have a maximum of 16 elements as
// we use the lowest-significant 4 bits to store the type, and the remaining
// 4 bits to store extra metadata about the type.

export enum Type {
  SharedString = 0b00000000,
  String = 0b00000001,
  Object = 0b00000010,
  Array = 0b00000011,
  Number = 0b00000100,
  True = 0b00000101,
  False = 0b00000110,
  Null = 0b00000111,
  PositiveInteger = 0b00001000,
  NegativeInteger = 0b00001001,
  PositiveIntegerByte = 0b00001010,
  NegativeIntegerByte = 0b00001011
}

export const isType = (type: Type, value: number): boolean => {
  assert(type >= UINT4_MIN && type <= UINT4_MAX)
  assert(value >= UINT8_MIN && value <= UINT8_MAX)
  return (value & 0b00001111) === type
}

export const getTypeTag = (type: Type, metadata: number): number => {
  assert(type >= UINT4_MIN && type <= UINT4_MAX)
  assert(metadata >= UINT4_MIN && metadata <= UINT4_MAX)
  return (metadata << 4) | type
}

export const getMetadata = (value: number): number => {
  assert(value >= UINT8_MIN && value <= UINT8_MAX)
  return value >>> 4
}
