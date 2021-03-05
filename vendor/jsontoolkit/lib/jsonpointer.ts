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
  JSONObject,
  JSONValue,
  getElement
} from './json'

/*
 * Each reference token in a JSON Pointer corresponds to a
 * string key or a positive integer index.
 */
type ReferenceToken = string | number
export type Pointer = ReferenceToken[]

/*
 * A JSON Pointer is a Unicode string containing a sequence of zero
 * or more reference tokens, each prefixed by a '/' (%x2F) character.
 */
const TOKEN_SEPARATOR: string = '/'

/*
 * If the currently referenced value is a JSON array, the reference
 * token may contain exactly the single character "-", making the new
 * referenced value the (nonexistent) member after the last array element.
 */
const NONEXISTENT_CHARACTER: string = '-'

/*
 * The reference token may contain: characters comprised of digits
 * (see ABNF below; note that leading zeros are not allowed) that
 * represent an unsigned base-10 integer value.
 * See https://tools.ietf.org/html/rfc6901#section-4
 */
const isReferenceToken = (input: string): boolean => {
  // Don't match numbers with leading zeroes
  return !/^(0\d+)$/.test(input) &&

    // Match strings that don't include "~" or "/", or that
    // include "~0" or "~1".
    /^([^~/]|~0|~1)*$/.test(input)
}

/*
 * Check if a fragment string must be URI encoded.
 * Notice that JSON Pointer allows Unicode characters
 * inside fragments, so we must not encode those.
 * See https://tools.ietf.org/html/rfc3986#section-2
 */
