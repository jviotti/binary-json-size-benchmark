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
  isDeepStrictEqual
} from 'util'

import {
  JSONValue
} from '../../json'

import {
  ChoiceOptions
} from './options'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT
} from '../integer/encode'

import {
  UINT8_MAX
} from '../../utils/limits'

import ResizableBuffer from '../resizable-buffer'

import {
  EncodingContext
} from '../context'

export const TOP_LEVEL_8BIT_CHOICE_INDEX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue,
  options: ChoiceOptions, context: EncodingContext
): number => {
  assert(options.choices.length > 0)
  assert(options.choices.length <= UINT8_MAX)

  // Otherwise its not top-level
  assert(buffer.getSize() === 0)
  assert(offset === 0)

  let cursor: number = -1
  for (const [ index, choice ] of options.choices.entries()) {
    if (isDeepStrictEqual(value, choice)) {
      cursor = index
      break
    }
  }

  assert(cursor !== -1)
  assert(cursor >= 0 && cursor < options.choices.length)

  // No data in a top-level enum means that the first choice applied
  if (cursor === 0) {
    return 0
  }

  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset, cursor, {
    minimum: 1,
    maximum: options.choices.length
  }, context)
}

export const BOUNDED_CHOICE_INDEX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue, options: ChoiceOptions, context: EncodingContext
): number => {
  assert(options.choices.length > 0)
  assert(options.choices.length <= UINT8_MAX)

  let cursor: number = -1
  for (const [ index, choice ] of options.choices.entries()) {
    if (isDeepStrictEqual(value, choice)) {
      cursor = index
      break
    }
  }

  assert(cursor !== -1)
  assert(cursor >= 0 && cursor < options.choices.length)

  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset, cursor, {
    minimum: 0,
    maximum: options.choices.length
  }, context)
}

export const LARGE_BOUNDED_CHOICE_INDEX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue, options: ChoiceOptions, context: EncodingContext
): number => {
  assert(options.choices.length > 0)

  let cursor: number = -1
  for (const [ index, choice ] of options.choices.entries()) {
    if (isDeepStrictEqual(value, choice)) {
      cursor = index
      break
    }
  }

  assert(cursor !== -1)
  assert(cursor >= 0 && cursor < options.choices.length)

  return BOUNDED__ENUM_VARINT(buffer, offset, cursor, {
    minimum: 0,
    maximum: options.choices.length
  }, context)
}
