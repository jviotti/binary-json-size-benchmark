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

import tap from 'tap'

import {
  isType,
  getTypeTag,
  Type
} from '../../../lib/encoder/any/types'

tap.test('Type.Null should match 0000 0111', (test) => {
  test.true(isType(Type.Null, 0b00000111))
  test.end()
})

tap.test('Type.Null should match 1100 0111', (test) => {
  test.true(isType(Type.Null, 0b11000111))
  test.end()
})

tap.test('Type.Null should match 1101 0111', (test) => {
  test.true(isType(Type.Null, 0b11010111))
  test.end()
})

tap.test('Type.Null should match 1111 0111', (test) => {
  test.true(isType(Type.Null, 0b11110111))
  test.end()
})

tap.test('Type.Null should not match 1111 `111', (test) => {
  test.false(isType(Type.Null, 0b11111111))
  test.end()
})

tap.test('getTypeTag() Null + 0000', (test) => {
  test.true(isType(Type.Null, getTypeTag(Type.Null, 0b00000000)))
  test.end()
})

tap.test('getTypeTag() Null + 0001', (test) => {
  test.true(isType(Type.Null, getTypeTag(Type.Null, 0b00000001)))
  test.end()
})

tap.test('getTypeTag() Null + 1111', (test) => {
  test.true(isType(Type.Null, getTypeTag(Type.Null, 0b00001111)))
  test.end()
})
