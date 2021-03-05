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
  ObjectSchema
} from '../schema'

import {
  format as draft3Format
} from './draft3'

import {
  JSONValue
} from '../../json'

import {
  SchemaValidator,
  ValidationResult,
  ValidateOutputMode
} from '../validate'

import {
  Pointer,
  serializePointer
} from '../../jsonpointer'

import {
  isTypeOf
} from '..'

import {
  ok,
  fail,
  wrap
} from '../results'

export {
  minItems,
  maxItems,
  divisibleBy as multipleOf,
  minLength,
  maxLength,
  exclusiveMaximum,
  exclusiveMinimum,
  maximum,
  minimum,
  pattern,
  patternProperties,
  _enum,
  uniqueItems,
  dependencies,
  items,
  additionalProperties
} from './draft3'

export const required =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (!Array.isArray(arg)) {
      return fail(mode, 'The argument is not an array')
    }

    if (typeof instance !== 'object' ||
      Array.isArray(instance) ||
      instance === null) {
      return ok(mode)
    }

    for (const key of arg) {
      if (typeof key !== 'string' || !instance.hasOwnProperty(key)) {
        return fail(mode, `Required property '${String(key)}' not found`)
      }
    }

    return ok(mode)
  }

export const type =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue
  ): Promise<ValidationResult> => {
    if (typeof arg !== 'string' && !Array.isArray(arg)) {
      return fail(mode, 'The argument must be a string or an array')
    }

    const types = Array.isArray(arg) ? arg : [ arg ]
    for (const element of types) {
      if (element !== 'string' &&
        element !== 'object' &&
        element !== 'array' &&
        element !== 'null' &&
        element !== 'integer' &&
        element !== 'number' &&
        element !== 'boolean') {
        return fail(mode, `The "${String(element)}" type is invalid`)
      }

      if (isTypeOf(element, instance)) {
        return ok(mode)
      }
    }

    return fail(mode, `Property must be of type ${types.join(', ')}`)
  }

export const format =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (arg === 'date-time' ||
    arg === 'date' ||
    arg === 'regex' ||
    arg === 'uri' ||
    arg === 'email' ||
    arg === 'ipv6') {
      return draft3Format(mode, arg, instance)
    } else if (arg === 'ipv4') {
      return draft3Format(mode, 'ip-address', instance)
    } else if (arg === 'hostname') {
      return draft3Format(mode, 'host-name', instance)
    }

    if (typeof arg === 'string') {
      return ok(mode)
    }

    return fail(mode, 'The instance does not match the format')
  }

export const properties =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    _schema: ObjectSchema,
    scope: string | null,
    validate: SchemaValidator,
    instancePointer: Pointer,
    _schemaPointer: Pointer,
    keywordPointer: Pointer,
    evaluatedPointers: Set<string>): Promise<ValidationResult> => {
    if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
      return fail(mode, 'The argument must be an object')
    }

    if (typeof instance !== 'object' ||
      Array.isArray(instance) ||
      instance === null) {
      return ok(mode)
    }

    let valid: boolean = true
    const validationResults: ValidationResult[] = []

    for (const [ key, schema ] of Object.entries(arg)) {
      const newInstancePointer: Pointer = instancePointer.concat(key)
      const newSchemaPointer: Pointer = keywordPointer.concat(key)

      if (typeof schema === 'object' &&
        !Array.isArray(schema) &&
        schema !== null &&
        schema !== undefined) {
        const value: JSONValue | undefined = instance[key]
        if (typeof value === 'undefined') {
          if (mode === ValidateOutputMode.Verbose) {
            validationResults.push(
              ok(mode, newSchemaPointer, newInstancePointer, scope))
          }

          continue
        }

        const result: ValidationResult =
          await validate(schema, value,
            newInstancePointer,
            newSchemaPointer,
            evaluatedPointers)
        if (result.valid) {
          evaluatedPointers.add(serializePointer(newInstancePointer))
          if (mode === ValidateOutputMode.Verbose) {
            validationResults.push(result)
          }

          continue
        } else {
          const localResult: ValidationResult =
            wrap(mode, result, newSchemaPointer, newInstancePointer, scope)

          // TODO: Can we do this before calling "wrap()"
          if (mode === ValidateOutputMode.Flag) {
            return localResult
          }

          valid = false
          validationResults.push(localResult)
          continue
        }
      } else if (typeof schema === 'boolean') {
        if (schema || !instance.hasOwnProperty(key)) {
          evaluatedPointers.add(serializePointer(newInstancePointer))
          if (mode === ValidateOutputMode.Verbose) {
            validationResults.push(
              ok(mode, newSchemaPointer, newInstancePointer, scope))
          }

          continue
        }
      }

      const genericError: ValidationResult = fail(mode,
        `The contents of "${key}" do not match the schema`,
        newSchemaPointer, newInstancePointer, scope)
      if (mode === ValidateOutputMode.Flag) {
        return genericError
      }

      valid = false
      validationResults.push(genericError)
    }

    const outerResult: ValidationResult = {
      valid,
      errors: validationResults
    }

    return wrap(mode, outerResult,
      keywordPointer, instancePointer, scope)
  }

