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
  Encoding,
  StringEncoding
} from '../../mapper'

import {
  BOUNDED_8BITS_ENUM_FIXED_ENCODING
} from '../../mapper/integer'

interface TypedPropertiesOptions {
  propertyEncodings: Record<string, Encoding>;
}

interface HomogeneousPropertiesOptions {
  encoding: Encoding;
}

export interface RequiredBoundedTypedOptions extends TypedPropertiesOptions {
  booleanRequiredProperties: string[];
  requiredProperties: string[];
}

export interface OptionalBoundedTypedOptions extends TypedPropertiesOptions {
  optionalProperties: string[];
}

export interface BoundedTypedOptions extends
  OptionalBoundedTypedOptions, RequiredBoundedTypedOptions {}

export interface TypedKeysOptions extends HomogeneousPropertiesOptions {
  keyEncoding: StringEncoding;
}

export interface RequiredUnboundedTypedOptions extends
  RequiredBoundedTypedOptions, TypedKeysOptions, HomogeneousPropertiesOptions {}

export interface OptionalUnboundedTypedOptions extends
  OptionalBoundedTypedOptions, TypedKeysOptions, HomogeneousPropertiesOptions {}

export interface UnboundedTypedOptions extends
  BoundedTypedOptions, TypedKeysOptions, HomogeneousPropertiesOptions {}

export interface PackedUnboundedOptions extends
  BoundedTypedOptions, HomogeneousPropertiesOptions {
  packedRequiredProperties: string[];
  packedEncoding: BOUNDED_8BITS_ENUM_FIXED_ENCODING;
  keyEncoding: StringEncoding;
}

export interface PackedRequiredBoundedOptions
  extends RequiredBoundedTypedOptions {
  packedRequiredProperties: string[];
  packedEncoding: BOUNDED_8BITS_ENUM_FIXED_ENCODING;
}

export interface SizeTypedKeysOptions extends TypedKeysOptions {
  size: number;
}

export type ObjectOptions =
  RequiredBoundedTypedOptions |
  OptionalBoundedTypedOptions |
  BoundedTypedOptions |
  TypedKeysOptions |
  OptionalUnboundedTypedOptions |
  RequiredUnboundedTypedOptions |
  UnboundedTypedOptions |
  PackedUnboundedOptions |
  PackedRequiredBoundedOptions |
  SizeTypedKeysOptions
