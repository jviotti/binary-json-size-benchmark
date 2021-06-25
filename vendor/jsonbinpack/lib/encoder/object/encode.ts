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
  bitsetEncode
} from './bitset'

import {
  integerListEncode
} from './integer-list'

import {
  JSONObject,
  JSONValue
} from '../../json'

import {
  encode,
  EncodingType
} from '../index'

import {
  Encoding
} from '../../mapper'

import {
  TypedKeysOptions,
  BoundedTypedOptions,
  UnboundedTypedOptions,
  RequiredUnboundedTypedOptions,
  OptionalBoundedTypedOptions,
  OptionalUnboundedTypedOptions,
  RequiredBoundedTypedOptions,
  PackedUnboundedOptions,
  PackedRequiredBoundedOptions
} from './options'

import {
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  EncodingContext
} from '../context'

export const REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject,
  options: RequiredBoundedTypedOptions, context: EncodingContext
): number => {
  assert(Object.keys(value).length ===
    options.requiredProperties.length + options.booleanRequiredProperties.length)

  const booleanBits: boolean[] = []
  for (const key of options.booleanRequiredProperties) {
    const bit: JSONValue = value[key]
    assert(typeof bit === 'boolean')
    assert(typeof options.propertyEncodings[key] !== 'undefined')
    assert(options.propertyEncodings[key].type === EncodingType.Boolean)
    booleanBits.push(bit)
  }
  const booleanBytes: number = bitsetEncode(buffer, offset, booleanBits)

  let cursor: number = offset + booleanBytes
  for (const key of options.requiredProperties) {
    const encoding: Encoding | undefined = options.propertyEncodings[key]
    assert(typeof encoding !== 'undefined')
    cursor += encode(buffer, cursor, encoding, value[key], context)
  }

  return cursor - offset
}

export const NON_REQUIRED_BOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject, options: OptionalBoundedTypedOptions, context: EncodingContext
): number => {
  assert(Object.keys(value).length <= options.optionalProperties.length)

  const lengthBytes: number = FLOOR__ENUM_VARINT(
    buffer, offset, options.optionalProperties.length, {
      minimum: 0
    }, context)

  const keys: string[] = []
  const bitset: boolean[] = []
  for (const property of options.optionalProperties) {
    const isPropertySet: boolean = typeof value[property] !== 'undefined'
    bitset.push(isPropertySet)
    if (isPropertySet) {
      keys.push(property)
    }
  }

  const bitsetBytes: number = bitsetEncode(buffer, offset + lengthBytes, bitset)
  let cursor = offset + lengthBytes + bitsetBytes
  for (const key of keys) {
    const encoding: Encoding | undefined = options.propertyEncodings[key]
    assert(typeof encoding !== 'undefined')
    const bytesWritten: number = encode(buffer, cursor, encoding, value[key], context)
    cursor += bytesWritten
  }

  return cursor - offset
}

export const MIXED_BOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject, options: BoundedTypedOptions, context: EncodingContext
): number => {
  assert(Object.keys(value).length <=
    options.booleanRequiredProperties.length +
    options.requiredProperties.length +
    options.optionalProperties.length)

  const requiredSubset: JSONObject = {}
  for (const key of options.booleanRequiredProperties.concat(options.requiredProperties)) {
    Reflect.set(requiredSubset, key, value[key])
  }

  const optionalSubset: JSONObject = {}
  for (const key of options.optionalProperties) {
    Reflect.set(optionalSubset, key, value[key])
  }

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, requiredSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    }, context)

  return requiredBytes + NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset + requiredBytes, optionalSubset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    }, context)
}

export const ARBITRARY_TYPED_KEYS_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject, options: TypedKeysOptions, context: EncodingContext
): number => {
  let cursor: number = offset + FLOOR__ENUM_VARINT(
    buffer, offset, Object.keys(value).length, {
      minimum: 0
    }, context)

  for (const [ key, objectValue ] of Object.entries(value)) {
    cursor += encode(buffer, cursor, options.keyEncoding, key, context)
    cursor += encode(buffer, cursor, options.encoding, objectValue, context)
  }

  return cursor - offset
}

