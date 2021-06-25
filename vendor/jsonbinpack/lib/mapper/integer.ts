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
  range
} from 'lodash'

import {
  JSONValue
} from '../json'

import {
  BaseEncodingDefinition
} from './base-encoding-definition'

import {
  EncodingType
} from '../encoder'

import {
  UINT8_MAX
} from '../utils/limits'

import {
  NoOptions,
  FloorOptions,
  FloorMultiplierOptions,
  RoofOptions,
  RoofMultiplierOptions,
  MultiplierOptions,
  BoundedOptions,
  BoundedMultiplierOptions
} from '../encoder/integer/options'

import {
  IntegerEncodingSchema
} from '../schema'

export interface BOUNDED_8BITS__ENUM_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'BOUNDED_8BITS__ENUM_FIXED';
  readonly options: BoundedOptions;
}

export interface BOUNDED_MULTIPLE_8BITS__ENUM_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED';
  readonly options: BoundedMultiplierOptions;
}

export interface BOUNDED__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'BOUNDED__ENUM_VARINT';
  readonly options: BoundedOptions;
}

export interface BOUNDED_MULTIPLE__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'BOUNDED_MULTIPLE__ENUM_VARINT';
  readonly options: BoundedMultiplierOptions;
}

export interface FLOOR__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'FLOOR__ENUM_VARINT';
  readonly options: FloorOptions;
}

export interface FLOOR_MULTIPLE__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'FLOOR_MULTIPLE__ENUM_VARINT';
  readonly options: FloorMultiplierOptions;
}

export interface ROOF__MIRROR_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'ROOF__MIRROR_ENUM_VARINT';
  readonly options: RoofOptions;
}

export interface ROOF_MULTIPLE__MIRROR_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT';
  readonly options: RoofMultiplierOptions;
}

export interface ARBITRARY__ZIGZAG_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'ARBITRARY__ZIGZAG_VARINT';
  readonly options: NoOptions;
}

export interface ARBITRARY_MULTIPLE__ZIGZAG_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT';
  readonly options: MultiplierOptions;
}

export type IntegerEncodingNames =
  'BOUNDED_8BITS__ENUM_FIXED' |
  'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED' |
  'BOUNDED__ENUM_VARINT' |
  'BOUNDED_MULTIPLE__ENUM_VARINT' |
  'FLOOR__ENUM_VARINT' |
  'FLOOR_MULTIPLE__ENUM_VARINT' |
  'ROOF__MIRROR_ENUM_VARINT' |
  'ROOF_MULTIPLE__MIRROR_ENUM_VARINT' |
  'ARBITRARY__ZIGZAG_VARINT' |
  'ARBITRARY_MULTIPLE__ZIGZAG_VARINT'
export type IntegerEncoding =
  BOUNDED_8BITS__ENUM_FIXED_ENCODING |
  BOUNDED_MULTIPLE_8BITS__ENUM_FIXED_ENCODING |
  BOUNDED__ENUM_VARINT_ENCODING |
  BOUNDED_MULTIPLE__ENUM_VARINT_ENCODING |
  FLOOR__ENUM_VARINT_ENCODING |
  FLOOR_MULTIPLE__ENUM_VARINT_ENCODING |
  ROOF__MIRROR_ENUM_VARINT_ENCODING |
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT_ENCODING |
  ARBITRARY__ZIGZAG_VARINT_ENCODING |
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT_ENCODING

export const getIntegerStates = (schema: IntegerEncodingSchema): number | JSONValue[] => {
  if (typeof schema.maximum === 'number' &&
    typeof schema.minimum === 'number' &&
    typeof schema.multipleOf !== 'number') {
    // It is pointless to calculate the exact amount of states after a certain point
    if (schema.maximum - schema.minimum > UINT8_MAX) {
      return schema.maximum - schema.minimum + 1
    }

    return range(schema.minimum, schema.maximum + 1)
  }

  if (typeof schema.maximum === 'number' &&
    typeof schema.minimum === 'number' &&
    typeof schema.multipleOf === 'number') {

    // TODO: De-duplicate this logic on encoder/integer/encode
    const absoluteMultiplier: number = Math.abs(schema.multipleOf)
    const closestMinimumMultiple: number =
      Math.ceil(schema.minimum / absoluteMultiplier) * absoluteMultiplier
    const closestMaximumMultiple: number =
      Math.ceil(schema.maximum / -absoluteMultiplier) * -absoluteMultiplier
    const enumMinimum: number = closestMinimumMultiple / absoluteMultiplier
    const enumMaximum: number = closestMaximumMultiple / absoluteMultiplier

    // It is pointless to calculate the exact amount of states after a certain point
    if (enumMaximum - enumMinimum > UINT8_MAX) {
      return enumMaximum - enumMinimum + 1
    }

    return range(enumMinimum, enumMaximum + 1).map((value: number) => {
      return value * absoluteMultiplier
    })
  }

  return Infinity
}

export const getIntegerEncoding = (schema: IntegerEncodingSchema, _level: number): IntegerEncoding => {
  assert(typeof schema.minimum === 'undefined' ||
    typeof schema.maximum === 'undefined' ||
    schema.maximum >= schema.minimum)

  if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
    const absoluteMultiplier: number = Math.abs(schema.multipleOf)
    const closestMinimumMultiple: number =
      Math.ceil(schema.minimum / absoluteMultiplier) * absoluteMultiplier
    const closestMaximumMultiple: number =
      Math.ceil(schema.maximum / -absoluteMultiplier) * -absoluteMultiplier
    const enumMinimum: number = closestMinimumMultiple / absoluteMultiplier
    const enumMaximum: number = closestMaximumMultiple / absoluteMultiplier

    return {
      type: EncodingType.Integer,
      encoding: enumMaximum - enumMinimum <= UINT8_MAX
        ? 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED'
        : 'BOUNDED_MULTIPLE__ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        maximum: schema.maximum,
        multiplier: schema.multipleOf
      }
    }
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
    return {
      type: EncodingType.Integer,
      encoding: (schema.maximum - schema.minimum <= UINT8_MAX)
        ? 'BOUNDED_8BITS__ENUM_FIXED' : 'BOUNDED__ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        maximum: schema.maximum
      }
    }
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
    return {
      type: EncodingType.Integer,
      encoding: 'FLOOR_MULTIPLE__ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        multiplier: schema.multipleOf
      }
    }
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
    return {
      type: EncodingType.Integer,
      encoding: 'FLOOR__ENUM_VARINT',
      options: {
        minimum: schema.minimum
      }
    }
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
    return {
      type: EncodingType.Integer,
      encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT',
      options: {
        maximum: schema.maximum,
        multiplier: schema.multipleOf
      }
    }
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
    return {
      type: EncodingType.Integer,
      encoding: 'ROOF__MIRROR_ENUM_VARINT',
      options: {
        maximum: schema.maximum
      }
    }
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
    return {
      type: EncodingType.Integer,
      encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT',
      options: {
        multiplier: schema.multipleOf
      }
    }
  }
  return {
    type: EncodingType.Integer,
    encoding: 'ARBITRARY__ZIGZAG_VARINT',
    options: {}
  }
}
