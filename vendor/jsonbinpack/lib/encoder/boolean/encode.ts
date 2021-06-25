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

import ResizableBuffer from '../resizable-buffer'

import {
  JSONBoolean,
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

import {
  BOUNDED_8BITS__ENUM_FIXED
} from '../integer/encode'

import {
  EncodingContext
} from '../context'

export const BOOLEAN_8BITS__ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONBoolean, _options: NoOptions, context: EncodingContext
): number => {
  const integer: JSONNumber = value ? 1 : 0
  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset, integer, {
    minimum: 0,
    maximum: 1
  }, context)
}
