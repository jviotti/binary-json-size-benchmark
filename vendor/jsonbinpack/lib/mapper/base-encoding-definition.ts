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
  BooleanOptions
} from '../encoder/boolean/options'

import {
  NullOptions
} from '../encoder/null/options'

import {
  NumberOptions
} from '../encoder/number/options'

import {
  IntegerOptions
} from '../encoder/integer/options'

import {
  StringOptions
} from '../encoder/string/options'

import {
  AnyOptions
} from '../encoder/any/options'

import {
  ArrayOptions
} from '../encoder/array/options'

import {
  ObjectOptions
} from '../encoder/object/options'

import {
  EnumOptions
} from '../encoder/enum/options'

import {
  OneOfOptions
} from '../encoder/oneof/options'

import {
  EncodingNames
} from './index'

import {
  EncodingType
} from '../encoder'

export interface BaseEncodingDefinition {
  readonly type: EncodingType;
  readonly encoding: EncodingNames;
  readonly options:
  BooleanOptions |
  NullOptions |
  NumberOptions |
  IntegerOptions |
  StringOptions |
  AnyOptions |
  ArrayOptions |
  ObjectOptions |
  EnumOptions |
  OneOfOptions;
}
