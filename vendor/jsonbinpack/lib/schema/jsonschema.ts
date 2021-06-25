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

import Ajv, {
  ValidateFunction
} from 'ajv/dist/2020'

import addFormats from 'ajv-formats'
import apply2019Formats from 'ajv-formats-draft2019'

import {
  EncodingSchema
} from './index'

import {
  JSONValue
} from '../json'

const ajv: Ajv = new Ajv({
  strict: false,
  strictTypes: false,
  strictTuples: false,
  strictRequired: false,
  validateFormats: true
})

// The "format" keyword is not supported by
// default on AJV unless we explicitly add it
// through the "ajv-formats" plugin.
addFormats(ajv)
apply2019Formats(ajv)

export const validateSchema = (
  schema: EncodingSchema, value: JSONValue
): boolean => {
  const validateFunction: ValidateFunction = ajv.compile(schema)
  return validateFunction(value)
}