export const REQUIRED_UNBOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject, options: RequiredUnboundedTypedOptions, context: EncodingContext
): number => {
  assert(options.booleanRequiredProperties.length + options.requiredProperties.length > 0)

  const required: Set<string> =
    new Set<string>(options.booleanRequiredProperties.concat(options.requiredProperties))
  const requiredSubset: JSONObject = {}
  const rest: JSONObject = {}

  for (const key of Object.keys(value)) {
    Reflect.set(required.has(key) ? requiredSubset : rest, key, value[key])
  }

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, requiredSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    }, context)

  return requiredBytes + ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + requiredBytes, rest, {
    keyEncoding: options.keyEncoding,
    encoding: options.encoding
  }, context)
}

export const OPTIONAL_UNBOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject, options: OptionalUnboundedTypedOptions, context: EncodingContext
): number => {
  assert(Object.keys(options.propertyEncodings).length === options.optionalProperties.length)
  const optional: Set<string> = new Set<string>(options.optionalProperties)
  const optionalSubset: JSONObject = {}
  const rest: JSONObject = {}

  for (const key of Object.keys(value)) {
    Reflect.set(optional.has(key) ? optionalSubset : rest, key, value[key])
  }

  const optionalBytes: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset, optionalSubset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    }, context)

  return optionalBytes + ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + optionalBytes, rest, {
    keyEncoding: options.keyEncoding,
    encoding: options.encoding
  }, context)
}

export const MIXED_UNBOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject, options: UnboundedTypedOptions, context: EncodingContext
): number => {
  const required: Set<string> =
    new Set<string>(options.booleanRequiredProperties.concat(options.requiredProperties))
  const optional: Set<string> = new Set<string>(options.optionalProperties)

  const requiredSubset: JSONObject = {}
  const optionalSubset: JSONObject = {}

  const rest: JSONObject = {}

  for (const key of Object.keys(value)) {
    if (required.has(key)) {
      Reflect.set(requiredSubset, key, value[key])
    } else if (optional.has(key)) {
      Reflect.set(optionalSubset, key, value[key])
    } else {
      Reflect.set(rest, key, value[key])
    }
  }

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, requiredSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    }, context)

  const optionalBytes: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset + requiredBytes, optionalSubset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    }, context)

  return requiredBytes + optionalBytes + ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, offset + requiredBytes + optionalBytes, rest, {
      keyEncoding: options.keyEncoding,
      encoding: options.encoding
    }, context)
}

export const PACKED_UNBOUNDED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject,
  options: PackedUnboundedOptions, context: EncodingContext
): number => {
  const packedValues: number[] = []
  const unpackedSubset: JSONObject = Object.assign({}, value)

  for (const key of options.packedRequiredProperties) {
    const integer: JSONValue = value[key]
    assert(typeof integer === 'number')
    packedValues.push(integer)
    Reflect.deleteProperty(unpackedSubset, key)
  }

  const packedBytes: number = integerListEncode(buffer, offset, packedValues, {
    minimum: options.packedEncoding.options.minimum,
    maximum: options.packedEncoding.options.maximum
  }, context)

  return packedBytes + MIXED_UNBOUNDED_TYPED_OBJECT(buffer, offset + packedBytes, unpackedSubset, {
    requiredProperties: options.requiredProperties,
    booleanRequiredProperties: options.booleanRequiredProperties,
    optionalProperties: options.optionalProperties,
    keyEncoding: options.keyEncoding,
    encoding: options.packedEncoding,
    propertyEncodings: options.propertyEncodings
  }, context)
}

export const PACKED_BOUNDED_REQUIRED_OBJECT = (
  buffer: ResizableBuffer, offset: number, value: JSONObject,
  options: PackedRequiredBoundedOptions, context: EncodingContext
): number => {
  const packedValues: number[] = []
  const unpackedSubset: JSONObject = Object.assign({}, value)

  for (const key of options.packedRequiredProperties) {
    const integer: JSONValue = value[key]
    assert(typeof integer === 'number')
    packedValues.push(integer)
    Reflect.deleteProperty(unpackedSubset, key)
  }

  const packedBytes: number = integerListEncode(buffer, offset, packedValues, {
    minimum: options.packedEncoding.options.minimum,
    maximum: options.packedEncoding.options.maximum
  }, context)

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset + packedBytes, unpackedSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    }, context)

  return packedBytes + requiredBytes
}
