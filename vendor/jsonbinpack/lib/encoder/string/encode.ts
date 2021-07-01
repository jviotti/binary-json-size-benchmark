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

import {
  brotliCompressSync
} from 'zlib'

import ResizableBuffer from '../resizable-buffer'

import {
  JSONString,
  JSONNumber
} from '../../json'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT
} from '../integer/encode'

import {
  UINT8_MIN,
  UINT8_MAX
} from '../../utils/limits'

import {
  Type
} from '../any/types'

import {
  NoOptions,
  BoundedOptions,
  RoofOptions,
  FloorOptions,
  SizeOptions,
  DictionaryOptions
} from './options'

import {
  EncodingContext
} from '../context'

const STRING_ENCODING: BufferEncoding = 'utf8'

const maybeWriteSharedPrefix = (
  buffer: ResizableBuffer, offset: number,
  value: JSONString, context: EncodingContext
): number => {
  return context.strings.has(value)
    ? BOUNDED_8BITS__ENUM_FIXED(buffer, offset, Type.SharedString, {
      minimum: Type.SharedString,
      maximum: Type.SharedString
    }, context)
    : 0
}

const writeMaybeSharedString = (
  buffer: ResizableBuffer, offset: number,
  value: JSONString, length: number, context: EncodingContext
): number => {
  if (context.strings.has(value)) {
    return SHARED_STRING_POINTER_RELATIVE_OFFSET(buffer, offset, value, {
      size: length
    }, context)
  }

  return UTF8_STRING_NO_LENGTH(buffer, offset, value, {
    size: length
  }, context)
}

const writeRawString = (
  buffer: ResizableBuffer, offset: number,
  value: string, context: EncodingContext
): number => {
  // Write shared prefix
  const prefixBytes: number =
    maybeWriteSharedPrefix(buffer, offset, value, context)

  // Write string length
  const length: number = Buffer.byteLength(value, STRING_ENCODING)

  const lengthBytes: number = prefixBytes > 0
    // The string is shared
    ? FLOOR__ENUM_VARINT(buffer, offset + prefixBytes, length, {
      minimum: 0
    }, context)

    // The string is not shared
    : ARBITRARY__ZIGZAG_VARINT(buffer, offset + prefixBytes,
      -length - 1, {}, context)

  // Write the string
  const stringBytes: number = writeMaybeSharedString(
    buffer, offset + prefixBytes + lengthBytes, value, length, context)

  return prefixBytes + lengthBytes + stringBytes
}

export const STRING_BROTLI = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  _options: NoOptions, context: EncodingContext
): number => {
  const compressed = brotliCompressSync(Buffer.from(value))
  const bytes = FLOOR__ENUM_VARINT(buffer, offset, compressed.length, {
    minimum: 0
  }, context)
  return bytes + buffer.writeBuffer(offset + bytes, compressed)
}

export const STRING_DICTIONARY_COMPRESSOR = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  options: DictionaryOptions, context: EncodingContext
): number => {
  const WORD_DELIMITER: string = ' '
  let unmatched: string[] = []

  // Write the length of whole string
  const length: number = Buffer.byteLength(value, STRING_ENCODING)
  let bytes = FLOOR__ENUM_VARINT(buffer, offset, length, {
    minimum: 0
  }, context)

  if (length === 0) {
    return bytes
  }

  for (const fragment of value.split(WORD_DELIMITER)) {
    const entry: number | undefined = options.dictionary[fragment]
    if (typeof entry === 'undefined') {
      unmatched.push(fragment)
      continue
    }

    // Ensure the index matches the dictionary
    assert(options.index[entry] === fragment)

    // Flush unmatched section
    if (unmatched.length > 0) {
      bytes += writeRawString(buffer, offset + bytes,
        unmatched.join(WORD_DELIMITER), context)
      unmatched = []
    }

    // Write the dictionary entry index + 1
    assert(entry >= 0)
    bytes += ARBITRARY__ZIGZAG_VARINT(
      buffer, offset + bytes, entry + 1, {}, context)
  }

  // Flush unmatched section
  if (unmatched.length > 0) {
    bytes += writeRawString(buffer, offset + bytes,
      unmatched.join(WORD_DELIMITER), context)
  }

  return bytes
}

export const URL_PROTOCOL_HOST_REST = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  _options: NoOptions, context: EncodingContext
): number => {
  const url = new URL(value)
  const protocolBytes: number = ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, offset, url.protocol, {}, context)
  const hostBytes: number = ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, offset + protocolBytes, url.host, {}, context)
  const rest: string = value.replace(`${url.protocol}//${url.host}`, '')
  const restBytes: number = ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, offset + protocolBytes + hostBytes, rest, {}, context)
  return protocolBytes + hostBytes + restBytes
}

