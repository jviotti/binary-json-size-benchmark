/*
 * Copyright 2020 Juan Cruz Viotti
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

/*
 * A collection of functions to operate on JSON Schema documents.
 */

import {
  JSONValue
} from '../json'

import {
  SchemaResolver
} from './reference-resolver'

import {
  getMetaSchemaById
} from './vocabularies'

import {
  Schema,
  SchemaType
} from './schema'

import {
  ValidationResult,
  ValidateOutputMode,
  validate as internalValidate
} from './validate'

export {
  Schema
} from './schema'

export {
  ValidationResult,
  ValidateOutputMode
} from './validate'

/*
 * Check if a JSON Value matches the given JSON Schema string type.
 *
 * The set of primitive types in a JSON Schema document.
 * See http://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1.1
 *
 * > String values MUST be one of the six primitive types ("null", "boolean",
 * "object", "array", "number", or "string"), or "integer" which matches any
 * number with a zero fractional part.
 *
 * Notice that "any" is not present in this list as its only defined in
 * "draft3".
 */
export const isTypeOf = (type: SchemaType, value: JSONValue): boolean => {
  switch (type) {
    case 'string':
      return typeof value === 'string'
    case 'object':
      return typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
    case 'array':
      return Array.isArray(value)
    case 'null':
      return value === null
    case 'integer':
      return typeof value === 'number' &&
        Number.isInteger(value) &&
        !isNaN(value)
    case 'number':
      return typeof value === 'number'
    case 'boolean':
      return typeof value === 'boolean'
    default:
      return false
  }
}

/*
 * Fetch a schema by its URI.
 */
export const defaultResolver: SchemaResolver =
  async (uri: string): Promise<Schema | null> => {
    // An implementation MAY normalize a URI ending with an empty
    // fragment by removing the fragment.
    // We try both here for completeness.
    // See http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.8.2.2
    return getMetaSchemaById(uri) ?? getMetaSchemaById(`${uri}#`)
  }

/*
 * Validate a JSON value against a JSON Schema document.
 */
export const validate = async (
  mode: ValidateOutputMode,
  schema: Schema,
  instance: JSONValue,
  resolver: SchemaResolver = defaultResolver): Promise<ValidationResult> => {
  return internalValidate(mode, schema, instance, resolver)
}
