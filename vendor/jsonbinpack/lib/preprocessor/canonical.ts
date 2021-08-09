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
  pick,
  omit,
  mapValues,
  merge,
  uniqWith,
  isEqual,
  concat,
  cloneDeep
} from 'lodash'

import {
  JSONValue,
  JSONObject,
  JSONBoolean
} from '../json'

import {
  EncodingSchema,
  BooleanEncodingSchema,
  IntegerEncodingSchema,
  NullEncodingSchema,
  NumberEncodingSchema,
  StringEncodingSchema,
  ArrayEncodingSchema,
  ObjectEncodingSchema
} from '../schema'

const SCHEMA_BOOLEAN_KEYS: (keyof BooleanEncodingSchema)[] = [ 'type' ]
const SCHEMA_INTEGER_KEYS: (keyof IntegerEncodingSchema)[] =
  [ 'type', 'minimum', 'maximum', 'multipleOf' ]
const SCHEMA_NULL_KEYS: (keyof NullEncodingSchema)[] = [ 'type' ]
const SCHEMA_NUMBER_KEYS: (keyof NumberEncodingSchema)[] =
  [ 'type', 'maximum', 'minimum' ]
const SCHEMA_STRING_KEYS: (keyof StringEncodingSchema)[] =
  [ 'type', 'maxLength', 'minLength', 'format', 'contentMediaType' ]
const SCHEMA_ARRAY_KEYS: (keyof ArrayEncodingSchema)[] =
  [ 'type', 'maxItems', 'minItems', 'items', 'prefixItems' ]
const SCHEMA_OBJECT_KEYS: (keyof ObjectEncodingSchema)[] =
  [ 'type', 'additionalProperties', 'required', 'propertyNames', 'properties', 'maxProperties' ]

const SCHEMA_KEYS: (keyof BooleanEncodingSchema |
keyof IntegerEncodingSchema |
keyof NullEncodingSchema |
keyof NumberEncodingSchema |
keyof StringEncodingSchema |
keyof ArrayEncodingSchema |
keyof ObjectEncodingSchema)[] = concat(
  SCHEMA_BOOLEAN_KEYS,
  SCHEMA_INTEGER_KEYS,
  SCHEMA_NULL_KEYS,
  SCHEMA_NUMBER_KEYS,
  SCHEMA_STRING_KEYS,
  SCHEMA_ARRAY_KEYS,
  SCHEMA_OBJECT_KEYS
)

// TODO: Turn this into its own standalone C++ library

