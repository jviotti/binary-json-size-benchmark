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

import fromExponential from 'from-exponential'
import ResizableBuffer from '../resizable-buffer'

import {
  zigzagEncode
} from '../integer/zigzag'

import {
  varintEncode
} from '../integer/varint'

import {
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

import {
  EncodingContext
} from '../context'

const stringPrefixCount = (value: string, prefix: string): number => {
  let count: number = 0

  for (const character of value) {
    if (character === prefix) {
      count += 1
    } else {
      break
    }
  }

  return count
}

export const DOUBLE_VARINT_TUPLE = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  _options: NoOptions, _context: EncodingContext
): number => {
  const valueString: string = fromExponential(value)
  const pointIndex: number = valueString.startsWith('-')
    ? valueString.indexOf('.') - 1
    : valueString.indexOf('.')
  const point: number = pointIndex > 0 ? pointIndex : 0
  assert(point >= 0)
  const integralString: string = valueString.replace('.', '')
  const zeroPrefix: number = stringPrefixCount(integralString.startsWith('-')
    ? integralString.slice(1) : integralString, '0')
  assert(zeroPrefix >= 0)

  const integralBytes: number =
    varintEncode(buffer, offset, zigzagEncode(BigInt(integralString)))
  const pointValue: bigint = zeroPrefix === 0 || zeroPrefix === integralString.length
    ? zigzagEncode(BigInt(point))
    : zigzagEncode(BigInt(-zeroPrefix - (valueString.startsWith('-') ? 1 : 0)))
  return integralBytes + varintEncode(buffer, offset + integralBytes, pointValue)
}
