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
  JSONValue,
  JSONObject
} from '../json'

/**
 * This type matches JSON Schema documents that are JSON Objects.
 * It is meant to correctly match, albeit loosely, all JSON Schema
 * documents involving official vocabularies across standard versions.
 */
export interface ObjectSchema {

  // Every value of this object is indexed by a string, and
  // its either a JSON value or is not set.
  readonly [index: string]: JSONValue | undefined;

  readonly id?: string;
  readonly $id?: string;
  readonly $schema?: string;
  readonly $ref?: string;
  readonly $recursiveRef?: string;
  readonly $anchor?: string;
  readonly $defs?: JSONObject;
  readonly $recursiveAnchor?: boolean;
  readonly definitions?: JSONObject;
  readonly minContains?: number;
  readonly maxContains?: number;
  readonly allOf?: Schema[];
  readonly if?: Schema;
  readonly then?: Schema;
  readonly else?: Schema;
  readonly items?: Schema | Schema[];
  readonly exclusiveMaximum?: boolean;
  readonly exclusiveMinimum?: boolean;
  readonly additionalItems?: Schema;
  readonly unevaluatedItems?: Schema;
  readonly unevaluatedProperties?: Schema;
  readonly contentEncoding?: string;
  readonly contentSchema?: Schema;
  readonly properties?: JSONObject;
  readonly patternProperties?: JSONObject;
}

/**
 * A JSON Schema MUST be an object or a boolean.
 * See http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.4.3
 */
export type Schema = ObjectSchema | boolean

/**
 * The set of primitive types in a JSON Schema document.
 * See http://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1.1
 *
 * > String values MUST be one of the six primitive types ("null", "boolean",
 * "object", "array", "number", or "string"), or "integer" which matches any
 * number with a zero fractional part.
 *
 * Notice that "any" is not present in this list as its only defined in
 * "draft3".
 */
export type SchemaType =
  'string' |
  'object' |
  'array' |
  'null' |
  'integer' |
  'number' |
  'boolean';
