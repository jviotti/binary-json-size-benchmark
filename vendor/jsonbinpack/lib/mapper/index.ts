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
  BooleanEncodingNames,
  BooleanEncoding,
  getBooleanStates,
  getBooleanEncoding
} from './boolean'

import {
  NullEncodingNames,
  NullEncoding,
  getNullStates,
  getNullEncoding
} from './null'

import {
  NumberEncodingNames,
  NumberEncoding,
  getNumberStates,
  getNumberEncoding
} from './number'

import {
  IntegerEncodingNames,
  IntegerEncoding,
  getIntegerStates,
  getIntegerEncoding
} from './integer'

import {
  StringEncodingNames,
  StringEncoding,
  getStringStates,
  getStringEncoding
} from './string'

import {
  AnyEncodingNames,
  AnyEncoding,
  getAnyStates,
  getAnyEncoding
} from './any'

import {
  ArrayEncodingNames,
  ArrayEncoding,
  getArrayStates,
  getArrayEncoding
} from './array'

import {
  ObjectEncodingNames,
  ObjectEncoding,
  getObjectStates,
  getObjectEncoding
} from './object'

import {
  EnumEncodingNames,
  EnumEncoding,
  getEnumStates,
  getEnumEncoding
} from './enum'

import {
  OneOfEncodingNames,
  OneOfEncoding,
  getOneOfStates,
  getOneOfEncoding
} from './oneof'

import {
  ConstEncodingNames,
  ConstEncoding,
  getConstStates,
  getConstEncoding
} from './const'

import {
  EncodingSchema
} from '../schema'

export {
  BooleanEncoding
} from './boolean'

export {
  NullEncoding
} from './null'

export {
  NumberEncoding
} from './number'

export {
  IntegerEncoding
} from './integer'

export {
  StringEncoding
} from './string'

export {
  AnyEncoding
} from './any'

export {
  ArrayEncoding
} from './array'

export {
  ObjectEncoding
} from './object'

export {
  EnumEncoding
} from './enum'

export {
  OneOfEncoding
} from './oneof'

export {
  ConstEncoding
} from './const'

export type EncodingNames =
  BooleanEncodingNames |
  NullEncodingNames |
  NumberEncodingNames |
  IntegerEncodingNames |
  StringEncodingNames |
  AnyEncodingNames |
  ArrayEncodingNames |
  ObjectEncodingNames |
  EnumEncodingNames |
  OneOfEncodingNames |
  ConstEncodingNames

// The union of all possible encodings
export type Encoding =
  BooleanEncoding |
  NullEncoding |
  NumberEncoding |
  IntegerEncoding |
  StringEncoding |
  AnyEncoding |
  ArrayEncoding |
  ObjectEncoding |
  EnumEncoding |
  OneOfEncoding |
  ConstEncoding

export const getEncoding = (schema: EncodingSchema, level: number): Encoding => {
  // This case should be handled by the canonicalizer
  assert(typeof schema !== 'boolean')

  if ('enum' in schema) {
    return getEnumEncoding(schema, level)
  } else if ('const' in schema) {
    return getConstEncoding(schema, level)
  } else if ('oneOf' in schema) {
    return getOneOfEncoding(schema, level)
  } else if (!('type' in schema)) {
    return getAnyEncoding(schema, level)
  } else if (schema.type === 'boolean') {
    return getBooleanEncoding(schema, level)
  } else if (schema.type === 'integer') {
    return getIntegerEncoding(schema, level)
  } else if (schema.type === 'null') {
    return getNullEncoding(schema, level)
  } else if (schema.type === 'number') {
    return getNumberEncoding(schema, level)
  } else if (schema.type === 'string') {
    return getStringEncoding(schema, level)
  } else if (schema.type === 'array') {
    return getArrayEncoding(schema, level)
  }
  return getObjectEncoding(schema, level)
}

export const getStates = (schema: EncodingSchema): number | JSONValue[] => {
  if ('enum' in schema) {
    return getEnumStates(schema)
  } else if ('const' in schema) {
    return getConstStates(schema)
  } else if ('oneOf' in schema) {
    return getOneOfStates(schema)
  } else if (!('type' in schema)) {
    return getAnyStates(schema)
  } else if (schema.type === 'boolean') {
    return getBooleanStates(schema)
  } else if (schema.type === 'integer') {
    return getIntegerStates(schema)
  } else if (schema.type === 'null') {
    return getNullStates(schema)
  } else if (schema.type === 'number') {
    return getNumberStates(schema)
  } else if (schema.type === 'string') {
    return getStringStates(schema)
  } else if (schema.type === 'array') {
    return getArrayStates(schema)
  }

  return getObjectStates(schema)
}