export const minProperties =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'object' ||
        Array.isArray(instance) ||
        instance === null) {
      return ok(mode)
    } else if (Object.keys(instance).length >= arg) {
      return ok(mode)
    }

    return fail(mode,
      'The instance properties are less than the argument')
  }

export const maxProperties =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (typeof arg !== 'number') {
      return fail(mode, 'The argument is not a number')
    } else if (typeof instance !== 'object' ||
        Array.isArray(instance) ||
        instance === null) {
      return ok(mode)
    } else if (Object.keys(instance).length <= arg) {
      return ok(mode)
    }

    return fail(mode,
      'The instance properties are greater than the argument')
  }

export const not =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue,
    _schema: ObjectSchema,
    _scope: string | null,
    validate: SchemaValidator,
    instancePointer: Pointer,
    _schemaPointer: Pointer,
    keywordPointer: Pointer): Promise<ValidationResult> => {
    if (typeof arg === 'boolean') {
      if (!arg) {
        return ok(mode)
      }

      return fail(mode, 'The argument is a truthy boolean')
    }

    if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
      return fail(mode, 'The argument is not a schema')
    }

    const result: ValidationResult =
      await validate(arg, instance, instancePointer, keywordPointer, new Set())

    if (result.valid) {
      // TODO: Move this logic to results.ts
      Reflect.deleteProperty(result, 'errors')
      return Object.assign({}, result, {
        valid: !result.valid,
        error: 'The schema should not match'
      })
    }

    // TODO: Move this logic to results.ts
    return Object.assign({}, result, {
      valid: !result.valid
    })
  }

export const allOf =
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
    if (!Array.isArray(arg)) {
      return fail(mode, 'The argument is not an array')
    }

    for (const [ index, subschema ] of arg.entries()) {
      if (typeof subschema === 'boolean') {
        if (!subschema) {
          return fail(mode, 'One of the schemas is a falsy schema')
        }

        continue
      } else if (typeof subschema !== 'object' ||
        Array.isArray(subschema) ||
        subschema === null) {
        return fail(mode, 'One of the argument elements is not a schema')
      }

      const localEvaluatedPointers: Set<string> = new Set()
      const result: ValidationResult =
        await validate(subschema, instance,
          instancePointer, keywordPointer.concat(index),
          localEvaluatedPointers)
      if (!result.valid) {
        return result
      }

      for (const pointer of localEvaluatedPointers) {
        evaluatedPointers.add(pointer)
      }
    }

    return ok(mode)
  }

export const anyOf =
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
    if (!Array.isArray(arg)) {
      return fail(mode, 'The argument is not an array')
    }

    // "unevaluatedProperties" and "unevaluatedItems" make it
    // trickier to implement "anyOf" as we cannot short circuit
    // anymore, otherwise we would know which properties where
    // evaluated or not.
    let successfulResult: ValidationResult | null = null
    const unevaluatedProperties: boolean =
      'unevaluatedProperties' in schema &&
        (typeof schema.unevaluatedProperties !== 'boolean' ||
          !schema.unevaluatedProperties)
    const unevaluatedItems: boolean =
      'unevaluatedItems' in schema &&
        (typeof schema.unevaluatedItems !== 'boolean' ||
          !schema.unevaluatedItems)
    const shouldCheckAllBranches: boolean =
      unevaluatedProperties || unevaluatedItems

    for (const [ index, subschema ] of arg.entries()) {
      if (typeof subschema === 'boolean' && subschema) {
        return ok(mode)
      } else if (typeof subschema !== 'object' ||
        Array.isArray(subschema) ||
        subschema === null) {
        continue
      }

      const result: ValidationResult =
        await validate(subschema, instance,
          instancePointer, keywordPointer.concat(index),
          evaluatedPointers)
      if (result.valid) {
        successfulResult = result
        if (shouldCheckAllBranches) {
          continue
        }

        return result
      }
    }

    if (shouldCheckAllBranches && successfulResult !== null) {
      return successfulResult
    }

    return fail(mode, 'The instance does not match any schemas')
  }

export const oneOf =
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
    if (!Array.isArray(arg)) {
      return fail(mode, 'The argument is not an array')
    }

    let match = false
    for (const [ index, subschema ] of arg.entries()) {
      if (typeof subschema === 'boolean') {
        if (!subschema) {
          continue
        }
      } else if (typeof subschema !== 'object' ||
        Array.isArray(subschema) ||
        subschema === null) {
        continue
      }

      const result: ValidationResult =
        await validate(subschema, instance,
          instancePointer, keywordPointer.concat(index),
          evaluatedPointers)
      if (!result.valid) {
        continue
      }

      if (match) {
        return fail(mode, 'More than one schema matches the instance')
      }

      match = true
    }

    if (match) {
      return ok(mode)
    }

    return fail(mode, 'No schema matches the instance')
  }
