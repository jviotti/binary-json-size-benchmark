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
  Encoding,
  getStates,
  getEncoding
} from './index'

import {
  TypedFloorOptions,
  TypedRoofOptions,
  TypedBoundedOptions,
  SizeTypedOptions
} from '../encoder/array/options'

import {
  UINT8_MAX
} from '../utils/limits'

import {
  generatePermutations
} from '../utils/permutation'

import {
  EnumEncodingNames,
  EnumEncoding,
  getEnumEncoding
} from './enum'

import {
  ArrayEncodingSchema,
  EncodingSchema
} from '../schema'

export interface FIXED_TYPED_ARRAY_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Array;
  readonly encoding: 'FIXED_TYPED_ARRAY';
  readonly options: SizeTypedOptions;
}

export interface BOUNDED_8BITS_TYPED_LENGTH_PREFIX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Array;
  readonly encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX';
  readonly options: TypedBoundedOptions;
}

export interface BOUNDED_TYPED_LENGTH_PREFIX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Array;
  readonly encoding: 'BOUNDED_TYPED_LENGTH_PREFIX';
  readonly options: TypedBoundedOptions;
}

export interface FLOOR_TYPED_LENGTH_PREFIX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Array;
  readonly encoding: 'FLOOR_TYPED_LENGTH_PREFIX';
  readonly options: TypedFloorOptions;
}

export interface ROOF_TYPED_LENGTH_PREFIX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Array;
  readonly encoding: 'ROOF_TYPED_LENGTH_PREFIX';
  readonly options: TypedRoofOptions;
}

export type ArrayEncodingNames =
  EnumEncodingNames |
  'FIXED_TYPED_ARRAY' |
  'BOUNDED_8BITS_TYPED_LENGTH_PREFIX' |
  'BOUNDED_TYPED_LENGTH_PREFIX' |
  'FLOOR_TYPED_LENGTH_PREFIX' |
  'ROOF_TYPED_LENGTH_PREFIX'

export type ArrayEncoding =
  EnumEncoding |
  FIXED_TYPED_ARRAY_ENCODING |
  BOUNDED_8BITS_TYPED_LENGTH_PREFIX_ENCODING |
  BOUNDED_TYPED_LENGTH_PREFIX_ENCODING |
  FLOOR_TYPED_LENGTH_PREFIX_ENCODING |
  ROOF_TYPED_LENGTH_PREFIX_ENCODING

export const getArrayStates = (schema: ArrayEncodingSchema): number | JSONValue[] => {
  if (typeof schema.maxItems === 'number' &&
    (typeof schema.items !== 'undefined' || typeof schema.prefixItems !== 'undefined')) {
    const choices: number | JSONValue[][] =
      range(0, schema.maxItems).reduce((accumulator: number | JSONValue[][], index: number) => {
        const states: number | JSONValue[] =
          getStates((schema.prefixItems ?? [])[index] ?? schema.items ?? {})

        if (Array.isArray(accumulator) && Array.isArray(states)) {
          accumulator.push(states)
        } else if (typeof accumulator !== 'number' && !Array.isArray(states)) {
          return states + accumulator.reduce((subaccumulator: number, choice: JSONValue[]) => {
            return subaccumulator + choice.length
          }, 0)
        } else if (!Array.isArray(accumulator)) {
          return accumulator + (Array.isArray(states) ? states.length : states)
        }

        return accumulator
      }, [])

    if (typeof choices === 'number') {
      return choices
    }

    return range(schema.minItems ?? 0, schema.maxItems + 1)
      .reduce((accumulator: JSONValue[][], maximum: number) => {
        return accumulator.concat(generatePermutations(...choices.slice(0, maximum)))
      }, [])
  }

  return Infinity
}

