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

// Inspired by https://github.com/jacekv/varintjs/blob/master/varint.js

const MOST_SIGNIFICANT_BIT: bigint = BigInt(0b10000000)
const LEAST_SIGNIFICANT_BITS: bigint = BigInt(0b01111111)
const SHIFT: bigint = BigInt(7)
const ZERO: bigint = BigInt(0)

export const varintEncode = (buffer: ResizableBuffer, offset: number, value: bigint): number => {
  let accumulator: bigint = value
  let cursor: number = offset

  while (accumulator > LEAST_SIGNIFICANT_BITS) {
    cursor = buffer.writeUInt8(Number(
      (accumulator & LEAST_SIGNIFICANT_BITS) | MOST_SIGNIFICANT_BIT), cursor)
    accumulator >>= SHIFT
  }

  cursor = buffer.writeUInt8(Number(accumulator), cursor)
  return cursor - offset
}

export interface VarintDecodeResult {
  readonly value: bigint;
  readonly bytes: number;
}

export const varintDecode = (buffer: ResizableBuffer, offset: number): VarintDecodeResult => {
  let result: bigint = ZERO
  let cursor: number = offset

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const value: bigint = BigInt(buffer.readUInt8(cursor))
    result += ((value & LEAST_SIGNIFICANT_BITS) << (SHIFT * BigInt(cursor - offset)))
    cursor += 1
    if ((value & MOST_SIGNIFICANT_BIT) === ZERO) {
      break
    }
  }

  return {
    value: result,
    bytes: cursor - offset
  }
}
