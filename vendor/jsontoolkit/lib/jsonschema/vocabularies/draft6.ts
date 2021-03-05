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

import {
  JSONValue
} from '../../json'

import {
  Pointer,
  isPointerString,
  isPointerURIFragment
} from '../../jsonpointer'

import {
  ObjectSchema
} from '../schema'

import {
  _enum,
  format as draft4Format
} from './draft4'

import {
  SchemaValidator,
  ValidationResult,
  ValidateOutputMode
} from '../validate'

import {
  ok,
  fail
} from '../results'

export {
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
  additionalProperties
} from './draft4'

// eslint-disable-next-line no-underscore-dangle
export const _const =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    return _enum(mode, [ arg ], instance)
  }

export const contains =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    schema: ObjectSchema,
    _scope: string | null,
    validate: SchemaValidator,
    instancePointer: Pointer,
    _schemaPointer: Pointer,
    keywordPointer: Pointer,
    evaluatedPointers: Set<string>): Promise<ValidationResult> => {
    if (typeof arg === 'boolean') {
      if (!Array.isArray(instance)) {
        return ok(mode)
      } else if (arg && instance.length > 0) {
        return ok(mode)
      }

      return fail(mode, 'The instance is not empty')
    }

    if (typeof arg !== 'object' ||
      Array.isArray(arg) ||
      arg === null) {
      return fail(mode, 'The argument is not an object')
    }

    if (!Array.isArray(instance)) {
      return ok(mode)
    }

    const minimumMatches: number = schema.minContains ?? 1
    const maximumMatches: number = schema.maxContains ?? Infinity
    if (minimumMatches === 0) {
      return ok(mode)
    }

    let matches: number = 0
    for (const [ index, element ] of instance.entries()) {
      const result: ValidationResult =
        await validate(arg, element,
          instancePointer.concat(index), keywordPointer,
          evaluatedPointers)
      if (result.valid) {
        matches += 1

        // Short circuit
        if (matches >= minimumMatches && maximumMatches === Infinity) {
          return result
        }
      }
    }

    if (matches < minimumMatches || matches > maximumMatches) {
      return fail(mode, 'The number of matches is out of bounds')
    }

    return ok(mode)
  }

export const format =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (arg === 'date-time' ||
    arg === 'date' ||
    arg === 'uri' ||
    arg === 'regex' ||
    arg === 'hostname' ||
    arg === 'email' ||
    arg === 'ipv4' ||
    arg === 'ipv6') {
      return draft4Format(mode, arg, instance)
    }

    if (typeof arg !== 'string') {
      return fail(mode, 'The argument is not a string')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    }

    if (arg === 'uri-reference') {
      const hashIndex: number = instance.indexOf('#')
      const base: string = hashIndex === -1
        ? instance
        : instance.slice(0, hashIndex)
      const fragment: string | null = hashIndex === -1
        ? null
        : instance.slice(hashIndex)

      const isValidFragment = fragment === null ||
        fragment.length === 0 ||
        isPointerURIFragment(fragment) ||
        /^[a-z0-9]+$/i.test(fragment.slice(1))

      if (!isValidFragment) {
        return fail(mode, 'The instance does not match the format')
      } else if (base.length === 0 ||
        /^\/\/?[^\s]+$/i.test(base) ||
        /^[a-z0-9]+$/i.test(base)) {
        return ok(mode)
      }

      return draft4Format(mode, 'uri', base)
    } else if (arg === 'uri-template') {
      // eslint-disable-next-line max-len, no-control-regex
      if (/^(?:(?:[^\x00-\x20"\\'<>%^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'json-pointer') {
      if (isPointerString(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    }

    return ok(mode)
  }

export const propertyNames =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    _schema: ObjectSchema,
    _scope: string | null,
    validate: SchemaValidator,
    instancePointer: Pointer,
    _schemaPointer: Pointer,
    keywordPointer: Pointer,
    evaluatedPointers: Set<string>): Promise<ValidationResult> => {
    if (typeof instance !== 'object' ||
      Array.isArray(instance) ||
      instance === null) {
      return ok(mode)
    }

    if (typeof arg === 'boolean') {
      if (arg) {
        return ok(mode)
      } else if (Object.keys(instance).length === 0) {
        return ok(mode)
      }

      return fail(mode,
        'The argument is a falsy boolean and the instance object is not empty')
    }

    if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
      return fail(mode, 'The argument must be a boolean or an object')
    }

    for (const key of Object.keys(instance)) {
      const result: ValidationResult =
        await validate(arg, key,
          instancePointer.concat(key),
          keywordPointer, evaluatedPointers)
      if (!result.valid) {
        return result
      }
    }

    return ok(mode)
  }
