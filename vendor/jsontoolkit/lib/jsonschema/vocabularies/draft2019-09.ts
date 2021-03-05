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

import * as ISO8601_REGEXES from './iso8601.json'

import {
  ObjectSchema
} from '../schema'

import {
  JSONValue
} from '../../json'

import {
  ValidationResult,
  ValidateOutputMode,
  SchemaValidator
} from '../validate'

import {
  Pointer,
  serializePointer
} from '../../jsonpointer'

import {
  ok,
  fail
} from '../results'

import {
  format as draft7Format
} from './draft7'

const ISO8601_DURATION_REGEX = new RegExp(ISO8601_REGEXES.duration)

export {
  _const,
  contains,
  propertyNames,
  required,
  type,
  not,
  anyOf,
  allOf,
  oneOf,
  items,
  minProperties,
  maxProperties,
  exclusiveMaximum,
  exclusiveMinimum,
  minItems,
  maxItems,
  multipleOf,
  minLength,
  maxLength,
  maximum,
  minimum,
  pattern,
  _enum,
  uniqueItems,
  dependencies,
  properties,
  patternProperties,
  additionalProperties,
  _if
} from './draft7'

export const dependentRequired = async (
  mode: ValidateOutputMode,
  arg: JSONValue,
  instance: JSONValue
): Promise<ValidationResult> => {
  if (typeof instance !== 'object' ||
    Array.isArray(instance) ||
    instance === null) {
    return ok(mode)
  } else if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
    return fail(mode, 'The argument must be an object')
  }

  for (const [ key, requirements ] of Object.entries(arg)) {
    if (!Array.isArray(requirements)) {
      return fail(mode, 'The key requirements must be arrays')
    }

    if (!(key in instance)) {
      continue
    }

    for (const requirement of requirements) {
      if (typeof requirement !== 'string') {
        return fail(mode, 'Requirements must be strings')
      } else if (!(requirement in instance)) {
        return fail(mode, `The property "${requirement}" is required`)
      }
    }
  }

  return ok(mode)
}

export const dependentSchemas = async (
  mode: ValidateOutputMode,
  arg: JSONValue,
  instance: JSONValue,
  _schema: ObjectSchema,
  _scope: string | null,
  validate: SchemaValidator,
  instancePointer: Pointer,
  schemaPointer: Pointer,
  _keywordPointer: Pointer,
  evaluatedPointers: Set<string>
): Promise<ValidationResult> => {
  if (typeof instance !== 'object' ||
    Array.isArray(instance) ||
    instance === null) {
    return ok(mode)
  } else if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
    return fail(mode, 'The argument must be an object')
  }

  for (const [ key, schema ] of Object.entries(arg)) {
    if (!(key in instance)) {
      continue
    }

    // If the schema is an object schema
    if (typeof schema === 'object' &&
      !Array.isArray(schema) &&
      schema !== null &&
      schema !== undefined) {
      const result: ValidationResult =
        await validate(schema, instance,
          instancePointer,
          schemaPointer.concat([ 'dependentRequired', key ]),
          evaluatedPointers)
      if (!result.valid) {
        return result
      }

    // If the schema is a boolean schema
    } else if (typeof schema === 'boolean' && !schema && key in instance) {
      return fail(mode, `The "${key}" property must not exist`)
    }
  }

  return ok(mode)
}

