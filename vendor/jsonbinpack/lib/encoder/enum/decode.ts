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
  JSONValue
} from '../../json'

import {
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT
} from '../integer/decode'

import {
  ChoiceOptions
} from './options'

import {
  DecodeResult
} from '../base'

export interface EnumResult extends DecodeResult {
  readonly value: JSONValue;
  readonly bytes: number;
}

export const TOP_LEVEL_8BIT_CHOICE_INDEX = (
  buffer: ResizableBuffer, offset: number, options: ChoiceOptions
): EnumResult => {
  assert(offset === 0)

  if (buffer.getOriginalSize() === 0) {
    return {
      value: options.choices[0],
      bytes: 0
    }
  }

  const result: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
    minimum: 1,
    maximum: options.choices.length
  })

  return {
    value: options.choices[result.value],
    bytes: result.bytes
  }
}

export const BOUNDED_CHOICE_INDEX = (
  buffer: ResizableBuffer, offset: number, options: ChoiceOptions
): EnumResult => {
  const result: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
    minimum: 0,
    maximum: options.choices.length
  })

  return {
    value: options.choices[result.value],
    bytes: result.bytes
  }
}

export const LARGE_BOUNDED_CHOICE_INDEX = (
  buffer: ResizableBuffer, offset: number, options: ChoiceOptions
): EnumResult => {
  const result: IntegerResult = BOUNDED__ENUM_VARINT(buffer, offset, {
    minimum: 0,
    maximum: options.choices.length
  })

  return {
    value: options.choices[result.value],
    bytes: result.bytes
  }
}
