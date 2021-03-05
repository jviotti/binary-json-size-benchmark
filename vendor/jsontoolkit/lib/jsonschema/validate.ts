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

import {
  Pointer,
  serializePointer
} from '../jsonpointer'

import SchemaCache from './schema-cache'

import {
  SchemaContext
} from './schema-context'

import {
  Schema,
  ObjectSchema
} from './schema'

import {
  resolveObjectRef,
  SchemaResolver,
  ResolverOptions,
  ReferenceResolution
} from './reference-resolver'

import {
  getHandler,
  KeywordHandler,
  getSchemaId,
  getMetaSchemaIdFromSchema
} from './vocabularies'

import {
  ok,
  fail,
  wrap
} from './results'

import {
  resolve as uriResolve
} from '../uri'

/*
 * Any function that performs JSON Schema validation must
 * adhere to this signature.
 */
export type SchemaValidator =
  (schema: Schema,
    instance: JSONValue,
    instancePointer: Pointer,
    schemaPointer: Pointer,
    evaluatedPointers: Set<string>) => Promise<ValidationResult>

/*
 * A standard JSON Schema validation output, as defined in
 * the JSON Schema specification:
 * http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.10.4
 */
// TODO: Validate output against the official validation
// output schema: http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.10.4.5
export interface ValidationResult {
  readonly [key: string]:
  boolean | string | undefined | Partial<ValidationResult>[];
  readonly valid: boolean;
  readonly absoluteKeywordLocation?: string;
  readonly keywordLocation?: string;
  readonly instanceLocation?: string;
  readonly error?: string;
  readonly errors?: Partial<ValidationResult>[];
}

/*
 * All the validation output modes defined by JSON Schema.
 * See http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.10.4
 */
export enum ValidateOutputMode {
  Flag = 'flag',
  Basic = 'basic',
  Detailed = 'detailed',
  Verbose = 'verbose'
}

const runHandler = async (
  mode: ValidateOutputMode,
  metaschemaId: string,
  key: string,
  value: JSONValue | undefined,
  instance: JSONValue,
  recurse: SchemaValidator,
  resolution: ReferenceResolution,
  schema: ObjectSchema,
  instancePointer: Pointer,
  schemaPointer: Pointer,
  evaluatedPointers: Set<string>
): Promise<ValidationResult> => {
  const keywordPointer: Pointer = schemaPointer.concat(key)

  if (value === undefined) {
    return ok(mode, keywordPointer,
      instancePointer, resolution.context.scope)
  }

  // Obtain the relevant handler for the schema keyword we are
  // dealing with given the metaschema that the schema declares.
  const handler: KeywordHandler | null = getHandler(metaschemaId, key)
  if (handler === null) {
    return ok(mode, keywordPointer,
      instancePointer, resolution.context.scope)
  }

  // Execute the handler against the schema keyword value and the
  // document we are trying to validate. Abort execution if the
  // handler doesn't return successfully.
  const result: ValidationResult =
    await handler(mode, value, instance,
      schema, resolution.context.scope,
      recurse, instancePointer,
      schemaPointer, keywordPointer, evaluatedPointers)

  return wrap(mode, result,
    keywordPointer, instancePointer,
    resolution.context.scope)
}

const getAnchor = (
  schema: Schema,
  anchor: Schema | null
): Schema | null => {
  if (typeof schema !== 'boolean' &&
    '$recursiveAnchor' in schema &&
    schema.$recursiveAnchor === true) {
    if (anchor === null) {
      return schema
    }

    return anchor
  }

  if (anchor !== null) {
    return schema
  }

  return anchor
}

