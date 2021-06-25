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
  DecodeResult
} from '../index'

import {
  BYTE_BITS
} from '../../utils/limits'

const getBytesToStoreBits = (bits: number): number => {
  return ((bits + 7) & (-8)) / 8
}

export const bitsetEncode = (
  buffer: ResizableBuffer, offset: number, bits: boolean[]
): number => {
  if (bits.length === 0) {
    return 0
  }

  const bytes: number = getBytesToStoreBits(bits.length)
  let written: number = 0
  while (written < bytes) {
    const chunkIndex: number = written * BYTE_BITS
    const chunk: boolean[] = bits.slice(chunkIndex, chunkIndex + BYTE_BITS)

    let result: number = 0
    for (const [ index, bit ] of chunk.entries()) {
      if (bit) {
        result |= (1 << index)
      }
    }

    const currentOffset: number = offset + written
    written += buffer.writeUInt8(result >>> 0, currentOffset) - currentOffset
  }

  return written
}

export interface BitsetResult extends DecodeResult {
  value: boolean[];
}

export const bitsetDecode = (
  buffer: ResizableBuffer, offset: number, length: number
): BitsetResult => {
  if (length === 0) {
    return {
      value: [],
      bytes: 0
    }
  }

  const bytes: number = getBytesToStoreBits(length)
  const result: boolean[] = []

  let cursor: number = 0
  while (cursor < bytes) {
    const value: number = buffer.readUInt8(offset + cursor)

    let bit: number = 0
    while (result.length < length && bit < BYTE_BITS) {
      result.push(Boolean((1 << (result.length % BYTE_BITS)) & value))
      bit += 1
    }

    cursor += 1
  }

  return {
    value: result,
    bytes
  }
}
