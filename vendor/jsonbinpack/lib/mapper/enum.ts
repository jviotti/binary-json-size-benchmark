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
  JSONValue
} from '../json'

import {
  BaseEncodingDefinition
} from './base-encoding-definition'

import {
  EncodingType
} from '../encoder'

import {
  ChoiceOptions
} from '../encoder/enum/options'

import {
  UINT8_MAX
} from '../utils/limits'

import {
  EnumEncodingSchema
} from '../schema'

export interface TOP_LEVEL_8BIT_CHOICE_INDEX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Enum;
  readonly encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX';
  readonly options: ChoiceOptions;
}

export interface BOUNDED_CHOICE_INDEX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Enum;
  readonly encoding: 'BOUNDED_CHOICE_INDEX';
  readonly options: ChoiceOptions;
}

export interface LARGE_BOUNDED_CHOICE_INDEX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Enum;
  readonly encoding: 'LARGE_BOUNDED_CHOICE_INDEX';
  readonly options: ChoiceOptions;
}

export type EnumEncodingNames =
  'TOP_LEVEL_8BIT_CHOICE_INDEX' |
  'BOUNDED_CHOICE_INDEX' |
  'LARGE_BOUNDED_CHOICE_INDEX'
export type EnumEncoding = TOP_LEVEL_8BIT_CHOICE_INDEX_ENCODING |
  BOUNDED_CHOICE_INDEX_ENCODING |
  LARGE_BOUNDED_CHOICE_INDEX_ENCODING

export const getEnumStates = (schema: EnumEncodingSchema): number | JSONValue[] => {
  return schema.enum
}

export const getEnumEncoding = (schema: EnumEncodingSchema, level: number): EnumEncoding => {
  if (level === 0 && schema.enum.length < UINT8_MAX) {
    return {
      type: EncodingType.Enum,
      encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
      options: {
        choices: schema.enum
      }
    }
  }

  return {
    type: EncodingType.Enum,
    encoding: schema.enum.length > UINT8_MAX ? 'LARGE_BOUNDED_CHOICE_INDEX' : 'BOUNDED_CHOICE_INDEX',
    options: {
      choices: schema.enum
    }
  }
}