const innerValidate = async (
  mode: ValidateOutputMode,
  schema: Schema,
  instance: JSONValue,
  options: ResolverOptions,
  context: SchemaContext,
  instancePointer: Pointer,
  schemaPointer: Pointer,
  evaluatedPointers: Set<string>
): Promise<ValidationResult> => {
  /*
   * (1) Enter the context of the schema if the schema has an id.
   */
  const schemaId: string | null = getSchemaId(context.metaschemaId, schema)
  const newContext: SchemaContext = schemaId === null
    ? context
    : {
      root: context.root,
      anchor: getAnchor(schema, context.anchor),
      evaluationScopes: context.evaluationScopes,
      metaschemaId: context.metaschemaId,
      scope: context.scope === null
        ? schemaId : uriResolve(context.scope, schemaId)
    }

  /*
   * (2) Resolve any $ref keyword, if there is one at all,
   * before proceeding any further.
   */
  const resolution: ReferenceResolution | null =
    await resolveObjectRef(schema, newContext, schemaPointer, options)

  // We can't proceed if the resolution failed
  if (resolution === null) {
    return fail(mode, 'The resolution failed',
      schemaPointer, instancePointer, schemaId)
  }

  /*
   * (3) Validate boolean schemas.
   */

  // If the schema is a boolean, then the result of
  // the validation is the schema value. We don't
  // need to continue any further.
  if (typeof resolution.schema === 'boolean') {
    if (resolution.schema) {
      return ok(mode,
        resolution.keywordLocation,
        instancePointer,
        resolution.context.scope)
    }

    return fail(mode, 'The schema is a falsy boolean',
      resolution.keywordLocation,
      instancePointer,
      resolution.context.scope)
  }

  // This is the recursion callback that any keyword handler
  // that needs to recurse will call. It is a wrapper around
  // this same validate function, ensuring that we pass the right
  // validation options and context, etc so that the keyword
  // handlers don't have to worry about all those details.
  const recurse: SchemaValidator =
    async (subschema: Schema,
      subinstance: JSONValue,
      subinstancePointer: Pointer,
      subschemaPointer: Pointer,
      subevaluatedPointers: Set<string>): Promise<ValidationResult> => {
      return innerValidate(
        mode, subschema, subinstance, options,
        resolution.context, subinstancePointer,
        subschemaPointer, subevaluatedPointers)
    }

  /*
   * (4) Validate object schemas.
   */

  const metaschemaId: string = resolution.context.metaschemaId
  const entries: [string, JSONValue | undefined][] =
    Object.entries(resolution.schema)

  // We use this list to keep JSON Schema keys that we
  // want to evaluate after all the other ones, such
  // as "unevaluatedProperties" and "unevaluatedItems"
  const additionalKeys: string[] = []

  const serializedSchemaPointer: string =
    serializePointer(resolution.keywordLocation)
  const isNewEvaluationScope: boolean =
    context.evaluationScopes.has(serializedSchemaPointer)
  const evaluationScope: Set<string> =
    isNewEvaluationScope ? new Set() : evaluatedPointers

  let valid: boolean = true
  const validationResults: ValidationResult[] = []

  // Loop through the top level properties of the schema.
  for (const [ key, value ] of entries) {
    if (key === 'unevaluatedProperties' || key === 'unevaluatedItems') {
      additionalKeys.push(key)
      continue
    }

    // Special keywords do not have associated handlers
    if (key.startsWith('$')) {
      continue
    }

    const result: ValidationResult =
      await runHandler(mode, metaschemaId, key, value,
        instance, recurse, resolution, resolution.schema,
        instancePointer, resolution.keywordLocation, evaluationScope)
    if (!result.valid) {
      if (mode === ValidateOutputMode.Flag) {
        return result
      }

      valid = false
    } else if (mode !== ValidateOutputMode.Verbose) {
      continue
    }

    validationResults.push(result)
  }

  for (const key of additionalKeys) {
    const value: JSONValue | undefined = resolution.schema[key]
    const result: ValidationResult =
      await runHandler(mode, metaschemaId, key, value,
        instance, recurse, resolution, resolution.schema,
        instancePointer, resolution.keywordLocation, evaluationScope)
    if (!result.valid) {
      if (mode === ValidateOutputMode.Flag) {
        return result
      }

      valid = false
    } else if (mode !== ValidateOutputMode.Verbose) {
      continue
    }

    validationResults.push(result)
  }

  if (isNewEvaluationScope) {
    for (const pointer of evaluationScope) {
      evaluatedPointers.add(pointer)
    }
  }

  const outerResult: ValidationResult = {
    valid,
    errors: validationResults
  }

  return wrap(mode, outerResult,
    resolution.keywordLocation, instancePointer, resolution.context.scope)
}

const absorbDefinitions = (
  metaschemaId: string,
  scope: string | null,
  schema: Schema,
  cache: SchemaCache
): void => {
  if (typeof schema === 'boolean') {
    return
  }

  const definitions: JSONObject | undefined =
    schema.$defs ?? schema.definitions
  if (typeof definitions === 'undefined') {
    return
  }

  for (const value of Object.values(definitions)) {
    // We only care about definitions that are objects
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      continue
    }

    const id: string | null = getSchemaId(metaschemaId, value)
    const newScope: string | null =
      scope === null ? id : uriResolve(scope, id)
    if (newScope !== null && id !== null) {
      cache.setInline(newScope, value, schema)
    }

    // TODO: Check if $anchor's can happen anywhere
    // on a schema, and not just inside definitions,
    // as otherwise this implementation is incomplete.
    if ('$anchor' in value && typeof value.$anchor === 'string') {
      const uri: string = newScope === null
        ? `#${value.$anchor}`
        : uriResolve(newScope, `#${value.$anchor}`)
      cache.setInline(uri, value, schema)
    }

    absorbDefinitions(metaschemaId, newScope, value, cache)
  }
}

export const validate = async (
  mode: ValidateOutputMode,
  schema: Schema,
  instance: JSONValue,
  resolver: SchemaResolver
): Promise<ValidationResult> => {
  /*
   * (1) Prepare the schema context.
   */

  // Figure out some information about the JSON Schema document.
  const metaschemaId: string = getMetaSchemaIdFromSchema(schema)
  const schemaId: string | null = getSchemaId(metaschemaId, schema)

  // Create a new context based on the given JSON Schema document.
  // The context scope is the id of the JSON Schema document we will
  // validate with.
  const context: SchemaContext = {
    root: schema,
    anchor: null,
    evaluationScopes: new Set(),
    metaschemaId,
    scope: schemaId
  }

  /*
   * (2) Prepare the schema cache store.
   */

  // Setup a cache instance to be re-used through the document validation
  const cache: SchemaCache = new SchemaCache()

  // If the passed JSON Schema document has an id, then lets
  // add it to the cache store for future reference.
  if (schemaId !== null) {
    cache.setCanonical(schemaId, schema)
  }

  // Populate the cache with any JSON Schema "definitions"
  absorbDefinitions(context.metaschemaId, schemaId, schema, cache)

  /*
   * (3) Run the validator with the options we prepared before.
   */

  const schemaPointer: Pointer = []
  const instancePointer: Pointer = []

  const validationResult: ValidationResult =
    await innerValidate(mode, schema, instance, {
      anchored: false,
      resolver,
      cache
    }, context, instancePointer, schemaPointer, new Set())

  return wrap(mode, validationResult,
    schemaPointer, instancePointer, schemaId)
}
