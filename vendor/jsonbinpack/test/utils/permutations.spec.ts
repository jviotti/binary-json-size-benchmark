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
  JSONValue
} from '../../lib/json'

import {
  generatePermutations
} from '../../lib/utils/permutation'

tap.test('should generate a 0-permutation', (test) => {
  const result: JSONValue[][] = generatePermutations()
  test.strictSame(result, [ [] ])
  test.end()
})

tap.test('should generate the 0-permutations of [ null ]', (test) => {
  const result: JSONValue[][] = generatePermutations([ null ])
  test.strictSame(result, [ [ null ] ])
  test.end()
})

tap.test('should generate a 1-permutation of no choice', (test) => {
  const result: JSONValue[][] = generatePermutations([])
  test.strictSame(result, [ [] ])
  test.end()
})

tap.test('should generate a 1-permutation of one choice', (test) => {
  const result: JSONValue[][] = generatePermutations([ null ])
  test.strictSame(result, [ [ null ] ])
  test.end()
})

tap.test('should generate a 1-permutation of two choices', (test) => {
  const result: JSONValue[][] = generatePermutations([ false, true ])
  test.strictSame(result, [
    [ false ],
    [ true ]
  ])
  test.end()
})

tap.test('should generate a 2-permutation of two choices each', (test) => {
  const result: JSONValue[][] = generatePermutations([ false, true ], [ false, true ])
  test.strictSame(result, [
    [ false, false ],
    [ false, true ],
    [ true, false ],
    [ true, true ]
  ])
  test.end()
})

tap.test('should generate a 2-permutation of different choices-sets', (test) => {
  const result: JSONValue[][] = generatePermutations([ false, true ], [ 'A' ])
  test.strictSame(result, [
    [ false, 'A' ],
    [ true, 'A' ]
  ])
  test.end()
})

tap.test('should generate a 3-permutation of different choices-sets', (test) => {
  const result: JSONValue[][] =
    generatePermutations([ false, true ], [ 1, 2, 3 ], [ 'AA', 'BB' ])
  test.strictSame(result, [
    [ false, 1, 'AA' ],
    [ false, 1, 'BB' ],
    [ false, 2, 'AA' ],
    [ false, 2, 'BB' ],
    [ false, 3, 'AA' ],
    [ false, 3, 'BB' ],
    [ true, 1, 'AA' ],
    [ true, 1, 'BB' ],
    [ true, 2, 'AA' ],
    [ true, 2, 'BB' ],
    [ true, 3, 'AA' ],
    [ true, 3, 'BB' ]
  ])
  test.end()
})
