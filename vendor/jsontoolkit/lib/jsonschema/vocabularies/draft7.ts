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

import * as urijs from 'uri-js'

// eslint-disable-next-line node/no-deprecated-api
import * as punycode from 'punycode'

import {
  unicodeLength
} from '../../unicode'

import {
  JSONValue
} from '../../json'

import {
  Pointer
} from '../../jsonpointer'

import {
  ObjectSchema
} from '../schema'

import {
  format as draft6Format
} from './draft6'

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
  additionalProperties
} from './draft6'

/**
 * The possible values for the "contentEncoding" keyword.
 * See https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8.3
 *
 * All the possible values are defined by RFC2045:
 * See https://tools.ietf.org/html/rfc2045#section-6.1
 */
type ContentEncoding =
  '7bit' |
  '8bit' |
  'binary' |
  'quoted-printable' |
  'base64' |
  'ietf-token' |
  'x-token'

const BASE64_REGEX: RegExp =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

const decode = (
  value: JSONValue, encoding?: ContentEncoding): JSONValue | null => {
  if (encoding === 'base64') {
    if (typeof value !== 'string') {
      return null
    }

    return Buffer.from(value, 'base64').toString('utf-8')
  }

  return value
}

export const contentMediaType = async (
  mode: ValidateOutputMode,
  arg: JSONValue,
  instance: JSONValue,
  schema: ObjectSchema,
  _scope: string | null,
  validate: SchemaValidator,
  instancePointer: Pointer,
  schemaPointer: Pointer,
  _keywordPointer: Pointer,
  evaluatedPointers: Set<string>): Promise<ValidationResult> => {
  // The only content encodings we support right now.
  // We validate correctly if we don't understand the encoding.
  if (typeof schema.contentEncoding === 'string' &&
    schema.contentEncoding !== 'base64') {
    return ok(mode)
  }

  const decodedInstance = decode(instance, schema.contentEncoding)
  if (arg === 'application/json') {
    if (typeof decodedInstance !== 'string') {
      const isJSON: boolean = typeof decodedInstance === 'boolean' ||
        typeof decodedInstance === 'object' ||
        typeof decodedInstance === 'number' ||
        Array.isArray(decodedInstance)

      if (isJSON) {
        if ('contentSchema' in schema && schema.contentSchema !== undefined) {
          // TODO: Implement contentSchema as a different handler
          // that reads "contentEncoding"
          const result: ValidationResult =
            await validate(schema.contentSchema, decodedInstance,
              instancePointer, schemaPointer.concat('contentSchema'),
              evaluatedPointers)
          return result
        }

        return ok(mode)
      }

      return fail(mode, 'The instance is not a valid JSON document')
    }

    try {
      const parsedInstance: JSONValue = JSON.parse(decodedInstance)

      if ('contentSchema' in schema && schema.contentSchema !== undefined) {
        // TODO: Implement contentSchema as a different handler
        // that reads "contentEncoding"
        const result: ValidationResult =
          await validate(schema.contentSchema, parsedInstance,
            instancePointer, schemaPointer.concat('contentSchema'),
            evaluatedPointers)
        return result
      }

      return ok(mode)
    } catch (error) {
      return fail(mode, 'The instance is not a valid JSON document')
    }
  }

  return ok(mode)
}

export const contentEncoding =
  async (mode: ValidateOutputMode,
    arg: JSONValue,
    instance: JSONValue): Promise<ValidationResult> => {
    if (arg === 'base64') {
      if (typeof instance !== 'string') {
        return ok(mode)
      } else if (BASE64_REGEX.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance is not a valid base64 string')
    }

    return ok(mode)
  }

// eslint-disable-next-line no-underscore-dangle
export const _if =
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
    if (arg === undefined ||
      arg === null ||
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      Array.isArray(arg)) {
      return ok(mode)
    }

    const result: ValidationResult =
      await validate(arg, instance,
        instancePointer, keywordPointer, evaluatedPointers)

    if (result.valid) {
      if (schema.then === undefined) {
        return ok(mode)
      }

      return validate(schema.then, instance,
        instancePointer, schemaPointer.concat('then'), evaluatedPointers)
    }

    if (schema.else === undefined) {
      return ok(mode)
    }

    return validate(schema.else, instance,
      instancePointer, schemaPointer.concat('else'), evaluatedPointers)
  }

