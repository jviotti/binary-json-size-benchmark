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
  ValidationResult,
  ValidateOutputMode
} from './validate'

import {
  Pointer,
  serializePointerAsFragment,
  parsePointerURIFragment
} from '../jsonpointer'

/*
 * A validation result that maps to the "flag" output structure.
 * It consists of a single "valid" boolean without additional
 * metadata nor nested results.
 */
const getFlagResult = (valid: boolean): ValidationResult => {
  return {
    valid
  }
}

/*
 * Return the additional metadata that may be attached
 * to a validation result, independently of whether the
 * result is failure or success.
 */
const getResultMetadata = (
  scope: string | null,
  keyword?: Pointer | string,
  instance?: Pointer | string
): Partial<ValidationResult> => {
  // We might not be able to extract any metadata
  if (keyword === undefined || instance === undefined) {
    return {}
  }

  const parsedKeywordLocation: Pointer | null =
    typeof keyword === 'string'
      ? parsePointerURIFragment(keyword)
      : keyword

  // This should never happen at this point, but
  // we still need to deal with this case somehow
  // in order to keep TypeScript happy.
  if (parsedKeywordLocation === null) {
    throw new Error('Keyword location cannot be parsed')
  }

  const fragments: Set<string | number> = new Set(parsedKeywordLocation)
  const hasReferences: boolean =
    fragments.has('$ref') || fragments.has('$recursiveRef')

  const keywordLocation: string =
    serializePointerAsFragment(parsedKeywordLocation)
  const extra: Partial<ValidationResult> =
    scope === null || !hasReferences ? {} : {
      absoluteKeywordLocation: `${scope}${keywordLocation}`
    }

  return {
    keywordLocation,
    instanceLocation: typeof instance === 'string'
      ? instance
      : serializePointerAsFragment(instance),
    ...extra
  }
}

/*
 * A validation result that maps to the "basic" output structure.
 * It consists of error metadata (instance and keyword locations)
 * and a string error message, without a "valid" boolean flag
 * and without nested validation results.
 */
const getBasicResult = (
  message: string | null,
  scope: string | null,
  keyword: Pointer | string,
  instance: Pointer | string
): Partial<ValidationResult> => {
  const description: Partial<ValidationResult> = message === null ? {} : {
    error: message
  }

  return {
    ...description,
    ...getResultMetadata(scope, keyword, instance)
  }
}

/*
 * A validation result that maps to the "verbose" output structure.
 * The result contains a single validation result (i.e. a leaf),
 * it contains a "valid" boolean, and related location metadata.
 */
const getVerboseLeafResult = (
  valid: boolean,
  message: string | null,
  keyword: Pointer | string,
  instance: Pointer | string,
  scope: string | null
): ValidationResult => {
  return {
    ...getFlagResult(valid),
    ...getBasicResult(message, scope, keyword, instance)
  }
}

/*
 * An validation result that is meant to be completed later.
 * An incomplete result is only lacking the related
 * meadata such as instance and keyword location pointers.
 */
const getIncompleteResult = (
  valid: boolean, message?: string
): ValidationResult => {
  const rest: Partial<ValidationResult> = valid ? {} : {
    error: message ?? 'A subschema had errors'
  }

  return {
    ...getFlagResult(valid),
    ...rest
  }
}

const assertion = (
  mode: ValidateOutputMode,
  valid: boolean,
  message: string | null,
  keyword?: Pointer,
  instance?: Pointer,
  scope?: string | null
): ValidationResult => {
  if (mode === ValidateOutputMode.Flag) {
    return getFlagResult(valid)
  } else if (keyword === undefined || instance === undefined) {
    return valid || message === null
      ? getIncompleteResult(valid)
      : getIncompleteResult(valid, message)
  }

  return getVerboseLeafResult(
    valid, message, keyword, instance, scope ?? null)
}

/*
 * A validation helper that represent success.
 * If the optional arguments are omitted, then the result is
 * an incomplete validation result meant to be completed later.
 */
export const ok = (
  mode: ValidateOutputMode,
  keyword?: Pointer,
  instance?: Pointer,
  scope?: string | null
): ValidationResult => {
  return assertion(mode, true, null, keyword, instance, scope)
}

/*
 * A validation helper that represent failure.
 * If the optional arguments are omitted, then the result is
 * an incomplete validation result meant to be completed later.
 */
export const fail = (
  mode: ValidateOutputMode,
  message: string,
  keyword?: Pointer,
  instance?: Pointer,
  scope?: string | null
): ValidationResult => {
  return assertion(mode, false, message, keyword, instance, scope)
}

// TODO: Refactor and simplify this whole function
export const wrap = (
  mode: ValidateOutputMode,
  result: ValidationResult,
  keyword: Pointer,
  instance: Pointer,
  scope: string | null
): ValidationResult => {
  if (mode === ValidateOutputMode.Flag) {
    return getFlagResult(result.valid)
  }

  if (mode === ValidateOutputMode.Basic) {
    if (result.valid) {
      return {
        ...getFlagResult(true),
        errors: []
      }
    }

    if (!('errors' in result)) {
      const {
        valid,
        ...rest
      } = result
      return {
        ...getFlagResult(valid),
        errors: [
          {
            ...getResultMetadata(scope, keyword, instance),
            ...rest
          }
        ]
      }
    }

    const metadata: Partial<ValidationResult> =
      getResultMetadata(scope, keyword, instance)

    const errors: Partial<ValidationResult>[] = [
      {
        // TODO: Get rid of this default
        error: result.error ?? 'A subschema had errors',
        ...metadata
      }
    ]

    for (const error of result.errors ?? []) {
      if ('errors' in error) {
        errors.push(...error.errors)
      } else {
        if (metadata.instanceLocation === error.instanceLocation &&

          // TODO: Get rid of this default
          error.error === 'A subschema had errors') {
          continue
        }

        if (metadata.keywordLocation === error.keywordLocation &&
          metadata.instanceLocation === error.instanceLocation &&
          metadata.absoluteKeywordLocation === error.absoluteKeywordLocation) {
          continue
        }

        Reflect.deleteProperty(error, 'valid')
        errors.push(error)
      }
    }

    return {
      ...getFlagResult(result.valid),
      errors
    }
  }

  const metadata: Partial<ValidationResult> =
    getResultMetadata(scope, keyword, instance)

  if ('keywordLocation' in metadata &&
    'instanceLocation' in metadata &&
    !('keywordLocation' in result) &&
    !('instanceLocation' in result)) {
    return {
      ...result,
      ...metadata
    }
  }

  if (metadata.keywordLocation === result.keywordLocation &&
    metadata.instanceLocation === result.instanceLocation &&
    metadata.absoluteKeywordLocation === result.absoluteKeywordLocation) {
    return result
  }

  const completeResult: ValidationResult = {
    ...metadata,
    ...result
  }

  return {
    ...getFlagResult(result.valid),
    errors: [ completeResult ],
    ...metadata
  }
}
