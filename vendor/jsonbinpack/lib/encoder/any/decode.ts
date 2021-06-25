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
  JSONValue
} from '../../json'

import {
  UINT8_MIN,
  UINT8_MAX
} from '../../utils/limits'

import {
  NoOptions
} from './options'

import {
  DecodeResult
} from '../base'

import {
  EncodingType
} from '../encoding-type'

import {
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED,
  FLOOR__ENUM_VARINT
} from '../integer/decode'

import {
  StringResult,
  ARBITRARY__PREFIX_LENGTH_VARINT
} from '../string/decode'

import {
  NumberResult,
  DOUBLE_VARINT_TUPLE
} from '../number/decode'

import {
  ObjectResult,
  ARBITRARY_TYPED_KEYS_OBJECT
} from '../object/decode'

import {
  ArrayResult,
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX
} from '../array/decode'

import {
  Type
} from './types'

export interface AnyResult extends DecodeResult {
  readonly value: JSONValue;
  readonly bytes: number;
}

export const ANY__TYPE_PREFIX = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): AnyResult => {
  const tag: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
    minimum: UINT8_MIN,

    // TODO: Find a way to keep this automatically in sync with "Type"
    maximum: 11
  })

  if (tag.value === Type.Array) {
    const result: ArrayResult =
      UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset + tag.bytes, {
        prefixEncodings: []
      })

    return {
      value: result.value,
      bytes: tag.bytes + result.bytes
    }
  } else if (tag.value === Type.Object) {
    const result: ObjectResult =
      ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + tag.bytes, {
        keyEncoding: {
          type: EncodingType.String,
          encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
          options: {}
        },
        encoding: {
          type: EncodingType.Any,
          encoding: 'ANY__TYPE_PREFIX',
          options: {}
        }
      })

    return {
      value: result.value,
      bytes: tag.bytes + result.bytes
    }
  } else if (tag.value === Type.Null) {
    return {
      value: null,
      bytes: tag.bytes
    }
  } else if (tag.value === Type.True) {
    return {
      value: true,
      bytes: tag.bytes
    }
  } else if (tag.value === Type.False) {
    return {
      value: false,
      bytes: tag.bytes
    }
  } else if (tag.value === Type.SharedString) {
    const result: StringResult =
      ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset, {})
    return {
      value: result.value,
      bytes: result.bytes
    }
  } else if (tag.value === Type.String) {
    const result: StringResult =
      ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tag.bytes, {})
    return {
      value: result.value,
      bytes: tag.bytes + result.bytes
    }
  } else if (tag.value === Type.PositiveInteger) {
    const result: IntegerResult =
      FLOOR__ENUM_VARINT(buffer, offset + tag.bytes, {
        minimum: 0
      })
    return {
      value: result.value,
      bytes: tag.bytes + result.bytes
    }
  } else if (tag.value === Type.NegativeInteger) {
    const result: IntegerResult =
      FLOOR__ENUM_VARINT(buffer, offset + tag.bytes, {
        minimum: 0
      })
    return {
      value: (result.value + 1) * -1,
      bytes: tag.bytes + result.bytes
    }
  } else if (tag.value === Type.PositiveIntegerByte) {
    const result: IntegerResult =
      BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tag.bytes, {
        minimum: UINT8_MIN,
        maximum: UINT8_MAX
      })
    return {
      value: result.value,
      bytes: tag.bytes + result.bytes
    }
  } else if (tag.value === Type.NegativeIntegerByte) {
    const result: IntegerResult =
      BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tag.bytes, {
        minimum: UINT8_MIN,
        maximum: UINT8_MAX
      })
    return {
      value: (result.value + 1) * -1,
      bytes: tag.bytes + result.bytes
    }
  }
  const result: NumberResult =
      DOUBLE_VARINT_TUPLE(buffer, offset + tag.bytes, {})
  return {
    value: result.value,
    bytes: tag.bytes + result.bytes
  }
}