export const unevaluatedProperties = async (
  mode: ValidateOutputMode,
  arg: JSONValue,
  instance: JSONValue,
  _schema: ObjectSchema,
  _scope: string | null,
  validate: SchemaValidator,
  instancePointer: Pointer,
  _schemaPointer: Pointer,
  keywordPointer: Pointer,
  evaluatedPointers: Set<string>
): Promise<ValidationResult> => {
  if (typeof arg !== 'boolean' &&
    (typeof arg !== 'object' || Array.isArray(arg) || arg === null)) {
    return fail(mode, 'The argument must be a boolean or an object')
  } else if (typeof instance !== 'object' ||
    Array.isArray(instance) ||
    instance === null) {
    return ok(mode)

    // Early return if "unevaluatedProperties": true
  } else if (typeof arg === 'boolean' && arg) {
    for (const key of Object.keys(instance)) {
      const newInstancePointer: Pointer = instancePointer.concat(key)
      evaluatedPointers.add(serializePointer(newInstancePointer))
    }

    return ok(mode)
  }

  for (const key of Object.keys(instance)) {
    const newInstancePointer: Pointer = instancePointer.concat(key)
    const serializedPointer: string = serializePointer(newInstancePointer)

    // This property has been already evaluated
    if (evaluatedPointers.has(serializedPointer)) {
      continue
    }

    // The only case this can happen is when the argument is falsy
    if (typeof arg === 'boolean') {
      return fail(mode, `The property ${String(key)} has not been evaluated`)
    }

    const value: JSONValue | undefined = instance[key]
    if (value === undefined) {
      continue
    }

    evaluatedPointers.add(serializedPointer)
    const result: ValidationResult =
      await validate(arg, value, newInstancePointer,
        keywordPointer,
        evaluatedPointers)
    if (!result.valid) {
      return result
    }
  }

  return ok(mode)
}

export const unevaluatedItems = async (
  mode: ValidateOutputMode,
  arg: JSONValue,
  instance: JSONValue,
  _schema: ObjectSchema,
  _scope: string | null,
  validate: SchemaValidator,
  instancePointer: Pointer,
  _schemaPointer: Pointer,
  keywordPointer: Pointer,
  evaluatedPointers: Set<string>
): Promise<ValidationResult> => {
  if (typeof arg !== 'boolean' &&
    (typeof arg !== 'object' || Array.isArray(arg) || arg === null)) {
    return fail(mode, 'The argument must be a boolean or an object')
  } else if (!Array.isArray(instance)) {
    return ok(mode)

    // Early return if "unevaluatedItems": true
  } else if (typeof arg === 'boolean' && arg) {
    for (const index of instance.keys()) {
      const newInstancePointer: Pointer = instancePointer.concat(index)
      evaluatedPointers.add(serializePointer(newInstancePointer))
    }

    return ok(mode)
  }

  for (const [ index, element ] of instance.entries()) {
    const newInstancePointer: Pointer = instancePointer.concat(index)
    const serializedPointer: string = serializePointer(newInstancePointer)

    // This property has been already evaluated
    if (evaluatedPointers.has(serializedPointer)) {
      continue
    }

    // The only case this can happen is when the argument is falsy
    if (typeof arg === 'boolean') {
      return fail(mode, `The element ${String(index)} has not been evaluated`)
    }

    evaluatedPointers.add(serializedPointer)
    const result: ValidationResult =
      await validate(arg, element, newInstancePointer,
        keywordPointer,
        evaluatedPointers)
    if (!result.valid) {
      return result
    }
  }

  return ok(mode)
}

export const format =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (arg === 'date-time' ||
      arg === 'date' ||
      arg === 'email' ||
      arg === 'hostname' ||
      arg === 'email' ||
      arg === 'regex' ||
      arg === 'json-pointer' ||
      arg === 'uri-reference' ||
      arg === 'uri-template' ||
      arg === 'uri' ||
      arg === 'ipv4' ||
      arg === 'ipv6' ||
      arg === 'time' ||
      arg === 'relative-json-pointer' ||
      arg === 'iri' ||
      arg === 'iri-reference' ||
      arg === 'idn-email' ||
      arg === 'idn-hostname') {
      return draft7Format(mode, arg, instance)
    }

    if (typeof arg !== 'string') {
      return fail(mode, 'The argument is not a string')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    }

    if (arg === 'duration') {
      if (ISO8601_DURATION_REGEX.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    }

    if (arg === 'uuid') {
      // eslint-disable-next-line max-len
      if (/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    }

    return ok(mode)
  }
