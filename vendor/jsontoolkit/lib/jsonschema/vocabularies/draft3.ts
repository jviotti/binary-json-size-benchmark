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
  isDeepStrictEqual
} from 'util'

import * as CSS_COLORS from './css-colors.json'
import * as IP_REGEXES from './ip-regexes.json'

import {
  JSONValue
} from '../../json'

import {
  unicodeLength
} from '../../unicode'

import {
  Schema,
  ObjectSchema
} from '../schema'

import {
  Pointer,
  serializePointer
} from '../../jsonpointer'

import {
  isURI
} from '../../uri'

import {
  SchemaValidator,
  ValidationResult,
  ValidateOutputMode
} from '../validate'

import {
  isTypeOf
} from '..'

import {
  ok,
  fail
} from '../results'

const IPV4_REGEX = new RegExp(IP_REGEXES.v4)
const IPV6_REGEX = new RegExp(IP_REGEXES.v6)

export const type =
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
    if (typeof arg !== 'string' && !Array.isArray(arg)) {
      return fail(mode, 'The argument must be a string or an array')
    }

    const types: JSONValue[] = Array.isArray(arg) ? arg : [ arg ]

    for (const [ index, element ] of types.entries()) {
      if (typeof element === 'string') {
        if (element === 'any') {
          return ok(mode)
        }

        if (element !== 'string' &&
          element !== 'object' &&
          element !== 'array' &&
          element !== 'null' &&
          element !== 'integer' &&
          element !== 'number' &&
          element !== 'boolean') {
          return fail(mode, `The type "${String(element)}" is not valid`)
        }

        if (isTypeOf(element, instance)) {
          return ok(mode)
        }
      } else if (typeof element === 'object' &&
        !Array.isArray(element) &&
        element !== null) {
        const newSchemaPointer: Pointer = Array.isArray(arg)
          ? keywordPointer.concat(index)
          : keywordPointer

        const result: ValidationResult =
          await validate(element, instance,
            instancePointer, newSchemaPointer, evaluatedPointers)
        if (result.valid) {
          return result
        }
      }
    }

    return fail(mode, 'The instance does not match the type')
  }

export const properties =
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
    if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
      return fail(mode, 'The argument must be a schema')
    }

    if (typeof instance !== 'object' ||
      Array.isArray(instance) ||
      instance === null) {
      return ok(mode)
    }

    for (const [ key, subschema ] of Object.entries(arg)) {
      if (typeof subschema !== 'object' ||
        Array.isArray(subschema) ||
        subschema === null) {
        return fail(mode, `The subschema "${key}" is not a schema`)
      }

      const value: JSONValue | undefined = instance[key]
      if (typeof subschema.required === 'boolean' && subschema.required) {
        if (typeof value === 'undefined') {
          return fail(mode, `The property ${String(key)} is required`)
        }

        const result: ValidationResult =
          await validate(subschema, value,
            instancePointer.concat(key),
            keywordPointer.concat(key),
            evaluatedPointers)
        if (!result.valid) {
          return result
        }
      } else if (typeof value !== 'undefined') {
        const result: ValidationResult =
          await validate(subschema, value,
            instancePointer.concat(key),
            keywordPointer.concat(key),
            evaluatedPointers)
        if (!result.valid) {
          return result
        }
      }
    }

    return ok(mode)
  }

export const minItems =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (!Array.isArray(instance)) {
      return ok(mode)
    } else if (instance.length >= arg) {
      return ok(mode)
    }

    const expected: number = instance.length
    return fail(mode,
      `Expected at least ${String(arg)} items but found ${String(expected)}`)
  }

export const maxItems =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (!Array.isArray(instance)) {
      return ok(mode)
    } else if (instance.length <= arg) {
      return ok(mode)
    }

    const expected: number = instance.length
    return fail(mode,
      `Expected at most ${String(arg)} items but found ${String(expected)}`)
  }

export const minLength =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    } else if (unicodeLength(instance) >= arg) {
      return ok(mode)
    }

    return fail(mode, 'The instance length is less than the argument')
  }