const punycodeDecode = (input: string): string | null => {
  try {
    return punycode.toUnicode(input)
  } catch (error) {
    if (error instanceof RangeError) {
      return null
    }

    throw error
  }
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
      arg === 'ipv6') {
      return draft6Format(mode, arg, instance)
    }

    if (typeof arg !== 'string') {
      return fail(mode, 'The argument is not a string')
    } else if (typeof instance !== 'string') {
      return ok(mode)
    }

    if (arg === 'time') {
      if (/^\d{1,2}:\d{2}:\d{2}(\.\d+Z)?$/.test(instance)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'relative-json-pointer') {
      // See https://tools.ietf.org/html/draft-handrews-relative-json-pointer-01
      if (/^\d#$/.test(instance)) {
        return ok(mode)
      } else if (!/^\d$/.test(instance[0])) {
        return fail(mode, 'The instance does not match the format')
      }

      return draft6Format(mode, 'json-pointer', instance.slice(1))
    } else if (arg === 'iri') {
      const result = urijs.parse(instance, {
        tolerant: false,
        iri: true,
        unicodeSupport: true
      })

      if (result.path !== undefined &&
          result.reference !== undefined &&
          result.path.indexOf(':') === result.path.lastIndexOf(':') &&
          (result.reference === 'uri' || result.reference === 'absolute')) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'iri-reference') {
      const result = urijs.parse(instance, {
        tolerant: false,
        iri: true,
        unicodeSupport: true
      })

      if (result.reference !== undefined &&
          !instance.includes('\\') &&
          [ 'same-document', 'relative', 'uri' ].includes(result.reference)) {
        return ok(mode)
      }

      return fail(mode, 'The instance does not match the format')
    } else if (arg === 'idn-email') {
      return draft6Format(mode, 'email', instance)

    // TODO: Extract out and refactor this logic
    } else if (arg === 'idn-hostname') {
      const decodedInstance: string | null = punycodeDecode(instance)
      if (decodedInstance === null) {
        return fail(mode, 'The input is not a valid punycode string')
      }

      const fragments: string[] = decodedInstance
        .split(/\u094d\u200c|\u200c|\u094d\u200d|\./)
      for (const [ index, fragment ] of fragments.entries()) {
        // eslint-disable-next-line max-len
        if (/\u3031|\u3032|\u3033|\u3034|\u3035|\u302e|\u302f|\u303b|\u0640|\u07fa/u.test(fragment)) {
          return fail(
            mode, `The fragment "${fragment}" contains disallowed characters`)
        }

        // eslint-disable-next-line max-len
        if (/([\u06f0-\u06f9]+[\u0660-\u0669]+)|([\u0660-\u0669]+[\u06f0-\u06f9]+)/u.test(fragment)) {
          return fail(mode,
            // eslint-disable-next-line max-len
            `The fragment "${fragment}" mixes Arabic-Indic and Eastern Arabic-Indic digits`)
        }

        // eslint-disable-next-line max-len
        if (!/^\u30fb?(\p{L}|\p{M}|\p{N}|l\u00b7l|\u00df|\u03c2|\u0f0b|\u3007|\u06fd|\u06fe)+$/u.test(fragment) &&
          !/[\u0590-\u05ff]+(\u05f3|\u05f4)/u.test(fragment) &&
          !/\u0375[\u0370-\u03ff]+/u.test(fragment)) {
          return fail(
            mode, `The fragment "${fragment}" is not a set of unicode letters`)
        }

        // eslint-disable-next-line max-len
        if (!/^\u30fb?(\p{L}|\p{N}|l\u00b7l|\u00df|\u03c2|\u0f0b|\u3007|\u06fd|\u06fe)+$/u.test(fragment) &&
          !/[\u0590-\u05ff]+(\u05f3|\u05f4)/u.test(fragment) &&
          !/\u0375[\u0370-\u03ff]+/u.test(fragment) &&
          index === 0) {
          return fail(
            mode, `A hostname cannot start with "${fragment}"`)
        }

        if (unicodeLength(fragment) >= 63) {
          return fail(mode, 'The fragment is too large')
        }
      }

      return ok(mode)
    }

    return ok(mode)
  }
