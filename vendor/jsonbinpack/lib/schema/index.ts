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
  JSONValue
} from '../json'

export {
  validateSchema
} from './jsonschema'

export interface BooleanEncodingSchema {
  readonly type: 'boolean';
}

export interface IntegerEncodingSchema {
  readonly type: 'integer';

  // The exclusiveMinimum and exclusiveMaximum keywords
  // should be transformed to minimum and maximum
  readonly minimum?: number;
  readonly maximum?: number;

  readonly multipleOf?: number;
}

export interface NullEncodingSchema {
  readonly type: 'null';
}

export interface NumberEncodingSchema {
  readonly type: 'number';
  readonly minimum?: number;
  readonly maximum?: number;
}

export interface StringEncodingSchema {
  readonly type: 'string';
  readonly maxLength?: number;
  readonly minLength?: number;

  // See http://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.7.3
  // TODO: We can use these in the future to apply more clever encodings
  readonly format?:
  'date-time' | 'date' | 'time' | 'duration' |
  'email' | 'idn-email' |
  'hostname' | 'idn-hostname' |
  'ipv4' | 'ipv6' |
  'uri' | 'uri-reference' | 'iri' | 'iri-reference' | 'uuid' |
  'uri-template' |
  'json-pointer' | 'relative-json-pointer' |
  'regex';

  readonly contentMediaType?: string;
}

export interface AnyEncodingSchema {}

export interface ArrayEncodingSchema {
  readonly type: 'array';
  readonly maxItems?: number;
  readonly minItems?: number;
  readonly items?: EncodingSchema;
  readonly prefixItems?: EncodingSchema[];
}

export interface ObjectEncodingSchema {
  readonly type: 'object';
  readonly additionalProperties?: boolean | EncodingSchema;
  readonly required?: string[];
  readonly propertyNames?: StringEncodingSchema;
  readonly properties?: Record<string, EncodingSchema>;
  readonly maxProperties?: number;
}

export interface EnumEncodingSchema {
  readonly enum: JSONValue[];
}

export interface OneOfEncodingSchema {
  readonly oneOf: EncodingSchema[];
}

export interface ConstEncodingSchema {
  readonly const: JSONValue;
}

export type EncodingSchema =
  BooleanEncodingSchema |
  IntegerEncodingSchema |
  NullEncodingSchema |
  NumberEncodingSchema |
  StringEncodingSchema |
  AnyEncodingSchema |
  ArrayEncodingSchema |
  ObjectEncodingSchema |
  EnumEncodingSchema |
  OneOfEncodingSchema |
  ConstEncodingSchema
