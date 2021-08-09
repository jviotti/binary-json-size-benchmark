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

import ResizableBuffer from '../resizable-buffer'

import {
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

import {
  DecodeResult
} from '../base'

import {
  zigzagDecode
} from '../integer/zigzag'

import {
  varintDecode,
  VarintDecodeResult
} from '../integer/varint'

export interface NumberResult extends DecodeResult {
  readonly value: JSONNumber;
  readonly bytes: number;
}

export const DOUBLE_VARINT_TUPLE = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): NumberResult => {
  const integralResult: VarintDecodeResult = varintDecode(buffer, offset)
  const pointResult: VarintDecodeResult =
    varintDecode(buffer, offset + integralResult.bytes)
  const integralValue: bigint = zigzagDecode(integralResult.value)
  const integral: string = integralValue.toString()
  const point: number = integralValue < BigInt(0)
    ? Number(zigzagDecode(pointResult.value)) + 1
    : Number(zigzagDecode(pointResult.value))
  const bytes: number = integralResult.bytes + pointResult.bytes

  if (point === 0 || (point === 1 && integralValue < BigInt(0))) {
    return {
      value: Number(integralValue),
      bytes
    }
  } else if (point < 0) {
    const zeroes: string = `0.${'0'.repeat(Math.abs(point) - 1)}`
    return {
      value: parseFloat(integralValue < 0
        ? `-${zeroes}${integral.slice(1)}`
        : `${zeroes}${integral}`),
      bytes
    }
  }

  return {
    value: parseFloat(`${integral.slice(0, point)}.${integral.slice(point)}`),
    bytes
  }
}
