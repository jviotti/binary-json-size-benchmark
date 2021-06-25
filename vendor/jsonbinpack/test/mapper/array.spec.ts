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
  EncodingSchema
} from '../../lib/schema'

import {
  Encoding,
  getStates,
  getEncoding
} from '../../lib/mapper'

tap.test('should encode an arbitrary array', (test) => {
  const schema: EncodingSchema = {
    type: 'array'
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
    options: {
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with minItems', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    minItems: 10
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 10,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems = 256', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 256
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'ROOF_SEMITYPED__LENGTH_PREFIX',
    options: {
      maximum: 256,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems = 255', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 255
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX',
    options: {
      maximum: 255,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems < 255', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 10
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX',
    options: {
      maximum: 10,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems - minItems < 255', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 10,
    minItems: 3
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 3,
      maximum: 10,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems - minItems > 255', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 450,
    minItems: 30
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'BOUNDED_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 30,
      maximum: 450,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode a semi-typed scalar heterogeneous array', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    prefixItems: [
      {
        type: 'integer'
      },
      {
        type: 'string',
        maxLength: 5
      }
    ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
    options: {
      prefixEncodings: [
        {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        {
          type: 'string',
          encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            maximum: 5
          }
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode a semi-typed array with minItems', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    minItems: 5,
    prefixItems: [
      {
        type: 'integer'
      },
      {
        type: 'string',
        maxLength: 5
      }
    ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 5,
      prefixEncodings: [
        {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        {
          type: 'string',
          encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            maximum: 5
          }
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode a semi + fully typed array with minItems', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    minItems: 5,
    items: {
      type: 'array'
    },
    prefixItems: [
      {
        type: 'integer'
      },
      {
        type: 'string',
        maxLength: 5
      }
    ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema), Infinity)
  test.strictSame(result, {
    type: 'array',
    encoding: 'FLOOR_TYPED__LENGTH_PREFIX',
    options: {
      minimum: 5,
      encoding: {
        type: 'array',
        encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
        options: {
          prefixEncodings: []
        }
      },
      prefixEncodings: [
        {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        {
          type: 'string',
          encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            maximum: 5
          }
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded array with bounded boolean items', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 2,
    minItems: 1,
    items: {
      type: 'boolean'
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    [ false ],
    [ true ],
    [ false, false ],
    [ false, true ],
    [ true, false ],
    [ true, true ]
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        [ false ],
        [ true ],
        [ false, false ],
        [ false, true ],
        [ true, false ],
        [ true, true ]
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded array with bounded integer items', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 2,
    minItems: 1,
    items: {
      type: 'integer',
      maximum: 3,
      minimum: 1
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    [ 1 ],
    [ 2 ],
    [ 3 ],
    [ 1, 1 ],
    [ 1, 2 ],
    [ 1, 3 ],
    [ 2, 1 ],
    [ 2, 2 ],
    [ 2, 3 ],
    [ 3, 1 ],
    [ 3, 2 ],
    [ 3, 3 ]
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        [ 1 ],
        [ 2 ],
        [ 3 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 2, 1 ],
        [ 2, 2 ],
        [ 2, 3 ],
        [ 3, 1 ],
        [ 3, 2 ],
        [ 3, 3 ]
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded roofed array with bounded boolean items', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 2,
    items: {
      type: 'boolean'
    }
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    [],
    [ false ],
    [ true ],
    [ false, false ],
    [ false, true ],
    [ true, false ],
    [ true, true ]
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        [],
        [ false ],
        [ true ],
        [ false, false ],
        [ false, true ],
        [ true, false ],
        [ true, true ]
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded array with total prefix items', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 2,
    minItems: 1,
    prefixItems: [
      {
        type: 'boolean'
      },
      {
        type: 'boolean'
      }
    ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    [ false ],
    [ true ],
    [ false, false ],
    [ false, true ],
    [ true, false ],
    [ true, true ]
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        [ false ],
        [ true ],
        [ false, false ],
        [ false, true ],
        [ true, false ],
        [ true, true ]
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded array with partial prefix items', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    maxItems: 3,
    minItems: 1,
    items: {
      type: 'integer',
      maximum: 3,
      minimum: 1
    },
    prefixItems: [
      {
        type: 'boolean'
      },
      {
        type: 'boolean'
      }
    ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    [ false ],
    [ true ],
    [ false, false ],
    [ false, true ],
    [ true, false ],
    [ true, true ],
    [ false, false, 1 ],
    [ false, false, 2 ],
    [ false, false, 3 ],
    [ false, true, 1 ],
    [ false, true, 2 ],
    [ false, true, 3 ],
    [ true, false, 1 ],
    [ true, false, 2 ],
    [ true, false, 3 ],
    [ true, true, 1 ],
    [ true, true, 2 ],
    [ true, true, 3 ]
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        [ false ],
        [ true ],
        [ false, false ],
        [ false, true ],
        [ true, false ],
        [ true, true ],
        [ false, false, 1 ],
        [ false, false, 2 ],
        [ false, false, 3 ],
        [ false, true, 1 ],
        [ false, true, 2 ],
        [ false, true, 3 ],
        [ true, false, 1 ],
        [ true, false, 2 ],
        [ true, false, 3 ],
        [ true, true, 1 ],
        [ true, true, 2 ],
        [ true, true, 3 ]
      ]
    }
  })

  test.end()
})

tap.test('should encode a bounded array with bounded prefixItems', (test) => {
  const schema: EncodingSchema = {
    type: 'array',
    minItems: 2,
    maxItems: 2,
    prefixItems: [
      {
        type: 'integer',
        minimum: 0,
        maximum: 2
      },
      {
        type: 'object',
        additionalProperties: false,
        required: [ 'requireReturn' ],
        properties: {
          requireReturn: {
            type: 'boolean'
          }
        }
      }
    ]
  }

  const result: Encoding = getEncoding(schema, 0)
  test.strictSame(getStates(schema), [
    [ 0, { requireReturn: false } ],
    [ 0, { requireReturn: true } ],
    [ 1, { requireReturn: false } ],
    [ 1, { requireReturn: true } ],
    [ 2, { requireReturn: false } ],
    [ 2, { requireReturn: true } ]
  ])
  test.strictSame(result, {
    type: 'enum',
    encoding: 'TOP_LEVEL_8BIT_CHOICE_INDEX',
    options: {
      choices: [
        [ 0, { requireReturn: false } ],
        [ 0, { requireReturn: true } ],
        [ 1, { requireReturn: false } ],
        [ 1, { requireReturn: true } ],
        [ 2, { requireReturn: false } ],
        [ 2, { requireReturn: true } ]
      ]
    }
  })

  test.end()
})