export const maxLength =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    } else if (unicodeLength(instance) <= arg) {
      return ok(mode)
    }

    return fail(mode, 'The instance length is greater than the argument')
  }

export const exclusiveMaximum =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return ok(mode)
    } else if (typeof instance !== 'number') {
      return ok(mode)
    } else if (instance < arg) {
      return ok(mode)
    }

    return fail(mode, 'The instance is greater than or equal to the argument')
  }

export const exclusiveMinimum =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return ok(mode)
    } else if (typeof instance !== 'number') {
      return ok(mode)
    } else if (instance > arg) {
      return ok(mode)
    }

    return fail(mode, 'The instance is less than or equal to the argument')
  }

export const maximum =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    schema: ObjectSchema): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'number') {
      return ok(mode)
    } else if (typeof schema.exclusiveMaximum === 'boolean' &&
      schema.exclusiveMaximum) {
      if (instance < arg) {
        return ok(mode)
      }

      return fail(mode, 'The instance is greater than or equal to the argument')
    } else if (instance <= arg) {
      return ok(mode)
    }

    return fail(mode, 'The instance is greater than the argument')
  }

export const minimum =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    schema: ObjectSchema): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'number') {
      return ok(mode)
    } else if (typeof schema.exclusiveMinimum === 'boolean' &&
      schema.exclusiveMinimum) {
      if (instance > arg) {
        return ok(mode)
      }

      return fail(mode, 'The instance is less than or equal to the argument')
    } else if (instance >= arg) {
      return ok(mode)
    }

    return fail(mode, 'The instance is less than the argument')
  }

const parseRegex = (regex: string): RegExp => {
  return new RegExp(regex, 'u')
}

export const pattern =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'string') {
      return fail(mode, 'The argument is not a string')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    } else if (parseRegex(arg).test(instance)) {
      return ok(mode)
    }

    return fail(mode, 'The instance does not match the pattern')
  }

const matchesSomeElement =
  (regex: Readonly<RegExp>, list: readonly string[]): boolean => {
    for (const element of list) {
      if (regex.test(element)) {
        return true
      }
    }

    return false
  }

export const patternProperties =
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
    if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
      return fail(mode, 'The argument is not an object')
    }

    if (typeof instance !== 'object' ||
      Array.isArray(instance) ||
      instance === null) {
      return ok(mode)
    }

    for (const [ regexString, subschema ] of Object.entries(arg)) {
      if (typeof subschema === 'boolean') {
        const regex: RegExp = parseRegex(regexString)
        if (!subschema && matchesSomeElement(regex, Object.keys(instance))) {
          return fail(mode,
            'There cannot be properties matching a pattern with a falsy schema')
        }

        continue
      }

      const regex: RegExp = parseRegex(regexString)
      if (typeof subschema !== 'object' ||
        Array.isArray(subschema) ||
        subschema === null) {
        return fail(mode, 'The subschema is not an object')
      }

      for (const [ key, value ] of Object.entries(instance)) {
        if (value === undefined) {
          continue
        }

        const newInstancePointer: Pointer = instancePointer.concat(key)
        if (regex.test(key)) {
          const result: ValidationResult =
            await validate(subschema, value,
              newInstancePointer,
              keywordPointer.concat(regexString),
              evaluatedPointers)
          if (!result.valid) {
            return result
          }

          evaluatedPointers.add(serializePointer(newInstancePointer))
        }
      }
    }

    return ok(mode)
  }

// eslint-disable-next-line no-underscore-dangle
export const _enum =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (!Array.isArray(arg)) {
      return fail(mode, 'The argument is not an array')
    }

    for (const value of arg) {
      if (value === instance || isDeepStrictEqual(value, instance)) {
        return ok(mode)
      }
    }

    return fail(mode, 'The instance does not match the possible values')
  }