export const canonicalizeSchema = (schema: JSONObject | JSONBoolean): EncodingSchema => {
  // We can assume this is a truthy schema as otherwise nothing
  // will match, and therefore nothing could have been encoded
  if (typeof schema === 'boolean') {
    return {}
  }

  if (typeof schema.const !== 'undefined') {
    return {
      const: schema.const
    }
  } else if (Array.isArray(schema.enum)) {
    return {
      enum: schema.enum
    }
  }

  if (typeof schema.items !== 'undefined') {
    assert(typeof schema.items === 'boolean' || (
      typeof schema.items === 'object' &&
      !Array.isArray(schema.items) &&
      schema.items !== null
    ))
    Reflect.set(schema, 'items', canonicalizeSchema(schema.items))
  }

  if (typeof schema.additionalProperties !== 'undefined') {
    assert(typeof schema.additionalProperties === 'boolean' || (
      typeof schema.additionalProperties === 'object' &&
      !Array.isArray(schema.additionalProperties) &&
      schema.additionalProperties !== null
    ))

    if (schema.additionalProperties !== false) {
      Reflect.set(schema, 'additionalProperties',
        canonicalizeSchema(schema.additionalProperties))
    }
  }

  if (typeof schema.properties !== 'undefined') {
    assert(typeof schema.properties === 'object' &&
      !Array.isArray(schema.properties) &&
      schema.properties !== null)

    Reflect.set(schema, 'properties',
      mapValues(schema.properties, (subschema) => {
        assert(typeof subschema === 'boolean' ||
          (typeof subschema === 'object' &&
          !Array.isArray(subschema) &&
          subschema !== null))
        return canonicalizeSchema(subschema)
      }))
  }

  if (typeof schema.propertyNames !== 'undefined') {
    assert(typeof schema.propertyNames === 'boolean' || (
      typeof schema.propertyNames === 'object' &&
      !Array.isArray(schema.propertyNames) &&
      schema.propertyNames !== null
    ))
    Reflect.set(schema, 'propertyNames',
      canonicalizeSchema(schema.propertyNames))
  }

  if (typeof schema.prefixItems !== 'undefined') {
    assert(Array.isArray(schema.prefixItems))
    Reflect.set(schema, 'prefixItems', schema.prefixItems.map((subschema) => {
      assert(typeof subschema === 'boolean' || (
        typeof subschema === 'object' &&
        !Array.isArray(subschema) &&
        subschema !== null
      ))

      return canonicalizeSchema(subschema)
    }))
  }

  if (Array.isArray(schema.allOf)) {
    return canonicalizeSchema(merge({}, ...schema.allOf))
  } else if (Array.isArray(schema.oneOf)) {
    const branches: EncodingSchema[] = schema.oneOf.map((choice: JSONValue) => {
      return canonicalizeSchema(merge(cloneDeep(choice), omit(schema, [ 'oneOf' ])))
    })

    // Attempt to collapse the oneOf as much as possible
    const uniqueBranches: EncodingSchema[] = uniqWith(branches, isEqual)
    if (uniqueBranches.length === 1) {
      return uniqueBranches[0]
    }

    return {
      oneOf: uniqueBranches
    }
  } else if (Array.isArray(schema.anyOf)) {
    const branches: EncodingSchema[] = schema.anyOf.map((choice: JSONValue) => {
      return canonicalizeSchema(merge(cloneDeep(choice), omit(schema, [ 'anyOf' ])))
    })

    // Attempt to collapse the anyOf as much as possible
    const uniqueBranches: EncodingSchema[] = uniqWith(branches, isEqual)
    if (uniqueBranches.length === 1) {
      return uniqueBranches[0]
    }

    return {
      anyOf: uniqueBranches
    }
  }

  if (Array.isArray(schema.type)) {
    return {
      anyOf: schema.type.map((type: JSONValue) => {
        return canonicalizeSchema({
          ...schema,
          type
        })
      })
    }
  }

  switch (schema.type) {
    case 'boolean': return pick(schema, SCHEMA_BOOLEAN_KEYS)
    case 'integer': return pick(schema, SCHEMA_INTEGER_KEYS)
    case 'null': return pick(schema, SCHEMA_NULL_KEYS)
    case 'number': return pick(schema, SCHEMA_NUMBER_KEYS)
    case 'string':
      // Formats that are unsupported for now
      if (typeof schema.format === 'string' &&
        [ 'iri', 'time' ].includes(schema.format)) {
        Reflect.deleteProperty(schema, 'format')
      }

      return pick(schema, SCHEMA_STRING_KEYS)
    case 'array':
      return pick(schema, SCHEMA_ARRAY_KEYS)
    case 'object': return pick(schema, SCHEMA_OBJECT_KEYS)

    // The any type
    default:
      if (Object.keys(schema).length > 0) {
        const result = Object.assign({}, pick(schema, SCHEMA_KEYS), {
          type: [
            'boolean',
            'integer',
            'null',
            'number',
            'string',
            'array',
            'object'
          ]
        })

        // TODO: Workaround the canonical procedures to relax
        // additionalProperties if patternProperties is
        // defined until we properly support patternProperties
        if (typeof schema.patternProperties !== 'undefined' &&
          (typeof result.additionalProperties !== 'boolean' ||
          !result.additionalProperties)) {
          result.additionalProperties = true
        }

        return canonicalizeSchema(result)
      }

      return {}
  }
}
