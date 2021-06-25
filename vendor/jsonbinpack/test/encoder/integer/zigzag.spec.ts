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
import * as fc from 'fast-check'

import {
  zigzagEncode,
  zigzagDecode
} from '../../../lib/encoder/integer/zigzag'

tap.test('should encode 0 as 0', (test) => {
  test.is(zigzagEncode(BigInt(0)), BigInt(0))
  test.end()
})

tap.test('should encode -1 as 1', (test) => {
  test.is(zigzagEncode(BigInt(-1)), BigInt(1))
  test.end()
})

tap.test('should encode 1 as 2', (test) => {
  test.is(zigzagEncode(BigInt(1)), BigInt(2))
  test.end()
})

tap.test('should encode -2 as 3', (test) => {
  test.is(zigzagEncode(BigInt(-2)), BigInt(3))
  test.end()
})

tap.test('a positive integer should result in an even integer', (test) => {
  fc.assert(fc.property(fc.integer({
    min: 0
  }), (value: number): boolean => {
    return zigzagEncode(BigInt(value)) % BigInt(2) === BigInt(0)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('a negative integer should result in an odd integer', (test) => {
  fc.assert(fc.property(fc.integer({
    max: -1
  }), (value: number): boolean => {
    return zigzagEncode(BigInt(value)) % BigInt(2) === BigInt(1)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('encoding should result in a positive integer', (test) => {
  fc.assert(fc.property(fc.integer(), (value: number): boolean => {
    return zigzagEncode(BigInt(value)) >= BigInt(0)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('should decode a ZigZag encoded integer', (test) => {
  fc.assert(fc.property(fc.integer(), (value: number): boolean => {
    return zigzagDecode(zigzagEncode(BigInt(value))) === BigInt(value)
  }), {
    verbose: false
  })

  test.end()
})
