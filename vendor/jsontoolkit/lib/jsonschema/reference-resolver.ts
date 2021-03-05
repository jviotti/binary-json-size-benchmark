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
  getSchemaId,
  METASCHEMA_KEYWORD
} from './vocabularies'

import {
  Schema,
  ObjectSchema
} from './schema'

import {
  parseURI,
  AbsolutePointer,
  serializePointer,
  Pointer,
  getValue
} from '../jsonpointer'

import {
  JSONValue,
  JSONObject,
  getElement
} from '../json'

import {
  resolve as uriResolve
} from '../uri'

import {
  SchemaContext
} from './schema-context'

import SchemaCache from './schema-cache'

export type SchemaResolver = (uri: string) => Promise<Schema | null>;

export interface ResolverOptions {
  readonly cache: SchemaCache;
  readonly resolver: SchemaResolver;
  readonly anchored: boolean;
}

export interface ReferenceResolution {
  readonly schema: Schema;
  readonly keywordLocation: Pointer;
  readonly context: SchemaContext;
}

const localSchemaResolver = (
  schema: Schema,
  context: SchemaContext,
  pointer: Pointer,
  keywordLocation: Pointer
): ReferenceResolution | null => {
  /*
   * We can't resolve any pointer on boolean schemas.
   */
  if (typeof schema === 'boolean') {
    return null
  }

  /*
   * Traverse the pointer using a custom JSON accessor that
   * updates the context scope as we go deep in the document.
   */
  let scope: string | null = context.scope
  const value: JSONValue | undefined = getValue(schema, pointer, (
    document: JSONObject | JSONValue[],
    key: string | number
  ): JSONValue | undefined => {
    const result: JSONValue | undefined = getElement(document, key)

    // TODO: This should only happen if "result" is a JSON Schema
    // document, as "id" may appear in other places without
    // the semantics that we expect here.
    if (typeof result === 'object' &&
      !Array.isArray(result) &&
      result !== null) {
      const id: string | null = getSchemaId(context.metaschemaId, result)
      scope = scope === null ? id : uriResolve(scope, id)
    }

    return result
  })

  /*
   * We expect a JSON Schema out of this function. We can abort if the
   * pointer resolution result does not match the schema type.
   */
  if (typeof value !== 'boolean' && (
    typeof value !== 'object' || Array.isArray(value) || value === null)) {
    return null
  }

  return {
    schema: value,
    keywordLocation,
    context: scope === null
      ? context
      : {
        root: context.root,
        anchor: context.anchor,
        evaluationScopes: context.evaluationScopes,
        metaschemaId: context.metaschemaId,
        scope: context.scope === null ? scope : uriResolve(context.scope, scope)
      }
  }
}

const resolveSchemaReference = async (
  context: SchemaContext,
  reference: string,
  keywordLocation: Pointer,
  options: ResolverOptions
): Promise<ReferenceResolution | null> => {
  /*
   * (1) Parse the string pointer reference.
   */
  const schemaPointer: AbsolutePointer = parseURI(reference)

  /*
   * (2) If the reference is just a pointer fragment without
   * an underlying URI, then we can just locally resolve it
   * against the current root.
   */
  if (schemaPointer.baseUri === null) {
    if (!options.anchored || context.anchor === null) {
      if (context.scope === null) {
        return localSchemaResolver(
          context.root, context, schemaPointer.pointer, keywordLocation)
      }

      const scopeSchema: Schema | null = options.cache.getSchema(context.scope)
      const baseSchema: Schema = scopeSchema ?? context.root
      return localSchemaResolver(
        baseSchema, context, schemaPointer.pointer, keywordLocation)
    }

    // Make use of the anchor as the root & scope
    return localSchemaResolver(
      context.anchor, {
        root: context.anchor,
        anchor: context.anchor,
        evaluationScopes: context.evaluationScopes,
        metaschemaId: context.metaschemaId,
        scope: getSchemaId(context.metaschemaId, context.anchor)
      }, schemaPointer.pointer, keywordLocation)
  }

  /*
   * (3) Check if the reference is present as an entry of the
   * schema cache. This means that there is a schema whose id
   * potentially includes the "#" fragment, in which case we
   * don't need to resolve the pointer in the schema.
   */
  const currentScope: string | null =
    context.scope ?? getSchemaId(context.metaschemaId, context.root)
  const originalUri: string | null =
    currentScope === null ? reference : uriResolve(currentScope, reference)
  if (originalUri !== null && options.cache.hasSchema(originalUri)) {
    const newRoot: Schema | null = options.cache.getRootSchema(originalUri)
    const schema: Schema | null = options.cache.getSchema(originalUri)
    if (newRoot !== null && schema !== null) {
      return {
        schema,
        keywordLocation,
        context: {
          root: newRoot,
          anchor: context.anchor,
          evaluationScopes: context.evaluationScopes,
          scope: originalUri,
          metaschemaId: context.metaschemaId
        }
      }
    }
  }

  /*
   * (4) Resolve the reference base URI against the current scope,
   * in case the base URI is relative.
   */
  const absoluteUri: string | null = currentScope === null
    ? schemaPointer.baseUri
    : uriResolve(currentScope, schemaPointer.baseUri)
  if (absoluteUri === null) {
    return null
  }

  /*
   * (5) Fetch the base schema from the cache if its there,
   * and resolve the JSON Pointer, if any.
   */
  if (options.cache.hasSchema(absoluteUri)) {
    const newRoot: Schema | null = options.cache.getRootSchema(absoluteUri)
    const schema: Schema | null = options.cache.getSchema(absoluteUri)
    if (newRoot !== null && schema !== null) {
      return localSchemaResolver(schema, {
        root: newRoot,
        anchor: context.anchor,
        evaluationScopes: context.evaluationScopes,
        scope: absoluteUri,
        metaschemaId: context.metaschemaId
      }, schemaPointer.pointer, keywordLocation)
    }
  }

  /*
   * (6) We know that the schema is not in the cache, so lets
   * go ahead and try to resolve it using the resolver function that
   * the user passed.
   */
  const result: Schema | null = await options.resolver(absoluteUri)
  if (result === null) {
    return null
  }
  options.cache.setCanonical(absoluteUri, result)

  /*
   * (7) If we were able to resolve the schema, then resolve the
   * pointer fragment of the original reference, if any, on it.
   * The resulting schema is the new context.
   */
  return localSchemaResolver(result, {
    root: result,
    anchor: context.anchor,
    evaluationScopes: context.evaluationScopes,
    scope: absoluteUri,
    metaschemaId: context.metaschemaId
  }, schemaPointer.pointer, keywordLocation)
}

