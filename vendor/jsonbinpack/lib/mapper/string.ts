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
  StringEncodingSchema
} from '../schema'

import {
  ENGLISH_DICTIONARY
} from '../encoder/string/dictionaries'

import {
  NoOptions,
  BoundedOptions,
  RoofOptions,
  FloorOptions,
  DictionaryOptions,
  SizeOptions
} from '../encoder/string/options'

export interface STRING_BROTLI_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'STRING_BROTLI';
  readonly options: NoOptions;
}

export interface STRING_DICTIONARY_COMPRESSOR_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'STRING_DICTIONARY_COMPRESSOR';
  readonly options: DictionaryOptions;
}

export interface URL_PROTOCOL_HOST_REST_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'URL_PROTOCOL_HOST_REST';
  readonly options: NoOptions;
}

export interface RFC3339_DATE_INTEGER_TRIPLET_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'RFC3339_DATE_INTEGER_TRIPLET';
  readonly options: NoOptions;
}

export interface BOUNDED_PREFIX_LENGTH_8BIT_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'BOUNDED_PREFIX_LENGTH_8BIT_FIXED';
  readonly options: BoundedOptions;
}

export interface ROOF_PREFIX_LENGTH_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'ROOF_PREFIX_LENGTH_ENUM_VARINT';
  readonly options: RoofOptions;
}

export interface FLOOR_PREFIX_LENGTH_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'FLOOR_PREFIX_LENGTH_ENUM_VARINT';
  readonly options: FloorOptions;
}

export interface UTF8_STRING_NO_LENGTH_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'UTF8_STRING_NO_LENGTH';
  readonly options: SizeOptions;
}

export interface SHARED_STRING_POINTER_RELATIVE_OFFSET_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'SHARED_STRING_POINTER_RELATIVE_OFFSET';
  readonly options: SizeOptions;
}

export interface STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH';
  readonly options: NoOptions;
}

export type StringEncodingNames =
  'STRING_BROTLI' |
  'STRING_DICTIONARY_COMPRESSOR' |
  'URL_PROTOCOL_HOST_REST' |
  'RFC3339_DATE_INTEGER_TRIPLET' |
  'BOUNDED_PREFIX_LENGTH_8BIT_FIXED' |
  'ROOF_PREFIX_LENGTH_ENUM_VARINT' |
  'FLOOR_PREFIX_LENGTH_ENUM_VARINT' |
  'UTF8_STRING_NO_LENGTH' |
  'SHARED_STRING_POINTER_RELATIVE_OFFSET' |
  'STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH'
export type StringEncoding =
  STRING_BROTLI_ENCODING |
  STRING_DICTIONARY_COMPRESSOR_ENCODING |
  URL_PROTOCOL_HOST_REST_ENCODING |
  RFC3339_DATE_INTEGER_TRIPLET_ENCODING |
  BOUNDED_PREFIX_LENGTH_8BIT_FIXED_ENCODING |
  ROOF_PREFIX_LENGTH_ENUM_VARINT_ENCODING |
  FLOOR_PREFIX_LENGTH_ENUM_VARINT_ENCODING |
  UTF8_STRING_NO_LENGTH_ENCODING |
  SHARED_STRING_POINTER_RELATIVE_OFFSET_ENCODING |
  STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH_ENCODING

export const getStringStates = (_schema: StringEncodingSchema): number | JSONValue[] => {
  return Infinity
}

export const getStringEncoding = (schema: StringEncodingSchema, _level: number): StringEncoding => {
  if (schema.format === 'date') {
    return {
      type: EncodingType.String,
      encoding: 'RFC3339_DATE_INTEGER_TRIPLET',
      options: {}
    }
  } else if (schema.format === 'uri') {
    return {
      type: EncodingType.String,
      encoding: 'URL_PROTOCOL_HOST_REST',
      options: {}
    }
  }

  // Markdown content tends to be significantly large to justify
  // the use of a proper general lossless compressor
  if (schema.contentMediaType === 'text/markdown') {
    return {
      type: EncodingType.String,
      encoding: 'STRING_BROTLI',
      options: {}
    }
  }

  assert(typeof schema.minLength === 'undefined' || schema.minLength >= 0)
  assert(typeof schema.maxLength === 'undefined' || schema.maxLength >= 0)
  assert(typeof schema.minLength === 'undefined' ||
    typeof schema.maxLength === 'undefined' ||
    schema.maxLength >= schema.minLength)

  if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
    if (schema.maxLength - schema.minLength <= UINT8_MAX - 1) {
      return {
        type: EncodingType.String,
        encoding: 'BOUNDED_PREFIX_LENGTH_8BIT_FIXED',
        options: {
          minimum: schema.minLength,
          maximum: schema.maxLength
        }
      }
    }

    return {
      type: EncodingType.String,
      encoding: 'FLOOR_PREFIX_LENGTH_ENUM_VARINT',
      options: {
        minimum: schema.minLength
      }
    }
  } else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
    return {
      type: EncodingType.String,
      encoding: 'FLOOR_PREFIX_LENGTH_ENUM_VARINT',
      options: {
        minimum: schema.minLength
      }
    }
  } else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
    if (schema.maxLength <= UINT8_MAX - 1) {
      return {
        type: EncodingType.String,
        encoding: 'BOUNDED_PREFIX_LENGTH_8BIT_FIXED',
        options: {
          minimum: 0,
          maximum: schema.maxLength
        }
      }
    }

    return {
      type: EncodingType.String,
      encoding: 'ROOF_PREFIX_LENGTH_ENUM_VARINT',
      options: {
        maximum: schema.maxLength
      }
    }
  }

  if (schema.contentMediaType === 'text/plain') {
    return {
      type: EncodingType.String,
      encoding: 'STRING_DICTIONARY_COMPRESSOR',

      // We should find a way to express the language of the text
      // using JSON Schema, so that we can pick the right dictionary
      // instead of always defaulting to english.
      options: ENGLISH_DICTIONARY
    }
  }

  return {
    type: EncodingType.String,
    encoding: 'FLOOR_PREFIX_LENGTH_ENUM_VARINT',
    options: {
      minimum: 0
    }
  }
}