export const getArrayEncoding = (schema: ArrayEncodingSchema, level: number): ArrayEncoding => {
  const states: number | JSONValue[] = getArrayStates(schema)
  if (Array.isArray(states) && states.length < UINT8_MAX) {
    return getEnumEncoding({
      enum: states
    }, level)
  }

  const encodingSchema: EncodingSchema | undefined = schema.items
  const prefixEncodings: Encoding[] =
    (schema.prefixItems ?? []).map((subschema: EncodingSchema) => {
      return getEncoding(subschema, level + 1)
    })

  if (typeof encodingSchema === 'undefined') {
    if (typeof schema.minItems !== 'undefined' &&
      typeof schema.maxItems !== 'undefined') {
      if (schema.maxItems - schema.minItems <= UINT8_MAX) {
        return {
          type: EncodingType.Array,
          encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX',
          options: {
            minimum: schema.minItems,
            maximum: schema.maxItems,
            prefixEncodings,
            encoding: {
              type: EncodingType.Any,
              encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
              options: {}
            }
          }
        }
      }

      return {
        type: EncodingType.Array,
        encoding: 'BOUNDED_TYPED_LENGTH_PREFIX',
        options: {
          minimum: schema.minItems,
          maximum: schema.maxItems,
          prefixEncodings,
          encoding: {
            type: EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
          }
        }
      }
    } else if (typeof schema.minItems === 'undefined' &&
      typeof schema.maxItems !== 'undefined') {
      if (schema.maxItems <= UINT8_MAX) {
        return {
          type: EncodingType.Array,
          encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX',
          options: {
            minimum: 0,
            maximum: schema.maxItems,
            prefixEncodings,
            encoding: {
              type: EncodingType.Any,
              encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
              options: {}
            }
          }
        }
      }

      return {
        type: EncodingType.Array,
        encoding: 'ROOF_TYPED_LENGTH_PREFIX',
        options: {
          maximum: schema.maxItems,
          prefixEncodings,
          encoding: {
            type: EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
          }
        }
      }
    } else if (typeof schema.minItems !== 'undefined' &&
      typeof schema.maxItems === 'undefined') {
      return {
        type: EncodingType.Array,
        encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
        options: {
          minimum: schema.minItems,
          prefixEncodings,
          encoding: {
            type: EncodingType.Any,
            encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
            options: {}
          }
        }
      }
    }

    return {
      type: EncodingType.Array,
      encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
      options: {
        minimum: 0,
        prefixEncodings,
        encoding: {
          type: EncodingType.Any,
          encoding: 'ANY_PACKED_TYPE_TAG_BYTE_PREFIX',
          options: {}
        }
      }
    }
  }

  if (typeof schema.minItems !== 'undefined' &&
    typeof schema.maxItems !== 'undefined') {
    return {
      type: EncodingType.Array,
      encoding: (schema.maxItems - schema.minItems <= UINT8_MAX)
        ? 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX' : 'BOUNDED_TYPED_LENGTH_PREFIX',
      options: {
        minimum: schema.minItems,
        maximum: schema.maxItems,
        encoding: getEncoding(encodingSchema, level + 1),
        prefixEncodings
      }
    }
  } else if (typeof schema.minItems === 'undefined' &&
    typeof schema.maxItems !== 'undefined') {
    if (schema.maxItems <= UINT8_MAX) {
      return {
        type: EncodingType.Array,
        encoding: 'BOUNDED_8BITS_TYPED_LENGTH_PREFIX',
        options: {
          minimum: 0,
          maximum: schema.maxItems,
          encoding: getEncoding(encodingSchema, level + 1),
          prefixEncodings
        }
      }
    }

    return {
      type: EncodingType.Array,
      encoding: 'ROOF_TYPED_LENGTH_PREFIX',
      options: {
        maximum: schema.maxItems,
        encoding: getEncoding(encodingSchema, level + 1),
        prefixEncodings
      }
    }
  } else if (typeof schema.minItems !== 'undefined' &&
    typeof schema.maxItems === 'undefined') {
    return {
      type: EncodingType.Array,
      encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
      options: {
        minimum: schema.minItems,
        encoding: getEncoding(encodingSchema, level + 1),
        prefixEncodings
      }
    }
  }

  return {
    type: EncodingType.Array,
    encoding: 'FLOOR_TYPED_LENGTH_PREFIX',
    options: {
      minimum: 0,
      encoding: getEncoding(encodingSchema, level + 1),
      prefixEncodings
    }
  }
}