export const RFC3339_DATE_INTEGER_TRIPLET = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  _options: NoOptions, _context: EncodingContext
): number => {
  const date: number[] = []
  for (const fragment of value.split('-')) {
    date.push(parseInt(fragment, 10))
  }

  assert(date.length === 3)

  // As according to RFC3339: Internet Protocols MUST generate four digit years in dates.
  assert(date[0] >= 0 && date[0] <= 9999)
  assert(date[1] >= 1 && date[1] <= 12)
  assert(date[2] >= 1 && date[2] <= 31)

  const monthOffset: number = buffer.writeUInt16LE(date[0], offset)
  const dayOffset: number = buffer.writeUInt8(date[1], monthOffset)
  return buffer.writeUInt8(date[2], dayOffset) - offset
}

export const BOUNDED__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: BoundedOptions, context: EncodingContext
): number => {
  assert(options.minimum >= UINT8_MIN)
  assert(options.maximum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX - 1)
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(length <= options.maximum)

  const prefixBytes: number = maybeWriteSharedPrefix(buffer, offset, value, context)
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, offset + prefixBytes, length + 1, {
    minimum: options.minimum,
    maximum: options.maximum + 1
  }, context)
  const result: number = writeMaybeSharedString(
    buffer, offset + prefixBytes + bytesWritten, value, length, context)
  return result + prefixBytes + bytesWritten
}

export const BOUNDED__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: BoundedOptions, context: EncodingContext
): number => {
  assert(options.minimum >= 0)
  assert(options.minimum <= options.maximum)
  assert(options.maximum >= 0)
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(length >= options.minimum)
  assert(length <= options.maximum)

  const prefixBytes: number = maybeWriteSharedPrefix(buffer, offset, value, context)
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, offset + prefixBytes, length + 1, {
    minimum: options.minimum,
    maximum: options.maximum + 1
  }, context)

  const result: number = writeMaybeSharedString(
    buffer, offset + prefixBytes + bytesWritten, value, length, context)
  return result + prefixBytes + bytesWritten
}

export const ROOF__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: RoofOptions, context: EncodingContext
): number => {
  assert(options.maximum >= 0)
  assert(options.maximum <= UINT8_MAX - 1)
  return BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, {
    minimum: 0,
    maximum: options.maximum
  }, context)
}

export const ROOF__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: RoofOptions, context: EncodingContext
): number => {
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(options.maximum >= 0)
  assert(length <= options.maximum)
  const prefixBytes: number = maybeWriteSharedPrefix(buffer, offset, value, context)
  const bytesWritten: number = ROOF__MIRROR_ENUM_VARINT(buffer, offset + prefixBytes, length - 1, options, context)
  const result: number = writeMaybeSharedString(
    buffer, offset + prefixBytes + bytesWritten, value, length, context)
  return result + prefixBytes + bytesWritten
}

export const UTF8_STRING_NO_LENGTH = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  options: SizeOptions, context: EncodingContext
): number => {
  assert(options.size >= 0)
  const bytesWritten: number = buffer.write(
    value, offset, options.size, STRING_ENCODING)
  context.strings.set(value, offset)
  return bytesWritten
}

export const SHARED_STRING_POINTER_RELATIVE_OFFSET = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  _options: SizeOptions, context: EncodingContext
): number => {
  const stringOffset: number | undefined = context.strings.get(value)
  assert(typeof stringOffset !== 'undefined')
  return FLOOR__ENUM_VARINT(buffer, offset, offset - stringOffset, {
    minimum: 0
  }, context)
}

export const FLOOR__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  options: FloorOptions, context: EncodingContext
): number => {
  assert(options.minimum >= 0)
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(length >= options.minimum)

  /*
   * (1) Write 0x00 if shared, else do nothing
   */
  const prefixBytes: number = maybeWriteSharedPrefix(buffer, offset, value, context)

  /*
   * (2) Write length of the string + 1
   */
  const lengthBytes: number = FLOOR__ENUM_VARINT(
    buffer, offset + prefixBytes, length + 1, options, context)

  /*
   * (3) Write offset if shared, else write plain string
   */
  const bytesWritten: number = writeMaybeSharedString(
    buffer, offset + prefixBytes + lengthBytes, value, length, context)

  return bytesWritten + prefixBytes + lengthBytes
}

export const ARBITRARY__PREFIX_LENGTH_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString,
  _options: NoOptions, context: EncodingContext
): number => {
  return FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
    minimum: 0
  }, context)
}