const mergeSchemas = (
  context: SchemaContext,
  schemaPointer: Pointer,
  schema: Schema,
  rest: ObjectSchema
): Schema => {
  // TODO: Use constants rather than hardcoding these strings
  const overrideSiblingKeywords: boolean = [
    'http://json-schema.org/draft-03/schema#',
    'http://json-schema.org/draft-04/schema#',
    'http://json-schema.org/draft-06/schema#',
    'http://json-schema.org/draft-07/schema#'
  ].includes(context.metaschemaId)

  if (overrideSiblingKeywords ||
    (typeof schema === 'boolean' && !schema)) {
    return schema
  }

  if (typeof schema === 'object' &&
    !Array.isArray(schema) &&
    schema.hasOwnProperty(METASCHEMA_KEYWORD)) {
    Reflect.deleteProperty(rest, METASCHEMA_KEYWORD)
  }

  if (Object.keys(rest).length === 0) {
    return schema
  }

  const conjunctions: Schema[] = rest.allOf ?? []
  conjunctions.push(schema)

  context.evaluationScopes.add(
    serializePointer(
      schemaPointer.concat([ 'allOf', conjunctions.length - 1 ])))

  return Object.assign({}, rest, {
    allOf: conjunctions
  })
}

export const resolveObjectRef = async (
  schema: Schema,
  context: SchemaContext,
  schemaPointer: Pointer,
  options: ResolverOptions
): Promise<ReferenceResolution | null> => {
  if (typeof schema === 'boolean') {
    return {
      schema,
      keywordLocation: schemaPointer,
      context
    }
  }

  const reference: string | undefined = schema.$ref ?? schema.$recursiveRef
  const isRecursiveRef: boolean = reference === schema.$recursiveRef

  // If the schema doesn't have a reference that we need
  // to resolve, then we don't need to do anything else.
  if (typeof reference === 'undefined') {
    return {
      schema,
      keywordLocation: schemaPointer,
      context
    }
  }

  // If there is a reference, but its invalid,
  // then we can't proceed.
  if (typeof reference !== 'string') {
    return null
  }

  const newSchemaPointer: Pointer =
    schemaPointer.concat(isRecursiveRef ? '$recursiveRef' : '$ref')

  // Resolve the reference on the current schema context
  const resolution: ReferenceResolution | null =
    await resolveSchemaReference(
      context, reference, newSchemaPointer, {
        cache: options.cache,
        resolver: options.resolver,
        anchored: isRecursiveRef
      })
  if (resolution === null) {
    return null
  }

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $ref,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $recursiveRef,
    ...rest
  }: ObjectSchema = schema

  const mergedSchema: Schema =
    mergeSchemas(
      resolution.context, resolution.keywordLocation, resolution.schema, rest)

  // Store the anchor schema if $recursiveAnchor is true
  const schemaId: string | null = getSchemaId(
    resolution.context.metaschemaId, mergedSchema)
  const newContext: SchemaContext =
    typeof mergedSchema !== 'boolean' &&
    mergedSchema.$recursiveAnchor === true &&
    schemaId !== null &&
    resolution.context.anchor === null
      ? {
        root: resolution.context.root,
        metaschemaId: resolution.context.metaschemaId,
        evaluationScopes: resolution.context.evaluationScopes,
        scope: resolution.context.scope,
        anchor: mergedSchema
      }
      : resolution.context

  // Recurse with the new schema and context in case there
  // is a further reference we need to resolve.
  return resolveObjectRef(
    mergedSchema, newContext, resolution.keywordLocation, options)
}
