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
  SchemasOptions
} from './options'

import {
  EncodingContext
} from '../context'

import {
  JSONValue
} from '../../json'

import {
  validateSchema
} from '../../schema'

import {
  FLOOR_ENUM_VARINT
} from '../integer/encode'

import {
  encode
} from '../index'

export const ONEOF_CHOICE_INDEX_PREFIX = (
  buffer: ResizableBuffer, offset: number, value: JSONValue,
  options: SchemasOptions, context: EncodingContext
): number => {
  assert(options.choices.length > 0)

  // Find which of the choices is the one that applies
  let choiceIndex: number = -1
  for (const [ index, definition ] of options.choices.entries()) {
    // TODO: By no means we should be doing full-blown JSON Schema validation
    // here. We should instead be compiling the schema into something simpler
    // that we can check and use that intead.
    if (validateSchema(definition.schema, value)) {
      choiceIndex = index
      break
    }
  }
  assert(choiceIndex >= 0)

  // Record which of the choices was used
  const indexBytes: number = FLOOR_ENUM_VARINT(buffer, offset, choiceIndex, {
    minimum: 0
  }, context)

  // Proceed with encoding against the given choice
  const bytesWritten: number =
    encode(buffer, offset + indexBytes,
      options.choices[choiceIndex].encoding, value, context)
  return indexBytes + bytesWritten
}