const fragmentRequiresURIEncoding = (input: string): boolean => {
  return !/^([\u00AA-\uFFFF]|[!#$&-;=?-[\]_a-z~]|%[0-9a-fA-F]{2})*$/.test(input)
}

const parseReferenceToken = (reference: string): ReferenceToken | null => {
  // Evaluation of each reference token begins by decoding any escaped
  // character sequence. This is performed by first transforming any
  // occurrence of the sequence '~1' to '/', and then transforming any
  // occurrence of the sequence '~0' to '~'.
  // See https://tools.ietf.org/html/rfc6901
  const unescapedReference: string = reference
    .replace(/~1/g, TOKEN_SEPARATOR)
    .replace(/~0/g, '~')

  // Parse reference tokens consisting of numbers.
  // We assume that the pointer string has been validated
  // before calling this function, and that therefore the
  // number reference token does not contain leading zeroes.
  if (/^\d+$/.test(unescapedReference)) {
    // We can assume based on the regular expression that
    // the result of this call can never be NaN.
    return parseInt(unescapedReference, 10)
  }

  // Cannot use negative integer indexes.
  // The referenced value is array element with the
  // zero-based index identified by the token.
  // See https://tools.ietf.org/html/rfc6901#section-4
  if (/^-\d+$/.test(unescapedReference)) {
    return null
  }

  return unescapedReference
}

type ReferenceValidator = (reference: string) => boolean
const isPointerStringValid =
  (pointer: string, referencePredicate: ReferenceValidator): boolean => {
    if (pointer.length > 0 && !pointer.startsWith(TOKEN_SEPARATOR)) {
      return false
    }

    for (const referenceToken of pointer.split(TOKEN_SEPARATOR).slice(1)) {
      if (!referencePredicate(referenceToken)) {
        return false
      }
    }

    return true
  }

/*
 * A JSON Pointer is a Unicode string containing a sequence of zero or more
 * reference tokens, each prefixed by a '/' (%x2F) character. Because the
 * characters '~' (%x7E) and '/' (%x2F) have special meanings in JSON Pointer,
 * '~' needs to be encoded as '~0' and '/' needs to be encoded as '~1' when
 * these characters appear in a reference token.
 * See https://tools.ietf.org/html/rfc6901#section-3
 */
export const isPointerString = (pointer: string): boolean => {
  return isPointerStringValid(pointer, isReferenceToken)
}

// See https://tools.ietf.org/html/rfc6901#section-6
export const isPointerURIFragment = (fragment: string): boolean => {
  return fragment.startsWith('#') &&
    isPointerStringValid(fragment.slice(1), (reference: string): boolean => {
      return isReferenceToken(reference) &&
        !fragmentRequiresURIEncoding(reference)
    })
}

type ReferenceMapper = (reference: string) => string
const parsePointer =
  (pointer: string, referenceMap: ReferenceMapper): Pointer | null => {
    const tokens: Pointer = []

    if (pointer.length === 0) {
      return tokens
    }

    if (!pointer.startsWith(TOKEN_SEPARATOR)) {
      return null
    }

    for (const token of pointer.split(TOKEN_SEPARATOR).slice(1)) {
      const mappedToken = referenceMap(token)
      if (!isReferenceToken(mappedToken)) {
        return null
      }

      const parsedToken: ReferenceToken | null =
        parseReferenceToken(mappedToken)
      if (parsedToken === null) {
        return null
      }

      tokens.push(parsedToken)
    }

    return tokens
  }

export const parsePointerString = (pointer: string): Pointer | null => {
  return parsePointer(pointer, (reference: string) => {
    return reference
  })
}

export const parsePointerURIFragment = (fragment: string): Pointer | null => {
  if (!isPointerURIFragment(fragment)) {
    return null
  }

  return parsePointer(fragment.slice(1), (reference: string) => {
    return decodeURIComponent(reference)
  })
}

export interface AbsolutePointer {
  readonly pointer: Pointer;
  readonly baseUri: string | null;
}

export const parseURI = (input: string): AbsolutePointer => {
  const index: number = input.lastIndexOf('#')
  const prefix: string = index === -1 ? input : input.slice(0, index)
  const suffix: string | undefined = index === -1
    ? undefined : input.slice(index + 1)

  if (typeof suffix === 'undefined' || !isPointerString(suffix)) {
    return {
      baseUri: input,
      pointer: []
    }
  }

  return {
    baseUri: prefix.length > 0 ? prefix : null,
    pointer: parsePointerURIFragment(`#${suffix}`) ?? []
  }
}

export const serializePointer = (pointer: Pointer): string => {
  if (pointer.length === 0) {
    return ''
  }

  const referenceTokens: string[] = pointer.map((token: ReferenceToken) => {
    // Encode ~ and / back into ~0 and ~1
    return String(token).replace(/~/g, '~0').replace(/\//g, '~1')

      // Encode characters that need URI encoding
      // TODO: Make sure this list is complete *without*
      // including UTF-8 characters outside of the ASCII range
      .replace(/[[\]{}\n"'\\\r\t\f\s|^%]/g, (match: string) => {
        return encodeURIComponent(match)
      })
  })

  return `${TOKEN_SEPARATOR}${referenceTokens.join(TOKEN_SEPARATOR)}`
}

export const serializePointerAsFragment = (pointer: Pointer): string => {
  return `#${serializePointer(pointer)}`
}

// TODO: Implement setValue()

type JSONAccessor = (document: JSONObject | JSONValue[],
  key: string | number) => JSONValue | undefined

export const getValue = (
  document: JSONObject | JSONValue[],
  pointer: Pointer,
  accessor: JSONAccessor = getElement): JSONValue | undefined => {
  let value: JSONValue = document

  for (const token of pointer) {
    // Can't happen by definition in this operation.
    if (token === NONEXISTENT_CHARACTER) {
      return undefined
    }

    // eslint-disable-next-line no-undef-init
    let newValue: JSONValue | undefined = undefined

    if (Array.isArray(value) &&
      typeof token === 'number' &&
      token < value.length) {
      newValue = accessor(value, token)
    } else if (!Array.isArray(value) &&
      typeof value === 'object' &&
      value !== null &&
      typeof token !== 'number') {
      newValue = accessor(value, token)
    }

    if (typeof newValue === 'undefined') {
      return undefined
    }

    value = newValue
  }

  return value
}

export const removeValue = (
  document: JSONObject | JSONValue[],
  pointer: Pointer,
  accessor: JSONAccessor = getElement
): JSONObject | JSONValue[] | undefined => {
  if (pointer.length === 0) {
    if (!Array.isArray(document)) {
      Reflect.deleteProperty(document, '')
    }

    return document
  }

  const base: JSONValue | undefined =
    getValue(document, pointer.slice(0, pointer.length - 1), accessor)
  const property: string | number = pointer[pointer.length - 1]

  if (Array.isArray(base)) {
    if (property === NONEXISTENT_CHARACTER) {
      return document
    } else if (typeof property === 'string') {
      return undefined
    }

    base.splice(property, 1)
  } else if (typeof base === 'object' && base !== null) {
    Reflect.deleteProperty(base, property)
  }

  return document
}
