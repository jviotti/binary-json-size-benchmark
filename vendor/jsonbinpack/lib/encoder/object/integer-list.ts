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

import {
  strict as assert
} from 'assert'

import ResizableBuffer from '../resizable-buffer'

import {
  BoundedOptions
} from '../integer/options'

import {
  BitsetResult,
  bitsetEncode,
  bitsetDecode
} from './bitset'

import {
  DecodeResult
} from '../index'

export const integerListEncode = (
  buffer: ResizableBuffer, offset: number,
  integers: number[], options: BoundedOptions
): number => {
  const bits: number =
    Math.floor(Math.log2(options.maximum - options.minimum) + 1)
  const result: boolean[] = []
  for (const integer of integers) {
    assert(integer >= options.minimum)
    assert(integer <= options.maximum)
    const value: number = integer - options.minimum

    // Find a more efficient way to do this
    const bitset: boolean[] = value.toString(2).padStart(bits, '0').split('')
      .map((digit) => {
        return Boolean(parseInt(digit, 10))
      })

    result.push(...bitset)
  }

  return bitsetEncode(buffer, offset, result)
}

export interface IntegerListResult extends DecodeResult {
  value: number[];
}

export const integerListDecode = (
  buffer: ResizableBuffer, offset: number, size: number, options: BoundedOptions
): IntegerListResult => {
  const range: number = options.maximum - options.minimum
  const bits: number = range === 0 ? 1 : Math.floor(Math.log2(range) + 1)
  const bitset: BitsetResult =
    bitsetDecode(buffer, offset, size * bits)

  const result: number[] = []
  let index: number = 0
  while (result.length < size) {
    const value: number = parseInt(
      bitset.value.slice(index, index + bits).map((digit: boolean) => {
        return digit ? '1' : '0'
      }).join(''), 2)
    result.push(value + options.minimum)
    index += bits
  }

  return {
    value: result,
    bytes: bitset.bytes
  }
}
