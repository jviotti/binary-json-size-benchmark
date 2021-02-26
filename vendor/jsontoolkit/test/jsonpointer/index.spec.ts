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

import * as tap from 'tap'

import {
  isPointerString,
  Pointer,
  parseURI,
  AbsolutePointer,
  isPointerURIFragment,
  serializePointerAsFragment,
  parsePointerURIFragment,
  getValue
} from '../../lib/jsonpointer'

import {
  JSONObject,
  JSONValue
} from '../../lib/json'

tap.test('should not allow ~ on a reference token with ~0', (test) => {
  test.false(isPointerString('/foo/~0~/a'))
  test.end()
})

tap.test('should parse an absolute pointer with a hash in the base', (test) => {
  const result: AbsolutePointer = parseURI(
    'http://localhost:1234/nested.json#foo#/allOf/0/type')
  test.is(result.baseUri, 'http://localhost:1234/nested.json#foo')
  test.strictSame(result.pointer, [ 'allOf', 0, 'type' ])
  test.end()
})

tap.test('should access an element with square and curly braces', (test) => {
  const value: JSONObject = {
    patternProperties: {
      '[0-9]{2,}': {
        type: 'boolean'
      }
    }
  }

  const pointerString: string =
    serializePointerAsFragment([ 'patternProperties', '[0-9]{2,}', 'type' ])
  const pointer: Pointer | null = parsePointerURIFragment(pointerString)
  if (pointer === null) {
    test.bailout('Pointer is invalid')
    return
  }

  const result: JSONValue | undefined = getValue(value, pointer)
  test.is(result, 'boolean')
  test.end()
})

tap.test('should access an element with a new line', (test) => {
  const value: JSONObject = {
    foo: {
      'foo\nbar': 1
    }
  }

  const pointerString: string =
    serializePointerAsFragment([ 'foo', 'foo\nbar' ])
  const pointer: Pointer | null = parsePointerURIFragment(pointerString)
  if (pointer === null) {
    test.bailout('Pointer is invalid')
    return
  }

  const result: JSONValue | undefined = getValue(value, pointer)
  test.is(result, 1)
  test.end()
})

tap.test(
  'should access an element with a new line and a UTF-16 surrogate pair',
  (test) => {
    const value: JSONObject = {
      foo: {
        '🐲foo\nbar': 1
      }
    }

    const pointerString: string =
      serializePointerAsFragment([ 'foo', '🐲foo\nbar' ])
    const pointer: Pointer | null = parsePointerURIFragment(pointerString)
    if (pointer === null) {
      test.bailout('Pointer is invalid')
      return
    }

    const result: JSONValue | undefined = getValue(value, pointer)
    test.is(result, 1)
    test.end()
  })

tap.test('should allow pure UTF-16 fragments', (test) => {
  const value: JSONObject = {
    foo: {
      '🐲': 1
    }
  }

  const pointer: Pointer | null = parsePointerURIFragment('#/foo/🐲')
  if (pointer === null) {
    test.bailout('Pointer is invalid')
    return
  }

  const result: JSONValue | undefined = getValue(value, pointer)
  test.is(result, 1)
  test.end()
})

tap.test('should allow pure multi-character UTF-16 fragments', (test) => {
  const value: JSONObject = {
    foo: {
      '🐲🐲🐲': 1
    }
  }

  const pointer: Pointer | null = parsePointerURIFragment('#/foo/🐲🐲🐲')
  if (pointer === null) {
    test.bailout('Pointer is invalid')
    return
  }

  const result: JSONValue | undefined = getValue(value, pointer)
  test.is(result, 1)
  test.end()
})

tap.test(
  'should allow partial UTF-16 fragments that do not need encoding',
  (test) => {
    const value: JSONObject = {
      foo: {
        'a🐲a': 1
      }
    }

    const pointer: Pointer | null = parsePointerURIFragment('#/foo/a🐲a')
    if (pointer === null) {
      test.bailout('Pointer is invalid')
      return
    }

    const result: JSONValue | undefined = getValue(value, pointer)
    test.is(result, 1)
    test.end()
  })

tap.test('should allow partial UTF-16 fragments that need encoding', (test) => {
  const value: JSONObject = {
    foo: {
      '^🐲': 1
    }
  }

  const pointer: Pointer | null = parsePointerURIFragment('#/foo/%5E🐲')
  if (pointer === null) {
    test.bailout('Pointer is invalid')
    return
  }

  const result: JSONValue | undefined = getValue(value, pointer)
  test.is(result, 1)
  test.end()
})

tap.test(
  'should fail to consider UTF-16 fragments with non encoded values',
  (test) => {
    test.false(isPointerURIFragment('#/foo/^🐲'))
    test.end()
  })

tap.test('should consider UTF-16 fragments with non encoded values', (test) => {
  test.true(isPointerURIFragment('#/foo/%5E🐲'))
  test.end()
})
