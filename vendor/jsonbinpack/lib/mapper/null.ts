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
  NoOptions
} from '../encoder/null/options'

import {
  NullEncodingSchema
} from '../schema'

export interface NULL_8BITS__ENUM_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Null;
  readonly encoding: 'NULL_8BITS__ENUM_FIXED';
  readonly options: NoOptions;
}

export type NullEncodingNames = 'NULL_8BITS__ENUM_FIXED'
export type NullEncoding = NULL_8BITS__ENUM_FIXED_ENCODING

export const getNullStates = (_schema: NullEncodingSchema): number | JSONValue[] => {
  return [ null ]
}

export const getNullEncoding = (_schema: NullEncodingSchema, _level: number): NullEncoding => {
  return {
    type: EncodingType.Null,
    encoding: 'NULL_8BITS__ENUM_FIXED',
    options: {}
  }
}
