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
  Schema,
  ObjectSchema
} from '../schema'

import {
  JSONValue
} from '../../json'

import {
  SchemaValidator,
  ValidationResult,
  ValidateOutputMode
} from '../validate'

import {
  Pointer
} from '../../jsonpointer'

import * as METASCHEMA_DRAFT2019_09 from
  '../schemas/json-schema.org/draft/2019-09/schema.json'

// TODO: We shouldn't import these vocabularies here as they
// are not considered "meta-schemas" according to the spec.
// We should pre-load them in the cache or in the resolver in some
// other way.
import * as METASCHEMA_DRAFT2019_09_CORE from
  '../schemas/json-schema.org/draft/2019-09/meta/core.json'
import * as METASCHEMA_DRAFT2019_09_APPLICATOR from
  '../schemas/json-schema.org/draft/2019-09/meta/applicator.json'
import * as METASCHEMA_DRAFT2019_09_VALIDATION from
  '../schemas/json-schema.org/draft/2019-09/meta/validation.json'
import * as METASCHEMA_DRAFT2019_09_META_DATA from
  '../schemas/json-schema.org/draft/2019-09/meta/meta-data.json'
import * as METASCHEMA_DRAFT2019_09_FORMAT from
  '../schemas/json-schema.org/draft/2019-09/meta/format.json'
import * as METASCHEMA_DRAFT2019_09_CONTENT from
  '../schemas/json-schema.org/draft/2019-09/meta/content.json'

import * as METASCHEMA_DRAFT7 from
  '../schemas/json-schema.org/draft-07/schema.json'
import * as METASCHEMA_DRAFT6 from
  '../schemas/json-schema.org/draft-06/schema.json'
import * as METASCHEMA_DRAFT4 from
  '../schemas/json-schema.org/draft-04/schema.json'
import * as METASCHEMA_DRAFT3 from
  '../schemas/json-schema.org/draft-03/schema.json'

import * as draft201909 from './draft2019-09'
import * as draft7 from './draft7'
import * as draft6 from './draft6'
import * as draft4 from './draft4'
import * as draft3 from './draft3'

// TODO: Group these arguments and try to
// simplify this horrendous function signature
export type KeywordHandler = (
  mode: ValidateOutputMode,
  arg: JSONValue,
  instance: JSONValue,
  schema: ObjectSchema,
  scope: string | null,
  validate: SchemaValidator,
  instancePointer: Pointer,
  schemaPointer: Pointer,
  keywordPointer: Pointer,
  evaluatedPointers: Set<string>
) => Promise<ValidationResult>

interface MetaSchemaDefinition {
  readonly schema: ObjectSchema;
  readonly handlers: Record<string, KeywordHandler>;
}

const METASCHEMAS: Record<string, MetaSchemaDefinition> = {
  [METASCHEMA_DRAFT2019_09.$id]: {
    schema: METASCHEMA_DRAFT2019_09,
    handlers: draft201909
  },
  [METASCHEMA_DRAFT2019_09_CORE.$id]: {
    schema: METASCHEMA_DRAFT2019_09_CORE,
    handlers: draft201909
  },
  [METASCHEMA_DRAFT2019_09_APPLICATOR.$id]: {
    schema: METASCHEMA_DRAFT2019_09_APPLICATOR,
    handlers: draft201909
  },
  [METASCHEMA_DRAFT2019_09_VALIDATION.$id]: {
    schema: METASCHEMA_DRAFT2019_09_VALIDATION,
    handlers: draft201909
  },
  [METASCHEMA_DRAFT2019_09_META_DATA.$id]: {
    schema: METASCHEMA_DRAFT2019_09_META_DATA,
    handlers: draft201909
  },
  [METASCHEMA_DRAFT2019_09_FORMAT.$id]: {
    schema: METASCHEMA_DRAFT2019_09_FORMAT,
    handlers: draft201909
  },
  [METASCHEMA_DRAFT2019_09_CONTENT.$id]: {
    schema: METASCHEMA_DRAFT2019_09_CONTENT,
    handlers: draft201909
  },

  // TODO: Support HTTP variants (along with HTTPS)
  // for compatibility purposes (and write tests for it)

  [METASCHEMA_DRAFT7.$id]: {
    schema: METASCHEMA_DRAFT7,
    handlers: draft7
  },
  [METASCHEMA_DRAFT6.$id]: {
    schema: METASCHEMA_DRAFT6,
    handlers: draft6
  },
  [METASCHEMA_DRAFT4.id]: {
    schema: METASCHEMA_DRAFT4,
    handlers: draft4
  },
  [METASCHEMA_DRAFT3.id]: {
    schema: METASCHEMA_DRAFT3,
    handlers: draft3
  }
}

export const METASCHEMA_KEYWORD: string = '$schema'

export const getHandler =
  (metaschema: string, keyword: string): KeywordHandler | null => {
    const base: MetaSchemaDefinition = METASCHEMAS[metaschema]

    // These keyword are reserved in JavaScript
    const handler: KeywordHandler | undefined =
      keyword === 'enum' ||
      keyword === 'extends' ||
      keyword === 'const' ||
      keyword === 'if'
        ? base.handlers[`_${keyword}`]
        : base.handlers[keyword]
    if (typeof handler === 'undefined') {
      return null
    }

    return handler
  }

export const getSchemaId =
  (metaschema: string, schema: Schema): string | null => {
    if (typeof schema === 'boolean') {
      return null
    }

    if (metaschema === METASCHEMA_DRAFT3.id ||
      metaschema === METASCHEMA_DRAFT4.id) {
      return schema.id === undefined ? null : schema.id
    }

    return schema.$id === undefined ? null : schema.$id
  }

export const DEFAULT_METASCHEMA: string = METASCHEMA_DRAFT6.$id

export const getMetaSchemaById = (id: string): Schema | null => {
  const metaschema: MetaSchemaDefinition | undefined = METASCHEMAS[id]
  if (typeof metaschema === 'undefined') {
    return null
  }

  return metaschema.schema
}

/*
 * Get the metaschema id from a given JSON Schema document,
 * providing a sane default if the exact one can't be determined.
 */
export const getMetaSchemaIdFromSchema = (schema: Schema): string => {
  // We can't do much more than a default for a boolean schema
  // as it doesn't have an $schema keyword by definition.
  if (typeof schema === 'boolean') {
    return DEFAULT_METASCHEMA
  }

  // TODO: Use METASCHEMA_KEYWORD from vocabularies module
  // instead of duplicating "$schema"
  return schema.$schema ?? DEFAULT_METASCHEMA
}
