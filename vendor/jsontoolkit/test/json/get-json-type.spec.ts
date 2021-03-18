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

import * as tap from 'tap'

import {
  JSONType,
  getJSONType
} from '../../lib/json'

tap.test('should get the type of a truthy boolean', (test) => {
  test.is(getJSONType(true), JSONType.boolean)
  test.end()
})

tap.test('should get the type of a falsy boolean', (test) => {
  test.is(getJSONType(false), JSONType.boolean)
  test.end()
})

tap.test('should get the type of null', (test) => {
  test.is(getJSONType(null), JSONType.null)
  test.end()
})

tap.test('should get the type of a positive integer', (test) => {
  test.is(getJSONType(5), JSONType.number)
  test.end()
})

tap.test('should get the type of a negative integer', (test) => {
  test.is(getJSONType(-5), JSONType.number)
  test.end()
})

tap.test('should get the type of a positive float', (test) => {
  test.is(getJSONType(5.4545), JSONType.number)
  test.end()
})

tap.test('should get the type of a negative float', (test) => {
  test.is(getJSONType(-5.4545), JSONType.number)
  test.end()
})

tap.test('should get the type of an empty string', (test) => {
  test.is(getJSONType(''), JSONType.string)
  test.end()
})

tap.test('should get the type of a blank string', (test) => {
  test.is(getJSONType('    '), JSONType.string)
  test.end()
})

tap.test('should get the type of a non-empty string', (test) => {
  test.is(getJSONType('foo'), JSONType.string)
  test.end()
})

tap.test('should get the type of an empty array', (test) => {
  test.is(getJSONType([]), JSONType.array)
  test.end()
})

tap.test('should get the type of a non-empty array', (test) => {
  test.is(getJSONType([ 1, 2, 3 ]), JSONType.array)
  test.end()
})

tap.test('should get the type of an empty object', (test) => {
  test.is(getJSONType({}), JSONType.object)
  test.end()
})

tap.test('should get the type of a non-empty object', (test) => {
  test.is(getJSONType({
    foo: 1
  }), JSONType.object)
  test.end()
})
