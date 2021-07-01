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

tap.test('Type.Object should match 00000 010', (test) => {
  test.true(isType(Type.Object, 0b00000010))
  test.end()
})

tap.test('Type.Object should match 11000 010', (test) => {
  test.true(isType(Type.Object, 0b11000010))
  test.end()
})

tap.test('Type.Object should match 11010 010', (test) => {
  test.true(isType(Type.Object, 0b11010010))
  test.end()
})

tap.test('Type.Object should match 11110 010', (test) => {
  test.true(isType(Type.Object, 0b11110010))
  test.end()
})

tap.test('Type.Object should match 11111 010', (test) => {
  test.true(isType(Type.Object, 0b11111010))
  test.end()
})

tap.test('Type.Object should not match 11111 110', (test) => {
  test.false(isType(Type.Object, 0b11111110))
  test.end()
})

tap.test('getTypeTag() Object + 00000', (test) => {
  test.true(isType(Type.Object, getTypeTag(Type.Object, 0b00000000)))
  test.end()
})

tap.test('getTypeTag() Object + 00001', (test) => {
  test.true(isType(Type.Object, getTypeTag(Type.Object, 0b00000001)))
  test.end()
})

tap.test('getTypeTag() Object + 01111', (test) => {
  test.true(isType(Type.Object, getTypeTag(Type.Object, 0b00001111)))
  test.end()
})

// tap.test('getTypeTag() Object + 11111', (test) => {
  // test.true(isType(Type.Object, getTypeTag(Type.Object, 0b00011111)))
  // test.end()
// })
