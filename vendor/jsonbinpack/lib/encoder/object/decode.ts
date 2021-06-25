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
  BitsetResult,
  bitsetDecode
} from './bitset'

import {
  IntegerListResult,
  integerListDecode
} from './integer-list'

import {
  JSONObject
} from '../../json'

import {
  IntegerResult,
  FLOOR__ENUM_VARINT
} from '../integer/decode'

import {
  BoundedTypedOptions,
  RequiredUnboundedTypedOptions,
  OptionalUnboundedTypedOptions,
  UnboundedTypedOptions,
  TypedKeysOptions,
  OptionalBoundedTypedOptions,
  RequiredBoundedTypedOptions,
  PackedUnboundedOptions,
  PackedRequiredBoundedOptions
} from './options'

import {
  decode,
  DecodeResult
} from '../index'

import {
  Encoding
} from '../../mapper'

export interface ObjectResult extends DecodeResult {
  readonly value: JSONObject;
  readonly bytes: number;
}

export const REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: RequiredBoundedTypedOptions
): ObjectResult => {
  const result: JSONObject = {}

  const booleanResult: BitsetResult =
    bitsetDecode(buffer, offset, options.booleanRequiredProperties.length)
  for (const [ index, bit ] of booleanResult.value.entries()) {
    Reflect.set(result, options.booleanRequiredProperties[index], bit)
  }

  let cursor: number = offset + booleanResult.bytes
  for (const key of options.requiredProperties) {
    const encoding: Encoding | undefined = options.propertyEncodings[key]
    assert(typeof encoding !== 'undefined')
    const propertyResult: DecodeResult = decode(buffer, cursor, encoding)
    assert(propertyResult.bytes >= 0)
    Reflect.set(result, key, propertyResult.value)
    cursor += propertyResult.bytes
  }

  return {
    value: result,
    bytes: cursor - offset
  }
}

export const NON_REQUIRED_BOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: OptionalBoundedTypedOptions
): ObjectResult => {
  const bitsetLength: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, {
    minimum: 0
  })

  assert(bitsetLength.value >= 0)
  const bitsetResult: BitsetResult = bitsetDecode(
    buffer, offset + bitsetLength.bytes, bitsetLength.value)
  assert(bitsetResult.value.length === bitsetLength.value)

  const result: JSONObject = {}
  let cursor: number = offset + bitsetLength.bytes + bitsetResult.bytes
  for (const [ index, value ] of bitsetResult.value.entries()) {
    if (!value) {
      continue
    }

    const key: string = options.optionalProperties[index]
    const encoding: Encoding | undefined = options.propertyEncodings[key]
    assert(typeof encoding !== 'undefined')
    const propertyResult: DecodeResult = decode(buffer, cursor, encoding)
    assert(propertyResult.bytes >= 0)
    Reflect.set(result, key, propertyResult.value)
    cursor += propertyResult.bytes
  }

  return {
    value: result,
    bytes: cursor - offset
  }
}

export const MIXED_BOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: BoundedTypedOptions
): ObjectResult => {
  const requiredResult: ObjectResult = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    })

  const optionalResult: ObjectResult = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset + requiredResult.bytes, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    })

  return {
    bytes: requiredResult.bytes + optionalResult.bytes,
    value: Object.assign(requiredResult.value, optionalResult.value)
  }
}

export const ARBITRARY_TYPED_KEYS_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: TypedKeysOptions
): ObjectResult => {
  const result: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, {
    minimum: 0
  })

  assert(result.value >= 0)

  let count: number = 0
  let cursor: number = offset + result.bytes
  const value: JSONObject = {}

  while (count < result.value) {
    const keyResult: DecodeResult =
      decode(buffer, cursor, options.keyEncoding)
    assert(typeof keyResult.value === 'string')
    assert(keyResult.bytes >= 0)
    cursor += keyResult.bytes

    const valueResult: DecodeResult = decode(buffer, cursor, options.encoding)
    assert(valueResult.bytes >= 0)
    cursor += valueResult.bytes

    Reflect.set(value, keyResult.value, valueResult.value)
    count += 1
  }

  return {
    value,
    bytes: cursor - offset
  }
}

export const REQUIRED_UNBOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: RequiredUnboundedTypedOptions
): ObjectResult => {
  const requiredResult: ObjectResult = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    })

  const arbitraryResult: ObjectResult = ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, offset + requiredResult.bytes, {
      keyEncoding: options.keyEncoding,
      encoding: options.encoding
    })

  return {
    bytes: requiredResult.bytes + arbitraryResult.bytes,
    value: Object.assign(requiredResult.value, arbitraryResult.value)
  }
}

export const OPTIONAL_UNBOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: OptionalUnboundedTypedOptions
): ObjectResult => {
  const optionalResult: ObjectResult = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    })

  const arbitraryResult: ObjectResult = ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, offset + optionalResult.bytes, {
      keyEncoding: options.keyEncoding,
      encoding: options.encoding
    })

  return {
    bytes: optionalResult.bytes + arbitraryResult.bytes,
    value: Object.assign(optionalResult.value, arbitraryResult.value)
  }
}

export const MIXED_UNBOUNDED_TYPED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: UnboundedTypedOptions
): ObjectResult => {
  const requiredResult: ObjectResult = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    })

  const optionalResult: ObjectResult = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset + requiredResult.bytes, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    })

  const arbitraryResult: ObjectResult = ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, offset + requiredResult.bytes + optionalResult.bytes, {
      keyEncoding: options.keyEncoding,
      encoding: options.encoding
    })

  return {
    bytes: requiredResult.bytes + optionalResult.bytes + arbitraryResult.bytes,
    value: Object.assign(requiredResult.value, optionalResult.value, arbitraryResult.value)
  }
}

export const PACKED_UNBOUNDED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: PackedUnboundedOptions
): ObjectResult => {
  const packedResult: IntegerListResult = integerListDecode(buffer, offset, {
    minimum: options.packedEncoding.options.minimum,
    maximum: options.packedEncoding.options.maximum
  })

  const result: JSONObject = {}
  for (const [ index, key ] of options.packedRequiredProperties.entries()) {
    Reflect.set(result, key, packedResult.value[index])
  }

  const rest: ObjectResult = MIXED_UNBOUNDED_TYPED_OBJECT(
    buffer, offset + packedResult.bytes, {
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties,
      optionalProperties: options.optionalProperties,
      keyEncoding: options.keyEncoding,
      encoding: options.packedEncoding,
      propertyEncodings: options.propertyEncodings
    })

  return {
    value: Object.assign(result, rest.value),
    bytes: packedResult.bytes + rest.bytes
  }
}

export const PACKED_BOUNDED_REQUIRED_OBJECT = (
  buffer: ResizableBuffer, offset: number, options: PackedRequiredBoundedOptions
): ObjectResult => {
  const packedResult: IntegerListResult = integerListDecode(buffer, offset, {
    minimum: options.packedEncoding.options.minimum,
    maximum: options.packedEncoding.options.maximum
  })

  const result: JSONObject = {}
  for (const [ index, key ] of options.packedRequiredProperties.entries()) {
    Reflect.set(result, key, packedResult.value[index])
  }

  const rest: ObjectResult = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset + packedResult.bytes, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties,
      booleanRequiredProperties: options.booleanRequiredProperties
    })

  return {
    value: Object.assign(result, rest.value),
    bytes: packedResult.bytes + rest.bytes
  }
}
