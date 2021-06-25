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
  ConstEncodingSchema
} from '../schema'

import {
  StaticOptions
} from '../encoder/const/options'

export interface CONST_NONE_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Const;
  readonly encoding: 'CONST_NONE';
  readonly options: StaticOptions;
}

export type ConstEncodingNames = 'CONST_NONE'
export type ConstEncoding = CONST_NONE_ENCODING

export const getConstStates = (schema: ConstEncodingSchema): number | JSONValue[] => {
  return [ schema.const ]
}

export const getConstEncoding = (schema: ConstEncodingSchema, _level: number): ConstEncoding => {
  return {
    type: EncodingType.Const,
    encoding: 'CONST_NONE',
    options: {
      value: schema.const
    }
  }
}