const isRegexString = (value: string): boolean => {
  // Don't support positive/negative look-behind
  // See https://www.regextutorial.org/positive-and-negative-lookbehind-assertions.php
  if (value.includes('(?<=') || value.includes('(?<!')) {
    return false
  }

  // Don't support \Z anchors
  if (value.includes('\\Z')) {
    return false
  }

  try {
    // eslint-disable-next-line no-new
    new RegExp(value)
    return true
  } catch (error) {
    if (error instanceof SyntaxError) {
      return false
    }

    throw error
  }
}

const isEmail = (value: string): boolean => {
  const atIndex = value.indexOf('@')
  if (atIndex === -1) {
    return false
  }

  const dotIndex = value.indexOf('.', atIndex)
  if (dotIndex === -1) {
    return false
  }

  const prefix: string = value.slice(0, atIndex)
  const dotFirstIndex = prefix.indexOf('.')
  const dotLastIndex = prefix.lastIndexOf('.')
  if (dotFirstIndex !== dotLastIndex &&
    dotLastIndex - dotFirstIndex === 1) {
    return false
  }

  if (prefix.startsWith('.') || prefix.endsWith('.')) {
    return false
  }

  return dotIndex - atIndex > 0 && dotIndex < value.length
}

export const format =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'string') {
      return fail(mode, 'The argument is not a string')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    }

    if (arg === 'regex') {
      if (isRegexString(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'date-time') {
      // eslint-disable-next-line max-len
      if (/^\d\d\d\d-[0-1]\d-[0-3]\d[tT\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:[zZ]|[+-]\d\d:\d\d)$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'date') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'time') {
      if (/^\d{1,2}:\d{2}:\d{2}(\.\d+Z)?$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'uri') {
      if (isURI(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'email') {
      if (isEmail(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'ip-address') {
      if (IPV4_REGEX.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'ipv6') {
      if (IPV6_REGEX.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'host-name') {
      // eslint-disable-next-line max-len
      if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'color') {
      if (CSS_COLORS.includes(instance) ||
        /^#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    }

    return ok(mode)
  }

export const uniqueItems =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'boolean') {
      return fail(mode, 'The argument is not a boolean')
    } else if (!Array.isArray(instance)) {
      return ok(mode)
    } else if (!arg) {
      return ok(mode)
    }

    for (let index = 0; index < instance.length; index++) {
      for (let subindex = index + 1; subindex < instance.length; subindex++) {
        if (instance[index] === instance[subindex] ||
          isDeepStrictEqual(instance[index], instance[subindex])) {
          return fail(mode, 'The items are not unique')
        }
      }
    }

    return ok(mode)
  }

export const dependencies =
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

    if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
      return fail(mode, 'The argument is not an object')
    }

    for (const [ property, subschema ] of Object.entries(arg)) {
      if (instance[property] === undefined) {
        continue
      }

      if (typeof subschema === 'object' &&
        !Array.isArray(subschema) &&
        subschema !== null) {
        const result: ValidationResult =
          await validate(subschema, instance,
            instancePointer,
            keywordPointer.concat(property),
            evaluatedPointers)
        if (result.valid) {
          continue
        }
      }

      if (typeof subschema === 'boolean') {
        if (!subschema && instance[property] !== undefined) {
          return fail(mode, `The property "${String(property)}" must not exist`)
        }

        continue
      }

      if (typeof subschema === 'string') {
        if (instance[subschema] === undefined) {
          return fail(mode,
            `The property "${String(subschema)}" does not exist`)
        }

        continue
      }

      if (!Array.isArray(subschema)) {
        return fail(mode, 'The subschema is not an array')
      }

      for (const key of subschema) {
        if (typeof key !== 'string' && typeof key !== 'number') {
          return fail(mode, 'The key is not a string nor a number')
        }

        if (!instance.hasOwnProperty(key)) {
          return fail(mode,
            `The instance does not have property "${String(key)}"`)
        }
      }
    }

    return ok(mode)
  }

const isValidItem = async (
  mode: ValidateOutputMode,
  schema: Schema,
  element: JSONValue,
  validate: SchemaValidator,
  instancePointer: Pointer,
  schemaPointer: Pointer,
  evaluatedPointers: Set<string>): Promise<ValidationResult> => {
  if (typeof schema === 'boolean') {
    if (schema || element === undefined) {
      return ok(mode)
    }

    return fail(mode, 'The element does not match the schema')
  }

  if (typeof schema !== 'object' || Array.isArray(schema)) {
    return ok(mode)
  }

  return validate(schema, element,
    instancePointer, schemaPointer, evaluatedPointers)
}

export const items =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    schema: ObjectSchema,
    _scope: string | null,
    validate: SchemaValidator,
    instancePointer: Pointer,
    schemaPointer: Pointer,
    keywordPointer: Pointer,
    evaluatedPointers: Set<string>): Promise<ValidationResult> => {
    if (!Array.isArray(instance)) {
      return ok(mode)
    }

    if (typeof arg === 'boolean') {
      if (arg) {
        return ok(mode)
      } else if (instance.length === 0) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the schema')
    }

    if (typeof arg === 'object' && !Array.isArray(arg) && arg !== null) {
      for (const [ index, element ] of instance.entries()) {
        const newInstancePointer: Pointer = instancePointer.concat(index)
        const result: ValidationResult =
          await validate(arg, element,
            newInstancePointer,
            keywordPointer,
            evaluatedPointers)
        if (!result.valid) {
          return result
        }

        evaluatedPointers.add(serializePointer(newInstancePointer))
      }

      return ok(mode)
    }

    if (!Array.isArray(arg)) {
      return fail(mode, 'The argument is not an array')
    }

    for (const [ index, element ] of instance.entries()) {
      if (index < arg.length) {
        const subschema: JSONValue = arg[index]
        if (subschema === null ||
          typeof subschema === 'string' ||
          typeof subschema === 'number' ||
          Array.isArray(subschema)) {
          continue
        }

        const newInstancePointer: Pointer = instancePointer.concat(index)
        const result: ValidationResult =
          await isValidItem(mode, subschema, element, validate,
            newInstancePointer, keywordPointer.concat(index),
            evaluatedPointers)
        if (!result.valid) {
          return result
        }

        evaluatedPointers.add(serializePointer(newInstancePointer))
      } else if (typeof schema.additionalItems !== 'undefined') {
        const newInstancePointer: Pointer = instancePointer.concat(index)
        const result: ValidationResult =
          await isValidItem(
            mode, schema.additionalItems, element, validate,
            newInstancePointer, schemaPointer.concat('additionalItems'),
            evaluatedPointers)
        if (!result.valid) {
          return result
        }

        evaluatedPointers.add(serializePointer(newInstancePointer))
      }
    }

    return ok(mode)
  }

const matchesAnyPattern =
  (input: string, patterns: readonly string[]): boolean => {
    for (const element of patterns) {
      if (typeof element !== 'string' || parseRegex(element).test(input)) {
        return true
      }
    }

    return false
  }

export const additionalProperties =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    schema: ObjectSchema,
    scope: string | null,
    validate: SchemaValidator,
    instancePointer: Pointer,
    _schemaPointer: Pointer,
    keywordPointer: Pointer,
    evaluatedPointers: Set<string>): Promise<ValidationResult> => {
    if (typeof arg !== 'boolean' &&
      (typeof arg !== 'object' || Array.isArray(arg) || arg === null)) {
      return fail(mode, 'The argument must be a boolean or an object')
    } else if (typeof instance !== 'object' ||
      Array.isArray(instance) ||
      instance === null) {
      return ok(mode)

      // Early return if "additionalProperties": true
    } else if (typeof arg === 'boolean' && arg) {
      for (const key of Object.keys(instance)) {
        const newInstancePointer: Pointer = instancePointer.concat(key)
        evaluatedPointers.add(serializePointer(newInstancePointer))
      }

      return ok(mode)
    }

    const patterns: string[] =
      typeof schema.patternProperties !== 'undefined' &&
      typeof schema.patternProperties === 'object' &&
      !Array.isArray(schema.patternProperties)
        ? Object.keys(schema.patternProperties) : []

    for (const [ key, subinstance ] of Object.entries(instance)) {
      if (typeof schema.properties === 'object' &&
        schema.properties[key] !== undefined &&
        schema.properties[key] !== null) {
        continue
      }

      if (patterns.length > 0 && matchesAnyPattern(key, patterns)) {
        continue
      }

      if (subinstance === undefined) {
        continue
      }

      // Early return if "additionalProperties": false
      if (typeof arg === 'boolean') {
        return fail(mode,
          `Additional property '${String(key)}' found but was invalid`,
          keywordPointer,
          instancePointer.concat(key),
          scope)
      }

      // Else, if "additionalProperties" is a schema, then validate
      // the element against it.
      const newInstancePointer: Pointer = instancePointer.concat(key)
      evaluatedPointers.add(serializePointer(newInstancePointer))
      const result: ValidationResult =
        await validate(arg, subinstance,
          newInstancePointer,
          keywordPointer,
          evaluatedPointers)
      if (!result.valid) {
        return result
      }
    }

    return ok(mode)
  }

export const divisibleBy =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'number') {
      return ok(mode)
    }

    // Circunvent JavaScript floating point precision problems
    const multiplier: number = 10000
    const magnifiedInstance: number = instance * multiplier
    const magnifiedArgument: number = arg * multiplier
    const magnify: boolean =
      Number.isFinite(magnifiedInstance) &&
      Number.isFinite(magnifiedArgument)
    const safeInstance: number = magnify
      ? magnifiedInstance : instance
    const safeArgument: number = magnify
      ? magnifiedArgument : arg

    if (safeInstance % safeArgument === 0) {
      return ok(mode)
    }

    return fail(mode, 'The instance is not divisible by the argument')
  }

export const disallow =
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
    if (typeof arg !== 'string' && !Array.isArray(arg)) {
      return fail(mode, 'The argument must be a string or an array')
    }

    const schemas: JSONValue[] = Array.isArray(arg) ? arg : [ arg ]

    for (const [ index, subschema ] of schemas.entries()) {
      if (typeof subschema === 'string') {
        if (subschema === 'any') {
          continue
        }

        if (subschema !== 'string' &&
          subschema !== 'object' &&
          subschema !== 'array' &&
          subschema !== 'null' &&
          subschema !== 'integer' &&
          subschema !== 'number' &&
          subschema !== 'boolean') {
          return fail(mode, `The subschema "${String(subschema)}" is not valid`)
        }

        if (!isTypeOf(subschema, instance)) {
          continue
        }
      }

      if (typeof subschema === 'object' &&
        !Array.isArray(subschema) &&
        subschema !== null) {
        const newSchemaPointer: Pointer = Array.isArray(arg)
          ? keywordPointer.concat(index)
          : keywordPointer
        const result: ValidationResult =
          await validate(subschema, instance,
            instancePointer, newSchemaPointer,
            evaluatedPointers)
        if (!result.valid) {
          continue
        }
      }

      return fail(mode, 'The instance does not match the schema')
    }

    return ok(mode)
  }

// eslint-disable-next-line no-underscore-dangle
export const _extends =
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
    const schemas: JSONValue[] = Array.isArray(arg) ? arg : [ arg ]

    for (const [ index, subschema ] of schemas.entries()) {
      if (typeof subschema !== 'object' ||
        Array.isArray(subschema) ||
        subschema === null) {
        return fail(mode, 'The subschema is not an object')
      }

      const newSchemaPointer: Pointer = Array.isArray(arg)
        ? keywordPointer.concat(index)
        : keywordPointer

      const result: ValidationResult =
        await validate(subschema, instance,
          instancePointer, newSchemaPointer, evaluatedPointers)
      if (!result.valid) {
        return result
      }
    }

    return ok(mode)
  }
